import { Button, Layout } from 'antd';
import styles from './PockerBoard.css';
import { connect } from 'dva';
import { Table } from 'antd';
import RecordCreatorDlg from '@/pages/pockerRoom/components/recordCreatorDlg';
import PokerBoardFooter from './pokerBoardFooter';
import PlayerAreaView from '@/pages/pockerRoom/components/playerAreaView';
const { Header, Footer, Sider, Content } = Layout;

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

  function onClickPockerNumber(num) {

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

  function onNextGame() {
    dispatch({
      type: 'pockerBoard/onNextGame',
      payload: roomName
    });
  }

  return (
    <Layout>
      <Header style={{ background: 'green', margin:'5px'}}>
        <div>
          <div>
            <span>{roomName}</span>
            <div style={{float:"right", padding:"1px"}}>
              <Button className="toolBarBtn" onClick={()=>onNextGame()}>Next</Button>
              <Button className="toolBarBtn">Exit</Button>
            </div>
          </div>
        </div>
      </Header>
      {/* 统计表格       */}
      <Layout>
        <Content className="playerArea" style={{ padding: '0 24px', height: "calc(70vh - 55px)", background:'white'}}>
          <PlayerAreaView usersList={scoreList}/>
        </Content>
        <Sider width={200} style={{ background: '#fff'}}>
          <Button shape="circle" className={styles.one} onClick={() => onClickPockerNumber(1)}>
            1
          </Button>
          <Button shape="circle" onClick={() => onClickPockerNumber('3')}>
            3
          </Button>
          <Button shape="circle" onClick={() => onClickPockerNumber('5')}>
            5
          </Button>
          <Button shape="circle" onClick={() => onClickPockerNumber('8')}>
            8
          </Button>
          <Button shape="circle" onClick={() => onClickPockerNumber('??')}>
            ??
          </Button>
          <RecordCreatorDlg record={scoreList} onOk={createRecordHandler} creator={curUser}>
            <Button>提交</Button>
          </RecordCreatorDlg>
          <Table
            columns={columns}
            dataSource={scoreList}
            rowKey={record => record.playerName}
            pagination={false}
          />
        </Sider>
      </Layout>
      <Footer style={{ textAlign: 'center', minHeight: 100, background:'#fff' }}>
        <PokerBoardFooter cards={cards} okHanlder={onClickPockerNumber}/>
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
