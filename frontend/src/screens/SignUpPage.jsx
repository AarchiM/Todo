import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [credential, setCredential] = useState({
    name: "",
    email: "",
    password: "",
  })
  const navigate = useNavigate();

  const SignUpCredentials = async () => {
    try {
        const response = await fetch("/api/createUser",{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                name: credential.name,
                email: credential.email,
                password: credential.password,
            })
        })
        const data = await response.json();
        localStorage.setItem("email",credential.email);
        localStorage.setItem("Authtoken", data.Authtoken);
        navigate('/tasks');

        
    } catch (error) {
        console.log("Error: ",error);
    }
  }

  return (
    <div className="flex items-center shadow-lg h-1/2 justify-center flex-col">
      <h2 className="font-bold text-xl mb-5">Sign Up</h2>
      <div className="m-5 flex flex-col gap-3">
        <div className="flex gap-9">
          <div className="text-left">Name </div>
          <div>
            : <input
              type="email"
              value={credential.name}
              onChange={(e) => setCredential((prev) => ({...prev, name: e.target.value}))}
              className="border"
            />
          </div>
        </div>
        <div className="flex gap-10">
          <div className="text-left">Email </div>
          <div>
            : <input
              type="email"
              value={credential.email}
              onChange={(e) => setCredential((prev) => ({...prev, email: e.target.value}))}
              className="border"
            />
          </div>
        </div>
        <div className="flex gap-3">
          <div className="text-left">Password </div>
          <div>
            : <input
              type="password"
              value={credential.password}
              onChange={(e) => setCredential((prev) => ({...prev, password: e.target.value}))}
              className="border"
            />
          </div>
        </div>
      </div>
      <button onClick={SignUpCredentials}>Sign Up</button>
      <p>
        Already have Account? <Link to="/">Login</Link>
      </p>
    </div>
  );
};

export default SignUpPage;
