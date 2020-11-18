import * as React from 'react';
import styles from './pokerBoardFooter.css';

export interface Props {
  cards: string[];
  dispatch: Function;
  roomName: string;
  curUser: string;
  resetFlag: boolean;
  curPage: number;
}

interface State {
  clickedNum: string,
}

interface Props2 {
  index: number;
  card: string;
  okHanlder: Function;
}

class PokerBoardFooter extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.onClickPockerNumber = this.onClickPockerNumber.bind(this);
    this.state = {
      clickedNum: '?',
    }
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
    this.setState({
      clickedNum: num
    });
  }

  render() {
    console.log("Footer rerender()");
    if (this.props.resetFlag && this.state.clickedNum !== '?') {
      this.setState({
        clickedNum: '?'
      })
    }
    return (
      <div style={{display:"inline-block"}}>
        {this.props.cards.map((card, index) => (<PalyerScoreCard card={card} index={index} key={index} okHanlder={this.onClickPockerNumber} />))}
      </div>
    );
  }

}

interface State2 {
  turnOn: boolean 
}
class PalyerScoreCard extends React.PureComponent<Props2, State2> {
  constructor(props) {
    super(props);
    this.onClickHandler = this.onClickHandler.bind(this);
    this.state  = {
      turnOn: false,
    }
  }
  onClickHandler() {
    if (this.props.clickedNum != this.props.card) {
      this.props.okHanlder(this.props.card, this.props.index);
    } else {
      this.props.okHanlder('?', -1);
    }
    this.setState({
      turnOn: !this.state.turnOn
    });
  }

  render() {
    const containStyle = {
      width: 100,
      height: 140,
      transform: this.state.turnOn ?
        "matrix3d(0.968846, -0.247665, 0, 0, 0.246399, 0.963893, 0.100983, 0, -0.0250101, -0.0978374, 0.994888, 0, 0, -126.512, 0, 1)" :
        "matrix(1, 0, 0, 1, 0, 0)",
      background: this.props.index < 5 ? "#0466d2" : "#149c37",
    };
    return (
      <div className={styles.cardInHand} style={{ left: `${20 + this.props.index * 70}px`,}}>
        <div className={`${styles.cardContainer}`} onClick={this.onClickHandler} style={containStyle}>
            <div className={styles.smallCardId}>
              <span>{this.props.card}</span>
            </div>
            <div className={styles.playerVote}>
              <span>{this.props.card}</span>
            </div>
        </div>
      </div>);

  }
}

export default PokerBoardFooter;

// helpers
