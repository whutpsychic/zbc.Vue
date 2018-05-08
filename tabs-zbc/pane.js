//定义一个开始时会log所有属性的命令
Vue.directive("log", {
	bind: function (item) {
		//for (i in item) {
		//	console.log(i)
		//}
	}
})

var pane = {
	name: 'pane',
	template: "\
	<div class='pane' v-show='show'>\
			<slot></slot>\
	</div>",
	props: {
		name: { type: String },
		label: { type: String, default: '' },
		closable: { type: Boolean }
	},

	//设置初始值
	data: function () {
		return { show: true };
	},
	methods: {
		updateNav: function () {
			this.$parent.updateNav();
		}
	},
	mounted() {
		this.updateNav();
		//console.log('pane 子组件加载完成，现在加载的是第' + this.name + '个 pane 的内容');
	}
}

Vue.component('pane', pane);
