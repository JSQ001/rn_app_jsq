package main

import "fmt"

/*切片是围绕动态数组的概念构建的，可以按需自动增长和缩小。切片的动态增长是通过内置函数 append 来实现的。
这个函数可以快速且高效地增长切片。还可以通过对切片再次切片来缩小一个切片的大小。

切片有 3 个字段分别是指向底层数组的指针、切片访问的元素的个数（即长度）和切片允许增长到的元素个数（即容量）
*/


func main() {
	defineSlice()
	useSlice()
	appendSlice()
	//函数间传递切片
	sliceInfunc()
}

func foo(slice []int) []int {
	slice[0] = 100
	return slice
}

func sliceInfunc()  {
	fmt.Println("函数间传递切片")
	// 1、创建一个 slice
	slice := []int{1, 2, 3, 4, 5}
	fmt.Println(slice) // [1, 2, 3, 4, 5]
	// 2、调用函数，传递一个切片副本，实际上内部还是传递了对数组的指针，
	// 所以 foo 内部的操作会影响 main 中的 slice
	slice2 := foo(slice)
	fmt.Println(slice2) // [100, 2, 3, 4, 5]
	fmt.Println(slice) // [100, 2, 3, 4, 5]
}


// 进行append时,切片容量用完了，再追加需要扩容，此处会新加数组，长度为原数组的2倍，即 newSlice 的底层数组是新数组，新切片容量为8；
// 而 slice 的底层数组是旧数组，二者互不影响
/*
当切片容量（而非数组长度，默认切片容量等于数组长度，也可以显示指定）用完了，再追加需要扩容，此处会新建数组，长度为原数组的2倍，然后将旧数组元素拷贝到新数组，
newSlice 的底层数组是新数组，newSlice 容量为8；而 slice 的底层数组是旧数组，二者互不影响
slice 扩容机制：在切片的容量小于 1000 个元素时，总是会成倍地增加容量。一旦元素个数超过 1000，容量的增长因子会设为 1.25，也就是会每次增加 25% 的容量*/

func appendSlice()  {
	fmt.Println("append")
	// 1、创建原始切片，长度是5，容量是5
	slice := []int{10, 20, 30, 40, 50}
	fmt.Println(cap(append(slice, 1)))
	fmt.Println(cap(slice))
	// 2、reslice 新切片，长度是2，容量是4
	newSlice := slice[1:3] // [20, 30]
	// 由于底层数组还有容量，可以直接追加元素而容量不变
	newSlice = append(newSlice, 60,) // [20, 30 ,60] 长度是3，容量是4,ps: 如果长度超过容量，则指针指向新的底层数组
	fmt.Println(newSlice)           // [20, 30 ,60]
	fmt.Println(slice)              // [10, 20, 30 ,60, 50]

	fmt.Println("detail")
	source := []string{"Apple", "Orange", "Plum", "Banana", "Grape"}
	// 长度为1=3-2，容量为1=3-2  source[i:j:k] 长度=j-i 容量=k-i,第三个参数不传十，默认为原切片的容量值
	new := source[2:3:3]
	fmt.Println(source) // ["Apple", "Orange", "Plum", "Banana", "Grape"]
	fmt.Println(new) // ["Plum"]
	// 超出切片容量3，需要新建数组
	new = append(new, "Kiwi")
	fmt.Println(source) // ["Apple", "Orange", "Plum", "Banana", "Grape"]
	fmt.Println(new) // ["Plum", "Kiwi"]
}

func useSlice()  {
	slice1 := []int{1, 2, 3, 4, 5}
	// 1、根据索引获取切片元素
	fmt.Println(slice1[1]) // 2
	// 2、根据索引修改切片元素
	slice1[3] = 400
	fmt.Println(slice1) // [1, 2, 3, 400, 5]
	// 3、根据切片创建切片，和根据自定义数组创建切片方式相同，长度是2=3-1，容量是4=5-1
	// 但是需要格外注意，新生成的切片 slice2 和原始切片 slice1 的指针元素指向了相同的底层数组，所以修改元素要注意
	slice2 := slice1[1:3] // [2, 3]
	slice2[1] = 300
	fmt.Println(slice2) // [2, 300]
	fmt.Println(slice1) // [1, 2, 300, 400, 5] slice1也发生了变化
	// 4、拷贝 slice 中的元素
	fmt.Println("copy")
	slice3 := []int{0, 0, 0, 0, 0}
	slice4 := []int{1, 2, 3}
	copy(slice3, slice4)  //后一个参数的元素替换前一个的对应元素
	fmt.Println(slice3) // [1, 2, 3, 0, 0]
	fmt.Println(slice4) // [1, 2, 3]
	// 5、删除 slice 中的元素，删除slice5[2]=3
	fmt.Println("delete")
	slice5 := []int{1, 2, 3, 4}
	slice5 = append(slice5[:2], slice5[3:]...)
	fmt.Println(slice5) // [1, 2, 4]
}

func defineSlice()  {
	// 1、使用make函数创建一个字符串切片，长度和容量都是5
	slice1 := make([]string, 5)
	// 2、创建一个int切片，长度是3，容量是5
	slice2 := make([]int, 3, 5)
	// 3、使用字面量创建切片，长度是3，容量是3
	slice3 := []int{1, 2, 3} // [3]int{1, 2, 3}
	// 4、创建 nil 切片，长度为0，容量为0
	var slice4 []int
	// 5、创建空切片，长度为0，容量为0
	slice5 := make([]int, 0)
	slice6 := []int{}

	// 6、自定义底层数组，通过该底层数组创建切片
	arr := [5]int{1, 2, 3, 4, 5}
	// 数组转化为切片，左闭右开 [arr[2]~arr[4])
	slice7 := arr[2:4] // [3,4]
	slice8 := arr[2:]  // [3,4,5]
	slice9 := arr[:4]  // [1,2,3,4]
	slice10 := arr[:]   // [1,2,3,4,5]
	slice10[1]= 12

	fmt.Println(slice1 , slice2, slice3, slice4, slice5, slice6, slice7, slice8, slice9, slice10 )
}
