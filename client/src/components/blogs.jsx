import React from 'react';

function Blogs() {


    const handleSubmit = ()=>{
        window.location.href = 'http://localhost:3000/auth/google';
    };
    return (  <>
<div>
    <button onClick={handleSubmit}>grant permission</button>
</div>
    </>);
}

export default Blogs;
