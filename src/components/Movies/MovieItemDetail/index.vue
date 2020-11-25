<template>
    <div class="movieDetails">
        <Header title='影片详情' >
            <i class="iconfont icon-zuojiantou back" @touchstart='handleToBack'></i>
        </Header>
         <!-- 父子组件之前传值，如果传的值是需要异步请求得到的数据，需要在父组件通过v-if判断是否有值，在传递 -->
        <movieDetail :detail="detail" v-if ="isRead">
          <div slot="score">
            <span v-if="detail.globalReleased" class="num">{{detail.sc}}</span>
          </div>
        </movieDetail>
        <moreoffers :detail='detail'></moreoffers>


    </div>
</template>
<script>
import movieDetail from './moviedetail'
import moreoffers from './More offers'
    export default {
        name:'detail',
        data(){
         return {
             detail:{},
             isRead:false
         }
        },
        methods:{
            handleToBack(){
                this.$router.back()
            }
        },
        created(){
            //获取用户点进来的影片id
           const movieId=this.$route.params.movieid
           this.$api.getMovieDetail({params:{movieId}}).then(res=>{
               this.detail=res.detailMovie
               this.isRead=true    
                      })
        },
        components:{
            movieDetail,
            moreoffers
        }
    }
</script>
<style lang="scss">
    .movieDetails{
        position: absolute;
        left:0;
        top:0;
        width:100%;
        height:100%;
        background-color: #fff;
        .back{
            position: absolute;
            top:15px;
            left:20px;
            font-size: 24px;
            color:#fff;
            font-weight:bold

        }
    }
</style>