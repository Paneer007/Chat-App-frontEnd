import { Route,BrowserRouter as Router,Routes } from "react-router-dom";
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import MainGroupPage from "./chatcomponents/MainPageGroup"
import MainUserPage from "./chatcomponents/MainUserPage";
import SideBar from "./chatcomponents/SideBar"
import SelectGroup from "./chatcomponents/SelectGroup";
import {socketEvents,destroyEvents} from "../services/socket.io/socketEvents"
import {socket,SocketContext} from "../context/socket"
let actualSocket;
const ChatHomePage = () =>{
    const navigator = useNavigate()
    const [user,setUser] = useState(undefined)
    const [group,setGroup] = useState(undefined)
    const [messageList,setMessageList] = useState([])
    const [socketObj,setSocketObj]= useState(undefined)
    const [sender,setSender]=useState(undefined)
    const [lastMessage,setLastMessage]=useState(undefined)
    useEffect(()=>{
        const getUserData =async ()=>{
            const token = localStorage.getItem('token')  
            if(!token){
                navigator('../')
                return
            }
            const resp = await axios.get("http://localhost:3001/api/userdata",{headers:{"authorization":token}})
            if(resp.status!==200){
                navigator('../')
                return
            }
            setUser(resp.data)
        }
        getUserData()
    },[])
    useEffect(()=>{
        console.log(messageList)
    },[messageList])
    useEffect(()=>{
        if(user !== undefined){
            try{
                // eslint-disable-next-line react-hooks/exhaustive-deps
                actualSocket=socket(user);
                socketEvents(actualSocket,setMessageList,messageList,setSender)
                setSocketObj(actualSocket)
            return ()=>{
                destroyEvents(actualSocket);
            }
            }catch(e){
                console.log(e)
            }
        }        
    },[user])
    useEffect(()=>{
        if(group === "Buffer" || group=== undefined){
            return
        }
        console.log("the currently selected group is ",group)
        setMessageList(group.Messages)
    },[group])
    if(user===undefined || socketObj===undefined){
        return(
            <div>
                Please wait
            </div>
        )
    }
    return (
    <SocketContext.Provider value={actualSocket}>
        <div className="container-fluid row h-100 d-flex justify-content-start w-100 p-0 m-0">
            <SideBar userData={user} setUser={setUser} setGroup={setGroup}/>
            <Routes>
                <Route path="/" element={<SelectGroup/>}/>
                <Route path="group/:groupname" element={<MainGroupPage user={user} group={group} messageList={messageList} sender={sender}/>}/>
                <Route path="user/:username" element={<MainUserPage/>}/>
            </Routes>
        </div>
    </SocketContext.Provider>
        
    )
}
export default ChatHomePage