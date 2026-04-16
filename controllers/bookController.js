const Book = require('../models/Book');

const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar livros' });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar livro' });
  }
};

const createBook = async (req, res) => {
  try {
    const { title, author, genre, status, rating } = req.body;

    const newBook = new Book({
      title,
      author,
      genre,
      status,
      rating
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar livro' });
  }
};

const updateBook = async (req, res) => {
  try {
    const { title, author, genre, status, rating } = req.body;

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, genre, status, rating },
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }

    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar livro' });
  }
};

const deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    if (!deletedBook) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }

    res.json({ message: 'Livro removido com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir livro' });
  }
};

module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};