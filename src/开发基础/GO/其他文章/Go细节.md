# Go细节

## 一个包可以在一个源文件里被引入多次。

一个Go源文件可以多次引入同一个包。但是每次的引入名称必须不同。这些相同的包引入引用着同一个包实例。

示例：

``` go
package main

import "fmt"
import "io"
import inout "io"

func main() {
	fmt.Println(&inout.EOF == &io.EOF) // true
}
```

## 在 `switch` 和 `select` 流程控制代码块中， `default` 分支可以放在所有的 `case` 分支之前或者所有的 `case` 分支之后，也可以放在 `case` 分支之间。

示例：

``` go
	switch n := rand.Intn(3); n {
	case 0: fmt.Println("n == 0")
	case 1: fmt.Println("n == 1")
	default: fmt.Println("n == 2")
	}

	switch n := rand.Intn(3); n {
	default: fmt.Println("n == 2")
	case 0: fmt.Println("n == 0")
	case 1: fmt.Println("n == 1")
	}

	switch n := rand.Intn(3); n {
	case 0: fmt.Println("n == 0")
	default: fmt.Println("n == 2")
	case 1: fmt.Println("n == 1")
	}

	var x, y chan int

	select {
	case <-x:
	case y <- 1:
	default:
	}

	select {
	case <-x:
	default:
	case y <- 1:
	}

	select {
	default:
	case <-x:
	case y <- 1:
	}
```

## `switch` 流程控制代码块中的数字常量case表达式不能重复，但是布尔常量case表达式可以重复。

例如，下面的代码在编译时会失败。

``` go
package main

func main() {
	switch 123 {
	case 123:
	case 123: // error: duplicate case
	}
}
```

但是下面的代码在编译时是没问题的。

``` go
package main

func main() {
	switch false {
	case false:
	case false:
	}
}
```

关于原因，请阅读[这个issue](https://github.com/golang/go/issues/28357)。 此行为依赖于编译器。事实上，标准编译器同样不允许重复的字符串case表达式，但是gccgo编译器却允许。

## `switch` 流程控制代码块里的switch表达式总是被估值为类型确定值。

例如，在下列 `switch` 代码块中的switch表达式 `123` 被视为一个 `int` 值，而不是一个类型不确定的整数。

``` go
package main

func main() {
	switch 123 {
	case int64(123):  // error: 类型不匹配
	case uint32(789): // error: 类型不匹配
	}
}
```

## `switch` 流程控制代码块中的switch表达式的缺省默认值为类型确定值 `true` （其类型为预定义类型 `bool` ）。

例如，下列程序会打印出 `true` 。

``` go
package main

import "fmt"

func main() {
	switch { // <=> switch true {
	case true:  fmt.Println("true")
	case false: fmt.Println("false")
	}
}
```

## 有时候，显式代码块的开括号 `{` 可以放在下一行。

例如：

``` go
package main

func main() {
	var i = 0
Outer:
	for
	{ // 在这里断行是没问题的
		switch
		{ // 在这里断行是没问题的
		case i == 5:
			break Outer
		default:
			i++
		}
	}
}
```

下面程序的结果会打印什么？ `true` 还是 `false` ？ 答案是 `true` 。 关于原因请阅读[Go中的代码断行规则](https://gfw.go101.org/article/line-break-rules.html)一文。

``` go
package main

import "fmt"

func False() bool {
	return false
}

func main() {
	switch False()
	{
	case true:  fmt.Println("true")
	case false: fmt.Println("false")
	}
}
```

## 有些 `case` 分支代码块必须是显式的。

例如，下面的程序会在编译时将失败。

``` go
func demo(n, m int) (r int) {
	switch n {
	case 123:
		if m > 0 {
			goto End
		}
		r++

		End: // syntax error: 标签后缺少语句
	default:
		r = 1
	}
	return
}
```

为了编译通过， `case` 分支代码块必须改成显式的：

``` go
func demo(n, m int) (r int) {
	switch n {
	case 123: {
		if m > 0 {
			goto End
		}
		r++

		End:
	}
	default:
		r = 1
	}
	return
}
```

另外，我们可以在标签 `End:` 之后加一个分号，如下所示：

``` go
func demo(n, m int) (r int) {
	switch n {
	case 123:
		if m > 0 {
			goto End
		}
		r++

		End:;
	default:
		r = 1
	}
	return
}
```

关于原因，请阅读[Go的代码断行规则](https://gfw.go101.org/article/line-break-rules.html)一文。

## 嵌套的延迟函数调用可以修改外层函数的返回结果。

例如：

``` go
package main

import "fmt"

func F() (r int) {
	defer func() {
		r = 789
	}()

	return 123 // <=> r = 123; return
}

func main() {
	fmt.Println(F()) // 789
}
```

## 某些 `recover` 函数调用是空操作。

我们需要在正确的地方调用 `recover` 函数。 关于细节，请阅读 [在正确的位置调用内置函数 `recover` ](https://gfw.go101.org/article/panic-and-recover-more.html)一文。

## 我们可以使用 `os. Exit` 函数调用退出一个程序和使用 `runtime. Goexit` 函数调用退出一个协程。

我们可以通过调用 `os. Exit` 函数从任何函数里退出一个程序。 `os. Exit` 函数调用接受一个 `int` 代码值做为参数并将此代码返回给操作系统。

示例：

``` go
// exit-example.go
package main

import "os"
import "time"

func main() {
	go func() {
		time.Sleep(time.Second)
		os.Exit(1)
	}()
	select{}
}
```

运行：

``` 

$ go run a.go
exit status 1
$ echo $?
1
```

我们可以通过调用 `runtime. Goexit` 函数退出一个goroutine。 `runtime. Goexit` 函数没有参数。

在下面的示例中，文字 `Java` 将不会被打印出来。

``` go
package main

import "fmt"
import "runtime"

func main() {
	c := make(chan int)
	go func() {
		defer func() {c <- 1}()
		defer fmt.Println("Go")
		func() {
			defer fmt.Println("C")
			runtime.Goexit()
		}()
		fmt.Println("Java")
	}()
	<-c
}
```

## 递增运算符 `++` 和递减运算符 `--` 的优先级低于解引用运算符 `*` 和取地址运算符 `&` ，解引用运算符和取地址运算符的优先级低于选择器 `.` 中的属性选择操作符。

例如：

``` go
package main

import "fmt"

type T struct {
	x int
	y *int
}

func main() {
	var t T
	p := &t.x // <=> p := &(t.x)
	fmt.Printf("%T\n", p) // *int

	*p++ // <=> (*p)++
	*p-- // <=> (*p)--

	t.y = p
	a := *t.y // <=> *(t.y)
	fmt.Printf("%T\n", a) // int
}
```

## 移位运算中的左类型不确定操作数的类型推断规则取决于右操作数是否是常量。

``` go
package main

func main() {
}

const M  = 2
var _ = 1.0 << M // 编译没问题。1.0将被推断为一个int值。

var N = 2
var _ = 1.0 << N // 编译失败。1.0将被推断为一个float64值。
```

关于原因请阅读[运算操作符](https://gfw.go101.org/article/operators.html#bitwise-shift-left-operand-type-deduction)一文。

## 如果两个指针的类型具有不同的底层类型但是它们的基类型却共享相同的底层类型，则这两个指针值可以间接相互转换为对方的类型。

例如：

``` go
package main

type MyInt int64
type Ta    *int64
type Tb    *MyInt

func main() {
	var a Ta
	var b Tb

	//a = Ta(b) // error: 直接转换是不允许的。

	// 但是间接转换是允许的。
	y := (*MyInt)(b)
	x := (*int64)(y)
	a = x           // 等价于下一行
	a = (*int64)(y) // 等价于下一行
	a = (*int64)((*MyInt)(b))
	_ = a
}
```

## 两个零尺寸值的地址可能相等，也可能不相等。

两个零尺寸值的地址是否相等时依赖于具体编译器实现以及具体编译器版本。

``` go
package main

import "fmt"

func main() {
	a := struct{}{}
	b := struct{}{}
	x := struct{}{}
	y := struct{}{}
	m := [10]struct{}{}
	n := [10]struct{}{}
	o := [10]struct{}{}
	p := [10]struct{}{}

	fmt.Println(&x, &y, &o, &p)

	// 对于标准编译器1.16版本，x、y、o和p将
	// 逃逸到堆上，但是a、b、m和n则开辟在栈上。

	fmt.Println(&a == &b) // false
	fmt.Println(&x == &y) // true
	fmt.Println(&a == &x) // false

	fmt.Println(&m == &n) // false
	fmt.Println(&o == &p) // true
	fmt.Println(&n == &p) // false
}
```

上面代码中所示的输出是针对标准编译器1.16版本的。

## 一个指针类型的基类型可以为此指针类型自身。

例如：

``` go
package main

func main() {
	type P *P
	var p P
	p = &p
	p = **************p
}
```

类似的，

* 一个切片类型的元素类型可以是此切片类型自身，
* 一个映射类型的元素类型可以是此映射类型自身，
* 一个通道类型的元素类型可以是此通道类型自身，
* 一个函数类型的输入参数和返回结果值类型可以是此函数类型自身。

``` go
package main

func main() {
	type S []S
	type M map[string]M
	type C chan C
	type F func(F) F

	s := S{0:nil}
	s[0] = s
	m := M{"Go": nil}
	m["Go"] = m
	c := make(C, 3)
	c <- c; c <- c; c <- c
	var f F
	f = func(F)F {return f}

	_ = s[0][0][0][0][0][0][0][0]
	_ = m["Go"]["Go"]["Go"]["Go"]
	<-<-<-c
	f(f(f(f(f))))
}
```

## 有关选择器缩写形式的细节。

无论一个指针值的类型是定义的还是非定义的，如果它的（指针）类型的基类型为一个结构体类型，则我们可以使用此指针值来选择它所引用着的结构体中的字段。 但是，如果此指针的类型为一个定义的类型，则我们不能使用此指针值来选择它所引用着的结构体中的方法。

我们总是不能使用二级以上指针来选择结构体字段和方法。

``` go
package main

type T struct {
	x int
}
func (T) m(){} // T有一个方法m。

type P *T  // P为一个定义的一级指针。
type PP *P // PP为一个定义的二级指针。

func main() {
	var t T
	var tp = &t
	var tpp = &tp
	var p P = tp
	var pp PP = &p
	tp.x = 12  // 没问题
	p.x = 34   // 没问题
	pp.x = 56  // error: 类型PP没有名为x的字段或者方法。
	tpp.x = 78 // error: 类型**T没有名为x的字段或者方法。

	tp.m()  // 没问题，因为类型*T也有一个m方法。
	p.m()   // error: 类型P没有名为m的字段或者方法。
	pp.m()  // error: 类型PP没有名为m的字段或者方法。
	tpp.m() // error: 类型**T没有名为m的字段或者方法。
}
```

## 有时候，嵌套组合字面量可以被简化。

关于细节，请阅读[内嵌组合字面量可以被简化](https://gfw.go101.org/article/container.html#composite-literal-simplification)这一章节。

## 在某些情形下，我们可以将数组指针当作数组来用。

关于细节，请阅读[把数组指针当做数组来使用](https://gfw.go101.org/article/container.html#use-pointer-as-array)这一章节。

## 从nil映射中读取元素不会导致崩溃，读取结果是一个零元素值。

例如，函数 `Foo1` 和 `Foo2` 是等价的，但是函数 `Foo2` 比函数 `Foo1` 简洁得多。

``` go
func Foo1(m map[string]int) int {
	if m != nil {
		return m["foo"]
	}
	return 0
}

func Foo2(m map[string]int) int {
	return m["foo"]
}
```

## 从一个nil映射中删除一个条目不会导致崩溃，这是一个空操作。

例如，下面这个程序不会因为恐慌而崩溃。

``` go
package main

func main() {
	var m map[string]int // nil
	delete(m, "foo")
}
```

## `append` 函数调用的结果可能会与原始切片共享一些元素，也可能不共享任何元素。

关于细节，请阅读[添加和删除容器元素](https://gfw.go101.org/article/container.html#element-addition-deletion)这一章节。

## 从一个基础切片派生出的子切片的长度可能大于基础切片的长度。

例如：

``` go
package main

import "fmt"

func main() {
	s := make([]int, 3, 9)
	fmt.Println(len(s)) // 3
	s2 := s[2:7]
	fmt.Println(len(s2)) // 5
}
```

关于细节，请阅读[从数组或者切片派生切片](https://gfw.go101.org/article/container.html#subslice)这一章节。

## 从一个nil切片中派生子切片是允许的，只要子切片表达式中使用的所有索引都为零，则不会有恐慌产生，结果子切片同样是一个nil切片。

例如，下面的程序在运行时刻不会产生恐慌。

``` go
package main

import "fmt"

func main() {
	var x []int // nil
	a := x[:]
	b := x[0:0]
	c := x[:0:0]
	// 下一行将打印出三个true。
	fmt.Println(a == nil, b == nil, c == nil)
}
```

关于细节，请阅读[从数组或者切片派生切片](https://gfw.go101.org/article/container.html#subslice)这一章节。

## 用 `range` 遍历nil映射或者nil切片是没问题的，这属于空操作。

例如，下面的程序可以编译是没问题的。

``` go
package main

func main() {
	var s []int // nil
	for range s {
	}

	var m map[string]int // nil
	for range m {
	}
}
```

## 用 `range` 遍历nil数组指针时，如果忽略或省略第二个迭代变量，则此遍历是没问题的。遍历中的循环步数为相应数组类型的长度。

例如，下面的程序会输出 `01234` 。

``` go
package main

import "fmt"

func main() {
	var a *[5]int // nil
	for i, _ := range a {
		fmt.Print(i)
	}
}
```

## 切片的长度和容量可以被单独修改。

我们可以通过反射途径单独修改一个切片的长度或者容量。 关于细节，请阅读[单独修改一个切片的长度或者容量](https://gfw.go101.org/article/container.html#modify-slice-length-and-capacity)这一章节。

## 切片和数组组合字面量中的索引必须是非负常量。

例如，下面的程序将编译失败。

``` go
var k = 1
var x = [2]int{k: 1} // error: 索引必须为一个常量
var y = []int{k: 1}  // error: 索引必须为一个常量
```

注意，映射组合字面量中的键值不必为常量。

## 切片/数组/映射组合字面量的常量索引和键值不能重复。

例如，下面的程序将编译失败。

``` go
// error: 重复的索引：1
var a = []bool{0: false, 1: true, 1: true}
// error: 重复的索引：0
var b = [...]string{0: "foo", 1: "bar", 0: "foo"}
// error: 重复的键值："foo"
var c = map[string]int{"foo": 1, "foo": 2}
```

这个特性可以用于[在编译时刻断言某些条件](https://gfw.go101.org/article/tips.html#assert-at-compile-time)。

## 不可寻址的数组的元素依旧是不可寻址的，但是不可寻址的切片的元素总是可寻址的。

原因是一个数组值的元素和此数组存储在同一个内存块中。 但是[切片的情况大不相同](https://gfw.go101.org/article/unofficial-faq.html#slice-elements-always-addressable)。

一个例子：

``` go
package main

func main() {
	// 组合字面量是不可寻址的。

	/* 取容器元素的地址。 */

	// 取不可寻址的切片的元素的地址是没问题的
	_ = &[]int{1}[0]
	// error: 不能取不可寻址的数组的元素的地址
	_ = &[5]int{}[0]

	/* 修改元素值。 */

	// 修改不可寻址的切片的元素是没问题的
	[]int{1,2,3}[1] = 9
	// error: 不能修改不可寻址的数组的元素
	[3]int{1,2,3}[1] = 9
}
```

## 可以从不可寻址的切片派生子切片，但是不能从不可寻址的数组派生子切片。

原因和上一个细节是一样的。

例如：

``` go
package main

func main() {
	// 映射元素是不可寻址的。

	// 下面几行编译没问题。
	_ = []int{6, 7, 8, 9}[1:3]
	var ms = map[string][]int{"abc": {0, 1, 2, 3}}
	_ = ms["abc"][1:3]

	// 下面几行将编译失败，因为不可从不可寻址的数组派生切片。
	/*
	_ = [...]int{6, 7, 8, 9}[1:3] // error
	var ma = map[string][4]int{"abc": {0, 1, 2, 3}}
	_ = ma["abc"][1:3]  // error
	*/
}
```

## 把以 `NaN` 做为键值的条目放如映射就宛如把条目放入黑洞一样。

原因是[下面的另一个细节](https://gfw.go101.org/article/details.html#nan-inf)中提到的 `NaN != NaN` 。 但是，在Go1.12之前，以 `NaN` 作为键值的元素只能在 `for-range` 循环中被找到； 从Go1.12开始，以 `NaN` 作为键值的元素也可以通过类似 `fmt. Print` 的函数打印出来。

``` go
package main

import "fmt"
import "math"

func main() {
	var a = math.NaN()
	fmt.Println(a) // NaN

	var m = map[float64]int{}
	m[a] = 123
	v, present := m[a]
	fmt.Println(v, present) // 0 false
	m[a] = 789
	v, present = m[a]
	fmt.Println(v, present) // 0 false

	fmt.Println(m) // map[NaN:789 NaN:123]
	delete(m, a)   // no-op
	fmt.Println(m) // map[NaN:789 NaN:123]

	for k, v := range m {
		fmt.Println(k, v)
	}
	// the above loop outputs:
	// NaN 123
	// NaN 789
}
```

注意：在Go1.12之前，两个 `fmt. Println(m)` 调用均打印出 `map[NaN:<nil> NaN:<nil>]` 。

## 字符串转换为byte切片或rune切片后的结果切片的容量可能会大于长度。

我们不应该假设结果切片的长度和容量总是相等的。

在下面的例子中，如果最后一个 `fmt. Println` 行被删除，在其前面的两行会打印相同的值 `32` ，否则，一个打印 `32` ，一个打印 `8` （对于标准编译器1.16版本来说）。

``` go
package main

import "fmt"

func main() {
	s := "a"
	x := []byte(s)              // len(s) == 1
	fmt.Println(cap([]byte(s))) // 32
	fmt.Println(cap(x))         // 8
	fmt.Println(x)
}
```

如果我们假设结果切片的长度和容量总是相等，[就可能写出一些有bug的代码](https://github.com/go101/go101/wiki/The-capacity-of-the-result-byte-(or-rune)-slice-of-a-conversion-from-a-string-is-undefined)。

## 对于切片 `s` ，循环 `for i = range s {...}` 并不等价于循环 `for i = 0; i < len(s); i++ {...}` 。

对于这两个循环，迭代变量 `i` 的最终值可能是不同的。

``` go
package main

import "fmt"

var i int

func fa(s []int, n int) int {
	i = n
	for i = 0; i < len(s); i++ {}
	return i
}

func fb(s []int, n int) int {
	i = n
	for i = range s {}
	return i
}

func main() {
	s := []int{2, 3, 5, 7, 11, 13}
	fmt.Println(fa(s, -1), fb(s, -1)) // 6 5
	s = nil
	fmt.Println(fa(s, -1), fb(s, -1)) // 0 -1
}
```

## 一个映射中的条目的遍历次序在两次遍历中可能并不相同。我们可以认为映射中的条目的遍历次序是随机的。

比如下面这个例子不会无穷尽地循环下去（注意每次退出前的循环次数可能不同）：

``` go
package main

import "fmt"

func f(m map[byte]byte) string {
	bs := make([]byte, 0, 2*len(m))
	for k, v := range m {
		bs = append(bs, k, v)
	}
	return string(bs)
}

func main() {
	m := map[byte]byte{'a':'A', 'b':'B', 'c':'C'}
	s0 := f(m)
	for i := 1; ; i++{
		if s := f(m); s != s0 {
			fmt.Println(s0)
			fmt.Println(s)
			fmt.Println(i)
			return
		}
	}
}
```

注意：对映射进行JSON格式化输出中的映射条目是按照它们的键值排序的。 另外，从Go 1.12开始，使用 `fmt` 标准库包中的打印函数打印映射时，输出的映射条目也是按照它们的键值排序的； 而在Go 1.12之前，这些打印输出时乱序的。

## 在对一个映射进行条目遍历期间，在此映射中创建的新条目可能会在当前遍历中被遍历出来，也可能不会。

有例为证：

``` go
package main

import "fmt"

func main() {
	m := map[int]int{0: 0, 1: 100, 2: 200}
	r, n, i:= len(m), len(m), 0
	for range m {
		m[n] = n*100
		n++
		i++
	}
	fmt.Printf("新增了%d个条目，其中%d个被遍历出来，%d个没有。\n",
		i, i - r, n - i,
	)
}
```

感谢Valentin Deleplace提出了上面[两条细节建议](https://twitter.com/val_deleplace/status/1358784287399698434)。

## 一个多返回值函数调用表达式不能和其它表达式混用在一个赋值语句的右侧或者另一个函数调用的实参列表中。

关于细节，请阅读[有返回值的函数的调用是一种表达式](https://gfw.go101.org/article/function.html#call-as-expression)这一章节。

## 某些函数调用是在在编译时刻被估值的。

关于细节，请阅读[哪些函数调用将在编译时刻被估值？](https://gfw.go101.org/article/summaries.html#compile-time-evaluation)这一总结。

## 每一个方法都对应着一个隐式声明的函数。

关于细节，请阅读[每个方法对应着一个隐式声明的函数](https://gfw.go101.org/article/method.html#method-as-function)这一章节。

## 如果两个接口值具有相同的动态类型并且此动态类型不支持比较，则比较这两个接口值将导致一个恐慌。

例如：

``` go
package main

func main() {
	var x interface{} = []int{}
	_ = x == x // panic
}
```

## 类型断言可以用于将一个接口值转换为另一个接口类型，即使此接口值的类型并未实现另一个接口类型。

例如：

``` go
package main

type Foo interface {
	foo()
}

type T int
func (T) foo() {}

func main() {
	var x interface{} = T(123)
	// 下面这两行将编译失败。
	/*
	var _ Foo = x   // error: interface{}类型没有实现Foo类型
	var _ = Foo(x)  // error: interface{}类型没有实现Foo类型
	*/
	// 但是下面这行可以编译通过。
	var _ = x.(Foo) // okay
}
```

## 一个失败的类型断言的可选的第二个结果是否被舍弃将影响此类型断言的行为。

如果第二个可选结果出现在失败的类型断言中，那么此类型断言不会导致恐慌。否则，恐慌将产生。 例如：

``` go
package main

func main() {
	var x interface{} = true
	_, _ = x.(int) // 断言失败，但不会导致恐慌。
	_ = x.(int)    // 断言失败，并导致一个恐慌。
}
```

## 关于在编译时刻即可确定总是失败的目标类型为接口类型的断言。

在编译时刻，编译可以发现某些目标类型为接口类型的断言是不可能成功的。比如下面这个程序中的断言：

``` go
package main

type Ia interface {
	m()
}

type Ib interface {
	m() int
}

type T struct{}

func (T) m() {}

func main() {
	var x Ia = T{}
	_ = x.(Ib) // panic: main.T is not main.Ib
}
```

这样的断言并不会导致编译失败（但编译后的程序将在运行时刻产生恐慌）。 从官方Go工具链1.15开始， `go vet` 会对对这样的断言做出警告。

## 以相同实参调用两次 `errors. New` 函数返回的两个 `error` 值是不相等的。

原因是 `errors. New` 函数会复制输入的字符串实参至一个局部变量并取此局部变量的指针作为返回 `error` 值的动态值。 两次调用会产生两个不同的指针。

``` go
package main

import "fmt"
import "errors"

func main() {
	notfound := "not found"
	a, b := errors.New(notfound), errors.New(notfound)
	fmt.Println(a == b) // false
}
```

## 单向接收通道无法被关闭。

例如，下面的代码会在编译时候失败。

``` go
package main

func main() {
}

func foo(c <-chan int) {
	close(c) // error: 不能关闭单向接收通道
}
```

## 发送一个值到一个已关闭的通道被视为一个非阻塞操作，该操作会导致恐慌。

例如，在下面的程序里，如果第二个 `case` 分支会被选中，则在运行时刻将产生一个恐慌。

``` go
package main

func main() {
	var c = make(chan bool)
	close(c)
	select {
	case <-c:
	case c <- true: // panic: 向已关闭的通道发送数据
	default:
	}
}
```

## 类型可以在声明函数体内。

类型可以声明在函数体内。例如，

``` go
package main

func main() {
	type T struct{}
	type S = []int
}
```

## 对于标准编译器，结构体中的某些零尺寸字段的尺寸有可能会被视为一个字节。

关于细节，请阅读[这个FAQ条目](https://gfw.go101.org/article/unofficial-faq.html#final-zero-size-field)。

## NaN != NaN，Inf == Inf。

此规则遵循IEEE-754标准，并与大多数其它语言是一致的。

``` go
package main

import "fmt"
import "math"

func main() {
	var a = math.Sqrt(-1.0)
	fmt.Println(a)      // NaN
	fmt.Println(a == a) // false

	var x = 0.0
	var y = 1.0 / x
	var z = 2.0 * y
	fmt.Println(y, z, y == z) // +Inf +Inf true
}
```

## 不同代码包中的两个非导出方法名和结构体字段名总是被视为不同的名称。

例如，在包 `foo` 中声明了如下的类型：

``` go
package foo

type I = interface {
	about() string
}

type S struct {
	a string
}

func (s S) about() string {
	return s.a
}
```

在包 `bar` 中声明了如下的类型：

``` go
package bar

type I = interface {
	about() string
}

type S struct {
	a string
}

func (s S) about() string {
	return s.a
}
```

那么，

* 两个包中的两个类型`S`的值不能相互转换。
* 两个包中的两个接口类型指定了两个不同的方法集。
* 类型`foo. S`没有实现接口类型 `bar. I`。
* 类型`bar. S`没有实现接口类型`foo. I`。

``` go
package main

import "包2/foo"
import "包2/bar"

func main() {
	var x foo.S
	var y bar.S
	var _ foo.I = x
	var _ bar.I = y

	// 下面这些行将编译失败。
	x = foo.S(y)
	y = bar.S(x)
	var _ foo.I = y
	var _ bar.I = x
}
```

## 在结构体值的比较中，名为空标识符的字段将被忽略。

比如，下面这个程序将打印出 `true` 。

``` go
package main

import "fmt"

type T struct {
	_ int
	_ bool
}

func main() {
	var t1 = T{123, true}
	var t2 = T{789, false}
	fmt.Println(t1 == t2) // true
}
```

## 在某些很少见的场景中，圆括号是必需的。

例如：

``` go
package main

type T struct{x, y int}

func main() {
	// 因为{}的烦扰，下面这三行均编译失败。
	/*
	if T{} == T{123, 789} {}
	if T{} == (T{123, 789}) {}
	if (T{}) == T{123, 789} {}
	var _ = func()(nil) // nil被认为是一个类型
	*/

	// 必须加上一对小括号()才能编译通过。
	if (T{} == T{123, 789}) {}
	if (T{}) == (T{123, 789}) {}
	var _ = (func())(nil) // nil被认为是一个值
}
```

## 栈溢出不可被挽救，它将使程序崩溃。

在目前的主流Go编译器实现中，栈溢出是致命错误。一旦栈溢出发生，程序将不可恢复地崩溃。

``` go
package main

func f() {
	f()
}

func main() {
	defer func() {
		recover() // 无法防止程序崩溃
	}()
	f()
}
```

运行结果：

``` 

runtime: goroutine stack exceeds 1000000000-byte limit
fatal error: stack overflow

runtime stack:
...
```

关于更多不可恢复的致命错误，请参考[此篇维基文章](https://github.com/go101/go101/wiki/Panic-and-crash-cases)。

## 某些表达式的估值顺序取决于具体编译器实现。

关于细节，请阅读[表达式估值顺序规则](https://gfw.go101.org/article/evaluation-orders.html)一文。

## `reflect. DeepEqual(x, y)` 和 `x == y` 的结果可能会不同。

如果表达式 `x` 和 `y` 的类型不相同，则函数调用 `DeepEqual(x, y)` 的结果总为 `false` ，但 `x == y` 的估值结果有可能为 `true` 。

如果 `x` 和 `y` 为（同类型的）两个引用着不同其它值的指针值，则 `x == y` 的估值结果总为 `false` ，但函数调用 `DeepEqual(x, y)` 的结果可能为 `true` ，因为函数 `reflect. DeepEqual` 将比较 `x` 和 `y` 所引用的两个值。

第三个区别是当 `x` 和 `y` 处于一个循环引用链中时， `DeepEqual` 调用的结果可能未必正确。

第四个区别是一个 `DeepEqual(x, y)` 调用无论如何不应该产生一个恐慌，但是如果 `x` 和 `y` 是两个动态类型相同的接口值并且它们的动态类型是不可比较类型的时候， `x == y` 将产生一个恐慌。

一个展示了这些不同的例子：

``` go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	type Book struct {page int}
	x := struct {page int}{123}
	y := Book{123}
	fmt.Println(reflect.DeepEqual(x, y)) // false
	fmt.Println(x == y)                  // true

	z := Book{123}
	fmt.Println(reflect.DeepEqual(&z, &y)) // true
	fmt.Println(&z == &y)                  // false

	type T struct{p *T}
	t := &T{&T{nil}}
	t.p.p = t // form a cyclic reference chain.
	fmt.Println(reflect.DeepEqual(t, t.p)) // true
	fmt.Println(t == t.p)                  // false

	var f1, f2 func() = nil, func(){}
	fmt.Println(reflect.DeepEqual(f1, f1)) // true
	fmt.Println(reflect.DeepEqual(f2, f2)) // false

	var a, b interface{} = []int{1, 2}, []int{1, 2}
	fmt.Println(reflect.DeepEqual(a, b)) // true
	fmt.Println(a == b)                  // panic
}
```

注意：如果传递给一个 `DeepEqual` 调用的两个实参均为函数类型值，则此调用只有在这两个实参都为nil并且它们的类型相同的情况下才返回 `true` 。 比较元素中含有函数值的容器值或者比较字段中含有函数值的结构体值也是类似的。 另外要注意：如果两个同类型切片共享相同的元素序列（即它们的长度相同并且它们的各对相应元素的地址也相同），则使用 `DeepEqual` 比较它们时返回的结果总是为 `true` ，即使它们的元素中含有函数值。 一个例子：

``` go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	a := [1]func(){func(){}}
	b := a
	fmt.Println(reflect.DeepEqual(a, a))       // false
	fmt.Println(reflect.DeepEqual(a[:], a[:])) // true
	fmt.Println(reflect.DeepEqual(a[:], b[:])) // false
	a[0], b[0] = nil, nil
	fmt.Println(reflect.DeepEqual(a[:], b[:])) // true
}
```

## `reflect. Value. Bytes()` 方法返回一个 `[]byte` 值，它的元素类型 `byte` 可能并非属主参数代表的Go切片值的元素类型。

假设一个自定义类型 `MyByte` 的底层类型为内置类型 `byte` ，我们知道Go类型系统禁止切片类型 `[]MyByte` 的值转换为类型 `[]byte` 。 但是，当前的 `reflect. Value` 类型的 `Bytes` 方法的实现可以帮我们绕过这个限制。 此实现应该是违反了Go类型系统的规则。

例子：

``` go
package main

import "bytes"
import "fmt"
import "reflect"

type MyByte byte

func main() {
	var mybs = []MyByte{'a', 'b', 'c'}
	var bs []byte

	// bs = []byte(mybs) // this line fails to compile

	v := reflect.ValueOf(mybs)
	bs = v.Bytes() // okay. Violating Go type system.
	fmt.Println(bytes.HasPrefix(bs, []byte{'a', 'b'})) // true

	bs[1], bs[2] = 'r', 't'
	fmt.Printf("%s \n", mybs) // art
}
```

虽然这违反了Go类型系统的规则，但是貌似此违反并没有什么害处，相反，它带来了一些好处。 比如，我们可以将 `bytes` 标准库包中提供的函数（间接）应用到 `[]MyByte` 值上，如上例所示。

注意： `reflect. Value. Bytes()` 方法[以后可能会被移除](https://github.com/golang/go/issues/27727)。

## 我们应该使用 `os. IsNotExist(err)` 而不是 `err == os. ErrNotExist` 来检查文件是否存在。

使用 `err == os. ErrNotExist` 可能漏掉一些错误。

``` go
package main

import (
	"fmt"
	"os"
)

func main() {
	_, err := os.Stat("a-nonexistent-file.abcxyz")
	fmt.Println(os.IsNotExist(err))    // true
	fmt.Println(err == os.ErrNotExist) // false
}
```

如果你的项目只支持Go 1.13+，则[更推荐](https://github.com/golang/go/issues/38198)使用 `errors. Is(err, os. ErrNotExist)` 来检查文件是否存在。

``` go
package main

import (
	"errors"
	"fmt"
	"os"
)

func main() {
	_, err := os.Stat("a-nonexistent-file.abcxyz")
	fmt.Println(errors.Is(err, os.ErrNotExist)) // true
}
```

## `flag` 标准库包对待布尔命令选项不同于数值和字符串选项。

传递程序选项有三种形式。

1. `-flag`：仅适用于布尔选项。
2. `-flag=x`：用于任何类型的选项。.
3. `-flag x`：仅用于非布尔选项。

请注意，使用第一种形式的布尔选项将被视为最后一个选项，其后面的所有项都被视为参数。

``` go
package main

import "fmt"
import "flag"

var b = flag.Bool("b", true, "一个布尔选项")
var i = flag.Int("i", 123, "一个整数选项")
var s = flag.String("s", "hi", "一个字符串选项")

func main() {
	flag.Parse()
	fmt.Print("b=", *b, ", i=", *i, ", s=", *s, "\n")
	fmt.Println("arguments:", flag.Args())
}
```

如果我们用下面显示的标志和参数运行此程序

``` 

./exampleProgram -b false -i 789 -s bye arg0 arg1
```

输出结果会是：

``` 

b=true, i=123, s=hi
arguments: [false -i 789 -s bye arg0 arg1]
```

这个输出显然不是我们所期望的。

我们应该像这样传递选项和参数：

``` 

./exampleProgram -b=false -i 789 -s bye arg0 arg1
```

或者

``` 

./exampleProgram -i 789 -s bye -b arg0 arg1
```

以获取我们期望的输出：

``` 

b=true, i=789, s=bye
arguments: [arg0 arg1]
```

## `[Sp|Fp|P]rintf` 函数支持位置参数。

下面的程序会打印 `coco` 。

``` go
package main

import "fmt"

func main() {
	// The next line prints: coco
	fmt.Printf("%[2]v%[1]v%[2]v%[1]v", "o", "c")
}
```
