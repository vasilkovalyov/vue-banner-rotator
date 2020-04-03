import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        counter: 0,
        banners: []
    },

    mutations: {
        // increase counter by 1
        insreaseCounter(store, payload) {
            store.counter += payload;
        },

        counterReset(store) {
            store.counter = 0;
        },

        setBanners(store, payload) {
            store.banners = payload;
        }
    },

    actions: {

        // get all banners
        loadBanners(store) {
            axios.get('./data/banner.json')
                .then(response => response.data)
                .then(data => {
                    store.commit('setBanners', data);
                    store.dispatch('rotateBanners', data);
                })
        },

        rotateBanners(store, banners) {
            if (!localStorage.getItem('id-banner')) {
                localStorage.setItem('id-banner', 0);
                store.commit('insreaseCounter', 0);
            } else {
                if (localStorage.getItem('id-banner') == banners.length - 1) {
                    store.commit('counterReset');
                    localStorage.setItem('id-banner', 0);
                    store.commit('insreaseCounter', 0);
                } else {
                    let counterFromLC = localStorage.getItem('id-banner');
                    let newCounter = parseInt(counterFromLC) + 1;
                    store.commit('insreaseCounter', newCounter);
                    localStorage.setItem('id-banner', newCounter);
                }
            }

        },
    },

    getters: {
        getBannerCounter(store) {
            return store.counter;
        },

        getBanners(store) {
            // console.log(store.banners);
            return store.banners;
        },

        getImage(store) {
            console.log(store.banners);
            return store.banners[store.counter];
        }
    }
})