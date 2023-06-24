//引入axios并进行二次封装
import axios from "axios";

//引入进度条nprogress&样式
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

//利用create方法，创建一个axios实例
const requests = axios.create({
    //基础路径，发请求的时候，路径当中会出现api
    baseURL:"/api",
    //请求超时时间为5s
    timeout:5000
})

//请求拦截器，发请求之前可以拦截到，进行相应操作
requests.interceptors.request.use((config)=>{
    //config:配置对象，里面的headers请求头很重要

    if(localStorage.getItem('token')) {
        config.headers.token = localStorage.getItem('token')
    }else {
        config.headers.userTempId = '2452138721'
    }
    //进度条开始
    nprogress.start();
    return config;
})

//响应拦截器
requests.interceptors.response.use(
    //成功的回调，服务器响应数据回来后，可以做一些事情
    (res)=>{

        //进度条结束
        nprogress.done();
        return res.data;
    },
    //错误的回调
    (error)=>{
        return Promise.reject(new error('fail'));
    })




export default requests;