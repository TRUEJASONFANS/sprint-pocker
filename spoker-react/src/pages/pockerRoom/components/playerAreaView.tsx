import * as React from 'react';
import styles from './player_card.css';
interface Props {
  usersList: []
}
interface Props2 {
  card: {
    clicked: boolean,
    shown: boolean,
    fibonacciNum: number,
    playerName: string,
  },
  index: number
}
class PlayerSelectedCard extends React.Component<Props2, any> {
  constructor(props) {
    super(props);
  }
  render() {
    const card = this.props.card;
    let pokerCard;
    let leftStyle = { left: `${10 + this.props.index * 110}px` };
    if (!card.shown) {
      pokerCard = <div><div className={`${styles.card} ${styles.cardBack}`} /><div>{this.props.card.playerName}</div></div>;
      if (card.clicked) {
        pokerCard = <div><div className={`${styles.card} ${styles.cardBackClicked}`} /><div>{this.props.card.playerName}</div></div>;
      }
    } else {
      pokerCard = (
        <div className={`${styles.card}`} style={{ background: '#149c37' }}>
            <div className={`${styles.cardContainer}`}>
              <div className={styles.smallCardId}>
                <span>{this.props.card.fibonacciNum}</span>
              </div>
              <div className={styles.playerVote}>
                <span>{this.props.card.fibonacciNum}</span>
              </div>
            </div>
        </div>);
    }
    return (
      <div className={styles.cardWapper} style={leftStyle}>
        {pokerCard}
      </div>)
  }
}

export default class PlayerAreaView extends React.Component<Props, any> {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        {this.props.usersList.map((card, index) => <PlayerSelectedCard key={index} index={index} card={card} />)}
      </div>)
  }
}

