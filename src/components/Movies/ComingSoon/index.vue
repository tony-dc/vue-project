<template>
    <div class="movie_body">
    <BScroll>
			<ul>
				<li v-for='(item,index) in MovieData' :key='index'>
					<div class="pic_show"><img :src="item.img|setWH('128.168')">
                    </div>
					<div class="info_list">
                        <h2>
                           {{item.nm}}
                           <img src="@/assets/maxs.png" v-if='item.version'>
                        </h2>
                         <p><span class="person">{{item.wish}}</span> 人想看</p>
                         <p>主演: {{item.star}}</p>
                         <p>{{item.rt}}上映</p>
					</div>
					<div class="btn_pre">
						预售
					</div>
				</li>
			</ul>
    </BScroll>
    </div>
</template>
<script>
    export default {
        name:'comingsoon',
        data(){
          return {
            MovieData:[]
          }
        },
        mounted(){
           const cityId=this.$store.state.city.id
          this.$api.getComingSoonList(cityId).then(res=>{
             if(res){
               this.MovieData=res.coming
             }
          })
        }
    }
</script>
<style lang="scss" scoped>
 .movie_body {
  position: absolute;
  top: 95px;
  left: 0;
  right: 0;
  bottom: 45px;
  overflow: auto;
  ul {
    margin: 0 12px;
    overflow: hidden;
    li {
      margin-top: 12px;
      display: flex;
      align-items: center;
      border-bottom: 1px #e6e6e6 solid;
      padding-bottom: 10px;
      .pic_show {
        width: 64px;
        height: 90px;
        img {
          width: 100%;
        }
      }
      .info_list {
        margin-left: 10px;
        flex: 1;
        position: relative;
        h2 {
          font-size: 17px;
          line-height: 24px;
          width: 150px;
          overflow: hidden;
          font-weight: 700;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        p {
          font-size: 13px;
          color: #666;
          line-height: 22px;
          width: 200px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .grade {
          font-weight: 700;
          color: #faaf00;
          font-size: 15px;
        }
        img {
          width: 50px;
          position: absolute;
          right: 10px;
          top: 5px;
        }
      }
    }
  }
  .btn_pre {
    width: 47px;
    height: 27px;
    line-height: 27px;
    text-align: center;
    background-color: #0f9b26;
    color: #fff;
    border-radius: 4px;
    font-size: 13px;
    cursor: pointer;
  }
 }
</style>