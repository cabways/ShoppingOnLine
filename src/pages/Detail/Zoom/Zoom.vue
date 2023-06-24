<template>
  <div class="spec-preview">
    <img :src="imgObj.imgUrl"/>
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img :src="imgObj.imgUrl" ref="big" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Zoom",
  props: ['skuImageList'],
  data(){
    return {
      index:0
    }
  },
  computed: {
    imgObj() {
      return this.skuImageList[this.index] || {}
    }
  },
  mounted() {
    this.$bus.$on('changeImg',(index)=>{
      this.index = index
    })
  },
  methods:{
    handler(event){
      let mask = this.$refs.mask
      let big = this.$refs.big
      let left = event.offsetX - mask.offsetWidth/2
      let top = event.offsetY - mask.offsetHeight/2
      //设定约束
      if(left<=0) left = 0
      //在这里，由于mask盒子的长宽设置为大图片盒子的一半，故判断标准为  left>=mask.offsetWidth
      //感觉标准写法应为 if(left+mask.offsetWidth>=大盒子.offsetWidth) left =大盒子.offsetWidth-mask.offsetWidth
      // 即距离边框长度加上小盒子宽度大于大盒子宽度时，left=大盒子宽度减去小盒子宽度
      if(left>=mask.offsetWidth) left = mask.offsetWidth
      if(top<=0) top = 0
      if(top>=mask.offsetHeight) top = mask.offsetHeight
      //修改绿色区域的属性值
      mask.style.left = left +'px'
      mask.style.top = top +'px'
      big.style.left = -2*left +'px'
      big.style.top = -2*top +'px'
    }
  }
}
</script>

<style scoped>
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;
}

.spec-preview img {
  width: 100%;
  height: 100%;
}

.spec-preview .event {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 998;
}

.spec-preview .mask {
  width: 50%;
  height: 50%;
  background-color: rgba(0, 255, 0, 0.3);
  position: absolute;
  left: 0;
  top: 0;
  display: none;
}

.spec-preview .big {
  width: 100%;
  height: 100%;
  position: absolute;
  top: -1px;
  left: 100%;
  border: 1px solid #aaa;
  overflow: hidden;
  z-index: 998;
  display: none;
  background: white;
}

.spec-preview .big img {
  width: 200%;
  max-width: 200%;
  height: 200%;
  position: absolute;
  left: 0;
  top: 0;
}

.spec-preview .event:hover ~ .mask,
.spec-preview .event:hover ~ .big {
  display: block;
}

</style>