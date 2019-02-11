package main
import "fmt"

/**
 * 函数接收参数，创建参数的过程： 栈（为a（参数名）创建一个空间） 堆（创建a的地址，并指向实际参数）


   可以有多个返回值  如果只用其中一个值，另一个用下划线：q, _ := div(10, 3)
   函数的参数类型可以是 func - 函数式编程
   支持可变长参数
 */

// 可以使用函数作为参数，函数参数与内部参数一样，函数名在前，函数类型在后
// 后续传参，可以使用匿名内部函数，也可以先定义函数再传入
func apply(op func(int, int) int, a,b int) int {
	return op(a, b)
}
// use
var result = apply(func(x int, y int) int {
	return x + y
}, 10,4)

// 可变长参数
func sum2(nums ...int) int {
	s := 0
	for i := range nums {
		s += nums[i]
	}
	return s
}
// use

func swap_by_value(a, b int) {
	fmt.Println(&a)
	b, a = a, b
}

func main() {
	// use
	a, b := 3, 4
	fmt.Println(&a)
	swap_by_value(a, b)
	fmt.Println(*(&a), b) // 3 4 没有实现交换

	// use
	swap_by_pointer(&a, &b)
	fmt.Println(a, b)
	sum2(1, 2, 3)
}

func swap_by_pointer(a, b *int) {
	fmt.Println(*a)
	fmt.Println(*&a)
	*b, *a = *a, *b
}

