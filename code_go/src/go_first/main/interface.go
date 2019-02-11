package main
import "fmt"

// notifier 是一个定义了通知类行为的接口
type notifier interface {
	// 接口方法
	notice()
}

// notify 是使用值接收者实现 notifier interface 接口的方法
// sendNotification(&u) 和 sendNotification(u) 都可
func (u user) notice() {
	fmt.Println("notify", u)
}

func main() {
	u :=user{"jsq", "jsq@qq.com", 24, true}
	u.notice()
}