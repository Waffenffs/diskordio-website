import Nav from "../Components/Nav"
import { useState } from "react"
import { Link } from "react-router-dom"
import '../App.css'

export default function RegisterPage() {
    const [registerEmail, setRegisterEmail] = useState<string>('')
    const [registerUsername, setRegisterUsername] = useState<string>('')
    const [registerPassword, setRegisterPassword] = useState<string>('')

    // TO-DO:
    // register user with firebase auth

    return(
        <div className="registerPageBox">
            <Nav />
            <div className="registerPage">
                <div className="registerContainer">
                    <form className="register">
                        <h1 className="registerTitle">Create an account</h1>
                        <section className="input">
                            <h4 className="registerInputTitle">EMAIL</h4>
                            <input 
                                type="email" 
                                className="registerInput"
                                value={registerEmail}
                                onChange={(e) => setRegisterEmail(e.target.value)}
                            />
                        </section>
                        <section className="input">
                            <h4 className="registerInputTitle">USERNAME</h4>
                                <input 
                                type="text" 
                                className="registerInput"
                                value={registerUsername}
                                onChange={(e) => setRegisterUsername(e.target.value)}
                            />
                        </section>
                        <section className="input">
                            <h4 className="registerInputTitle">PASSWORD</h4>
                            <input 
                                type="password" 
                                className="registerInput"
                                value={registerPassword}
                                onChange={(e) => setRegisterPassword(e.target.value)}
                            />
                        </section>
                        <div className="buttonContainer">
                            <button className="registerButton">Register</button>
                        </div>
                        <Link to='/login' style={{ color: '#1984b9', textDecoration: 'none'}}>Already have an account?</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}