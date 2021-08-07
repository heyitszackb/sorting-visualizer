import React from "react"
import './Backbutton.css'

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

function Backbutton(props) {
   return(
      <div className="backbuttonWrapper">
         <a className="backbutton" target="_blank" href="https://zackbrandon.com">
            <ArrowBackIcon className="arrow"/>
            {props.text}
         </a>
      </div>
   )
}

export default Backbutton