import React, { Component, createRef } from "react";
import Winwheel from "../Winwheel2";

import Character from "../Character";

import Wall from "../Wall/"; //Табло
import Ceiling from "../Ceiling"; //Потолок
import Window from "../Window"; //Окно справа в углу
import Prize from '../Prize'; //Приз

import ImgPrize from '../../img/card.png';

import Style from "./css/style.module.css";

import bg from "../../img/якубович.jpg";
import bg_rabbit from "../../img/Ilgiz1.png";
import bg_egg from "../../img/Ilgiz2.png";

import Side from "../Side";
import Floor from "../Floor";

const phases = {
  START: "start",
  KICK: "kick",
  END: "end",
};

const RandomedCharacter = (props) => {
  const rnd = Math.random() * 10;
  let _bg;

  if (rnd < 3) _bg = bg;

  if (rnd < 7 && rnd >= 3) _bg = bg_rabbit;

  if (rnd < 10 && rnd >= 7) _bg = bg_egg;

  return <Character {...props} bg={_bg} />;
};

class Scene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phase: phases.START,
      maxSizePrize : 100,
      win: false,
    };

    this.winwheelRef = createRef();
    this.refScene = createRef();
    this.refPrizeContainer = createRef();
    this.refPrize = createRef();
  }

  getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  }

  a = (index) => {
    const boxSize = this.getRandom(100, 300);

    const gameSize = this.refPrizeContainer.current.getBoundingClientRect();
    const maxTop = gameSize.height - boxSize;
    const maxLeft = gameSize.width - boxSize;

    return {
      height: `${boxSize / 1.5}px`,
      width: `${boxSize}px`,
      position: 'absolute',
      top: `${this.getRandom(0, maxTop)}px`,
      left: `${this.getRandom(0, maxLeft)}px`,
      backgroundImage: `url("${ImgPrize}")`,
      animationDelay: `${index/10}s`,
    }
  }

  sendResult = (result) => {
    if (result) {
      this.setState({ result, phase: phases.KICK });
      this.winwheelRef.current.pushToWin();

      setTimeout(() => {
        this.setState({ result, phase: phases.END, win: true });
      }, 2000);

      this.setState({ result, phase: phases.START });
    } else {
      this.setState({ result, phase: phases.START });
    }
  };

  render() {
    return (
      <div ref={this.refScene} className={Style.scene}>
        <div ref={this.refPrizeContainer} className={Style.container} style={this.state.win ? {zIndex: 1000} : null}>
          {this.state.phase === phases.END ?
            Array(this.state.maxSizePrize).fill('1').map((item, index) => {
              return (
                <Prize myRef={this.refPrize} myStyle={this.a(index)}/>
              )
            }) : null
          }
        </div>

        <Side />
        <Side second={true} />
        <Ceiling />
        <Wall />
        <Winwheel
          ref={this.winwheelRef}
          sendResult={this.sendResult}
          className={Style.winwheel}
        />
        <Character posX={5} posY={20} width={300} height={550} bg={bg_egg} />
        <Character
          posX={45}
          posY={20}
          posEndX={42}
          posEndY={20}
          width={300}
          height={500}
          bg={bg_rabbit}
          transitionTime={0.2}
          isAnimated={this.state.phase === phases.KICK}
        />

        <RandomedCharacter
          posX={100}
          posY={10}
          posEndX={40}
          posEndY={50}
          width={300}
          height={300}
          transitionTime={3}
          noBack
          isAnimated={this.state.phase === phases.END}
        />

        <Floor />
        <Window />
      </div>
    );
  }
}

export default Scene;
