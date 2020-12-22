# Vue-[kumiao](https://github.com/tony-dc/kumiao)

### vue防猫眼电影移动版

[完整项目代码链接](https://github.com/tony-dc/kumiao)

## 1.已开发页面

- [x] 热门电影
- [x] 即将上映
- [x] 城市列表
- [x] 搜索页面
- [x] 影院页面
- [x] 电影详情
- [x] 个人中心
- [x] 影院搜索

##  2.静态效果图

![image-20201221085817307](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20201221085817307.png)

![image-20201221090159134](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20201221090159134.png)

![image-20201221090434344](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20201221090434344.png)

![image-20201221091555745](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20201221091555745.png)

## 3.安装

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```





## 二：Vue酷喵电影详细开发文档  

  一.**技术栈**：vue全家桶+axios+sass+flex+localStorage+better-scroll+ESlint+git+vue-infinity-loading+vue-awesome-swiper+vue-lazyload

二、**首先实现的是TabBar的layout布局以及TabBar组件和Header组件**

​        tab页主要有**movie**、cinema、mine，通过底部的tabbar导航栏切换，设置三个对应路由，抽离TabBar成为公共组件并在全局中注册，让他们每个组件中都存在一个TabBar组件，共用一个TabBar组件，TabBar组件主要控制tab页面的切换和通过在css中设置router-link-active显示当前页面激活的标识

​       在components中封装一个Header公共组件，并且在全局注册，也让三个tab主组件都引入Header组件。在Header组件里面定义一个插槽方便后面各个组件内部需要添加不同的需求以及通过props属性接受组件传参显示对应不同的logo信息。

三、**movie页面layout布局中，主要分为四个子页面**：

​                   (城市列表、正在热映、即将上映、电影搜索)，首先在router movie路由中配置二级路由菜单，分别添加上四个对应的子路由以及懒加载对应组件。并在 movie主组件中添加对应的命名式路由导航Html结构，以及指定视图出口

 四、**在src文件中新增api文件夹主要用来二次封装axios请求后台数据**:

​              新建了三个js文件.分别为request.js、base.js、以及 index.js，reques.js文件主要是创建一个axios实例,并且在这个实例里面配置相应的属性,包括url,以及请求超时时间设定,请求头的设置。并且export 导出这个实例对象、提供一个对外接口，在base.js里面导入request导出的实例对象。并且创建并导出一个BaseData类，往 constructor中 添加一个属性并将添加导入的request对象赋值给这个属性身上。然后在该类中创建三个方法(responseData,get,post)用来通过该类中的axios实例去处理get，post请求。最后在index.js中，导入这个BaseData类，创建一个子类通过继承的方式得到父类上面的方法和属性。然后在子类中添加方法携带参数，在方法里面调用父类上面的方法，根据需求添加各种请求后台数据的参数，方式以及地址，最后导出这个子类，最后在main.js中引入这个类，并且在vue原型上挂载这个子类，便实现了axios的二次封装，

五、**在请求数据api接口时会遇到跨域问题，故需要在项目跟路径中添加vue.config.js文件，并在里面配置跨域设置具体如下**:

```js
//通过proxy处理跨域请求
module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://m.maoyan.com',
                changOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}
```

**六**、**movie主页面中四个子组件开发**:

​            1.在components存放公共组件的文件夹中创建Movies文件夹，并给新建 Nowplaying，CommingSoon，City,Search四个.vue子组件，

#####  **city组件：**

​           1. 在模板中创建HTML结构，以及通过css预处理器scss书写样式，在vue实例中methods中，封装异步请求函数getCityInfo，并请求后台对应城市数据接口获取数据，在mounted生命周期函数初始化页面时调用该函数执行，并且在该函数中通过Storage将后台请求的城市数据做了本地缓存操作，当页面渲染时读取本地Stroage，如果里面有则不向后台发送数据请求，直接渲染，如果没有则发送数据请求，减少请求次数，提升性能。

​              2. 拿到后台数据之后，需要对数据进行处理，处理成我们需要的数据格式渲染到页面中，在组件data中，定义三个变量接收处理后的数据，封装处理数据的三个方法如下：

```js
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
```

​    3.给对应的城市元素绑定点击事件，获取该城市的id值，并且通过本地存储保存，在状态管理city模块中，state里面的city属性值设置为从本地存储中读取该字段，默认值设定为10，

**NowPlaying组件**：

​      1.在模板中创建HTML结构,封装movielist公共组件,在Nowplay组件中引入movielist组件,在components中注册并且在tempalte模板中使用.

​     2.在vue组件data中定义多个参数,根据后台接口所需携带的参数,用来接收后台请求的数据和赋值

```js
 data() {
    return {
      loading:false,
      movieList: [],
      movieIds: [],
      beforeId: -1,
      params: {
        token: "",
      },
      pageNo: 0,
      limit: 12,
      total: 0,
    };
  },
```

3、引入第三方滚动插件 vue-infinity-loading，初次页面渲染时会执行一次该插件方法，根据pageNo这个参数的值通过三元运算来动态的请求对应的后台数据接口，到底是初次数据接口还是加载更多数据接口。从而实现往下滚动不断加载更新的功能。

```js
  // 无限滚动加载
    infiniteHandler($state) {
      //解构
      const { pageNo, limit, total } = this;
      //拿到储存的城市id值
      const cityId = this.$store.state.city.id;
      let indexfrist = pageNo;
      //当大于总数时，终止执行下面代码
      if (pageNo > total) return;
      //根据pageNo不断变化，不断截取新获取到的数据
      const movieIds = this.movieIds.slice(pageNo+10, pageNo + limit+10).join();
      //定义请求后台数据接口参数
      const params = { params: { cityId, ...this.params, movieIds } };
      //判断用户进去页面时是初始进入还是往下下拉状态，调用不用的数据api接口拿到数据
      const result = indexfrist
        ? this.$api.getMoreMovieList(params)
        : this.$api.getMovieOnInfoList(params);
      result
        .then((res) => {
          // console.log(res);
          //  解构
          let { movieList, movieIds, coming, total } = res;
          if (movieIds) {
            // 根据movieIds判断当首次加载时，获取到对应的数据并赋值
            this.movieIds = movieIds;
            this.total = total;
            this.beforeId=cityId;
            return movieList;
          }
          //如果movieIds为空，这是下拉加载更多，返回对用的数据
          return coming;
        })
        .then((data) => {
          console.log(data)
          //判断返回数据是否有length,
          if (data.length) {
            //通过每次的数据长度来改变pageNo的值来
            this.pageNo += data.length;
            //新拿到的数据添加到电影列表中
            this.movieList.push(...data);
            //页面渲染执行
            $state.loaded();
          } else {
            //页面渲染完成
            $state.complete();
          }
        });
    },
```

​     4.将获取的 data中的movieList绑定到common这个子组件上通过属性绑定的方法，将值传递给common组件。完成数据绑定与渲染。common组件中又拆分出一个movieItem公共组件，功能是渲染单个电影信息组件。在movieItem内部也做了插槽，并根据common传入的对象，来判断哪些显示还是隐藏。

   **CommingSoon组件**：

​            拆分成2个子组件：expect和moreComing，并在CommingSoon组件中引入这2个子组件，注册到components中，并且在template中使用。

​        **expect组件**：主要是实现近期备货期待影片数据的获取和渲染。主要用到了better-scroll插件来实现影片信息的滚动，以及数据懒加载。注意点：将better-scroll单独抽离成一个公共组件，通过传参的方式，来获取所需要属性值和方法，例如是x轴滚动还是Y轴滚动，还有绑定哪些事件。在betterscroll中通过监听$on（scroll）的位置，来实时触发向后台请求更多数据，并且渲染到页面中，特别注意，当请求更多数据之后需要手动调整ul的宽度，并且在watch里面监听传过来的data数据，如果发生变化，则在better-scroll组件实例中调用refresh方法，让页面重新渲染，否则无法滚动。

​    **moreComing组件**：主要实现即将上映影片信息的获取和渲染。用到了vue-infinity-loading插件。

​     也是初次进去页面触发一次infiniteHandler函数，请求对应的数据，对数据进行处理，得到想要的数据格式，并且赋值给data中定义的变量中，再通过绑定属性的方式，将此变量传递给common公共组件。

**movieSearch组件**：主要实现电影页搜索功能。通过命名式路由导航，用name属性，通过params携带参数，跳转到搜索界面。

```js

<router-link 
        class="searchMsg" 
        :to="{name:'cinemaSearch',params:{searchtype:'movie',type:-1}}"
        tag="div"
        >
```

**Search组件**：该组件主要实现电影搜索和影院搜索功能，在路由中配置的是动态路由，有可能从2个入口进入，一个影院搜索页，一个电影搜索页，故需要配置成动态的路由，以及历史记录储存显示和搜索结果的数据获取和渲染。该组件内部又抽离出了四个组件，

​         **在Search主组件中：**引入（cinemaSearchData， history，movieSearchData）三个组件并挂载到主组件中。通过v-model对input的SearchMsg变量值进行双向数据绑定，在data数据中定义了一些参数如下：

​          首先在计算属性中，通过vuex状态管理拿到当前的cityId值，和是否有存储历史记录值，然后通过this.$route.params对象拿到用户从哪个入口传递的参数值，并根据参数值确定是data数据中searchtype对象的第几项，然后根据拿到的对象，确定在input的palceholder动态绑定的SearchTitle为何值。还需要从状态管理中根据计算属性拿到的searchtype第几项中的title值取出对应的history的存储值，

​     给input框绑定input事件函数，并通过watch监听SearchMsg，当值为空时，初始化MoviesList， resultCinema两个data中的数据，在methods方法里面通过触发input事件，从而根据用户输入的信息去请求后台数据并复制给data中相应的变量，注意里面用到防抖策略。加了一个定时器，并且在函数进来时先清除之前的定时器。在函数体内部，做了正则去空格，拿到状态管理中mutation里面的历史记录更新方法，存储历史记录。并且对已存在的历史记录做出重处理。在通过计算属性中获取的query对象中的type值是-1还是0通过三目运算来决定需要请求的是哪个数据接口的数据，并封装一个公共方法对数据作相应的格式处理。给dom结构的一些中，还绑定了一些方法，例如清空输入框，点击箭头，通过编程式路由导航调转到上一个页面。

```js
 //重要参数
data(){
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
}

```

​      **history组件**：主要实现历史记录的数据渲染。

​             具体步诹如下：通过父组件中绑定计算属性history，在history组件通过props接收，通过接收 到的history数据中的type字段，判断是搜索电影的历史记录还是搜索影院的历史记录，显示不一样的内容。然后在dom结构中通过v-for循环拿到的数据并且渲染到页面中，并且给每个渲染出来的dom元素绑定点击事件。当用户点击某个历史记录时，触发函数执行，将循环的item值作为参数通过$emit向父组件发射事件，传递参数，并且在methods中调用vuex中的更新历史记录方法。给删除图标绑定删除事件，并操作vuex状态中的方法，实时更新历史记录操作。

​      **cinemaSearchData组件**：

​                   功能：主要实现根据影院查询结果数据渲染组件

​                   具体步诹：通过引入content公共组件，在该组件插槽内显示查询到的影院数据并渲染，

​                  接收父组件传过来的cinemaList对象，然后在计算属性中处理所需数据，在结构中通过循环绑定渲染影院列表数据。其中如果数据大于3条，则用截取的方法，截取0-max数据，重点：通过watch监听传过来的值是否变化。变化了则将有些定义的状态初始化。接收子组件传过来的参数，是true还是false。来决定全部显示还是部分显示。

​         **movieSearchData组件**：实现电影查询结果数据渲染组件

​                  内部实现具体过程和cinemaSearchData组件类似

​          **content组件**：它是抽离的一个公共组件，方便多次复用，

​           具体步诹：在组件内部，定义一个插槽，方便在不同的组件中复用，接收由cinemaSearchData或者movieSearchData组件传来的数据，进行渲染显示。结构分为标题部分，内容部分和点击查看更多三块，标题根据父组件传过来的值title来动态渲染，点击查看部分根据父组件传过来的tips属性，如果传的有值则渲染，如果没有通过v-if控制显示与隐藏。然后给点击查看更多元素添加绑定点击事件。通过控制一个bool值发送一个事件给到父组件，从而来决定是全部显示，还是只显示部分。

​               

​         

​    

​       

​          

​         

​                     

​          

​          













​    