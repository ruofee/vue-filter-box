import Vue from 'vue'

export type Size = 'small' | 'default' | 'large'
export interface ModelItem {
    component: string | object,
    title: string,
    required: boolean,
    width: string,
    options?: array,
    props: object,
    on: object
}
export interface Model {
    [string | number]: ModelItem
}

declare class VueFilterBox extends Vue {
    value: object
    model: Model
    size: Size
    loading: boolean
    buttonHide: boolean
}

export default VueFilterBox