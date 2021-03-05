import React, { useState, useEffect, useMemo } from "react";

import { character } from "./css/style.module.css";

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
  }, [posEndX, posEndY, isAnimated]);

  const onTransitionEnd = () => {
    !noBack && setPos({ left: posX, top: posY });
  };

  return (
    <div className={character} style={style} onTransitionEnd={onTransitionEnd}>
      {children}
    </div>
  );
};

export default Character;
