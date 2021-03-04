import React, { Component } from "react";
import Winwheel from "../Winwheel";

import Character from "../Character";

import Wall from "../Wall/"; //Табло
import Ceiling from "../Ceiling"; //Потолок
import Window from "../Window"; //Окно справа в углу

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
    this.state = { phase: phases.START };
  }

  sendResult = (result) => {
    if (result) {
      this.setState({ result, phase: phases.KICK });

      setTimeout(() => {
        this.setState({ result, phase: phases.END });
      }, 2000);
    } else {
      this.setState({ result, phase: phases.START });
    }
  };
  render() {
    return (
      <div className={Style.scene}>
        <Side />
        <Side second={true} />
        <Ceiling />
        <Wall />
        <Winwheel sendResult={this.sendResult} />
        <Character posX={5} posY={20} width={300} height={550} bg={bg_egg} />
        <Character
          posX={45}
          posY={20}
          posEndX={30}
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
