import { useState } from "react"
import {BiSend} from 'react-icons/bi'

export default function MainContent(props: any) {
    // ADD STYLING

    const [inputField, setInputField] = useState<string>('')

    return(
        <main className="main_content">
            <div className="main_upper">
                <div className="hashtag">
                    <span>#</span>
                </div>
                <div className="left_side">
                    <h1>{props.currentChannel}</h1>
                    <h3>Ask everything that is or sounds weird.</h3>
                </div>
            </div>
            <div className="message_container">
                {props.channelMessages.map((channel: any) => {
                    return(
                        <div className="message">
                            <div className="image_container">
                                <img src={`${props.picture}`} alt="pf" className="main_image" />
                            </div>
                            <div className="this_message_content">
                                <h3 className="username">{props.username}</h3>
                                <h3 className="message_content">{channel.message_content}</h3>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="main_bottom">
                    <input 
                        type="text" 
                        value={inputField} 
                        onChange={(e) => setInputField(e.target.value)}
                        className="main_input"
                        placeholder={`Message # ${props.currentChannel}`}
                    />
                    <button 
                        onClick={() => {
                        props.addMessage(inputField);
                        setInputField('');
                        }}
                        className="main_button"
                    >
                        <BiSend />
                    </button>
            </div>
        </main>
    )
}