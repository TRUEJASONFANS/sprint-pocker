import { Modal, Input, InputNumber, Form } from 'antd';
import { Component } from 'react';
import { connect } from 'dva';
const FormItem = Form.Item;
const { TextArea } = Input;

interface Props {
  featureName: String,
}
class AddStoryDlg extends Component<Props, any> {
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
        onOk(values);
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
            <FormItem {...formItemLayout} label="F/I title">
              {getFieldDecorator('title', {
                 rules: [{ required: true, message: '请输入Title' }],
                 initialValue: this.props.featureName,
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="task title">
              {getFieldDecorator('taskTitle', {
                 rules: [{ required: false, message: '请输入internal task title' }],
              })(<Input />)}
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}
export default Form.create()(AddStoryDlg);
