export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize
  return [items].flat().splice(startIndex, pageSize)
}
