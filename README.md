# Clothing & Beauty Store

Clothing and beauty accessories storefront. Zero-subscription-cost MVP: FastAPI + SQLite locally (PostgreSQL-ready) + vanilla HTML/CSS/JS. Multiple images per clothing or beauty accessory product, inventory dashboard, storefront, and contact inquiries. No cart or online checkout. No AI APIs or paid services required.

## Run locally
1. `python -m venv .venv` and activate it.
2. `pip install -r requirements.txt`
3. `uvicorn backend.app:app --reload`
4. Open http://127.0.0.1:8000 (storefront) or http://127.0.0.1:8000/admin (dashboard).

Data is stored in `store.db`; photos in `uploads/`. Both are ignored by git. Change `DATABASE_URL` to a PostgreSQL SQLAlchemy URL later (install psycopg). Do not expose this server publicly until authentication, authorization, file security and persistent hosting are configured. The admin dashboard is **local-development only**, with no authentication.

Product images are original uploads only. There is no AI integration or external image-generation API.

## Future
Secure authentication, cloud image storage, PostgreSQL hosting, seller accounts, pagination and deployment.

## One-off garment purchase requests (GitHub Pages)
The public catalog now includes **Solicitar compra / Request to buy** on each garment. It opens a bilingual request containing the garment name, brand, size and color. Buyers can copy the request; no payment is collected, no card details are requested, and **clicking the button does not reserve inventory**.

### Enable contact delivery
In `site/products.js`, set `purchaseConfig.sellerWhatsApp` to an approved business WhatsApp number in international format (Ecuador example: `5939XXXXXXXX`, no +) **or** set `purchaseConfig.sellerEmail` to the seller's public business email. Leave blank until the seller approves publishing contact information. The contact buttons appear only after configuration; until then customers can copy the request. Do not commit private contact details.

### Manual order workflow
1. Customer requests a garment, providing the item and size to the seller via configured contact channel.
2. Seller verifies stock, condition, final price, delivery/shipping and any applicable taxes; agrees on the total with buyer.
3. Seller creates a **one-time PayPhone payment link** in their verified merchant account and sends it directly to that buyer.
4. Seller independently verifies successful payment in the merchant dashboard, **not from a screenshot or buyer message**.
5. Seller records the sale and removes or marks the garment sold in the catalog. Until inventory automation exists, this is a manual action; avoid sending simultaneous links for the same unique item.

### Future automation (not yet implemented)
A secure backend can track item statuses `available → held → sold`, hold expiration, authenticated admin updates, and verified provider payment callbacks/webhooks. Never embed payment API secrets or trust client-side payment confirmations on GitHub Pages. No PayPhone integration or automatic sold-out updates are currently active.
