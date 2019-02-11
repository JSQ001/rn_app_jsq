package main

import (
	"bufio"
	"fmt"
	"io/ioutil"
	"os"
)

func main() {
	const filename = "/Users/jsq/go/src/go_first/resource/abc.txt"
	scanFile(filename)
	readFile(filename)
}

func readFile(filename string){

	// Go 函数可以返回两个值
	// func ReadFile(filename string) ([]byte, error)

	if contents, err := ioutil.ReadFile(filename); err != nil {
		fmt.Println("error")
		fmt.Println(err)
	} else {
		// contents 是 []byte, 用%s 可以打印出来
		fmt.Printf("%s", contents)
	}
}

func scanFile(filename string)  {
	// 打开文件
	file, err := os.Open(filename)
	// 如果出错，结束进程
	if err != nil {
		panic(err)
	}
	// 获取读取器
	scanner := bufio.NewScanner(file)
	// 读取：It returns false when the scan stops, either by reaching the end of the input or an error
	for scanner.Scan() {
		fmt.Println(scanner.Text())
	}
}