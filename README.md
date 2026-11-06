# AI Clothing Store

Zero-subscription-cost MVP: FastAPI + SQLite locally (PostgreSQL-ready) + vanilla HTML/CSS/JS. Multiple images per product, inventory dashboard, storefront, and contact inquiries. No paid AI calls.

## Run locally
1. `python -m venv .venv` and activate it.
2. `pip install -r requirements.txt`
3. `uvicorn backend.app:app --reload`
4. Open http://127.0.0.1:8000 (storefront) or http://127.0.0.1:8000/admin (dashboard).

Data is stored in `store.db`; photos in `uploads/`. Both are ignored by git. Change `DATABASE_URL` to a PostgreSQL SQLAlchemy URL later (install psycopg). Do not expose this server publicly until authentication, authorization, file security and persistent hosting are configured. The admin dashboard is **local-development only**, with no authentication.

The AI button is deliberately not implemented: no OpenAI API charges. Product images are original uploads only.

## Future
Secure authentication, cloud image storage, PostgreSQL hosting, image-generation approval workflow, seller accounts, pagination and deployment.
