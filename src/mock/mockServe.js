//提供随机数据，阻止ajax请求
import Mock from 'mockjs'

//webpack默认对外暴露：图片，json文件
import banner from './banner.json'
import floor from './floor.json'
import address from './address.json'


Mock.mock("/mock/banner",{code:200,data:banner})
Mock.mock("/mock/floor",{code:200,data:floor})
Mock.mock("/mock/user/userAddress/auth/findUserAddressList",{code:200,data:address})