
//全局注册组件
Vue.component('my-component', {

  //选择项
  //组件模板
  template:"<div class='component1'>{{ msg + warningText }}</div>",

  //组件数据(必须是一个 function 类型，并且把要装载的数据 return 出去)
  data: function () {
    return { msg: '模板一的内容' };
  },

  //优先级高于 data, (只要声明了props,则不管组件 props，有没有msg属性，都将视msg为props传的值)
  //props 如果是经过 v-bind 的话，则可以识别多种数据，否则只识别字符串
  props:['msg','warningText']
})



//局部注册组件
var Child = { template: "<div>这里是局部组件的内容</div>" };

var app = new Vue({
  el: '#app',
  components: {
    "session-component": Child
  }
});
/************************************************************************************/
//实验注意项:

//1.使用组件前，不论是局部组件还是全局组件，都要先声明之在调用，否则无法识别。
/************************************************************************************/

//父-->子通信
Vue.component('component2', {
  template: "<div>{{ msg }}</div>",
  props:['msg']

})

var app2 = new Vue({
  el: '#app2',
  data: {
    message:""
  }
})

/************************************************************************************/

//组件通信(自定义事件)子-->父通信
//用得完全就是自己的数据,与父亲毫无关系
//
var component3 = {
  template: "\
    <div>\
      <span>{{ total }}</span>\
      <button @click='handleIncrease'>+1</button>\
      <button @click='handleReduce'>-1</button>\
    </div >",
  data: function () {
    return { total: 0 };
  },
  methods: {
    handleIncrease: function () {
      console.log('enter func "handleIncrease"');
      this.total++;

      //执行完成后调用父组件名为 increase 的"v-on"自定义方法，并且把此时的 this.count 作为第一个参数传过去
      this.$emit('increase', this.total);
    },
    handleReduce: function () {
      console.log('enter func "handleReduce"');
      this.total--;

       //执行完成后调用父组件名为 reduce 的"v-on"自定义方法，并且把此时的 this.count 作为第一个参数传过去
      this.$emit('reduce', this.total);
    },
  }
}

var app3 = new Vue({
  el: '#app3',
  components: {
    component3: component3
  },
  methods: {
    handleGetTotal: function (x) {
      console.log('enter func "handleGetTotal"',x);
    }
  }
})

/************************************************************************************/

//非父子组件数据沟通（可以隔任意层）
var bus = new Vue();

var component4 = {
  template: "\
  <div>\
    <button @click='cFn4'>xxxxx</button>\
  </div >",
  methods: {
    cFn4: function (e) {
      console.log('进入组件4内部函数');
      bus.$emit("fromC4",e.target.innerHTML);
    }
  }
}

var app4 = new Vue({
  el: "#app4",
  data: {
    message:"eee"
  },
  components: {
    component4: component4
  },
  mounted: function(){
    var _this = this;
    bus.$on('fromC4', function (msg) {
      console.log('进入组件四bus监听函数',msg)
      _this.message = msg;
    })
  }
})


















//setTimeout(function () { app2.message = "hehe"; }, 3000);









