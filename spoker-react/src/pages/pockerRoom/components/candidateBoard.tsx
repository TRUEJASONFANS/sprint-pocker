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
  resetHandler: Function,
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
    console.log(this.props.resetHandler);
    this.props.resetHandler();
  }
  render() {
    let candidateCards = new Set();
    this.props.usersList.map((card, index) => {
      candidateCards.add(card.fibonacciNum);
    });
    return (
      <div>
        <Modal
          title="Candidate Cards"
          visible={this.state.visiable}
          footer={null}
          onCancel={this.cancel}
        >
          {candidateCards.forEach(value => { 
            <div className={`${styles.card}`} style={{ background: '#149c37' }}>
            <div className={`${styles.cardContainer}`}>
              <div className={styles.smallCardId}>
                <span className={styles.smallCardIdSpan}>{value}</span>
              </div>
              <div className={styles.playerVote}>
                <span>{value}</span>
              </div>
            </div>
            </div>
          })}
        </Modal>
      </div>
    )
  }
}
