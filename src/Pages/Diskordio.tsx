import { collection, query, where, getDocs, getDoc, doc, addDoc, onSnapshot, orderBy, serverTimestamp } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import ServerList from "../Components/ServerList"
import ChannelsList from '../Components/ChannelsList'
import MainContent from '../Components/MainContent'

export default function Diskordio(props: any){
    interface ServerObject {
        server_name: string
        server_data?: any
        server_display: boolean
    }

    interface Channel {
        channel_name?: string
        channel_display_content: boolean
    }

    interface MessageStructure {
        username: string
        message_content?: string
        id?: any
        timestamp?: any
    }

    const [currentUserUsername, setCurrentUserUsername] = useState<string | null>(null)
    const [profileSrc, setProfileSrc] = useState<string | null>(null)
    const [serverIds, setServerIds] = useState<Array<string>>([]);
    const [currentServers, setCurrentServers] = useState<Array<ServerObject>>([]);
    const [channels, setChannels] = useState<Array<Channel>>([]);
    const [fixedChannels, setFixedChannels] = useState<Array<Channel>>([]);
    const [channelMessages, setChannelMessages] = useState<Array<any>>([]);
    const [currentChannel, setCurrentChannel] = useState<any>(null);
    const [currentServer, setCurrentServer] = useState<any>(null);

    useEffect(() => {
        if(currentChannel !== null){
            // TO DO:
            // organize message lists. latest message will always be at the bottom of the shit.
            const q = query(collection(props.db, `servers/${currentServer}/channels/${currentChannel}/messages`), orderBy('timestamp'))

            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                let this_channel_messages = new Array<MessageStructure>();

                querySnapshot.forEach((doc) => {
                    const this_message: MessageStructure = {
                        username: props.user.email,
                        message_content: doc.data().message_content,
                        timestamp: doc.data().timestamp.toDate(),
                    }
                    
                    this_channel_messages.push(this_message)
                })

                setChannelMessages(this_channel_messages)
            })
        }
    }, [currentChannel])

    // fetch call at initialization
    useEffect(() => {
        const queryUsername = query(collection(props.db, "users"), where('email', "==", props.user.email));

        const asyncQueryUsername = async () => {
            const queryUsernameSnapshot = await getDocs(queryUsername)
            queryUsernameSnapshot.forEach((doc) => {
                setCurrentUserUsername(doc.data().username)
                setProfileSrc(doc.data().profile_picture)
            })
        }

        // call async function to fetch current user's username
        asyncQueryUsername()

        // make a query first to get each server's ids so we can filter through
        const queryServerIds = query(collection(props.db, "servers"));

        const asyncQueryServerIds = async () => {
            const queryServerIdsSnapshot = await getDocs(queryServerIds);
            queryServerIdsSnapshot.forEach((doc) => {
                setServerIds(prevState => [...prevState, doc.id])
            })
        }

        // call async function that fetches server ids
        asyncQueryServerIds();
    }, [])

    // determines which servers the user currently belongs to
    useEffect(() => {
        if(serverIds.length !== 0){
            serverIds.map((id) => {
                const serversUserRef = query(collection(props.db, `servers/${id}`, "users"));
                const serverRef = doc(props.db, `servers/${id}`)
                
                const asyncServersUser = async () => {
                    const server = await getDoc(serverRef);
                    const serversUser = await getDocs(serversUserRef);
                    serversUser.forEach((user) => {
                        // if this server has the current user's username in it, put it to currentservers list
                        if(user.data().username === currentUserUsername){
                            const serverObject: ServerObject = {
                                server_name: id,
                                server_data: server.data(),
                                server_display: false,
                            }

                            // if serverObject is the first server to be added in currentServers
                            // it's server_display will be TRUE
                            if(currentServers.length <= 0){
                                setCurrentServers(prevState => [...prevState, {...serverObject, server_display: true}])
                            } else {
                                setCurrentServers(prevState => [...prevState, serverObject])
                            }
                        }
                    })
                }

                // call async function that fetches each server's users
                asyncServersUser();
            })
        }
    }, [serverIds])

    // get channels
    useEffect(() => {
        // check if currentServers has data/not empty
        if(currentServers.length > 0){
            // loop through currentServers
            // check if user is active
                // if active: make a query for its channels
            // else just don't.
            currentServers.map((server: ServerObject, index) => {
                if(server.server_display){
                    const queryChannels = query(collection(props.db, `servers/${server.server_name}/channels`))

                    const asyncQueryChannels = async () => {
                        const queryChannelsSnapshot = await getDocs(queryChannels);
                        queryChannelsSnapshot.forEach((doc) => {
                            const channelDetail: Channel = {
                                channel_display_content: false,
                                channel_name: doc.id
                            }

                            setChannels(prevState => [...prevState, channelDetail])
                            // we can get the messages later by doing this /servers/server_name/channels/channel_name
                        })
                    }

                    asyncQueryChannels();
                }
            })
        }
    }, [currentServers])

    useEffect(() => {
        channels?.map((channel: Channel, index) => {
            if(index === 0){
                setFixedChannels(prevState => [...prevState, {...channel, channel_display_content: true}])
            } else {
                setFixedChannels(prevState => [...prevState, channel])
            }
        })
    }, [channels])

    function changeChannelDisplayContent(this_channel_name: string) {
        let newFixedChannels = new Array<Channel>();

        fixedChannels.map((channel: Channel) => {
            // if channel_name === this_channel_name, turn that active display content to true
            // else to false
            if(channel.channel_name === this_channel_name){
                newFixedChannels.push({...channel, channel_display_content: true})
            } else {
                newFixedChannels.push({...channel, channel_display_content: false})
            }
        }) 

        setFixedChannels(newFixedChannels);
    }

    async function addMessage(message: string) {
        let currentServer;
        let currentChannel;
        currentServers.map((server: ServerObject) => {
            if(server.server_display){
                currentServer = server.server_name
                fixedChannels.map((channel: Channel) => {
                    if(channel.channel_display_content){
                        currentChannel = channel.channel_name
                    }
                })
            }
        })

        const this_message: MessageStructure = {
            username: props.user.email,
            message_content: message,
            timestamp: serverTimestamp(),
        }

        console.log(currentServer, currentChannel)
        const docRef = await addDoc(collection(props.db, `servers/${currentServer}/channels/${currentChannel}/messages`), this_message)
        console.log("document successfully written with ID: ", docRef.id)
    }

    // determine what servers and channels are active
    useEffect(() => {
        // check if fixedChannels is not empty
        if(fixedChannels.length > 0){
            currentServers.map((server: ServerObject) => {
                if(server.server_display){
                    setCurrentServer(server.server_name)
                    fixedChannels.map((channel: Channel) => {
                        if(channel.channel_display_content){
                            setCurrentChannel(channel.channel_name)
                        }
                    })
                }
            })
        }
    }, [fixedChannels])

    // TO DO:
    // let's focus first on creating a server UI.
    // create three columns, so we have four. (serverlist, channels, maincolumn, userscolumn)

    // TO DO TOMORROW/TODAY (March 8, 2023):
    // Work on the users column.
    // Ideas: Get users from server's users collection and display them on a row.

    return(
        <main className='content'>
            {currentServers.length > 0 && 
                <>
                    <ServerList serverList={currentServers} />
                    <ChannelsList channelsList={fixedChannels} changeChannelDisplayContent={changeChannelDisplayContent} />
                    <MainContent channelMessages={channelMessages} currentChannel={currentChannel} addMessage={addMessage} username={currentUserUsername} picture={profileSrc} />
                </>
            }
        </main>
    )
}