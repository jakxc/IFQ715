import './App.css';
import Book from './components/Book'
import { useState } from 'react';

function App() {
  const books = [
    {
      id: 1,
      title: "1984",
      author: "George Orwell",
    },
    {
      id: 2,
      title: "The Magician's Nephew",
      author: "C. S. Lewis",
    },
    {
      id: 3,
      title: "The Hitchhiker's Guide to the Galaxy",
      author: "Douglas Adams",
    },
    {
      id: 4,
      title: "The Book Thief",
      author: "Markus Zusak",
    },
  ];

  const [booksData, setBooksData] = useState(books);

  const incrementLike = (id) => {
    setBooksData((prev) => {
      for (const book of prev) {
        if (book.id === id) {
          book.like ? book.like++ : book.like = 1;
        }
      }

      return prev;
    })
  }

  const incrementDislike = (id) => {
    setBooksData((prev) => {
      const newBooks = prev;
      for (const book of newBooks) {
        if (book.id === id) {
          book.dislike ? book.dislike++ : book.dislike = 1;
        }
      }

      return newBooks;
    })
  }

  const bookElements = booksData.map(book => {
    return <Book 
      key={book.id}
      title={book.title} 
      author={book.author}
      likes={book.likes || 0}
      dislikes={book.dislikes || 0}
      setLikes={(id) => incrementLike}
      setDislikes={(id) => incrementDislike}
    />
  })

  return (
    <div className="App">
      {bookElements}
    </div>
  );
}

export default App;
