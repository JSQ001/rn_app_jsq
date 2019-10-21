export const PAGE_SIZE = 10;
export function offset(page) {
  return (page - 1) * PAGE_SIZE;
}
export function page(offset) {
  return offset / PAGE_SIZE + 1;
}
