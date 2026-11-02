const products = [
  ['DO5AN', '111', "Nature's Best", '$ 13,0', 'piece', '0', '5:29 PM', '2083-01-24', 'placeholder'],
  ['Collar T-Shirt', '54F54MOJLI', 'sweet farms', '$ 599,0', 'piece', '24', '3:31 PM', '2083-01-24', 'placeholder'],
  ['volt original', '78687868', 'LEGO', '$ 0,5', 'piece', '88', '6:32 AM', '2083-01-15', 'placeholder'],
  ['Nabin', 'HNJ8SCV6BR4', "Nature's Best", '$ 200,0', 'piece', '70', '7:08 PM', '2083-01-08', 'photo'],
  ['Aloe Vera Plant', 'GIUMSUDU', 'sweet farms', '$ 100,0', 'piece', '101', '3:41 PM', '2083-01-08', 'placeholder'],
  ['Hammar Lock', 'IB0FPE', 'sweet farms', '$ 500,0', 'piece', '41', '9:42 PM', '2083-01-05', 'placeholder'],
  ['Variable Product', '098768987', 'sweet farms', '$ 1,0 - $ 808,0', 'meter', '0', '11:36 AM', '2083-01-01', 'placeholder'],
  ['shakeel', 'cosmetics', 'sweet farms', '$ 15,0', 'piece', '97', '10:24 AM', '2082-12-30', 'photo-muted'],
  ['MEDLIFE PHARMACY AND STO...', 'joyousraccoon881', 'Generic', '$ 100,0', 'set', '34', '1:09 PM', '2082-12-29', 'placeholder'],
  ['MEDLIFE PHARMACY AND STO...', 'NETGEAR37', 'Generic', '$ 100,0', 'set', '100', '6:54 PM', '2082-12-13', 'placeholder']
].map(([name, code, brand, price, unit, stock, time, date, image]) => ({
  name,
  code,
  brand,
  price,
  unit,
  stock,
  time,
  date,
  image
}));

const productCategories = [
  ['Electronics', 14],
  ['Accessories', 4],
  ['Clothing', 8],
  ["MEN'S APPAREL", 12],
  ["WOMEN'S APPAREL", 0],
  ["KID'S APPAREL", 3],
  ['PLASTIC CONTAINERS', 1],
  ['LUGGAGE', 0],
  ['FOOTWEAR', 3],
  ['CROCKERY', 0]
].map(([name, count]) => ({ name, count }));

const variations = [
  ['Size', 'X , XL , XXL , M , Small , Medium , Large'],
  ['Colours', 'Red , Green , Blue , Black , Yellow'],
  ['Color', 'Red , Blue , Black']
].map(([name, types]) => ({ name, types }));

const brands = [
  ['Samsung', 12, 'placeholder'],
  ['Generic', 9, 'placeholder'],
  ['Puma', 9, 'placeholder'],
  ['LEGO', 32, 'placeholder'],
  ['Aashirvaad', 8, 'placeholder'],
  ['Tata Sampann', 16, 'placeholder'],
  ['sweet farms', 96, 'placeholder'],
  ["Nature's Best", 59, 'nature']
].map(([name, count, image]) => ({ name, count, image }));

const units = [
  ['set', 'set', 'set', '2:06 PM', '2082-04-05'],
  ['Gram', 'gm', 'kilogram', '4:57 PM', '2082-03-03'],
  ['meter', 'meter', 'meter', '10:43 AM', '2082-02-29'],
  ['piece', 'piece', 'piece', '10:43 AM', '2082-02-29'],
  ['kilogram', 'kilogram', 'kilogram', '10:42 AM', '2082-02-29']
].map(([name, shortName, baseUnit, time, date]) => ({
  name,
  shortName,
  baseUnit,
  time,
  date
}));

const baseUnits = ['set', 'piece', 'meter', 'kilogram'].map((name) => ({ name }));

module.exports = {
  products,
  productCategories,
  variations,
  brands,
  units,
  baseUnits
};
