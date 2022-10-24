
import { useState } from "react"
import { Link } from "react-router-dom"

const HeaderAboutMe =()=>{
    return(
        <div className="titleShadow w-100 d-flex justify-content-between align-items-center px-2">
            <p>Edit PRofile</p>
            <Link to="../aboutuser">
                <span className="material-symbols-outlined">
                    close
                </span>
            </Link>
            
        </div>
    )
}

const BodyAboutMe=()=>{
    const [about,setAbout ]= useState('')
    const [working,setWorking] = useState('')
    const [imageData,setImageData] = useState('')
    const [describe,setDescribe] = useState('')
    return(
        <div className="h-75 w-75 d-flex flex-column justify-content-center align-items-center px-2">
            <div className="input-group mb-3">
                <span className="input-group-text w-25"  id="basic-addon1">Introduce yourself</span>
                <input type="text" className="form-control" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text w-25" id="basic-addon1">What are you working</span>
                <input type="text" className="form-control" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>
            <div class="input-group mb-3">
                <input type="file" className="form-control w-25" id="inputGroupFile02"/>
                <label className="input-group-text" for="inputGroupFile02">Upload</label>
            </div>

            <div className="input-group">
                <span className="input-group-text w-25">Describe yourself</span>
                <textarea className="form-control" aria-label="With textarea"></textarea>
            </div>
        </div>
    )
}

const FooterAboutMe=()=>{
    return(
        <div></div>
    )
}

const EditUserPage =()=>{
    return(
        <div className="col-9 p-0 d-flew flex-column bg-space text-applegrey ">
            <HeaderAboutMe/>
            <BodyAboutMe/>
        </div>

    )
}

//className="col-9 p-0 d-flex flex-column justify-content-between bg-space text-applegrey"
export default EditUserPage