import express from 'express';
import mongoose from 'mongoose';

import Book from '../models/book.js';

const router = express.Router();

export const addBook = async (req, res) => {
    const { volumeId, title, author, pageCount, avgRating, userRating, coverLink, genres, status } = req.body;

    const newBook = new Book({ 
        volumeId, title, author, pageCount, avgRating, userRating, coverLink, genres, status
     })

    try {
        await newBook.save();

        res.status(201).json(newBook);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getBooks = async (req, res) => {
    try {
        const books = await Book.find();
                
        res.status(200).json(books);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export default router;