import * as React from 'react';
import styles from './card.css';

export interface Props {
  cards: string[],
  onOk: Function
}

export interface State {
  flag: boolean;
}

interface Props2 {
  index: number;
  card: string;
  onOK: Function
}

class PokerBoardFooter extends React.Component<Props, State> {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={styles.playerCardsContainer}>
        {this.props.cards.map((card, index) => (<Card card={card} index={index} key={index} onOK={this.props.onOk}/>))}
      </div>
    );
  }

}

class Card extends React.Component<Props2, State> {
  constructor(props) {
    super(props);

    // 设置 initial state
    this.state = {
      flag: true,
    };
    this.onClickHandler = this.onClickHandler.bind(this);
  }
  onClickHandler() {
    let curFlag = this.state.flag;
    this.setState({
      flag: !curFlag
    });
    this.props.onOK(this.props.card);
  }
  render() {
    let leftStyle = { left: `${20 + this.props.index * 70}px` };
    const containStyle = {
      width: 100,
      height: 140,
      transform: this.state.flag ? "matrix(1, 0, 0, 1, 0, 0)" :
        "matrix3d(0.968846, -0.247665, 0, 0, 0.246399, 0.963893, 0.100983, 0, -0.0250101, -0.0978374, 0.994888, 0, 0, -126.512, 0, 1)"
    };
    let cardStyle = {
      background: this.props.index < 5 ? "#0466d2":"#149c37",
    }
    return (
      <div className={`${styles.cardRig} ${styles.cardInHand}`} style={leftStyle}>
        <div className={`${styles.cardWrapper} ${styles.perspectiveWrapper}`}>
          <div className={styles.animationWrapper}>
            <div className={`${styles.cardContainer}`} onClick={this.onClickHandler} style={containStyle}>
              <div className={`${styles.card} ${styles.cardBack}`} style={cardStyle}/>
              <div className={` ${styles.cardFace}`}>
                <div className={styles.smallCardId}>
                  <span>{this.props.card}</span>
                </div>
                <div className={styles.playerVote}>
                  <span>{this.props.card}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>);

  }
}

export default PokerBoardFooter;

// helpers
