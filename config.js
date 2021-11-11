db = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "test@123",
    DB: "impact_run",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
}

//export stuff
module.exports = {
    db: db,
};