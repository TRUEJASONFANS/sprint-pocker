import { Menu, Icon } from 'antd';
import Link from 'umi/link';

function Header({ location }) {
  return <Menu selectedKeys={[location.pathname]} mode="horizontal" theme="dark">
    <Menu.Item key="dashboard">
      <Link to="/dashboard?page=1">
        <Icon type="home" />
        Ticket面板
        </Link>
    </Menu.Item>
    <Menu.Item key="/showRoom">
      <Link to="/rooms?page=1">
        <Icon type="bank" />
        房间
        </Link>
    </Menu.Item>
  </Menu>;
}

export default Header;
