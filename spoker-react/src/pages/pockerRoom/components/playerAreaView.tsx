import * as React from 'react';
import styles from './card.css';
interface Props {
  usersList: []
}
interface Props2 {
  card: []
}
class PlayerSelectedCard extends React.Component<Props2, any> {
  constructor(props) {
    super(props);
  }
  render() {
    return <div>
      <div className={`${styles.selctedCard} ${styles.selctedCardBack}`}/>
      <div>{this.props.card.playerName}</div>
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

