import {Link,useNavigate} from "react-router-dom"
import { useState } from "react"
import axios from "axios"
const Login =()=>{
    const [name,setName] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()
    const loginToSite = async()=>{
        const body={
            Name:name,Password:password
        }
        if(!(name&&password)){
            alert("Enter a username and a password")
            return 
        }
        const resp = await axios.post("http://localhost:3001/api/login/",body)
        if(resp.status===200){
            console.log(resp.data)
            localStorage.setItem("token","bearer "+resp.data.jwtToken)
            navigate("../home")
        }else{
            alert("Enter valid credentials")
        }
    }
    return(
        <div className="d-flex justify-content-center align-items-center h-100 w-100 backgroundForSignup ">
            <div className="card p-4 w-25 shadow-lg bg-applegrey border-0">
                <div className="SigninHeader">
                    <h2>Chat App</h2>
                    <p>Log in</p>
                </div>
                <div className="TypesOfInput">
                    <div class="form-floating mb-3">
                        <input class="form-control" id="floatingInput" placeholder="username" onChange={(e)=>setName(e.target.value)}/>
                        <label for="floatingInput">Username</label>
                    </div>
                    <div class="form-floating">
                        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                        <label for="floatingPassword">Password</label>
                    </div>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                    <p className="btn btn-outline-primary px-2 py-1 my-1 " onClick={loginToSite}>Log in</p>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                    <p>Dont have an account? <Link to="/"><span className="highLightContent">Sign up</span></Link> </p>
                </div>
            </div>
        </div>
        
    )
}
export default Login