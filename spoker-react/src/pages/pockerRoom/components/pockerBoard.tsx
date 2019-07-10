import { Button } from 'antd';
import styles from './PockerBoard.css';
import { connect } from 'dva';
import {Table} from 'antd';
import RecordCreatorDlg from '@/pages/pockerRoom/components/recordCreatorDlg';
import PokerBoardFooter from './pokerBoardFooter';
function PockerBoard({ dispatch, roomName, scoreList, curUser }) {

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key:'name',
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
  const cards = ['?','0', '1','2','3','5','8','13','21'];

  function onClickPockerNumber(num) {
    var values = {
      fibonacciNum: num,
      name: curUser,
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

  return (
    <div>
      <div className={styles.content}>
      <div>
        <div>{roomName}</div>
        <div id="exitRoom"><Button className="ui positive button">Exit</Button></div>
      </div>
      <div>
        <Button shape="circle" className={styles.one} onClick={()=>onClickPockerNumber(1)}>1</Button>
        <Button shape="circle" onClick={()=>onClickPockerNumber("3")}>3</Button>
        <Button shape="circle" onClick={()=>onClickPockerNumber("5")}>5</Button>
        <Button shape="circle" onClick={()=>onClickPockerNumber("8")}>8</Button>
        <Button shape="circle" onClick={()=>onClickPockerNumber("??")}>??</Button>
        <RecordCreatorDlg record={scoreList} onOk={createRecordHandler} creator={curUser}>
          <Button>提交</Button>
        </RecordCreatorDlg>
      </div>
      {/* 统计表格       */}
      <div>
          <Table
            columns={columns}
            dataSource={scoreList}
            rowKey={record => record.name}
            pagination={false}
          />
      </div>
      </div>
      <div className={styles.footer}>
        <PokerBoardFooter cards={cards} onOk={onClickPockerNumber}/>
      </div>
    </div>
  );
}
function mapStateToProps(state) {
  const { roomName, scoreList} = state.pockerBoard;
  const { userName } = state.global;
  const curUser = userName
  return {
    roomName,
    scoreList,
    curUser
  }
}
export default connect(mapStateToProps)(PockerBoard);
