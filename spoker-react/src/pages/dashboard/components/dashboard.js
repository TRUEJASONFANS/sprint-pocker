import { DASHBOARD_PAGE_SIZE } from '../../constants';
import { connect } from 'dva';
import { Table, Pagination, Button} from 'antd';
import { routerRedux } from 'dva/router';
import DashboardItemCreator from './dashboardItemCreator';
function Dashboard({ dispatch, itemList, curPage }) {

    const columns = [
        {
            title: 'Ticket Number',
            dataIndex: 'ticketNum',
            key: 'ticketNum',
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
            dataIndex: 'desc',
            key: 'desc',
            render: text => text
        },
        {
            title: 'Story point',
            dataIndex: 'storyPoint',
            key: 'storyPoint',
            render: text => text
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

    return (
        <div>
            <div>
                <DashboardItemCreator onOk={createHandler}>
                    <Button type="primary">Create tickets</Button>
                </DashboardItemCreator>
            </div>
            <Table
                columns={columns}
                dataSource={itemList}
                rowKey={record => record.ticketNum}
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