module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      database: "db_app",
      user: "root",
      password: "admin12",
    },
    // pool: {
    //   afterCreate: (conn, done) => {
    //     conn.query("SELECT * from employees", (err) => {
    //       err && console.log(`DB connectiom error: ${err}`);
    //       done(err, conn);
    //     });
    //   },
    // },
    migrations: {
      directory: __dirname + "/db/migrations",
    },
    seeds: {
      directory: __dirname + "/db/seeds",
    },
  },

  staging: {},

  production: {},
};
