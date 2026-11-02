# Product Requirements Document: InfyPOS Dashboard

## 1. Product Overview

InfyPOS Dashboard is a web-based point-of-sale administration system for managing sales, purchases, inventory, warehouses, customers, suppliers, users, stores, settings, and dashboard analytics. The application is built with Node.js, Express, EJS templates, MongoDB Atlas, and browser-side JavaScript.

The product should provide a responsive admin experience where business data is loaded from MongoDB, displayed in structured dashboard and table views, and updated through user actions such as create, edit, delete, status toggle, and search.

## 2. Goals

- Provide a central admin dashboard for POS business operations.
- Store all operational data in MongoDB instead of hardcoded local data.
- Allow users to manage products, sales, purchases, customers, suppliers, warehouses, settings, and templates dynamically.
- Keep the interface responsive across desktop and mobile devices.
- Support fallback demo data when MongoDB is not connected, while preventing save actions until MongoDB is available.
- Make the app easy to deploy on Node hosting platforms such as Render, Railway, Fly.io, or similar services.

## 3. Target Users

- Store administrators
- POS managers
- Sales staff
- Purchase managers
- Warehouse managers
- Business owners who need sales and stock visibility

## 4. Core User Problems

- Store data is difficult to manage when scattered across static files or manual records.
- Admins need quick visibility into sales, purchases, stock alerts, top products, and customer activity.
- POS teams need CRUD management for products, customers, suppliers, sales, purchases, expenses, warehouses, and settings.
- Business data should persist in a database and remain available after server restart.

## 5. Success Metrics

- Admin can load the dashboard and all management pages from MongoDB data.
- Admin can create, edit, delete, search, and toggle supported records.
- Data changes persist after page refresh and server restart.
- App gracefully shows fallback data when MongoDB is unavailable.
- MongoDB connection status is clear from server logs and API responses.
- Main pages load without server errors.

## 6. Functional Requirements

### 6.1 Authentication Pages

- The app should provide a login page.
- The app should display admin profile information.
- Future versions should validate users against MongoDB and sessions.

### 6.2 Dashboard

The dashboard should display:

- Admin greeting
- Store name
- Stat cards
- Weekly sales and purchases chart
- Top products chart
- Top customers chart
- Recent sales
- Stock alerts

Dashboard data should be read from MongoDB under the main project document. If MongoDB is unavailable, the app may show fallback demo data.

### 6.3 Product Management

Admins should be able to manage:

- Products
- Product categories
- Variations
- Brands
- Units
- Base units

Each supported list should allow:

- Search visible table records
- Create record
- Edit record
- Delete record
- Save changes to MongoDB

### 6.4 Operations Management

Admins should be able to manage:

- Adjustments
- Transfers
- Quotations
- Purchases
- Purchase returns
- Sales
- Sales returns
- Expenses
- Expense categories

Each supported list should read from and save to MongoDB.

### 6.5 People Management

Admins should be able to manage:

- Suppliers
- Customers
- Users

Supported actions:

- View list records
- Create new records
- Edit existing records
- Delete records
- Search records

### 6.6 Wallet, Roles, Stores, and Warehouse

Admins should be able to manage:

- Wallet requests
- Roles
- Warehouses
- Stores

Stores should support status toggles that persist to MongoDB.

### 6.7 Settings and Configuration

Admins should be able to view and eventually manage:

- Currencies
- Languages
- Payment methods
- Field configuration
- SMS API settings
- System settings

Languages and payment methods should support enabled/disabled toggles that persist to MongoDB.

### 6.8 Templates

Admins should be able to manage:

- Email templates
- SMS templates

Templates should support:

- Name/content editing
- Enabled/disabled toggle
- MongoDB persistence

### 6.9 API Requirements

The app should expose API endpoints for:

- `GET /api/dashboard`
- `POST /api/dashboard`
- `GET /api/project`
- `POST /api/project`
- `GET /api/records/:collection`
- `POST /api/records/:collection`
- `PUT /api/records/:collection/:index`
- `DELETE /api/records/:collection/:index`

API save operations should return `503` if MongoDB is not connected.

## 7. Data Requirements

The application stores the full project dataset in MongoDB using the `InfyposData` model.

Database:

- `infypos`

Collection:

- `Dashbord`

Main document key:

- `appKey: "infypos-admin-pos"`

Top-level data groups:

- `dashboard`
- `productCatalog`
- `operations`

Product catalog includes:

- `products`
- `productCategories`
- `variations`
- `brands`
- `units`
- `baseUnits`

Operations includes:

- `adjustments`
- `transfers`
- `quotations`
- `purchases`
- `purchaseReturns`
- `sales`
- `salesReturns`
- `expenses`
- `expenseCategories`
- `suppliers`
- `customers`
- `users`
- `walletRequests`
- `roles`
- `stores`
- `warehouses`
- `currencies`
- `languages`
- `paymentMethods`
- `fieldConfiguration`
- `smsTemplates`
- `emailTemplates`

## 8. Non-Functional Requirements

- The app should run on Node.js 18 or newer.
- The app should use environment variables for configuration.
- The UI should be responsive and usable on desktop and mobile.
- MongoDB credentials must not be committed to shared files.
- `.env` should remain ignored by git.
- `.env.example` should contain placeholders only.
- Server errors should be handled with a friendly error page.
- API errors should return JSON messages.

## 9. Environment Variables

Required:

```env
PORT=3000
MONGODB_URI="mongodb+srv://<db_user>:<db_password>@<cluster-host>/infypos?retryWrites=true&w=majority&appName=Cluster0"
STORE_NAME=General Store
ADMIN_NAME=Admin POS
```

## 10. MongoDB Connection Requirements

For MongoDB Atlas connection to work:

- Atlas database user must exist.
- Database password in `MONGODB_URI` must be correct.
- Current IP address must be added in Atlas Network Access.
- Cluster host must match the Atlas connection string.
- Password special characters should be URL-encoded.

If connection fails, the app may still render fallback data, but save actions should not persist.

## 11. User Flows

### Dashboard View

1. Admin opens `/dashboard`.
2. Server loads dashboard data from MongoDB.
3. Dashboard renders charts, cards, recent sales, and stock alerts.
4. If MongoDB is unavailable, fallback data is shown.

### Create Record

1. Admin opens a supported table page.
2. Admin clicks a create button.
3. App opens a record modal.
4. Admin enters record data.
5. App sends `POST /api/records/:collection`.
6. Server saves the record to MongoDB.
7. Page reloads with updated data.

### Edit Record

1. Admin clicks edit on a table row.
2. App opens the edit modal with record data.
3. Admin updates fields.
4. App sends `PUT /api/records/:collection/:index`.
5. Server saves the updated record.
6. Page reloads with updated data.

### Delete Record

1. Admin clicks delete on a table row.
2. App opens confirmation modal.
3. Admin confirms deletion.
4. App sends `DELETE /api/records/:collection/:index`.
5. Server removes the record from MongoDB.
6. Page reloads with updated data.

## 12. Out of Scope for Current Version

- Full authentication and session security
- Role-based permission enforcement
- File uploads for product images and logos
- Real payment gateway integration
- Real barcode generation
- PDF invoice generation
- Advanced pagination from MongoDB queries
- Audit logs
- Multi-tenant stores
- Inventory stock calculations from sales/purchases

## 13. Future Improvements

- Replace index-based record updates with stable MongoDB subdocument IDs.
- Add real login/logout with password hashing.
- Add server-side validation for each collection type.
- Add pagination, sorting, and filters powered by MongoDB.
- Add image upload support.
- Add invoice and barcode PDF export.
- Add role and permission checks.
- Add backup and restore tools.
- Add activity logs for admin actions.
- Split the single project document into normalized MongoDB collections if the dataset grows large.

## 14. Acceptance Criteria

- App starts with `npm run dev`.
- Dashboard page renders without crashing.
- Supported list pages show data from MongoDB when connected.
- Create, edit, delete, and status toggle actions persist to MongoDB.
- Search filters visible table rows.
- If MongoDB is disconnected, the user sees fallback data and save actions return a clear error.
- Sensitive database credentials are stored only in `.env`.
