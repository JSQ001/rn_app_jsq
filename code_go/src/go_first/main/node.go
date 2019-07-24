package main

import "fmt"

// 定义一个结构体
type treeNode struct {
	value int
	left,right *treeNode
}
func main() {
	root := treeNode{1,nil,nil}
	node1 := treeNode{value:3}
	root.left = &node1
	root.left.right = new(treeNode)             // 内建函数初始化node
	nodes := []treeNode{
		{1,nil,nil},
		{2,&root,&node1},
	}
	fmt.Println(nodes[1].left.left.value)       // 3
	fmt.Println(nodes[1].right.value)       // 3
}