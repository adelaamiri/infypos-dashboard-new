# InfyPOS Project Guide

This document is written for two audiences:

- The client, so they can understand what the project is, what it does, and what is included.
- The developer/student, so the project can be explained, run, maintained, and improved with confidence.

---

# Part 1: Client Document

## Project Name

InfyPOS Dashboard

## Project Summary

InfyPOS Dashboard is a web-based point-of-sale admin dashboard. It helps a business manage important store operations such as products, sales, purchases, customers, suppliers, warehouses, expenses, stores, users, payment methods, and templates.

The system is built as a responsive admin panel, meaning it can be used on desktop and smaller screens. It uses MongoDB as the database so business records can be stored and updated dynamically.

## Main Purpose

The purpose of this project is to give store administrators one central place to view and manage business data.

Instead of keeping product, sales, customer, and warehouse information in separate files or manual records, the dashboard organizes everything in one web application.

## Main Features

### Dashboard

The dashboard shows business summary information, including:

- Sales and purchase statistics
- Weekly sales and purchase chart
- Top products
- Top customers
- Recent sales
- Stock alerts

### Product Management

The product section allows management of:

- Products
- Product categories
- Product brands
- Product units
- Product variations
- Base units

### Sales and Purchase Management

The system includes pages for:

- Sales
- Sales returns
- Purchases
- Purchase returns
- Quotations
- Transfers
- Adjustments

### People Management

The system includes management pages for:

- Customers
- Suppliers
- Users

### Business Settings

The admin can view and manage business setup pages such as:

- Stores
- Warehouses
- Roles
- Currencies
- Languages
- Payment methods
- Email templates
- SMS templates
- Field configuration
- General settings

## Dynamic Database Functionality

The project is connected to MongoDB Atlas. When the database connection is working, the application can load and save business data from the database.

Supported dynamic actions include:

- View records
- Create records
- Edit records
- Delete records
- Search visible table records
- Toggle enabled/disabled statuses on supported pages

If MongoDB is not connected, the app can still show fallback demo data, but saving changes requires a working database connection.

## Technology Used

- Node.js
- Express.js
- EJS templates
- MongoDB Atlas
- Mongoose
- HTML
- CSS
- JavaScript
- Chart.js

## Pages Included

- Dashboard
- Login
- Profile
- Products
- Product Categories
- Variations
- Brands
- Units
- Base Units
- Print Barcode
- Adjustments
- Quotations
- Purchases
- Purchase Returns
- Sales
- Sales Returns
- Transfers
- Expenses
- Expense Categories
- Suppliers
- Customers
- Users
- Wallet Requests
- Roles
- Warehouse
- Reports
- Stores
- Currencies
- Languages
- Payment Methods
- Field Configuration
- Email Templates
- SMS Templates
- SMS API
- Settings

## Current Project Status

The project currently provides a working admin dashboard interface with many POS management pages. The data structure is prepared for MongoDB, and dynamic record APIs have been added for supported list pages.

The project is suitable as a dashboard/admin panel prototype or student software engineering project. For full production use, the project should be improved with real authentication, stronger validation, better database structure, and role-based permissions.

## Important Notes for the Client

- MongoDB Atlas must be configured correctly before saving data.
- The current IP address must be added to MongoDB Atlas Network Access.
- Database credentials should be stored only in the `.env` file.
- The `.env` file should never be shared publicly.
- This project currently uses a simple admin interface and is not yet a complete secure production POS system.

## Recommended Future Improvements

- Add real login and logout security
- Add admin/user roles and permissions
- Add stronger form validation
- Add separate MongoDB collections for each module
- Add invoice PDF generation
- Add barcode generation
- Add image upload for products
- Add stock calculation from sales and purchases
- Add pagination and advanced filtering
- Add backup and restore
- Add activity logs

---

# Part 2: Developer/Student Guide

## How to Explain This Project

You can explain the project like this:

> This is a POS admin dashboard built with Node.js, Express, EJS, and MongoDB. It allows a store admin to manage products, sales, purchases, customers, suppliers, warehouses, stores, payment methods, and templates. The dashboard displays charts and business summaries, and supported records can be created, edited, deleted, searched, and saved to MongoDB.

## Simple Architecture

The project follows this structure:

```text
Browser
  ↓
Express Server
  ↓
Routes
  ↓
Controllers
  ↓
Mongoose Model
  ↓
MongoDB Atlas
```

## Important Files

### Main Server

```text
server.js
```

This file starts the Express app, loads environment variables, connects to MongoDB, sets up EJS views, serves static files, and registers routes.

### MongoDB Connection

```text
src/config/db.js
```

This file connects the project to MongoDB using `MONGODB_URI` from `.env`.

### Main Data Model

```text
src/models/InfyposData.js
```

This is the main MongoDB model. It stores:

- `dashboard`
- `productCatalog`
- `operations`

### Dashboard Controller

```text
src/controllers/dashboardController.js
```

This controller loads data and renders the EJS pages.

### API Controller

```text
src/controllers/apiController.js
```

This controller handles API requests for dashboard data, full project data, and dynamic records.

### API Routes

```text
src/routes/apiRoutes.js
```

This file defines API endpoints such as:

```text
GET /api/project
POST /api/project
GET /api/records/:collection
POST /api/records/:collection
PUT /api/records/:collection/:index
DELETE /api/records/:collection/:index
```

### Frontend JavaScript

```text
public/js/dashboard.js
```

This file controls charts, menus, modals, search, create, edit, delete, and toggle behavior.

### Views

```text
src/views/pages
src/views/partials
src/views/layouts
```

These files contain the EJS templates for each page.

## How to Run the Project

Install dependencies:

```bash
npm install
```

Create or update the `.env` file:

```env
PORT=3000
MONGODB_URI="mongodb+srv://<db_user>:<db_password>@<cluster-host>/infypos?retryWrites=true&w=majority&appName=Cluster0"
STORE_NAME=General Store
ADMIN_NAME=Admin POS
```

Start the app:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## MongoDB Setup Checklist

In MongoDB Atlas:

1. Create a cluster.
2. Create a database user.
3. Add your current IP address in Network Access.
4. Copy the connection string.
5. Paste it into `.env` as `MONGODB_URI`.
6. Restart the server.

If the app shows this error:

```text
Could not connect to any servers in your MongoDB Atlas cluster
```

It usually means the current IP address is not whitelisted in MongoDB Atlas.

## How the Data Is Stored

The project currently stores most data inside one MongoDB document:

```text
InfyposData
  dashboard
  productCatalog
  operations
```

This is easy for a student project and prototype. For a bigger real system, the data should be separated into collections like:

- Products
- Customers
- Sales
- Purchases
- Suppliers
- Users
- Warehouses

## Current Dynamic Collections

The dynamic API supports records such as:

- products
- productCategories
- variations
- brands
- units
- baseUnits
- adjustments
- transfers
- quotations
- purchases
- purchaseReturns
- sales
- salesReturns
- expenses
- expenseCategories
- suppliers
- customers
- users
- walletRequests
- roles
- stores
- warehouses
- currencies
- languages
- paymentMethods
- smsTemplates
- emailTemplates

## How Create/Edit/Delete Works

### Create

1. User clicks a create button.
2. A modal opens.
3. User enters data.
4. Browser sends data to:

```text
POST /api/records/:collection
```

5. Server saves it in MongoDB.
6. Page reloads.

### Edit

1. User clicks edit on a row.
2. A modal opens with the record data.
3. User changes fields.
4. Browser sends data to:

```text
PUT /api/records/:collection/:index
```

5. Server updates the record in MongoDB.

### Delete

1. User clicks delete.
2. Confirmation modal opens.
3. User confirms.
4. Browser sends:

```text
DELETE /api/records/:collection/:index
```

5. Server removes the record from MongoDB.

## What You Should Say If Client Asks About Security

You can say:

> The current version is an admin dashboard prototype. It includes the structure for managing business data, but for production use we should add secure authentication, user sessions, password hashing, role-based permissions, and stronger validation.

## What You Should Say If Client Asks About Database

You can say:

> The project uses MongoDB Atlas. The current implementation stores the dashboard and business records in a main project document. This is suitable for a prototype or early version. For a larger production version, I recommend separating products, customers, sales, purchases, users, and warehouses into their own collections.

## What You Should Say If Client Asks What Is Missing

You can say:

> The main missing production features are secure login, role permissions, form validation, image upload, invoice PDF export, barcode generation, stock calculations, and advanced pagination/filtering.

## Project Strengths

- Many POS pages are already designed.
- UI is responsive.
- MongoDB connection is included.
- Main data can be saved dynamically.
- API structure is already started.
- Good foundation for a full POS admin system.

## Project Limitations

- Authentication is not fully implemented.
- Some buttons are still prototype-style.
- Database structure is simple and can be improved.
- Validation should be stronger.
- No role permission system yet.
- No real payment gateway or invoice generation yet.

## Best Next Steps

For a strong next version, build these in order:

1. MongoDB connection fixed and tested
2. Real login system
3. Products CRUD with validation
4. Customers CRUD with validation
5. Sales CRUD with product/customer relation
6. Pagination and search from database
7. Role-based permissions
8. Product image uploads
9. Invoice PDF generation
10. Deployment

## Short Client Message You Can Send

```text
Hello,

I have prepared the InfyPOS dashboard project. It is a web-based POS admin panel built with Node.js, Express, EJS, and MongoDB. The system includes dashboard analytics and management pages for products, sales, purchases, customers, suppliers, warehouses, stores, users, payment methods, settings, and templates.

The project supports dynamic MongoDB data for the main modules, including create, edit, delete, search, and status toggle actions on supported pages. It is ready as a strong dashboard prototype and can be extended into a full production POS system with authentication, roles, validation, invoice generation, barcode support, and advanced reporting.

Thank you.
```

## Short Project Explanation for Presentation

```text
My project is called InfyPOS Dashboard. It is a POS admin dashboard for managing store data such as products, sales, purchases, customers, suppliers, users, warehouses, stores, and settings. I built it using Node.js, Express, EJS, MongoDB, HTML, CSS, and JavaScript. The dashboard shows business summaries and charts, and the management pages allow records to be created, edited, deleted, searched, and saved to MongoDB.
```
