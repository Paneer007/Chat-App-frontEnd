
import { Link } from "react-router-dom"

const HeaderAboutMe =()=>{
    return(
        <div className="titleShadow w-100 d-flex justify-content-between align-items-center px-2">
            <p>About me</p>
            <Link to="../aboutuser">
                <span class="material-symbols-outlined">
                    close
                </span>
            </Link>
            
        </div>
    )
}

const BodyAboutMe=()=>{
    return(
        <div className="h-75 d-flex flex-column justify-content-center px-2">
            <div>
                <div className="d-flex flex-row justify-content-between">
                    <div>
                        <p>Hi i am </p>
                        <p>John Doe</p>
                        <p>Software engineer</p>
                    </div>
                    <div>
                        <p>Image Stuff</p>
                    </div>
                </div>
                <div>
                    <div>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam qui ad culpa magnam, deleniti nostrum quod recusandae placeat? Dignissimos nulla neque vero similique rerum rem atque excepturi delectus, et quod.</p>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam qui ad culpa magnam, deleniti nostrum quod recusandae placeat? Dignissimos nulla neque vero similique rerum rem atque excepturi delectus, et quod.</p>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam qui ad culpa magnam, deleniti nostrum quod recusandae placeat? Dignissimos nulla neque vero similique rerum rem atque excepturi delectus, et quod.</p>
                    </div>
                </div>
            </div>
    {/* Ok think about persons hobbies, personal site etc */}
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