import Nav from "../Components/Nav"
import { useState } from "react"
import { Link } from "react-router-dom"
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import '../App.css'

export default function RegisterPage(props: any) {
    const [registerEmail, setRegisterEmail] = useState<string>('')
    const [registerUsername, setRegisterUsername] = useState<string>('')
    const [registerPassword, setRegisterPassword] = useState<string>('')
    const [showWarning, setShowWarning] = useState<boolean>(false)

    function handleSubmit(e: any) {
        e.preventDefault()

        if(registerEmail.split('').length === 0 || registerUsername.split('').length === 0 || registerPassword.split('').length === 0){
            // invalid input fields
            setShowWarning(true)

            setTimeout(() => {
                setShowWarning(false)
            }, 5000)

            console.log('empty input fields!')
        } else {
            if(!showWarning){
                setShowWarning(false)
            }

            createUserWithEmailAndPassword(props.auth, registerEmail, registerPassword)
            .then(async (userCredentials) => {
                await setDoc(doc(props.db, "users", registerEmail.split('@')[0]), {
                    username: registerUsername,
                    email: registerEmail
                })

                console.log('Succesfully admitted to database.')
            })
        }
    }

    return(
        <div className="registerPageBox">
            <Nav />
            <div className="registerPage">
                <div className="registerContainer">
                    <form className="register" onSubmit={handleSubmit}>
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
                            {showWarning && <span className="registerWarning">Invalid input fields!</span>}
                        </div>
                        <Link to='/login' style={{ color: '#1984b9', textDecoration: 'none'}}>Already have an account?</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}