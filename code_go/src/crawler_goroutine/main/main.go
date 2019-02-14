package main

import (
	"crawler_goroutine/engine"
	"crawler_goroutine/model"
	"crawler_goroutine/scheduler"
	"crawler_goroutine/zhenai/parser"
)

func main() {
	engine.ConcurrentEngine{
		Scheduler:   &scheduler.SimpleScheduler{},
		WorkerCount: 1000,
	}.Run(model.Request{
		// 种子 Url
		Url:        "http://www.zhenai.com/zhenghun",
		ParserFunc: parser.ParseCityList,
	})
}
