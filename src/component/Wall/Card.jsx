import React, { Component, createRef } from 'react';
import cn from 'classnames';

import Style from './css/style.module.css';

class Card extends Component {
  state = {
    flip: this.props.flip ? this.props.flip : false,
    usual: this.props.usual ? this.props.usual : false,
  }

  refCard = createRef();

  handleFlipCard = () => {
    this.setState(state => ({
      ...state,
      flip: !state.flip,
    }))
  }

  render() {
    const cardClasses = cn(Style.card, {
      [Style.isFlipped]: this.state.flip,
      [Style.animated]: this.state.usual,
    })

    return (
      <div className={Style.scene} onClick={this.handleFlipCard}>
        <div ref={this.refCard} className={cardClasses} style={{animationDelay: `${this.props.secondDelay}s`}}>
          <div className={`${Style.cardFace} ${Style.cardFaceFront}`} >
            <p>{this.props.letterFirst}</p>
          </div>
          <div className={`${Style.cardFace} ${Style.cardFaceBack}`} >
            <p>{this.props.letter}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Card;
