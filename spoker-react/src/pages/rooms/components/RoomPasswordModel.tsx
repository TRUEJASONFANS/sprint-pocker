import { Component } from 'react';
import { Modal, Form, Input } from 'antd';
import * as roomService from '@/pages/rooms/services/roomsService';

const FormItem = Form.Item;

class RoomEditModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      passWordValidateMsg: "",
    };
  }

  showModelHandler = e => {
    const name = this.props.record.name;
    const roomPassword = "";    
    const {onOk} = this.props;
    const promise = roomService.checkRoomPassword({name, roomPassword});
    promise.then(value => {
      if (value.data.statusCode === 2000) {
        onOk({});
      } else {
        if (e) e.stopPropagation();
        this.setState({
          visible: true,
        });
      }
  });
}

  hideModelHandler = e => {
    this.setState({
      visible: false,
    });
  };

  okHandler = e => {
    const { onOk, owner } = this.props;
    console.log(owner);
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const name = this.props.record.name;
        const roomPassword = values.roomPassword;    
        const promise = roomService.checkRoomPassword({name, roomPassword});
        Promise.all([promise]).then(value => {
          if (value[0].data.statusCode === 2000) {
            onOk({ creator: owner, ...values });
            this.hideModelHandler();
          } else {
            const message = value[0].data.message;
            this.setState({
              visible: true,
              passWordValidateMsg: message
            });
            console.log(message);
          }
        });
      }
    });
  };


  render() {
    const { getFieldDecorator } = this.props.form;
    const { name, desc, roomPassword } = this.props.record;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const { children } = this.props;
    return (
      <span>
        <span onClick={this.showModelHandler}>{children}</span>
        <Modal
          title="请输入房间密码"
          visible={this.state.visible}
          onOk={this.okHandler}
          okText = "确认"
          cancelText = "取消"
          onCancel={this.hideModelHandler}
        >
          <Form layout={"horizontal"} onSubmit={this.okHandler}>
            <FormItem {...formItemLayout} label="房间密码">
              {getFieldDecorator('roomPassword', {
                initialValue: roomPassword,
                rules: [{ required: true, message: '请输入房间密码'}
                ],
              })(<Input.Password />)}
            </FormItem>
          </Form>
          <label style={{ margin: "45px" }} ><font size="4" face="arial" color="red">{this.state.passWordValidateMsg}</font>
          </label>
        </Modal>
      </span>
    );
  }
}
export default Form.create()(RoomEditModel);
