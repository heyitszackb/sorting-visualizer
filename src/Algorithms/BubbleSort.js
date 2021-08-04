import { swap } from './helpers'

const bubbleSort = (array, position, arraySteps, colorSteps) => {
    
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                swap(array, j, j + 1)
            }
            arraySteps.push(array.slice())
        }
        arraySteps.push(array.slice())
    }
    return
}

export default bubbleSort