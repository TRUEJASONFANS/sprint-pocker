import { Button } from 'antd';
import styles from './PockerBoard.css';
import { connect } from 'dva';

function PockerBoard() {

  return (
    <div>

      <div>
        <div>XXX</div>
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