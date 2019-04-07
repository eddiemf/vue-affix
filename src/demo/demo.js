import Vue from 'vue';
import Scrollactive from 'vue-scrollactive';
import Plugin from '../vue-affix';
import './main.css';

Vue.use(Plugin);
Vue.use(Scrollactive);

const app = new Vue({
  el: '#app',
});

export default app;
