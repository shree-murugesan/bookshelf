import express from 'express';
import mongoose from 'mongoose';
import { TBR, READ, CURRENTLY_READING } from '../constants.js';

import Book from '../models/book.js';

const router = express.Router();

export const addBook = async (req, res) => {
    const { volumeId, title, author, pageCount, avgRating, userRating, coverLink, genres, status } = req.body;

    try {
        const newBook = new Book({
            volumeId, title, author, pageCount, avgRating, userRating, coverLink, genres, status
        });

        let saveBook = await newBook.save().then(newBook => {
            res.status(201).json(newBook);
        }).catch(err => {
            console.log(err.message);
            if (err.code === 11000) {
                res.status(400).json({ message: 'Book already exists in collection' });
            } else {
                res.status(409).json({ message: err.message });
            }
        });
    } catch (error) {
        console.log(error.message);
        res.status(409).json({ message: error.message });
    }
}

export const updateBook = async (req, res) => {
    const { id } = req.params;
    const { volumeId, title, author, pageCount, avgRating, userRating, coverLink, genres, status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No book with id: ${id}`);

    const updatedBook = { volumeId, title, author, pageCount, avgRating, userRating, coverLink, genres, status, _id: id };

    await Book.findByIdAndUpdate(id, updatedBook, { new: true });

    res.json(updatedBook);
}

export const getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getBooksCurrentlyReading = async (req, res) => {
    try {
        const books = await Book.find({ status: CURRENTLY_READING });
        res.status(200).json(books);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getBooksRead = async (req, res) => {
    try {
        const books = await Book.find({ status: READ });
        res.status(200).json(books);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getBooksTBR = async (req, res) => {
    try {
        const books = await Book.find({ status: TBR });
        res.status(200).json(books);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getRandomBook = async (req, res) => {
    const { genre } = req.params;
    try {
        let book;
        if (genre == 'Any') {
            book = await Book.aggregate([
                { $match: { status: TBR } },
                { $sample: { size: 1 } },
            ]);
        } else {
            book = await Book.aggregate([
                { $match: { status: TBR, genre: genre } },
                { $sample: { size: 1 } }
            ]);
        }

        res.status(200).json(book);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export default router;