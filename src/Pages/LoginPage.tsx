import Nav from "../Components/Nav"
import '../App.css'
import { Link } from "react-router-dom"
import { useState } from 'react'

export default function LoginPage() {
    const [loginEmail, setLoginEmail] = useState<string>('')
    const [loginPassword, setLoginPassword] = useState<string>('')
    const [loginUsername, setLoginUsername] = useState<string>('')

    // TO-DO:
    // login user with firebase auth

    return(
        <div className="loginPage">
            <Nav />
            <div className="loginFormContainer">
                <form className="register">
                    <h1 className="registerTitle">Sign-in with an account</h1>
                    <section className="input">
                        <h4 className="registerInputTitle">EMAIL</h4>
                        <input 
                            type="email" 
                            className="registerInput"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                        />
                    </section>
                    <section className="input">
                        <h4 className="registerInputTitle">USERNAME</h4>
                            <input 
                            type="text" 
                            className="registerInput"
                            value={loginUsername}
                            onChange={(e) => setLoginUsername(e.target.value)}
                        />
                    </section>
                    <section className="input">
                        <h4 className="registerInputTitle">PASSWORD</h4>
                        <input 
                            type="password" 
                            className="registerInput"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                        />
                    </section>
                    <div className="buttonContainer">
                        <button className="registerButton">Login</button>
                    </div>
                    <Link to='/register' style={{ color: '#1984b9', textDecoration: 'none'}}>Don't have an account?</Link>
                </form>
            </div>
        </div>
    )
}