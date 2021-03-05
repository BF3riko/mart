import React, { Component, createRef } from "react";
import cn from 'classnames';


import Winwheel from "../Winwheel2";

import Character from "../Character";

import Wall from "../Wall/"; //Табло
import Ceiling from "../Ceiling"; //Потолок
import Window from "../Window"; //Окно справа в углу
import Prize from '../Prize'; //Приз

import ImgPrize from '../../img/card.png';

import Style from "./css/style.module.css";

import bg_test from "../../img/якубович.jpg";
import bg_ilgiz from "../../img/Ilgiz.png";
import bg_kuklev from "../../img/Kuklev.png";
import ch_fedor from "../../img/Fedor.png";

import ch_disk from "../../img/disk.png";
import ch_papers from "../../img/papers.png";
import ch_money from "../../img/money.png";
import ch_money2 from "../../img/money2.png";

import Side from "../Side";
import Floor from "../Floor";

const phases = {
  START: "start",
  KICK: "kick",
  END: "end",
};

class RandomedCharacter extends Component {
  constructor(props) {
    super(props);
    this.selectCharacter();
  }

  selectCharacter = () => {
    let rnd = Math.round(Math.random() * 3);
    switch (rnd) {
      case 0:
        this._bg = bg_test;
        break;

      case 1:
        this._bg = bg_ilgiz;
        break;

      case 2:
        this._bg = bg_kuklev;
        break;

      case 3:
      default:
        this._bg = bg_ilgiz;
        break;
    }
  };

  render() {
    return <Character {...this.props} bg={this._bg} />;
  }
}

class Scene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phase: phases.START,
      text: "Крутите барабан!",
      maxSizePrize : 100,
      win: false,
    };

    this.winwheelRef = createRef();
    this.refScene = createRef();
    this.refPrizeContainer = createRef();
    this.refPrize = createRef();
  }

  sendResult = (result) => {
    if (result) {
      this.setState({ result, phase: phases.KICK });
      this.winwheelRef.current.pushToWin();

      setTimeout(() => {
        this.setState({
          result,
          phase: phases.END,
          text: "Сектор ПРИЗ!",
          win: true,
        });

        setTimeout(() => {
          this.setState({
            ...this.state,
            text: "Сыграем ещё раз?",
            win: false,
          });
        }, 10500);
      }, 2000);


    } else {
      this.setState({ result, phase: phases.START });
    }

    this.setState({ result, phase: phases.START });
  };


  refresh = (e) => {
    if (this.state.phase === phases.END) {
      this.setState(state => ({
        ...state,
        phase: phases.START,
        text: "Крутите барабан!",
        win: false,
      }));

      setTimeout(() => {
        this.winCharecterRef.current.selectCharacter();
      }, 10);

      e.preventDefault();
      return false;
    }
  };




  getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  }

  renderPrize = (index) => {
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

  render() {
    const containerPrize = cn(Style.container, {
      [Style.hide]: !this.state.win,
    })

    return (
      <div ref={this.refScene} className={Style.scene}>
        <div ref={this.refPrizeContainer} className={containerPrize} style={this.state.win ? {zIndex: 1000} : null}>
          {this.state.phase === phases.END ?
            Array(this.state.maxSizePrize).fill('1').map((item, index) => {
              return (
                <Prize myRef={this.refPrize} myStyle={this.renderPrize(index)}/>
              )
            }) : null
          }
        </div>

        <Side />
        <Side second={true} />
        <Ceiling />
        <Wall />

        <Floor />

        <Winwheel
          ref={this.winwheelRef}
          sendResult={this.sendResult}
          isEnabled={this.state.phase === phases.START}
          className={Style.winwheel}
        />
        <Character
          posX={28}
          posY={5}
          width={180}
          height={250}
          scaleEnd={1}
          bg={ch_fedor}
        />

        <Character
          posX={55}
          posY={28}
          width={50}
          height={50}
          scaleEnd={1}
          bg={ch_disk}
        />

        <Character
          posX={17}
          posY={29}
          width={90}
          height={90}
          scaleEnd={1}
          bg={ch_papers}
        />

        <Character
          posX={6}
          posY={20}
          width={350}
          height={600}
          scaleEnd={1}
          bg={bg_kuklev}
        />

        <Character
          posX={45}
          posY={25}
          posEndX={42}
          posEndY={25}
          width={400}
          height={500}
          scaleEnd={1}
          bg={bg_ilgiz}
          transitionTime={0.2}
          isAnimated={this.state.phase === phases.KICK}
        />

        <RandomedCharacter
          ref={this.winCharecterRef}
          posX={100}
          posY={15}
          posEndX={50}
          posEndY={35}
          width={300}
          height={300}
          scaleEnd={2.5}
          transitionTime={this.state.phase === phases.END ? 5 : 0}
          noBack
          isAnimated={this.state.phase === phases.END}
        />
        <Window text={this.state.text}/>
        <Character
          posX={75}
          posY={90}
          width={150}
          height={80}
          scaleEnd={1}
          bg={ch_money2}
        />
      </div>
    );
  }
}

export default Scene;
