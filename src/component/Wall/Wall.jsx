import React, { Component, Fragment } from 'react';

import Style from './css/style.module.css';

import Card from './Card';

class Wall extends Component {
  state = {
    squares: 125,
    letterM: {
      index: 35,
      letter: 'M',
    },
    letterFirstA: {
      index: 36,
      letter: 'А',
    },
    letterP: {
      index: 37,
      letter: 'Р',
    },
    letterT: {
      index: 38,
      letter: 'Т',
    },
    letterA: {
      index: 39,
      letter: 'А',
    },
    superFinalArr: 'СУПЕРФИНАЛ'.split(''),
    numberEight: [2, 3, 4, 27, 29, 52, 53, 54, 77, 79, 102, 103, 104],
    wordIndices: [108, 109, 110, 111, 112, 113, 114, 115, 116, 117],
    flip: false,
  }

  // splitting = (arr) => {
  //   let size = 5;
  //   let subarray = [];
  //   for (let i = 0; i < Math.ceil(arr.length/size); i++){
  //     subarray[i] = arr.slice((i*size), (i*size) + size);
  //   }

  //   return subarray;
  // }

  paintingDigit = (index) => {
    for (const number of this.state.numberEight) {
      if (number === index) {
        return (
          <Card usual={true}/>
        );
      }
    }

    if (index === this.state.letterM.index) {
      return (
        <Card
          letter={this.state.letterM.letter}
          flip={true}
        />
      );
    }

    if (index === this.state.letterFirstA.index) {
      return (
        <Card
          letter={this.state.letterFirstA.letter}
        />
      )
    }

    if (index === this.state.letterP.index) {
      return (
        <Card
          letter={this.state.letterP.letter}
          flip={true}
        />
      );
    }

    if (index === this.state.letterT.index) {
      return (
        <Card
          letter={this.state.letterT.letter}
        />
      );
    }

    if (index === this.state.letterA.index) {
      return (
        <Card
          letter={this.state.letterA.letter}
          flip={true}
        />
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
        {Array(this.state.squares).fill(1).map((_, index) => {
          return (
            <Fragment key={`square_${index}`}>
              {this.paintingDigit(index)}
            </Fragment>
          )
        })}
      </div>
    )
  }
}

export default Wall;
