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
import { groupSocketEvents,destroyGroupEvents } from "../services/socket.io/groupEvents";
import NewUser from "./newUser/NewUser";
import AboutUserPage from "./userPersonalPage/AboutUserPage";
import EditUserPage from "./userPersonalPage/EditUserPage";
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
                groupSocketEvents(actualSocket,user,setUser,setSender)
                setSocketObj(actualSocket)
            return ()=>{
                destroyGroupEvents(actualSocket)
                destroyEvents(actualSocket);
            }
            }catch(e){
                console.log(e)
            }
        }        
    },[user])
    useEffect(()=>{
        if(user!==undefined && user.Name===undefined){
            navigator('newuser')
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
                <Route path="newuser" element={<NewUser setUser={setUser}/>}/>
                <Route path="aboutuser" element={<AboutUserPage/>}/>
                <Route path="edituser" element={<EditUserPage/>}/>
            </Routes>
        </div>
    </SocketContext.Provider>
        
    )
}
export default ChatHomePage