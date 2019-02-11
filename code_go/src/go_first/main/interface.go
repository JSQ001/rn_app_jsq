package main
import "fmt"


// notifier 是一个定义了通知类行为的接口
type notifier_pointer interface {
	// 接口方法
	notify_pointer() error
}
type notifier_value interface {
	// 接口方法
	notify_value() error
}

type myUser struct {
	name string
	email string
}

// notify 是使用值接收者实现 notifier interface 接口的方法
// sendNotification(&u) 和 sendNotification(u) 都可
func (u myUser) notify_value() error {
	fmt.Println("值接收", u)
	u.email= "notice@qq.com"
	return nil
}

// notify 是使用指针接收者实现 notifier interface 接口的方法
// 只能使用 sendNotification(&u)
func (u *myUser) notify_pointer() error{
	fmt.Println("指针接收", u)
	u.email= "notify@qq.com"
	return nil
}

func main() {
	u :=myUser{"jsq", "jsq@qq.com"}
	p :=&myUser{"jsq123","jsq123@qq.com"}

	//如果需要改变 receiver 内部的属性值，选择指针接收者；
	//如果 struct 中的一个方法使用了指针接收者，那么该 struct 内的全部方法都是用指针接收者 - 一致性
	fmt.Println("go语言中的方法，接口的使用")
	SendNotification_value(u) //接口方法调用者T，值（T）接收方法
	SendNotification_value(p) //接口方法调用者*T，值（T）接收方法
	fmt.Println(u)
	fmt.Println(p)
	SendNotification_pointer(&u) //接口方法调用者*T，指针（*T）接收方法
	SendNotification_pointer(p)  //接口方法调用者*T，指针接（*T）收方法

	//SendNotification_pointer(*p) //接口方法调用者T，指针（*T）接收方法，报错
	//SendNotification_pointer(u) //接口方法调用者T，指针（*T）接收方法，报错

	fmt.Println(u)
	fmt.Println(p)
}

//类型 T 的可调用方法集包含接受者为 T 的所有方法,不包含接受者为 *T 的方法
//类型 *T 的可调用方法集包含接受者为 *T 或 T 的所有方法集

func SendNotification_value(T notifier_value) error {
	fmt.Println(T)
	return T.notify_value()
}

func SendNotification_pointer(T notifier_pointer)  error{
	fmt.Println(T)
	return T.notify_pointer()
}

//	嵌入类型，中的外部类型和内部类型同时实现接口，会使用外部的实现。