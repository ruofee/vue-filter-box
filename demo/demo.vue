<template>
  <div class="demo">
    <div class="box">
      <h3 class="box-title">Props:</h3>
        <checkbox v-model="mode" label="vertical">垂直布局</checkbox>
        <checkbox v-model="loading" label="loading">加载状态</checkbox>
        <checkbox v-model="disabled" label="disabled">禁用状态</checkbox>
        <checkbox v-model="hiddenColon" label="hiddenColon">隐藏冒号</checkbox>
        <checkbox v-model="footerOneLine" label="footerOneLine">底部栏独占一行</checkbox>
    </div>
    <vue-filter-box
      v-model="value"
      :rules="rules"
      :model="model"
      :disabled="disabled"
      :loading="loading"
      :hidden-colon="hiddenColon"
      :mode="mode ? 'vertical' : 'horizontal'"
      :footer-one-line="footerOneLine"
      :min-width="250"
      width="20%">
      <template v-slot:footer="{ validate, reset, validateField }">
        <div>
          <i-button class="footer-button" type="primary" @click="validate(onSubmit)">提交</i-button>
          <i-button class="footer-button" @click="reset">重置</i-button>
          <i-button class="footer-button" @click="validateField('roleType', onSubmit)">提交</i-button>
        </div>
      </template>
    </vue-filter-box>
    <div class="box">
      <h3 class="box-title">Select value:</h3>
      <pre class="box-code">{{ value }}</pre>
    </div>
  </div>
</template>

<script>
import { CheckboxGroup } from 'view-design';
import { VueFilterBox } from '../packages/index';
import CustomizeSwitch from './CustomizeSwitch.vue';

export default {
  name: 'Demo',
  components: {
    VueFilterBox,
  },
  data() {
    return {
      mode: false,
      loading: false,
      disabled: false,
      hiddenColon: false,
      footerOneLine: false,

      value: {},
      rules: {
        roleType: [{ required: true, message: 'This field is required.' }],
      },
      model: [
        {
          type: 'i-input',
          label: 'Search',
          key: 'keyword',
          props: {
            placeholder: 'Please Input Keyword',
          },
        },
        {
          type: 'iSelect', // iSelect ISelect
          label: 'Role Type',
          key: 'roleType',
          rules: {
            required: true,
          },
          props: {
            placeholder: 'Please Select Role type',
          },
          options: [
            {
              label: '1',
              value: '1',
            },
            {
              label: '2',
              value: '2',
            },
            {
              label: '3',
              value: '3',
            },
            {
              label: '4',
              value: '4',
            },
          ],
        },
        {
          type: CheckboxGroup,
          label: 'Required',
          key: 'required',
          options: [
            {
              label: '1',
              value: '1',
            },
            {
              label: '2',
              value: '2',
            },
            {
              label: '3',
              value: '3',
            },
            {
              label: '4',
              value: '4',
            },
          ],
        },
        {
          type: CustomizeSwitch,
          label: 'Gender',
          key: 'gender',
        },
      ],
    };
  },
  methods: {
    onSubmit(valid) {
      console.log('valid', valid);
    }
  },
}
</script>

<style lang="less" scoped>
.demo {
  padding: 10px;
  .box {
    margin-bottom: 20px;
    .box-title {
      margin-bottom: 8px;
    }
    .box-code {
      padding: 10px;
      width: 30%;
      min-width: 400px;
      background-color: #eee;
      border-radius: 4px;
    }
  }
  .footer-button {
    margin-left: 8px;
    &:first-child {
      margin-left: 0;
    }
  }
}
</style>
