import * as React from 'react';
import styles from './pokerBoardFooter.css';

export interface Props {
  cards: string[];
  dispatch: Function;
  roomName: string;
  curUser: string;
  resetFlag: boolean;
}

interface Props2 {
  index: number;
  card: string;
  okHanlder: Function;
  clickedIndex: number;
}
interface State {
  clickedIndex: number
}

class PokerBoardFooter extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      clickedIndex: -1,
    };
    this.onClickPockerNumber = this.onClickPockerNumber.bind(this);
  }

  onClickPockerNumber(num:string, index:number) {
    this.setState({
      clickedIndex: index
    });
    let flag;
    if(num=='?') {
      flag = false;
    } else {
      flag = true;
    }
    var values = {
      fibonacciNum: num,
      palyerName: this.props.curUser,
      clicked: flag,
      roomName: this.props.roomName
    }
    this.props.dispatch({
      type: 'pockerBoard/onClickPocker',
      payload: values
    });
  }

  render() {
    if (this.props.resetFlag) {
      this.setState({
        clickedIndex: -1
      });
    }
    return (
      <div className={styles.playerCardsContainer}>
        {this.props.cards.map((card, index) => (<PalyerScoreCard card={card} index={index} key={index} okHanlder={this.onClickPockerNumber} clickedIndex={this.state.clickedIndex} />))}
      </div>
    );
  }

}

class PalyerScoreCard extends React.Component<Props2> {
  constructor(props) {
    super(props);
    this.onClickHandler = this.onClickHandler.bind(this);
  }
  onClickHandler() {
    if (this.props.clickedIndex != this.props.index) {
      this.props.okHanlder(this.props.card, this.props.index);
    } else {
      this.props.okHanlder('?', -1);
    }
  }
  render() {
    let leftStyle = { left: `${20 + this.props.index * 70}px` };
    const containStyle = {
      width: 100,
      height: 140,
      transform: this.props.clickedIndex != this.props.index ? "matrix(1, 0, 0, 1, 0, 0)" :
        "matrix3d(0.968846, -0.247665, 0, 0, 0.246399, 0.963893, 0.100983, 0, -0.0250101, -0.0978374, 0.994888, 0, 0, -126.512, 0, 1)"
    };
    let cardStyle = {
      background: this.props.index < 5 ? "#0466d2" : "#149c37",
    }
    return (
      <div className={`${styles.cardRig} ${styles.cardInHand}`} style={leftStyle}>
        <div className={`${styles.cardWrapper} ${styles.perspectiveWrapper}`}>
          <div className={styles.animationWrapper}>
            <div className={`${styles.cardContainer}`} onClick={this.onClickHandler} style={containStyle}>
              <div className={`${styles.card}`} style={cardStyle} />
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
