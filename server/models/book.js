import mongoose from 'mongoose';

const bookSchema = mongoose.Schema({
    volumeId: String,
    title: String,
    author: String,
    pageCount: Number,
    avgRating: {
        type: Number,
        default: 0,
    },
    userRating: {
        type: Number,
        default: 0,
    },
    coverLink: String,
    genres: [String],
    status: {
        enum: [ 'Read', 'Currently Reading', 'To Be Read' ]
    },
})

var Book = mongoose.model('Book', bookSchema);

export default Book;