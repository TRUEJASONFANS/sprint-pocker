import { Modal, Input, InputNumber, Form } from 'antd';
import { Component } from 'react';
import { connect } from 'dva';
const FormItem = Form.Item;
const { TextArea } = Input;

class AddStoryDlg extends Component {
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

  okHandler = e => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.hideModelHandler();
        console.log("values", values);
        onOk();
      }
    });
  };

  hideModelHandler = e => {
    this.setState({
      visible: false,
    });
  };

  render() {

    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const { children } = this.props;
    return (
      <span>
        <span onClick={this.showModelHandler}>{children}</span>
        <Modal
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form layout={'horizontal'} onSubmit={this.okHandler}>
            <FormItem {...formItemLayout} label="Title">
              {getFieldDecorator('title', {
                 rules: [{ required: true, message: '请输入Title' }]
              })(<TextArea />)}
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}
export default Form.create()(AddStoryDlg);
