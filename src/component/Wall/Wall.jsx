import React, { Component, Fragment } from 'react';

import Style from './css/style.module.css';

class Wall extends Component {
  state = {
    squares: 125,
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
    let arrIndex = [2, 3, 4, 27, 29, 52, 53, 54, 77, 79, 102, 103, 104];
    for (const number of arrIndex) {
      if (number === index) {
        return <div className={Style.square} style={{backgroundColor: '#000000'}}></div>;
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
