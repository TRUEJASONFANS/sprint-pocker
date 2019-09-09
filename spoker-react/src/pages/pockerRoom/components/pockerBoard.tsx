import { Button, Layout, notification } from 'antd';
import styles from './PockerBoard.css';
import { connect } from 'dva';
import { Table } from 'antd';
import RecordCreatorDlg from '@/pages/pockerRoom/components/recordCreatorDlg';
import PokerBoardFooter from './pokerBoardFooter';
import PlayerAreaView from '@/pages/pockerRoom/components/playerAreaView';
const { Header, Footer, Sider, Content } = Layout;
import React, { useState } from 'react';

function PockerBoard({ dispatch, roomName, scoreList, curUser }) {

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

  function onClickPockerNumber(num:string, index:number) {
    setClickedIndex(index);
    let flag;
    if(num=='?') {
      flag = false;
    } else {
      flag = true;
    }
    var values = {
      fibonacciNum: num,
      palyerName: curUser,
      clicked: flag,
      roomName: roomName
    }
    console.log("click values:" + values);
    dispatch({
      type: 'pockerBoard/onClickPocker',
      payload: values
    });
  }

  function createRecordHandler(tickerRecord) {
    dispatch({
      type: 'pockerBoard/addTicketRecord',
      payload: tickerRecord,
    });
  }

  // using hook instead of state to trigger the render update.
  const [clickedIndex, setClickedIndex] = useState(-1);

  function onNextGame(event) {
    event.preventDefault();
    dispatch({
      type: 'pockerBoard/onNextGame',
      payload: roomName
    });
    setClickedIndex(-1);
    notification.open({
      message: 'A new Game start!',
      description:
        'this is new start!',
      onClick: () => {
        console.log('Notification Clicked!');
      },
      duration: 2
    });
  }

  return (
    <Layout>
      <Header className={styles.header}>
        <span className={styles.titile}>{roomName}</span>
        <div style={{ float: "right"}} className={styles.toolbar}>
          <Button onClick={(e) => onNextGame(e)} type="primary" style={{ margin: "5px" }}>Next</Button>
          <RecordCreatorDlg record={scoreList} onOk={createRecordHandler} creator={curUser} >
            <Button type="primary" style={{ margin: "5px" }}>Commit</Button>
          </RecordCreatorDlg>
          <Button type="primary" style={{ margin: "5px" }}>Exit</Button>
        </div>
      </Header>
      {/* 统计表格       */}
      <Layout>
        <Content className="playerArea" style={{ padding: '0 24px', height: "calc(70vh - 55px)", background:'white'}}>
          <PlayerAreaView usersList={scoreList}/>
        </Content>
        <Sider width={200} style={{ background: '#fff'}}>
          <Table
            columns={columns}
            dataSource={scoreList}
            rowKey={record => record.playerName}
            pagination={false}
          />
        </Sider>
      </Layout>
      <Footer style={{ textAlign: 'center', minHeight: 100, background:'#fff' }}>
        <PokerBoardFooter cards={cards} okHanlder={onClickPockerNumber}  clickedIndexProp={clickedIndex}/>
      </Footer>
    </Layout>
  );
}
function mapStateToProps(state) {
  const { roomName, scoreList } = state.pockerBoard;
  const { userName } = state.global;
  const curUser = userName;
  console.log(scoreList);
  return {
    roomName,
    scoreList,
    curUser
  }
}
export default connect(mapStateToProps)(PockerBoard);
