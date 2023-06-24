<template>
    <div class="outer">
        <div class="type-nav">
            <div class="container">
                <div @mouseleave="mouseLeave" @mouseenter="changeShow">
                    <h2 class="all">全部商品分类</h2>
                    <!--                    过度动画-->
                    <transition name="sort">
                        <div class="sort" v-show="show">
                            <div class="all-sort-list2" @click="goSearch">
<!--                                一级标题-->
                                <div
                                        class="item"
                                        v-for="(c1,index) in categoryList"
                                        :key="c1.categoryID"
                                        @mouseenter="mouseEnter(index)"
                                        :class="{bg:currentIndex === index}"
                                >
                                    <h3 v-show="index===16?false:true">
                                        <a
                                                :data-categoryName="c1.categoryName"
                                                :data-category1Id="c1.categoryId"
                                        >{{c1.categoryName}}</a>
                                    </h3>
                                    <div class="item-list clearfix"
                                         :style="{display:currentIndex==index?'block':'none'}">
                                        <div
                                                class="subitem"
                                                v-for="c2 in c1.categoryChild"
                                                :key="c2.categoryID"
                                        >
                                            <dl class="fore">
                                                <dt>
                                                    <a :data-categoryName="c2.categoryName"
                                                       :data-category2Id="c2.categoryId"
                                                    >{{c2.categoryName}}</a>
                                                </dt>
                                                <dd>
                                                    <em v-for="c3 in c2.categoryChild" :key="c3.categoryID">
                                                        <a :data-categoryName="c3.categoryName"
                                                           :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                                                    </em>
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </transition>
                </div>
                <nav class="nav">
                    <a href="#">服装城</a>
                    <a href="#">美妆馆</a>
                    <a href="#">尚品汇超市</a>
                    <a href="#">全球购</a>
                    <a href="#">闪购</a>
                    <a href="#">团购</a>
                    <a href="#">有趣</a>
                    <a href="#">秒杀</a>
                </nav>
            </div>
        </div>
    </div>
</template>

<style>
    .outer .type-nav {
        border-bottom: 2px solid #e1251b;
    }

    .outer .type-nav .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;
    }

    .outer .type-nav .container .all {
        width: 210px;
        height: 45px;
        background-color: #e1251b;
        line-height: 45px;
        text-align: center;
        color: #fff;
        font-size: 14px;
        font-weight: bold;
    }

    .outer .type-nav .container .nav a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
    }

    .outer .type-nav .container .sort {
        left: 0;
        top: 45px;
        width: 210px;
        height: 461px;
        position: absolute;
        background: #fafafa;
        z-index: 999;
    }

    .outer .type-nav .container .sort .all-sort-list2 .item h3 {
        line-height: 29px;
        font-size: 14px;
        font-weight: 400;
        overflow: hidden;
        padding: 0 20px;
        margin: 0;
    }

    .outer .type-nav .container .sort .all-sort-list2 .item h3 a {
        color: #333;
    }

    .outer .type-nav .container .sort .all-sort-list2 .item .item-list {
        display: none;
        position: absolute;
        width: 734px;
        min-height: 460px;
        background: #f7f7f7;
        left: 210px;
        border: 1px solid #ddd;
        top: 0;
        z-index: 9999 !important;
    }

    .outer .type-nav .container .sort .all-sort-list2 .item .item-list .subitem {
        float: left;
        width: 650px;
        padding: 0 4px 0 8px;
    }

    .outer .type-nav .container .sort .all-sort-list2 .item .item-list .subitem dl {
        border-top: 1px solid #eee;
        padding: 6px 0;
        overflow: hidden;
        zoom: 1;
    }

    .outer .type-nav .container .sort .all-sort-list2 .item .item-list .subitem dl.fore {
        border-top: 0;
    }

    .outer .type-nav .container .sort .all-sort-list2 .item .item-list .subitem dl dt {
        float: left;
        width: 54px;
        line-height: 22px;
        text-align: right;
        padding: 3px 6px 0 0;
        font-weight: 700;
    }

    .outer .type-nav .container .sort .all-sort-list2 .item .item-list .subitem dl dd {
        float: left;
        width: 415px;
        padding: 3px 0 0;
        overflow: hidden;
    }

    .outer .type-nav .container .sort .all-sort-list2 .item .item-list .subitem dl dd em {
        float: left;
        height: 14px;
        line-height: 14px;
        padding: 0 8px;
        margin-top: 5px;
        border-left: 1px solid #ccc;
    }

    /*.outer .type-nav .container .sort .all-sort-list2 .item:hover .item-list {*/
    /*    display: block;*/
    /*}*/
    /*.outer .type-nav .container .sort .all-sort-list2 .item:hover {*/
    /*    background-color: skyblue;*/
    /*}*/
    .bg {
        background-color: skyblue;
    }

    /*过度动画样式*/
    /*起点*/
    .outer .type-nav .container .sort-enter {
        height: 0;
    }

    /*终点*/
    .outer .type-nav .container .sort-enter-to {
        height: 461px;
    }

    /*过程配置*/
    .outer .type-nav .container .sort-enter-active {
        transition: all 0.5s linear;
    }
</style>

<script>
    import {mapState} from 'vuex'
    // import _ from 'lodash'
    export default {
        name: 'TypeNav',
        data() {
            return {
                currentIndex: -1,
                show: true
            }
        },
        //组件挂载完毕，向服务器发请求
        mounted() {
            //通过vuex发请求，获取数据储存到仓库
            this.$store.dispatch('categoryList')

            //判断初始三级列表是否展示
            if (this.$route.path !== '/home') {
                this.show = false;
            }
        },
        computed: {
            ...mapState({
                categoryList: state => state.home.categoryList
            })
        },
        methods: {
            mouseEnter(index) {
                //获取当前鼠标进入的索引
                this.currentIndex = index
            },
            //节流，把频繁触发改为少量触发
            // mouseEnter:_.throttle(function (index.js){
            //     this.currentIndex = index.js
            //     console.log(index.js)
            // },50),

            //鼠标移出事件
            mouseLeave() {
                if (this.$route.path !== '/home') {
                    this.show = false
                }
                this.currentIndex = -1;
            },
            //鼠标移入时展示
            changeShow() {
                this.show = true
            },
            goSearch(event) {
                //获取当前元素，将其身上的自定义属性储存到对象里，从而判断是不是 a 标签
                let element = event.target;
                let {categoryname, category1id, category2id, category3id} = element.dataset;
                //判断是第几级导航并存入query
                if (categoryname) {
                    let location = {name: "search"}
                    let query = {categoryname: categoryname}
                    if (category1id) {
                        query.category1id = category1id
                    } else if (category2id) {
                        query.category2id = category2id
                    } else if (category3id) {
                        query.category3id = category3id
                    }
                    //整理query参数
                    location.query = query
                    //路由跳转
                    if (this.$route.params) {
                        location.params = this.$route.params
                    }
                    this.$router.push(location);
                }
            }
        },
    }
</script>