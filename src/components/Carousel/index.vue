<!--轮播图全局组件，可以多次使用-->
<template>
  <div class="swiper-container" id="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide"
           v-for="(state) in list"
           :key="state.id">
        <img :src="state.imgUrl"/>
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<style>

</style>

<script>
import Swiper from "swiper";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Carousel',
  props: ['list'],
  watch: {
    immediate: true,
    list: {
      handler() {
        //next  Tick在下次Dom更新循环结束后执行回调
        this.$nextTick( ()=> {
          //轮播图动态。执行时，v-for已经加载完了
          new Swiper('.swiper-container', {
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          })
        })
      }
    }
  },
}
</script>