import React, { Component } from "react";
import { Table, Input} from 'antd';
import 'antd/dist/antd.css';
import styles from './Rooms.css';
import { Interface } from 'readline';

const { Search } = Input;

interface Props {
    dataSource: [],
    loading: any,
    columns: []
}
class SearchTable extends Component<Props, any> {

    constructor(props) {
        super(props);
        this.state = {
            searchText : ""
        };
    }

    handleSearch = searchText => {
        
        this.setState({
            searchText: searchText
        })
    }
    
    filterDatasource(searchText, dataSource:[]) {
        var filteredData = dataSource.filter(({ name, desc }) => {
            var flag = false;
            searchText = searchText.toLowerCase();
            if (name != null) {
                name = name.toLowerCase();
                flag = flag || name.includes(searchText);
            }
            if (desc != null) {
                desc = desc.toLowerCase();
                flag = flag || desc.includes(searchText);
            }
            return flag
        });
        return filteredData;
    }

    render() {
        return (
            <span>
                <span className={styles.search}>
                    <Search style={{ width: 500 }} placeholder="Input search text" onSearch={this.handleSearch} enterButton={true} />
                </span>
                <Table
                    loading={this.props.loading}
                    columns={this.props.columns}
                    dataSource={this.filterDatasource(this.state.searchText, this.props.dataSource)}
                    pagination={false}
                    rowKey={record => record.roomNum}
                />
            </span>
        )
    }
}


export default SearchTable;
