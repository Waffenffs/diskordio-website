import { collection, query, where, getDocs, getDoc, doc} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import ServerList from "../Components/ServerList"

export default function Diskordio(props: any){
    // replicate discordUI

    interface ServerObject {
        server_name: string,
        server_data?: any
    }

    const [currentUserUsername, setCurrentUserUsername] = useState<string | null>(null)
    const [serverIds, setServerIds] = useState<Array<string>>([]);
    const [currentServers, setCurrentServers] = useState<Array<ServerObject>>([]);

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
                            console.log(`Server: ${id} has username.`)

                            const serverObject: ServerObject = {
                                server_name: id,
                                server_data: server.data()
                            }

                            setCurrentServers(prevState => [...prevState, serverObject])
                        }
                    })
                }

                // call async function that fetches each server's users
                asyncServersUser();
            })
        }
    }, [serverIds])

    // TO DO:
    // let's focus first on creating a server UI.
    // create three columns, so we have four. (serverlist, channels, maincolumn, userscolumn)

    return(
        <main className='content'>
            {currentServers.length > 0 && <ServerList serverList={currentServers} />}
        </main>
    )
}