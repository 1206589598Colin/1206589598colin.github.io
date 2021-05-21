# Go中的 `nil`

`nil` 是Go中的一个使用频率很高的预声明标识符。 很多种类的类型的零值都用 `nil` 表示。 很多有其它语言编程经验的程序员在初学Go语言的时候常将 `nil` 看成是其它语言中的 `null` 或者 `NULL` 。 这种看法只是部分上正确的，但是Go中的 `nil` 和其它语言中的 `null` 或者 `NULL` 也是有很大的区别的。

本文的剩余部分将列出和 `nil` 相关的各种事实。

## `nil` 是一个预声明的标识符

我们可以直接使用它。

## 预声明的 `nil` 标识符可以表示很多种类型的零值

在Go中，预声明的 `nil` 可以表示下列种类（kind）的类型的零值：

* 指针类型（包括类型安全和非类型安全指针）
* 映射类型
* 切片类型
* 函数类型
* 通道类型
* 接口类型

## 预声明标识符 `nil` 没有默认类型

Go中其它的预声明标识符都有各自的默认类型，比如

* 预声明标识符`true`和`false`的默认类型均为内置类型`bool`。
* 预声明标识符`iota`的默认类型为内置类型`int`。

但是，预声明标识符 `nil` 没有一个默认类型，尽管它有很多潜在的可能类型。 事实上，预声明标识符 `nil` 是Go中唯一一个没有默认类型的类型不确定值。 我们必须在代码中提供足够的信息以便让编译器能够推断出一个类型不确定的 `nil` 值的期望类型。

一个例子：

``` go
package main

func main() {
	// 代码中必须提供充足的信息来让编译器推断出某个nil的类型。
	_ = (*struct{})(nil)
	_ = []int(nil)
	_ = map[int]bool(nil)
	_ = chan string(nil)
	_ = (func())(nil)
	_ = interface{}(nil)

	// 下面这一组和上面这一组等价。
	var _ *struct{} = nil
	var _ []int = nil
	var _ map[int]bool = nil
	var _ chan string = nil
	var _ func() = nil
	var _ interface{} = nil

	// 下面这行编译不通过。
	var _ = nil
}
```

## `nil` 不是一个关键字

预声明标识符 `nil` 可以被更内层的同名标识符所遮挡。

一个例子：

``` go
package main

import "fmt"

func main() {
	nil := 123
	fmt.Println(nil) // 123

	// 下面这行编译报错，因为此行中的nil是一个int值。
	var _ map[string]int = nil
}
```

*（顺便说一下，其它语言中的 `null` 和 `NULL` 也不是关键字。）*

## 不同种类的类型的nil值的尺寸很可能不相同

一个类型的所有值的内存布局都是一样的，此类型nil值也不例外（假设此类型的零值使用 `nil` 表示）。 所以同一个类型的nil值和非nil值的尺寸是一样的。但是不同类型的nil值的尺寸可能是不一样的。

一个例子：

``` go
package main

import (
	"fmt"
	"unsafe"
)

func main() {
	var p *struct{} = nil
	fmt.Println( unsafe.Sizeof( p ) ) // 8

	var s []int = nil
	fmt.Println( unsafe.Sizeof( s ) ) // 24

	var m map[int]bool = nil
	fmt.Println( unsafe.Sizeof( m ) ) // 8

	var c chan string = nil
	fmt.Println( unsafe.Sizeof( c ) ) // 8

	var f func() = nil
	fmt.Println( unsafe.Sizeof( f ) ) // 8

	var i interface{} = nil
	fmt.Println( unsafe.Sizeof( i ) ) // 16
}
```

上例打印出来的尺寸值取决于系统架构和具体编译器实现。 上例中的输出是使用官方标准编译器编译并在64位的系统架构上运行的结果。 在32位的系统架构上，这些输出值将减半。

对于官方标准编译器，如果两个类型属于同一种（kind）类型，并且它们的零值用 `nil` 表示，则这两个类型的尺寸肯定相等。

## 两个不同类型的nil值可能不能相互比较

比如，下例中的两行中的比较均编译不通过。

``` go
// error: 类型不匹配
var _ = (*int)(nil) == (*bool)(nil)
// error: 类型不匹配
var _ = (chan int)(nil) == (chan bool)(nil)
```

请阅读[Go中的值比较规则](https://gfw.go101.org/article/value-conversions-assignments-and-comparisons.html#comparison-rules)来了解哪些值可以相互比较。 类型确定的nil值也要遵循这些规则。

下面这些比较是合法的：

``` go
type IntPtr *int
// 类型IntPtr的底层类型为*int。
var _ = IntPtr(nil) == (*int)(nil)

// 任何类型都实现了interface{}类型。
var _ = (interface{})(nil) == (*int)(nil)

// 一个双向通道可以隐式转换为和它的
// 元素类型一样的单项通道类型。
var _ = (chan int)(nil) == (chan<- int)(nil)
var _ = (chan int)(nil) == (<-chan int)(nil)
```

## 同一个类型的两个nil值可能不能相互比较

在Go中，映射类型、切片类型和函数类型是不支持比较类型。 比较同一个不支持比较的类型的两个值（包括nil值）是非法的。 比如，下面的几个比较都编译不通过。

``` go
var _ = ([]int)(nil) == ([]int)(nil)
var _ = (map[string]int)(nil) == (map[string]int)(nil)
var _ = (func())(nil) == (func())(nil)
```

但是，映射类型、切片类型和函数类型的任何值都可以和类型不确定的裸 `nil` 标识符比较。

``` go
// 这几行编译都没问题。
var _ = ([]int)(nil) == nil
var _ = (map[string]int)(nil) == nil
var _ = (func())(nil) == nil
```

## 两个nil值可能并不相等

如果可被比较的两个nil值中的一个的类型为接口类型，而另一个不是，则比较结果总是 `false` 。 原因是，在进行此比较之前，此非接口nil值将被转换为另一个nil值的接口类型，从而将此比较转化为两个接口值的比较。 从[接口](https://gfw.go101.org/article/interface.html#boxing)一文中，我们得知每个接口值可以看作是一个包裹非接口值的盒子。 一个非接口值被转换为一个接口类型的过程可以看作是用一个接口值将此非接口值包裹起来的过程。 一个nil接口值中什么也没包裹，但是一个包裹了nil非接口值的接口值并非什么都没包裹。 一个什么都没包裹的接口值和一个包裹了一个非接口值（即使它是nil）的接口值是不相等的。

一个例子：

``` go
fmt.Println( (interface{})(nil) == (*int)(nil) ) // false
```

## 访问nil映射值的条目不会产生恐慌

访问一个nil映射将得到此映射的类型的元素类型的零值。

比如：

``` go
fmt.Println( (map[string]int)(nil)["key"] ) // 0
fmt.Println( (map[int]bool)(nil)[123] )     // false
fmt.Println( (map[int]*int64)(nil)[123] )   // <nil>
```

## `range` 关键字后可以跟随nil通道、nil映射、nil切片和nil数组指针

遍历nil映射和nil切片的循环步数均为零。

遍历一个nil数组指针的循环步数为对应数组类型的长度。 （但是，如果此数组类型的长度不为零并且第二个循环变量未被舍弃或者忽略，则对应 `for-range` 循环将导致一个恐慌。）

遍历一个nil通道将使当前协程永久阻塞。

比如，下面的代码将输出 `0` 、 `1` 、 `2` 、 `3` 和 `4` 后进入阻塞状态。 `Hello` 、 `world` 和 `Bye` 不会被输出。

``` go
for range []int(nil) {
	fmt.Println("Hello")
}

for range map[string]string(nil) {
	fmt.Println("world")
}

for i := range (*[5]int)(nil) {
	fmt.Println(i)
}

for range chan bool(nil) { // 阻塞在此
	fmt.Println("Bye")
}
```

## 通过nil非接口属主实参调用方法不会造成恐慌

一个例子：

``` go
package main

type Slice []bool

func (s Slice) Length() int {
	return len(s)
}

func (s Slice) Modify(i int, x bool) {
	s[i] = x // panic if s is nil
}

func (p *Slice) DoNothing() {
}

func (p *Slice) Append(x bool) {
	*p = append(*p, x) // 如果p为空指针，则产生一个恐慌。
}

func main() {
	// 下面这几行中的选择器不会造成恐慌。
	_ = ((Slice)(nil)).Length
	_ = ((Slice)(nil)).Modify
	_ = ((*Slice)(nil)).DoNothing
	_ = ((*Slice)(nil)).Append

	// 这两行也不会造成恐慌。
	_ = ((Slice)(nil)).Length()
	((*Slice)(nil)).DoNothing()

	// 下面这两行都会造成恐慌。但是恐慌不是因为nil
	// 属主实参造成的。恐慌都来自于这两个方法内部的
	// 对空指针的解引用操作。
	/*
	((Slice)(nil)).Modify(0, true)
	((*Slice)(nil)).Append(true)
	*/
}
```

事实上，上面的 `Append` 方法实现不完美。我们应该像下面这样实现之：

``` go
func (p *Slice) Append(x bool) {
	if p == nil {
		*p = []bool{x}
		return
	}
	*p = append(*p, x)
}
```

## 如果类型 `T` 的零值可以用预声明的 `nil` 标识符表示，则 `*new(T)` 的估值结果为一个 `T` 类型的nil值

一个例子：

``` go
package main

import "fmt"

func main() {
	fmt.Println(*new(*int) == nil)         // true
	fmt.Println(*new([]int) == nil)        // true
	fmt.Println(*new(map[int]bool) == nil) // true
	fmt.Println(*new(chan string) == nil)  // true
	fmt.Println(*new(func()) == nil)       // true
	fmt.Println(*new(interface{}) == nil)  // true
}
```

## 总结一下

在Go中，为了简单和方便， `nil` 被设计成一个可以表示成很多种类型的零值的预声明标识符。 换句话说，它可以表示很多内存布局不同的值，而不仅仅是一个值。
