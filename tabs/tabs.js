
//Vue.component('tabs',{
//	template: "\
//	<div class='tabs'>\
//		<div class='tabs-bar'>\
//			<div\
//				:class='tabCls(item)'\
//				v-for='(item, index) in navList'\
//				@click='handleChange(index)'>\
//					{{item.label}}\
//		</div>\
//		<div class='tabs-content'>\
//			<slot></slot>\
//		</div>\
//	</div>",
//	props: {
//		value: { type: [String, Number] }
//	},
//	data: function () {
//		return {
//			navList: [],
//			currentValue:this.value
//		};
//	},
//	methods: {
//		tabCls:function(item) {
//			return [
//				"tabs-tab",
//				{
//					'tabs-tab-active': item.name === this.currentValue
//				}
//			]
//		},
//		getTabs() {

//			//通过遍历组件得到所有的pane组件
//			return this.$children.filter(function (item) {
//				return item.$options.name === 'pane';
//			})
//		},
//		updateNav() {
//			this.navList = [];

//			var _this = this;
//			this.getTabs().forEach(function (pane, index) {
//				_this.navList.push({
//					label: pane.label,
//					name: pane.name || index
//				});

//				//如果没有给pane设置name，默认设置索引
//				if (!pane.name) pane.name = index;

//				//设置当前选中的Tab索引
//				if (index === 0) {
//					if (!_this.currentValue) {
//						_this.currentValue = pane.name || index;
//					}
//				}

//			});
//			this.updateStatus();
//		},
//		updateStatus() {
//			var tabs = this.getTabs();
//			var _this = this;

//			//显示当前选中的tab对应的pane组件，隐藏没选中的
//			tabs.forEach(function (tab) {
//				return tab.show = tab.name === _this.currentValue;
//			})
//		},
//		handleChange:function(index) {
//			var nav = this.navList[index];
//			var name = nav.name;

//			this.currentValue = name;
//			this.$emit('input', name);
//			this.$emit('on-click', name);
//		},
//		watch: {
//			value:function(val) {
//				this.currentValue = val;
//			},
//			currentValue() {
//				this.updateStatus();
//			}
//		}
//	}
//})


var tabs = {
	template: '\
  <div class="tabs">\
      <div class="tabs-bar">\
        <div\
          :class="tabCls(item)"\
          v-for="(item, index) in navList"\
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
			navList: [],
			currentValue: this.value
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
		getTabs:function() {

			//通过遍历组件得到所有的pane组件
			return this.$children.filter(function (item) {
				return item.$options.name === 'pane';
			})
		},
		updateNav:function() {
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
		updateStatus:function() {
			var tabs = this.getTabs();
			let _this = this;

			//显示当前选中的tab对应的pane组件，隐藏没选中的
			tabs.forEach(function (tab) {
				return tab.show = tab.name === _this.currentValue;
			})
		},
		handleChange: function (index) {
			var nav = this.navList[index];
			var name = nav.name;

			this.currentValue = name;
			this.$emit('input', name);
			this.$emit('on-click', name);
		},
		watch: {
			value: function (val) {
				this.currentValue = val;
			},
			currentValue() {
				this.updateStatus();
			}
		}
	}
}

Vue.component('tabs', tabs);