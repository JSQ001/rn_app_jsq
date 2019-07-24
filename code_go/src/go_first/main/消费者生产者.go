package main

import (
	"fmt"
	"sync"
)

/*func Productor(mychan chan int,data int,wait *sync.WaitGroup)  {
	mychan <- data
	fmt.Println("product data：",data)
	wait.Done()
}
func Consumer(mychan chan int,wait *sync.WaitGroup)  {
	a := <- mychan
	fmt.Println("consumer data：",a)
	wait.Done()
}
func main() {

	datachan := make(chan int, 100)   //通讯数据管道
	var wg sync.WaitGroup
	for i := 0; i < 20; i++ {
		go Productor(datachan, i,&wg) //生产数据
		go Consumer(datachan,&wg)  //消费数据
		wg.Add(2)
	}
	wg.Wait()
}*/


func p(n *int,wg *sync.WaitGroup)  {
	defer wg.Done()
	if *n>0{
		*n--
		fmt.Println(*n)
	}else {
		fmt.Println("被拿光了")
	}
}

func c(n *int,wg *sync.WaitGroup)  {
	defer wg.Done()
	*n++
	fmt.Println(*n)
}
//共享变量
func main() {
	good :=0;
	var wg sync.WaitGroup
	for i:=0;i<20;i++ {
		wg.Add(2)
		go c(&good,&wg);
		go p(&good,&wg);
	}
	wg.Wait()

}