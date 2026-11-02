# InfyPOS Dashboard

Responsive POS dashboard built with Express, EJS, Chart.js, and MongoDB Atlas.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` from `.env.example` and add your MongoDB Atlas connection string:

```bash
cp .env.example .env
```

3. Seed all dashboard, product, operation, people, setting, and template data into Atlas:

```bash
npm run seed
```

4. Start the app:

```bash
npm run dev
```

Open `http://localhost:3000`.

## MongoDB Atlas

Create a free Atlas cluster, add your IP address in Network Access, create a database user, then paste the connection string into `MONGODB_URI`. Replace `<db_password>` with your real Atlas database password.

This project uses the database `infypos` and stores the full app dataset in the collection `Dashbord` as one organized document:

- `dashboard`
- `productCatalog`
- `operations`

If your Atlas password contains symbols such as `@`, `#`, `/`, or `:`, URL-encode the password before putting it in `MONGODB_URI`.

## API

- `GET /api/dashboard` returns the latest dashboard snapshot.
- `POST /api/dashboard` updates the dashboard data inside `Dashbord`.
- `GET /api/project` returns the full project document from `Dashbord`.
- `POST /api/project` saves the full project document into `Dashbord`.

## Deploy

This app is ready for Render, Railway, Fly.io, or any Node host.

- Build command: `npm install`
- Start command: `npm start`
- Environment variables: `MONGODB_URI`, `PORT`, `STORE_NAME`, `ADMIN_NAME`
