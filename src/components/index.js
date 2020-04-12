import FilterBox from './VueFilterBox'

export const VueFilterBox = FilterBox

export default {
  install(Vue) {
    Vue.component(FilterBox.name, FilterBox)
  }
}
