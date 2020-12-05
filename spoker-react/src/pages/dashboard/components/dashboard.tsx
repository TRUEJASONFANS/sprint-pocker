import { DASHBOARD_PAGE_SIZE } from '@/constans';
import { connect } from 'dva';
import { Table, Divider, Pagination, Button, Popconfirm } from 'antd';
import { routerRedux } from 'dva';
import DashboardItemCreator from '@/pages/dashboard/components/dashboardItemCreator';
import SearchTable from './SearchTable'
import styles from '@/pages/dashboard/components/dashboard.css';

function Dashboard({ dispatch, itemList, curPage }) {

    const columns = [
        {
            title: 'Feature',
            dataIndex: 'feature',
            key: 'feature',
            render: text => text,
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: text => text,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: text => text
        },
        {
            title: 'Story point',
            dataIndex: 'storyPoint',
            key: 'storyPoint',
            render: text => text
        },
        {
            title: 'Operation',
            key: 'operation',
            render: (text, record) =>
            (
                <span className={styles.operation}>
                <DashboardItemCreator record={record} onOk={editHandler.bind(null, record.id)}>
                  <a>Edit</a>
                </DashboardItemCreator> 
                <Divider type="vertical" />    
              <Popconfirm title="Sure to delete?" onConfirm={() => deleteHandler(record.id)}>
                <a>Delete</a>
              </Popconfirm>
              </span>
            )
        }  
    ];

    function pageChangeHandler(page) {
        dispatch(routerRedux.push({
            pathname: '/dashboard',
            query: { page },
        }));
    }

    function createHandler(newItem) {
        dispatch({
          type: 'dashboard/create',
          payload: newItem,
        });
      }

    function deleteHandler(id) {
        dispatch({
            type: 'dashboard/deleteOne',
            payload: id,
          });
    }

    function editHandler(id, values) {
        dispatch({
          type: 'dashboard/update',
          payload: values,
        });
      }
    
    return (
        <div>
            <span>
                <DashboardItemCreator record={{}} onOk={createHandler}>
                    <Button type="primary" className={styles.createTicketBtn}>Create tasks</Button>
                </DashboardItemCreator>
            </span>
            <SearchTable 
                columns={columns}
                dataSource={itemList}
                pagination={false}
            />
            <Pagination
                className="ant-table-pagination"
                total={20}
                current={curPage}
                pageSize={DASHBOARD_PAGE_SIZE}
                onChange={pageChangeHandler}
            />
        </div>
    );
}

function mapStateToProps(state) {
    const { itemList, curPage } = state.dashboard;
    return {
        itemList,
        curPage
    }
}

export default connect(mapStateToProps)(Dashboard);
