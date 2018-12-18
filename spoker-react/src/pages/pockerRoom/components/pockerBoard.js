import { Button } from 'antd';
import styles from './PockerBoard.css';
import { connect } from 'dva';
import {Table} from 'antd';
function PockerBoard({roomName, userStoryPointLists}) {

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key:'name',
      render: text => text
    },
    {
      title: 'StoryPoint',
      dataIndex: 'storyPoint',
      key: 'storyPoint',
      render: text => text
    }
  ];
  return (
    <div>

      <div>
        <div>{roomName}</div>
        <div id="exitRoom"><Button className="ui positive button">Exit</Button></div>
      </div>
      <div>
        <Button shape="circle" className={styles.one}>1</Button>
        <Button shape="circle">3</Button>
        <Button shape="circle">5</Button>
        <Button shape="circle">8</Button>
        <Button shape="circle">???</Button>
        <Button>提交</Button>
      </div>
      {/* 统计表格       */}
      <div>
          <Table
            columns= {columns}
            dataSource = {userStoryPointLists}
            rowKey = {record => record.id}
            pagination = {false}
          />
      </div>
    </div>
  );
}
function mapStateToProps(state) {
  const { roomName, scoreList } = state.pocketBoard;
  return {
    roomName,
    scoreList
  }
}
export default connect(mapStateToProps)(PockerBoard);