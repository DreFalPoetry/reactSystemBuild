import JsonP from 'jsonp'
import axios from 'axios';
import { Modal } from 'antd';

export default class Axios{
  static jsonp(options){
    return new Promise((resolve,reject)=>{
      JsonP(options.url,{
        param:'callback'
      },function(err,res){
        if(res.status == 'success'){
          resolve(res)
        }else{
          reject(res.message)
        }
        //todo
      })
    })
  }

  //请求插件的封装
  static ajax(options){
    let baseApi = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api';
    return new Promise((resolve,reject)=>{
        axios({
          url:options.url,
          method:'get',
          baseURL:baseApi,
          timeout:5000,
          params: (options.data &&  options.data.params) || ''
        }).then((res)=>{
          console.log(res)
          if(res.status === 200){
            let json = res.data;
            if(json.code === 0){
              resolve(res.data)
            }else{
              Modal.info({
                title:'提示',
                content:res.msg
              })
            }
          }else{
            reject(res.data)
          }
        })
    })
  }
}