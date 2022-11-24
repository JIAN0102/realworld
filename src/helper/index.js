export function pageToOffset(page = 1, limit = 10) {
  const offset = (page - 1) * limit;
  return {
    limit,
    offset,
  };
}

export function formatDate(data) {
  return new Date(data).toLocaleDateString();
}
