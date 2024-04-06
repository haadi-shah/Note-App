import mongoose from "mongoose";


//connecting to database
mongoose.connect('mongodb://localhost:27017/note-app')
.then(() => console.log('Connected to db successfully!'))
.catch((err) => console.error("db connection failed ",err));
