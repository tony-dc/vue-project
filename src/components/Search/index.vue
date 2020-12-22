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
          :placeholder="SearchTitle"
        />
        <span v-if="SearchMsg" @touchstart="Text_empty" class="iconfont icon-shanchu msg"></span>
      </div>
      <div @click='handleCancelTouch' class="cancel">
       取消
      </div>
    </div>
    <History v-if="history" :history="history" @Tosearch='handleTosearch'/>
    <cinemaSearchData v-if='resultCinema.list'  :cinemaList="resultCinema" :max="max"></cinemaSearchData> 
    <movieSearchData  v-if='MoviesList.list' :MovieData='MoviesList' :max='max'></movieSearchData>
    <infinite-loading v-if='Searching'>
        <div class="loading" slot='load'>
             Loading...
        </div>
    </infinite-loading>
  </div>
</template>
<script>
//通过命名空间帮助器简化代码
// import {createNamespacedHelpers} from 'vuex'
// const { mapState,mapMutations} = createNamespacedHelpers('user')
import {mapState,mapMutations} from 'vuex'
import History from './history'
import cinemaSearchData from './cinemaSearchData'
import movieSearchData from './movieSearchData'
export default {
  name: "SearchPage",
  data() {
    return {
      SearchMsg: "",
      SearchTitle:'',
      searchtype:{
          movie:{
              type:-1,
              name:"搜索电影",
              title:'movies'
          },
          cinema:{
              type:2,
              name:"搜索影院",
              title:'cinemas'
          }
      },
      MoviesList:{},
      resultCinema:{},
      max:3,
      Searching:false,
      timer:null
    };
  },
  watch:{
    //监测输入值是否为空，为空则让请求数据为空
     SearchMsg(newVal){
         if(!newVal){
             this.MoviesList={}
             this.resultCinema={}
         }
     } 
  },
  computed:{
      //拿到vuex中存储的数据
      ...mapState('user',
        {searchHistory:state=>state.searchHistory},
        ),
      ...mapState('city',{
        cityid:state=>state.id
      }),
      cityId(){
          return this.cityid
      },
      queryval(){
            //获取动态路由值
            const routetype=this.$route.params.searchtype
            console.log(routetype)
            //对拿到的值做下完善处理
             const params=routetype||this.searchtype.movie
            //返回对应的用户是从哪个搜索页面进行访问
           return this.searchtype[params]
      },
      history(){
        //对vuex中的值做判断，是否有本地储存，原生写法，无法完成数据变更，自动渲染
        // let History=window.localStorage.getItem('searchHistory');
        //根据返回的值，确定需要显示的是状态管理中电影还是影院的历史记录
        // let History=window.localStorage.getItem('searchHistory')
        // console.log(History)
        // if(History){
        //   if(typeof(this.searchHistory)==='string')
        //   {
        //    //多了一步JSON.parse就无法数据实时更新
        //     return JSON.parse(this.searchHistory)[this.queryval.title]
        //   }
        //   console.log(this.searchHistory[this.queryval.title])
        //   return this.searchHistory[this.queryval.title]
           
        // }
         return this.searchHistory[this.queryval.title]
      }
  },
  mounted(){
    console.log(this.history)
   this.SearchTitle=this.queryval.name
  },
  methods: {
    ...mapMutations('user',['updateSearchHistory']),

    handleSearchInfo() {
      //进来判断如果定时器编号有值则return
      // 进来清除下之前的定时器
       clearTimeout(this.timer)
       //通过定时器做下防抖
       this.timer=setTimeout(()=>{
         console.log(this.history)
            //初始值都清空
            this.MoviesList={}
            this.resultCinema={}
            //判断如果当用户输入空格时，不发起数据请求
            if(this.SearchMsg.trim()!==''){
              //通过正则去掉用户输入的所有空格
              this.SearchMsg=this.SearchMsg.replace(/\s*/g,'')
              // 历史记录数组向前插入方法
              this.history.data.unshift(this.SearchMsg)
              // 进行历史记录数组去重操作
              this.history.data= [...new Set(this.history.data)]

              // 做本地储存
              // window.localStorage.setItem('searchHistory',JSON.stringify(results))
              // 进行历史数据更新
              // this.$store.commit('user/updateSearchHistory',this.history)
             //提交更新历史记录数据
             this.updateSearchHistory(this.history)
              this.Searching=true
              let params={
                  kw:this.SearchMsg,
                  cityId:parseInt(this.cityId),
                  stype:this.queryval.type
                }
              this.$api.getSearch(
                {params}
              ).then(res=>{
                console.log(res)
                const {movies,cinemas}=res
                // 判断用户进来搜索的类型是电影还是影院
                // if(this.queryval.type===-1) this.handleData(movies,"resultMovie")
                //     this.handleData(cinemas,"resultCinema")
                
               this.queryval.type===-1?this.handleData(movies,"MoviesList") :this.handleData(cinemas,"resultCinema")
                //关闭加载图标
                this.Searching=false
                console.log(this.MoviesList)
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
      // this.$router.push('/cinema')
      this.$router.back()
    },
    //接受子传父发射的事件
    handleTosearch(result){
       this.SearchMsg=result
       this.handleSearchInfo()
    },
    //封装方法处理后台拿到的数据
    handleData(data,key){
        if(!data) return
        const {list ,total}=data
        this[key]={
          list:total.max?list.slice(0,this.max):list,
          total
        }
    }
  },
  components:{
     History,
     cinemaSearchData,
     movieSearchData
  }
};
</script>
<style lang="scss">
.content{
    min-height:100vh;
    background-color: #f5f5f5;
    display: flex;
     flex-direction: column;
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