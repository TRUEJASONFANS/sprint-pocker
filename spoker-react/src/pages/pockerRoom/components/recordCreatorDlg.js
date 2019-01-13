import { Modal, Input, InputNumber, Form } from 'antd';
import { Component } from 'react';
import { connect } from 'dva';
const FormItem = Form.Item;
const { TextArea } = Input;

class RecordCreatorDlg extends Component {
  constructor(props) {
    super(props);
    const estimateVals = this.props.record.map(score => score.fibonacciNum).filter(a => a !== "??");
    this.estimateAvgVals = estimateVals.reduce((prev, curv) => prev + curv, 0) / estimateVals.length;
    console.log("xxx", this.estimateAvgVals);
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
        onOk({
          users: creator,
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
                initialValue: this.estimateAvgVals,
                rules: [{ required: true, message: '请输入ticket 估值' }]
              })(<Input />)}
            </FormItem>
            <div>
              {this.props.creator}
            </div>
            <FormItem {...formItemLayout} label="描述">
              {getFieldDecorator('description', {})(<TextArea />)}
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(RecordCreatorDlg);
