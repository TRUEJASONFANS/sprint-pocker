import { Button, Layout, notification, Table } from 'antd';
import styles from './PockerBoard.css';
import { connect } from 'dva';
import RecordCreatorDlg from '@/pages/pockerRoom/components/recordCreatorDlg';
import RoomInfoDlg from '@/pages/pockerRoom/components/roomInfoDlg';
import PokerBoardFooter from './pokerBoardFooter';
import PlayerAreaView from '@/pages/pockerRoom/components/playerAreaView';
import AddStoryDlg from '@/pages/pockerRoom/components/addStoryDlg';
const { Header, Footer, Sider, Content } = Layout;
import React from 'react';
import router from 'umi/router';
import ReactPathManu from '@/component/reactPathMenu';

function PockerBoard({ dispatch, roomName, scoreList, playerName,
  resetFlag, curPage, totalPage, clickedNum, featureName, internalTaskName, finalScores }) {

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

  // const cards = ['1'];
  const cards = ['??', '0', '1', '2', '3', '5', '8', '13', '21'];

  function createRecordHandler(tickerRecord) {
    dispatch({
      type: 'pockerBoard/addTicketRecord',
      payload: tickerRecord,
    });
  }

  //svg click event
  function goToLastPage(evt) {
    let values = {
      curPage: curPage - 1,
      totalPage: totalPage,
      roomName: roomName
    }
    dispatch({
      type: 'pockerBoard/onNavigateToPage',
      payload: values,
    });
  }

  function goToNextPage(evt) {
    let values = {
      curPage: curPage + 1,
      totalPage: totalPage,
      roomName: roomName
    }
    dispatch({
      type: 'pockerBoard/onNavigateToPage',
      payload: values,
    });
  }

  function onResetGame(event) {
    let values = {
      curPage: curPage,
      totalPage: totalPage,
      roomName: roomName
    }
    event.preventDefault();
    dispatch({
      type: 'pockerBoard/onNextGame',
      payload: values
    });
  }

  function openNotification() {
    if (resetFlag) {
      notification.open({
        message: 'A new Game start!',
        description:
          'this is new start!',
        onClick: () => {
          //console.log('Notification Clicked!');
        },
        duration: 1
      });
      dispatch({
        type: "pockerBoard/syncResetflag", payload: {
          resetFlag: !resetFlag
        }
      })
    }
  }

  function onAddStory(formData) {
    let values = {
      curPage: curPage,
      totalPage: totalPage,
      roomName: roomName,
      ...formData
    }
    dispatch({
      type: "pockerBoard/AddStory",
      payload: values
    })
  }

  function backToRoomPage() {
    router.push('/rooms');
  }

  return (
    <Layout style={{ minHeight: "100%", flexFlow: "column nowrap", alignContent: "flex-start" }}>
      <Header className={styles.header}>
        <span className={styles.titile}>{featureName} {internalTaskName}</span>
        <div style={{ float: "right" }} className={styles.toolbar}>
          <Button onClick={(e) => onResetGame(e)} type="primary" style={{ margin: "5px" }}>Reset</Button>
          <RecordCreatorDlg record={scoreList} onOk={createRecordHandler} creator={playerName} featureName={featureName} internalTaskName={internalTaskName}>
            <Button type="primary" style={{ margin: "5px" }}>Commit</Button>
          </RecordCreatorDlg>
          <RoomInfoDlg roomName={roomName} >
            <Button type="primary" style={{ margin: "5px" }}>Info</Button>
          </RoomInfoDlg>
          <Button type="primary" style={{ margin: "5px" }} onClick={backToRoomPage}>Exit</Button>
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
              <svg className={styles.storySwitcherControlsSvg} viewBox="0 0 1792 1792" onClick={goToLastPage}>
                <path d="M1203 544q0 13-10 23l-393 393 393 393q10 10 10 23t-10 23l-50 50q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l466-466q10-10 23-10t23 10l50 50q10 10 10 23z" fill="#fff" />
              </svg>
              <span className={styles.storyCounter}>{curPage + "/" + totalPage}</span>
              <svg className={styles.storySwitcherControlsSvg} viewBox="0 0 1792 1792" onClick={goToNextPage}>
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
            <AddStoryDlg onOk={onAddStory} featureName={featureName}>
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
          <ReactPathManu/>
        </div>
      </Footer>
      {openNotification()}
    </Layout>
  );
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
