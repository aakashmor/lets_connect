import "./message.css";
import { format } from "timeago.js";
import {useEffect,useState} from 'react'
import axios from 'axios'
import pfp from '../../img/default_pfp.jpg'

export default function Message({ message, own }) {
const [img,setImg]=useState(pfp)

useEffect(()=>{
      const func=async ()=>{
                const res=await axios.get(`/api/users?userId=${message.sender}`)
                if(res.data.avatar!=="")
                setImg(res.data.avatar)
      }
     func()
},[])

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={img}
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
