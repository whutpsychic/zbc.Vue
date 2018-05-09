<style scoped="">

	div{
	color:#389edc;
	font-size:24px;
	}
</style>

<template>
	<div>
		<div>Hellow</div>

		<v-title title="Vue组件化"></v-title>

		<v-button>按钮</v-button>


	</div>
</template>

<script>
	
	import vTitle from './title.vue';
	import vButton from './btn.vue';
	
	
	
	export default{
	components:{
	vTitle,vButton
	}


	}

</script>


