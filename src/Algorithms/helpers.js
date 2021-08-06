export function swap(arr, a, b) {
    let temp = arr[a]
    arr[a] = arr[b]
    arr[b] = temp
}

export function insertStep(arrayNew, position, arraySteps) {
    let currentStep = arraySteps[arraySteps.length - 1].slice();
    currentStep.splice(position, arrayNew.length, ...arrayNew);
    arraySteps.push(currentStep);
  }