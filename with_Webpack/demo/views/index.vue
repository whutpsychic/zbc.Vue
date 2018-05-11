<style scoped="">

	div{
	color:#389edc;
	font-size:24px;
	}
	
	p{
	cursor:pointer;
	}
</style>

<template>
	<div>
		<div>首页</div>
		<router-link to="/about" tag="div">跳转到about</router-link>
		<router-link to="/about" tag="div" replace>跳转到about(不能后退)</router-link>
		<p @click="jumpTo">手动跳转</p>
	</div>
</template>

<script>
	
	export default{
methods:{
jumpTo(){
this.$router.push('/about')
}
}

	}

</script>


