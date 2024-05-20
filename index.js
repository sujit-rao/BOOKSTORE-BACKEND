import express from 'express';
import 'dotenv/config'
import mongoose from 'mongoose'
import bookRoute from './Routes/book.route.js'
import userRoute from './Routes/user.route.js'
import cors from 'cors'

const app = express()

app.use(cors());

app.use(cors({
  origin: 'https://bookstore-frontend-virid.vercel.app'
}));
app.use(express.json());

const port = process.env.PORT || 4000;

//COnnect to mongodb
const URI = process.env.URI;
try {
  mongoose.connect(URI).then(
    ()=> {console.log("Mongo db is connected")}
  )
    
  }
 catch (error) {
  console.log("Error connecting to MongoDB")
}

//Defining Routes

app.use("/book", bookRoute)
app.use("/user", userRoute);
 

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  res.status(200).json({
    message: "Working "
})
})