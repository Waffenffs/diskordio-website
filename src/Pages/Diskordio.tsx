import { collection, query, where, getDocs, getDoc, doc} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import ServerList from "../Components/ServerList"
import ChannelsList from '../Components/ChannelsList'

export default function Diskordio(props: any){
    // replicate discordUI

    interface ServerObject {
        server_name: string
        server_data?: any
        server_display: boolean
    }

    interface Channel {
        channel_name?: string
        channel_display_content: boolean
    }

    const [currentUserUsername, setCurrentUserUsername] = useState<string | null>(null)
    const [serverIds, setServerIds] = useState<Array<string>>([]);
    const [currentServers, setCurrentServers] = useState<Array<ServerObject>>([]);
    const [channels, setChannels] = useState<Array<Channel>>([]);
    const [fixedChannels, setFixedChannels] = useState<Array<Channel>>([]);

    // fetch call at initialization
    useEffect(() => {
        const queryUsername = query(collection(props.db, "users"), where('email', "==", props.user.email));

        const asyncQueryUsername = async () => {
            const queryUsernameSnapshot = await getDocs(queryUsername)
            queryUsernameSnapshot.forEach((doc) => {
                setCurrentUserUsername(doc.data().username)
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

    // TO DO:
    // let's focus first on creating a server UI.
    // create three columns, so we have four. (serverlist, channels, maincolumn, userscolumn)
    
    // TO DO (channels):
    // pass a function that will turn a channel's channel_display_content to true once clicked
    // reminder: the foremost channel's channel_display_content is always true

    // TO DO (maincolumn):
    // display content of channels that are active.

    return(
        <main className='content'>
            {currentServers.length > 0 && <ServerList serverList={currentServers} />}
            {currentServers.length > 0 && <ChannelsList channelsList={fixedChannels} /> }
        </main>
    )
}