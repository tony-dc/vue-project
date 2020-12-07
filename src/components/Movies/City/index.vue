<template>
  <div class="city_body">
    <div class="city_list" ref="city_list">
      <BScroll>
        <div>
          <div class="city_hot">
            <h2>热门城市</h2>
            <ul class="clearfix">
              <li
                v-for="(item, index) in hotList"
                :key="index"
                @touchstart="handlegetCityId(item.nm, item.id)"
              >{{ item.nm }}</li>
            </ul>
          </div>
          <div class="city_sort" ref="city_sort">
            <div v-for="item in cityList" :key="item.index">
              <h2>{{ item.index }}</h2>
              <ul>
                <li v-for="itemlist in item.list" :key="itemlist.id">{{ itemlist.nm }}</li>
              </ul>
            </div>
          </div>
        </div>
      </BScroll>
    </div>
    <div class="city_index">
      <ul>
        <li
          v-for="(item, index) in letterData"
          :key="index"
          @touchstart="handleToLetter(index)"
        >{{ item.index }}</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "city",
  data() {
    return {
      cityList: [],
      hotList: [],
      letterData: []
    };
  },
  mounted() {
    //页面初次渲染时执行该函数
    this.getCityInfo();
  },
  methods: {
    //点击对应字母跳到指定位置
    handleToLetter(index) {
      //根据对应字母的offsetTop值，让整个父元素滚动到对应高度
      const h = this.$refs.city_sort.getElementsByTagName("h2");
      this.$refs.city_list.scrollTop = h[index].offsetTop;
    },
    //获得用户选择的城市信息，并储存到状态管理中，实时更新
    handlegetCityId(nm, id) {
      const oldId = this.$store.state.city.id;
      console.log(id, oldId);
      if (id == oldId) return;
      //提交到状态管理中，实时更新
      this.$store.commit("city/CITYINFO", { nm, id });
      //存储到本地
      this.$storage.set("nm", nm);
      this.$storage.set("id", id);
      this.$router.push("/movie/nowplaying");
    },
    //封装获取渲染所需后台数据的方法
    handleGetCityList(result) {
      let citydata = [],
        hotdata = [],
        letterdata = [];
      //循环得到的数组数据，根据对用的格式处理数据
      for (let i = 0; i < result.length; i++) {
        //根据id值判断是否为热门城市
        if (result[i].id < 66) {
          hotdata.push({ id: result[i].id, nm: result[i].nm });
        }
        let fristLetter = result[i].py.substring(0, 1).toUpperCase();
        if (toCom(fristLetter)) {
          //当字母不存在时，创建并添加对用的字母集合到城市数据中
          citydata.push({
            index: fristLetter,
            list: [{ nm: result[i].nm, id: result[i].id }]
          });
        } else {
          //当字母存在时，进行push操作，添加到对应字母的数组中
          for (let k = 0; k < citydata.length; k++) {
            if (citydata[k].index == fristLetter) {
              citydata[k].list.push({ nm: result[i].nm, id: result[i].id });
            }
          }
        }
      }
      //定义一个判断首字母是否是数组里面的方法
      function toCom(Letter) {
        for (let j = 0; j < citydata.length; j++) {
          if (citydata[j].index === Letter) return false;
        }
        return true;
      }
      //对获得的数据进行排序操作
      citydata.sort((a, b) => {
        if (a.index > b.index) {
          return 1;
        } else if (a.index === b.index) {
          return 0;
        } else {
          return -1;
        }
      });
      citydata.forEach(item => letterdata.push({ index: item.index }));
      return { citydata, hotdata, letterdata };
    },
    //性能优化,做一下缓存,避免每次都需要去后台请求数据
    async getCityInfo() {
      //获取本地储存的数据，判断是否为空，提升代码性能
      let citylist = this.$storage.get("cityList"),
        hotlist = this.$storage.get("hotList"),
        letterlist = this.$storage.get("letterData");
      if (citylist && hotlist && letterlist) {
        this.cityList = citylist;
        this.hotList = hotlist;
        this.letterData = letterlist;
      } else {
        //如果为假,则发送axios请求后台数据
        let citylist = await this.$api.getCityList(),
          //解构返回的数据
          { citydata, hotdata, letterdata } = this.handleGetCityList(
            citylist.cts
          );
        this.cityList = citydata;
        this.hotList = hotdata;
        this.letterData = letterdata;
        //本地存储列表数据信息
        this.$storage.set("cityList", citydata);
        this.$storage.set("hotList", hotdata);
        this.$storage.set("letterData", letterdata);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.city_body {
  position: absolute;
  top: 95px;
  bottom: 50px;
  left: 0;
  right: 0;
  overflow: auto;
  width: 100%;
  display: flex;
  .city_list {
    flex: 1;
    overflow: auto;
    background-color: #fff5f0;
    &::-webkit-scrollbar {
      display: none;
    }
    .city_hot {
      margin-top: 20px;
      h2 {
        padding-left: 15px;
        line-height: 30px;
        font-size: 14px;
        font-weight: normal;
        background-color: #f0f0f0;
      }
      .clearfix {
        display: flex;
        width: 100%;
        justify-content: flex-start;
        flex-wrap: wrap;
        li {
          width: 29%;
          margin-top: 15px;
          margin-left: 3%;
          height: 33px;
          line-height: 33px;
          text-align: center;
          background-color: #fff;
          border-radius: 3px;
          box-sizing: border-box;
          border: 1px solid #e6e6e6;
        }
      }
    }
    .city_sort div {
      margin-top: 20px;
      h2 {
        padding-left: 15px;
        line-height: 30px;
        font-size: 14px;
        background: #f0f0f0;
        font-weight: normal;
      }
      ul {
        padding-left: 10px;
        margin-top: 10px;
        li {
          line-height: 30px;
        }
      }
    }
  }
  .city_index {
    width: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    border-left: 1px #e6e6e6 solid;
    li {
      height: 21px;
    }
  }
}
</style>