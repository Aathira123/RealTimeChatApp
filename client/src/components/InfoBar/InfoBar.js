import React from 'react';
import './InfoBar.css';
import {Link} from 'react-router-dom';
import closeIconx from '../../icons/closeIconx.png';
import onlineIcon from '../../icons/onlineIcon.png'
const InfoBar=({room})=>(
    <div className="infoBar" >
        <div className="leftInnerContainer">
            <img className="onlineIcon" src={onlineIcon}/>
            <h3>{room}</h3>
        </div>
    <div className="rightInnerContainer"></div>
    <Link to="/"><img src={closeIconx} alt="closeimg" style={{marginRight:"20px"}}/></Link>
    </div> 

)
export default InfoBar;