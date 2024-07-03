import '@testing-library/jest-dom';
import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { Bookshelf } from './BookShelf';

describe('Bookshelf', () => {
  test('Should render correctly', () => {
    render(<Bookshelf />);
    const bookshelf = screen.getByTestId('book-shelf');
    expect(bookshelf).toBeInTheDocument();
  });

  test('Should add a book', () => {
    render(<Bookshelf />);
    const input = screen.getByPlaceholderText('Enter book title');
    const button = screen.getByText('Add Book');

    fireEvent.change(input, { target: { value: 'The Great Gatsby' } });
    fireEvent.click(button);

    expect(screen.getByText('The Great Gatsby')).toBeInTheDocument();
  });

  test('Should remove a book', async () => {
    render(<Bookshelf />);
    const input = screen.getByPlaceholderText('Enter book title');
    const addButton = screen.getByText('Add Book');

    fireEvent.change(input, { target: { value: 'The Great Gatsby' } });
    fireEvent.click(addButton);

    const removeButton = await screen.getByText('Remove');
    fireEvent.click(removeButton);

    expect(screen.queryByText('The Great Gatsby')).not.toBeInTheDocument();
  });
});
