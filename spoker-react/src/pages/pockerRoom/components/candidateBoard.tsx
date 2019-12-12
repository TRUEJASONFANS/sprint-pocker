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
  visiable: boolean,
  selectedCandidate: boolean,
  shownAddStoryDlg: boolean,
}
@connect(({ global, pockerBoard, loading }) => ({ global, pockerBoard, loading }))
export class CandidateBoard extends React.PureComponent<Props, State> {
  timeHanlder: NodeJS.Timeout
  constructor(props) {
    super(props);
    this.state = {
      visiable: false,
      selectedCandidate: false,
      shownAddStoryDlg: false
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
    this.setState({ selectedCandidate: false });
  }

  onSelelctCandidate() {
    this.setState({
      selectedCandidate: true
    });
  }

  showConfirm(shown: boolean) {
    var _this = this;
    if (shown && this.state.selectedCandidate) {
      Modal.confirm({
        title: 'Do you want to go to next internal task?',
        content: 'When clicked the OK button to create next internal task',
        onOk() {
          _this.setState({
            shownAddStoryDlg: true
          });
        },
        onCancel() {},
      });
    }
  }

  showAddStoryDlg() {
    
  }

  okHandler() {

  }
  hideModelHandler() {
    this.setState({shownAddStoryDlg: false});
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

    let isOwner = roomOwner === userName;
    let wrapClassNameStyle =  isOwner ? "candidateModalOwner" : "candidateModal";
    let shown = false;
    scoreList.forEach(card => {
      if (card.shown && finalScores.length < curPage) {
        shown = true;
      }
    });
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const { getFieldDecorator } = this.props.form;
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
        {this.showConfirm(shown)}
        <Modal
          visible={this.state.shownAddStoryDlg}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form layout={'horizontal'} onSubmit={this.okHandler}>
            <FormItem {...formItemLayout} label="F/I title">
              {getFieldDecorator('title', {
                 rules: [{ required: true, message: '请输入Title' }],
                 initialValue: this.props.featureName,
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="task title">
              {getFieldDecorator('taskTitle', {
                 rules: [{ required: false, message: '请输入internal task title' }],
              })(<Input />)}
            </FormItem>
          </Form>
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
export default Form.create()(CandidateBoard);
