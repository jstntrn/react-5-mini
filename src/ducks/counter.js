//use const and initial state
const initialState = {
    currentValue: 0,
    futureValues: [],
    previousValues: []
};

//assign action type string to variables 
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
const UNDO = "UNDO";
const REDO = "REDO";

//named function same as file
//used state and action as parameters with a default value of state of the initialState
//set initialState to state so state can be referenced in the switch and process state changes
export default function counter( state = initialState, action ) {
    switch(action.type) {
        case INCREMENT:
            return {
                currentValue: state.currentValue + action.amount, //increments current value by amount set in parameter
                futureValues: [], //resets future value to an empty array to milestone the current value
                previousValues: [state.currentValue, ...state.previousValues] //log current value with previous array
            };
        case DECREMENT:
            return {
                currentValue: state.currentValue - action.amount,
                futureValues: [],
                previousValues: [state.currentValue, ...state.previousValues]
            };
        case UNDO:
            return {
                currentValue: state.previousValues[0], //Undo has us go back to the first element in the previous array
                futureValues: [state.currentValue, ...state.futureValues], //it logs the current value in futureValues incase redo is used
                previousValues: state.previousValues.slice(1) //sends back a new array without the first element
            };
        case REDO:
            return {
                currentValue: state.futureValues[0], //Redo has us go forward after going back from an undo action, thus setting the currentValue to the first element in the future log array
                futureValues: state.futureValues.slice(1), //returns new array without the first element
                previousValues: [state.currentValue, ...state.previousValues] //moves the current value to the previous array incase undo is clicked
            };
        //set default of switch to return state
        default:
            return state;
    }
}

//create action functions that return the amount to increment by and the action type that is used by the switch
export function increment(amount) {
    return { amount, type: INCREMENT };
}

export function decrement(amount) {
    return { amount, type: DECREMENT };
}

export function undo() {
    return { type: UNDO };
}

export function redo() {
    return { type: REDO };
}