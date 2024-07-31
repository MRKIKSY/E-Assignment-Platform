import React, { useEffect } from 'react'
import '../css/Home.css'
import axios from 'axios'

const Home = () => {
  
  return (
    <div className='hero'>
        <div className="hero-content">
            <h1 className='hero-text'> Royal Scholar Academy <br></br>
              E-assignments</h1>
            <p className='hero-description'>
            Explore our e-Assignment Platform where teachers can effortlessly set and upload assignments, 
            and students can easily log in to complete their tasks—all on one integrated platform. Your one-stop solution for efficient and engaging education!"
            </p>
        </div>
        <div className="hero-image"></div>
    </div>
  )
}

export default Home