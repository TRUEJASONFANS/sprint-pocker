import { Menu, Icon } from 'antd';
import Link from 'umi/link';


function Header({ location }) {
  return <Menu selectedKeys={[location.pathname]} mode="horizontal" theme="dark">
    <Menu.Item key="dashboard">
      <Link to="/dashboard">
        <Icon type="home" />
        Ticket面板
        </Link>
    </Menu.Item>
    <Menu.Item key="/showRoom">
      <Link to="/rooms">
        <Icon type="bank" />
        房间
        </Link>
    </Menu.Item>
    <Menu.Item key="logout">
      <a href="http://localhost:8080/logout" rel="noopener noreferrer">
        <Icon type="logout" />登出</a>
    </Menu.Item>
  </Menu>;
}

export default Header;  
