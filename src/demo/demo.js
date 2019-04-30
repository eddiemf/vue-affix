import Vue from 'vue';
import Scrollactive from 'vue-scrollactive';
import Plugin from '../vue-affix';
import './main.css';

Vue.use(Plugin);
Vue.use(Scrollactive);

const app = new Vue({
  el: '#app',
  data: {
    showMore: true,
  },
  methods: {
    toggleContent() {
      this.showMore = !this.showMore;
      // We currently do not watch size of the affix the end user
      // should call on scroll to update the affix
      Vue.nextTick(() => {
        this.$refs.scrollAffix.onScroll();
      });
    },
  },
});

export default app;
