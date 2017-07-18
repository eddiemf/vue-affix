import Affix from '../../dist/vue-affix.js';

Vue.use(Affix);

const app = new Vue({
	el: '#app',

    methods: {
        condition() {
            if (window.innerWidth >= 1200) return true;
            return false;
        }
    }
});
