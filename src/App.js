import './App.css';
import React from "react"
import Bar from './Components/Bar'

import bubbleSort from './Algorithms/BubbleSort'

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
         barCount: 10,
         delay: 200,
      }
   }

   componentDidMount() {
      this.generateBars()
   }

   //Generate random numbers between 10 and 100 and update the state
   generateBars() {
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
   generateSteps() {

      let array = this.state.array.slice()
      let steps = this.state.arraySteps.slice()
      let colorSteps = this.state.colorSteps.slice()
      bubbleSort(array, 0, steps, colorSteps)
      console.log(steps)
      this.setState({
         array: steps[steps.length-1],
         arraySteps: steps,
         colorSteps: colorSteps,
      })
   }

   //Clears the timeouts using the ids in this.state.timeouts
   clearTimeouts() {
      this.state.timeouts.forEach(timeout => clearTimeout(timeout))
      this.setState({
         timeouts: [],
      })
   }

   //Creates a new blank array filled with zeros and updates the state
   clearColorKey() {
      let blankKey = new Array(parseInt(this.state.barCount)).fill(0)
      this.setState({
         colorKey: blankKey,
         colorSteps: [blankKey],
      })
   }

   render() {
      //Show the bars on the screen
      let barsDiv = this.state.array.map((value, index) => 
         <Bar
            key={index}
            length={value}
         />)

      return(
         <div>
            <h1>Sorting Visualizer</h1>
            <div className="bars container card">
               {barsDiv}
            </div>
         </div>
      )
   }
}

export default App