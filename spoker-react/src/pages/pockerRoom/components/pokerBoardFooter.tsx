import * as React from 'react';
import styles from './card.css';

export interface Props {
  cards: [];
}

export interface State {
  flag: true;
}

class PokerBoardFooter extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    // 设置 initial state
    this.state = {
      flag: true,
    };
    this.render0= this.render0.bind(this);
  }
  render() {
    return (
      <div className={styles.playerCardsContainer}>
        {this.props.cards.map((card, index) => (this.render0(card, index, this.state.flag)))}
      </div>
    );
  }
  render0(card: string, index: number, nowFlag: boolean) {
    let leftStyle = { left: `${20 + index * 70}px` };
    function onClickHandler() {
      this.setState({ flag: !nowFlag });
      console.log(nowFlag);
    }
    
    const containStyle = {
      width: 100,
      height: 140,
      transform: this.state.flag ? "transform: matrix3d(0.968846, -0.247665, 0, 0, 0.246399, 0.963893, 0.100983, 0, -0.0250101, -0.0978374, 0.994888, 0, 0, -126.512, 0, 1)" :
        "transform: matrix(1, 0, 0, 1, 0, 0)",
    };

    return (
      <div className={`${styles.cardRig} ${styles.cardInHand}`} style={leftStyle}>
        <div className={`${styles.cardWrapper} ${styles.perspectiveWrapper}`}>
          <div className={styles.animationWrapper}>
            <div className={`${styles.cardContainer}`} onClick={onClickHandler.bind(this)}>
              <div className={`${styles.card} ${styles.cardBack}`} />
              <div className={` ${styles.cardFace}`}>
                <div className={styles.smallCardId}>
                  <span>{card}</span>
                </div>
                <div className={styles.playerVote}>
                  <span>{card}</span>
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
