import React, { useState, useEffect, useMemo } from "react";

import { character } from "./css/style.module.css";

const Character = ({
  posX,
  posY,
  posEndX,
  posEndY,
  width,
  height,
  bg,
  isAnimated,
  transitionTime = 0.5,
  noBack,
  children,
}) => {
  const [pos, setPos] = useState({ left: posX, top: posY });

  const style = useMemo(
    () => ({
      backgroundImage: `url("${bg}")`,
      left: `${pos.left}%`,
      top: `${pos.top}%`,

      width: `${width}px`,
      height: `${height}px`,

      transition: `${transitionTime}s`,
    }),
    [bg, width, height, pos, transitionTime]
  );

  useEffect(() => {
    if (isAnimated) {
      setPos({ left: `${posEndX}`, top: `${posEndY}` });
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
