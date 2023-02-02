import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Setting from "./pages/settings/Setting";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
  const {user} = useContext(Context) 
  return (
    <div className="App">
      <BrowserRouter>
      <Topbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/register" element={user ? <Home/>:<Register/>}/>
          <Route path="/login" element={user ? <Home/>:<Login/>}/>
          <Route path="/write" element={user ? <Write/>:<Login/>}/>
          <Route path="/setting" element={user ? <Setting/>:<Login/>}/>
          <Route path="/post/:postId" element={user ? <Single/>:<Login/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
