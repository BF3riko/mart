import React, { Component, Fragment } from 'react';

import Style from './css/style.module.css';

import Card from './Card';

class Wall extends Component {
  state = {
    squares: 125,
    letterM: {
      index: 35,
      letter: 'M',
      letterFirst: 'С',
    },
    letterFirstA: {
      index: 36,
      letter: 'А',
    },
    letterP: {
      index: 37,
      letter: 'Р',
      letterFirst: 'Ф',
    },
    letterT: {
      index: 38,
      letter: 'Т',
    },
    letterA: {
      index: 39,
      letter: 'А',
      letterFirst: 'Р',
    },
    superFinalArr: 'СУПЕРФИНАЛ'.split(''),
    numberEight: [
      {index: 2, second: 0.2},
      {index: 3, second: 0.3},
      {index: 4, second: 0.4},
      {index: 27, second: 0.5},
      {index: 29, second: 0.6},
      {index: 52, second: 0.7},
      {index: 53, second: 0.8},
      {index: 54, second: 0.9},
      {index: 77, second: 1},
      {index: 79, second: 1.1},
      {index: 102, second: 1.2},
      {index: 103, second: 1.3},
      {index: 104, second: 1.4},
    ],
    wordIndices: [108, 109, 110, 111, 112, 113, 114, 115, 116, 117],
    flip: false,
  }

  paintingDigit = (index) => {
    for (const item of this.state.numberEight) {
      if (item.index === index) {
        return (
          <Card flip={true} usual={true} secondDelay={item.second}/>
        );
      }
    }

    if (index === this.state.letterM.index) {
      return (
        <Card
          letter={this.state.letterM.letter}
          letterFirst={this.state.letterM.letterFirst}
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
          letterFirst={this.state.letterP.letterFirst}
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
          letterFirst={this.state.letterA.letterFirst}
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
