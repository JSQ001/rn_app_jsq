package main

import (
	"fmt"
	"sync"
)

// 使用4个goroutine来完成10个任务
const (
	taskNum      = 10
	goroutineNum = 4
)

var countDownLatch sync.WaitGroup
var target = make(chan string)

func worker(name string, taskChannel chan string) {
	defer countDownLatch.Done()
	for {
		// 1. 不断的阻塞等待分配工作
		task, ok := <-taskChannel
		if !ok {
			fmt.Printf("channel closed and channel is empty\n")
			return
		}

		//time.Sleep(100 * time.Millisecond)  //可以用一个通道代替
		go func(){
			<-target   //阻塞获取
		}()

		fmt.Printf("线程 %s complete %s\n", name, task)
	}
}

func main() {
	countDownLatch.Add(goroutineNum)
	// 1. 创建有缓冲区的string channel
	taskChannel := make(chan string, taskNum)
	// 2. 创建 4 个goroutine去干活
	for i := 0; i < goroutineNum; i++ {
		go worker(fmt.Sprintf("gorotine%d", i), taskChannel)
	}

	// 3. 向通道加入task
	for i := 0; i < taskNum; i++ {
		fmt.Printf("向通道加入task%d\n",i )
		taskChannel <- fmt.Sprintf("task%d", i)
	}

	// 4. 关闭通道：
	// 当通道关闭后，goroutine 依旧可以从通道接收数据，但是不能再向通道里发送数据。
	// 能够从已经关闭的通道接收数据这一点非常重要，因为这允许通道关闭后依旧能取出其中缓冲的全部值，而不会有数据丢失。
	// 从一个已经关闭且没有数据的通道里获取数据，总会立刻返回，并返回一个通道类型的零值
	close(taskChannel)
	fmt.Println("通道关闭","main线程等待")
	//fmt.Println(countDownLatch)
	// 5. 等待
	countDownLatch.Wait()     //当WaitGroup的counter=0时（），结束等待，
	fmt.Println("全部线程处理完")

}