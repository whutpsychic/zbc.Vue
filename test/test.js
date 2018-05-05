
var controllerData = {
	name: 'Vue.js',
	link: "<a href='http://www.baidu.com' target='blank'>Baidu</a>",
	url:"http://www.sina.com",

	show: true,
	text: "hehe",
	num1: 10,
	num2: 78,
  num3: 987,

  //v-bind data
  cls1: true,
  cls2: false,
  cls3: false,

  //
  status: 1,

  ifshow: false,
  ifshowText:"点击以显示循环指令演示样本",
  books: [
    { name: "《Vue实战教学》", extraText: "zbc 著" },
    { name: "《深入浅出React》", extraText: "zbc 著" },
    { name: "《揭秘CSS3》", extraText: "zbc 著" }
  ],

  //template Data
  templateObj: {
    name: "zbc",
    sex: "male",
    age: "25"
  },

  //form Data
  R1: false,

  R2: 'r2',

  R3_1: false,
  R3_2: false,
  R3_3: true,

  selector: "js",

  lazyMsg: "",
  numberMsg: "",
  trimMsg: "",




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
    },
    toggleBtnCls: function () {
      if (this.cls1 === true) { this.cls1 = false; this.cls2 = true; this.cls3 = false; }
      else if (this.cls2 === true) { this.cls1 = false; this.cls2 = false; this.cls3 = true; }
      else if (this.cls3 === true) { this.cls1 = true; this.cls2 = false; this.cls3 = false; }
      //console.log('你点击了一次切换按钮类名的按键');
      //console.log(this.cls1, this.cls2, this.cls3);
    },
    toggleStatus: function () {
      if (this.status === 1) { this.status = 2; }
      else if (this.status === 2) { this.status = 3; }
      else { this.status = 1; }
      //console.log(this.status);
    },
    showFor: function () {
      if (this.ifshow === true) { this.ifshow = false; this.ifshowText = "点击以显示循环指令演示样本" }
      else { this.ifshow = true; this.ifshowText = "收起"};
    },

    clickFn2: function (x) {
      console.log(x);
      console.log(typeof x)
    },

    submit1: function () {
      let f1 = document.getElementById('form1');
      for (let i = 0; i < f1.children.length; i++) {
        if (f1.children[i].nodeName === "INPUT")
          console.log(f1.children[i].checked)
      }
      console.log(f1.value)
    },

    submit2: function () {
      let f2 = document.getElementById('form2');
      for (let i = 0; i < f2.children.length; i++) {
        if (f2.children[i].nodeName === "INPUT")
          console.log(f2.children[i].checked)
      }
      console.log(f2.value)
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