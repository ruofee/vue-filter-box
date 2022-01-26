<template>
  <i-form
    ref="form"
    :class="['vue-filter-box', isVertical && 'vue-filter-box_vertical']"
    :model="value"
    :inline="defaultInline"
    :rules="rules">
    <vue-filter-box-item
      v-for="modelItem of model"
      class="vue-filter-box-item"
      :value="value"
      :model-item="modelItem"
      :key="modelItem.key"
      :width="width"
      :disabled="disabled"
      :min-width="minWidth"
      :max-width="maxWidth"
      :label-width="labelWidth"
      :label-max-width="labelMaxWidth"
      :is-vertical="isVertical"
      :hidden-colon="hiddenColon"
      :alias="alias" />
    <vue-filter-box-item
      class="vue-filter-box-item"
      :model-item="footerModelItem"
      :is-vertical="isVertical"
      is-footer
      hidden-colon>
      <slot name="footer" :loading="loading" :validate="validate" :reset="reset" :validate-field="validateField"></slot>
    </vue-filter-box-item>
    <div v-show="loading" class="vue-filter-box-loading">
      <slot name="loading">
        <spin />
      </slot>
    </div>
  </i-form>
</template>

<script>
import { getEmptyArray, getEmptyObject, getValidator, getDefaultValueByComponentType } from './utils/get';
import { DEFAULT_PROPS } from './constants';
import VueFilterBoxLabel from './components/VueFilterBoxLabel.vue';
import VueFilterBoxItem from './components/VueFilterBoxItem.vue';

export default {
  name: 'VueFilterBox',
  components: {
    VueFilterBoxLabel,
    VueFilterBoxItem,
  },
  props: {
    value: {
      type: Object,
      default: getEmptyObject,
    },
    model: {
      type: Array,
      default: getEmptyArray,
    },
    mode: {
      type: String,
      default: 'horizontal',
      validator: getValidator(['horizontal', 'vertical']),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: Object,
      default: getEmptyObject,
    },
    hiddenColon: {
      type: Boolean,
      default: false,
    },
    labelWidth: {
      type: [Number, String],
    },
    labelMaxWidth: {
      type: [Number, String],
      default: DEFAULT_PROPS.LABEL_MAX_WIDTH,
    },
    width: {
      type: [Number, String],
    },
    minWidth: {
      type: [Number, String],
    },
    maxWidth: {
      type: [Number, String],
    },
    loading: {
      type: Boolean,
    },
    footerOneLine: {
      type: Boolean,
    },
    alias: {
      type: Object,
      default: getEmptyObject,
    },
  },
  data() {
    return {
      defaultInline: true,
    };
  },
  computed: {
    isVertical() {
      return this.mode === 'vertical';
    },
    footerModelItem() {
      return {
        minWidth: (this.$scopedSlots?.footer && this.footerOneLine) ? '100%' : undefined,
      };
    },
  },
  watch: {
    model: {
      immediate: true,
      handler() {
        this.init();
      },
    },
  },
  methods: {
    validate(fn) {
      this.$refs.form.validate(valid => {
        fn && fn(valid);
      });
    },
    validateField(key, fn) {
      this.$refs.form.validateField(key, valid => {
        fn && fn(valid);
      });
    },
    reset() {
      return this.$refs.form.resetFields();
    },
    init() {
      if (this.model) {
        this.model.forEach(({ type, key }) => {
          if (typeof this.value[key] === 'undefined') {
            const value = getDefaultValueByComponentType(type);
            this.$set(this.value, key, value);
          }
        });
      }
    }
  },
}
</script>

<style lang="less" scoped>
.vue-filter-box {
  position: relative;
  .vue-filter-box-item {
    display: inline-flex;
    margin-right: 0;
    padding-right: 10px;
  }
  .vue-filter-box-loading {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, .9);
  }
}
.vue-filter-box_vertical {
  .vue-filter-box-item {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
