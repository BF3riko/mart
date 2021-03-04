import React, { Component, Fragment } from 'react';

import Style from './css/style.module.css';

class Wall extends Component {
  state = {
    squares: 125,
    letterM: {
      index: 35,
      letter: 'M',
    },
    letterP: {
      index: 37,
      letter: 'Р',
    },
    letterA: {
      index: 39,
      letter: 'А',
    },
    superFinalArr: 'СУПЕРФИНАЛ'.split(''),
    numberEight: [2, 3, 4, 27, 29, 36, 38, 52, 53, 54, 77, 79, 102, 103, 104],
    wordIndices: [108, 109, 110, 111, 112, 113, 114, 115, 116, 117],
  }

  splitting = (arr) => {
    let size = 5;
    let subarray = [];
    for (let i = 0; i < Math.ceil(arr.length/size); i++){
      subarray[i] = arr.slice((i*size), (i*size) + size);
    }

    return subarray;
  }

  paintingDigit = (index) => {
    for (const number of this.state.numberEight) {
      if (number === index) {
        return <div className={Style.square} style={{backgroundColor: '#000000'}}></div>;
      }
    }

    if (index === this.state.letterM.index) {
      return (
        <div className={Style.square}>
          <p>{this.state.letterM.letter}</p>
        </div>
      );
    }

    if (index === this.state.letterP.index) {
      return (
        <div className={Style.square}>
          <p>{this.state.letterP.letter}</p>
        </div>
      );
    }

    if (index === this.state.letterA.index) {
      return (
        <div className={Style.square}>
          <p>{this.state.letterA.letter}</p>
        </div>
      );
    }

    for (const number of this.state.wordIndices) {
      let i = this.state.wordIndices.indexOf(number);
      if (number === index) {
        return (
          <div className={Style.square}>
            <p>{this.state.superFinalArr[i]}</p>
          </div>
        );
      }
    }

    return <div className={Style.square}></div>;
  }

  render() {

    return (
      <div className={Style.wrapper}>
        {Array(this.state.squares).fill(1).map((item, index) => {
          return (
            <Fragment>
              {this.paintingDigit(index)}
            </Fragment>
          )
        })}
      </div>
    )
  }
}

export default Wall;
