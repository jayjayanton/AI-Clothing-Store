from pathlib import Path
from uuid import uuid4
import io
import os

from fastapi import FastAPI, Depends, UploadFile, File, HTTPException, Form
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field
from sqlalchemy import create_engine, ForeignKey, String, Integer, Float, Boolean, select
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship, sessionmaker, Session
from PIL import Image, UnidentifiedImageError

ROOT = Path(__file__).resolve().parent.parent
UPLOADS = ROOT / "uploads"
UPLOADS.mkdir(exist_ok=True)
engine = create_engine(os.getenv("DATABASE_URL", f"sqlite:///{ROOT / 'store.db'}"), connect_args={"check_same_thread": False} if not os.getenv("DATABASE_URL") else {})
SessionLocal = sessionmaker(bind=engine)

class Base(DeclarativeBase):
    pass

class Product(Base):
    __tablename__ = "products"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(160))
    brand: Mapped[str] = mapped_column(String(120), default="")
    category: Mapped[str] = mapped_column(String(80), default="")
    size: Mapped[str] = mapped_column(String(40), default="")
    condition: Mapped[str] = mapped_column(String(80), default="")
    description: Mapped[str] = mapped_column(String(2000), default="")
    price_cents: Mapped[int] = mapped_column(Integer, default=0)
    quantity: Mapped[int] = mapped_column(Integer, default=1)
    status: Mapped[str] = mapped_column(String(20), default="available")
    images: Mapped[list["ProductImage"]] = relationship(back_populates="product", cascade="all, delete-orphan", order_by="ProductImage.position")

class ProductImage(Base):
    __tablename__ = "product_images"
    id: Mapped[int] = mapped_column(primary_key=True)
    product_id: Mapped[int] = mapped_column(ForeignKey("products.id"))
    filename: Mapped[str] = mapped_column(String(100))
    position: Mapped[int] = mapped_column(Integer, default=0)
    product: Mapped[Product] = relationship(back_populates="images")

Base.metadata.create_all(engine)
app = FastAPI(title="AI Clothing Store - Local MVP")
app.mount("/static", StaticFiles(directory=ROOT / "frontend"), name="static")
app.mount("/uploads", StaticFiles(directory=UPLOADS), name="uploads")

def db():
    with SessionLocal() as session:
        yield session

def serialize(p):
    return dict(id=p.id, name=p.name, brand=p.brand, category=p.category, size=p.size, condition=p.condition, description=p.description, price=p.price_cents/100, quantity=p.quantity, status=p.status, images=[dict(id=i.id, url=f"/uploads/{i.filename}") for i in p.images])

class ProductInput(BaseModel):
    name: str = Field(min_length=1, max_length=160)
    brand: str = ""
    category: str = ""
    size: str = ""
    condition: str = ""
    description: str = ""
    price: float = Field(ge=0, le=1000000)
    quantity: int = Field(ge=0)
    status: str = "available"

@app.get("/")
def storefront():
    return FileResponse(ROOT / "frontend" / "index.html")

@app.get("/admin")
def admin():
    return FileResponse(ROOT / "frontend" / "admin.html")

@app.get("/api/products")
def products(session: Session = Depends(db)):
    return [serialize(p) for p in session.scalars(select(Product).order_by(Product.id.desc())).all()]

@app.post("/api/products", status_code=201)
def create_product(data: ProductInput, session: Session = Depends(db)):
    if data.status not in {"available", "reserved", "sold"}:
        raise HTTPException(422, "Invalid status")
    p = Product(**data.model_dump(exclude={"price"}), price_cents=round(data.price*100))
    session.add(p)
    session.commit()
    session.refresh(p)
    return serialize(p)

@app.put("/api/products/{product_id}")
def update_product(product_id: int, data: ProductInput, session: Session = Depends(db)):
    p = session.get(Product, product_id)
    if not p:
        raise HTTPException(404, "Product not found")
    if data.status not in {"available", "reserved", "sold"}:
        raise HTTPException(422, "Invalid status")
    for key, value in data.model_dump(exclude={"price"}).items():
        setattr(p, key, value)
    p.price_cents = round(data.price*100)
    session.commit()
    session.refresh(p)
    return serialize(p)

@app.post("/api/products/{product_id}/images")
async def add_images(product_id: int, files: list[UploadFile] = File(...), session: Session = Depends(db)):
    p = session.get(Product, product_id)
    if not p:
        raise HTTPException(404, "Product not found")
    if len(files) > 12:
        raise HTTPException(400, "Maximum 12 images per upload")
    position = len(p.images)
    for file in files:
        raw = await file.read(10_000_001)
        if len(raw) > 10_000_000:
            raise HTTPException(413, "Image exceeds 10MB")
        try:
            img = Image.open(io.BytesIO(raw))
            img.verify()
            img = Image.open(io.BytesIO(raw)).convert("RGB")
            img.thumbnail((1800, 1800))
        except (UnidentifiedImageError, OSError, ValueError):
            raise HTTPException(415, "Invalid image")
        filename = f"{uuid4().hex}.jpg"
        img.save(UPLOADS / filename, "JPEG", quality=85)
        session.add(ProductImage(product_id=p.id, filename=filename, position=position))
        position += 1
    session.commit()
    session.refresh(p)
    return serialize(p)

@app.delete("/api/products/{product_id}/images/{image_id}", status_code=204)
def delete_image(product_id: int, image_id: int, session: Session = Depends(db)):
    img = session.get(ProductImage, image_id)
    if not img or img.product_id != product_id:
        raise HTTPException(404, "Image not found")
    path = UPLOADS / img.filename
    session.delete(img)
    session.commit()
    path.unlink(missing_ok=True)

@app.delete("/api/products/{product_id}", status_code=204)
def delete_product(product_id: int, session: Session = Depends(db)):
    p = session.get(Product, product_id)
    if not p:
        raise HTTPException(404, "Product not found")
    filenames = [i.filename for i in p.images]
    session.delete(p)
    session.commit()
    for filename in filenames:
        (UPLOADS / filename).unlink(missing_ok=True)
