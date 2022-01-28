# vue-filter-box

![](https://img.shields.io/npm/v/vue-filter-box.svg) ![](https://img.shields.io/npm/dt/vue-filter-box.svg) ![](https://img.shields.io/badge/language-javascript-yellow.svg)![](https://img.shields.io/badge/component-vue-green.svg)

## 介绍

vue-filter-box 是一款基于 view-design 实现的动态筛选器组件, 通过传入筛选项结构 `model`, 可以帮助你快速生成一个筛选器!

如果你使用老版本的 vue-filter-box, 请移步这里: [v2文档](/docs/v2.md)

## 快速开始

### 安装

```bash
# use npm
npm i vue-filter-box -s
# or yarn
yarn add vue-filter-box
```

### 注册

#### 全局注册

```js
import Vue from 'vue';
import ViewDesign from 'view-design';
import { VueFilterBox } from 'vue-filter-box';

import 'view-design/dist/styles/iview.css';

Vue.use(ViewDesign);
Vue.use(VueFilterBox);
```

#### 组件内注册

注意: 请提前安装并引入 view-design!

```html
<template>
	<vue-filter-box></vue-filter-box>
</template>

<script>
import { VueFilterBox } from '../packages/index';

export default {
	components: {
		VueFilterBox,
	},
};
</script>
```

## 使用

### 最简单的使用

`model` 表示筛选器结构, `value` 表示筛选器选中值:

```html
<template>
  <div>
		<vue-filter-box :value="filterValue" :model="model"><vue-filter-box>
		<pre>{{ filterValue }}</pre>
	</div>
</template>

<script>
import { VueFilterBox } from 'vue-filter-box';

export default {
	components: {
		VueFilterBox,
	},
	data() {
		return {
			model: [
				{
					type: 'i-input',
					label: 'Keyword',
					key: 'keyword',
				},
        {
          type: 'i-select',
          label: 'Type',
          key: 'type',
          options: [
            { label: 'Type1', value: 'type1' },
            { label: 'Type2', value: 'type2' },
          ],
        },
			],
			filterValue: {},
		};
	},
}
</script>
```

你也可以使用 `v-model` 来绑定 `value`, 这更加符合语义:

```html
<vue-filter-box v-model="filterValue" :model="model" ></vue-filter-box>
```

### 筛选器默认选中值

你可以通过设置 `value` 的初始值来设置筛选器的默认选中值:

```html
<template>
	<vue-filter-box :value="filterValue" :model="model">
</template>

<script>
	export default {
		data() {
			return {
				model: [
					{
						type: 'i-input',
						label: 'Keyword',
						key: 'keyword',
					},
					{
						type: 'i-select',
						label: 'Type',
						key: 'type',
						options: [
							{ label: 'Type1', value: 'type1' },
							{ label: 'Type2', value: 'type2' },
						],
					},
				],
				filterValue: {
					keyword: '初始化设置的 keyword',
				},
			};
		},
	}
</script>
```

在没有设置筛选项默认值时, vue-filter-box 可以做到一定程度的自动推导, 主要根据筛选项组件的 `props.value` 类型进行判断, 具体规则如下:

```js
// 以下是筛选项 component props:
{
	props: {
		// 默认值`为 ''
		value: String,
		// 默认取第一个类型, 因此默认值为 0
		value: [Number, String],
		// 默认值为 ''
		value: {
			type: String,
		},
		// 默认取第一个类型, 因此默认值为 0
		value: {
			type: [Number, String],
		}
	}
}
// 当 props 为数组时, 因为无法判断 value 的类型, 因此默认设置 '', 这种情况最好是主动设置 vue-filter-box 的默认值:
props: ['value']
```

举个 🌰, 当 `model` 为以下结构时:

```js
model: [
  {
    type: 'i-input',
    label: 'Keyword',
    key: 'keyword',
  },
  {
    type: 'checkbox-group',
    label: 'Type',
    key: 'type',
    options: [
      { label: 'Type1', value: 'type1' },
      { label: 'Type2', value: 'type2' },
    ],
  },
],
```

`value` 将自动推导成:

```js
{
  keyword: '',
  type: [],
}
```

### 筛选项标题

在 `modelItem` 中, 通过设置 `label` 来定义你的筛选项标题, `label` 可以是 string 类型, 也可以是 function 类型:

```html
<template>
  <vue-filter-box :model="model">
</template>

<script>
  export default {
    data() {
      return {
        model: [
          {
            type: 'i-input',
            label: 'Keyword',
            key: 'keyword',
          },
          {
            type: 'i-input',
            label: h => h('span', 'name'),
            key: 'name',
          },
        ],
      };
    },
  };
</script>
```

函数式 label 的格式为: `(h: CreateElement) => VNode`; `CreateElement` 格式具体可以查看 [vue createElement](https://cn.vuejs.org/v2/guide/render-function.html#createElement-%E5%8F%82%E6%95%B0) 😊

### 筛选项组件

在 `modelItem` 中, 通过设置 `type` 来定义你的筛选项组件: `type` 可以是 string 类型, 如 `i-select` , 或者 `i-input`, 但请确保组件已经全局注册即可; `type` 也可以是 `component` 类型:

```html
<template>
  <vue-filter-box :model="model">
</template>

<script>
  import YourFilterComponent from './your-filter-component.vue';
  export default {
    data() {
      return {
        model: [
          {
            type: YourFilterComponent,
            label: 'Keyword',
            key: 'keyword',
          },
        ],
      };
    },
  };
</script>
```

请确保你的组件可以使用 `v-model` 进行双向数据绑定!

### 筛选项宽度设置

vue-filter-box 默认每个筛选项的最大宽度为 `300px`, 你可以通过设置 `max-width` 来覆盖他:

```html
<vue-filter-box v-model="filterValue" :model="model" max-width="200px"><vue-filter-box>
```

通过设置 `width` 和 `min-width`, 可以分别设置筛选项的固定宽度和最小宽度, 值得注意的是: 设置 `width` 后, 默认的 `max-width` 将会失效, 如果你需要 `width` 和 `max-width` 一同生效, 请在设置 `width` 的同时也设置 `max-width`:

```html
<vue-filter-box v-model="filterValue" :model="model" width="20%" max-width="400px"><vue-filter-box>
```

若你需要为每个筛选项单独定制宽度, 可以在 `modelItem` 中进行定义:

```js
{
  model: [
    {
      type: 'i-input',
      label: 'Keyword',
      key: 'keyword',
      width: '20%',
      maxWidth: '400px',
    },
    {
      type: 'i-select',
      label: 'Type',
      key: 'type',
      width: '250px',
      options: [
        { label: 'Type1', value: 'type1' },
        { label: 'Type2', value: 'type2' },
      ],
    },
  ],
}
```

宽度也可以是 number 类型, 单位为 px

### 筛选器标题宽度设置

vue-filter-box 默认每个筛选项的标题最大宽度为 `120px`, 当标题长度超出时展示省略号; 你可以通过传入 `labelMaxWidth` 覆盖他:

```html
<vue-filter-box v-model="filterValue" :model="model" label-max-width="200px"><vue-filter-box>
```

同样的, 你也可以为标题设置一个固定值 `label-width`, 在设置 `label-width` 后默认的 `label-max-width` 将会失效:

```html
<vue-filter-box v-model="filterValue" :model="model" label-width="200px"><vue-filter-box>
```

若你需要为每个筛选项标题定制宽度, 可以在 `modelItem` 进行定义:

```js
{
  model: [
    {
      type: 'i-input',
      label: 'Keyword',
      key: 'keyword',
      labelWidth: '150px',
    },
  ],
}
```

### 筛选器布局模式

默认情况下布局模式为 `horizontal`, 你也可以设置为 `vertical`:

```html
<vue-filter-box mode="vertical"></vue-filter-box>
```

### loading 状态

通过设置 `loading` 可开启 vue-filter-box 的加载状态:

```html
<vue-filter-box v-model="filterValue" :model="model" loading><vue-filter-box>
```

你可以通过设置 slot 来替换默认的 loading 样式:

```html
<vue-filter-box v-model="filterValue" :model="model" :loading="true">
	<template v-slot:loading>
		<p>loading...</p>
	</template>
<vue-filter-box>
```

### 禁用状态

通过设置 `disabled` 可开启禁用筛选项状态:

```html
<vue-filter-box disabled></vue-filter-box>
```

注意: 请确保筛选项组件支持 `disabled` prop!

### 筛选项组件大小

通过设置 `size` 设置筛选项组件大小:

```html
<vue-filter-box size="small"></vue-filter-box>
```

注意: 请确保筛选项组件支持 `size` prop!

### 表单校验

通过设置 `rules` 可以定制你的表单规则:

```html
<vue-filter-box :rules="rules" :model="model"></vue-filter-box>

<script>
  export default {
    data() {
      return {
        model: [
          {
            type: 'i-select',
            key: 'roleType',
            options: [
              { label: 'Type1', value: 'type1' },
            ],
          }
        ],
        rules: {
          roleType: [{ required: true, message: 'This field is required.' }],
        },
      };
    },
  };
</script>
```

具体校验规则可以查看: [async-validator](https://github.com/yiminghe/async-validator)

### 底部栏

footer 插槽可以让你设置筛选器的底部栏, 一般是按钮组; 你可以通过调用 footer 插槽 props 中的 `validate` 以及 `validField` 进行表单校验, 也可以调用 `reset` 以及 `resetField` 进行表单重置:

```html
<vue-filter-box>
  <template v-slot:footer="{ validate, reset, validateField, resetField }">
    <div>
      <i-button @click="validate(onSubmit)">提交</i-button>
      <i-button @click="validateField('prop', onSubmit)">校验 prop</i-button>
      <i-button @click="reset">重置</i-button>
      <i-button @click="resetField('prop')">重置 prop</i-button>
    </div>
  </template>
</vue-filter-box>

<script>
  export default {
    methods: {
      onSubmit(valid) {
        if (valid) {
					// ...submit your data
        }
      },
    },
  };
</script>
```

底部栏默认跟随最后一个筛选项, 若想要底部栏独占一行, 可以通过设置 `footer-one-line` 实现:

```html
<vue-filter-box footer-one-line>
  <template v-slot:footer="{ validate, reset, validateField, resetField }">
    <div>
      <i-button @click="validate(onSubmit)">提交</i-button>
      <i-button @click="validateField('prop', onSubmit)">校验 prop</i-button>
      <i-button @click="reset">重置</i-button>
      <i-button @click="resetField('prop')">重置 prop</i-button>
    </div>
  </template>
</vue-filter-box>
```

## API

### Props

| 属性          | 类型                                                       | 默认值         | 是否必填 | 描述                                                         |
| ------------- | ---------------------------------------------------------- | -------------- | -------- | ------------------------------------------------------------ |
| model         | `modelItem[]`, modelItem 具体查看: [ModelItem](#ModelItem) | `[]`           |          | 筛选器结构                                                   |
| value         | `object`                                                   | `{}`           |          | 筛选器对应值                                                 |
| width         | `string`, `number`                                         |                |          | 筛选项宽度                                                   |
| maxWidth      | `string`, `number`                                         | `300`          |          | 筛选项最大宽度                                               |
| minWidth      | `string`, `number`                                         |                |          | 筛选项最小宽度                                               |
| labelWidth    | `string`, `number`                                         |                |          | 筛选项标题宽度, 超出展示省略号                               |
| labelMaxWidth | `string`, `number`                                         | `120`          |          | 筛选项标题最大宽度                                           |
| hiddenColon   | `boolean`                                                  | `false`        |          | 是否隐藏筛选项标题后的冒号                                   |
| mode          | `'horizontal'`, `'vertical'`                               | `'horizontal'` |          | 筛选器布局模式, horizontal 是平铺模式, vertical 是垂直模式   |
| disabled      | `boolean`                                                  | `false`        |          | 是否禁用筛选器                                               |
| loading       | `boolean`                                                  | `false`        |          | 是否展示加载状态                                             |
| rules         | `object`                                                   |                |          | 筛选器校验规则, 具体可查看 [async-validator](https://github.com/yiminghe/async-validator) |
| footerOneLine | `boolean`                                                  | `false`        |          | 底部栏是否独占一行                                           |
| alias         | `object`                                                   | `{}`           |          | 筛选项组件别名                                               |
| size          | `default`, `small`, `large`                                | `default`      |          | 筛选项组件大小                                               |

### Slots

| 名称    | 描述     |
| ------- | -------- |
| footer  | 底部栏   |
| loading | 加载状态 |

#### footer 插槽 props:

| 属性          | 类型                                                        | 描述               |
| ------------- | ----------------------------------------------------------- | ------------------ |
| validate      | `(callback: (valid: boolean) => void) => void`              | 表单校验函数       |
| validateField | `(key: string, callback: (valid: boolean) => void) => void` | 单个表单项校验函数 |
| reset         | `() => void`                                                | 表单重置函数       |
| resetField    | `(key: string) => void`                                     | 单个表单项重置函数 |
| loading       | `boolean`                                                   | 加载状态           |

#### loading 插槽 props:

| 属性    | 类型      | 描述     |
| ------- | --------- | -------- |
| loading | `boolean` | 加载状态 |

### ModelItem

筛选器结构描述对象, 多个 `modelItem` 构成  `model`:

| 属性名        | 类型                                      | 默认值    | 是否必填 | 描述                                                         |
| ------------- | ----------------------------------------- | --------- | -------- | ------------------------------------------------------------ |
| type          | `string`, `component`                     |           | 是       | 筛选项组件, 如 'i-input'                                     |
| label         | `string`, `(h: CreateElement) => VNode`   | `''`      |          | 筛选项标题; `CreateElement` 可查看: [vue createElement](https://cn.vuejs.org/v2/guide/render-function.html#createElement-%E5%8F%82%E6%95%B0) |
| key           | `string`                                  |           | 是       | 筛选项对应的 key                                             |
| width         | `string`, `number`                        |           |          | 筛选项宽度                                                   |
| maxWidth      | `string`, `number`                        | `300`     |          | 筛选项最大宽度                                               |
| minWidth      | `string`, `number`                        |           |          | 筛选项最小宽度                                               |
| labelWidth    | `string`, `number`                        |           |          | 筛选项标题宽度                                               |
| labelMaxWidth | `string`, `number`                        | `120`     |          | 筛选项标题最大宽度                                           |
| hiddenColon   | `boolean`                                 | `false`   |          | 是否隐藏筛选项标题后的冒号                                   |
| disabled      | `boolean`                                 | `false`   |          | 是否禁用                                                     |
| rules         | `object`, `array`                         |           |          | 筛选器校验规则, 具体可查看[async-validator](https://github.com/yiminghe/async-validator) |
| options       | `Array<{ label: string, value: string }>` | `[]`      |          | 选项列表, 当 `type` 为 `i-select` 或是 `checkbox-group` 时生效, `label` 为展示文本, `value` 为选项值 |
| size          | `default`, `small`, `large`               | `default` |          | 筛选项组件大小                                               |

注意:  `modelItem` 属性优先级比 props 高, 例如, 同时设置 `width` 时, 将会以 `modelItem` 的为准 😊

## 问题反馈

如果发现组件中存在的问题或是不足，可以提交你的问题到 [github issue](https://github.com/ruofee/vue-filter-box/issues), 或提交一个 Pull Request, 感谢你的参与!
