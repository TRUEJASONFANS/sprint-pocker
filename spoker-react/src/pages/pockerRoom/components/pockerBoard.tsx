import { Button, Layout, notification, Table } from 'antd';
import styles from './PockerBoard.css';
import { connect } from 'dva';
import RecordCreatorDlg from '@/pages/pockerRoom/components/recordCreatorDlg';
import RoomInfoDlg from '@/pages/pockerRoom/components/roomInfoDlg';
import PokerBoardFooter from './pokerBoardFooter';
import PlayerAreaView from '@/pages/pockerRoom/components/playerAreaView';
import AddStoryDlg from '@/pages/pockerRoom/components/addStoryDlg';
const { Header, Footer, Sider, Content } = Layout;
import React, { PureComponent } from 'react';
import router from 'umi/router';
import ReactPathManu from '@/component/reactPathMenu';

interface Props {
  dispatch: Function, 
  roomName: string, 
  scoreList: [], 
  playerName: string,
  resetFlag: boolean, 
  curPage: number, 
  totalPage: number, 
  clickedNum: string, 
  featureName: string, 
  internalTaskName: string, 
  finalScores: [],

}
interface State {

}
class PockerBoard extends PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.onResetGame = this.onResetGame.bind(this);
    this.createRecordHandler = this.createRecordHandler.bind(this);
    this.goToLastPage = this.goToLastPage.bind(this);
    this.goToNextPage = this.goToNextPage.bind(this);
    this.openNotification = this.openNotification.bind(this);
    this.onAddStory = this.onAddStory.bind(this);
  }

  createRecordHandler(tickerRecord) {
    this.props.dispatch({
      type: 'pockerBoard/addTicketRecord',
      payload: tickerRecord,
    });
  }

  //svg click event
  goToLastPage(evt) {
    let values = {
      curPage: this.props.curPage - 1,
      totalPage: this.props.totalPage,
      roomName: this.props.roomName
    }
    this.props.dispatch({
      type: 'pockerBoard/onNavigateToPage',
      payload: values,
    });
  }

  goToNextPage(evt) {
    let values = {
      curPage: this.props.curPage + 1,
      totalPage: this.props.totalPage,
      roomName: this.props.roomName
    }
    this.props.dispatch({
      type: 'pockerBoard/onNavigateToPage',
      payload: values,
    });
  }

  onResetGame(event) {
    let values = {
      curPage: this.props.curPage,
      totalPage: this.props.totalPage,
      roomName: this.props.roomName
    }
    event.preventDefault();
    this.props.dispatch({
      type: 'pockerBoard/onNextGame',
      payload: values
    });
  }

  openNotification() {
    if (this.props.resetFlag) {
      notification.open({
        message: 'A new Game start!',
        description:
          'this is new start!',
        onClick: () => {
          //console.log('Notification Clicked!');
        },
        duration: 1
      });
      this.props.dispatch({
        type: "pockerBoard/syncResetflag", payload: {
          resetFlag: !this.props.resetFlag
        }
      })
    }
  }

  onAddStory(formData) {
    let values = {
      curPage: this.props.curPage,
      totalPage: this.props.totalPage,
      roomName: this.props.roomName,
      ...formData
    }
    this.props.dispatch({
      type: "pockerBoard/AddStory",
      payload: values
    })
  }

  backToRoomPage() {
    router.push('/rooms');
  }

  render() {
    const columns = [
      {
        title: 'Task',
        dataIndex: 'internalTaskTitle',
        key: 'internalTaskTitle',
        render: text => text
      },
      {
        title: 'Final Score',
        dataIndex: 'finalScore',
        key: 'finalScore',
        render: text => text
      }
    ];
    const featureName = this.props.featureName;
    const internalTaskName = this.props.internalTaskName;
    const playerName = this.props.playerName;
    const roomName = this.props.roomName;
    const cards = ['??', '0', '1', '2', '3', '5', '8', '13', '21'];
    const dispatch =  this.props.dispatch;
    const curPage = this.props.curPage;
    const totalPage = this.props.totalPage;
    const finalScores = this.props.finalScores;
    const scoreList = this.props.scoreList;
    const resetFlag = this.props.resetFlag;
    const clickedNum = this.props.clickedNum;
    return (
      <Layout style={{ minHeight: "100%", flexFlow: "column nowrap", alignContent: "flex-start" }}>
        <Header className={styles.header}>
          <span className={styles.titile}>{featureName} {internalTaskName}</span>
          <div style={{ float: "right" }} className={styles.toolbar}>
            <Button onClick={this.onResetGame} type="primary" style={{ margin: "5px" }}>Reset</Button>
            <RecordCreatorDlg record={scoreList} onOk={this.createRecordHandler} creator={playerName} featureName={featureName} internalTaskName={internalTaskName}>
              <Button type="primary" style={{ margin: "5px" }}>Commit</Button>
            </RecordCreatorDlg>
            <RoomInfoDlg roomName={roomName} >
              <Button type="primary" style={{ margin: "5px" }}>Info</Button>
            </RoomInfoDlg>
            <Button type="primary" style={{ margin: "5px" }} onClick={this.backToRoomPage}>Exit</Button>
          </div>
        </Header>
        <Content className={styles.content}>
          <div className={styles.playerAreaView}>
            <PlayerAreaView usersList={scoreList} />
          </div>
          <Sider className={styles.finalScoreSider}>
            <div className={styles.storySwitcher}>
              <span>STORY #</span>
              <div className={styles.storySwitcherControls}>
                <svg className={styles.storySwitcherControlsSvg} viewBox="0 0 1792 1792" onClick={this.goToLastPage}>
                  <path d="M1203 544q0 13-10 23l-393 393 393 393q10 10 10 23t-10 23l-50 50q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l466-466q10-10 23-10t23 10l50 50q10 10 10 23z" fill="#fff" />
                </svg>
                <span className={styles.storyCounter}>{curPage + "/" + totalPage}</span>
                <svg className={styles.storySwitcherControlsSvg} viewBox="0 0 1792 1792" onClick={this.goToNextPage}>
                  <path d="M1171 960q0 13-10 23l-466 466q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l393-393-393-393q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l466 466q10 10 10 23z" fill="#fff" />
                </svg>
              </div>
            </div>

            <Table
              columns={columns}
              dataSource={finalScores}
              rowKey={record => record.internalTaskTitle}
              pagination={false}
            />
            <div className={styles.addStoryBtn}>
              <AddStoryDlg onOk={this.onAddStory} featureName={featureName}>
                <Button type="primary" style={{ margin: "5px" }} size={"small"}>Add a internal task</Button>
              </AddStoryDlg>
            </div>
          </Sider>
        </Content>
        <Footer className={styles.footer}>
          <div className={styles.playCandidateCardContainers}>
            <PokerBoardFooter cards={cards} dispatch={dispatch} roomName={roomName} curUser={playerName} resetFlag={resetFlag} curPage={curPage} clickedNum={clickedNum} />
          </div>
          <div className={styles.pathMenu}>
            <ReactPathManu />
          </div>
        </Footer>
        {this.openNotification()}
      </Layout>
    );
  }
}
function mapStateToProps(state) {
  const { roomName, scoreList, resetFlag, curPage,
    totalPage, clickedNum, playerName, featureName, internalTaskName, finalScores } = state.pockerBoard;
  return {
    roomName,
    scoreList,
    playerName,
    resetFlag,
    curPage,
    totalPage,
    clickedNum,
    featureName,
    internalTaskName,
    finalScores
  }
}
export default connect(mapStateToProps)(PockerBoard);
