import React, { Component } from 'react';
import { connect } from 'react-redux';
import { increment, decrement, undo, redo } from './ducks/counter';

class Counter extends Component {
  render() {

    //destructure props into values
    const { currentValue, increment, decrement, futureValues, previousValues, undo, redo } = this.props;

    //invoke increment and decrement in arrow function for onClick event handler with the amount being passed in as a parameter
    //set the h1 tag display to show the currentValue from props
    return (
      <div className="app">
        <section className="counter">
          <h1 className="counter__current-value">{currentValue}</h1>
          <div className="counter__button-wrapper">
            <button
              className="counter__button increment-one"
              onClick={() => increment(1)}
            >
              +1
            </button>
            <button
              className="counter__button increment-five"
              onClick={() => increment(5)}
            >
              +5
            </button>
            <button
              className="counter__button decrement-one"
              onClick={() => decrement(1)}
            >
              -1
            </button>
            <button
              className="counter__button decrement-five"
              onClick={() => decrement(5)}
            >
              -5
            </button>
            <br />
            <button
              className="counter__button undo"
              disabled={previousValues === 0}
              onClick={undo}
            >
              Undo
            </button>
            <button
              className="counter__button redo"
              disabled={futureValues.length === 0}
              onClick={redo}
            >
              Redo
            </button>
          </div>
        </section>
        <section className="state">
          <pre>{JSON.stringify(this.props, null, 2)}</pre>
        </section>
      </div>
    );
  }
}

//create mapStateToProps function that takes in state and returns state
const mapStateToProps = state => state;

//use connect and put in currying format with Counter
//place action creators on counter's props using ,{}
export default connect(mapStateToProps, { increment, decrement, undo, redo })(Counter);
