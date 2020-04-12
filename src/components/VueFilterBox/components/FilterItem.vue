<template>
  <div class="filter-item">
    <span
      v-if="label"
      class="title"
      :style="{
        width: labelWidth ? `${labelWidth}px` : 'auto',
        fontSize: fontSize || 'inherit'
      }">{{label}}</span>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      label: String,
      labelWidth: Number,
      fontSize: String
    }
  }
</script>

<style lang="less" scoped>
  .filter-item {
    margin-bottom: 8px;

    .title:after {
      content: ':';
    }

    .title {
      flex-shrink: 0;
      margin-right: 4px;
      margin-left: 8px;
    }
  }
</style>