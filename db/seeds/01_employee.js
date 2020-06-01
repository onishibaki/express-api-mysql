exports.seed = (knex, Promise) => {
  return knex("employees")
    .del()
    .then(() => {
      return knex("employees").insert([{ firstName: "Mau", lastName: "Nyx" }]);
    });
};
