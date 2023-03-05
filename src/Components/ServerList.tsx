export default function ServerList(props: any) {
    // were going to accept a list of servers
    // display each server in that list in a column
    interface ServerObject {
        server_name: string,
        server_data?: any
    }

    return(
        <nav className="server-list-nav">
            {props.serverList.map((server: ServerObject) => {
                return(
                    <div className="server-image-container">
                        <img src={`${server.server_data.server_image}`} style={{ width: '100%', borderRadius: '40%'}} />
                    </div>
                )
            })}
        </nav>
    )
}