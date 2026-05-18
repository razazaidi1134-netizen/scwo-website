// Safe serialization for Mongoose documents to client components
export function serialize<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

// Alternative: More robust with Date handling
export function serializeWithDates<T>(data: T): T {
  return JSON.parse(JSON.stringify(data, (key, value) => {
    if (value instanceof Date) {
      return value.toISOString();
    }
    return value;
  }));
}