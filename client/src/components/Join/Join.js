import React,{useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import styles from './Join.module.css';
const Chat=()=>{
    const[name,setName]=useState('');
    const[room,setRoom]=useState('');
   
    return(
        <div className={styles.joinOuterContainer}>
<div className={styles.joinInnerContainer}>
    <h1 className={styles.heading}>Join</h1>
    <hr className={styles.hr}></hr>
    <div><input placeholder="Name" className={styles.joinInput} type="text" onChange={(event)=>setName(event.target.value)}/></div>
    <div><input placeholder="Room" className={styles.joinInput}  type="text" onChange={(event)=>setRoom(event.target.value)}/></div>
<Link  to={`/chat?name=${name}&room=${room}`}>

<button onClick={event=>(!name || !room)?event.preventDefault():null} className={styles.button} type="submit">Sign In</button>
</Link>

</div>
        </div>
    )
}
export default Chat;