<template>
    <div class="movieDetails">
        <Header title='影片详情' >
            <i class="iconfont icon-zuojiantou back" @touchstart='handleToBack'></i>
        </Header>
        <movieDetail :detail="detail">
         
        </movieDetail>

    </div>
</template>
<script>
import movieDetail from './moviedetail'
    export default {
        name:'detail',
        data(){
         return {
             detail:{}
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
           })
        },
        components:{
            movieDetail
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