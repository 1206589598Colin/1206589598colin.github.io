# Go类型系统概述

本文将介绍Go中的各个类型种类。Go类型系统中的各种概念也将被介绍。如果不熟知这些概念，则很难精通Go编程。

## 概念：基本类型（basic type）

内置基本类型已经在前面的文章[基本类型和它们的字面量表示](https://gfw.go101.org/article/basic-types-and-value-literals.html)一文中介绍过了。 为了本文的完整性，这些内置类型重新被列在这里：

* 内置字符串类型：`string`.
* 内置布尔类型：`bool`.
* 内置数值类型：
  + `int8`、`uint8`（`byte`）、`int16`、`uint16`、`int32`（`rune`）、`uint32`、`int64`、`uint64`、`int`、`uint`、`uintptr`。
  + `float32`、`float64`。
  + `complex64`、`complex128`。

注意， `byte` 是 `uint8` 的一个内置别名， `rune` 是 `int32` 的一个内置别名。 下面将要提到如何声明自定义的类型别名。

除了[字符串类型](https://gfw.go101.org/article/string.html)，《Go语言101》后续其它文章将不再对其它基本类型做详细讲解。

## 概念：组合类型（composite type）

Go支持下列组合类型：

* [指针类型](https://gfw.go101.org/article/pointer.html) - 类C指针

* [结构体类型](https://gfw.go101.org/article/struct.html) - 类C结构体

* [函数类型](https://gfw.go101.org/article/function.html) - 函数类型在Go中是一种一等公民类别

* 容器类型

  ，包括:

  + 数组类型 - 定长容器类型
  + 切片类型 - 动态长度和容量容器类型
  + 映射类型（map）- 也常称为字典类型。在标准编译器中映射是使用哈希表实现的。

* [通道类型](https://gfw.go101.org/article/channel.html) - 通道用来同步并发的协程

* [接口类型](https://gfw.go101.org/article/interface.html) - 接口在反射和多态中发挥着重要角色

非定义组合类型可以用它们各自的字面表示形式来表示。 下面是一些各种不同种类的非定义组合类型字面表示形式的例子（非定义类型将在下面解释）：

``` go
// 假设T为任意一个类型，Tkey为一个支持比较的类型。

*T         // 一个指针类型
[5]T       // 一个元素类型为T、元素个数为5的数组类型
[]T        // 一个元素类型为T的切片类型
map[Tkey]T // 一个键值类型为Tkey、元素类型为T的映射类型

// 一个结构体类型
struct {
	name string
	age  int
}

// 一个函数类型
func(int) (bool, string)

// 一个接口类型
interface {
	Method0(string) int
	Method1() (int, bool)
}

// 几个通道类型
chan T
chan<- T
<-chan T
```

[支持和不支持比较的类型](https://gfw.go101.org/article/type-system-overview.html#types-not-support-comparison)将在下面介绍。

## 事实：类型的种类

每种上面提到的基本类型和组合类型都对应着一个类型种类（kind）。除了这些种类，今后将要介绍的非类型安全指针类型属于另外一个新的类型种类。

所以，目前（Go 1.16），Go有26个类型种类。

## 语法：类型定义（type definition declaration）

*（**类型定义**又称类型定义声明。在Go 1.9之前，类型定义被称为类型声明并且是唯一的一种类型声明形式。 但是自从Go 1.9，类型定义变成了两种类型声明形式之一。另一种新的类型声明形式为下一节将要介绍的类型别名声明。）*

在Go中，我们可以用如下形式来定义新的类型。在此语法中， `type` 为一个关键字。

``` go
// 定义单个类型。
type NewTypeName SourceType

// 定义多个类型。
type (
	NewTypeName1 SourceType1
	NewTypeName2 SourceType2
)
```

新的类型名必须为标识符。但是请注意：包级类型（以及下一节将要介绍的类型别名）的名称不能为[ `init` ](https://gfw.go101.org/article/packages-and-imports.html#init)。

上例中的第二个类型声明中包含两个类型描述（type specification）。 如果一个类型声明包含多于一个的类型描述，这些类型描述必须用一对小括号 `()` 括起来。

注意：

* 一个新定义的类型和它的源类型为两个不同的类型。
* 在两个不同的类型定义中的定义的两个类型肯定为两个不同的类型。
* 一个新定义的类型和它的源类型的底层类型（将在下面介绍）一致并且它们的值可以相互显式转换。
* 类型定义可以出现在函数体内。

一些类型定义的例子：

``` go
// 下面这些新定义的类型和它们的源类型都是基本类型。
type (
	MyInt int
	Age   int
	Text  string
)

// 下面这些新定义的类型和它们的源类型都是组合类型。
type IntPtr *int
type Book struct{author, title string; pages int}
type Convert func(in0 int, in1 bool)(out0 int, out1 string)
type StringArray [5]string
type StringSlice []string

func f() {
	// 这三个新定义的类型名称只能在此函数内使用。
	type PersonAge map[string]int
	type MessageQueue chan string
	type Reader interface{Read([]byte) int}
}
```

## 语法：类型别名声明（type alias declaration）

*（**类型别名声明**是一种在Go 1.9中新增的类型声明形式。）*

上面已经提到了，Go中有两个内置类型别名： `byte` （类型 `uint8` 的别名）和 `rune` （类型 `int32` 的别名）。 在Go 1.9之前，它们是Go中仅有的两个类型别名。

从Go 1.9开始，我们可以使用下面的语法来声明自定义类型别名。此语法和类型定义类似，但是请注意每个类型描述中多了一个等号 `=` 。

``` go
type (
	Name = string
	Age  = int
)

type table = map[string]int
type Table = map[Name]Age
```

类型别名也必须为标识符。同样地，类型别名可以被声明在函数体内。

在上面的类型别名声明的例子中， `Name` 是内置类型 `string` 的一个别名，它们表示同一个类型。 同样的关系对下面的几对类型表示也成立：

* 别名`Age`和内置类型`int`。
* 别名`table`和映射类型`map[string]int`。
* 别名`Table`和映射类型`map[Name]Age`。

事实上，文字表示形式 `map[string]int` 和 `map[Name]Age` 也表示同一类型。 所以， `table` 和 `Table` 一样表示同一个类型。

注意，尽管两个别名 `table` 和 `Table` 表示同一个类型，但 `Table` 是导出的，所以它可以被其它包引入使用，而 `table` 却不可以。

类型别名声明在重构一些大的Go项目等场合很有用。 在通常编程中，类型定义声明使用得更广泛。

## 概念：定义类型和非定义类型（defined type and undefined type）

一个定义类型是一个在某个类型定义声明中定义的类型。

所有的基本类型都是定义类型。一个非定义类型一定是一个组合类型。

在下面的例子中，别名 `C` 和类型字面表示 `[]string` 都表示同一个非定义类型。 类型 `A` 和别名 `B` 均表示同一个定义类型。

``` go
type A []string
type B = A
type C = []string
```

## 概念：有名类型和无名类型（named type and unnamed type）

在Go 1.9之前，**有名类型**这一术语准确地定义在Go白皮本中。它曾被定义为一个有名字的类型。 随着Go 1.9中引入的类型别名新特性，此术语被从白皮书中删除了，原因是它可能会造成一些理解上的困惑。 比如，一些类型字面表示（比如上一节出现中的别名 `C` ）是一个标识符（即一个名称），但是它们所表示的类型（比如 `[]string` ）在Go 1.9之前却被称为无名类型。

为了避免出现这样的困惑，从Go 1.9开始，一个新的术语**定义类型**被引入来填补移除**有名类型**后的空白。 然而此举也给一些概念解释造成了[新的](https://github.com/golang/go/issues/22005)[障碍](https://github.com/golang/go/issues/32496)，或者形成了一些[尴尬的局面](https://github.com/golang/example/tree/master/gotypes#named-types)。 为了避免这些尴尬的局面和解释上的障碍，Go语言101中的文章将遵守如下原则：

* 一个类型别名将不会被称为一个类型，尽管我们常说它表示着一个类型。
* 术语**有名类型**和**定义类型**将被视为完全相同的概念。（同样地，**无名类型**和**非定义类型**亦为同一概念。） 换句话说，当提到“一个类型别名`T`是一个有名类型”，其实际意义是类型别名`T`表示着一个有名类型。 如果`T`表示着一个无名类型，则我们不应该说`T`是一个有名类型，即使别名`T`它本身拥有一个名字。
* 当我们提及一个类型名（称），它可能是一个定义类型的名称，也可能是一个类型别名的名称。

## 概念：底层类型（underlying type）

在Go中，每个类型都有一个底层类型。规则：

* 一个内置类型的底层类型为它自己。
* `unsafe`标准库包中定义的`Pointer`类型的底层类型是它自己。（至少我们可以认为是这样。事实上，关于`unsafe. Pointer`类型的底层类型，官方文档中并没有清晰的说明。我们也可以认为`unsafe. Pointer`类型的底层类型为`*T`，其中`T`表示一个任意类型。）
* 一个非定义类型（必为一个组合类型）的底层类型为它自己。
* 在一个类型声明中，新声明的类型和源类型共享底层类型。

一个例子：

``` go
// 这四个类型的底层类型均为内置类型int。
type (
	MyInt int
	Age   MyInt
)

// 下面这三个新声明的类型的底层类型各不相同。
type (
	IntSlice   []int   // 底层类型为[]int
	MyIntSlice []MyInt // 底层类型为[]MyInt
	AgeSlice   []Age   // 底层类型为[]Age
)

// 类型[]Age、Ages和AgeSlice的底层类型均为[]Age。
type Ages AgeSlice
```

如何溯源一个声明的类型的底层类型？规则很简单，在溯源过程中，当遇到一个内置类型或者非定义类型时，溯源结束。 以上面这几个声明的类型为例，下面是它们的底层类型的溯源过程：

``` 
MyInt → int
Age → MyInt → int
IntSlice → []int
MyIntSlice → []MyInt → []int
AgeSlice → []Age → []MyInt → []int
Ages → AgeSlice → []Age → []MyInt → []int
```

在Go中，

* 底层类型为内置类型`bool`的类型称为**布尔类型**；
* 底层类型为任一内置整数类型的类型称为**整数类型**；
* 底层类型为内置类型`float32`或者`float64`的类型称为**浮点数类型**；
* 底层类型为内置类型`complex64`或`complex128`的类型称为**复数类型**；
* 整数类型、浮点数类型和复数类型统称为**数字值类型**；
* 底层类型为内置类型`string`的类型称为**字符串类型**。

底层类型这个概念在[类型转换、赋值和比较规则](https://gfw.go101.org/article/value-conversions-assignments-and-comparisons.html)中扮演着重要角色。

## 概念：值（value）

一个类型的一个实例称为此类型的一个值。一个类型可以有很多不同的值，其中一个为它的零值。 同一类型的不同值共享很多相同的属性。

每个类型有一个零值。一个类型的零值可以看作是此类型的默认值。 预声明的标识符 `nil` 可以看作是切片、映射、函数、通道、指针（包括非类型安全指针）和接口类型的零值的字面量表示。 我们以后可以在[Go中的nil](https://gfw.go101.org/article/nil.html)一文中了解到关于 `nil` 的各种事实。

在源代码中，值可以呈现为若干种形式，包括[字面量](https://gfw.go101.org/article/basic-types-and-value-literals.html)、[有名常量](https://gfw.go101.org/article/constants-and-variables.html#constant)、[变量](https://gfw.go101.org/article/constants-and-variables.html#variable)和[表达式](https://gfw.go101.org/article/expressions-and-statements.html)。前三种形式可以看作是最后一种形式的特例。

值分为[类型确定的和类型不确定的](https://gfw.go101.org/article/constants-and-variables.html#untyped-value)。

基本类型和它们的字面量表示已经在[前面一文](https://gfw.go101.org/article/basic-types-and-value-literals.html)中介绍过了。 另外，Go中还有另外两种的字面量表示形式：函数字面量表示形式和组合字面量表示形式（composite literal）。

函数字面量表示形式用来表示函数值。事实上，一个[函数声明](https://gfw.go101.org/article/function-declarations-and-calls.html#declaration)是由一个标识符（函数名）和一个函数字面量表示形式组成。

组合字面量表示形式用来表示结构体类型值和容器类型（数组、切片和映射）值。 详见[结构体](https://gfw.go101.org/article/struct.html)和[容器类型](https://gfw.go101.org/article/container.html)两文。

指针类型、通道类型和接口类型的值没有字面量表示形式。

## 概念：值部（value part）

在运行时刻，很多值是存储在内存的。每个这样的值都有一个直接部分，但是有一些值还可能有一个或多个间接部分。每个值部分在内存中都占据一段连续空间。 通过[安全](https://gfw.go101.org/article/pointer.html)或者[非安全](https://gfw.go101.org/article/unsafe.html)指针，一个值的间接部分被此值的直接部分所引用。

[**值部**](https://gfw.go101.org/article/value-part.html)这个术语并没有在Go白皮书中定义。它仅使用在《Go语言101》这本书中，用来简化一些解释并帮助Go程序员更好地理解Go类型和值。

## 概念：值尺寸（value size）

一个值存储在内存中是要占据一定的空间的。此空间的大小称为此值的尺寸。值尺寸是用字节数来衡量的。 在Go中，当我们谈及一个值的尺寸，如果没有特殊说明，我们一般是指此值的直接部分的尺寸。 某个特定类别的所有类型的值的尺寸都是一样的。因为这个原因，我们也常将一个值的尺寸说成是它的类型的尺寸（或值尺寸）。

我们可以用 `unsafe` 标准库包中的 `Sizeof` 函数来取得任何一个值的尺寸。

Go白皮书没有规定非数值类型值的尺寸。对数值类型值的尺寸的要求已经在[基本类型和它们的字面量表示](https://gfw.go101.org/article/basic-types-and-value-literals.html)一文中提及了。

## 概念：指针类型的基类型（base type）

如果一个指针类型的底层类型表示为 `*T` ，则此指针类型的基类型为 `T` 所表示的类型。

[指针类](https://gfw.go101.org/article/pointer.html)一文详细解释了指针类类型和指针值。

## 概念：结构体类型的字段（field）

一个结构体类型由若干成员变量组成。每个这样的成员变量称为此结构体的一个字段。 比如，下面这个结构体类型含有三个字段： `author` 、 `title` 和 `pages` 。

``` go
struct {
	author string
	title  string
	pages  int
}
```

[结构体](https://gfw.go101.org/article/struct.html)一文详细解释了结构体类型和结构体值。

## 概念：函数类型的签名（signature）

一个函数和其类型的签名由此函数的输入参数和返回结果的类型列表组成。 函数名称和函数体不属于函数签名的构成部分。

[函数](https://gfw.go101.org/article/function.html)一文详细解释了函数类型和函数值。

## 概念：类型的方法（method）和方法集（method set）

在Go中，我们可以给满足某些条件的类型声明[方法](https://gfw.go101.org/article/method.html)。方法也常被称为成员函数。 一个类型的所有方法组成了此类型的方法集。

## 概念：接口类型的动态类型和动态值

接口类型的值称为接口值。一个接口值可以包裹装载一个非接口值。包裹在一个接口值中的非接口值称为此接口值的动态值。此动态值的类型称为此接口值的动态类型。 一个什么也没包裹的接口值为一个零值接口值。零值接口值的动态值和动态类型均为不存在。

一个接口类型可以指定若干个（可以是零个）方法，这些方法形成了此接口类型的方法集。

如果一个类型（可以是接口或者非接口类型）的方法集是一个接口类型的方法集的超集，则我们说此类型[实现](https://gfw.go101.org/article/interface.html#implementation)了此接口类型。

[接口](https://gfw.go101.org/article/interface.html)一文详细解释了接口类型和接口值。

## 概念：一个值的具体类型（concrete type）和具体值（concrete value）

对于一个（类型确定的）非接口值，它的具体类型就是它的类型，它的具体值就是它自己。

一个零值接口值没有具体类型和具体值。 对于一个非零值接口值，它的具体类型和具体值就是它的动态类型和动态值。

## 概念：容器类型

数组、切片和映射是Go中的三种正式意义上的内置容器类型。

有时候，字符串和通道类型也可以被非正式地看作是容器类型。

（正式和非正式的）容器类型的每个值都有一个长度属性。

[数组、切片和映射](https://gfw.go101.org/article/container.html)一文详细解释了各种正式容器类型和它们的值。

## 概念：映射类型的键值（key）类型

如果一个映射类型的底层类型表示为 `map[Tkey]T` ，则此映射类型的键值类型为 `Tkey` 。 `Tkey` 必须为一个可比较类型（见下）。

## 概念：容器类型的元素（element）类型

存储在一个容器值中的所有元素的类型必须为同一个类型。此同一类型称为此容器值的（容器）类型的元素类型。

* 如果一个数组类型的底层类型表示为`[N]T`，则此数组类型的元素类型为`T`所表示的类型。
* 如果一个切片类型的底层类型表示为`[]T`，则此切片类型的元素类型为`T`所表示的类型。
* 如果一个映射类型的底层类型表示为`map[Tkey]T`，则此映射类型的元素类型为`T`所表示的类型。
* 如果一个通道类型的底层类型表示为`chan T`、`chan<- T`或者`<-chan T`，则此通道类型的元素类型为`T`所表示的类型。
* 一个字符串类型的元素类型总是内置类型`byte`（亦即`uint8`）。

## 概念：通道类型的方向

一个通道值可以被看作是先入先出（first-in-first-out，FIFO）队列。一个通道值可能是可读可写的、只读的（receive-only）或者只写的（send-only）。

* 一个可读可写的通道值也称为一个双向通道。 一个双向通道类型的底层类型可以被表示为`chan T`。
* 我们只能向一个只写的通道值发送数据，而不能从其中接收数据。 只写通道类型的底层类型可以被表示为`chan<- T`。
* 我们只能从一个只读的通道值接收数据，而不能向其发送数据。 只读通道类型的底层类型可以被表示为`<-chan T`。

[通道](https://gfw.go101.org/article/channel.html)一文详细解释了通道类型和通道值。

## 事实：可比较类型和不可比较类型

目前（Go 1.16），下面这些类型的值不支持（使用 `==` 和 `!=` 运算标识符）比较。这些类型称为不可比较类型。

* 切片类型
* 映射类型
* 函数类型
* 任何包含有不可比较类型的字段的结构体类型和任何元素类型为不可比较类型的数组类型。

其它类型称为可比较类型。

映射类型的键值类型必须为可比较类型。

我们可以在[类型转换、赋值和值比较规则大全](https://gfw.go101.org/article/value-conversions-assignments-and-comparisons.html#comparison-rules)一文中了解到更详细的比较规则。

## 事实：Go对面向对象编程（object-oriented programming）的支持

Go并不全面支持面向对象编程，但是Go确实支持一些面向对象编程的元素。请阅读以下几篇文章以获取详细信息：

* [方法](https://gfw.go101.org/article/method.html)
* [实现](https://gfw.go101.org/article/interface.html#implementation)
* [类型内嵌](https://gfw.go101.org/article/type-embedding.html)

## 事实：Go对泛型（generics）的支持

目前（Go 1.16），Go中泛型支持只局限在内置类型和内置函数中。自定义泛型还处于草案阶段。请阅读[泛型](https://gfw.go101.org/article/generic.html)一文以了解更多。
