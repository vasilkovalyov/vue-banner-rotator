<template>
	<section class="section-banner">
		<div class="section-banner__image" :style="`background-image: url(${bannerImg})`"></div>
	</section>
</template>

<script>

import axios from 'axios'

export default {
	name: 'BannerRotator',

	data: () => ({
		banners: [],
		counter: 0,
		bannerImg: null
	}),

	methods: {
		insreaseCounter(payload) {
            this.counter += payload;
        },

        counterReset() {
            this.counter = 0;
		},
		
		rotateBanners() {
            if (!localStorage.getItem('id-banner')) {
				localStorage.setItem('id-banner', 0);
				this.insreaseCounter(0);
            } else {
                if (localStorage.getItem('id-banner') == this.banners.length - 1) {
                    this.counterReset();
					localStorage.setItem('id-banner', 0);
					this.insreaseCounter(0);
                } else {
                    let counterFromLC = localStorage.getItem('id-banner');
					let newCounter = parseInt(counterFromLC) + 1;
					this.insreaseCounter(newCounter);
                    localStorage.setItem('id-banner', newCounter);
                }
			}
        },
	},

	async mounted() {
		const response = await axios.get('./data/banner.json');
		this.banners = response.data;
		this.rotateBanners();
		this.bannerImg = this.banners[this.counter].image_url;
	}
}

</script>

<style scoped lang="scss">
	.section-banner {
		width: 100%;
		&__image {
			background-position: center;
			background-size: cover;
			width: 100%;
			padding-top: 30vw;
		}
	}

	.container {
		max-width: 1000px;
		width: 100%;
		margin: 0 auto;
		padding: 0 15px;
	}

</style>
