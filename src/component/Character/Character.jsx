import React, { useState, useEffect, useMemo } from "react";

import cn from 'classnames';

import Style from "./css/style.module.css";

const Character = ({
  posX,
  posY,
  posEndX,
  posEndY,
  width,
  height,
  scaleEnd,
  bg,
  isAnimated,
  transitionTime = 0.5,
  noBack,
  children,
  money,
  fedor,
  small,
  big,
  ilgiz,
  bigMoney,
  kuklev,
}) => {
  const [pos, setPos] = useState({
    left: posX,
    top: posY,
    height: height,
    width: width,
  });

  const style = useMemo(
    () => ({
      backgroundImage: `url("${bg}")`,
      backgroundSize: `contain`,
      left: `${pos.left}%`,
      top: `${pos.top}%`,

      width: `${pos.width}px`,
      height: `${pos.height}px`,

      transition: `${transitionTime}s`,
    }),
    [bg, pos, transitionTime]
  );

  useEffect(() => {
    if (isAnimated) {
      setPos({
        left: `${posEndX}`,
        top: `${posEndY}`,
        height: `${height * scaleEnd}`,
        width: `${width * scaleEnd}`,
      });
    } else if (noBack) {
      setPos({
        left: `${posX}`,
        top: `${posY}`,
        height: `${height}`,
        width: `${width}`,
      });
    }
  }, [posEndX, posEndY, isAnimated, money, fedor, small, big, ilgiz, bigMoney, kuklev,]);

  const onTransitionEnd = () => {
    !noBack && setPos({ left: posX, top: posY });
  };

  const positionClassee = cn(Style.character, {
    [Style.positionMoney]: money,
    [Style.fedor]: fedor,
    [Style.small]: fedor ? false : small,
    [Style.big]: fedor ? false : big,
    [Style.ilgizPos]: ilgiz,
    [Style.bigMoney]: bigMoney,
    [Style.kuklev]: kuklev,
  })

  return (
    <div className={positionClassee} style={style} onTransitionEnd={onTransitionEnd}>
      {children}
    </div>
  );
};

export default Character;
