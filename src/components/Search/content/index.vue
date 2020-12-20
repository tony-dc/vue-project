<template>
    <div class="container" ref="container">
         <h3 class="title">{{title}}</h3>
          <slot name='result'></slot>
          <div class="moreContent" @click="handleShowALl" v-if='tips' ref='moreContent'>{{tips}}</div>
    </div>
</template>
<script>
export default {
    name:'Content',
    data(){
     return {
         isShow:false
     }
    },
    props:{
        tips:{
            type:String
        },
        title:{
             type:String
        }
    },
    methods:{
        handleShowALl(){
            this.$emit('handleShow',this.isShow)
        }
    }
}
</script>
<style lang="scss" scoped>
.container{
    margin-bottom:20px;
    background-color: #fff;
    .title{
        font-size:15px;
        color:#999;
        padding:9px 15px;
        border-bottom: 1px solid #e6e6e6;
    }
    .moreContent{
        color:#ef4238;
        height:44px;
        text-align: center;
        line-height: 44px;
        font-size:15px;
        position: absolute;
        bottom:30px;
        left:50%;
        transform:translateX(-50%)
    }
}
</style>