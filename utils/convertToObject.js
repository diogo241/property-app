export function convertToSerializableObject(doc) {
  return JSON.parse(JSON.stringify(doc));
}