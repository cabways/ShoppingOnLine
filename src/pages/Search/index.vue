<template>
    <div>
        <TypeNav></TypeNav>
        <div class="main">
            <div class="py-container">
                <!--bread-->
                <div class="bread">
                    <ul class="fl sui-breadcrumb">
                        <li>
                            <a href="#">全部结果</a>
                        </li>
                    </ul>
                    <ul class="fl sui-tag">
<!--                        分类面包-->
                        <li class="with-x" v-if="this.searchParams.categoryname">{{this.searchParams.categoryname}}<i @click="deleteCategoty">×</i></li>
<!--                       关键字面包-->
                        <li class="with-x" v-if="this.searchParams.keyword">{{this.searchParams.keyword}}<i @click="deleteKeyword">×</i></li>
<!--                        品牌面包-->
                        <li class="with-x" v-if="this.searchParams.trademark">{{this.searchParams.trademark.split(":")[1]}}<i @click="deleteTrademark">×</i></li>
<!--                        配置面包-->
                        <li class="with-x" v-for="(prop,index) in this.searchParams.props" :key="index">{{prop.split(":")[1]}}<i @click="deleteDisposition(index)">×</i></li>
                    </ul>
                </div>

                <!--selector-->
                <SearchSelector @trademarkInfo="trademarkInfo" @disposition="disposition"></SearchSelector>

                <!--details-->
                <div class="details clearfix">
                    <div class="sui-navbar">
                        <div class="navbar-inner filter">
<!--                            排序的结构-->
                            <ul class="sui-nav">
                                <li :class="{active:isOne}" @click="changeOrder('1')">
                                    <a>综合 <span v-show="isOne">{{isOrder?'⬆':'⬇'}}</span></a>
                                </li>
                                <li :class="{active:isTwo}" @click="changeOrder('2')">
                                    <a>价格 <span v-show="isTwo">{{isOrder?'⬆':'⬇'}}</span></a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!--          商品-->
                    <div class="goods-list">
                        <ul class="yui3-g">
                            <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                                <div class="list-wrap">
                                    <div class="p-img">
                                        <router-link :to="`/detail/${good.id}`">
                                            <img v-lazy="good.defaultImg" />
                                        </router-link>
                                    </div>
                                    <div class="price">
                                        <strong>
                                            <em>¥</em>
                                            <i>&nbsp;{{good.price}}</i>
                                        </strong>
                                    </div>
                                    <div class="attr">
                                        <a
                                                target="_blank"
                                                href="item.html"
                                                title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                                        >{{good.title}}</a>
                                    </div>
                                    <div class="commit">
                                        <i class="command">已有<span>2000</span>人评价</i>
                                    </div>
                                    <div class="operate">
                                        <a href="success-cart.html" target="_blank"
                                           class="sui-btn btn-bordered btn-danger">加入购物车</a>
                                        <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

<!--                    分页器-->
                    <Pagination
                            :pageNo="searchParams.pageNo"
                            :pageSize="searchParams.pageSize"
                            :total="total"
                            :continuous="5"
                            @selectPage="selectPage"
                    ></Pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import SearchSelector from './SearchSelector/SearchSelector'
    import {mapGetters} from "vuex";

    export default {
        name: 'Search',
        data() {
            return {
                //带给服务器的参数
                searchParams: {
                    //一级ID
                    category1id: "",
                    //二级ID
                    category2id: "",
                    //三级ID
                    category3id: "",
                    //分类名字
                    categoryname: "",
                    //关键字
                    keyword: "",
                    //排序，初始应该为综合降序
                    order: "1:asc",
                    //第几页
                    pageNo: 1,
                    // 每一个展示数据个数
                    pageSize: 5,
                    // 售卖属性带的参数
                    props: [],
                    //品牌
                    trademark: ""
                }
            }
        },
        components: {
            SearchSelector
        },
        beforeMount() {
            //发请求前整理参数
            //复杂写法
            // this.searchParams.category1id = this.$route.query.category1id
            // this.searchParams.category2id = this.$route.query.category2id
            // this.searchParams.category3id = this.$route.query.category3id
            // this.searchParams.categoryname = this.$route.query.categoryname
            // this.searchParams.keyword = this.$route.params.keyword
            //es6简单写法
            Object.assign(this.searchParams,this.$route.query,this.$route.params)
        },
        computed: {
            total(){
                return this.$store.getters.total
            },
            ...mapGetters(['goodsList']),
            //判断是否展示
            isOne(){
                return this.searchParams.order.indexOf("1") !== -1
            },
            isTwo(){
                return this.searchParams.order.indexOf("2") !== -1
            },
            //判断箭头展示方向
            isOrder(){
                return this.searchParams.order.indexOf("acs") !== -1
            }
        },
        mounted() {
            this.getData()
        },
        methods: {
            getData() {
                this.$store.dispatch('getSearchList', this.searchParams)
            },
            //删除分类名字
            deleteCategoty(){
                //undefind不会被发送给服务器
                this.searchParams.categoryname = undefined
                this.searchParams.category1id = undefined
                this.searchParams.category2id = undefined
                this.searchParams.category3id = undefined
                this.getData()
                //如果有params参数，不能删除
                if(this.$route.params){
                    this.$router.push({name: 'search',params:this.$route.params})
                }
            },
            //删除关键字
            deleteKeyword(){
                this.searchParams.keyword = undefined
                this.getData()
                //如果有query参数，不能删除
                if(this.$route.query){
                    this.$router.push({name: 'search',query:this.$route.query})
                }
                //清楚搜索框中的关键字
                this.$bus.$emit('clear')
            },
            //品牌信息
            trademarkInfo(trademark){
                //整理数据
                this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
                //再次发送请求
                this.getData()
            },
            //删除品牌信息
            deleteTrademark(){
                this.searchParams.trademark = undefined
                this.getData()
                console.log(this.searchParams.trademark)
                //如果有参数，不能删除
                if(this.$route.query||this.$route.params){
                    this.$router.push({name: 'search',query:this.$route.query,params:this.$route.params})
                }
            },
            //配置信息
            disposition(attr,attrValue){
                //整理数据并保存
                const prop = `${attr.attrId}:${attrValue}:${attr.attrName}`
                //判断配饰是否已经请求过了
                if(this.searchParams.props.indexOf(prop)===-1)this.searchParams.props.push(prop)
                //再次发送请求
                this.getData()
            },
            //删除配置信息
            deleteDisposition(index){
                //从index处删除一个
                this.searchParams.props.splice(index,1)
                //再次获取数据
                this.getData()
            },
            //配置排序信息
            changeOrder(num){
                //判断点击与现有是否一致
                if(this.searchParams.order.split(':')[0]===num){
                    //若一致，更改箭头方向
                    this.searchParams.order=num+':'+(this.searchParams.order.split(':')[1]==='acs'?'decs':'acs')
                }else{
                    //不一致，更改选定
                    this.searchParams.order=num +':' +(this.searchParams.order.split(':')[1])
                }
                this.getData()
            },
            //切换页数
            selectPage(num){
                this.searchParams.pageNo = num
                this.getData()
            }
        },
        watch:{
            $route(){
                //路由发生变化是，再次整理数据
                Object.assign(this.searchParams,this.$route.query,this.$route.params)
                //发送给服务器
                this.getData()
                this.searchParams.category1id = undefined
                this.searchParams.category2id = undefined
                this.searchParams.category3id = undefined

            }
        }
    }
</script>

<style scoped>
    .main {
        margin: 10px 0;
    }

    .main .py-container {
        width: 1200px;
        margin: 0 auto;
    }

    .main .py-container .bread {
        margin-bottom: 5px;
        overflow: hidden;
    }

    .main .py-container .bread .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;
    }

    .main .py-container .bread .sui-breadcrumb li {
        display: inline-block;
        line-height: 18px;
    }

    .main .py-container .bread .sui-breadcrumb li a {
        color: #666;
        text-decoration: none;
    }

    .main .py-container .bread .sui-breadcrumb li a:hover {
        color: #4cb9fc;
    }

    .main .py-container .bread .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;
    }

    .main .py-container .bread .sui-tag .with-x {
        font-size: 12px;
        margin: 0 5px 5px 0;
        display: inline-block;
        overflow: hidden;
        color: #000;
        background: #f7f7f7;
        padding: 0 7px;
        height: 20px;
        line-height: 20px;
        border: 1px solid #dedede;
        white-space: nowrap;
        transition: color 400ms;
        cursor: pointer;
    }

    .main .py-container .bread .sui-tag .with-x i {
        margin-left: 10px;
        cursor: pointer;
        font: 400 14px tahoma;
        display: inline-block;
        height: 100%;
        vertical-align: middle;
    }

    .main .py-container .bread .sui-tag .with-x:hover {
        color: #28a3ef;
    }

    .main .py-container .details {
        margin-bottom: 5px;
    }

    .main .py-container .details .sui-navbar {
        overflow: visible;
        margin-bottom: 0;
    }

    .main .py-container .details .sui-navbar .filter {
        min-height: 40px;
        padding-right: 20px;
        background: #fbfbfb;
        border: 1px solid #e2e2e2;
        padding-left: 0;
        border-radius: 0;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
    }

    .main .py-container .details .sui-navbar .filter .sui-nav {
        position: relative;
        left: 0;
        display: block;
        float: left;
        margin: 0 10px 0 0;
    }

    .main .py-container .details .sui-navbar .filter .sui-nav li {
        float: left;
        line-height: 18px;
    }

    .main .py-container .details .sui-navbar .filter .sui-nav li a {
        display: block;
        cursor: pointer;
        padding: 11px 15px;
        color: #777;
        text-decoration: none;
    }

    .main .py-container .details .sui-navbar .filter .sui-nav li.active a {
        background: #e1251b;
        color: #fff;
    }

    .main .py-container .details .goods-list {
        margin: 20px 0;
    }

    .main .py-container .details .goods-list ul {
        display: flex;
        flex-wrap: wrap;
    }

    .main .py-container .details .goods-list ul li {
        height: 100%;
        width: 20%;
        margin-top: 10px;
        line-height: 28px;
    }

    .main .py-container .details .goods-list ul li .list-wrap .p-img {
        padding-left: 15px;
        width: 215px;
        height: 255px;
    }

    .main .py-container .details .goods-list ul li .list-wrap .p-img a {
        color: #666;
    }

    .main .py-container .details .goods-list ul li .list-wrap .p-img a img {
        max-width: 100%;
        height: auto;
        vertical-align: middle;
    }

    .main .py-container .details .goods-list ul li .list-wrap .price {
        padding-left: 15px;
        font-size: 18px;
        color: #c81623;
    }

    .main .py-container .details .goods-list ul li .list-wrap .price strong {
        font-weight: 700;
    }

    .main .py-container .details .goods-list ul li .list-wrap .price strong i {
        margin-left: -5px;
    }

    .main .py-container .details .goods-list ul li .list-wrap .attr {
        padding-left: 15px;
        width: 85%;
        overflow: hidden;
        margin-bottom: 8px;
        min-height: 38px;
        cursor: pointer;
        line-height: 1.8;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }

    .main .py-container .details .goods-list ul li .list-wrap .attr a {
        color: #333;
        text-decoration: none;
    }

    .main .py-container .details .goods-list ul li .list-wrap .commit {
        padding-left: 15px;
        height: 22px;
        font-size: 13px;
        color: #a7a7a7;
    }

    .main .py-container .details .goods-list ul li .list-wrap .commit span {
        font-weight: 700;
        color: #646fb0;
    }

    .main .py-container .details .goods-list ul li .list-wrap .operate {
        padding: 12px 15px;
    }

    .main .py-container .details .goods-list ul li .list-wrap .operate .sui-btn {
        display: inline-block;
        padding: 2px 14px;
        box-sizing: border-box;
        margin-bottom: 0;
        font-size: 12px;
        line-height: 18px;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        border-radius: 0;
        background-color: transparent;
        margin-right: 15px;
    }

    .main .py-container .details .goods-list ul li .list-wrap .operate .btn-bordered {
        min-width: 85px;
        background-color: transparent;
        border: 1px solid #8c8c8c;
        color: #8c8c8c;
    }

    .main .py-container .details .goods-list ul li .list-wrap .operate .btn-bordered:hover {
        border: 1px solid #666;
        color: #fff !important;
        background-color: #666;
        text-decoration: none;
    }

    .main .py-container .details .goods-list ul li .list-wrap .operate .btn-danger {
        border: 1px solid #e1251b;
        color: #e1251b;
    }

    .main .py-container .details .goods-list ul li .list-wrap .operate .btn-danger:hover {
        border: 1px solid #e1251b;
        background-color: #e1251b;
        color: white !important;
        text-decoration: none;
    }

    .main .py-container .hot-sale .hot-list ul {
        display: flex;
    }

    .main .py-container .hot-sale .hot-list ul li {
        width: 25%;
        height: 100%;
    }

    .main .py-container .hot-sale .hot-list ul li .list-wrap .p-img,
    .main .py-container .hot-sale .hot-list ul li .list-wrap .price,
    .main .py-container .hot-sale .hot-list ul li .list-wrap .attr,
    .main .py-container .hot-sale .hot-list ul li .list-wrap .commit {
        padding-left: 15px;
    }

    .main .py-container .hot-sale .hot-list ul li .list-wrap .p-img img {
        max-width: 100%;
        vertical-align: middle;
        border: 0;
    }

    .main .py-container .hot-sale .hot-list ul li .list-wrap .attr {
        width: 85%;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        margin-bottom: 8px;
        min-height: 38px;
        cursor: pointer;
        line-height: 1.8;
    }

    .main .py-container .hot-sale .hot-list ul li .list-wrap .price {
        font-size: 18px;
        color: #c81623;
    }

    .main .py-container .hot-sale .hot-list ul li .list-wrap .price strong {
        font-weight: 700;
    }

    .main .py-container .hot-sale .hot-list ul li .list-wrap .price strong i {
        margin-left: -5px;
    }

    .main .py-container .hot-sale .hot-list ul li .list-wrap .commit {
        height: 22px;
        font-size: 13px;
        color: #a7a7a7;
    }
</style>