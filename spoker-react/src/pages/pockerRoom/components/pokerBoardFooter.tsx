import * as React from 'react';
import styles from './pokerBoardFooter.css';

export interface Props {
  cards: string[],
  dispatch: Function,
  roomName: string,
  curUser: string,
  curPage: number,
  scoreList: {
    clicked: boolean,
    fibonacciNum: string,
    playerName: string,
    roomName: string,
    shown: boolean
  }[],
}

interface State {
  clickedNum: string,
}

interface Props2 {
  index: number,
  card: string,
  okHanlder: Function,
  clickedNum: string,
}

class PokerBoardFooter extends React.PureComponent<Props, State> {

  constructor(props) {
    super(props);
    this.onClickPockerNumber = this.onClickPockerNumber.bind(this);

  }

  onClickPockerNumber(num: string, index: number) {
    let flag;
    if (num == '?') {
      flag = false;
    } else {
      flag = true;
    }
    var values = {
      fibonacciNum: num,
      palyerName: this.props.curUser,
      clicked: flag,
      roomName: this.props.roomName,
      curPage: this.props.curPage
    }
    this.props.dispatch({
      type: 'pockerBoard/onClickPocker',
      payload: values
    });

  }

  render() {
    console.log("Footer rerender()");
    let findUser = this.props.scoreList.find(s => s.playerName === this.props.curUser);
    console.log(findUser)
    let clickedNum = findUser !== undefined ? findUser.fibonacciNum : '?'
    return (
      <div style={{display:"inline-block"}}>
        {this.props.cards.map((card, index) => (<PalyerScoreCardFC card={card} index={index} key={index} okHanlder={this.onClickPockerNumber}  clickedNum={clickedNum}/>))}
      </div>
    );
  }

}


function PalyerScoreCardFC(props:Props2) {

  const onClickHandler = () => {
    if (props.clickedNum != props.card) {
      props.okHanlder(props.card, props.index);
    } else {
      props.okHanlder('?', -1);
    }
  }

  const containStyle = {
    width: 100,
    height: 140,
    transform: props.clickedNum === props.card ?
      "matrix3d(0.968846, -0.247665, 0, 0, 0.246399, 0.963893, 0.100983, 0, -0.0250101, -0.0978374, 0.994888, 0, 0, -126.512, 0, 1)" :
      "matrix(1, 0, 0, 1, 0, 0)",
    background: props.index < 5 ? "#0466d2" : "#149c37",
  };

  return (
    <div className={styles.cardInHand} style={{ left: `${20 + props.index * 70}px`, }}>
      <div className={`${styles.cardContainer}`} onClick={onClickHandler} style={containStyle}>
        <div className={styles.smallCardId}>
          <span>{props.card}</span>
        </div>
        <div className={styles.playerVote}>
          <span>{props.card}</span>
        </div>
      </div>
    </div>);
}


export default PokerBoardFooter;

// helpers
