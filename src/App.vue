<template>
  	<div id="app">
    	<BannerRotator />
  	</div>
</template>

<script>
import BannerRotator from './components/BannerRotator.vue'

export default {
  	name: 'App',
  	components: {
    	BannerRotator
  	}
}
</script>

<style lang="scss">
	body {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
		background-color: #ECEFF1;
	}

	#app {
		height: 100vh;
		width: 100%;
		display: flex;
		align-items: center;
	}	
</style>
