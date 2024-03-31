import React,{useState} from "react";
export const Register = (props) => {
    const[email,setEmail] = useState("");
    const[pass,setPass] = useState("");
    const[name,setName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);

    }
    
    return (
        <div className="auth-form-container">
          <>
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
              <label htmlFor="name">Full Name</label>
              <input value={name} name="name" id="name" placeholder="Full Name" onChange={(e) => setName(e.target.value)} />
              <label htmlFor="email">Email</label>
              <input value={email} name="email" id="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
              <label htmlFor="password">Password</label>
              <input type="password" value={pass} name="password" id="password" placeholder="Password" onChange={(e) => setPass(e.target.value)} />
              <button type="submit">Register</button>
            </form>
          </>
          <>
            <button className="link-btn" onClick={() => props.onFormSwitch("Login")}>Already have an account? Login</button>
          </>
        </div>
      );
    }      