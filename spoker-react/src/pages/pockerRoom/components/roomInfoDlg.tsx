import * as pockerService from '@/pages/pockerRoom/services/pockerService';
import { Descriptions, Modal } from 'antd';
import { Component } from 'react';


export default class RoomInfoDlg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      inviteLink: "",
    };
  }

  componentWillMount() {
    const promise = pockerService.generateInviteLink(this.props.roomName);
    promise.then(value => {
      // success
      if (value.data.statusCode === 2000) {
        this.state.inviteLink = value.data.data.link;
      } else {
        const message = value.data.message;
        console.log(message);
      }
    }, error => {
      // failure
    });
  }

  showModelHandler = e => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
  };

  okHandler = e => {
    this.setState({
      visible: false,
    });
  };

  hideModelHandler = e => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { children } = this.props;
    return (
      <span>
        <span onClick={this.showModelHandler}>{children}</span>
        <Modal
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Descriptions title="Room Info" column = {1}>
            <Descriptions.Item label="Room Name">{this.props.roomName}</Descriptions.Item>
            <Descriptions.Item label="Invite Link">
              <div style={{ overflow: "scroll", width:"380px", height: "120px" }}>{this.state.inviteLink}</div>
            </Descriptions.Item>
          </Descriptions>
        
        </Modal>
      </span>
    );
  }
}
