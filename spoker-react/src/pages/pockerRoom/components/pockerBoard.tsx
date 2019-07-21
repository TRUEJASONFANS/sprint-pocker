import { Button, Layout } from 'antd';
import styles from './PockerBoard.css';
import { connect } from 'dva';
import { Table } from 'antd';
import RecordCreatorDlg from '@/pages/pockerRoom/components/recordCreatorDlg';
import PokerBoardFooter from './pokerBoardFooter';
const { Header, Footer, Sider, Content } = Layout;

function PockerBoard({ dispatch, roomName, scoreList, curUser }) {

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      render: text => text
    },
    {
      title: 'StoryPoint',
      dataIndex: 'fibonacciNum',
      key: 'fibonacciNum',
      render: text => text
    }
  ];

  // const cards = ['1'];
  const cards = ['?', '0', '1', '2', '3', '5', '8', '13', '21'];

  function onClickPockerNumber(num) {
    var values = {
      fibonacciNum: num,
      name: curUser,
      roomName: roomName
    }
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

  return (
    <Layout>
      <Header style={{ background: 'green' }}>
        <div style={{ textAlign: 'center' }}>
            <span>{roomName} XXX</span>
            <Button className="ui positive button">Exit</Button>
        </div>
      </Header>
      {/* 统计表格       */}
      <Layout>
        <Content style={{ padding: '0 24px', minHeight: 420 }}>
          <div>w</div>
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
            rowKey={record => record.name}
            pagination={false}
          />
        </Sider>
      </Layout>
      <Footer style={{ textAlign: 'center', minHeight: 100 }}>
        <PokerBoardFooter cards={cards} />
      </Footer>
    </Layout>
  );
}
function mapStateToProps(state) {
  const { roomName, scoreList } = state.pockerBoard;
  const { userName } = state.global;
  const curUser = userName
  return {
    roomName,
    scoreList,
    curUser
  }
}
export default connect(mapStateToProps)(PockerBoard);
