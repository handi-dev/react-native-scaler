type DeepMapFn = (val: any) => any;
type MapObjectFn = (obj: Record<string, any>, fn: DeepMapFn) => Record<string, any>;

const deepMap = (obj: any, fn: DeepMapFn): any => {
  const deepMapper = (val: any) => (isObject(val) ? deepMap(val, fn) : fn(val));

  if (Array.isArray(obj)) {
    return obj.map(deepMapper);
  }

  if (isObject(obj)) {
    return mapObject(obj, deepMapper);
  }

  return obj;
};

const mapObject: MapObjectFn = (obj, fn) => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, val]) => [key, fn(val)])
  );
};

const isObject = (myVar: any): boolean => myVar !== null && typeof myVar === "object";

export default deepMap;
