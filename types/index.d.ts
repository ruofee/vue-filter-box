import Vue, {VNode} from 'vue'

export type Size = 'small' | 'default' | 'large'

export interface Option {
    label: string,
    value: string | number
}

export interface ModelItem {
    component: string | object,
    title: string,
    required: boolean,
    width: string,
    options?: Option[],
    props: object,
    on: object
}

export interface Model {
    [propName: string]: ModelItem,
    [propName: number]: ModelItem
}

export declare class VueFilterBox extends Vue {
    /**
     * 绑定的值
     * @default {}
     */
    value?: object
    /**
     * 构建筛选器的模型
     * @default {}
     */
    model?: Model
    /**
     * 组件大小
     * @default null
     */
    size?: Size
    /**
     * 加载状态
     * @default false
     */
    loading?: boolean
    /**
     * 是否隐藏
     * @default false
     */
    buttonHide?: boolean
    /**
     * 点击搜索按钮触发
     */
    $emit(eventName: 'on-search', value: object): this
    /**
     * slot
     */
    $slots: {
        footer: VNode[]
    }
}

export default VueFilterBox