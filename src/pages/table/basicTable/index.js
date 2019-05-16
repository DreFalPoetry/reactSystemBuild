import React from 'react';
import {
  Card,
  Table
} from 'antd'
import axios from '../../../axios/index';
import  Utils  from '../../../utils/utils';

export default class BasicTable extends React.Component {

  state = {
    dataSource2:[],
    pagination:{}
  }

  params = {
    page:1
  }

  componentDidMount(){
    this.request()
  }

  //动态获取mock数据
  request = () => {
    let self = this;
    axios.ajax({url:'/table/list',data:{
     params:{
       page:self.params.page
     } 
    }}).then((res)=>{
      console.log(res);
      if(res.code === 0){
        this.setState({
          dataSource2:res.result.list,
          pagination:Utils.pagination(res,(current)=>{
            //todo
            self.params.page = current
            self.request()
          })
        })
      }
    })
  }

  render() {
    const columns = [{
        title: 'id',
        key: 'id',
        dataIndex: 'id'
      },
      {
        title: '用户名',
        key: 'userName',
        dataIndex: 'userName'
      },
      {
        title: '性别',
        key: 'sex',
        dataIndex: 'sex',
        render(sex) {
          return sex == 1 ? '男' : '女'
        }
      },
      {
        title: '状态',
        key: 'state',
        dataIndex: 'state',
        render(state) {
          let config = {
            '1': '咸鱼一条',
            '2': '风华浪子',
            '3': '北大才子',
            '4': '百度FE',
            '5': '创业者'
          }
          return config[state];
        }
      },
      {
        title: '爱好',
        key: 'interest',
        dataIndex: 'interest',
        render(abc) {
          let config = {
            '1': '游泳',
            '2': '打篮球',
            '3': '踢足球',
            '4': '跑步',
            '5': '爬山',
            '6': '骑行',
            '7': '桌球',
            '8': '麦霸'
          }
          return config[abc];
        }
      },
      {
        title: '生日',
        key: 'birthday',
        dataIndex: 'birthday'
      },
      {
        title: '地址',
        key: 'address',
        dataIndex: 'address'
      },
      {
        title: '早起时间',
        key: 'time',
        dataIndex: 'time'
      }
    ];
    
    return (
      <Card title="动态数据渲染表格-Mock" style={{margin:'10px 0'}}>
        <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={this.state.pagination}
            rowKey="id"
        />
      </Card>
    )
  }
}