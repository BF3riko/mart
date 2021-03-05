import React, { Component } from 'react';
import Style from './css/style.module.css';

class Prize extends Component {

  render() {
    return (
      <div ref={this.props.myRef} style={this.props.myStyle} className={Style.prize}></div>
    )
  }
}

export default Prize;
