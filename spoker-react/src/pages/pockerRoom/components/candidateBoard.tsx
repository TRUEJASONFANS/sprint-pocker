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
  dispatch: Function,
}
interface State {
  visiable: boolean,
}
@connect(({ pockerBoard, loading }) => ({ pockerBoard, loading }))
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

    // if (shown && !this.state.visiable) {
    //   this.timeHanlder = setTimeout(() => {
    //     this.setState({
    //       visiable: true
    //     });
    //   }, 2000)
    // }

  };

  componentWillUnmount = () => {
    clearTimeout(this.timeHanlder);
  };

  componentWillMount = () => {
    setInterval(function () {
      var now = new Date();
      const offsetMs = now.getTimezoneOffset() * 60 * 1000;
      const dateLocal = new Date(now.getTime() - offsetMs);
      var str = dateLocal.toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " ");
      console.log(str);
    }, 60000);
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

  onSelelctCandidate() {
    this.setState({
      visiable: true
    });
  }

  render() {
    const { pockerBoard } = this.props
    const { scoreList, isOwner, finalScores, curPage } = pockerBoard;

    let candidateCardsSet = new Set<String>();
    scoreList.map((card, index) => {
      candidateCardsSet.add(card.fibonacciNum);
    });
    let candidateCards = [...candidateCardsSet];
    let wrapClassNameStyle = isOwner ? "candidateModalOwner" : "candidateModal";
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
                dispatch={this.props.dispatch}
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
  dispatch: Function,
  pockerBoard: any,
  onSelelctCandidate: Function
}
class PureCandidateCard extends React.PureComponent<CardProps> {
  dipatch: Function
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.dipatch = this.props.dispatch;
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
    // trigger the click final score broad cast
    this.dipatch({
      type: "pockerBoard/OnSelectCandidate",
      payload: finalCandidate
    });
    this.props.onSelelctCandidate();
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
