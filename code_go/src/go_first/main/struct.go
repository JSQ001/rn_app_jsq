package main

import "fmt"

// user 类
type user struct {
	name       string
	email      string
	ext        int
	privileged bool
}

// 普通的函数定义 "func 方法名(入参) 返回值"
// 自定义类型的函数定义 "func (接收者) 方法名(入参) 返回值"
// 值传递，拷贝一份 user
func (u user) notify() {
	fmt.Println("值传递", u.name, u.email)
	u.email = "0@qq.com"
}

// 传递指针(即地址)，内部改变会影响外部
func (u *user) changeEmail(newEmail string) {
	// 不需要 (*u).email
	fmt.Println("接收的指针指向的对象",u)
	u.email = newEmail
}

// admin 类
type admin struct {
	// 自定义类
	person user //user的方法不能调用，只能做属性访问fred.person.notify（一个地址）
	// 内置类型
	level string
}


//嵌入类型
/*Go 语言允许用户扩展或者修改已有类型的行为。这个功能是通过嵌入类型 type embedding 完成的。嵌入类型是将已有的类型直接声明在新的结构类型里。
被嵌入的类型被称为新的外部类型的内部类型。
Java 通常可以通过继承或组合的方式实现嵌入类型要实现的功能。

"要嵌入一个类型，只需要声明这个类型的名字就可以了"，即 user 而不是 u user， u user 是声明字段
内部类型的方法可以被提升到外部类型直接使用*/

type conAD struct {
	user
	level string
}

func main() {
	createType()
}

func createType()  {
	// 1. 创建 user 变量，所有属性初始化为其零值
	var bill user
	fmt.Println(bill) // {  0 false}

	// 2. 创建 user 变量，并初始化属性值
	lisa := user{
		name:       "nana",
		email:      "117@qq.com",
		ext:        123,
		privileged: true,
	}
	fmt.Println(lisa) // {nana 117@qq.com 123 true}
	// 直接使用属性值，属性值的顺序要与 struct 中定义的一致
	lisa2 := user{"nana", "117@qq.com", 123, true}
	fmt.Println(lisa2) // {nana 117@qq.com 123 true}

	// 3. 含有自定义类型的 struct 进行初始化
	fred := admin{
		person: user{
			    "nana",
			    "117@qq.com",
			    123,
			    true,
		},
		level: "super",
	}
	fmt.Println("fred:", fred) // fred: {{nana 117@qq.com 123 true} super}
	fmt.Println("line84",fred.person.notify) //notify方法的地址
	fmt.Println("自定义对象的方法")
	lisa.notify()
	fmt.Println(lisa)

	// 2. 指向 user 类型值的指针也可以用来调用使用值接收者声明的方法
	li := &user{"lisa", "2@qq.com", 456, true}
	fmt.Println(li)
	// 等价于 (*li).notify()
	// 注意：把 li 指针指向的 user 对象复制了一份,"再强调一次，notify 操作的是一个副本，只不过这次操作的是从 li 指针指向的值的副本。"
	li.notify() // {"lisa", "2@qq.com"}
	fmt.Println("2", li.email) // "0@qq.com"（错）  2@qq.com（对）

	// 3.user 类型的值可以用来调用使用指针接收者声明的方法
	// 等价于 (&bill).changeEmail ("100@qq.com")，注意 changeEmail 接收的是一个指针
	fmt.Println(&bill)
	bill.changeEmail("100@qq.com")
	fmt.Println("3指针接收", bill.email) // "100@qq.com"

	// 4.指向 user 类型值的指针可以用来调用使用指针接收者声明的方法
	lisa.changeEmail("200@qq.com")
	fmt.Println("4", lisa) // "{nana 200@qq.com 123 true}"

	fmt.Println("-------嵌入类型-------")
	ad := conAD{
		user: user{"jsq", "110@qq.com", 1000,true},
		level: "super",
	}
	// 我们可以直接访问内部类型的方法
	ad.user.notify() // notify {nana 110@qq.com}
	// 内部类型的方法也被提升到外部类型
	ad.notify() // notify {nana 110@qq.com}
	fmt.Println(ad)
	fmt.Println(ad.notify)  //notify方法的地址
	ad.changeEmail("jsq@qq.com")
	fmt.Println(ad)

}

