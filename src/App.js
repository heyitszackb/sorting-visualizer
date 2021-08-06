//Ideas: Jump x number of steps

import React from "react"

//Icons
import { IconButton, Slider } from '@material-ui/core'
import { PlayArrowRounded, PauseRounded, SkipPreviousRounded, SkipNextRounded, RotateLeftRounded } from '@material-ui/icons'
import { Grid } from '@material-ui/core'
//Style
import './App.css';

//Components
import Bar from './Components/Bar'
import Form from './Components/Form'

//Algorithms
import bubbleSort from './Algorithms/BubbleSort'
import mergeSort from './Algorithms/MergeSort'
import quickSort from './Algorithms/QuickSort'

//TODO Tomorrow:
//Merge Sort
//Learn More


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
         algorithm: 'Merge Sort',
         barCount: 25,
         delay: 50,
         screenWidth: window.innerWidth,
         screenHeight: window.innerHeight,
      }
   }

   ALGO_SET = {
      'Bubble Sort': bubbleSort,
      'Merge Sort': mergeSort,
      'Quick Sort': quickSort
   }

   componentDidMount() {
      this.generateBars()
      this.updateWindowDimensions()
      window.addEventListener('resize', this.updateWindowDimensions)
   }

   componentWillUnmount() {
      window.removeEventListener('resize', this.updateWindowDimensions)
   }

   updateWindowDimensions = () => {
      this.setState({
         screenWidth: window.innerWidth,
         screenHeight: window.innerHeight,
      })
      if (this.state.screenWidth < 600 && this.state.barCount == 50) {
         this.changeBarCount(25)
      }
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
   generateBars = () => {
      this.clearTimeouts()
      this.clearColorKey()

      let barCount = parseInt(this.state.barCount)
      let barsTemp = []

      for (let i = 0; i < barCount; i++) {
         barsTemp.push(Math.floor(Math.random() * 90) + 10)
      }

      this.setState({
         array: barsTemp,
         arraySteps: [barsTemp],
         barCount: barCount,
         currentStep: 0,
      }, () => this.generateSteps())
   }

   //Generate steps and store them in state
   generateSteps = () => {

      let array = this.state.array.slice()
      let steps = this.state.arraySteps.slice()
      let colorSteps = this.state.colorSteps.slice()
      this.ALGO_SET[this.state.algorithm](array, 0, steps, colorSteps)
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
      let blankKey = new Array(parseInt(this.state.barCount)).fill(0)
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

   adjustStep = (event, newStep) => {
      this.clearTimeouts()

      let currentStep = newStep
      this.setState({
         array: this.state.arraySteps[currentStep],
         colorKey: this.state.colorSteps[currentStep],
         currentStep: currentStep
      })
   }

   changeBarCount = (barCount) => {
      this.setState({
         barCount: barCount
      }, () => this.generateBars())
   }

   changeAlgorithm = (event) => {
      this.setState({
         algorithm: event.target.value,
         currentStep: 0,
         arraySteps: [this.state.arraySteps[this.state.currentStep === 0 ? 0 : this.state.currentStep - 1]],
      }, () =>  this.generateBars())
      this.clearTimeouts() 
      this.clearColorKey()
   }

   changeDelay = (event) => {
      this.clearTimeouts()
      this.setState({
         delay: parseInt(event.target.value)
      }, () => this.setTimeouts())
   }

   render() {
      //Show the bars on the screen
      let barsDiv = this.state.array.map((value, index) => 
         <Bar
            key={index}
            length={value}
            colorKey={this.state.colorKey[index]} 
         />)


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
            <IconButton color="secondary" onClick={() => this.generateBars()}>
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
         <div className="App">
            <h1>Sorting Visualizer</h1>
            <div className="item">
               <div className="bars card">
                  {barsDiv}
               </div>
            </div>
            <div className="item">
               <div className="card">
                  <div className="playback">
                        <Slider 
                           color="secondary"
                           value={this.state.currentStep}
                           min={0}
                           max={this.state.arraySteps.length - 1} 
                           onChange={this.adjustStep}
                        />
                        <IconButton onClick={this.generateBars}>
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
               </div>
            
            </div>
            <div className="item">
               <div className="controls">
                  <Form
                     formLabel="Algorithm"
                     values={['Bubble Sort','Merge Sort','Quick Sort']}
                     labels={['Bubble Sort','Merge Sort','Quick Sort']}
                     currentValue={this.state.algorithm}
                     onChange={this.changeAlgorithm}
                     windowWidth={1000}
                  />
                  <Form 
                     formLabel="Array Size"
                     values={[10, 25, 50]}
                     labels={['10 items','25 items','50 items']}
                     currentValue={this.state.barCount}
                     onChange={e => this.changeBarCount(e.target.value)}
                     windowWidth={this.state.screenWidth}
                  />
                  <Form 
                     formLabel="Speed"
                     values={[100, 50, 10]}
                     labels={['1x','2x','4x']}
                     currentValue={this.state.delay}
                     onChange={this.changeDelay}
                     windowWidth={1000}
                  />
               </div>
            </div>
         </div>
      )
   }
}

export default App