import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
const NewUserTitle =({group,sender})=>{
    return (
        <div className="titleShadow w-100 d-flex justify-content-between align-items-center px-2">
            <div>
                New User
            </div>
        </div>
    )
}
const NewUser = ({setUser}) =>{
    return(
        <div className="col-9 p-0 d-flex flex-column bg-space text-applegrey">
            <NewUserTitle/>
            <FormDetails setUser={setUser}/>
        </div>
    )
}
const FormDetails=(setUser)=>{
    const [bio,setBio]=useState('')
    const [name,setName]=useState('')
    const navigator = useNavigate()
    const submitUserDetails = async(e)=>{
        e.preventDefault()
        const token = localStorage.getItem('token')  
            if(!token){
                navigator('../')
                return
            }
        const body={
            Bio:bio,Name:name
        }
        if(!(name&&bio)){
            alert("Enter a username and a Bio")
            return 
        }
        let resp = await axios.post("http://localhost:3001/api/userdata/updateuser",body,{headers:{"authorization":token}})
        if(resp.status===200){
            const resp = await axios.get("http://localhost:3001/api/userdata",{headers:{"authorization":token}})
            if(resp.status!==200){
                navigator('../')
            }
            navigator('../')
            console.log('this is line 46',resp.data)
            setUser(resp.data)
        }
    }
    return(
    <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-center">
<form className="w-50 p-2 bg-white border shadow rounded">
    {/* <div>
        <p>Upload your image here</p>
    </div> */}
    
    <div>
        <div class="mb-3 text-primary">
            <label for="exampleInputName1" class="form-label">Name</label>
            <input type="Name" class="form-control" id="exampleInputName1" aria-describedby="NameHelp" onChange={(e)=>setName(e.target.value)}/>
        </div>
        <div class="mb-3 text-primary">
            <label for="exampleInputPassword1" class="form-label">Bio</label>
            <input type="Bio" class="form-control" id="exampleInputBio1" onChange={(e)=>setBio(e.target.value)}/>
        </div>
        <button type="submit" class="btn btn-primary" onClick={submitUserDetails}>Submit</button>
    </div>
</form>
    </div>
         )
}
export default NewUser
