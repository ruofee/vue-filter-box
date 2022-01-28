<template>
  <component :is="componentIs" />
</template>

<script>
export default {
  name: 'LabelRender',
  props: {
    render: {
      type: Function,
    },
  },
  computed: {
    componentIs() {
      return {
        render: this.render,
      };
    }
  },
}
</script>
