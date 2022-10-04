import {Link,useNavigate} from "react-router-dom"
import { useState } from "react"
import axios from "axios"
const Signup=()=>{
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigator = useNavigate()
    const signupToSite = async()=>{
        const body={
            Email:email,Password:password
        }
        if(!(email&&password)){
            alert("Enter a email and a password")
            return 
        }
        const resp = await axios.post("http://localhost:3001/api/signup/",body)
        if(resp.status===200){
            navigator('/login')
        }else{
            alert("Enter valid credentials")
        }
    }
    return(
        <div className="d-flex justify-content-center align-items-center h-100 w-100 backgroundForSignup" >
            <div className="card p-4 shadow w-25 bg-applegrey border-0">
                <div className="SigninHeader">
                    <h2>Chat App</h2>
                    <p>Sign up</p>
                </div>
                <div className="TypesOfInput">
                    <div class="form-floating mb-3">
                        <input class="form-control" id="floatingInput" placeholder="email" onChange={(e)=>setEmail(e.target.value)}/>
                        <label for="floatingInput">email</label>
                    </div>
                    <div class="form-floating">
                        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                        <label for="floatingPassword">Password</label>
                    </div>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                    <p className="btn btn-outline-primary px-2 py-1 my-1 " onClick={signupToSite}>Sign up</p>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                    <p>Have an account? <Link to="/login"><span className="highLightContent">Log in</span></Link> </p>
                </div>
            </div>
        </div>

    )
}
export default Signup