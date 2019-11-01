import RoomModel from '@/pages/rooms/components/RoomModel';
import RoomPasswordModel from '@/pages/rooms/components/RoomPasswordModel';
import { connect } from 'dva';
import styles from './Rooms.css';
import { routerRedux } from 'dva/router';
import { Table, Pagination, Button } from 'antd';
import { ROOM_PAGE_SIZE } from '@/pages/constants';
import SearchTable from './SearchTable';

function Rooms({ dispatch, list: dataSource, loading, total, page: current, userName }) {
  function createHandler(values) {
    dispatch({
      type: 'rooms/create',
      payload: values,
    });
  }

  function pageChangeHandler(page) {
    dispatch(routerRedux.push({
      pathname: '/rooms',
      query: { page },
    }));
  }

  function joinRoom(roomNum) {
    return () => dispatch(routerRedux.push(`/pockerRoom/${roomNum}`));
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',   
      render: text => <RoomPasswordModel owner={userName} record={{name: text, roomPassword:""}} onOk={joinRoom(text)}> <a>{text}</a> </RoomPasswordModel>,
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
      <span className={styles.create}>
        <RoomModel owner={userName} record={{}} onOk={createHandler}>
          <Button type="primary" className={styles.createRoomBtn}>Create Rooms</Button>
        </RoomModel>
      </span>
      <SearchTable 
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        pagination={false}
      />
      <Pagination
        className="ant-table-pagination"
        total={total}
        current={current}
        pageSize={ROOM_PAGE_SIZE}
        onChange={pageChangeHandler}
      />
    </div>
  );
}

function mapStateToProps(state) {
  const { list, total, page } = state.rooms;
  const { userName } = state.global;
  return {
    list,
    total,
    page,
    loading: state.loading.models.users,
    userName
  };
}
export default connect(mapStateToProps)(Rooms);
