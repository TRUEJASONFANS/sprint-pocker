import React, { Component } from "react";
import { Table, Input} from 'antd';
import 'antd/dist/antd.css';
import styles from './dashboard.css';

const { Search } = Input;


class SearchTable extends Component {

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
        var filteredData = dataSource.filter(({ feature, description }) => {
            var flag = false;
            searchText = searchText.toLowerCase();
            if (feature != null) {
                feature = feature.toLowerCase();
                flag = flag || feature.includes(searchText);
            }
            if (description != null) {
                description = description.toLowerCase();
                flag = flag || description.includes(searchText);
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
