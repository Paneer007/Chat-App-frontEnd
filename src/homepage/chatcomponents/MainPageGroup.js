import { useState,useEffect ,useContext} from "react"
import { SocketContext } from "../../context/socket"

const ContactProfilePage =({group,sender})=>{
    return (
        <div className="titleShadow w-100 d-flex justify-content-between align-items-center px-2">
            <div>
                user profile pic maybe initials
            </div>
            <div>
                {sender!==undefined?sender.name:null}
            </div>
            <span class="material-icons" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                info
            </span>
        </div>
    )
}
const MessageFormat=({data,user})=>{
    const classType="messageDimensions "+(data.name===user.Name ?"userMessage":null)
    return(
        <div className={classType}>
            <div>
                <p className="fw-bold">{data.name}</p>
            </div>
            <div>
                <p className="fw-normal">{data.message}</p>
            </div>
        </div>
    )
}
const MessageBody  =({messageList,user})=>{
    useEffect(()=>{
        const messageListDiv = document.getElementById("messageListDiv")
        messageListDiv.scrollTop=(messageListDiv.scrollHeight)
    },[messageList])
    return(
        <div id="messageListDiv" className="d-flex flex-column mx-2 my-2 overflow-auto scrollableMessages">
            {messageList.map(x=><MessageFormat data={x} user={user}/>)}
        </div>
    )
}
const SendMessage=({group,setMessageList,user})=>{
    const socket = useContext(SocketContext)
    const updateText=(e)=>{
        setMessage(e.target.value)
        socket.emit('isTyping',{name:user.Name,room:group.RoomId})
        socket.emit('isTypingMain',{name:user.Name,room:group.GeneralId})
    }
    const sendMessage =()=>{
        socket.emit("sendMessage",{message:message,room:group.RoomId,name:user.Name,user:user._id})
        socket.emit("sendMessageMain",{message:message,room:group.GeneralId,name:user.Name})
    }
    
    useEffect(()=>{
        const inputBox = document.getElementById("inputMessageBox")
        function debounce(callback, wait) {
            let timeout;
            return (...args) => {
                clearTimeout(timeout);
                timeout = setTimeout(function () { callback.apply(this, args); }, wait);
            };
          }
          
          inputBox.addEventListener('keyup', debounce( () => {
              socket.emit('noMessageSent',{room:group.RoomId})
              socket.emit('noMessageSentMain',{room:group.GeneralId})
          }, 1000))
    },[])
    const [message,setMessage] = useState('')
    return(
        <div  className="d-flex justify-content-between align-items-center bg-white m-2 px-2 py-2 rounded-pill" onChange={(e)=>updateText(e)}>
            <input id="inputMessageBox" className="w-75 border-0" placeholder="Enter your message"/>
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
const MainGroupPage=({user,group,messageList,sender})=>{
    const socket = useContext(SocketContext)
    console.log(group)
    useEffect(()=>{
        const joinGroup = async()=>{
            if(group==='Buffer'|| group===undefined){
                console.log('Nothing is happening')
            }else{
                socket.emit("joinRoom",group.RoomId)
                socket.emit("joinGroupMain",group.GeneralId)
            }  
        }
        joinGroup()
    },[group])
    useEffect(()=>{
        console.log('the updated messageList is',messageList)
    },[messageList])
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
            <ContactProfilePage group={group} sender={sender}/>
            <MessageBody messageList={messageList} user={user}/>
            <SendMessage group={group} user={user} messageList={messageList} />
            <GroupDescriptionPage group={group}/>
        </div>
    )
}
export default MainGroupPage