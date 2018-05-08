
Vue.component("zbc", {
	template: "\
	<div>\
		<slot>\
			<p>如果父组件没有写入任何内容，则显示此条数据</p>\
			<span>如果父组件没有写入任何内容，则显示此条数据</span>\
			<div>如果父组件没有写入任何内容，则显示此条数据</div>\
		</slot>\
	</div>"
})

Vue.component("zbc2", {
	template: "\
	<div class='container'>\
		<div class='header'>\
			<slot name='header'></slot>\
		</div>\
		<div class='main'>\
			<slot></slot>\
		</div>\
		<div class='footer'>\
			<slot name='footer'></slot>\
		</div>\
	</div>"
})

//作用域插槽
Vue.component("zbc3", {

	template: "\
	<ul>\
		<slot \
			name='book'\
			v-for='book in books'\
			:book-name='book.name'>\
		></slot>\
	</ul>",
	props: {
		books: {
			type: Array,
			default: function () { return [];}
		}
	}

})


var app = new Vue({
	el: "#app",
	data: {
		books: [
			{name:'《Vue.js实战》'},
			{name:'《Vue.js实战2》'},
			{name:'《Vue.js实战3》'}
		]
	}
})




