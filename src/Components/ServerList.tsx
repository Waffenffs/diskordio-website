export default function ServerList(props: any) {
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