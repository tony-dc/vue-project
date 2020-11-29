<template>
    <Content :title='title' :tips="tips" @handleShow="handleShow">
        <div slot='result' class="content-list">
           <Cinema_Item 
           v-for='(item,index) in cinemaItemlist'
           :key='index'
           :cinemaList='item'
           ></Cinema_Item>
        </div>
    </Content>
</template>
<script>
import Content from '../content'
import Cinema_Item from '../../Cinemas/cinema_Item'
export default {
    name:'cinemaSearchData',
    data(){
        return {
          title:'影院',
          isShow:true
        }
    },
    props:{
        cinemaList:{
            type:Object,
            default(){
                return {}
            }
        },
        max:Number
    },
    computed:{
     tips(){
      const total=this.cinemaList.total||0
      if(total>this.max){
          return '查看全部'+total+'家影院'
      }
      return ''
     },
     cinemaItemlist(){
         const list=this.cinemaList.list||[]
         if(!this.isShow){
             return list
         }
         return list.slice(0,3)
     }
    },
    //通过watch监听传过来的值是否变化
    watch:{
        cinemaList(newVal){
            if(newVal) this.isShow=true
        }
    },
    methods:{
        handleShow(result){
            this.isShow=result
            this.cinemaList.total=0
        }
    },
    components:{
        Content,
         Cinema_Item
    }
}
</script>
<style lang="scss" scoped>
    
</style>