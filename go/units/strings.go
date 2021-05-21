package units

import (
	"strconv"
	"strings"
)

//获取字符串为前缀的数字
func GetPrefixNumber(str string) int64 {
	num := ""
	for i := 0; i < len(str); i++ {
		if IsNum(str[i : i+1]) {
			num += str[i : i+1]
		} else {
			break
		}
	}
	if num == "" {
		return 100000
	}
	result, _ := strconv.ParseInt(num, 0, 64)
	return result
}

// 判断是否为数字
func IsNum(s string) bool {
	_, err := strconv.ParseInt(s, 0, 64)
	return err == nil
}

// 字符串切片按前缀数字进行排序
func SortStrs(strs []string) []string {

	for i := 0; i < len(strs); i++ {
		for j := 1; j < len(strs); j++ {
			stris := strings.Split(strs[i], "/")
			stri := GetPrefixNumber(stris[len(stris)-1])

			strjs := strings.Split(strs[j-1], "/")
			strj := GetPrefixNumber(strjs[len(strjs)-1])
			if stri < strj {
				strs[i], strs[j-1] = strs[j-1], strs[i]
			}
		}
	}

	return strs
}
