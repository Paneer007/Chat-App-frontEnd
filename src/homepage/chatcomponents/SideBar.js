import axios from "axios"
import { useEffect } from "react"
import { useState ,useContext} from "react"
import { Link, useNavigate } from "react-router-dom"
import { SocketContext } from "../../context/socket"

const SearchBar=({setSearch})=>{
    return(
        <div>
            <input className="shadow-none border-0 outline-0" placeholder="Search Groups" onChange={(e)=>setSearch(e.target.value)} />
        </div>
    )
}

const triggerPopup =()=>{
    const theCard = document.getElementById("theCardContent")
    theCard.classList.toggle("invisible")
}


const AddGroupButton=()=>{
    return(
        <div class="d-flex align-items-center justify-content-center ">
            <span class="material-symbols-outlined text-black" onClick={()=>{triggerPopup()}} >
                add
            </span>
        </div>
    )
}

const PopUpMenu =({setUser})=>{

    const submitGroupDetails =async()=>{
        const body ={group:group,description:desc}
        setBuffer(true)
        try{
            const token = localStorage.getItem('token')
            if(!token){
                setBuffer(false)
                return 
            }
            const resp = await axios.post("http://localhost:3001/api/groupdata/newgroup",body,{headers:{"authorization":token}})
            const userData = await axios.get("http://localhost:3001/api/userdata",{headers:{"authorization":token}})
            setBuffer(false)
            setUser(userData.data)
        }catch(e){
            console.log(e)
            setBuffer(false)
        }        
    }

    const submitRoomIdDetails =async()=>{
        const body = {roomId:roomId}
        setBuffer(true)
        try{
            const token = localStorage.getItem('token')
            if(!token){
                setBuffer(false)
                return
            }
            const resp = await axios.post("http://localhost:3001/api/groupdata/joingroup",body,{headers:{"authorization":token}})
            const userData = await axios.get("http://localhost:3001/api/userdata",{headers:{"authorization":token}})
            setBuffer(false)
            setUser(userData.data)
        }catch(e){
            console.log(e)
            setBuffer(false)
        }        
    }

    const [group,setGroup] = useState('')
    const [desc,setDesc] = useState('')
    const [roomId, setRoomId] = useState('')
    const [buffer,setBuffer] = useState(false)
    const [joinGroup,setJoinGroup] = useState(false)

    if(buffer){
        return(
            <div>
                Please wait
            </div>
        )
    }
    if(joinGroup){
        return(
            <div id="theCardContent" className="card shadow p-3 invisible position-absolute top-50 start-50 translate-middle text-black zIndex">
                <div class="mb-3">
                    <label for="groupRoomNo" class="form-label">Room Id</label>
                    <input class="form-control" id="groupRoomNo" rows="3" placeholder="Room ID" onChange={(e)=>setRoomId(e.target.value)} />
                </div>
                <div class="d-flex justify-content-end gap-3">
                    <button type="button" class="btn btn-outline-primary" onClick={()=>setJoinGroup(false)}>Make Group</button>
                    <button type="button" class="btn btn-outline-success" onClick={submitRoomIdDetails}>Submit</button>
                    <button type="button" class="btn btn-outline-danger" onClick={triggerPopup}>Cancel</button>
                </div>
            </div>
        )
    }
    return (
        <div id="theCardContent" className="card shadow p-3 invisible position-absolute top-50 start-50 translate-middle text-black zIndex">
            <div class="mb-3">
              <label for="GroupName" class="form-label">Group Name</label>
                <input type="email" class="form-control" id="GroupName" placeholder="Group Name" onChange={(e)=>setGroup(e.target.value)}/>
            </div>
            <div class="mb-3">
                <label for="groupPassword" class="form-label">Description</label>
                <input class="form-control" id="groupPassword" rows="3" placeholder="Description" onChange={(e)=>setDesc(e.target.value)} />
            </div>
            <div class="d-flex justify-content-end gap-3">
                <button type="button" class="btn btn-outline-primary" onClick={()=>setJoinGroup(true)}>Join Group</button>
                <button type="button" class="btn btn-outline-success" onClick={submitGroupDetails}>Submit</button>
                <button type="button" class="btn btn-outline-danger" onClick={triggerPopup}>Cancel</button>
            </div>
        </div>
    )
}

const GroupSideDescription =({groupDetails,setGroup})=>{
    const socket = useContext(SocketContext)
    const getGroupData=async()=>{
        console.log(groupDetails)
        try{
            const token = localStorage.getItem('token')
            if(!token){
                return
            }
            setGroup('Buffer')
            try{
                const getGroupDetails = await axios.get(`http://localhost:3001/api/groupdata/${groupDetails._id}`,{headers:{"authorization":token}}) 
                setGroup(getGroupDetails.data)
            }catch(e){
                setGroup(undefined)
            }

        }catch(e){
            console.log(e)
        }
    }
    useEffect(()=>{
    },[])
    return(
    <Link onClick={()=>getGroupData()} to={"group/"+groupDetails.Name}>
        <div class="card mb-3 w-100">
            <div class="row g-0">
                <div class="col-md-4 d-flex flex-column justify-content-center align-items-center">
                    <p className="bg-ithinkteal p-4 rounded-circle d-flex flex-column justify-content-center align-items-center "></p>
                </div>
                <div class="col-md-8">
                    <div class="card-body p-0">
                        <h5 class="text-black">{groupDetails.Name}</h5>
                        <p class="card-text"><small class="text-muted">{groupDetails.LastMessage ===undefined?null:groupDetails.LastMessage.name + ' : '} {groupDetails.LastMessage===undefined?null:groupDetails.LastMessage.message}</small></p>
                    </div>
                </div>
            </div>
        </div>
    </Link>
    
    )
}

const UserHeader=({userData})=>{
    console.log(userData)
    return(
        <div className="d-flex p-2 flex-row align-items-center justify-content-between bg-space w-100 m-0 titleShadow backgroundForAppPage text-white">
            <div>
                <p>{userData.Name}</p>
            </div>
            <div>
                <span class="material-symbols-outlined text-white" data-bs-toggle="offcanvas" href="#userDataButton" role="button" aria-controls="userDataButton">
                    settings
                </span>
            </div>
        </div>
    )
}

const SideBar =({userData,setUser,setGroup})=>{
    const [search,setSearch] = useState('')
    return(
        <div className="col-3 flex-column align-item-start justify-content-start p-0 text-applegrey backgroundForAppPage">
            <UserHeader userData={userData}/>
            <div className="d-flex flex-column align-items-center justify-content-start gap-3 py-3 px-1">
                <div className="d-flex shadow align-items-center justify-content-between px-2 py-1 rounded-pill bg-white w-100">
                    <SearchBar setSearch={setSearch}/>
                    <AddGroupButton/>
                </div>
                <div className="w-100 px-3 scrollableMessages">
                    {userData.Groups.map(x=><GroupSideDescription groupDetails={x} setGroup={setGroup}/>)}
                </div>
            </div>
            <PopUpMenu setUser={setUser}/>
            <UserDescriptionPage userDetail={userData}/>
        </div>
    )
}

const UserDescriptionPage =({userDetail})=>{
    console.log(userDetail)
    const navigator = useNavigate()
    const logOutUser=()=>{
        localStorage.removeItem('token')
        navigator('/login')
    }
    return(
        <div class="offcanvas offcanvas-end text-black" tabindex="-1" id="userDataButton" aria-labelledby="userDataButtonLabel">
            <p>Profile Pic</p>
            <p>{userDetail.Name}</p>
            <p>{userDetail.Bio}</p>
            <p onClick={logOutUser}>Logout</p>
        </div>
    )
}

export default SideBar