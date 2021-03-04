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
}) => {
  const [pos, setPos] = useState({ left: posX, top: posY });

  const style = useMemo(
    () => ({
      backgroundImage: `url("${bg}")`,
      left: `${pos.left}px`,
      top: `${pos.top}px`,

      width: `${width}px`,
      height: `${height}px`,
    }),
    [bg, width, height, pos]
  );

  useEffect(() => {
    if (isAnimated) {
      setPos({ left: posEndX, top: posEndY });
    }
  }, [posEndX, posEndY, isAnimated]);

  const onTransitionEnd = () => {
    setPos({ left: posX, top: posY });
  };

  return (
    <div className={character} style={style} onTransitionEnd={onTransitionEnd}>
      p
    </div>
  );
};

export default Character;
