package from_db

import (
	"database/sql"
	"fmt"
	"strings"
	_ "../../mysql-master"
)

type User struct {
	id int
	username,
	password string
	authority byte
}

var sqldata map[interface{}]interface{}

//数据库配置
const (
	userName = "jsq"
	password = "jsq"
	ip = "localhost"//"192.168.0.101"
	port = "3306"
	dbName = "db_local"
)
//Db数据库连接池
var DB *sql.DB


func Crawler_db() {
	var u User
	path := strings.Join([]string{userName, ":", password, "@tcp(",ip, ":", port, ")/", dbName, "?charset=utf8"}, "")
	fmt.Println(path)
	db, err := sql.Open("mysql", path)
	check(err)
	/*//插入数据
	stmt, err := db.Prepare("INSERT user SET id=?, username=?,password=?")
	check(err)
	res, err := stmt.Exec(5,"xiaowei", "xiaowei")
	check(err)
	id, err := res.LastInsertId()
	check(err)
	fmt.Println("刚插入的id",id)*/
	//查询数据
	rows, err := db.Query("SELECT * FROM user")
	check(err)
	fmt.Println(rows.Columns())
	userinfo := make(map[interface{}]interface{})
	for rows.Next() {
		err := rows.Scan(&u.id, &u.username, &u.password,&u.authority)
		check(err)
		userinfo[u.id] = u
	}
	fmt.Println(userinfo)
}

func check(err error) {
	if err != nil {
		fmt.Println("error:",err)
	}
}

//类型
func desc() {
	s := "Hello World"
	i := 55
	strt := struct {
		name string
	}{
		name: "Naveen R",
	}
	describe(s)
	describe(i)
	describe(strt)
}

func describe(i interface{}) {
	fmt.Printf("Type = %T, value = %v\n", i, i)
	v, ok := i.(int)
	fmt.Println(v, ok)
}
