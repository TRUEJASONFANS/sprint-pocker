import * as React from 'react';
import { Modal } from 'antd';
import styles from './candidateBoard.css';
import { connect } from 'dva';
import { FinalCandidate } from '../services/pockerService';
interface Card {
  clicked: boolean,
  shown: boolean,
  fibonacciNum: number,
  playerName: string,
}
interface Props {
  pockerBoard,
  loading,
  global,
  dispatch: Function,
}
interface State {
  visiable: boolean,
}
@connect(({ global, pockerBoard, loading }) => ({ global, pockerBoard, loading }))
export default class CandidateBoard extends React.PureComponent<Props, State> {
  timeHanlder: NodeJS.Timeout
  constructor(props) {
    super(props);
    this.state = {
      visiable: false,
    }
    this.cancel = this.cancel.bind(this);
    this.onSelelctCandidate = this.onSelelctCandidate.bind(this);
  }

  componentDidUpdate = () => {
    const { pockerBoard } = this.props
  };

  componentWillUnmount = () => {
    clearTimeout(this.timeHanlder);
  };

  componentWillMount = () => {

  }

  cancel() {
    const { pockerBoard, dispatch } = this.props
    const { curPage, totalPage, roomName } = pockerBoard;
    let values = {
      curPage: curPage,
      totalPage: totalPage,
      roomName: roomName
    }
    dispatch({
      type: "pockerBoard/onNextGame",
      payload: values,
    });
    this.setState({ visiable: false });
  }

  onSelelctCandidate(finalCandidate) {
    setTimeout(() => {
      this.setState({
        visiable: true
      });
         // trigger the click final score broad cast
      this.props.dispatch({
      type: "pockerBoard/OnSelectCandidate",
      payload: finalCandidate
    });
    }, 2000);
  }

  render() {
    const { pockerBoard, global} = this.props
    const { scoreList, roomOwner, finalScores, curPage} = pockerBoard;
    const {userName} = global;

    let candidateCardsSet = new Set<String>();
    scoreList.map((card, index) => {
      candidateCardsSet.add(card.fibonacciNum);
    });
    let candidateCards = [...candidateCardsSet];

    console.log("userName：" + userName);
    let isOwner = roomOwner === userName;
    let wrapClassNameStyle =  isOwner ? "candidateModalOwner" : "candidateModal";
    let shown = false;
    scoreList.forEach(card => {
      if (card.shown && finalScores.length < curPage) {
        shown = true;
      }
    });
    return (
      <div>
        <Modal
          title="Candidate Cards"
          visible={shown}
          footer={null}
          onCancel={this.cancel}
          maskClosable={false}
          wrapClassName={wrapClassNameStyle}
        >
          <div>
            {candidateCards.map((card: string, index) => (
              <PureCandidateCard
                card={card}
                key={index}
                isOwner={isOwner}
                pockerBoard={pockerBoard}
                onSelelctCandidate={this.onSelelctCandidate}
              />
            ))}
          </div>
        </Modal>
      </div>
    );
  }
}
interface CardProps {
  card: string,
  isOwner: boolean,
  pockerBoard: any,
  onSelelctCandidate: Function
}
interface CardState {
  isClicked: boolean,
}
class PureCandidateCard extends React.PureComponent<CardProps, CardState> {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = {
      isClicked : false
    }
  }

  onClick(e) {
    if (!this.props.isOwner) {
      e.preventDefault();
      return;
    }
    const { curPage, roomName } = this.props.pockerBoard;
    let finalCandidate: FinalCandidate = {
      pageNum: curPage,
      roomName: roomName,
      score: this.props.card,
    }
    const {isClicked} = this.state;
    this.setState({isClicked: !isClicked});
    this.props.onSelelctCandidate(finalCandidate);
  }
  
  render() {
    return (
      <div className={`${styles.card}`} style={{ background: '#149c37' }} onClick={this.onClick} >
        <div className={`${styles.cardContainer}`}>
          <div className={styles.smallCardId}>
            <span className={styles.smallCardIdSpan}>{this.props.card}</span>
          </div>
          <div className={styles.playerVote}>
            <span>{this.props.card}</span>
          </div>
        </div>
      </div>
    )

  }
}
