const mongoose = require("mongoose")
console.log('connecting to mongo db database');
mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false,
}).then(() => {
    console.warn("Database connected successfully");
}).catch((e) => {
    console.warn("Database connection failed");
})
