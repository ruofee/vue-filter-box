<template>
  <div class="wrap">
    <div
      :class="{
        'selected-block': option.value === _value,
        'block': true
      }"
      v-for="option of options"
      :key="option.value"
      @click="setStatus(option.value)">
      {{option.label}}
    </div>
  </div>
</template>

<style lang="less">
  @color: #dddee2;
  @backgroundColor: #2d8bf0;
  .wrap {
    display: flex;
    border: 1px solid @color;
    border-radius: 4px;

    .selected-block {
      color: #fff;
      background-color: @backgroundColor;
    }

    .block:first-child {
      border-left: none;
    }

    .block {
      display: flex;
      justify-content: center;
      flex-grow: 1;
      border-left: 1px solid @color;
      cursor: pointer;
    }
  }
</style>

<script>
    import {Button} from 'view-design'
    export default {
      name: 'CustomComponent',
      components: {
        Button
      },
      props: {
        value: Boolean
      },
      computed: {
        _value: {
          get() {
            return this.value
          },
          set(value) {
            this.$emit('input', value)
          }
        }
      },
      data() {
        return {
          options: [
            {label: '开', value: true},
            {label: '关', value: false}
          ]
        }
      },
      methods: {
        setStatus(status) {
          this._value = status;
        }
      }
    }
</script>
