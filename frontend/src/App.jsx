import React, { useState } from "react";
import "./App.css";
import { Link, useNavigate } from "react-router-dom";

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const LoginCredentials = async() =>{
    try{
      const res = await fetch('/api/login',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email, password
        })
      })
      const data = await res.json()
      if(!res.ok){
        return alert("Enter Correct Email and Passsword");
      }
      localStorage.setItem('Authtoken', data.Authtoken);
      localStorage.setItem('email', email);
      navigate('/tasks');
      
    } catch (error) {
      console.error(error);
      
    }
  }

  return (
    // <Link to={'/tasks'}>
    //   <button>Click Me</button>
    // </Link>
    <div className="flex items-center shadow-lg h-1/2 justify-center flex-col">
      <h2 className="font-bold text-xl mb-5">Login</h2>
    <div className="m-5 flex flex-col gap-3">
      <div className="flex gap-10">
        <div className="text-left">Email </div>
        <div>: <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} className="border"/></div>
      </div>
      <div className="flex gap-3">
        <div className="text-left">Password </div>
        <div>: <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} className="border"/></div>
      </div>
    </div>
    <button onClick={LoginCredentials}>login</button>
    <p>dont have Account? <Link to=''>Sign Up</Link></p>
    </div>
  );
}

export default App;
