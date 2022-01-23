<template>
  <div class="demo">
    <div>
      <checkbox v-model="isVertical" label="vertical">is vertical</checkbox>
    </div>
    <vue-filter-box
      v-model="value"
      loading
      :hidden-colon="false"
      :mode="isVertical ? 'vertical' : 'horizontal'"
      :rules="rules"
      :model="model"
      footer-one-line>
      <template v-slot:footer="{ validate, reset, validateField }">
        <div>
          <i-button @click="validate(onSubmit)">提交</i-button>
          <i-button @click="reset">重置</i-button>
          <i-button @click="validateField('roleType', onSubmit)">提交</i-button>
        </div>
      </template>
    </vue-filter-box>
    <div>
      <p>Select Value:</p>
      <pre>{{ value }}</pre>
    </div>
  </div>
</template>

<script>
import { Select, CheckboxGroup } from 'view-design';
import { VueFilterBox } from '../packages/index';

export default {
  name: 'Demo',
  components: {
    VueFilterBox,
  },
  data() {
    return {
      isVertical: true,
      value: {},
      rules: {
        roleType: [{ required: true, message: 'qqq' }],
      },
      model: [
        {
          type: 'i-input',
          label: 'Search',
          key: 'keyword',
          rules: {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
          defaultValue: '123',
          props: {
            placeholder: 'ID / User Name',
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
            placeholder: 'Select Role type',
          },
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
              label: '2',
              value: '3',
            },
            {
              label: '2',
              value: '4',
            },
          ],
        },
        {
          type: Select,
          label: 'Gender',
          key: 'gender',
          props: {
            placeholder: 'Select Gender',
          },
          options: [
            {
              label: '1',
              value: '1',
            }
          ],
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
}
</style>
