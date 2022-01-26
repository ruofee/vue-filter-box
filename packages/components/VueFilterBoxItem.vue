<template>
  <form-item
    :class="['vue-filter-box-item', isVertical && 'vue-filter-box-item_vertical']"
    :style="style"
    :prop="modelItem.key"
    :rules="modelItem.rules">
    <template v-slot:label>
      <vue-filter-box-label
        :model-item="modelItem"
        :hidden-colon="hiddenColon"
        :is-vertical="isVertical"
        :label-width="labelWidth"
        :label-max-width="labelMaxWidth" />
    </template>
    <slot v-if="isFooter"></slot>
    <component
      v-else
      v-model="value[modelItem.key]"
      :is="modelItem.type"
      v-bind="modelItem.props"
      v-on="modelItem.events">
      <template v-if="isSelect(modelItem.type)">
        <i-option
          v-for="option of (modelItem.options || [])"
          :key="option.value"
          :value="option.value">
          {{ option.label }}
        </i-option>
      </template>
      <template v-else-if="isCheckbox(modelItem.type)">
        <checkbox
          v-for="option of (modelItem.options || [])"
          :key="option.value"
          :label="option.value">
          {{ option.label }}
        </checkbox>
      </template>
    </component>
  </form-item>
</template>

<script>
import VueFilterBoxLabel from './VueFilterBoxLabel.vue';
import { isSelect, isCheckbox } from '../utils/is';
import { getSizePx } from '../utils/get';
import { DEFAULT_PROPS } from '../constants';

export default {
  name: 'VueFilterBoxItem',
  components: {
    VueFilterBoxLabel,
  },
  props: {
    value: {
      type: Object,
    },
    modelItem: {
      type: Object,
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
    labelWidth: {
      type: [Number, String],
    },
    labelMaxWidth: {
      type: [Number, String],
    },
    hiddenColon: {
      type: Boolean,
    },
    isVertical: {
      type: Boolean,
    },
    isFooter: {
      type: Boolean,
    },
  },
  data() {
    return {
      isSelect,
      isCheckbox,
    };
  },
  computed: {
    style() {
      const width = getSizePx(this.modelItem.width ?? this.width ?? undefined);
      const minWidth = getSizePx(this.modelItem.minWidth ?? this.minWidth ?? undefined);
      const maxWidth = getSizePx(
        this.modelItem.maxWidth
          ?? this.maxWidth
          ?? this.getFormItemWidth
            ? undefined
            : DEFAULT_PROPS.MAX_WIDTH
      );
      return {
        width,
        minWidth,
        maxWidth,
      };
    },
  },
}
</script>

<style lang="less" scoped>
.vue-filter-box-item {
  /deep/ .ivu-form-item-label {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    padding: 0;
    height: 34px;
    line-height: unset;
  }
  /deep/ .ivu-form-item-content {
    flex-grow: 1;
  }
}
.vue-filter-box-item_vertical {
  /deep/ .ivu-form-item-label {
    width: 100%;
  }
  /deep/ .ivu-form-item-content {
    width: 100%;
  }
}
</style>