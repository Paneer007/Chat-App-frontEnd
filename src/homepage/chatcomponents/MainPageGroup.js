import { useState } from "react"
import { useEffect } from "react"

const ContactProfilePage =({group})=>{
    return (
        <div className="titleShadow w-100 d-flex justify-content-between align-items-center px-2">
            <div>
                user proffile pic maybe initials
            </div>
            <span class="material-icons" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                info
            </span>
        </div>
    )
}
const MessageBody  =({messageList})=>{
    console.log(messageList)
    return(
        <div>
            {messageList.map(x=><p>{x.message}</p>)}
        </div>
    )
}
const SendMessage=({group,socket,messageList,user})=>{
    const sendMessage =()=>{
        socket.emit("sendMessage",{message:message,room:group.RoomId,name:user.Name})
    }
    const [message,setMessage] = useState('')
    console.log(message)
    return(
        <div className="d-flex justify-content-between align-items-center bg-white m-2 px-2 py-2 rounded-pill" onChange={(e)=>{setMessage(e.target.value);console.log(messageList)}}>
            <input className="w-75 border-0" placeholder="Enter your message"/>
            <span class="material-symbols-outlined text-black" onClick={sendMessage}>
                send
            </span>
        </div>
    )
}
const GroupDescriptionPage =({group})=>{
    return(
        <div class="offcanvas offcanvas-end text-black" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasExampleLabel">{group.Name}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <div>
                    {group.Description}
                </div>
                <div>
                    Room Id: {group.RoomId}
                </div>
                <div>
                    <div>
                        Members
                    </div>
                    <div>
                        {group.Members.map(x=><li>{x.Name}</li>)}
                    </div>
                </div>
            </div>
            

        </div>
    )
}
const MainGroupPage=({user,group,socket,messageList})=>{
    // socket.on('sentMessage',(msg)=>{
    //     console.log('Event Triggered')
    //     console.log(messageList)
    //     let finalMessage = messageList.concat(msg)
    //     console.log('hi')
    //     setMessageList(finalMessage)
    // })
    useEffect(()=>{
        const joinGroup = async()=>{
            if(group==='Buffer'|| group===undefined){
                console.log('Nothing is happening')
            }else{
                console.log(group.RoomId)
                socket.emit("joinRoom",group.RoomId)
            }  
        }
        joinGroup()
    },[group])
    
    console.log(messageList)
    if(group==='Buffer'|| group===undefined){
        return(
            <div className="col-9 p-0 d-flex flex-column justify-content-between align-items-center h-100 bg-space text-applegrey">
                <div className="card d-flex flex-column justify-content-center align-items-center shadow-lg p-3 w-25 h-25 text-black bg-applesteel" >
                    <p>Please wait</p>
                </div>
            </div>
        )
    }
    return(
        <div className="col-9 p-0 d-flex flex-column justify-content-between bg-space text-applegrey">
            <ContactProfilePage group={group}/>
            <MessageBody messageList={messageList}/>
            <SendMessage group={group} user={user} socket={socket} messageList={messageList} />
            <GroupDescriptionPage group={group}/>
        </div>
    )
}
export default MainGroupPage