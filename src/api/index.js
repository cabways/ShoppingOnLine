//当前模块api统一管理
import requests from "./ajax";
import mockRequests from './mockAjax'


//发请求,真实向后端
export const reqCategoryList = () =>
    requests({
        url: '/product/getBaseCategoryList',
        method: 'get'
    })

//搜索模块
export const reqGetSearchInfo = (params) =>
    requests({
        url: '/list',
        method: 'post',
        data: params
    })

//详情
export const reqGetGoodInfo = (skuid) =>
    requests({
        url: `/item/${skuid}`,
        method: 'get',
    })

//detail模块
export const reqAddOrUpdateShopCard = (skuId, skuNum) =>
    requests({
        url: `/cart/addToCart/${skuId}/${skuNum}`,
        method: 'post',
    });

//购物车列表
export const reqCartList = () =>
    requests({
        url: `/cart/cartList`,
        method: 'get',
    });

//删除购物车中某项商品
export const reqDeleteCartList = (skuId) =>
    requests({
        url: `/cart/deleteCart/${skuId}`,
        method: 'delete',
    });

//切换商品选中状态
export const reqCheckCart = (skuID, isChecked) =>
    requests({
        url: `/cart/checkCart/${skuID}/${isChecked}`,
        method: 'get',
    });
//获取验证码
export const reqGetCode = (phone) =>
    requests({
        url: `/user/passport/sendCode/${phone}`,
        method: 'get',
    });
//注册
export const reqRegister = (data) =>
    requests({
        url: `/user/passport/register`,
        data,
        method: 'post',
    });

//登录
export const reqLogin = (data) =>
    requests({
        url: `/user/passport/login`,
        data,
        method: 'post',
    });
//获取用户信息
export const reqUserInfo = () =>
    requests({
        url: `/user/passport/auth/getUserInfo`,
        method: 'get'
    })
//退出登录
export const reqLogout = () =>
    requests({
        url:`/user/passport/logout`,
        method:'get'
    })

//获取用户地址信息
//务必用老师的账号登录，否则没有
//13700000000 111111
//用个屁，自己mock
export const reqGetUserAddress = () =>
    mockRequests({
        url:`/user/userAddress/auth/findUserAddressList`,
        method:'get'
    })

//获取用户订单信息
export const reqGetUserTrade = () =>
    requests({
        url:`/order/auth/trade`,
        method:'get'
    })

//提交订单
export const reqSubmitTrade = (tradeNo,data) =>
    requests({
        url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
        data,
        method:'post'
    })

//获取订单支付信息
export const reqPayInfo = (orderId) =>
    requests({
        url:`/payment/weixin/createNative/${orderId}`,
        method:'get'
    })
//获取订单支付状态
export const reqPayState = (orderId) =>
    requests({
        url:`/payment/weixin/queryPayStatus/${orderId}`,
        method:'get'
    })

//查看所有订单
export const reqMyOrderList = (page,limit) =>
    requests({
        url:`/order/auth/${page}/${limit}`,
        method:'get'
    })

//发请求,mock虚假
//轮播图数据
export const reqGetbannerList = () =>
    mockRequests({
        url: '/banner',
        method: 'get'
    })

// 轮播图数据
export const reqGetfloorList = () =>
    mockRequests({
        url: '/floor',
        method: 'get'
    })


