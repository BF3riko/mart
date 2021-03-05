import React, { Component } from "react";
import Rectangle from "../../icons/Rectangle";

import Style from "./css/style.module.css";

import Img from "../../img/Zarubin.png";

class Window extends Component {
  render() {
    return (
      <div className={Style.window} style={{zIndex: this.props.zIndexWin}}>
        <div className={Style.container}>
          <div className={Style.square}>
            <img className={Style.img} src={Img} alt="картинка" />
          </div>
          <div className={Style.wrapper}>
            <p className={Style.text}>{this.props.text}</p>
            <Rectangle className={Style.img} />
          </div>
        </div>
      </div>
    );
  }
}

export default Window;
