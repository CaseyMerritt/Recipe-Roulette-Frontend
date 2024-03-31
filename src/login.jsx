import React, { useState } from "react";

export const Login = (props) => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [name, setName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }
    
    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input value={email} name="email" id="email" placeholder="youremail@gmail.com" onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="password">Password</label>
                <input type="password" value={pass} name="password" id="password" placeholder="Password" onChange={(e) => setPass(e.target.value)} />
                <button type="submit">Login</button>
            </form>
            <button className="link-btn" onClick={() => typeof props.onFormSwitch === 'function' && props.onFormSwitch("register")}>Don't have an account? Register</button>
        </div>
    );
}
   