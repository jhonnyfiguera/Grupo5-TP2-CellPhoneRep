db = db.getSiblingDB("grupo5-cellphone");
db.users.drop();
db.users.insertMany([
  {
    name: "Jhonny Figuera",
    email: "figuerajhonny5@gmail.com",
    phone: "",
    password: "",
    token: "",
  },
  {
    name: "Daisuke Miyashiro",
    email: "miyashirodaisuke@gmail.com",
    phone: "",
    password: "",
    token: "",
  },
  {
    name: "Patricia Rodriguez",
    email: "patrodriguez87@gmail.com",
    phone: "",
    password: "",
    token: "",
  },
]);
