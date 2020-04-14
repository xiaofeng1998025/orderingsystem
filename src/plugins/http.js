import axios from 'axios';
import qs from 'qs'
import router from "../router";
import { Message } from 'element-ui';
// axios.defaults.timeout = 5000;
//axios.defaults.baseURL ='';
//http request 拦截器

/****** request拦截器==>对请求参数做处理 ******/
axios.interceptors.request.use(config => {
   // console.log('数据加载中……')//出现加载中动画

    config.method === 'post'
        ? config.data = qs.stringify({...config.data})
        : config.params = {...config.params};
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    config.headers.token =localStorage.getItem("token");
    //console.log(config);
    return config;
}, error => {  //请求错误处理
   // console.log('error',error)//错误提示
    Promise.reject(error)
});
/****** respone拦截器==>对响应做处理 ******/
axios.interceptors.response.use(
    response => {  //成功请求到数据
       // console.log('加载中动画结束,hide')//数据请求成功,自然加载中动画隐藏
        //这里根据后端提供的数据进行对应的处理
        if(response.data.code==0){
            return response;
        }else{
            //错误提示
            Message.closeAll();
            Message.error({message:response.data.msg});
            return response;
        }
    },
    error => {  //响应错误处理
       // console.log('error',error);
        switch (error.response.status) {
            case 401:
                Message.closeAll();
                Message.error({
                    message:'未登录,请先登录',
                });
                router.push({name:'login'});
                break;
            case 403:
                Message.closeAll();
                Message.error({
                    message:'账号过期,请重新登录',
                });
                router.push({name:'login'});
                break;

        }
        return Promise.reject(error)
    }
);

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url,params={}){
    return new Promise((resolve,reject) => {
        axios.get(url,{
            params:params
        })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err)
            })
    })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url,data = {}){
    return new Promise((resolve,reject) => {
        axios({
            method: 'post',
            url:url,
            data:data
        })
            .then(response => {
                resolve(response.data);
            },err => {
                reject(err)
            })
    })
}

