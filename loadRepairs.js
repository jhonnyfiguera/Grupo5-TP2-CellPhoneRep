db = db.getSiblingDB('grupo5-cellphone');
db.users.drop();
db.users.insertMany([
	{
		name: 'Cambio de Pantalla',
		cost: 6000,
	},
	{
		name: 'Fallas por Sotfware',
		cost: 5000,
	},
	{
		name: 'Componentes Internos',
		cost: 6000,
	},
	{
		name: 'Bateria',
		cost: 5000,
	},
	{
		name: 'Accesorios Adicionales',
		cost: 2500,
	},
]);