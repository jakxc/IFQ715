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
      return prev.map(book => book.id === id ? {...book, 
        likes: book.likes 
                ? book.likes++
                : 1 } : book)
    })
  }

  const incrementDislike = (id) => {
    setBooksData((prev) => {
      return prev.map(book => book.id === id ? {...book, 
        dislikes: book.dislikes 
                ? book.dislikes++
                : 1 } : book)
    })
  }

  const bookElements = booksData.map(book => {
    return <Book 
      key={book.id}
      id={book.id}
      title={book.title} 
      author={book.author}
      likes={book.likes || 0}
      dislikes={book.dislikes || 0}
      setLikes={() => incrementLike(book.id)}
      setDislikes={() => incrementDislike(book.id)}
    />
  })

  return (
    <div className="App">
      {bookElements}
    </div>
  );
}

export default App;
