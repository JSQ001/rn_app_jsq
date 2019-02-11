package main

import (
	"runtime"
	"sync"
	"fmt"
)

var (
	// 两个 goroutine 同时操作的变量，竞态变量
	counter     int
	waitGroup sync.WaitGroup
)

func incCount(i string) {
	defer waitGroup.Done()
	for count := 0; count < 2; count++ {
		value := counter                                             // i    count   value  counter
		// 当前的 goroutine 主动让出资源，从线程退出，并放回到队列，        //  b    0        0        0    b第一次读入
		// 让其他 goroutine 进行执行                                  //  a     0        0        0    a第一次读入
		fmt.Println(i,"第",count,"读入",value,counter)
		runtime.Gosched()                                          //   b     0        1       1     b第一次value++,打印，写入counter
		value ++                                                   //   a     1        1        1    b第2次读入
		counter = value											   //	b	  0        1	    1    a第一次value++,打印，写入counter
		fmt.Println(i,"第",count,"写入counter",value,counter)       //	a	  1        1	    1    a第2次读入
	}          													   //   b     1        2        2    b第2次value++,打印，写入counter
}                                                                  //   a     1        2        2    a第2次value++,打印，写入counter

func main() {
	fmt.Println("race")
	runtime.GOMAXPROCS(1)
	waitGroup.Add(2)

	go incCount("a")
	go incCount("b")

	waitGroup.Wait()
	fmt.Println("value =",counter) // 正确为4，实际上为2
}