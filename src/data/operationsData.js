const adjustments = [
  ['AD_111214', 'General Warehouse', 1, '3:35 PM', '2083-01-24'],
  ['AD_111213', 'General Warehouse', 1, '11:21 PM', '2083-01-21'],
  ['AD_111212', 'General Warehouse', 1, '5:32 PM', '2083-01-21'],
  ['AD_111211', 'General Warehouse', 1, '7:52 AM', '2083-01-19'],
  ['AD_111210', 'General Warehouse', 1, '5:02 PM', '2083-01-12'],
  ['AD_111209', 'General Warehouse', 1, '3:43 PM', '2083-01-09'],
  ['AD_111208', 'warehouse', 1, '8:08 AM', '2083-01-08'],
  ['AD_111207', 'warehouse', 1, '8:18 AM', '2083-01-03'],
  ['AD_111206', 'General Warehouse', 2, '9:17 AM', '2083-01-01'],
  ['AD_111205', 'General Warehouse', 6, '9:16 AM', '2083-01-01']
].map(([reference, warehouse, totalProducts, time, date]) => ({
  reference,
  warehouse,
  totalProducts,
  time,
  date
}));

const transfers = [
  ['TR_111119', 'warehouse', 'General Warehouse', 1, '$ 200,0', 'Completed', '6:38 PM', '2083-01-03'],
  ['TR_111118', 'warehouse', 'General Warehouse', 1, '$ 360,0', 'Completed', '6:36 PM', '2083-01-03'],
  ['TR_111117', 'warehouse', 'General Warehouse', 1, '$ 300,0', 'Completed', '10:42 PM', '2082-12-24'],
  ['TR_111115', 'warehouse', 'General Warehouse', 2, '$ 427,1', 'Completed', '10:29 AM', '2082-11-23'],
  ['TR_111114', 'warehouse', 'General Warehouse', 1, '$ 146,2', 'Sent', '6:41 PM', '2082-11-01'],
  ['TR_111113', 'General Warehouse', 'warehouse', 1, '$ 100,0', 'Completed', '9:35 AM', '2082-10-15'],
  ['TR_111112', 'General Warehouse', 'warehouse', 1, '$ 10,0', 'Completed', '1:13 PM', '2082-10-12'],
  ['TR_111111', 'warehouse', 'General Warehouse', 1, '$ 528,0', 'Completed', '11:16 AM', '2082-10-10'],
  ['TR_111110', 'General Warehouse', 'warehouse', 2, '$ 51,3', 'Completed', '5:55 PM', '2082-10-09'],
  ['TR_111109', 'General Warehouse', 'warehouse', 1, '$ 10,0', 'Completed', '11:00 AM', '2082-10-05']
].map(([reference, fromWarehouse, toWarehouse, items, grandTotal, status, time, date]) => ({
  reference,
  fromWarehouse,
  toWarehouse,
  items,
  grandTotal,
  status,
  time,
  date
}));

const quotations = [
  ['QA_111116', 'walk-in-customer', 'General Warehouse', 'Sent', '$ 100,0', '6:46 PM', '2083-01-21'],
  ['QA_111115', 'walk-in-customer', 'warehouse', 'Sent', '$ 50,0', '8:19 AM', '2083-01-03'],
  ['QA_111114', 'Arjun Kapoor', 'General Warehouse', 'Sent', '$ 20,205,0', '6:27 PM', '2083-01-01'],
  ['QA_111113', 'Arjun Kapoor', 'warehouse', 'Pending', '$ 4,444,0', '7:08 AM', '2082-12-26'],
  ['QA_111112', 'Arjun Kapoor', 'General Warehouse', 'Sent', '$ 67,0', '10:17 PM', '2082-12-24'],
  ['QA_111111', 'Arjun Kapoor', 'General Warehouse', 'Pending', '$ 1,520,5', '8:02 PM', '2082-12-09'],
  ['QA_111110', 'Arjun Kapoor', 'General Warehouse', 'Sent', '$ 50,0', '5:05 PM', '2082-12-02'],
  ['QA_111109', 'Meera Nair', 'General Warehouse', 'Sent', '$ 650,0', '3:16 AM', '2082-11-28'],
  ['QA_111108', 'Rohit Malhotra', 'General Warehouse', 'Sent', '$ 100,0', '4:30 AM', '2082-11-26'],
  ['QA_111107', 'Priya Deshmukh', 'General Warehouse', 'Sent', '$ 4,990,0', '5:54 PM', '2082-11-26']
].map(([reference, customer, warehouse, status, grandTotal, time, date]) => ({
  reference,
  customer,
  warehouse,
  status,
  grandTotal,
  time,
  date
}));

const purchases = [
  ['PU_111372', 'Riya Sharma', 'warehouse', 'Received', '$ 10,5', '$ 0,0', '$ 10,5', 'Unpaid', '-', '6:30 PM', '2083-01-26'],
  ['PU_111371', 'Riya Sharma', 'warehouse', 'Received', '$ 60,0', '$ 0,0', '$ 60,0', 'Unpaid', '-', '5:30 PM', '2083-01-24'],
  ['PU_111370', 'Riya Sharma', 'warehouse', 'Received', '$ 40,0', '$ 0,0', '$ 40,0', 'Unpaid', '-', '5:29 PM', '2083-01-24'],
  ['PU_111369', 'Aarav Mehta', 'General Warehouse', 'Received', '$ 2,300,0', '$ 0,0', '$ 2,300,0', 'Unpaid', '-', '3:32 PM', '2083-01-24'],
  ['PU_111368', 'Aarav Mehta', 'General Warehouse', 'Received', '$ 2,300,0', '$ 0,0', '$ 2,300,0', 'Unpaid', '-', '3:31 PM', '2083-01-24'],
  ['PU_111367', 'Sneha Kapoor', 'General Warehouse', 'Received', '$ 429,3', '$ 0,0', '$ 429,3', 'Unpaid', '-', '9:47 AM', '2083-01-23'],
  ['PU_111366', 'Riya Sharma', 'warehouse', 'Received', '$ 3,0', '$ 3,0', '$ 0,0', 'Paid', 'Cheque', '12:24 PM', '2083-01-21'],
  ['PU_111365', 'Aarav Mehta', 'warehouse', 'Received', '$ 10,7', '$ 0,0', '$ 10,7', 'Unpaid', '-', '1:51 PM', '2083-01-17'],
  ['PU_111338', 'Riya Sharma', 'warehouse', 'Received', '$ 24,0', '$ 0,0', '$ 24,0', 'Unpaid', '-', '6:32 AM', '2083-01-14'],
  ['PU_111337', 'Aarav Mehta', 'General Warehouse', 'Received', '$ 221,8', '$ 221,8', '$ 0,0', 'Paid', 'Cash', '3:44 PM', '2083-01-09']
].map(([reference, supplier, warehouse, status, grandTotal, paid, due, paymentStatus, paymentType, time, date]) => ({
  reference,
  supplier,
  warehouse,
  status,
  grandTotal,
  paid,
  due,
  paymentStatus,
  paymentType,
  time,
  date
}));

const purchaseReturns = [
  ['PR_11138', 'Riya Sharma', 'warehouse', 'Received', '$ 250,0', '5:31 PM', '2083-01-21'],
  ['PR_11137', 'Alessandro Cremin', 'warehouse', 'Received', '$ 10,0', '9:49 AM', '2083-01-01'],
  ['PR_11136', 'Aarav Mehta', 'General Warehouse', 'Received', '$ 1,000,0', '7:48 PM', '2082-11-30'],
  ['PR_11135', 'Aarav Mehta', 'General Warehouse', 'Received', '$ 2,500,0', '2:02 PM', '2082-11-27'],
  ['PR_11132', 'Aarav Mehta', 'warehouse', 'Received', '$ 100,0', '7:59 AM', '2082-10-08'],
  ['PR_11130', 'Riya Sharma', 'warehouse', 'Received', '$ 476,3', '4:56 PM', '2082-09-08'],
  ['PR_11129', 'Aarav Mehta', 'warehouse', 'Ordered', '$ 329,1', '2:23 PM', '2082-08-11'],
  ['PR_11128', 'Aarav Mehta', 'General Warehouse', 'Received', '$ 100,0', '10:52 PM', '2082-08-08'],
  ['PR_11127', 'Riya Sharma', 'warehouse', 'Received', '$ 270,2', '12:24 PM', '2082-08-01'],
  ['PR_11126', 'Riya Sharma', 'General Warehouse', 'Pending', '$ 1,500,0', '8:15 PM', '2082-07-29']
].map(([reference, supplier, warehouse, status, grandTotal, time, date]) => ({
  reference,
  supplier,
  warehouse,
  status,
  grandTotal,
  time,
  date
}));

const sales = [
  ['SA_1113646', 'Admin POS', 'walk-in-customer', 'warehouse', 'Completed', '$ 359,6', '$ 500,0', '$ 0,0', 'Paid', 'Cash', '7:26 PM', '2083-01-26'],
  ['SA_1113645', 'Admin POS', 'walk-in-customer', 'warehouse', 'Completed', '$ 651,5', '$ 0,0', '$ 651,5', 'Unpaid', '-', '6:34 PM', '2083-01-26'],
  ['SA_1113644', 'Admin POS', 'walk-in-customer', 'warehouse', 'Completed', '$ 365,0', '$ 365,0', '$ 0,0', 'Partial', 'Cash', '6:32 PM', '2083-01-26'],
  ['SA_1113643', 'Admin POS', 'walk-in-customer', 'warehouse', 'Completed', '$ 1,469,6', '$ 1,469,6', '$ 0,0', 'Paid', 'Cash', '6:43 AM', '2083-01-26'],
  ['SA_1113642', 'Admin POS', 'walk-in-customer', 'warehouse', 'Completed', '$ 282,4', '$ 282,4', '$ 0,0', 'Paid', 'Cash', '6:42 AM', '2083-01-26'],
  ['SA_1113641', 'Admin POS', 'Meera Nair', 'warehouse', 'Completed', '$ 591,1', '$ 0,0', '$ 591,1', 'Unpaid', '-', '10:22 PM', '2083-01-25'],
  ['SA_1113640', 'Admin POS', 'walk-in-customer', 'warehouse', 'Completed', '$ 96,6', '$ 96,6', '$ 0,0', 'Paid', 'Cash', '9:48 PM', '2083-01-25'],
  ['SA_1113639', 'Admin POS', 'walk-in-customer', 'warehouse', 'Completed', '$ 2,858,2', '$ 2,858,2', '$ 0,0', 'Paid', 'Cash', '4:51 PM', '2083-01-25'],
  ['SA_1113638', 'Admin POS', 'walk-in-customer', 'warehouse', 'Completed', '$ 48,3', '$ 0,0', '$ 48,3', 'Partial', '-', '1:05 PM', '2083-01-25'],
  ['SA_1113637', 'Admin POS', 'walk-in-customer', 'warehouse', 'Completed', '$ 207,5', '$ 207,5', '$ 0,0', 'Partial', 'Gpay', '12:31 PM', '2083-01-25']
].map(([reference, user, customer, warehouse, status, grandTotal, paid, due, paymentStatus, paymentType, time, date]) => ({
  reference,
  user,
  customer,
  warehouse,
  status,
  grandTotal,
  paid,
  due,
  paymentStatus,
  paymentType,
  time,
  date
}));

const salesReturns = [
  ['SR_11155', 'walk-in-customer', 'warehouse', 'Received', '$ 649,7', '8:58 PM', '2083-01-21'],
  ['SR_11154', 'Arjun Kapoor', 'General Warehouse', 'Received', '$ 698,7', '5:51 PM', '2083-01-15'],
  ['SR_11153', 'walk-in-customer', 'warehouse', 'Received', '$ 255,8', '9:29 AM', '2083-01-12'],
  ['SR_11152', 'walk-in-customer', 'warehouse', 'Received', '$ 255,8', '2:12 PM', '2083-01-10'],
  ['SR_11151', 'walk-in-customer', 'warehouse', 'Received', '$ 207,5', '5:49 PM', '2083-01-09'],
  ['SR_11150', 'walk-in-customer', 'warehouse', 'Received', '$ 94,5', '10:00 PM', '2083-01-01'],
  ['SR_11149', 'walk-in-customer', 'warehouse', 'Received', '$ 305,0', '10:00 PM', '2083-01-01'],
  ['SR_11148', 'walk-in-customer', 'warehouse', 'Received', '$ 207,5', '11:52 AM', '2082-12-24'],
  ['SR_11147', 'walk-in-customer', 'warehouse', 'Received', '$ 53,7', '6:10 PM', '2082-12-08'],
  ['SR_11146', 'walk-in-customer', 'warehouse', 'Received', '$ 211,2', '1:54 PM', '2082-12-04']
].map(([reference, customer, warehouse, status, grandTotal, time, date]) => ({
  reference,
  customer,
  warehouse,
  status,
  grandTotal,
  time,
  date
}));

const expenses = [
  ['EX_1131', '-', 'Warehouse Bill', 'warehouse', 'Rent', '$ 15,000,0', '11:32 AM', '2082-02-29'],
  ['EX_1133', '-', 'Transportations', 'warehouse', 'Supplies', '$ 5,000,0', '11:34 AM', '2082-02-29'],
  ['EX_1147', 'David Wood', 'TEA', 'warehouse', 'Consulting Fees', '$ 520,0', '10:45 AM', '2082-03-30'],
  ['EX_1130', '-', 'Property Taxes', 'General Warehouse', 'Property Taxes', '$ 2,500,0', '11:31 AM', '2082-02-29'],
  ['EX_1132', '-', 'Rent', 'General Warehouse', 'Rent', '$ 8,500,0', '11:33 AM', '2082-02-29'],
  ['EX_1134', '-', 'Abc', 'General Warehouse', 'Salaries and Wages', '$ 30,000,0', '11:43 AM', '2082-02-29'],
  ['EX_1138', '-', 'TT', 'General Warehouse', 'Utilities', '$ 1,000,0', '7:38 PM', '2082-03-07'],
  ['EX_1139', '-', 'YY', 'General Warehouse', 'Insurance', '$ 10,000,0', '7:39 PM', '2082-03-07']
].map(([reference, user, title, warehouse, category, amount, time, date]) => ({
  reference,
  user,
  title,
  warehouse,
  category,
  amount,
  time,
  date
}));

const expenseCategories = [
  'Marketing and Advertisingn',
  'Consulting Fees',
  'IT Support',
  'Warehouse Management Systems (WMS)',
  'Environmental Compliance',
  'Safety Compliance',
  'Surveillance Systems',
  'Security Personnel',
  'Equipment Depreciation',
  'Outbound Freight'
].map((name) => ({ name }));

const suppliers = [
  ['Alessandro Cremin', 'katelyn.ullrich@example.org', '9623585688', '10:52 AM', '2082-02-29'],
  ['Riya Sharma', 'riyasharma@example.in', '9987451230', '10:36 AM', '2082-02-29'],
  ['Aarav Mehta', 'aarav.mehta@example.com', '9345123489', '10:36 AM', '2082-02-29'],
  ['Sneha Kapoor', 'sneha.k@example.org', '7890654321', '10:36 AM', '2082-02-29'],
  ['Kabir Reddy', 'kabirreddy@example.com', '8123456709', '10:36 AM', '2082-02-29'],
  ['Ananya Iyer', 'ananya.iyer@example.net', '9764312457', '10:36 AM', '2082-02-29'],
  ['Devika Nair', 'devika.nair@example.in', '8897543210', '10:36 AM', '2082-02-29'],
  ['Tanmay Joshi', 'tanmayjoshi@example.org', '9123456789', '10:36 AM', '2082-02-29']
].map(([name, email, phone, time, date]) => ({ name, email, phone, time, date }));

const customers = [
  ['Cherokee Page', 'nakojox@mailinator.com', '+1 (499) 804-3909', '5:29 PM', '2082-11-22', false],
  ['Mohit', 'mohitinfyom@gmail.com', '9876543210', '4:59 PM', '2082-11-21', false],
  ['News', 'Gmail@gmail.com', '1234567890', '8:21 AM', '2082-04-04', true],
  ['dhf', 'ociuserhard17@gmail.com', '8779327348', '2:36 AM', '2082-03-12', true],
  ['XX John', 'john@xx.com', '1122334466', '11:13 AM', '2082-02-29', true],
  ['Arjun Kapoor', 'arjun.kapoor@example.in', '+919081701373', '10:35 AM', '2082-02-29', true],
  ['Meera Nair', 'meera.nair@example.org', '9823674512', '10:35 AM', '2082-02-29', true],
  ['Raghav Shetty', 'raghav.shetty@example.com', '9945768234', '10:35 AM', '2082-02-29', true],
  ['Priya Deshmukh', 'priya.d@example.net', '9845012345', '10:35 AM', '2082-02-29', true],
  ['Neha Sood', 'neha.sood@example.in', '9736582145', '10:35 AM', '2082-02-29', true]
].map(([name, email, phone, time, date, canAdd]) => ({ name, email, phone, time, date, canAdd }));

const users = [
  ['CP', 'Cherokee Page', 'nakojox@mailinator.com', 'customer', '+1 (499) 804-3909', '-', '5:29 PM', '2082-11-22'],
  ['MN', 'Mohit', 'mohitinfyom@gmail.com', 'customer', '9876543210', '-', '5:10 PM', '2082-11-21'],
  ['AS', 'Ariel Sawyer', 'vadodiqoq@mailinator.com', 'admin', '99887766584', '3', '4:39 PM', '2082-05-26'],
  ['11', '121212 121212', '121212@gmail.com', 'sellers', '081121212112', '2', '2:22 PM', '2082-03-25'],
  ['HV', 'HUA VAN CHON', 'hvchon@gmail.com', 'admin', '0812432442', '3', '12:18 PM', '2082-03-24'],
  ['AB', 'ABD BRK', 'ABDBRK@GAMIL.COM', 'sellers', '020301030201', '1', '8:00 PM', '2082-03-22'],
  ['SS', 'ss sss', 'sss@gmail.com', 'sellers', '01455626356', '1', '10:39 PM', '2082-03-09'],
  ['JU', 'jean uwizewe', 'uwizewe@gmail.com', 'sellers', '0788672782', '1', '9:45 PM', '2082-02-23'],
  ['GG', 'GAY GAY', 'gay@123.com', 'sellers', '12214124', '1', '10:10 AM', '2082-02-21'],
  ['JW', 'jay watts', 'jay@gmail.com', 'sellers', '081982172', '1', '7:35 AM', '2082-02-21']
].map(([initials, name, email, role, phone, stores, time, date]) => ({
  initials,
  name,
  email,
  role,
  phone,
  stores,
  time,
  date
}));

const walletRequests = [
  ['Mohit', 'mohitinfyom@gmail.com', 'Add Amount Request', '$ 500,0', 'Credit', '8:51 PM', '2082-12-19', 'Rejected'],
  ['Mohit', 'mohitinfyom@gmail.com', 'Refund', '$ 0,6', 'Credit', '11:48 AM', '2082-11-22', 'Approved'],
  ['Mohit', 'mohitinfyom@gmail.com', 'Refund', '$ 508,1', 'Credit', '10:27 AM', '2082-11-22', 'Approved'],
  ['Mohit', 'mohitinfyom@gmail.com', 'Add Amount Request', '$ 1,000,0', 'Credit', '9:52 AM', '2082-11-22', 'Approved']
].map(([name, email, transactionType, amount, type, time, date, action]) => ({
  name,
  email,
  transactionType,
  amount,
  type,
  time,
  date,
  action
}));

const roles = [
  ['customer', '2082-11-21', false],
  ['Sales Manager', '2082-05-26', true],
  ['Purchase Manager', '2082-05-26', true],
  ['sellers', '2082-03-22', true],
  ['AdminVH', '2082-03-16', true],
  ['Administrator', '2082-03-06', true],
  ['Abdel Gawad atef Fadl', '2082-02-30', true],
  ['ROIAX', '2082-02-13', true],
  ['Amila Prasad', '2082-01-21', true],
  ['boss', '2082-01-17', true]
].map(([name, date, editable]) => ({ name, date, editable }));

const stores = [
  ['Default Store', true, 24],
  ['General Store', false, 3],
  ['Fruite Warehouse', true, 12]
].map(([name, enabled, users]) => ({ name, enabled, users }));

const warehouses = [
  ['General Warehouse', 'generalwarehouse@gmail.com', '9874563210', 'India', 'Surat', '395006', '10:30 AM', '2082-02-29'],
  ['warehouse', 'warehouse1@infypos.com', '123456789', 'india', 'mumbai', '12345', '10:21 AM', '2082-02-29']
].map(([name, email, phone, country, city, zip, time, date]) => ({
  name,
  email,
  phone,
  country,
  city,
  zip,
  time,
  date
}));

const currencies = [
  ['Bangladeshi Taka', 'BDT', '৳'],
  ['Jenna Wilkerson', 'Perspiciatis itaque', 'Eius voluptatem cons'],
  ['Elizabeth Erickson', 'Dolor sed labore con', 'Ut animi earum esse'],
  ['Naira', 'NGN', '₦'],
  ['EURO', 'EUR', '€'],
  ['Sri Lanken Rupees', 'LKR', 'LKR'],
  ['Tanzania Shillings', 'TSH', 'TSH'],
  ['dinar tunisian', 'tnd', 'DT'],
  ['AED', 'AED', 'AED'],
  ['Rupees', 'Rs', 'Rs']
].map(([name, code, symbol]) => ({ name, code, symbol }));

const languages = [
  ['Khmer', 'km'],
  ['Indonesia', 'id'],
  ['Arabic', 'ar'],
  ['Chinese', 'cn'],
  ['English', 'en'],
  ['French', 'fr'],
  ['German', 'gr'],
  ['Spanish', 'sp'],
  ['Turkish', 'tr'],
  ['vietnamese', 'vi']
].map(([name, isoCode]) => ({ name, isoCode, enabled: true }));

const paymentMethods = [
  ['Cash', true, true],
  ['Cheque', true, true],
  ['Bank Transfer', true, true],
  ['Other', true, true],
  ['Razorpay', true, true],
  ['cred', true, true],
  ['Gpay', true, true],
  ['Customer Wallet', false, false]
].map(([name, enabled, deletable]) => ({ name, enabled, deletable }));

const fieldConfiguration = {
  customer: [
    ['Email', true],
    ['Phone Number', true],
    ['Country', true],
    ['City', true],
    ['DOB', false],
    ['Address', true]
  ].map(([name, required]) => ({ name, required })),
  supplier: [
    ['Email', true],
    ['Phone Number', true],
    ['Country', true],
    ['City', true],
    ['Address', true]
  ].map(([name, required]) => ({ name, required }))
};

const smsTemplates = [
  [
    'GREETING TO CUSTOMER ON SALES !',
    false,
    'Hi {customer_name}, Your sales Id is {sales_id}, Sales Date {sales_date}, Total Amount {sales_amount}, You have paid {paid_amount}, and customer total due amount is {due_amount} Thank you visit again'
  ],
  [
    'GREETING TO CUSTOMER ON SALES RETURN !',
    false,
    'Hi {customer_name}, Your sales return Id is {sales_return_id}, Sales return Date {sales_return_date}, and Total Amount is {sales_return_amount} Thank you visit again'
  ]
].map(([name, enabled, content]) => ({ name, enabled, content }));

const emailTemplates = smsTemplates.map((template) => ({
  ...template,
  name: template.name.replace('SMS', 'EMAIL')
}));

module.exports = {
  adjustments,
  transfers,
  quotations,
  purchases,
  purchaseReturns,
  sales,
  salesReturns,
  expenses,
  expenseCategories,
  suppliers,
  customers,
  users,
  walletRequests,
  roles,
  stores,
  warehouses,
  currencies,
  languages,
  paymentMethods,
  fieldConfiguration,
  smsTemplates,
  emailTemplates
};
