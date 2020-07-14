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
        v-bind="modelData.prop || {}"
        v-on="modelData.on || {}">
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
    <Spin fix v-if="loading">
      <Icon type="ios-loading" :size="23" class="loading"></Icon>
    </Spin>
    <slot name="footer"></slot>
  </Form>
</template>

<style lang="less" scoped>
  .filter {
    position: relative;
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
  .loading{
    animation: loading-spin 1s linear infinite;
  }
  @keyframes loading-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
  }
</style>

<script>
  import 'view-design/dist/styles/iview.css' // 引入view-design css样式
  import {Input, Select, Option, Form, FormItem, Button} from 'view-design' // 引入view-design组件
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
      loading: {
        type: Boolean,
        default: false
      },
      buttonHide: {
        type: Boolean,
        default: false
      }
    },
    components: {
      Input,
      Select,
      Option,
      Form,
      FormItem,
      Button
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
            this.$emit('on-search', this._value)
          }
        })
      }
    }
  }
</script>