import mongoose from 'mongoose';

const bookSchema = mongoose.Schema({
    volumeId: {
        type: String,
        unique: true,
    },
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
        type: String,
        enum: [ 'Read', 'Currently Reading', 'To Be Read' ],
        default: 'To Be Read',
    },
})

var Book = mongoose.model('Book', bookSchema);

export default Book;