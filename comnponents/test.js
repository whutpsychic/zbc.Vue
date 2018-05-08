
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


//递归组件
var component5 = {

	//name属性至关重要(就用于递归)
	name: "component5",
	props: {
		countt:{type:Number,default:1}
	},
	template: "\
	<div class='child5'>\
		<component5\
			:countt='countt+1'\
			v-if='countt<4'>\
		</component5 >\
	</div >"
}

var app5 = new Vue({
	el: '#app5',
	components: {
		"component5":component5
	}
})

//动态组件
var app6 = new Vue({
	el: "#app6",
	components: {
		comA: { template: "<div>组件6A</div>" },
		comB: { template: "<div>组件6B</div>" },
		comC: { template: "<div>组件6C</div>" }
	},
	data: {
		curr:"comA"
	},
	methods: {
		changeCom: function (com) {
			this.curr = "com" + com; 
		}
	}
})

//x-template 用法
var app7 = new Vue({
	el: "#app7",
	components: {
		"component7": { template: "#component7" }
	}
})

//手动挂载实例

//初始化一个模板
var MyComponent = Vue.extend({
	template: "<div>此乃是一个手动挂载的实例的内容{{name}}</div>",
	data: function () {
		return { name: "zbc" }
	}
})

//写法一
new MyComponent().$mount("#_app");

//写法二
new MyComponent({ el: "#_app" });

//文档之外渲染并挂载
var _com = new MyComponent().$mount();
if (document.getElementById("_app"))
	document.getElementById("_app").appendChild(_com.$el);

/********************************************************************/
/********************************************************************/
/********************************************************************/
/********************************************************************/

/*真实组件开发*/
/*一个数字输入框组件*/
Vue.component('input-number',{
	template: "<div class='input-number'>\
	<input \
		:value='currValue'\
		@change='handleChange'\
		@keydown='handleKeyinput'/>\
	<button \
		@click='handleDown'\
		:disabled='currValue<=min'>-</button>\
	<button \
		@click='handleUp'\
		:disabled='currValue>=max'>+</button>\
	</div>",
	props: {
		max: { type: Number, default: Infinity },
		min: { type: Number, default: -Infinity },
		value: { type: Number, default: 0 }
	},
	data: function () {
		return { currValue: this.value };
	},

	//????
	//监听回调函数
	watch:{
		currValue: function (val) {
			this.$emit('input', val);
			this.$emit('on-change', val);
		},
		value: function (val) {
			this.updateValue(val);
		}
	},


	methods: {
		updateValue: function (val) {
			if (val > this.max) val = this.max;
			if (val < this.min) val = this.min;
			this.currValue = val;
		},
		isNumber: function (v) {
			//return (/^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(v+'');
			return (/^[0-9]+.?[0-9]*$/).test(v);
		},
		handleDown: function () {
			if (this.currValue <= this.min) return;
			this.currValue -= 1;
		},
		handleUp: function () {
			if (this.currValue >= this.max) return;
			this.currValue += 1;
		},
		handleChange: function (e) {
			var val = e.target.value.trim();
			var max = this.max;
			var min = this.min;

			if (this.isNumber(val)) {
				val = Number(val);
				this.currValue = val;

				if (val > max) {
					this.currValue = max;
				}
				else if (val < min) {
					this.val = min;
				}
				else {
					e.target.value = (this.currValue);
				}
			}
			else {
				e.target.value = NaN;
			}
			//this.input();
			//this.onChange();
		},
		//自定义函数
		input: function (v) {
			console.log('进入input自定义函数', v);
		},
		onChange: function (v) {
			console.log('进入onChange自定义函数', v);
		},

		//添加事件
		handleKeyinput: function (e) {

			console.log(parseInt(e.target.value, 10))
			//加法操作
			if (e.keyCode === 107) {
				if (parseInt(e.target.value, 10) < this.max) this.handleUp();
				else {
					e.target.value = this.max;
				};
			}

			//减法操作
			else if (e.keyCode === 109) {
				if (parseInt(e.target.value, 10) > this.min) this.handleDown();
				else {
					e.target.value = this.min;
				};
			}

		},

	},
	mounted: function () {
		this.updateValue(this.value);
	}
})

var input = new Vue({
	el: "#component1",
	data: {
		value:5
	}
})


/********************************************************************/

Vue.component('pane', {
	name: 'pane',
	template: "\
	<div class='pane' v-show='show'>\
			<slot></slot>\
	</div>",
	data: function () {
		return { show: true };
	},
	props: {
		name: { type: String },
		label: { type: String, default: '' }
	},
	methods: {
		updateNav() {
			this.$parent.updateNav();
		},

	},
	watch: {
		label() {
			this.updateNav();
		}
	},
	mounted() {
		this.updateNav();
	}
})

Vue.component('tabs',{
	template: "\
	<div class='tabs'>\
		<div class='tabs-bar'>\
			<div\
				:class='tabCls(item)'\
				v-for='(item, index) in navList'\
				@click='handleChange(index)'>\
					{{item.label}}\
		</div>\
		<div class='tabs-content'>\
			<slot></slot>\
		</div>\
	</div>",
	props: {
		value:[String,Number]
	},
	data: function () {
		return {
			navList: [],
			currentValue:this.value
		};
	},
	methods: {
		tabCls(item) {
			return ["tabs-tab", {
				'tabs-tab-active': item.name === this.currentValue
			}]
		},
		handleChange(index) {
			var nav = this.navList[index];
			var name = nav.name;

			this.currentValue = name;
			this.$emit('input', name);
			this.$emit('on-click', name);
		},
		watch: {
			value(val) {
				this.currentValue = val;
			},
			currentValue() {
				this.updateStatus();
			}
		},
		getTabs() {

			//通过遍历组件得到所有的pane组件
			return this.$children.filter(function (item) {
				return item.$options.name === 'pane';
			})
		},
		updateNav() {
			this.navList = [];

			var _this = this;
			this.getTabs().forEach(function (pane, index) {
				_this.navList.push({
					label: pane.label,
					name: pane.name || index
				});

				//如果没有给pane设置name，默认设置索引
				if (!pane.name) pane.name = index;

				//设置当前选中的Tab索引
				if (index === 0) {
					if (!_this.currentValue) {
						_this.currentValue = pane.name || index;
					}
				}

			});
			this.updateStatus();
		},
		updateStatus() {
			var tabs = this.getTabs();
			var _this = this;

			//显示当前选中的tab对应的pane组件，隐藏没选中的
			tabs.forEach(function (tab) {
				return tab.show = tab.name === _this.currentValue;
			})
		}
	}
})




var APP2 = new Vue({
	el: "#component2",
	data: {
		activeKey:'1'
	}
})
