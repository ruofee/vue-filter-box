<template>
  <component :is="getComponentIs(render)" />
</template>

<script>
export default {
  name: 'LabelExtension',
  props: {
    render: {
      type: Function,
    },
  },
  methods: {
    getComponentIs(render) {
      return {
        render,
      };
    },
  },
}
</script>
