
//获取每次的偏移量
export function offset(page, pageSize) {
    return (page - 1) * pageSize;
  }

//获取每次的页码
export function page(offset, pageSize ) {
return offset / pageSize + 1;
}