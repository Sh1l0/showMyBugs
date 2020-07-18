const objMap = (mapFunc, obj) => Object.entries(obj).map(([key, value]) => mapFunc(key, value));
