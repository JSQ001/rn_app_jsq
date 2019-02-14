package scheduler

import "crawler_goroutine/model"

type ReadyNotifier interface {
	WorkerReady(chan model.Request)
}
