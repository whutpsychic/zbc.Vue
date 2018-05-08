﻿
var tabs = {
	template: '\
		<div class="tabs">\
      <div class="tabs-bar">\
        <div\
          v-for="(item, index) in navList"\
					:class="tabCls(item)"\
          @click="handleChange(index)">\
          {{ item.label }}\
        </div>\
      </div>\
      <div class="tabs-content">\
        <slot></slot>\
      </div>\
    </div>',
	props: {
		value: { type: [String, Number] }
	},
	data: function () {
		return {
			navList: [
				{label:'标签一',name:'0'},
				{label:'标签二',name:'1'},
				{label:'标签三',name:'2'}
			],
			currentValue: '0'
		};
	},
	methods: {
		tabCls: function (item) {
			return [
				"tabs-tab",
				{
					'tabs-tab-active': item.name === this.currentValue
				}
			]
		},
		handleChange: function (index) {
			console.log('进入tab点击事件，你点击的是第' + index + '个tab');

			var nav = this.navList[index];
			var name = nav.name;

			this.currentValue = name;
			//this.$emit('input', name);
			//this.$emit('on-click', name);
			this.updateNav()
		},
		getTabs: function () {

			//通过遍历组件得到所有的pane组件
			return this.$children.filter(function (item) {
				return item.$options.name === 'pane';
			})
		},
		updateNav: function () {
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
		updateStatus: function () {
			var tabs = this.getTabs();
			let _this = this;

			//显示当前选中的tab对应的pane组件，隐藏没选中的
			tabs.forEach(function (tab) {
				console.log(tab)
				return tab.show = tab.name === _this.currentValue;
			})
		},

		//watch: {
		//	value: function (val) {
		//		this.currentValue = val;
		//	},
		//	currentValue:function() {
		//		this.updateStatus();
		//	}
		//}
	}
	
}

Vue.component('tabs', tabs);