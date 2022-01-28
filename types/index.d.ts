import Vue, { VueConstructor, VNode, CreateElement } from 'vue';

export type Size = 'small' | 'default' | 'large';
export type Width = number | string;
export type Mode = 'vertical' | 'horizontal';
export type Rules = { [key: string]: any };
export type Alias = { [key: string]: VueConstructor<Vue> | string };
export type Props = { [key: string]: any };
export type Events = { [key: string]: (...args: Array<any>) => any };
export type Option = {
  label: string;
  value: string | number;
}

export interface ModelItem {
  type: string | VueConstructor<Vue>;
  label: string | ((h: CreateElement) => VNode);
  key: string;
  width: Width;
  minWidth: Width;
  maxWidth: Width;
  labelWidth: Width;
  labelMaxWidth: Width;
  hiddenColon: boolean;
  disabled: boolean;
  rules: Rules | Array<Rules>;
  size: Size;
  options: Array<Option>;
  props: Props;
  events: Events;
}

export declare class VueFilterBox extends Vue {
  /**
   * 构建筛选器的模型
   * @default {}
   */
   model?: Partial<Array<ModelItem>>;
  /**
   * 绑定的值
   * @default {}
   */
  value?: object;
  /**
   * 宽度
   * @default null
   */
  width?: Width;
  /**
   * 最大宽度
   * @default null
   */
  maxWidth?: Width;
  /**
   * 标题宽度
   * @default null
   */
  labelWidth?: Width;
  /**
   * 标题最大宽度
   * @default null
   */
  labelMaxWidth?: Width;
  /**
   * 是否隐藏冒号
   * @default false
   */
  hiddenColon?: boolean;
  /**
   * 筛选器布局模式
   * @default 'horizontal'
   */
  mode?: Mode;
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * 加载状态
   * @default false
   */
  loading?: boolean;
  /**
   * 校验规则
   * @default {}
   */
  rules?: Rules;
  /**
   * 底部栏是否独占一行
   * @default false
   */
  footerOneLine?: boolean;
  /**
   * 筛选项组件别名
   * @default {}
   */
  alias?: Alias;
  /**
   * 组件大小
   * @default default
   */
  size?: Size;
  
  /**
   * slot
   */
  $slots: {
    loading: Array<VNode>;
    footer: Array<VNode>;
  }
}

export default interface GlobalInstall {
  install(vue: VueConstructor): void;
}
