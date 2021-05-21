package units

import (
	"fmt"
	"io/ioutil"
	"os"
)

// 重写文件内容
func WriteToFile(fileName string, content string) error {
	f, err := os.OpenFile(fileName, os.O_WRONLY|os.O_TRUNC|os.O_CREATE, 0644)
	if err != nil {
		fmt.Println("file create failed. err: " + err.Error())
	} else {
		n, _ := f.Seek(0, os.SEEK_END)
		_, err = f.WriteAt([]byte(content), n)
		// fmt.Println("write succeed!")
		defer f.Close()
	}
	return err
}

// 获取全部文件
func GetAllFile(pathname string) []string {
	result := []string{}
	rd, _ := ioutil.ReadDir(pathname)
	for _, fi := range rd {
		if fi.IsDir() {
			result = append(result, GetAllFile(pathname+fi.Name()+"/")...)
		} else {
			result = append(result, pathname+fi.Name())
		}
	}

	return result
}
