import Affix from './affix.vue';

const Plugin = {};

Plugin.install = (Vue) => {
  if (Plugin.install.installed) return;

  Vue.component('affix', Affix);
};

if (typeof window !== 'undefined' && window.Vue) {
  Plugin.install(window.Vue);
}

export default Plugin;
