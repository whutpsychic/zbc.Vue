<style scoped="">

	h1{
	color:#3399ff;
	font-size:24px;
	}
</style>

<template>
	<h1>
		<a :href="'#'+title">{{title}}</a>
	</h1>
</template>

<script>
	export default{
	props:{
	title:{type:String}
	}
	,	mounted:function(){
	}
	}

</script>


