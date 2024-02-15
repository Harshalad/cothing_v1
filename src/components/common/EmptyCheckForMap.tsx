// common.js

export function EmptyCheckForMap(map:any, key:any, defaultValue:any) {
    if (map.has(key)) {
      const value = map.get(key);
  
      // Check if the value is null or empty (assuming empty string or array)
      if (value === null || value === '' || (Array.isArray(value) && value.length === 0) || value ==="default") {
        return defaultValue;
      } else {
        return value;
      }
    } else {
      return defaultValue;
    }
  }
  