import mongoose from 'mongoose';

const bookSchema = mongoose.Schema({
    volumeId: {
        type: String,
        validate: {
            validator: function(v) {
              Book.find({volumeId: v}, function(err,docs) {
                 if (docs.length >= 1) {
                    return false;
                 } else {
                     return true;
                 }
              } );
            },
            message: 'Book already exists!'
          }
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