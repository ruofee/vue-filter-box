<template>
  <div class="form-wrap">
    <div class="filter-wrap">
      <h3 class="title">筛选框:</h3>
      <vue-filter-box ref="filterBox" :model="items" :value="filterValue" size="small" button-hide @on-search="onSearch">
        <template v-slot:footer="slotProp">
          <Button type="primary" @click="slotProp.onSearch">搜索</Button>
        </template>
      </vue-filter-box>
    </div>
    <div class="show-box">
      <h3>筛选框绑定值:</h3>
      <pre>{{_filterValue}}</pre>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .form-wrap {
    padding: 20px;

    .title {
      margin-bottom: 10px;
    }

    .show-box {
      margin-top: 20px;
    }
  }
</style>

<script>
  import {VueFilterBox} from '@/components/index.js'
  import {Button} from 'view-design'
  import CustomComponent from './CustomComponent.vue'
  export default {
    name: 'App',
    components: {
      VueFilterBox,
      Button
    },
    data() {
      return {
          items: {
            input: {
              component: 'Input',
              title: '输入框',
              width: '300px',
              on: {
                'on-change': event => {
                  console.log(`输入的值为: ${event.target.value}`)
                }
              }
            },
            inputNumber: {
              component: 'InputNumber',
              title: '数字输入框',
              width: '300px'
            },
            select: {
              component: 'Select',
              title: '搜索框',
              width: '300px',
              options: [
                {label: 'option1', value: 0},
                {label: 'option2', value: 1}
              ],
              prop: {
                multiple: true
              }
            },
            date: {
              component: 'DatePicker',
              title: '日期选择器',
              width: '300px'
            },
            time: {
              component: 'TimePicker',
              title: '时间选择器',
              width: '300px'
            },
            iSwitch: {
              component: 'i-switch',
              title: '开关',
              width: '300px'
            },
            slider: {
              component: 'Slider',
              title: '滑块',
              width: '300px'
            },
            cascader: {
              component: 'Cascader',
              title: '级联选择器',
              width: '300px',
              prop: {
                data: [
                  {
                    value: 'beijing',
                    label: '北京',
                    children: [
                      {value: 'gugong', label: '故宫'}
                    ]
                  }
                ]
              }
            },
            custom: {
              component: CustomComponent,
              title: '自定义组件',
              width: '300px'
            }
          },
          filterValue: {
            input: '这是一个输入框',
            inputNumber: 50,
            select: [1],
            date: new Date(),
            time: '01:00:00',
            iSwitch: true,
            cascader: ['beijing', 'gugong'],
            slider: 50,
            custom: false
          }
      }
    },
    computed: {
      _filterValue() {
        try {
          return JSON.stringify(this.filterValue, null, 2)
        }
        catch(err) {
          return ''
        }
      }
    },
    methods: {
      onSearch(value) {
        this.$Modal.success({
          render: h => h('pre', this._filterValue)
        })
      }
    }
  }
</script>