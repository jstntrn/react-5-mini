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
                currentValue: state.currentValue + action.amount,
                futureValues: [],
                previousValues: [state.currentValue, ...state.previousValues]
            };
        case DECREMENT:
            return {
                currentValue: state.currentValue - action.amount,
                futureValues: [],
                previousValues: [state.currentValue, ...state.previousValues]
            };
        case UNDO:
            return {
                currentValue: state.previousValues[0],
                futureValues: [state.currentValue, ...state.futureValues],
                previousValues: state.previousValues.slice(1)
            };
        case REDO:
            return {
                currentValue: state.currentValue,
                futureValues: state.previousValues.slice(1),
                previousValues: [state.currentValue, ...state.previousValues]
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