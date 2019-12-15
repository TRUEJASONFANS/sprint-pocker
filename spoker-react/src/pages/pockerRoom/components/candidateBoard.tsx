import * as React from 'react';
import { Modal , Form , Input} from 'antd';
import styles from './candidateBoard.css';
import { connect } from 'dva';
import { FinalCandidate } from '../services/pockerService';
const FormItem = Form.Item;
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
  showCandidateBoard: boolean,
  shownAddStoryDlg: boolean,
  shownConfirm: boolean
}
@connect(({ global, pockerBoard, loading }) => ({ global, pockerBoard, loading }))
export class CandidateBoard extends React.PureComponent<Props, State> {
  timeHanlder: NodeJS.Timeout
  constructor(props) {
    super(props);
    this.state = {
      showCandidateBoard: false,
      shownAddStoryDlg: false,
      shownConfirm: false,
    }
    this.cancel = this.cancel.bind(this);
    this.onSelelctCandidate = this.onSelelctCandidate.bind(this);
    this.renderNextTaskModal = this.renderNextTaskModal.bind(this);
  }

  componentDidUpdate = () => {
    const { pockerBoard } = this.props
  };

  componentWillUnmount = () => {
    clearTimeout(this.timeHanlder);
  };


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
    this.setState({ showCandidateBoard: false });
  }

  onSelelctCandidate(finalCandidate) {
    setTimeout(() => {
         // trigger the click final score broad cast
      this.props.dispatch({
      type: "pockerBoard/OnSelectCandidate",
      payload: finalCandidate
    });
    this.setState({
      shownConfirm: true
    });
    }, 1000);
  }

  showConfirm() {
    var _this = this;
    if (this.state.shownConfirm) {
      Modal.confirm({
        title: 'Do you want to go to next internal task?',
        content: 'When clicked the OK button to create next internal task',
        onOk() {
          _this.setState(
            { 
              shownAddStoryDlg: true ,
              shownConfirm: false,
            }
          );
          Modal.destroyAll();
        },
        onCancel() {
          Modal.destroyAll();
          _this.setState({
            showCandidateBoard: true,
            shownConfirm: false,
          });
         },
      });
    }
  }

  renderCard(candidateCards, isOwner, pockerBoard) {
    return candidateCards.map((card: string, index) => (
      <PureCandidateCard
        card={card}
        key={index}
        isOwner={isOwner}
        pockerBoard={pockerBoard}
        onSelelctCandidate={this.onSelelctCandidate}
      />))
  }

  renderNextTaskModal(getFieldDecorator, featureName:string) {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const okHandler = function() {
      Modal.destroyAll();
    }
    let _this = this;
    const hideModelHandler = function() {
      _this.setState({shownAddStoryDlg: false});
      Modal.destroyAll();
    }
    return (
      <Modal
        visible={this.state.shownAddStoryDlg}
        onOk={okHandler}
        onCancel={hideModelHandler}
      >
        <Form layout={'horizontal'} onSubmit={okHandler}>
          <FormItem {...formItemLayout} label="F/I title">
            {getFieldDecorator('title', {rules: [{ required: true, message: '请输入Title' }],initialValue: featureName,})(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="task title">
            {getFieldDecorator('taskTitle', {rules: [{ required: false, message: '请输入internal task title' }],})(<Input />)}
          </FormItem>
        </Form>
      </Modal>
    )
  }

  render() {
    const { pockerBoard, global} = this.props
    const { scoreList, roomOwner, finalScores, curPage , featureName} = pockerBoard;
    const {userName} = global;

    let candidateCardsSet = new Set<String>();
    scoreList.map((card, index) => {
      candidateCardsSet.add(card.fibonacciNum);
    });
    let candidateCards = [...candidateCardsSet];

    let isOwner = roomOwner === userName;
    let wrapClassNameStyle =  isOwner ? "candidateModalOwner" : "candidateModal";
    let shown = false;
    scoreList.forEach(card => {
      if (card.shown && finalScores.length < curPage) {
        shown = true;
      }
    });
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Modal
          title="Candidate Cards"
          visible={shown || this.state.showCandidateBoard}
          footer={null}
          onCancel={this.cancel}
          maskClosable={false}
          wrapClassName={wrapClassNameStyle}
        >
          <div>{this.renderCard(candidateCards, isOwner, pockerBoard)}</div>
          {this.showConfirm()}
          {this.renderNextTaskModal(getFieldDecorator, featureName)}
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
export default Form.create()(CandidateBoard);
