import { Component } from 'react';
import { Modal, Form, Input } from 'antd';
import * as roomService from '@/pages/rooms/services/roomsService';

const FormItem = Form.Item;

class RoomEditModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModelHandler = e => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
  };

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
        onOk({ creator: owner, ...values });
        this.hideModelHandler();
      }
    });
  };

  validateRoomPassword = (rule, value, callback) => {
    const name = this.props.record.name;
    const roomPassword = value;

    const promise = roomService.checkRoomPassword({name, roomPassword});
    promise.then(value => {
      // success
      if (value.data.statusCode === 2000) {
        callback();

      } else {
        const message = value.data.message;
        console.log(message);
        callback(message);
      }
    }, error => {
      // failure
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
                rules: [{ required: true, message: '请输入房间密码' },
                {
                  validator: this.validateRoomPassword,
                }
                ],
              })(<Input />)}
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}
export default Form.create()(RoomEditModel);
