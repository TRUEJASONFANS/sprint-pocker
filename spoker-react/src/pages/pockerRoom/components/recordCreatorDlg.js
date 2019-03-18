import { Modal, Input, InputNumber, Form } from 'antd';
import { Component } from 'react';
import { connect } from 'dva';
const FormItem = Form.Item;
const { TextArea } = Input;

class RecordCreatorDlg extends Component {
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
    const { onOk, creator } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.hideModelHandler();
        console.log("values", values);
        onOk({
          creator: creator,
          ...values
        });
      }
    });
  };

  hideModelHandler = e => {
    this.setState({
      visible: false,
    });
  };

  render() {
    let estimateAvgVals = 0;
    const estimateVals = this.props.record.map(score => score.fibonacciNum).filter(a => a !== "??");
    console.log("es："+ estimateVals);
    console.log("es_length：" + estimateVals.length);
    console.log("xx:" + estimateVals.map(item => +item).reduce((prev, curv) => prev + curv, 0));
    if (estimateVals.length > 0) {
      estimateAvgVals = estimateVals.map(item => +item).reduce((prev, curv) => prev + curv, 0) / estimateVals.length;
    }
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
            <FormItem {...formItemLayout} label="Ticket number">
              {getFieldDecorator('ticketNum', {
                rules: [{ required: true, message: '请输入ticket number' }],
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Ticket估值">
              {getFieldDecorator('storyPoint', {
                initialValue: estimateAvgVals,
                rules: [{ required: true, message: '请输入ticket 估值' }]
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Title">
              {getFieldDecorator('title', {
                 rules: [{ required: true, message: '请输入Title' }]
              })(<TextArea />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Description">
              {getFieldDecorator('description', {})(<TextArea />)}
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}
export default Form.create()(RecordCreatorDlg);
