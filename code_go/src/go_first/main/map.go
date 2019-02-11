package main

import "fmt"

/*
Map 是一个存储键值对的无序集合，每次迭代映射的时候顺序也可能不一样
Slice、Map、function 以及包含切片的结构类型不能作为 Map 的 key
map在函数间传递，不会拷贝一份map，相当于是"引用传递"，所以remove函数对传入的map的操作是会影响到main函数中的map的
*/


func main() {
	baseUse()
	map4 := map[int]int{0:0, 1:1, 2:2}
	fmt.Println(map4) // map[0:0 1:1 2:2]
	remove(map4)
	fmt.Println(map4) // map[0:0 2:2]
}

// map在函数间传递，不会拷贝一份map，相当于是"引用传递"，所以remove函数对传入的map的操作是会影响到main函数中的map的
func remove(map4 map[int]int)  {
	delete(map4, 1)
}

func baseUse() {
	// 1、使用 make 创建 map，key为string，value为int
	map1 := make(map[string]int)
	// 2、使用字面量创建 map - 最常用的姿势，key为string，value为slice，初始值中的slice可以不加 []string 定义
	map2 := map[string][]string{"hi": {"go", "c"}, "hello": []string{"java"}}
	// 3、创建空映射
	map3 := map[string]string{} // map3 := map[string]string nil映射
	fmt.Println(map1, map2, map3)

	// 4、向映射添加值
	fmt.Println("map put")
	map3["a"] = "x"
	map3["b"] = "y"
	fmt.Println(map3) // map[a:x b:y]

	// 5、获取值并判断是否存在
	value, exist := map3["c"]
	if exist {
		fmt.Println(value)
	} else {
		fmt.Println("map3[\"c\"] does not exist")
	}

	// 6、迭代
	fmt.Println("iterat")
	for key, value := range map3 {
		fmt.Println(key, value)
	}

	// 7、从 map 中删除元素
	delete(map3, "a")
	fmt.Println(map3) // map[b:y]

}