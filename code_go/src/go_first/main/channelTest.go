package main

import "fmt"

/*func defineChannel() chan int{
	//channel := make(<- chan int,10) //只读
	//channel := make(chan <- int, 10) //只写
	channel := make(chan int,10)  //可读可写

	return channel

}

func main() {
	channel := defineChannel()
	fmt.Println(channel)

	for i:=0;i<10;i++{
		channel<- i
	}
	for a:=1;a==1; {
		select {
		case v:=<-channel:
			fmt.Println(v)
		default:
			fmt.Println("nothing")
			a=0
		}
	}
	close(channel)
}*/

func test(c chan int) {
	for i := 0; i < 10; i++ {
		fmt.Println("send ", i)
		c <- i
	}
	//fmt.Println(<-c)
}
func main() {
	ch := make(chan int)
	go test(ch)
	//ch<-1
	for j := 0; j < 10; j++ {
		fmt.Println("get ", <-ch)
	}
}
