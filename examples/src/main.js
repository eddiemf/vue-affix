import Affix from '../../dist/vue-affix.js';
import Scrollactive from 'vue-scrollactive';

Vue.use(Affix);
Vue.use(Scrollactive);

const app = new Vue({
	el: '#app',

    methods: {
        condition() {
            if (window.innerWidth >= 1200) return true;
            return false;
        }
    }
});
