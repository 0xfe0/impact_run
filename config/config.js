//DB config
let db = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "test@123",
    DB: "impactrun",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
};

//production or dev?
const isProduction = process.env.NODE_ENV === 'production';

let CSV_BASE_PATH = "/tmp/uploads/";


//export stuff
module.exports = {
    db: db,
    isProduction: isProduction,
    CSV_BASE_PATH: CSV_BASE_PATH,
};