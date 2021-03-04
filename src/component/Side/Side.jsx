import React, { Component } from 'react';

import Logo from "../../icons/Logo";

import Style from './css/style.module.css';

class Side extends Component {

  state = {

  }

  render() {
    return (
      <div className={this.props.second ? `${Style.side} ${Style.second}` : Style.side}>
        <div className={Style.wrapper}>
          {this.props.second ? null : <Logo className={Style.logo} />}
        </div>
      </div>
    )
  }
}

export default Side;
