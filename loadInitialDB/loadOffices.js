db = db.getSiblingDB('grupo5-cellphone');
db.offices.drop();
db.offices.insertMany([
	{
		name: 'Sucursal Palermo',
		address: 'Palermo',
		phone: '1145693214',
	},
	{
		name: 'Sucursal Belgrano',
		address: 'Belgrano',
		phone: '1174129541',
	},
	{
		name: 'Sucursal Caballito',
		address: 'Caballito',
		phone: '116543214',
	},
	{
		name: 'Sucursal Almagro',
		address: 'Almagro',
		phone: '1155663248',
	},
	{
		name: 'Sucursal Colonia',
		address: 'Colonia',
		phone: '1147856325',
	},
]);
