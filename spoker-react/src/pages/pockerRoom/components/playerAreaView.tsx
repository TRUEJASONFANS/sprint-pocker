import * as React from 'react';
import styles from './card.css';
interface Props {
  usersList: []
}
interface Props2 {
  card: {}
}
class PlayerSelectedCard extends React.Component<Props2, any> {
  constructor(props) {
    super(props);
  }
  render() {
    const card = this.props.card;
    let pokerCard;
    if (card.clicked) {
      pokerCard = 
        <div className={`${styles.selectedCard}`} style={{background:'#149c37'}}>
          <div className={styles.selectedSmallCardId}>
            <span>{this.props.card.fibonacciNum}</span>
          </div>
          <div className={styles.selectedPlayerVote}>
            <span>{this.props.card.fibonacciNum}</span>
          </div>
        </div>;
    } else {
      pokerCard = <div><div className={`${styles.selectedCard} ${styles.selectedCardBack}`} /><div>{this.props.card.playerName}</div></div>;
    }
    return <div>
      {pokerCard}
    </div>
  }
}

export default class PlayerAreaView extends React.Component<Props, any> {
  constructor(props) {
    super(props);
  }
  render() {
    console.log("tag", this.props.usersList);
    return <div>
      {this.props.usersList.map((card, index) =>
        <PlayerSelectedCard key={index} card={card} />)
      }
    </div>
  }
}
