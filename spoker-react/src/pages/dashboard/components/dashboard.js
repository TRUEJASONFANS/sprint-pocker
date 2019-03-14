import { DASHBOARD_PAGE_SIZE } from '../../constants';
import { connect } from 'dva';
import { Table, Pagination } from 'antd';
import { routerRedux } from 'dva/router';
function Dashboard({ dispatch, itemList, curPage }) {

    const columns = [
        {
            title: 'Ticket number',
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

      
    return (
        <div>
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