<template>
  <Form class="filter" ref="filter" :model="_value" label-colon>
    <FormItem
      v-for="(modelData, key) of model"
      :style="{
        width: modelData.width || 'auto'
      }"
      :label="modelData.title"
      :required="modelData.required"
      :prop="key"
      :key="key">
      <Component
        v-model="_value[key]"
        :is="modelData.component"
        v-bind="modelData.extends || {}">
        <template v-if="haveOptionsComponents.includes(modelData.component)">
          <Option
            v-for="option of (modelData.options || [])"
            :value="option.value"
            :key="option.value">
            {{option.label}}
          </Option>
        </template>
      </Component>
    </FormItem>
    <FormItem v-if="!buttonHide">
      <Button type="primary" @click="onSearch">筛选</Button>
    </FormItem>
    <slot name="footer"></slot>
  </Form>
</template>

<style lang="less" scoped>
  .filter {
    display: flex;
    flex-wrap: wrap;

    /deep/ .ivu-form-item {
      display: flex;
      flex-shrink: 0;
      margin-bottom: 10px;

      /deep/ .ivu-form-item-label {
        flex-shrink: 0;
        padding-left: 10px;
      }

      /deep/ .ivu-form-item-content {
        flex-grow: 1;
        padding-right: 10px;

        /deep/ .ivu-form-item-error-tip {
          display: none;
        }

        /deep/ .ivu-date-picker {
          width: 100%;
        }
      }
    }
  }
</style>

<script>
  export default {
    props: {
      value: {
        type: Object,
        default() {
          return {}
        }
      },
      model: {
        type: Object,
        default() {
          return {}
        }
      },
      buttonHide: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        haveOptionsComponents: ['Select'] // 具有Options的组件
      }
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
    methods: {
      /**
       * 点击事件
       */
      onSearch() {
        this.$refs.filter.validate(valid => {
          if (valid) {
            this.$emit('on-search', this._value);
          }
        })
      }
    }
  }
</script>