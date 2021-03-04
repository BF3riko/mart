import React, { Component } from "react";
import Winwheel from "../Winwheel";

import Character from "../Character";

import Style from "./css/style.module.css";

import bg from "../../img/якубович.jpg";

import bg_rabbit from "../../img/заяц.jpg";

import bg_egg from "../../img/pngegg.png";

const phases = {
  START: "start",
  KICK: "kick",
  END: "end",
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
        <Winwheel sendResult={this.sendResult} />
        <Character posX={100} posY={100} width={300} height={300} bg={bg_egg} />
        <Character
          posX={900}
          posY={100}
          posEndX={800}
          posEndY={100}
          width={300}
          height={300}
          bg={bg_rabbit}
          transitionTime={0.2}
          isAnimated={this.state.phase === phases.KICK}
        />
        <Character
          posX={-300}
          posY={100}
          posEndX={500}
          posEndY={500}
          width={300}
          height={300}
          bg={bg_rabbit}
          transitionTime={3}
          noBack
          isAnimated={this.state.phase === phases.END}
        />
        )
        <Character posX={400} posY={700} width={300} height={300} bg={bg} />
      </div>
    );
  }
}

export default Scene;
