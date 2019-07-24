package from_url

import (
	"../parse"
	"fmt"
)
import "../fethcer"

//http获取网页的二进制数据，转化为stirng类型就是网页内容，编写需要的数据的正则表达式

func Crawler_url() map[string][]parse.Source{
	//url := "http://www.lalalo.com/"
	url := "http://hxcwzc.com/player.aspx?AgentID=13389&id=6618"



	body,_:= fethcer.Fetch(url)
	fmt.Println(string(body))
	parse.ParserContent(body)
	return parse.ParserUrl(url);
}
