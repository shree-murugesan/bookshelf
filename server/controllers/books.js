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

export const updateBook = async (req, res) => {
    const { id } = req.params;
    const { volumeId, title, author, pageCount, avgRating, userRating, coverLink, genres, status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No book with id: ${id}`);

    const updatedBook = {volumeId, title, author, pageCount, avgRating, userRating, coverLink, genres, status, _id: id};

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
        const books = await Book.find( { status: 'Currently Reading' } );     
        res.status(200).json(books);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getBooksRead = async (req, res) => {
    try {
        const books = await Book.find( { status: 'Read' } );     
        res.status(200).json(books);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getBooksTBR = async (req, res) => {
    try {
        const books = await Book.find( { status: 'To Be Read' } );     
        res.status(200).json(books);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export default router;