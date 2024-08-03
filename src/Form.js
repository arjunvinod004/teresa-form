import React from 'react'
import { useNavigate } from 'react-router-dom';
function Form() {
    const navigate=useNavigate();
    const data = { name: "John", age: 30 };
    console.log(data);
    const handleclick=()=>{
        navigate('/teresa',{state:data})
    }
  return (
    <div style={{position:'relative'}}>
<button type='submit' onClick={handleclick}>click me</button>
    </div>
    
  )
}

export default Form