import axios from 'axios';
import { useContext, useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import { Context } from '../../context/Context'
import './setting.css'

export default function Setting() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success,setSuccess] = useState(false);
  const { user,dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type:"UPDATE_START"})
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
};

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePicture = filename;
      try {
        await axios.post("/upload", data)
        
      } catch (err) {

      }
    }
    try {
     const res = await axios.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({type:"UPDATE_SUCCESS",payload:res.data})
    } catch (err) {
      dispatch({type:"UPDATE_FALIURE"})

    }

  }
  return (
    <div className='setting'>
      <div className="settingWrapper">
        <div className="settingTitle">
          <span className="settingUpdateTitle">Update Your Account</span>
          <span className="settingDeleteTitle">Delete Your Account</span>
        </div>

        <form className='settingsForm' onSubmit={handleSubmit}>

          <label>Profile Picture</label>
          <div className="settingProfilePicture">
            <img src={file  ? URL.createObjectURL(file): PF+user.profilePicture} alt="" />

            <label htmlFor="fileInput">
              <i className="settingsPPIcon fa-regular fa-circle-user"></i>
            </label>
            <input type="file"
              id='fileInput'
              style={{ display: "none" }}
              onChange={e => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input type="text" placeholder={user.username}
            onChange={e => setUsername(e.target.value)}
          />
          <label>e-mail</label>
          <input type="email" placeholder={user.email}
            onChange={e => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input type="Password" 
          onChange={e => setPassword(e.target.value)}
          />
          <button className='settingSubmit' type='submit'>Update</button>
          {success && <span style={{color:"green", textAlign:"center",marginTop:"20px"}}>profile has been successfully updated</span>}
        </form>
      </div>
      <Sidebar />
    </div>
  )
}
