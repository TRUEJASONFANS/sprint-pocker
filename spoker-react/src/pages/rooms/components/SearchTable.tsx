import React, { Component } from "react";
import { Table, Input} from 'antd';
import 'antd/dist/antd.css';
import styles from './Rooms.css';

const { Search } = Input;


class SearchTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
          dataSource : props.dataSource
        };
    }

    handleSearch = searchText => {
    var filteredData = this.props.dataSource.filter(({ name, desc }) => {
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
        return  flag
    });
    this.setState({
        dataSource : filteredData
    })
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
                    dataSource={this.state.dataSource}
                    pagination={false}
                />
            </span>
        )
    }
}


export default SearchTable;
