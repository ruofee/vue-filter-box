<template>
  <div class="customize-switch">
    <div
      :class="{
        'selected-block': option.value === _value,
        'block': true
      }"
      v-for="option of options"
      :key="option.value"
      @click="setStatus(option.value)">
      {{ option.label }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomizeSwitch',
  props: {
    value: Boolean,
  },
  computed: {
    _value: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
  data() {
    return {
      options: [
        { label: '开', value: true },
        { label: '关', value: false }
      ],
    };
  },
  methods: {
    setStatus(status) {
      this._value = status;
    },
  },
}
</script>

<style lang="less" scoped>
  .customize-switch {
    display: inline-block;
    border: 1px solid #dddee2;
    border-radius: 4px;
    .selected-block {
      color: #2d8bf0;
    }
    .block {
      display: inline-block;
      padding: 8px 20px;
      font-size: 14px;
      line-height: 18px;
      border-left: 1px solid #dddee2;
      cursor: pointer;
      &:first-child {
        border-left: none;
      }
    }
  }
</style>
