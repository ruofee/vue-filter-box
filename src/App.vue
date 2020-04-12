<template>
	<vue-filter-box :items="filterItems" :value="filterValue" @on-click="search"></vue-filter-box>
</template>
<script>
    import {VueFilterBox} from '@/components/index.js'
    export default {
        name: 'App',
        components: {
            VueFilterBox
        },
        data() {
            return {
                filterValue: {
                    inputKey: '示例',
                    selectKey: 1,
                    cascaderKey: [1, 3],
                    datepickerKey: ['2016-01-01', '2016-02-15']
                },
                filterItems: [
                    {
                        title: '输入框',
                        key: 'inputKey',
                        type: 'input',
                        minWidth: '15%',
                        extend: {
                          style: {
                            fontSize: '18px'
                          }
                        }
                    },
                    {
                        title: '下拉框',
                        key: 'selectKey',
                        type: 'select',
                        minWidth: '15%',
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
                        key: 'cascaderKey',
                        type: 'cascader',
                        minWidth: '15%',
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
                        minWidth: '30%',
                        extend: {
                            props: {
                              type: 'daterange'
                            }
                        }
                    }
                ]
            }
        },
        methods: {
            search(value) {}
        }
    }
</script>