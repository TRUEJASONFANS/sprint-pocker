import { Component } from "react";
import { Modal, Form, Input } from 'antd';
const FormItem = Form.Item;

class DashboardItemCreator extends Component {

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
        // children should be the hooked button.
        const { getFieldDecorator } = this.props.form;
        const { children } = this.props;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
          };
        return (
            <span>
                <span onClick={this.showModelHandler}>{children}</span>
                <Modal
                    title="创建Ticket Note"
                    visible={this.state.visible}
                    onOk={this.okHandler}
                    okText="确认"
                    cancelText="取消"
                    onCancel={this.hideModelHandler}
                >
                    <Form layout={"horizontal"} onSubmit={this.okHandler}>
                        <FormItem {...formItemLayout} label="Ticket Number">
                            {getFieldDecorator('ticketNum', {
                                rules: [{ required: true, message: '请输入Ticket Number' }],
                            })(<Input />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="Title">
                            {getFieldDecorator('title', {})(<Input />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="Description">
                            {getFieldDecorator('desc', {})(<Input />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="Story Point">
                            {getFieldDecorator('storyPoint', {})(<Input />)}
                        </FormItem>
                    </Form>
                </Modal>
            </span>
        );
    }
}
export default Form.create()(DashboardItemCreator);