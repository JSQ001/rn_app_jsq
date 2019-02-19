package from_db

type User struct {
	id                 int
	username, password string
}
var sqldata map[interface{}]interface{}

