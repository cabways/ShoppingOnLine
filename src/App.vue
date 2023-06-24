<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.showFooter"></Footer>
  </div>
</template>

<script>
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  watch: {
    $route() {
      this.$store.dispatch('reqUserInfo')
    }
  },
  mounted(){
    //通过vuex发请求，获取数据储存到仓库,(在这里只执行一次)
    this.$store.dispatch('categoryList')
  },
  beforeCreate() {
    localStorage.removeItem('token')
  }
}
</script>
