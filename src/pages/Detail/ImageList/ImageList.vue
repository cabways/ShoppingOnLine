<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(img,index) in skuImageList" :key="img.id" >
        <img :src="img.imgUrl" :class="{active:currentIndex===index}" @click="changeCurrentIndex(index)">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
  import Swiper from "swiper";

  export default {
    name: "ImageList",
    data(){
      return {
        currentIndex:0
      }
    },
    props:['skuImageList'],
    methods:{
      changeCurrentIndex(index){
        this.currentIndex=index
        this.$bus.$emit('changeImg',index)
      }
    },
    watch: {
      immediate: true,
      skuImageList: {
        handler() {
          //next  Tick在下次Dom更新循环结束后执行回调
          this.$nextTick(function () {
            //轮播图动态。执行时，v-for已经加载完了
            new Swiper('.swiper-container', {
              // 如果需要前进后退按钮
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              },
              //一次展示几个
              slidesPerView:3,
              //一次换几个
              slidesPerGroup:2
            })
          })
        }
      }
    },
  }
</script>

<style scoped="">
  .swiper-container {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;
  }
  .swiper-container .swiper-slide {
    width: 56px;
    height: 56px;
  }
  .swiper-container .swiper-slide img {
    border: 1px solid #ccc;
    padding: 2px;
    width: 50px;
    height: 50px;
    display: block;
  }
  .swiper-container .swiper-slide img.active {
    border: 2px solid #f60;
    padding: 1px;
  }
  .swiper-container .swiper-button-next {
    left: auto;
    right: 0;
  }
  .swiper-container .swiper-button-prev {
    left: 0;
    right: auto;
  }
  .swiper-container .swiper-button-next,
  .swiper-container .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: #ebebeb;
    border: 1px solid #cccccc;
    top: 0;
    margin-top: 0;
  }
  .swiper-container .swiper-button-next::after,
  .swiper-container .swiper-button-prev::after {
    font-size: 12px;
  }

</style>