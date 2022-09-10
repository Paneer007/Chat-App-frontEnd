const ContactProfilePage =()=>{
    return (
        <div className="titleShadow w-100 d-flex justify-content-between align-items-center px-2">
            <div>
                user profile pic maybe initials
            </div>
            <span class="material-icons">
                info
            </span>

        </div>
    )
}
const MessageBody =()=>{
    return(
        <div>
            Message Body
        </div>
    )
}
const SendMessage=()=>{
    return(
        <div>
            <input placeholder="Enter your message"/>
        </div>
    )
}
const MainUserPage=()=>{
    return(
        <div className="col-9 p-0 d-flex flex-column justify-content-between bg-space text-applegrey">
            <ContactProfilePage/>
            <MessageBody/>
            <SendMessage/>
        </div>
    )
}
export default MainUserPage