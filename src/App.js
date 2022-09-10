import { Link,Route,BrowserRouter as Router,Routes } from "react-router-dom";
import Signup from "./authenuser/Signup";
import Login from "./authenuser/Login";
import ChatHomePage from "./homepage/ChatHomePage";
function App() {
  return (
    <div className="App h-100">
        <Router>
            <Routes>
                <Route path="/" element={<Signup/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/home/*" element={<ChatHomePage/>}/>
            </Routes> 
        </Router>
    </div>
  );
}

export default App;
