<style scoped="">

	button{
	color:#000;
	padding:4px 8px;
	font-size:24px;
	}
	
	button.active{
	position:relative;
	top:1px;
	left:1px;
	}
</style>

<template>
	<button @click="click">{{name}}</button>
</template>

<script>
	export default{
	data:function(){
return{name:"xxx"}		
	},
	methods:{
		click(e){
			console.log('你点击了按钮');
		},
		getText(){
	
		}
	},
	mounted:function(){
		this.getText();
	}
}

</script>


