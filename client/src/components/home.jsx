import React from 'react';
import { useLocation } from 'react-router-dom';

function Home() {
  const location = useLocation();
  const name = location.state?.userName
    const backgroundImageStyle = {
        backgroundImage: 'https://images.pexels.com/photos/17485706/pexels-photo-17485706/free-photo-of-an-artist-s-illustration-of-artificial-intelligence-ai-this-image-visualises-the-input-and-output-of-neural-networks-and-how-ai-systems-perceive-data-it-was-created-by-rose-pilkington.png',
        backgroundSize: 'cover', // Optional, to cover the entire container
        backgroundPosition: 'center', // Optional, to center the image
        height: '100vh', // Set the height as needed
      };
    
    return ( <>

    <h1>Home <strong>{name}</strong></h1>
   <div style={backgroundImageStyle}>
   </div>


        
    <footer class="bg-light py-3 text-center">
    <input
  className="form-control"
  type="text"
  defaultValue="ask me."
  aria-label="readonly input example"
  readOnly=""
/>

    </footer>


    </> );
}

export default Home;