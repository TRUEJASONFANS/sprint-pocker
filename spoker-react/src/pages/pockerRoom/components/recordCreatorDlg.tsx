import { Modal, Input, InputNumber, Form } from 'antd';
import { Component } from 'react';
import { connect } from 'dva';
const FormItem = Form.Item;
const { TextArea } = Input;

interface Props {
  featureName: String,
  internalTaskName: String,
}

class RecordCreatorDlg extends Component<Props,any> {
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
    const estimateVals = this.props.record.map(score => score.fibonacciNum).filter(a => a !== "??" && a!== "?");
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
            <FormItem {...formItemLayout} label="Feature Name">
              {getFieldDecorator('feature', {
                 rules: [{ required: true, message: '请输入feature' }],
                 initialValue: this.props.featureName
              })(<Input disabled/>)}
            </FormItem>
            <FormItem {...formItemLayout} label="Title">
              {getFieldDecorator('title', {
                 rules: [{ required: true, message: '请输入Title' }],
                 initialValue: this.props.internalTaskName
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Story Point">
              {getFieldDecorator('storyPoint', {
                initialValue: estimateAvgVals,
                rules: [{ required: true, message: '请输入ticket 估值' }]
              })(<Input />)}
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
