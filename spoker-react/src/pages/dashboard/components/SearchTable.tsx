import React, { Component } from "react";
import { Table, Input} from 'antd';
import 'antd/dist/antd.css';
import styles from './dashboard.css';

const { Search } = Input;


class SearchTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
          dataSource : props.dataSource
        };
    }

 
    handleSearch = searchText => {
      var filteredData = this.props.dataSource.filter(({feature, title, description, storyPoint }) => {
        var flag = false;
        searchText = searchText.toLowerCase();
        if (feature != null) {
            feature = feature.toLowerCase();
            flag = flag || feature.includes(searchText);
        }
        if (title != null) {
            title = title.toLowerCase();
            flag = flag || title.includes(searchText);
        }
        if (description != null) {
            description = description.toLowerCase();
            flag = flag || description.includes(searchText);
        }
        if (storyPoint != null) {
            storyPoint = storyPoint.toString().toLowerCase();
            flag = flag || storyPoint.includes(searchText)
        }
        return flag;
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
                    columns={this.props.columns}
                    dataSource={this.state.dataSource}
                    pagination={false}
                />
            </span>
        )
    }
}


export default SearchTable;
