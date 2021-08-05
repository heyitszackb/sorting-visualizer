import React from "react"
import './Cell.css'

function Cell({length, cellSize, colorKey}) {
   const COLOR_SET = ["grey","green","orange","pink"]

   let color = COLOR_SET[colorKey]
   let style = {
      backgroundColor: color,
      width: cellSize,
      height: cellSize,
   }
   return(
      <div className="Cell" style={style}></div>
   )
}

export default Cell