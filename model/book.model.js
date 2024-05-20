import mongoose from "mongoose";

const  bookSchema = mongoose.Schema({
    name:String,
    price:Number,
    category:String,
    image:String,
    title:String
})
// Create the Book model with fields for title, author, description and a method to get an HTML representation of the book


const Book = mongoose.model("Book", bookSchema)

export default Book;