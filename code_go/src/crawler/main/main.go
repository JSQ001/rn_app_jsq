package main

import (
	"crawler/engine"
	"crawler/zhenai/parser"
)

func main() {
	engine.Run(engine.Request{
		// 种子 Url
		Url:        "http://www.zhenai.com/zhenghun",
		ParserFunc: parser.ParseCityList,
	})
}
