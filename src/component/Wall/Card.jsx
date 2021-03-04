import React, { Component } from 'react';
import cn from 'classnames';

import Style from './css/style.module.css';

class Card extends Component {
  state = {
    flip: this.props.flip ? this.props.flip : false,
  }

  handleFlipCard = () => {
    this.setState(state => ({
      ...state,
      flip: !state.flip,
    }))
  }

  render() {
    const cardClasses = cn(Style.card, {
      [Style.isFlipped]: this.state.flip,
    })

    return (
      <div className={Style.scene} onClick={this.handleFlipCard}>
        <div className={cardClasses}>
          <div className={`${Style.cardFace} ${Style.cardFaceFront}`} ></div>
          <div className={`${Style.cardFace} ${Style.cardFaceBack}`} >
            <p>{this.props.letter}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Card;