package main

/*func ad() func(int) int  {
	sum := 0                        // 此处的 sum 为自由变量
	return func(v int) int {
		sum += v                    // 指向外层sum
		return sum
	}
}
func main(){
	add := ad()
	for i:=0; i<10; i++ {
		fmt.Println(add(i))          // 从 0 到 10 的累加
	}
}*/

/*// 一个斐波那契数列的生成器
func fib() func() int{
	a, b := 0, 1
	return func() int{
		a, b = b, a+b
		return a
	}
}
func main(){
	f = fib()
	f()             // 1
	f()             // 1
	f()             // 2
	f()             // 3
}*/

import (
	"io"
	"bufio"
	"fmt"
	"strings"
)
type funcType func() int

func fib() funcType{
	a, b := 0, 1
	return func() int{
		a, b = b, a+b
		return a
	}
}

func (f funcType) Read(p []byte) (n int, err error)  {
	next := f()
	if next > 1000 {
		return 0, io.EOF
	}
	s := fmt.Sprintf("%d ", next)
	return strings.NewReader(s).Read(p)
}
func scan(read io.Reader)  {
	scanner := bufio.NewScanner(read)
	fmt.Println((scanner))
	for scanner.Scan() { //fib的返回funcType方法
		text := scanner.Text()
		fmt.Printf(text)
	}
}
func main() {
	f := fib()
	fmt.Println(f)
	scan(f)
}