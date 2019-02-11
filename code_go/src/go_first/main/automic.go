package main

import (
	"fmt"
	"sync"
	"sync/atomic"
	"time"
)

var (
	shutdown  int64
	autoWaitGroup sync.WaitGroup
)



func doWork(name string) {
	defer autoWaitGroup.Done()
	for {
		fmt.Println(name,atomic.LoadInt64(&shutdown))
		time.Sleep(250 * time.Millisecond)
		fmt.Println("sleep",name,atomic.LoadInt64(&shutdown))

		// 记载关机标志
		if atomic.LoadInt64(&shutdown) == 1 {
			fmt.Println("shutDown, ", name)
			break
		}
	}
}

func main() {
	autoWaitGroup.Add(2)

	go doWork("A")
	go doWork("B")

	// 给定goroutine执行的时间
	time.Sleep(1000 * time.Millisecond)

	// 设定关机标志
	atomic.StoreInt64(&shutdown, 1)
	//atomic.AddInt64(&shutdown,2)
	fmt.Println("out",atomic.LoadInt64(&shutdown))
	autoWaitGroup.Wait()
}