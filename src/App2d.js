//Ideas: Jump x number of steps

import React from "react"

//Icons
import { IconButton } from '@material-ui/core'
import { PlayArrowRounded, PauseRounded, SkipPreviousRounded, SkipNextRounded, RotateLeftRounded, FormatAlignJustify } from '@material-ui/icons'

//Style
import './App.css';

//Components
import Bar from './Components/Bar'
import Cell from './Components/Cell'

//Algorithms
import bubbleSort from './Algorithms/BubbleSort'
import findEndNode from './Algorithms/findEndNode'

class App extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         array: [], //This will be the current numbers of the heights of the current bars
         colorKey: [],
         arraySteps: [],
         colorSteps: [],
         currentStep: 0,
         timeouts: [],
         algorithim: 'Bubble Sort',
         gridSize: 10,
         cellSize: 30,
         delay: 100,
      }
   }

   componentDidMount() {
      this.generateGrid()
   }

   setTimeouts = () => {
      let steps = this.state.arraySteps
      let colorSteps = this.state.colorSteps

      this.clearTimeouts()
      let timeouts = []
      let i = 0

      while (i < steps.length - this.state.currentStep) {
         let timeout = setTimeout(() => {
            let currentStep = this.state.currentStep
            this.setState({
               array: steps[currentStep],
               colorKey: colorSteps[currentStep],
               currentStep: currentStep + 1
            })
         }, this.state.delay * (i))
         timeouts.push(timeout)
         i++
      }

      this.setState({
         timeouts: timeouts
      })
   }

   stepForward = () => {
      if (this.state.currentStep >= this.state.arraySteps.length - 1) return;
      this.clearTimeouts()

      let currentStep = this.state.currentStep + 1
      this.setState({
         array: this.state.arraySteps[currentStep],
         colorKey: this.state.colorSteps[currentStep],
         currentStep: currentStep,
      })
   }

   //Generate random numbers between 10 and 100 and update the state
   generateGrid = () => {
      this.clearTimeouts()
      this.clearColorKey()

      let gridSize = parseInt(this.state.gridSize)
      let gridTemp = []

      for (let i = 0; i < gridSize; i++) {
         let row = []
         for (let j = 0; j < gridSize; j++) {
            // row.push(Math.floor(Math.random() * 90) + 10)
            // row.push(`${i}${j}`)
            row.push(0)
         }
         gridTemp.push(row)
      }

      let coords = []
      this.generateStartEnd(coords)

      gridTemp[coords[0]][coords[1]] = 1
      gridTemp[coords[2]][coords[3]] = 2
      this.setState({
         array: gridTemp,
         arraySteps: [gridTemp],
         gridSize: gridSize,
         currentStep: 0,
      }, () => this.generateSteps())
   }

   generateStartEnd = (coords) => {
      for (let i = 0; i < 4; i++) {
         coords[i] = Math.floor(Math.random() * this.state.gridSize)
      }
      if ((coords[0] == coords[2] && coords[1] == coords[3])) {
         this.generateStartEnd(coords)
      }
   }
   
   //Generate steps and store them in state
   generateSteps = () => {

      let array = this.state.array.slice()
      let steps = this.state.arraySteps.slice()
      let colorSteps = this.state.colorSteps.slice()
      // bubbleSort(array, 0, steps, colorSteps)
      console.log("run")
      findEndNode(array, 0, steps, colorSteps)
      this.setState({
         // array: steps[steps.length-1],
         arraySteps: steps,
         colorSteps: colorSteps,
      })
   }

   //Clears the timeouts using the ids in this.state.timeouts
   clearTimeouts = () => {
      this.state.timeouts.forEach(timeout => clearTimeout(timeout))
      this.setState({
         timeouts: [],
      })
   }

   //Creates a new blank array filled with zeros and updates the state
   clearColorKey = () => {
      let blankKey = []
      let gridSize = parseInt(this.state.gridSize)
      for (let i = 0; i < gridSize; i++) {
         let row = []
         for (let j = 0; j < gridSize; j++) {
            row.push(0)
         }
         blankKey.push(row)
      }
      this.setState({
         colorKey: blankKey,
         colorSteps: [blankKey],
      })
   }

   stepBack = () => {
      if (this.state.currentStep === 0) return;
      this.clearTimeouts()

      let currentStep = this.state.currentStep - 1
      this.setState({
         array: this.state.arraySteps[currentStep],
         colorKey: this.state.colorSteps[currentStep],
         currentStep: currentStep
      })

   }

   render() {
      //Show the bars on the screen
      let cellsDiv = this.state.array.map((value, indexA) => {
         return (
            <div className="cellCol">
               {
               value.map((cell, indexB) => 
                  <Cell
                  key={indexB}
                  length={cell}
                  cellSize={this.state.cellSize}
                  colorKey={this.state.array[indexB][indexA]} 
                  />)
               }
            </div>
            )
      })


      //Set player controls
      let playButton;

      //If the timeouts length is not 0 and not the end of the timeouts array
      if (this.state.timeouts.length !== 0 && this.state.currentStep !== this.state.arraySteps.length) {
         playButton = (
            <IconButton onClick={() => this.clearTimeouts()}>
               <PauseRounded />
            </IconButton>
         )
      //Else if the current step is the last step
      } else if (this.state.currentStep === this.state.arraySteps.length) {
         playButton = (
            <IconButton color="secondary" onClick={() => this.generateGrid()}>
               <RotateLeftRounded />
            </IconButton>
         )
      //Otherwise
      } else {
         playButton = (
            <IconButton color="secondary" onClick={() => this.setTimeouts()}>
               <PlayArrowRounded />
            </IconButton>
         )
      }

      return(
         <div>
            <h1>Sorting Visualizer</h1>
            <div className="bars container card">
               {cellsDiv}
            </div>
            <div className="container card">
               <IconButton onClick={this.generateGrid}>
                  <RotateLeftRounded />
               </IconButton>

               <IconButton onClick={this.stepBack}>
                  <SkipPreviousRounded />
               </IconButton>

               {playButton}

               <IconButton onClick={this.stepForward}>
                  <SkipNextRounded/>
               </IconButton>

            </div>

            <div className="controls container-small">

            </div>
         </div>
      )
   }
}

export default App