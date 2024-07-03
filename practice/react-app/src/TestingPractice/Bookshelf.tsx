import React, { useState } from 'react';

type Book = {
  id: number;
  title: string;
};

export const Bookshelf: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [bookTitle, setBookTitle] = useState<string>('');

  const addBook = () => {
    if (bookTitle.trim() === '') return;

    const newBook = { id: Date.now(), title: bookTitle.trim() };
    setBooks([...books, newBook]);
    setBookTitle('');
  };

  const removeBook = (id: number) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  return (
    <div data-testid="book-shelf">
      <input
        type="text"
        value={bookTitle}
        onChange={(e) => setBookTitle(e.target.value)}
        placeholder="Enter book title"
      />
      <button onClick={addBook}>Add Book</button>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title}
            <button onClick={() => removeBook(book.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
