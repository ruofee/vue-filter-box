/**
  * @props value 传出对象 [Object]
  * @props items 动态筛选器构建数组 [Array]
  *     item 基本属性 [Object]
  *         type 类型 [String]
  *             input 输入框
  *             select 选择器
  *             datepicker 时间选择器
  *             cascader 级联下拉框
  *         key 传出键值 [String]
  *         title 标题文本 [String]
  *         width 宽度 [String]
  *         minWidth 最小宽度, 当行宽小于minWidth时自动换行 [String]
  *         extend 拓展属性 [Object]
  * @props size 组件大小 [String]
  *     large 大
  *     default 默认
  *     small 小
  * @props confirm 筛选按钮基本属性 [Object]
  *     title 文本 [String]
  *     type 按钮类型 [String]
  *         primary
  *         default
  *         dashed
  *         text
  *         success
  *         warning
  *         error
  *         info
  *     isNotFull 是否不占用一行 [Boolean]
  *     extend 拓展属性 [Object]
  * @props loading loading状态 [Boolean]
  * @event on-click 点击筛选事件, 返回值为当前所选筛选项
  * @slot footer 自定义底部 [插槽]
  *     注意:
  *         footer会导致confirm部分属性不生效, 因为设置footer就意味着失去默认的按钮, 相应的, on-click也会失效
*/

<script>
  import FilterItem from './components/FilterItem'
  export default {
    name: 'VueFilterBox',
    props: {
      value: {
        type: Object,
        default() {
            return {}
        }
      },
      items: {
        type: Array,
        default() {
            return []
        }
      },
      size: {
        default: 'default',
        validator(value) {
          return ['small', 'default', 'large'].includes(value)
        }
      },
      confirm: {
        type: Object,
        default() {
            return {}
        }
      },
      loading: {
        type: Boolean,
        default: false
      }
    },
    components: {
      FilterItem
    },
    data() {
      return {
        componentMap: {
          input: item => {
            const {title = '', key, extend = {}} = item
            if (!this.isExist(this.value[key])) {
              this.$set(this.value, key, '')
            }
            return (
              <Input
                  class="item-component"
                  size={this.size}
                  placeholder={`请输入${title}`}
                  value={this.value[key]}
                  on-on-change={event => this.onChange(event.target.value, key)}
                  {...extend} />
            )
          },
          select: item => {
            const {title = '', key, options = [], extend = {}} = item
            if (!this.isExist(this.value[key])) {
              if (extend.props && extend.props.multiple) {
                this.$set(this.value, key, [])
              }
              else {
                this.$set(this.value, key, '')
              }
            }
            return (
              <Select
                class="item-component"
                size={this.size}
                placeholder={`请选择${title}`}
                value={this.value[key]}
                on-on-change={value => this.onChange(value, key)}
                {...extend}>
                {
                  options.map(option => {
                    const {value, label} = option
                    return (
                      <Option value={value}>
                        {label}
                      </Option>
                    )
                  })
                }
              </Select>
            )
          },
          datepicker: item => {
            const {title = '', key, extend = {}} = item
            const format = (extend.props && extend.props.format) ? extend.props.format : 'YYYY-MM-DD'
            if (!this.isExist(this.value[key])) {
              const type = (extend.props && extend.props.type) ? extend.props.type : 'date'
              if (/range/.test(type)) {
                this.$set(this.value, key, [])
              }
              else {
                this.$set(this.value, key, '')
              }
            }
            return (
              <DatePicker
                class="item-component"
                size={this.size}
                placeholder={`请选择${title}`}
                value={this.value[key]}
                on-on-change={value => this.onChange(value, key)}
                {...extend}>
              </DatePicker>
            )
          },
          cascader: item => {
            const {title = '', key, options = [], extend = {}} = item
            if (!this.isExist(this.value[key])) {
              this.$set(this.value, key, [])
            }
            return (
              <Cascader
                class="item-component"
                size={this.size}
                placeholder={`请选择${title}`}
                value={this.value[key]}
                on-on-change={value => this.onChange(value, key)}
                data={options}
                {...extend}>
              </Cascader>
            )
          }
        },
        fontSizeMap: {
          'small': 12,
          'default': 13,
          'large': 16
        },
        labelWidthMap: {
          'small': 6.5,
          'default': 7,
          'large': 8.5
        }
      }
    },
    methods: {
      isExist(value) {
        return !!(value === 0 || value)
      },
      getLabelWidth(str) {
        /**
        * 根据字符长度设置宽度, 汉字为2个单位, 字母为1个单位
        */
        const fontSize = this.labelWidthMap[this.size] || 7 // 文本字体大小
        const colon = 5 // 冒号的大小
        let len = 0
        for (let i = 0; i < str.length; i++) {
          let charAt = str.charAt(i)
          const regExpChinese = /[^\x00-\xff]/ig
          const regExpCapital = /[A-Z]/
          if (regExpChinese.test(charAt) || regExpCapital.test(charAt)) {
            len += 2
          }
          else {
            len += 1
          }
        }
        return len * fontSize + colon
      },
      renderComponent(item) {
        const {title = '', type, width = 'auto', minWidth = 'unset'} = item
        if (this.componentMap[type]) {
          const labelWidth = this.getLabelWidth(title)
          return (
            <FilterItem
              class="filter-item"
              style={{
                width,
                minWidth
              }}
              label={title}
              label-width={labelWidth}
              font-size={`${this.fontSizeMap[this.size]}px`}>
              {
                this.componentMap[type] && this.componentMap[type](item)
              }
            </FilterItem>
          )
        }
      },
      onChange(value, key) {
        this.$set(this.value, key, value)
      },
      search() {
        this.$emit('on-click', this.value)
      }
    },
    render() {
      const {items, size, confirm = {}, loading = false} = this
      const footer = this.$slots.footer
      return (
        <div class="dynamic-filter">
          {
            [
              ...items.map(item => {
                return (
                    this.renderComponent(item)
                )
              }),
              footer ? (
                <FilterItem class={{
                    'filter-item': true,
                    'filter-item-full': !confirm.isNotFull
                }}>
                    {
                        footer
                    }
                </FilterItem>
              ) : (
                <FilterItem class={{
                    'filter-item': true,
                    'filter-item-full': !confirm.isNotFull
                }}>
                    <Button
                        type={confirm.type || 'primary'}
                        size={size}
                        onClick={this.search}
                        {...confirm.extend}>
                        {confirm.title || '筛选'}
                    </Button>
                </FilterItem>
              )
            ]
          }
          {
            loading ? (<Spin size="large" fix></Spin>) : null
          }
        </div>
      )
    }
  }
</script>

<style lang="less" scoped>
  .dynamic-filter {
    position: relative;
    margin-top: 0;
    margin-bottom: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 10px 0;
    .filter-item {
      display: flex;
      align-items: center;
      margin-right: 0;
      .item-component {
          flex-grow: 1;
      }
    }
    .filter-item-full {
      flex-grow: 1;
      justify-content: flex-end;
    }
  }
</style>