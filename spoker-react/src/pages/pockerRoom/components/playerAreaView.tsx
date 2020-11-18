import * as React from 'react';
import styles from './playerAreaView.css';
import CandidateBoard from './candidateBoard';
import { connect } from 'dva';
interface Props {
  usersList: Card[],
  global,
}
interface Card {
  clicked: boolean,
  shown: boolean,
  fibonacciNum: number,
  playerName: string,
}
interface Props2 {
  card:Card,
  index: number,
  userName: string,
}

class PlayerSelectedCard extends React.PureComponent<Props2, any> {
  constructor(props) {
    super(props);
  }
  render() {
    console.log("PayerCard updated");
    const card = this.props.card;
    let pokerCard;
    let leftStyle = { left: `${10 + this.props.index * 110}px`, border : this.props.card.playerName === this.props.userName ? "SkyBlue dotted": ""};
    if (!card.shown) {// 如果还不能翻牌， 意思是指有人已经出牌，但并没有全部出完
      pokerCard = <div><div className={`${styles.card} ${styles.cardBack}`} /><div style={{font:"14px Georgia, serif"}}>{this.props.card.playerName}</div></div>;
      if (card.clicked) { // 该玩家已经出牌，但是碍于场上玩家并没有全部出牌，不翻牌。
        pokerCard = <div><div className={`${styles.card} ${styles.cardBackClicked}`} /><div style={{font:"14px Georgia, serif"}}>{this.props.card.playerName}</div></div>;
      }
    } else { // 全部出完了，可以显示牌了
      pokerCard = (
        <div className={`${styles.card}`} style={{ background: '#149c37'}}>
            <div className={`${styles.cardContainer}`}>
              <div className={styles.smallCardId}>
                <span className={styles.smallCardIdSpan}>{this.props.card.fibonacciNum}</span>
              </div>
              <div className={styles.playerVote}>
                <span>{this.props.card.fibonacciNum}</span>
              </div>
            </div>
            <div style={{fontSize:"14px", lineHeight:"20px"}}>{this.props.card.playerName}</div>
        </div>);
    }
    return (
      <div className={styles.cardWapper} style={leftStyle}>
        {pokerCard}
      </div>)
  }
}
@connect(({global})=> ({global}))
export default class PlayerAreaView extends React.PureComponent<Props, any> {

  render() {
    const {global} = this.props;
    const {userName} = global;
    console.log("playerAreaView: rerender " + userName);
    return (
      <>
        {this.props.usersList.map((card, index) => <PlayerSelectedCard key={index} index={index} card={card} userName={userName}/>)}
        <CandidateBoard/>
      </>
     )
  }
}

