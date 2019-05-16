import React from 'react';

export default class Info extends React.Component{
  render(){
    console.log(this.props)
    return (
      <div>
        Info 测试动态路由功能
        {this.props.match.params.mainId}
      </div>
    )
  }
}