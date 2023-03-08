export default function UsersColumn(props: any) {
    interface UserData {
        email?: string
        username?: string
        profile_picture?: string
    }

    return(
        <nav className="users_column">
            <div className="users_container">
                {props.serverUsers !== undefined &&
                    props.serverUsers?.map((user: UserData) => {
                        return(
                            <div className="user_container">
                                <div className="user_image_container">
                                    <img src={`${user.profile_picture}`} alt="pic" />
                                </div>
                                <div className="user_name_container">
                                    <span>{user.username}</span>
                                </div>
                            </div>  
                        )
                    })
                }
            </div>
        </nav>
    )
}