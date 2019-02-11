package main

import (
	"fmt"
	"runtime"
	"sync"
)

//互斥锁用于在代码上创建一个临界区，保证同一时间只有一个 goroutine 可以 执行这个临界区代码

var (
	// 两个 goroutine 同时操作的变量，竞态变量
	cou     int
	meWaitGroup sync.WaitGroup
	// 锁，定义一段临界区
	lock sync.Mutex
)

func incCou(int) {
	defer meWaitGroup.Done()
	for count := 0; count < 2; count++ {
		lock.Lock()
		{ // Lock() 与 UnLock() 之间的代码都属于临界区，{}是可以省略的，加上看起来清晰
			value := cou
			// 当前的 goroutine 主动让出资源，从线程退出，并放回到队列，
			// 让其他 goroutine 进行执行
			// 但是因为锁没有释放，调度器还会继续安排执行该 goroutine
			runtime.Gosched()
			value ++
			cou = value
		}
		lock.Unlock()
		// 释放锁，允许其他正在等待的 goroutine 进入临界区
	}
}

func main() {
	runtime.GOMAXPROCS(1)
	meWaitGroup.Add(2)

	go incCou(1)
	go incCou(2)

	meWaitGroup.Wait()
	fmt.Println(cou) // 4, 去掉锁2
}