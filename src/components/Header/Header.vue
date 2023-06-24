<template>
  <div class="outer">
    <header class="header">
      <!-- 头部的第一行 -->
      <div class="top">
        <div class="container">
          <div class="loginList">
            <p>尚品汇欢迎您！</p>
            <p v-if="!userName">
              <span>请</span>
              <router-link to="/login">登录</router-link>
              <router-link to="/register" class="register">免费注册</router-link>
            </p>
            <P v-else>
              <a>{{userName}}</a>
              <a @click='reqLogout' class="register">退出登录</a>
            </P>
          </div>
          <div class="typeList">
            <router-link to="/center/myOrder">我的订单</router-link>
            <router-link to="/shopcart">我的购物车</router-link>
            <a href="#">我的尚品汇</a>
            <a href="#">尚品汇会员</a>
            <a href="#">企业采购</a>
            <a href="#">关注尚品汇</a>
            <a href="#">合作招商</a>
            <a href="#">商家后台</a>
          </div>
        </div>
      </div>
      <!--头部第二行 搜索区域-->
      <div class="bottom">
        <h1 class="logoArea">
          <router-link class="logo" title="尚品汇" to="/home">
            <img src="./img/logo.png" alt="">
          </router-link>
        </h1>
        <div class="searchArea">
          <form action="#" class="searchForm">
            <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="KeyValue"/>
            <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">搜索</button>
          </form>
        </div>
      </div>
    </header>
  </div>
</template>

<style scoped>
.outer .header > .top {
  background-color: #eaeaea;
  height: 30px;
  line-height: 30px;
}

.outer .header > .top .container {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}

.outer .header > .top .container .loginList {
  float: left;
}

.outer .header > .top .container .loginList p {
  float: left;
  margin-right: 10px;
}

.outer .header > .top .container .loginList p .register {
  border-left: 1px solid #b3aeae;
  padding: 0 5px;
  margin-left: 5px;
}

.outer .header > .top .container .typeList {
  float: right;
}

.outer .header > .top .container .typeList a {
  padding: 0 10px;
}

.outer .header > .top .container .typeList a + a {
  border-left: 1px solid #b3aeae;
}

.outer .header > .bottom {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}

.outer .header > .bottom .logoArea {
  float: left;
}

.outer .header > .bottom .logoArea .logo img {
  width: 175px;
  margin: 25px 45px;
}

.outer .header > .bottom .searchArea {
  float: right;
  margin-top: 35px;
}

.outer .header > .bottom .searchArea .searchForm {
  overflow: hidden;
}

.outer .header > .bottom .searchArea .searchForm input {
  box-sizing: border-box;
  width: 490px;
  height: 32px;
  padding: 0 4px;
  border: 2px solid #ea4a36;
  float: left;
}

.outer .header > .bottom .searchArea .searchForm input:focus {
  outline: none;
}

.outer .header > .bottom .searchArea .searchForm button {
  height: 32px;
  width: 68px;
  background-color: #ea4a36;
  border: none;
  color: #fff;
  float: left;
  cursor: pointer;
}

.outer .header > .bottom .searchArea .searchForm button:focus {
  outline: none;
}
</style>

<script>


export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Header',
  data() {
    return {
      KeyValue: ''
    }
  },
  methods: {
    goSearch() {
      //对象写法，path和params不能一起使用
      //如果指定传递params参数却没传，则url会出问题。若需要可传可不传，需要在路径中params占位后加‘？’
      //使用undefined可以解决params参数传递空串问题    params:{''||undefined}
      let location = {name: 'search', params: {keyword: this.KeyValue || undefined}}
      if (this.$route.query) {
        location.query = this.$route.query
      }
      this.$router.push(location)
    },
    async reqLogout(){
      try {
        await this.$store.dispatch('reqLogout')
        this.$router.push('/home')
      }catch (e) {
        alert(e.message)
      }

    }
  },
  mounted() {
    //开启事件clear，删除关键字
    this.$bus.$on('clear', () => {
      this.KeyValue = ''
    })
  },
  computed:{
    userName(){
      return this.$store.state.Login.userInfo.name||''
    }
  }
}
</script>