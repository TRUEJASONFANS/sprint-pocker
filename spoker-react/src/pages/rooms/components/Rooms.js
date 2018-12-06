import RoomModel from './RoomModel';
import { connect } from 'dva';
import styles from './Rooms.css';
import { routerRedux } from 'dva/router';

import { Table, Pagination, Popconfirm, Button } from 'antd';

function Rooms({ dispatch, roomList: dataSource, loading, total, page: current }) {
  function createHandler(values) {
    dispatch({
      type: 'rooms/create',
      payload: values,
    });
  }

  function pageChangeHandler(page) {
    dispatch(routerRedux.push({
      pathname: '/users',
      query: { page },
    }));
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="">{text}</a>,
    }, 
    {
      title: 'Description',
      dataIndex: 'desc',
      key: 'desc',
      render: text => text
    }
  ];

  return (
    <div>
      <div className={styles.create}>
        <RoomModel record={{}} onOk={createHandler}>
          <Button type="primary">Create Rooms</Button>
        </RoomModel>
      </div>
      <Table
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        rowKey={record => record.id}
        pagination={false}
      />
      <Pagination
        className="ant-table-pagination"
        total={total}
        current={current}
        pageSize={3}
        onChange={pageChangeHandler}
      />
    </div>
  );
}

function mapStateToProps(state) {
  const { list, total, page } = state.rooms;
  return {
    list,
    total,
    page,
    loading: state.loading.models.users,
  };
}
export default connect(mapStateToProps)(Rooms);