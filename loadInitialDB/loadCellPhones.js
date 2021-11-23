db = db.getSiblingDB('grupo5-cellphone');
db.cellPhones.drop();
db.cellPhones.insertMany([
	{
		name: 'Samsung',
		cost: 3000,
	},
	{
		name: 'Apple',
		cost: 7000,
	},
	{
		name: 'Iphone',
		cost: 7000,
	},
	{
		name: 'Motorola',
		cost: 3000,
	},
	{
		name: 'Xiaomi',
		cost: 2500,
	},
	{
		name: 'Huawei',
		cost: 1500,
	},
	{
		name: 'Lenovo',
		cost: 2500,
	},
	{
		name: 'LG',
		cost: 1500,
	},
	{
		name: 'Sony',
		cost: 1500,
	},
]);
