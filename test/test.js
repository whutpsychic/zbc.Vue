
var controllerData = {
	name: '',
	link: "<a href='http://www.baidu.com' target='blank'>Baidu</a>",
	url:"http://www.sina.com",

	show: true,
	text: "hehe",
	num1: 10,
	num2: 78,
	num3: 987

};



var app = new Vue({
	el: '#app',
	data: controllerData,

	//放置经方法处理过后的数据
	computed: {
		resolvedText: function () {
			return this.text.split('e').join('-');
		},
		sum: function () {
			return this.toNum(this.num1) + this.toNum(this.num2) + this.toNum(this.num3);
		}
	},

	//放置固有方法
	methods: {
		clickFn: function () {
			console.log('您点击了这个按钮X');
		},
		toNum: (x) => {
			if (x === "") return 0;
			return parseInt(x);
		}
	}


	//created: function () {
	//	console.log('已创建完成');
	//},
	//mounted: function () {
	//	console.log('已挂载完成');
	//	var _this = this;
	//	this.timer = setInterval(function () {
	//		_this.date = new Date();
	//	}, 1000);
	//},
	//beforeDestroy: function () {
	//	if (this.timer) { clearInterval(this.timer) };
	//	alert('bye bye');
	//}
})

//setTimeout(function () {
//	console.log(app);
//	app.clickFn();
//}, 3000);