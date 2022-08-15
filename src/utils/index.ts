import { camelCase } from "lodash";

export function isObject(data) {
  return Object.prototype.toString.call(data) === "[object Object]";
}

export function isArray(data) {
  return Array.isArray(data);
}

export function toCamelCase(data) {
  if (isArray(data)) {
    return data.map((ele) => {
      return toCamelCase(ele);
    });
  } else if (isObject(data)) {
    return Object.keys(data).reduce((info, ele) => {
      const key = camelCase(ele);
      const value = data[ele];
      info[key] = toCamelCase(value);
      return info;
    }, {});
  } else {
    return data;
  }
}
