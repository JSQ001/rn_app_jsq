package main

import "fmt"

/*
	bool
	string
	(u)int、(u)int8、(u)int16、(u)int32、(u)int64
	uintptr 指针
	byte
	rune 字符型，32 位，类比 char
	float32、float64
	complex32、complex64 复数 i = √-1
*/


//枚举
func enums() {
	const (
		a=1
		b=2
		c=3
	)
	const (
		java1 = iota
		cpp1
		c1
	)
}

//条件 if：变量可以定义在 if 块内，其作用域就只在 if 块内了
//    switch：默认自带break，如果想穿下去执行，使用 fallthrough

//for：for 的三个组件都可省略，Go 没有 while，用 for 来替代
func sum() int {
	var value int
	for i := 0; i <= 100; i++ {
		value += i
	}
	return value
}

// 等同于 while(true)
func deadLoop() {
	for {
		fmt.Println("this is a deadLoop")
	}
}


func main() {
	fmt.Println("hello world")


}
