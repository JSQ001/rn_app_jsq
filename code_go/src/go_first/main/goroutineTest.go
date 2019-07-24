package main

import (
	"fmt"
)

func cal(a int , b int )  {
	c := a+b
	fmt.Printf("%d + %d = %d\n",a,b,c)
}

func main() {
	// var go_sync sync.WaitGroup //声明一个WaitGroup变量
	Exitchan := make(chan bool,20)  //声明并分配管道内存
	a,b :=0,0
	for i := 0; i < 20; i++ {

		//go_sync.Add(1)
		//go cal(i, i+1) //启动10个goroutine 来计算
		go func(i int) {
			//defer go_sync.Done()
			a++
			//b=i
			//fmt.Println(i)
			Exitchan<-true
			fmt.Printf("%d + %d = %d\n",i,i+1,2*i+1)
		}(i)
	}
	for i:=0;i<20 ; i++ {
		<- Exitchan  //取信号数据，如果取不到则会阻塞
	}
	//go_sync.Wait()
	//time.Sleep(time.Second * 2) // sleep作用是为了等待所有任务完成 }
	fmt.Println("执行第",b,"号goroutine后main即将退出","a =",a)   //不同于线程，协程有自己的上下文寄存器和栈，不会有共享进程资源混乱问题。。
}

//由于goroutine是(宏观上)异步执行的（微观上是线程抢夺cpu），那很有可能出现主程序退出时还有goroutine没有执行完，此时goroutine也会跟着退出。
// 此时如果想等到所有goroutine任务执行完毕才退出，go提供了sync包和channel来解决同步问题，
// 当然如果你能预测每个goroutine执行的时间,你还可以通过time.Sleep方式等待所有的groutine执行完成以后在退出程序(如上面的列子)。
