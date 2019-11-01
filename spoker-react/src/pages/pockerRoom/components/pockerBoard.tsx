import { Button, Layout, notification, Table, Collapse, Input } from 'antd';
import styles from './PockerBoard.css';
import { connect } from 'dva';
import RecordCreatorDlg from '@/pages/pockerRoom/components/recordCreatorDlg';
import PokerBoardFooter from './pokerBoardFooter';
import PlayerAreaView from '@/pages/pockerRoom/components/playerAreaView';
import AddStoryDlg from '@/pages/pockerRoom/components/addStoryDlg';
const { Header, Footer, Sider, Content } = Layout;
import React, { useState,useEffect } from 'react';
import router from 'umi/router';
import * as pockerService from '@/pages/pockerRoom/services/pockerService';

function PockerBoard({ dispatch, roomName, scoreList, playerName, resetFlag, curPage, totalPage, clickedNum, featureName, internalTaskName}) {

  const [inviteLink, setInviteLink] = useState(null);

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

  function generateInviteLink() {
    const promise = pockerService.generateInviteLink(roomName);
    promise.then(value => {
      // success
      if (value.data.statusCode === 2000) {
        const link = value.data.data.link;
        setInviteLink(link);
      } else {
        const message = value.data.message;
        console.log(message);
      }
    }, error => {
      // failure
    });

  }

  //svg click event
  function goToLastPage(evt) {
    let values = {
      curPage : curPage - 1,
      totalPage : totalPage,
      roomName: roomName
    }
    dispatch({
      type: 'pockerBoard/onNavigateToPage',
      payload: values,
    });
  }

  function goToNextPage(evt) {
    let values = {
      curPage : curPage + 1,
      totalPage : totalPage,
      roomName: roomName
    }
    dispatch({
      type: 'pockerBoard/onNavigateToPage',
      payload: values,
    });
  }

  function onResetGame(event) {
    let values = {
      curPage : curPage ,
      totalPage : totalPage,
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
        duration: 2
      });
      dispatch({type:"pockerBoard/syncResetflag", payload: {
        resetFlag: !resetFlag
      }})
    }
  }

  function onAddStory(formData) {
    let values = {
      curPage : curPage,
      totalPage : totalPage,
      roomName: roomName,
      ...formData
    }
    console.log("Add a story:" + values);
    dispatch({
      type: "pockerBoard/AddStory", 
      payload: values
    })
  }

  function backToRoomPage() {
    router.push('/rooms');
  }

  return (
    <Layout style={{background:'white'}}>
      <Header className={styles.header}>
        <span className={styles.titile}>{featureName} {internalTaskName}</span>
        <div style={{ float: "right"}} className={styles.toolbar}>
          <Button onClick={(e) => onResetGame(e)} type="primary" style={{ margin: "5px" }}>Reset</Button>
          <RecordCreatorDlg record={scoreList} onOk={createRecordHandler} creator={playerName} featureName={featureName} internalTaskName={internalTaskName}>
            <Button type="primary" style={{ margin: "5px" }}>Commit</Button>
          </RecordCreatorDlg>
          <Button type="primary" style={{ margin: "5px" }} onClick={backToRoomPage}>Exit</Button>
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
              <svg className={styles.storySwitcherControlsSvg} viewBox="0 0 1792 1792" onClick={goToLastPage}>
                <path d="M1203 544q0 13-10 23l-393 393 393 393q10 10 10 23t-10 23l-50 50q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l466-466q10-10 23-10t23 10l50 50q10 10 10 23z" fill="#fff" />             
              </svg>
              <span className={styles.storyCounter}>{curPage + "/" + totalPage}</span>
              <svg className={styles.storySwitcherControlsSvg}  viewBox="0 0 1792 1792" onClick={goToNextPage}>
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
            <AddStoryDlg onOk={onAddStory} featureName={featureName}>
              <Button type="primary" style={{ margin: "5px" }} size={"small"}>Add a internal task</Button>
            </AddStoryDlg>
          </div>
          <Collapse defaultActiveKey={[]} onChange={generateInviteLink}>
            <Collapse.Panel header="Invite link" key="1" >
              <div style={{ overflow:"scroll"}}>{inviteLink}}</div>
            </Collapse.Panel>
          </Collapse>
        </Sider>
      </Layout>
      <Footer className={styles.footer}>
        <PokerBoardFooter cards={cards} dispatch={dispatch} roomName={roomName} curUser={playerName} resetFlag={resetFlag} curPage={curPage} clickedNum={clickedNum}/>
      </Footer>
      {openNotification()}
    </Layout>
  );
}
function mapStateToProps(state) {
  const { roomName, scoreList, resetFlag, curPage, totalPage, clickedNum, playerName, featureName, internalTaskName} = state.pockerBoard;
  return {
    roomName,
    scoreList,
    playerName,
    resetFlag,
    curPage,
    totalPage,
    clickedNum,
    featureName,
    internalTaskName
  }
}
export default connect(mapStateToProps)(PockerBoard);
