package logic

import (
	"strings"

	"gitee.com/ColinWWL/blog/tree/master/go/units"
)

// 路由参数
type RouteParam struct {
	Title    string
	Path     string
	Children []string
}

// 重新路由文件
func RewirteRouteFile() {
	content := GetSidebarContent("./src/")
	units.WriteToFile("./src/.vuepress/config/sidebar/index.js", content)
}

// 重新生成路由文件
func GetSidebarContent(pathname string) string {
	content := "function getSidebar() {\n"
	content += "	return {\n"
	packRoute := PackRoute(pathname)
	for key, value := range packRoute {
		content += "'" + key + "':["
		for _, routeParam := range value {
			content += "	{\n"
			content += "	title: '" + routeParam.Title + "',"
			content += "	path: '" + routeParam.Path + "',"
			content += "	collapsable: false,"
			content += "	sidebarDepth: 2,"
			content += "	children: ["

			for _, children := range routeParam.Children {
				content += "'" + children + "',"
			}

			content += "	]"

			content += "	},\n"
		}
		content += "],"
	}

	content += "	}\n"
	content += "}\n"
	content += "module.exports = { getSidebar }"
	return content
}

// 获取所有md文档文件
func GetAllFileDocs(pathname string) []string {
	docsPaths := []string{}
	filePaths := units.GetAllFile(pathname)
	for _, filePath := range filePaths {
		filePath = strings.Replace(filePath, "./src/", "", 1)
		filePathParts := strings.Split(filePath, ".")
		fileType := filePathParts[len(filePathParts)-1]
		// 后缀名为md
		if fileType != "md" {
			continue
		}
		// 必须有前2级文件夹
		filePathParts = strings.Split(filePath, "/")

		if len(filePathParts) < 3 {
			continue
		}

		docsPaths = append(docsPaths, filePath)

	}

	return docsPaths
}

// 将文档按照路径，组装数据格式
func PackRoute(pathname string) map[string][]RouteParam {
	docsPaths := GetAllFileDocs(pathname)
	result := map[string][]RouteParam{}

	for _, docsPath := range docsPaths {
		// 获取键值路径
		docsPathParts := strings.Split(docsPath, "/")

		keyPath := "/"
		childrenPath := ""

		// 设置路由部分
		for index, docsPathPart := range docsPathParts {
			switch index {
			case 0, 1:
				keyPath += docsPathPart + "/"
			default:
				childrenPath += docsPathPart
				if len(docsPathParts) > index+1 {
					childrenPath += "/"
				}
			}
		}

		childrenPath = keyPath + childrenPath

		title := ""
		if len(docsPathParts) > 3 {
			title = docsPathParts[2]
		} else {
			title = docsPathParts[1]
		}

		// 检查是否存在路径
		if _, ok := result[keyPath]; ok {

			// 检查title是否存在该数据
			isExsit := false
			for _, value := range result[keyPath] {
				if value.Title == title {
					isExsit = true
					// result[keyPath][key].Children = append(result[keyPath][key].Children, childrenPath)
				}
			}
			if !isExsit {
				result[keyPath] = append(result[keyPath], RouteParam{
					Title:    title,
					Path:     childrenPath[0 : len(childrenPath)-3],
					Children: []string{},
				})
			}

			for key, value := range result[keyPath] {
				if value.Title == title {
					result[keyPath][key].Children = append(result[keyPath][key].Children, childrenPath)
				}
			}

		} else {

			result[keyPath] = []RouteParam{RouteParam{
				Title:    title,
				Path:     childrenPath[0 : len(childrenPath)-3],
				Children: []string{childrenPath},
			}}

		}
	}

	// 排序
	for resultK, resultv := range result {
		for resultvK, routeParam := range resultv {
			result[resultK][resultvK].Children = units.SortStrs(routeParam.Children)
			children1 := result[resultK][resultvK].Children[0]
			result[resultK][resultvK].Path = result[resultK][resultvK].Children[0][0 : len(children1)-3]
		}
	}

	return result
}
