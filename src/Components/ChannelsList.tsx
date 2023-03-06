import { getDocs, collection } from 'firebase/firestore'
import { useState, useEffect } from 'react'

export default function ChannelsList(props: any) {
    interface Channel {
        channel_name?: string
        channel_display_content: boolean
    }

    return(
        <nav className="channels-list">
            <div className="channels_container">
                {props.channelsList.map((channel: Channel) => {
                    return(
                        <div className='channel_container'>
                            <span className='channel_name'># {channel.channel_name}</span>
                        </div>
                    )
                })}
            </div>
        </nav>
    )
}