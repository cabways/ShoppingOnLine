<template>
    <div class="pagination" style="text-align: center">
        <button :disabled="pageNo==1" @click="change(pageNo-1)">上一页</button>
        <button v-if="FirstAndLast.first>1" @click="change(1)">1</button>
        <button v-if="FirstAndLast.first>2">···</button>

        <button
                v-for="(page,index) in FirstAndLast.last"
                :key="index"
                v-show="FirstAndLast.first<=page"
                @click="change(page)"
                :class="{active:pageNo==page}"
        >{{page}}</button>

        <button v-if="FirstAndLast.last<totalPage-1">···</button>
        <button v-if="FirstAndLast.last<totalPage" @click="change(totalPage)">{{totalPage}}</button>
        <button :disabled="pageNo==totalPage" @click="change(pageNo+1)">下一页</button>

        <button style="margin-left: 30px">共 {{total}} 条</button>
    </div>
</template>

<script>
    export default {
        name: "Pagination",
        props:['pageNo','pageSize','total','continuous'],
        computed:{
            //计算总页数
            totalPage(){
                return  Math.ceil(this.total/this.pageSize)
            },
            //计算中间连续项的首尾
            FirstAndLast(){
                const {continuous,pageNo,totalPage} = this
                let first = 1
                let last = this.total
                //如果总页数小于连续项个数
                if(continuous>totalPage){
                    first = 1
                    last = totalPage
                }else{
                    first = pageNo - parseInt(continuous/2)
                    last = pageNo + parseInt(continuous/2)
                }
                //在点击项为1，2时，计算得到的first不合法
                if(first<1){
                    first = 1
                    last = continuous
                }
                //在点击项为最大值时，计算得到的last不合法
                if(last>totalPage){
                    first = totalPage-continuous+1
                    last = totalPage
                }
                return {first,last}
            }
        },
        methods:{
            change(num){
                this.$emit('selectPage',num)
            }
        }
    }
</script>

<style scoped>
    .pagination button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;
    }

    .pagination button[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
    }

    .pagination button.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
    }

</style>
