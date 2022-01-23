export function isSimilarNum(val) {
  const _val = val - '';
  return !isNaN(_val) && typeof (val - '') === 'number';
}

export function isStr(val) {
  return typeof val === 'string';
}

export function isArr(val) {
  return Array.isArray(val);
}

export function isFunc(val) {
  return typeof val === 'function';
}

function isEqualComponentType(type, componentTypes) {
  return componentTypes.includes(type) || componentTypes.includes(type?.name);
}

export function isSelect(type) {
  const componentTypes = ['iSelect', 'i-select'];
  return isEqualComponentType(type, componentTypes);
}

export function isCheckbox(type) {
  const componentTypes = ['CheckboxGroup', 'checkbox-group'];
  return isEqualComponentType(type, componentTypes);
}
