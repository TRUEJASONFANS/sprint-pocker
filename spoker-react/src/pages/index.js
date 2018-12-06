import { connect } from 'dva';
import Redirect from 'umi/redirect';

function IndexPage({ login }) {
  if (login) {
    return <Redirect to="/rooms"/>;
  } else {
    return <Redirect to="/login" />;
  }
}

function mapStateToProps(state) {
  return {
    login: state.global.hasLogin,
  };
}

export default connect(mapStateToProps)(IndexPage);
