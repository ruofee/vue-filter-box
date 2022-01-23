import Vue from 'vue';
import { DEFAULT_COMPONENT_VALUE } from '../constants';
import { isSimilarNum, isStr, isArr, isFunc } from './is';

export function getEmptyArray() {
  return [];
}

export function getEmptyObject() {
  return {};
}

export function getValidator(arr = []) {
  return function(val) {
    return arr.includes(val);
  };
}

export function getSizePx(size) {
  const sizeIsNum = isSimilarNum(size);
  if (sizeIsNum || isStr(size)) {
    return sizeIsNum ? `${size}px` : size;
  }
  return size;
}

export function getCamelCase(str) {
  const splitArr = str.split('-');
  if (str.length <= 1) {
    return str;
  }
  const pascalCaseArr = [];
  const camelCaseArr = splitArr.map((splitItem, index) => {
    const result = splitItem.slice(0, 1).toUpperCase() + splitItem.slice(1);
    pascalCaseArr.push(index === 0 ? splitItem : result);
    return result;
  });
  return {
    camelCase: camelCaseArr.join(''),
    pascalCase: pascalCaseArr.join(''),
  };
}

export function getParamCase(str) {
  return str.replace(/([A-Z])/g, (all, letter, index) => {
    if (index === 0) {
      return letter;
    }
    return `-${letter}`;
  }).toLowerCase();
}

export function getDefaultValueByComponentType(component) {
  if (isStr(component)) {
    const components = Vue?.options?.components;
    if (components[component]) {
      return getDefaultValueByComponentType(components[component]?.options);
    }
    // 需要进行组件名转换
    if (component.indexOf('-') !== -1) {
      const { camelCase, pascalCase } = getCamelCase(component);
      if (components[camelCase]) {
        return getDefaultValueByComponentType(components[camelCase]?.options);
      }
      if (components[pascalCase]) {
        return getDefaultValueByComponentType(components[pascalCase]?.options);
      }
    } else {
      const paramCase = getParamCase(component);
      if (components[paramCase]) {
        return getDefaultValueByComponentType(components[paramCase]?.options);
      }
    }
  } else {
    const props = component?.props;
    if (isArr(props)) {
      return DEFAULT_COMPONENT_VALUE;
    } else {
      const value = props?.value;
      if (isFunc(value)) {
        return valueProp();
      }
      return isFunc(value?.type) ? value.type() : '';
    }
  }
  return DEFAULT_COMPONENT_VALUE;
}
