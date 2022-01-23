<template>
  <div
    ref="label"
    :style="style"
    :class="['vue-filter-box-item-label', !hiddenColon && 'vue-filter-box-item-label_colon', isVertical && 'vue-filter-box-item-label_vertical']">
    <div class="vue-filter-box-item-label-content">
      <label-extension v-if="modelItem.labelPrefix" :render="modelItem.labelPrefix" />
      <span :title="modelItem.label">{{ modelItem.label }}</span>
      <label-extension v-if="modelItem.labelSuffix" :render="modelItem.labelSuffix" />
    </div>
  </div>
</template>

<script>
import LabelExtension from './LabelExtension.vue';
import { getEmptyObject, getSizePx } from '../utils/get';

export default {
  name: 'VueFilterBoxLabel',
  components: {
    LabelExtension,
  },
  props: {
    modelItem: {
      type: Object,
      default: getEmptyObject,
    },
    hiddenColon: {
      type: Boolean,
    },
    isVertical: {
      type: Boolean,
    },
    labelWidth: {
      type: Number,
    },
    labelMaxWidth: {
      type: Number,
    },
  },
  computed: {
    style() {
      if (this.isVertical) {
        return {
          width: this.getLabelWidth('width'),
        };
      }
      return {
        width: this.getLabelWidth('width'),
        maxWidth: this.getLabelWidth('maxWidth'),
      };
    },
  },
  methods: {
    getLabelWidth(type) {
      const defaultLabelWidth = type === 'maxWidth' ? 'none' : 'auto';
      if (this.isVertical) {
        return defaultLabelWidth;
      }
      const labelWidth = this.modelItem.labelWidth ?? this.labelWidth;
      const labelMaxWidth = this.modelItem.labelMaxWidth ?? this.labelMaxWidth;
      const width = type === 'maxWidth'
        ? labelWidth
          ? defaultLabelWidth
          : labelMaxWidth
        : labelWidth;
      return getSizePx(width) ?? defaultLabelWidth;
    },
  },
}
</script>

<style lang="less" scoped>
@colon-wrapper-width: 12px;
@colon-width: 5px;
.vue-filter-box-item-label {
  padding-right: @colon-wrapper-width;
  .vue-filter-box-item-label-content {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow-x: hidden;
  }
}
.vue-filter-box-item-label_colon {
  position: relative;
  &::after {
    content: ':';
    position: absolute;
    right: @colon-wrapper-width - @colon-width;
    top: 0;
  }
}
.vue-filter-box-item-label_vertical {
  max-width: 100%;
  text-align: left;
}
</style>
