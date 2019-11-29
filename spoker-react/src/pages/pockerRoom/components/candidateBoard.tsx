import * as React from 'react';
import { Modal } from 'antd';
import styles from './candidateBoard.css';

interface Card {
  clicked: boolean,
  shown: boolean,
  fibonacciNum: number,
  playerName: string,
}
interface Props {
  usersList: Card[],
  isOwner,
}
interface State {
  visiable: boolean,
}
export default class CandidateBoard extends React.PureComponent<Props, State> {
  timeHanlder: NodeJS.Timeout

  constructor(props) {
    super(props);
    this.state = {
      visiable: false,
    }
    this.cancel = this.cancel.bind(this);
  }

  componentDidUpdate = () => {
    let shown = false;
    this.props.usersList.forEach(card => {
      if (card.shown) {
        shown = true;
      }
    });
    if (shown && !this.state.visiable) {
      this.timeHanlder = setTimeout(() => {
        this.setState({
          visiable: true
        });
      }, 2000)
    }
  };

  componentWillUnmount = () => {
    clearTimeout(this.timeHanlder);
  };

  cancel() {
    this.setState({ visiable: false });
    // this.props.resetHandler();
  }
  render() {
    let candidateCardsSet = new Set();
    this.props.usersList.map((card, index) => {
      candidateCardsSet.add(card.fibonacciNum);
    });
    let candidateCards = [...candidateCardsSet];
    let wrapClassNameStyle = this.props.isOwner ? "candidateModalOwner":"candidateModal";

    return (
      <div>
        <Modal
          title="Candidate Cards"
          visible={this.state.visiable}
          footer={null}
          onCancel={this.cancel}
          maskClosable={false}
          wrapClassName={wrapClassNameStyle}
        >
          <div>
            {candidateCards.map((card, index) => <PureCandidateCard card={card} key={index} isOwner={this.props.isOwner} />)}
          </div>
        </Modal>
      </div>
    )
  }
}
interface CardProps {
  card: string,
  isOwner: boolean

}
class PureCandidateCard extends React.PureComponent<CardProps> {

  onClick(e) {
    if (!this.props.isOwner) {
      e.preventDefault();
      return;
    }
    // trigger the click final score broad cast
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
