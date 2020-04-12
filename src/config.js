export default class Config {
  static createFilterItems(context) {
    return [
      {
        title: '输入框1',
        key: 'input1Key',
        type: 'input',
        minWidth: '20%'
      },
      {
        title: '输入框2',
        key: 'input2Key',
        type: 'input',
        minWidth: '20%'
      },
      {
        title: '下拉框1',
        key: 'select1Key',
        type: 'select',
        minWidth: '20%',
        options: [
          {
            label: '选项1',
            value: 1
          },
          {
            label: '选项2',
            value: 2
          }
        ]
      },
      {
        title: '下拉框2',
        key: 'select2Key',
        type: 'select',
        minWidth: '20%',
        options: [
          {
            label: '选项1',
            value: 1
          },
          {
            label: '选项2',
            value: 2
          }
        ]
      },
      {
        title: '级联下拉框',
        key: 'CascaderKey',
        type: 'cascader',
        minWidth: '20%',
        options: [
          {
            label: '选项1',
            value: 1,
            children: [
              {
                label: '选项3',
                value: 3
              }
            ]
          },
          {
            label: '选项2',
            value: 2
          }
        ]
      },
      {
        title: '时间选择器',
        key: 'datepickerKey',
        type: 'datepicker',
        minWidth: '40%',
        extend: {
          props: {
            type: 'daterange'
          }
        }
      },
    ];
  }
}