import React from 'react';
import { Link } from 'react-router-dom';
function Navbar() {
    return ( <>
    <div>
   hi this is navbar
   <Link to ="/"><li>home</li></Link>
   <Link to ="/profile"><li>profile</li></Link>
   <Link to ="/login"><li>login</li></Link>
    </div>
    </> );
}

export default Navbar;