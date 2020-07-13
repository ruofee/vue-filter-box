<template>
    <div class="form-wrap">
      <vue-filter-box ref="filterBox" :model="items" :value="filterValue" button-hide @on-search="onSearch">
        <div slot="footer"><Button type="primary" @click="searchWrap">搜索</Button></div>
      </vue-filter-box>
    </div>
</template>

<style lang="less" scoped>
  .form-wrap {
    padding: 20px;
  }
</style>

<script>
  import {VueFilterBox} from '@/components/index.js'
  export default {
    name: 'App',
    components: {
      VueFilterBox
    },
    data() {
      return {
          items: {
            input: {
              component: 'Input',
              title: '输入框',
              width: '200px'
            }
          },
          filterValue: {}
      }
    },
    methods: {
      searchWrap() {
        this.$refs.filterBox.onSearch()
      },
      onSearch(value) {
        console.log(value)
      }
    }
  }
</script>