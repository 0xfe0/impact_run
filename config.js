var mongoose = require('mongoose')
const { Users } = require('./src/models/User')


//if the server is production
const isProduction = process.env.NODE_ENV === 'production';

//mongo PORT
const mongo_port = "27111";

//default admin password
const ADMIN_PASS = "heyyouwhitehouse";

//connect to the DB
let ADMIN_MONGO_URL = "mongodb://localhost:" + mongo_port + "/ed_facade";
let db = mongoose.connect(ADMIN_MONGO_URL);

//init
Users.countDocuments()
.then((res) => {
    if(!res) {
        const newUser = new Users({
            email: "admin@thepsychedelics.club",
            firstName: "Ayush",
            lastName: "Bhat",
        });

        newUser.setPassword("psych@123");
        newUser.save();
    }
})

//export stuff
module.exports = {
    db: db,
    mongoose_port: mongo_port,
    isProduction: isProduction,
};