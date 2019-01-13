import { Button } from 'antd';
import styles from './PockerBoard.css';
import { connect } from 'dva';
import {Table} from 'antd';
import RecordCreatorDlg from './recordCreatorDlg';
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
    <div>
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
        <RecordCreatorDlg record = {scoreList} onOk={createRecordHandler} creator={curUser}>
          <Button>提交</Button>
        </RecordCreatorDlg>
      </div>
      {/* 统计表格       */}
      <div>
          <Table
            columns= {columns}
            dataSource = {scoreList}
            rowKey = {record => record.name}
            pagination = {false}
          />
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