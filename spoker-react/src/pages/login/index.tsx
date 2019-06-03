import { connect } from 'dva';
import styles from './login.css';
import {Modal, Input} from 'antd';

function LoginDialog(props) {
  var userName = "";
  function onChangeUserName(e) {
    userName = e.target.value;
  }
  return (
    <div className={styles.normal}>
      <Modal 
        title="请登陆"
        visible = {!props.login}
        onOk={() => {
          props.dispatch({
            type: 'global/onLogin', //该action应该重构为一个异步函数发起网络请求至后台login,然后再触发一个同步action登陆。
            payload: userName //传参数
          });
        }}
        okText = "登陆"
        cancelText = "取消"
      >
      <Input placeholder="用户名"  onChange={onChangeUserName}/>
      </Modal>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    login: state.global.login,
  };
}

export default connect(mapStateToProps)(LoginDialog);