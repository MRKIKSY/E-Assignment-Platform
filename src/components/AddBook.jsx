import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage

        axios.post('https://e-assignment-platform-backend.onrender.com/book/add', 
          { name, author }, 
          {
            headers: {
              'Authorization': `Bearer ${token}` // Include token in headers
            },
            withCredentials: true
          })
        .then(res => { 
            if (res.data.added) {
                navigate('/books');
            } else {
                console.log(res.data.message);
            }
        })
        .catch(err => console.log(err));
    };

    return (
        <div className="student-form-container">
            <form className="student-form" onSubmit={handleSubmit}>
                <h2>Add Book</h2>
                <div className="form-group">
                    <label htmlFor="book">Book Name:</label>
                    <input
                        type="text"
                        id="book"
                        name="book"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="author">Author Name:</label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </div>
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default AddBook;
