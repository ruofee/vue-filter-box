import FilterBox from './index.vue';

export const VueFilterBox = FilterBox;

export default {
  install(Vue) {
    Vue.component(FilterBox.name, FilterBox);
  },
}
