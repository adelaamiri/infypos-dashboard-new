# InfyPOS ERD and User Flow

## 1. High-Level ERD

This project currently stores the app data in one main MongoDB document using the `InfyposData` model. The document is grouped into dashboard, product catalog, and operations data.

```mermaid
erDiagram
  INFYPOS_DATA {
    ObjectId _id
    string appKey
    object dashboard
    object productCatalog
    object operations
    datetime createdAt
    datetime updatedAt
  }

  DASHBOARD {
    string storeName
    string adminName
    string rangeLabel
    array statCards
    array weeklySalesPurchases
    array topProductsYear
    array topCustomersMonth
    array recentSales
    array stockAlerts
  }

  PRODUCT_CATALOG {
    array products
    array productCategories
    array variations
    array brands
    array units
    array baseUnits
  }

  OPERATIONS {
    array adjustments
    array transfers
    array quotations
    array purchases
    array purchaseReturns
    array sales
    array salesReturns
    array expenses
    array expenseCategories
    array suppliers
    array customers
    array users
    array walletRequests
    array roles
    array stores
    array warehouses
    array currencies
    array languages
    array paymentMethods
    array smsTemplates
    array emailTemplates
  }

  INFYPOS_DATA ||--|| DASHBOARD : contains
  INFYPOS_DATA ||--|| PRODUCT_CATALOG : contains
  INFYPOS_DATA ||--|| OPERATIONS : contains
```

## 2. Detailed Data Relationship

```mermaid
erDiagram
  INFYPOS_DATA ||--o{ PRODUCT : stores
  INFYPOS_DATA ||--o{ PRODUCT_CATEGORY : stores
  INFYPOS_DATA ||--o{ BRAND : stores
  INFYPOS_DATA ||--o{ UNIT : stores
  INFYPOS_DATA ||--o{ SALE : stores
  INFYPOS_DATA ||--o{ PURCHASE : stores
  INFYPOS_DATA ||--o{ CUSTOMER : stores
  INFYPOS_DATA ||--o{ SUPPLIER : stores
  INFYPOS_DATA ||--o{ USER : stores
  INFYPOS_DATA ||--o{ WAREHOUSE : stores
  INFYPOS_DATA ||--o{ STORE : stores
  INFYPOS_DATA ||--o{ EXPENSE : stores
  INFYPOS_DATA ||--o{ TEMPLATE : stores

  PRODUCT {
    string name
    string code
    string brand
    string price
    string unit
    string stock
    string time
    string date
  }

  SALE {
    string reference
    string user
    string customer
    string warehouse
    string status
    string grandTotal
    string paid
    string due
    string paymentStatus
    string paymentType
    string time
    string date
  }

  PURCHASE {
    string reference
    string supplier
    string warehouse
    string status
    string grandTotal
    string paid
    string due
    string paymentStatus
    string paymentType
    string time
    string date
  }

  CUSTOMER {
    string name
    string email
    string phone
    string time
    string date
  }

  SUPPLIER {
    string name
    string email
    string phone
    string time
    string date
  }

  USER {
    string initials
    string name
    string email
    string role
    string phone
    string stores
    string time
    string date
  }

  WAREHOUSE {
    string name
    string email
    string phone
    string country
    string city
    string zip
    string time
    string date
  }

  STORE {
    string name
    boolean enabled
    number users
  }

  EXPENSE {
    string reference
    string user
    string title
    string warehouse
    string category
    string amount
    string time
    string date
  }

  TEMPLATE {
    string name
    boolean enabled
    string content
  }
```

## 3. Admin User Flow

```mermaid
flowchart TD
  A["Admin opens InfyPOS"] --> B["Login page or dashboard"]
  B --> C["Dashboard loads"]
  C --> D{"MongoDB connected?"}
  D -->|"Yes"| E["Load project document from MongoDB"]
  D -->|"No"| F["Show fallback demo data"]
  E --> G["Render dashboard cards, charts, tables"]
  F --> G

  G --> H["Admin chooses sidebar section"]
  H --> I["Products"]
  H --> J["Sales and Purchases"]
  H --> K["People"]
  H --> L["Warehouse and Stores"]
  H --> M["Settings and Templates"]

  I --> N["View product table"]
  J --> O["View operation table"]
  K --> P["View customer, supplier, or user table"]
  L --> Q["View warehouse or store table"]
  M --> R["View settings or template table"]

  N --> S["Create, edit, delete, search, or toggle"]
  O --> S
  P --> S
  Q --> S
  R --> S

  S --> T{"Action requires save?"}
  T -->|"Search only"| U["Filter visible rows in browser"]
  T -->|"Create/Edit/Delete/Toggle"| V["Send request to API"]

  V --> W{"MongoDB connected?"}
  W -->|"Yes"| X["Update InfyposData document"]
  W -->|"No"| Y["Return 503 MongoDB not connected"]

  X --> Z["Reload page with updated DB data"]
  Y --> AA["Show error message to admin"]
```

## 4. Save Data Flow

```mermaid
sequenceDiagram
  participant Admin
  participant Browser
  participant ExpressAPI
  participant MongoDB

  Admin->>Browser: Click create, edit, delete, or toggle
  Browser->>Browser: Build record payload
  Browser->>ExpressAPI: Request /api/records/:collection
  ExpressAPI->>ExpressAPI: Validate collection name
  ExpressAPI->>ExpressAPI: Check MongoDB readyState

  alt MongoDB connected
    ExpressAPI->>MongoDB: Read InfyposData document
    MongoDB-->>ExpressAPI: Return project document
    ExpressAPI->>ExpressAPI: Update nested collection array
    ExpressAPI->>MongoDB: Save updated document
    MongoDB-->>ExpressAPI: Return saved data
    ExpressAPI-->>Browser: Success response
    Browser->>Browser: Reload page
  else MongoDB disconnected
    ExpressAPI-->>Browser: 503 error
    Browser->>Admin: Show MongoDB connection error
  end
```

## 5. Main Page Navigation Flow

```mermaid
flowchart LR
  A["Dashboard"] --> B["Products"]
  B --> B1["Products"]
  B --> B2["Categories"]
  B --> B3["Brands"]
  B --> B4["Units"]

  A --> C["Purchases"]
  C --> C1["Purchases"]
  C --> C2["Purchase Returns"]

  A --> D["Sales"]
  D --> D1["Sales"]
  D --> D2["Sales Returns"]

  A --> E["Operations"]
  E --> E1["Adjustments"]
  E --> E2["Transfers"]
  E --> E3["Quotations"]
  E --> E4["Expenses"]

  A --> F["People"]
  F --> F1["Suppliers"]
  F --> F2["Customers"]
  F --> F3["Users"]

  A --> G["Admin Setup"]
  G --> G1["Roles"]
  G --> G2["Warehouse"]
  G --> G3["Stores"]
  G --> G4["Currencies"]
  G --> G5["Languages"]
  G --> G6["Payment Methods"]
  G --> G7["Templates"]
  G --> G8["Settings"]
```

## 6. Recommended Future ERD

For a larger production system, the current single-document structure should eventually be split into separate collections.

```mermaid
erDiagram
  USER ||--o{ SALE : creates
  CUSTOMER ||--o{ SALE : places
  SUPPLIER ||--o{ PURCHASE : supplies
  WAREHOUSE ||--o{ PRODUCT_STOCK : stores
  PRODUCT ||--o{ PRODUCT_STOCK : has
  PRODUCT ||--o{ SALE_ITEM : sold_as
  PRODUCT ||--o{ PURCHASE_ITEM : purchased_as
  SALE ||--o{ SALE_ITEM : contains
  PURCHASE ||--o{ PURCHASE_ITEM : contains
  STORE ||--o{ USER : employs
  ROLE ||--o{ USER : assigned_to

  USER {
    ObjectId id
    string name
    string email
    string roleId
    string phone
  }

  CUSTOMER {
    ObjectId id
    string name
    string email
    string phone
  }

  SUPPLIER {
    ObjectId id
    string name
    string email
    string phone
  }

  PRODUCT {
    ObjectId id
    string name
    string code
    ObjectId brandId
    ObjectId categoryId
    ObjectId unitId
    number price
  }

  SALE {
    ObjectId id
    string reference
    ObjectId userId
    ObjectId customerId
    ObjectId warehouseId
    number grandTotal
    number paid
    number due
    string paymentStatus
  }

  PURCHASE {
    ObjectId id
    string reference
    ObjectId supplierId
    ObjectId warehouseId
    number grandTotal
    number paid
    number due
    string paymentStatus
  }
```
