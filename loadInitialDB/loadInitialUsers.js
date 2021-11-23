db = db.getSiblingDB('grupo5-cellphone');
db.users.drop();
db.users.insertMany([
	{
		email: 'figuerajhonny5@gmail.com',
		password: 'abc123',
		activeAccount: true,
		phone: '1112341234',
		fullName: 'Jhonny Figuera',
	},
	{
		email: 'miyashirodaisuke@gmail.com',
		password: 'abc123',
		activeAccount: false,
		phone: '1112341234',
		fullName: 'Daisuke Miyashiro',
	},
	{
		email: 'patrodriguez87@gmail.com',
		password: 'abc123',
		activeAccount: true,
		phone: '1112341234',
		fullName: 'Patricia Rodriguez',
	},
]);
