package parse

import (
	"fmt"
	"goquery"
	"strings"
)

func ParserContent(content[] byte){
	fmt.Println("123123",string(content))
}

func foundDom() {
	return
}

type Source struct {
	title,
	img,
	status,
	time,
	href string

}



func ParserUrl(url string) map[string][]Source {

	maps := map[string] []Source{}
	dom, err := goquery.NewDocument(url)
	if(err != nil){
		fmt.Println(err)
	}
	fmt.Println(dom)

	dom.Find("div.row").Each(func(i int, selection *goquery.Selection) {
		//创建一个切片
		sourceSlice := []Source{}

		//获取title
		title, err := selection.Find("h3.title").Html()
		if err!=nil {
			fmt.Println(err)
		}

		selection.Find("div.movie-item").Each(func(j int, s *goquery.Selection) {
			//获取href
			href,_:= s.Find("a").Attr("href");
			//获取img
			img,_ := s.Find("img").Attr("src")
			//获取status
			status,_:= s.Find("button.hdtag").Html()
			//获取时间
			time,_:= s.Find("em span").Html()
			s1 := Source{
				strings.Replace(title,":iyy4138 ",":jsq",-1),
			 	img,
			  	status,
			 	time,
			 	href,
			}
			sourceSlice = append(sourceSlice, s1)
		})
		maps[strings.Replace(title,":iyy4138 ",":jsq",-1)] = sourceSlice;
	})
	fmt.Println(maps)

	return maps
	//fmt.Println(dom.ToggleClass("row"))

}