package main

import "fmt"

/*func main() {
	q := make(chan int,3)
	q <- 1
	q <- 2
	q <- 3
	close(q)
	select {
	case <-q:
		fmt.Println("ok",len(q))  //每个case值是通道的值
	}
	for v := range q {
		fmt.Println(v)
	}
}*/



//Channel并发、死锁问题
/*func loop(name string) {
	fmt.Println(name)
	for i := 0; i < 10; i++ {
		fmt.Printf("%d ", i)
	}
}
func main() {
	go loop("goroutine") //创建一个线程
	loop("main")  // main线程执行完，就会退出了，所以goroutine来不及执行完
}*/

//无缓冲的信道在取消息和存消息的时候都会挂起当前的goroutine，除非另一端已经准备
/*func main() {
	var messages chan string = make(chan string)
	go func(message string) {
		fmt.Println("正在执行 goroutine")
		messages <- message // 存消息 ，另一端已经准备好取消息，所以不会阻塞
		fmt.Println("goroutine 执行，消息被取走")
	}("Ping!")

	fmt.Println(<-messages) // 取消息，main阻塞，执行goroutine线
}*/

func main() {
	c,quit := make(chan int) ,make(chan int)

	go func() {
		fmt.Println("c")
		c <- 1  // c中存放数据
		quit <- 0 // qui没有接收数据，goroutine阻塞，main执行
	}()
	fmt.Println(<- c )// c 等待数据的写，不写入会死锁
	fmt.Println("c取")
	fmt.Println(<- quit )// quit 等待数据的写
	close(c)
	close(quit)
}


//另一个解决办法是缓冲信道, 即设置c有一个数据的缓冲大小:不达容量不阻塞
/*func main() {
	ch := make(chan int, 3)
	ch <- 1
	ch <- 2
	ch <- 3
	// 显式地关闭信道
	close(ch)
	for v := range ch {
		fmt.Println(v)
	}
}*/


//创建1000个线程，，当线程阻塞，就剩下的线程抢占资源
/*var quit chan int // 只开一个信道

func fo(id int) {
	fmt.Println("进入",id)
	quit <- id // ok, finished
}

func main() {
	count := 1000
	//quit = make(chan int) // 无缓冲， 必须存取建立好连接
	quit = make(chan int, count) // 容量1000 ,可以先存后取，通道可以缓存。
	for i := 0; i < count; i++ {
		go fo(i)
	}

	for i := 0; i < count; i++ {
		fmt.Println("取出",<- quit)
	}


}
*/