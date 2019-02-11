package main

import "fmt"

func main() {
	defineArray()
	//函数间传递数组
	arrayInfunc()
}

func f(arr [5]int) [5]int {
	arr[0] = 100
	return arr
}

func arrayInfunc()  {
	fmt.Println("函数间传递数组")
	// 1、创建一个 slice
	arr := [5]int{1, 2, 3, 4, 5}
	fmt.Println(arr) // [1, 2, 3, 4, 5]
	//入参会拷贝一份数组，所以如果数组很大，从内存和性能上函数传递数组值都是很大的开销，需要避免
	arr2 := f(arr)
	fmt.Println(arr) // [1, 2, 3, 4, 5]
	fmt.Println(arr2) // [100, 2, 3, 4, 5]
}

func defineArray() [3]int {
	// 定义数组，不赋初值（使用默认值）
	var arr1 [5]int // [0 0 0 0 0]
	// 定义数组，赋初值
	arr2 := [3]int{1, 2, 3} // [1 2 3]
	// 定义数组，由编译器来计算长度，不可写成[]，不带长度或者 ... 的表示切片
	arr3 := [...]int{4, 5, 6, 7} // [4 5 6 7]
	// 创建指针数组
	arr4 := [2]*string{new(string), new(string)}
	*arr4[0] = "hello"
	*arr4[1] = "go"
	// 为指定索引位置设置值
	arr5 := [3]int{1:10} // [0,10,0]
	// 二维数组
	var grid [4][]int // [[0 0 0 0 0] [0 0 0 0 0] [0 0 0 0 0] [0 0 0 0 0]]
	grid[0]= []int {1}
	grid[1] = [] int {1, 2 }
	grid[2] = [] int {1, 2 ,3}
	grid[3] = [] int {1, 2 ,4}
	// 数组拷贝，直接复制一份 arr2 给 arr6
	arr6 := arr2
	fmt.Println(arr1, arr2, arr3, arr4, arr5, arr6, grid)// arr4 打印出来的是地址 [0xc00000e1e0 0xc00000e1f0]
	fmt.Println(*arr4[0]) // hello
	return arr2
}

// 数组是值传递，这里的入参会拷贝一份数组（使用指针可以实现"引用传递"）
func loopArray(arr2 [3]int) {
	// 通用方法
	for i := 0; i < len(arr2); i++ {
		fmt.Println(arr2[i])
	}
	// 最简方法，只获取数组下标
	for i := range arr2 {
		fmt.Println(arr2[i])
	}
	// 最简方法，获取数组下标和对应的值
	for i, v := range arr2 {
		fmt.Println(i, v)
	}
	// 最简方法，只获取值，使用 _ 省略变量
	for _, v := range arr2 {
		fmt.Println(v)
	}
}