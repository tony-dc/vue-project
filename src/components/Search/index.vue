<template>
  <div class="content">
    <Header title="酷喵电影" />
    <div class="search-header">
      <div class="search_wrapper">
        <i class="iconfont icon-sousuo suosou"></i>
        <input
          type="text"
          v-model="SearchMsg"
          @input="handleSearchInfo"
          class="S_input"
          placeholder="搜索影院"
        />
        <span v-if="SearchMsg" @touchstart="Text_empty" class="iconfont icon-sousuo msg"></span>
      </div>
      <div @touchstart='handleCancelTouch' class="cancel">
       取消
      </div>
    </div>
    <History :history="history" @Tosearch='handleTosearch' />
    <infinite-loading v-if='Searching'>
        <div class="loading" slot='load'>
             Loading...
        </div>
    </infinite-loading>
  </div>
</template>
<script>
// import {mapMutations} from 'vuex'
import History from './history'
export default {
  name: "SearchPage",
  data() {
    return {
      SearchMsg: "",
      searchtype:{
          movie:{
              type:-1,
              name:"搜电影",
              title:'movies'
          },
          cinema:{
              type:2,
              name:"搜影院",
              title:'cinemas'
          }
      },
      Movies_List:{},
      Cinema_List:{},
      max:3,
      Searching:false,
      timer:null
    };
  },
  watch:{
     SearchMsg(newVal){
         if(!newVal){
             this.Movies_List={}
             this.Cinema_List={}
         }
     } 
  },
  computed:{
      //拿到vuex中存储的数据
      // ...mapState([
      //   {'searchHistory':state=>state.user.searchHistory}
      //   ]),
      cityId(){
          return this.$store.state.city.id
      },
      queryval(){
            //获取动态路由值
            const routetype=this.$route.params.searchtype
            //对拿到的值做下完善处理
             const params=routetype||this.searchtype.movie
            //返回对应的用户是从哪个搜索页面进行访问
           return this.searchtype[params]
      },
      history(){
        //根据返回的值，确定需要显示的是状态管理中电影还是影院的历史记录
        return this.$store.state.user.searchHistory[this.queryval.title]
      }
  },
  mounted(){
  //  console.log(this.queryval,this.history,this.cityId)
  },
  methods: {
    // ...mapMutations[{'updateSearchHistory'}],

    handleSearchInfo() {
      //进来判断如果定时器编号有值则return
      // if(this.timer) return 
      //通过定时器做下防抖
      // 进来清除下之前的定时器
       clearTimeout(this.timer)
      console.log(this.timer)
       this.timer=setTimeout(()=>{
            //初始值都清空
            this.Movies_List={}
            this.Cinema_List={}
            if(this.SearchMsg){
              // 数组向前插入方法
              this.history.data.unshift(this.SearchMsg)
              console.log(this.history.data)
              // 进行数组去重操作
              this.history.data= [...new Set(this.history.data)]
              //进行历史数据更新
              this.$store.commit('user/updateSearchHistory',this.history)
              this.Searching=true
              let params={
                  kw:this.SearchMsg,
                  cityId:this.cityId,
                  stype:this.queryval.type
                }
                console.log(params)
              this.$api.getSearch(
                {params}
              ).then(res=>{
                console.log(res)
                const {movies,cinemas}=res
                // 判断用户搜索的类型是否为电影或者影院
                if(this.queryval.type===-1) this.handleData(movies,"resultMovie")
                this.handleData(cinemas,"resultCinema")
                //关闭加载图标
                this.Searching=false
              })
            }
       },1000)
    },
    //清空功能
    Text_empty() {
      this.SearchMsg=''
    },
    //退出搜索页，返回上一层
    handleCancelTouch(){
      this.$router.back()
    },
    //接受子传父发射的事件
    handleTosearch(result){
       this.SearchMsg=result
       this.handleSearchInfo()
    },
    //封装方法处理后台拿到的数据
    handleData(data,title){
        if(!data) return
        const {list ,total}=data
        this[title]={
          list:total.max?list.slice(0,this.max):list,
          total
        }
        console.log(this[title])
    }
  },
  components:{
     History
  }

};
</script>
<style lang="scss">
.content{
    min-height:100vh;
    background-color: #f5f5f5;
    .search-header{
        position: relative;
        display: flex;
        align-items: center;
        padding:8px 0 8px 10px;
        border-bottom:1px solid #e5e5e5;
       .search_wrapper{
           position: relative;
           flex:1;
           padding:0 30px;
           border:1px solid #e6e6e6;
           border-radius:5px;
           background-color: #fff;
         .S_input{
             padding:5px 0;
             width:100%;
             font-size:13px;
             color:#333;
             line-height:20px;
             border:none;
             &:focus{
                 outline:none
             }
         }
         .suosou{
             position: absolute;
             top:0;
             left:0;
             color:#b3b0b0;
             padding:0 6px;
             line-height:32px;
         }
         .msg{
           position: absolute;
           display: block;
           height:32px;
           line-height: 32px;
           right:0;
           top:0;
         }
       }
       .cancel{
           padding:0 10px;
           height:30px;
           line-height: 30px;
           font-size:14px;
           color:#f03d37;
       }
    }
    .loading{
       padding:10px 0;
    }
    
}
</style>