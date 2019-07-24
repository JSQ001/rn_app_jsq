package main

import "fmt"

// 例一：捕获 panic
func dopanic(){
	defer func() {
		err := recover()
		if err , ok := err.(error); ok{
			fmt.Println(err)    // error!!
		}else {
			fmt.Println("no error")// error!!
		}
	}()

	//panic("error!!")

	div := func ()  {
		a := 0
		b := 1 / a
		fmt.Println(b)
	}
	fmt.Println(div)
	div();
}
func main() {
	dopanic()
}