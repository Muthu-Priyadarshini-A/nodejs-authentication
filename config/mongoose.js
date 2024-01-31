const mongoose = require("mongoose");
require("dotenv").config()


mongoose.connect("mongodb+srv://priyaarumugam2303:C9OX0hUzqdGGVyEg@cluster0.oiiyl7u.mongodb.net/?retryWrites=true&w=majority")
    .then(() => { console.log('Database is connected successfully') })
    .catch((error) => { console.log('not connected to database') })