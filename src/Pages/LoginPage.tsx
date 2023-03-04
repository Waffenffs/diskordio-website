import Nav from "../Components/Nav"
import '../App.css'
import { Link } from "react-router-dom"
import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from "react-router-dom"

export default function LoginPage(props: any) {
    const [loginEmail, setLoginEmail] = useState<string>('')
    const [loginPassword, setLoginPassword] = useState<string>('')
    const navigate = useNavigate()

    function handleSubmit(e: any) {
        e.preventDefault()

        if(loginEmail.split('').length === 0 || loginPassword.split('').length === 0){
            // one or more of the two input fields is/are empty
        } else {
            signInWithEmailAndPassword(props.auth, loginEmail, loginPassword)
            .then(() => {
                setTimeout(() => {
                    navigate('/')
                }, 1000);
            })
        }
    }

    return(
        <div className="loginPage">
            <Nav />

            <div className="loginFormContainer">
                <form className="loginRegister" onSubmit={handleSubmit}>
                    <div className="upperTitles">
                        <h1>Welcome back!</h1>
                        <p>We're so excited to have you back here.</p>
                    </div>
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
                    <Link to="/register" style={{ color: '#1984b9', textDecoration: 'none'}}>Don't have an account?</Link>
                </form>
            </div>
        </div>
    )
}