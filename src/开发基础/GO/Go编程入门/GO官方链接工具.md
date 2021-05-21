# GO官方链接工具

[官方下载](https://golang.google.cn/doc/install)

## 安装Go官方工具链

### 环境变量：GOPATH

此环境变量的默认值为当前用户的HOME目录下的名为go文件夹对应的目录路径。GOPATH环境变量可以被手动地配置多个路径。以后，当GOPATH文件夹被提及的时候，它表示GOPATH环境变量中的第一个路径对应的文件夹。

目录结构：

* src：存放源代码
* pkg: 缓存别本地项目所依赖的Go模块（一个Go模块为若干Go库包的集合）
* bin: 存放`go install`命令产生的二进制文件

查看：

* 使用命令 `go env`

## 最简单的Go程序

``` go
package main

import "fmt"

func main() {
    fmt.Println("hello world")
}
```

* 第一行指定了当前源代码文件所处的包的包名（此处为main）。
* 第二行是一个空行，用来增强可读性。
* 第三和第四行声明了一个名为main的函数。 此函数为程序的入口函数。

### 运行一个Go程序

打开一个终端（控制台）并进入源文件所在的目录，然后运行

``` shell
go run main.go
```

* `go run`子命令并不推荐在正式的大项目中使用。`go run`子命令只是一种方便的方式来运行简单的Go程序。 对于正式的项目，最好使用`go build`或者`go install`子命令构建可执行程序文件来运行Go程序。

* 支持Go模块特性的Go项目的根目录下需要一个 `go.mod` 文件。此文件可以使用 `go mod init` 子命令来生成（见下）。

## 更多go子命令

`go vet` 子命令可以用来检查可能的代码逻辑错误（即警告）。
`go fmt` 子命令来用同一种代码风格格式化Go代码。
`go test` 子命令来运行单元和基准测试用例。
`go doc` 子命令来（在终端中）查看Go代码库包的文档。

强烈推荐让你的Go项目支持Go模块特性来简化依赖管理。对一个支持Go模块特性的项目：

* `go mod init example.com/myproject`命令可以用来在当前目录中生成一个`go.mod`文件。 当前目录将被视为一个名为`example.com/myproject`的模块（即当前项目）的根目录。 此`go.mod`文件将被用来记录当前项目需要的依赖模块和版本信息。 我们可以手动编辑或者使用`go`子命令来修改此文件。
* `go mod tidy`命令用来通过扫描当前项目中的所有代码来添加未被记录的依赖至`go.mod`文件或从`go.mod`文件中删除不再被使用的依赖。
* `go get`命令用拉添加、升级、降级或者删除单个依赖。此命令不如`go mod tidy`命令常用。

从Go官方工具链1.16版本开始，我们可以运行 `go install example.com/program@latest` 来安装一个第三方Go程序的最新版本（至 `GOBIIN` 目录）。 在Go官方工具链1.16版本之前，对应的命令是 `go get -u example.com/program` （现在已经被废弃而不再推荐被使用了）。
