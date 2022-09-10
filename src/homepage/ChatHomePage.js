import { Link,Route,BrowserRouter as Router,Routes } from "react-router-dom";
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {io} from "socket.io-client"
import MainGroupPage from "./chatcomponents/MainPageGroup"
import MainUserPage from "./chatcomponents/MainUserPage";
import SideBar from "./chatcomponents/SideBar"
import SelectGroup from "./chatcomponents/SelectGroup";
let socket
const ChatHomePage = () =>{
    const navigator = useNavigate()
    const [user,setUser] = useState(undefined)
    const [group,setGroup] = useState(undefined)
    useEffect(()=>{
        const getUserData =async ()=>{
            const token = localStorage.getItem('token')  
            console.log(token) 
            if(!token){
                navigator('../')
                return
            }
            const resp = await axios.get("http://localhost:3001/api/userdata",{headers:{"authorization":token}})
            if(resp.status!=200){
                navigator('../')
                return
            }
            console.log(resp)
            setUser(resp.data)
        }
        //joinSocket()
        getUserData()
    },[])
    useEffect(()=>{
        socket = io("http://localhost:3001")
        socket.on('connect',()=>{
            console.log('connected')
        })
        return ()=>{
            socket.off('connect')
            console.log('bai')
        }
    },[])
    if(user==undefined){
        return(
            <div>
                Please wait
            </div>
        )
    }
    return (
        <div className="container-fluid row h-100 d-flex justify-content-start w-100 p-0 m-0">
            <SideBar userData={user} setUser={setUser} setGroup={setGroup}/>
            <Routes>
                <Route path="/" element={<SelectGroup/>}/>
                <Route path="group/:groupname" element={<MainGroupPage group={group} socket={socket}/>}/>
                <Route path="user/:username" element={<MainUserPage/>}/>
            </Routes>
        </div>
    )
}
export default ChatHomePage