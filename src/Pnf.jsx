import React from 'react'
import pnfpic from './assets/pnf.gif.gif'
const Pnf = () => {
  return (
   <>
    <div className="pnf-container">
      <h1 className="pnf-title">404</h1>
      <p className="pnf-message">Oops! The page you're looking for doesn't exist.</p>
      <img
        src={pnfpic} // Replace with a gym supplement or fitness-related image
        alt="Page not found"
        className="pnf-image"
      />
      <a href="/" className="pnf-button">
        Back to Home
      </a>
    </div>
   </>
  )
}

export default Pnf
