import React, { Component, createRef } from "react";
import Sound from "react-sound";
import cn from "classnames";

import Winwheel from "../Winwheel2";

import Character from "../Character";

import Wall from "../Wall/"; //Табло
import Ceiling from "../Ceiling"; //Потолок
import Window from "../Window"; //Окно справа в углу
import Prize from "../Prize"; //Приз

import Style from "./css/style.module.css";

import bg_tuboltcev from "../../img/якубович.jpg";
import bg_volkov from "../../img/Ilgiz.png";
import bg_kondakov from "../../img/Kuklev.png";
import bg_sirota from "../../img/Fedor.png";

import prize_stockman from "../../img/card_stockman.jpg";
import prize_letual from "../../img/card_letual.png";
import prize_ozon from "../../img/card_ozon.png";
import prize_republic from "../../img/card_republic.png";

import bg_ilgiz from "../../img/Ilgiz.png";
import bg_kuklev from "../../img/Kuklev.png";
import ch_fedor from "../../img/Fedor.png";

import ch_disk from "../../img/disk.png";
import ch_papers from "../../img/papers.png";
//import ch_money from "../../img/money.png";
import ch_money2 from "../../img/money2.png";

import winnerSfx from "../../music/winner-of-tour.mp3";
import vseSfx from "../../music/vse-vashe.mp3";
import barabanSfx from "../../music/pole-chudes-baraban.mp3";

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
    this.selectedCharacter = Math.round(Math.random() * 3);

    console.log(this.selectedCharacter);

    switch (this.selectedCharacter) {
      case 0:
        this._bg = bg_tuboltcev;
        break;

      case 1:
        this._bg = bg_volkov;
        break;

      case 2:
        this._bg = bg_kondakov;
        break;

      case 3:
      default:
        this._bg = bg_sirota;
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
      maxSizePrize: 500,
      win: false,
      spinSoundStatus: Sound.status.STOPPED,
      winnerSoundStatus: Sound.status.STOPPED,
      vseSoundStatus: Sound.status.STOPPED,
    };

    this.winwheelRef = createRef();
    this.winCharecterRef = createRef();
    this.refScene = createRef();
    this.refPrizeContainer = createRef();
    this.refPrize = createRef();
  }

  beginSpin = () => {
    this.setState({
      ...this.state,
      spinSoundStatus: Sound.status.PLAYING,
      winnerSoundStatus: Sound.status.STOPPED,
      vseSoundStatus: Sound.status.STOPPED,
    });
  };

  sendResult = (result) => {
    if (result) {
      this.setState({ result, phase: phases.KICK });
      this.winwheelRef.current.pushToWin();

      setTimeout(() => {
        this.setState({
          ...this.state,
          result,
          phase: phases.END,
          spinSoundStatus: Sound.status.STOPPED,
          winnerSoundStatus: Sound.status.PLAYING,
          vseSoundStatus: Sound.status.STOPPED,
          text: "Сектор ПРИЗ!",
        });

        setTimeout(() => {
          this.setState({
            ...this.state,
            text: "Сыграем ещё раз?",
            spinSoundStatus: Sound.status.STOPPED,
            winnerSoundStatus: Sound.status.STOPPED,
            vseSoundStatus: Sound.status.STOPPED,
          });
        }, 10000);
      }, 2000);
    } else {
      this.setState({ result, phase: phases.START });
    }

    this.setState({ result, phase: phases.START });
  };

  refresh = (e) => {
    if (this.state.phase === phases.END) {
      this.setState({
        ...this.state,
        win: true,
        spinSoundStatus: Sound.status.STOPPED,
        winnerSoundStatus: Sound.status.STOPPED,
        vseSoundStatus: Sound.status.PLAYING,
      });

      setTimeout(() => {
        this.setState((state) => ({
          ...state,
          phase: phases.START,
          text: "Крутите барабан!",
          spinSoundStatus: Sound.status.STOPPED,
          winnerSoundStatus: Sound.status.STOPPED,
          vseSoundStatus: Sound.status.STOPPED,
          win: false,
        }));
        this.winCharecterRef.current.selectCharacter();
      }, 5000);

      e.preventDefault();
      return false;
    }
  };

  getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  renderPrize = (index) => {
    const boxSize = this.getRandom(100, 300);

    const gameSize = this.refPrizeContainer.current.getBoundingClientRect();
    const maxTop = gameSize.height - boxSize;
    const maxLeft = gameSize.width - boxSize;

    let imgPrizeUrl;
    switch (this.winCharecterRef.current.selectedCharacter) {
      case 0:
        imgPrizeUrl = prize_stockman;
        break;

      case 1:
        imgPrizeUrl = prize_letual;
        break;

      case 2:
        imgPrizeUrl = prize_ozon;
        break;

      case 3:
      default:
        imgPrizeUrl = prize_republic;
        break;
    }

    return {
      height: `${boxSize / 1.5}px`,
      width: `${boxSize}px`,
      position: "absolute",
      top: `${this.getRandom(-100, maxTop + 100)}px`,
      left: `${this.getRandom(-100, maxLeft + 100)}px`,
      backgroundImage: `url("${imgPrizeUrl}")`,
      animationDelay: `${index / 100}s`,
    };
  };

  render() {
    const containerPrize = cn(Style.container, {
      [Style.hide]: !this.state.win,
    });

    return (
      <div ref={this.refScene} className={Style.scene} onClick={this.refresh}>
        <div
          ref={this.refPrizeContainer}
          className={containerPrize}
          style={this.state.win ? { zIndex: 1000 } : null}
        >
          {this.state.win
            ? Array(this.state.maxSizePrize)
                .fill("1")
                .map((item, index) => {
                  return (
                    <Prize
                      key={index.toString()}
                      myRef={this.refPrize}
                      myStyle={this.renderPrize(index)}
                    />
                  );
                })
            : null}
        </div>
        <Side />
        <Side second={true} />
        <Ceiling />
        <Wall />
        <Floor />
        <Character
          // posX={28}
          // posY={5}
          // width={180}
          // height={250}
          scaleEnd={1}
          bg={ch_fedor}
          fedor={true}
        />

        <div className={Style.wrapper}>
          <div className={Style.persContainer}>
            <Winwheel
              ref={this.winwheelRef}
              sendResult={this.sendResult}
              beginSpin={this.beginSpin}
              isEnabled={this.state.phase === phases.START}
              className={Style.winwheel}
              small={true}
              big={true}
            />

            <Character
              posX={-10}
              posY={0}
              width={350}
              height={600}
              scaleEnd={1}
              bg={bg_kuklev}
              small={true}
              big={true}
              kuklev={true}
            >
              <Character
                posX={60}
                posY={10}
                width={90}
                height={90}
                scaleEnd={1}
                bg={ch_papers}
              />
            </Character>

            <Character
              posX={120}
              posY={10}
              posEndX={105}
              posEndY={10}
              width={400}
              height={500}
              scaleEnd={1}
              bg={bg_ilgiz}
              transitionTime={0.2}
              isAnimated={this.state.phase === phases.KICK}
              small={true}
              big={true}
              ilgiz={true}
            >
              <Character
                posX={55}
                posY={0}
                width={50}
                height={50}
                scaleEnd={1}
                bg={ch_disk}
              />
            </Character>
          </div>
        </div>
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
        <Window text={this.state.text} zIndexWin={this.state.win ? 2000 : 12} big={true} />

        <Character
          // posX={75}
          // posY={90}
          width={150}
          height={80}
          scaleEnd={1}
          bg={ch_money2}
          money={true}
          bigMoney={true}
        />

        <Sound url={winnerSfx} playStatus={this.state.winnerSoundStatus} />
        <Sound url={vseSfx} playStatus={this.state.vseSoundStatus} />
        <Sound url={barabanSfx} playStatus={this.state.spinSoundStatus} />
      </div>
    );
  }
}

export default Scene;
