import { Component } from 'react';
import { Modal, Form, Input } from 'antd';

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
        onOk({creator: owner, ...values});
        this.hideModelHandler();
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { name, desc } = this.props.record;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const { children } = this.props;
    return (
      <span>
        <span onClick={this.showModelHandler}>{children}</span>
        <Modal
          title="创建房间"
          visible={this.state.visible}
          onOk={this.okHandler}
          okText = "确认"
          cancelText = "取消"
          onCancel={this.hideModelHandler}
        >
          <Form layout={"horizontal"} onSubmit={this.okHandler}>
            <FormItem {...formItemLayout} label="房间名">
              {getFieldDecorator('name', {
                initialValue: name,
                rules: [{ required: true, message: '请输入房间名称' }],
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="描述">
              {getFieldDecorator('desc', {
                initialValue: desc,
              })(<Input />)}
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}
export default Form.create()(RoomEditModel);
