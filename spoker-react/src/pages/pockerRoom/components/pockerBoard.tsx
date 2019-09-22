import { Button, Layout, notification, Table } from 'antd';
import styles from './PockerBoard.css';
import { connect } from 'dva';
import RecordCreatorDlg from '@/pages/pockerRoom/components/recordCreatorDlg';
import PokerBoardFooter from './pokerBoardFooter';
import PlayerAreaView from '@/pages/pockerRoom/components/playerAreaView';
const { Header, Footer, Sider, Content } = Layout;
import React, { useState,useEffect } from 'react';

function PockerBoard({ dispatch, roomName, scoreList, curUser, resetFlag, curPage, totalPage }) {

  const columns = [
    {
      title: '姓名',
      dataIndex: 'playerName',
      key: 'playerName',
      render: text => text
    },
    {
      title: 'StoryPoint',
      dataIndex: 'fibonacciNum',
      key: 'fibonacciNum',
      render: (text,record) =>  {if (record.shown)  return text; else return "**";} 
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
  function changeColor(evt) {
    // console.log("hello svg"+ evt); 
  }

  function onResetGame(event) {
    event.preventDefault();
    dispatch({
      type: 'pockerBoard/onNextGame',
      payload: roomName
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
        duration: 2
      });
      dispatch({type:"pockerBoard/syncResetflag", payload: {
        resetFlag: !resetFlag
      }})
    }
  }

  function onAddStory() {
    let values = {
      curPage : curPage,
      totalPage : totalPage,
      roomName: roomName
    }
    dispatch({
      type: "pockerBoard/AddStory", 
      payload: values
    })
  }

  return (
    <Layout style={{background:'white'}}>
      <Header className={styles.header}>
        <span className={styles.titile}>{roomName}</span>
        <div style={{ float: "right"}} className={styles.toolbar}>
          <Button onClick={(e) => onResetGame(e)} type="primary" style={{ margin: "5px" }}>Reset</Button>
          <RecordCreatorDlg record={scoreList} onOk={createRecordHandler} creator={curUser} >
            <Button type="primary" style={{ margin: "5px" }}>Commit</Button>
          </RecordCreatorDlg>
          <Button type="primary" style={{ margin: "5px" }}>Exit</Button>
        </div>
      </Header>
      {/* 统计表格       */}
      <Layout>
        <Content className={styles.content} >
          <PlayerAreaView usersList={scoreList}/>
        </Content>
        <Sider style={{ background: '#fff'}}>
          <div className={styles.storySwitcher}>
            <span>STORY #</span>
            <div className={styles.storySwitcherControls}>
              <svg className={styles.storySwitcherControlsSvg} viewBox="0 0 1792 1792" onClick={changeColor}>
                <path d="M1203 544q0 13-10 23l-393 393 393 393q10 10 10 23t-10 23l-50 50q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l466-466q10-10 23-10t23 10l50 50q10 10 10 23z" fill="#fff" />             
              </svg>
              <span className={styles.storyCounter}>{curPage + "/" + totalPage}</span>
              <svg className={styles.storySwitcherControlsSvg}  viewBox="0 0 1792 1792">
                <path d="M1171 960q0 13-10 23l-466 466q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l393-393-393-393q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l466 466q10 10 10 23z" fill="#fff"/>
              </svg>
            </div>
          </div>
          <Table
            columns={columns}
            dataSource={scoreList}
            rowKey={record => record.playerName}
            pagination={false}
          />
          <div className={styles.addStoryBtn}>
            <Button type="primary" style={{ margin: "5px" }} size={"small"} onClick={onAddStory}>Add a internal task</Button>
          </div>
        </Sider>
      </Layout>
      <Footer className={styles.footer}>
        <PokerBoardFooter cards={cards} dispatch={dispatch} roomName={roomName} curUser={curUser} resetFlag={resetFlag} curPage={curPage}/>
      </Footer>
      {openNotification()}
    </Layout>
  );
}
function mapStateToProps(state) {
  const { roomName, scoreList, resetFlag, curPage, totalPage} = state.pockerBoard;
  const { curUser } = state.global;
  return {
    roomName,
    scoreList,
    curUser,
    resetFlag,
    curPage,
    totalPage
  }
}
export default connect(mapStateToProps)(PockerBoard);
