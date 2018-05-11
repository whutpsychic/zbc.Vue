
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import App from './app.vue';

Vue.use(VueRouter);
Vue.use(Vuex);

const Routers = [
	{
		path: "/index",
		component: (resolve) => require(['./views/index.vue'], resolve)
	},
	{
		path: "/about",
		component: (resolve) => require(['./views/about.vue'], resolve)
	},
	{
		path: '/user/:id',
		component: (resolve) => require(['./views/user.vue'], resolve)
	},
	{
		path: "*",

		//其他的东西给你重新定位至index目录
		redirect:"/index"
	}
]

const RouterConfig = {

	mode: "history",
	routes: Routers
}

const router = new VueRouter(RouterConfig);

//vuex
const store = new Vuex.Store({
	state: {
		count: 0
	}
})









var app = new Vue({
	el: '#app',
	router: router,
	store:store,
	render: h => { return h(App) }
})

