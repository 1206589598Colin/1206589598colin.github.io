# 基本操作之CRUD

## 创建文档

命令有三种:

```
创建单个文档：db.collection.insertOne()
创建单个或多个文档：db.collection.insert()
创建多个文档：db.collection.insertMany()
```

### insertOne

示例：

```
db.goods.insertOne({
	name:"哈士奇饼干",
	price:33,
})
```

返回结果：

```
{
    "acknowledged": true,
    "insertedId": ObjectId("5e9c52e32a170000ea003e5a") //5e9c544c2a170000ea003e5b为本次插入数据的主键id
}
```

插入复合主键

```
db.goods.insertOne({
    _id:{id:123,type:'shop'},
	name:"这个是复合组件",
	price:20.58,
})
```

### insertMany

示例：

```
db.goods.insertMany([
	{name:"哈士奇饼干1",price:33,},
	{name:"神奇宝贝一只1",stock:100,price:20.58,}
])
```

返回结果：

```
{
    "acknowledged": true,
    "insertedIds": [
        ObjectId("5e9c56b72a170000ea003e5d"),
        ObjectId("5e9c56b72a170000ea003e5e")
    ]
}
```

### insert

示例：

```
db.goods.insert([
	{name:"哈士奇饼干1",price:33,},
	{name:"神奇宝贝一只1",stock:100,price:20.58,}
])
```

返回结果：

```
BulkWriteResult({
	"nRemoved" : 0,
	"nInserted" : 2, //插入成功的数量
	"nUpserted" : 0,
	"nMatched" : 0,
	"nModified" : 0,
	"writeErrors" : [ ]
})
```

## 查询文档

### 读取全部文档

既不筛选，也不投射

```
db.collection.find();
```

示例:

```
db.goods.find();
```

返回结果:

```
// 1
{
    "_id": ObjectId("5e9c48b42a170000ea003e45"),
    "name": "纸巾一包",
    "price": 100
}

// 2
{
    "_id": ObjectId("5e9c48eb2a170000ea003e48"),
    "name": "奶茶一杯",
    "price": 20.58
}

// 3
{
    "_id": ObjectId("5e9c56b72a170000ea003e5d"),
    "name": "哈士奇饼干1",
    "price": 33
}
```

### 匹配查询

示例：

```
//查询名字为"纸巾一包"并且价格为100元的数据
db.goods.find({name:"纸巾一包",price:100})
```

返回结果

```
{
    "_id": ObjectId("5e9c48b42a170000ea003e45"),
    "name": "纸巾一包",
    "price": 100
}
```

### 复合主键查询

```
db.goods.find({"_id.type":"shop"})
```

### 操作符

#### 比较操作符

{:{$:}}
$eq 匹配字段值相等的文档 （可以用于string和int类型） =
$ne 匹配字段值不等的文档 !=
$gt 匹配字段值大于查询值的文档 >
$gte 匹配字段值大于或等于查询值的文档 >=
$lt 匹配字段值小于查询值的文档 <
$lte 匹配字段值小于或等于查询值的文档 <=
$in 匹配字段值与任意查询值相等的文档 “in”
$nin 匹配字段值与任意查询值不相等的文档 “not in”

```
//匹配查询
db.goods.find({name:{$eq:"纸巾一包"}})
//in查询
db.goods.find({"name":{$in:["纸巾一包","奶茶一杯"]}})
//读取价格大于32元且小于101元的商品
db.goods.find({price:{$gt:32,$lt:101}})
//复合组件查询
db.goods.find({"_id.type":{$eq:"shop"}})
db.goods.find({"_id.type":{$in:["shop"]}})
```

#### 逻辑操作符

$not 匹配筛选条件不成立的文档
$and 匹配多个筛选条件全部成立的文档
$or 匹配至少一个筛选条件成立的文档
$nor 匹配多个筛选条件全部不成立的文档
逻辑运算符示例：

```
//查询价格不小于32元的商品
db.goods.find({price:{$not:{$lt:32}}})
//相当于下面的取反
db.goods.find({price:{$lt:32}})
//获取价格为100，并且名称为"纸巾一包"的商品
db.goods.find({
	$and:[
		{price:{$eq:100}},
		{name:"纸巾一包"}
	]
})
//可以简写如下
db.goods.find({price:{$eq:100},name:"纸巾一包"})
//获取价格不是100，并且名称不为"纸巾一包"的商品
db.goods.find({
	$nor:[
		{price:{$eq:100}},
		{name:"纸巾一包"}
	]
})
注意：nor也会筛选出并不包含查询字段的文档！！比如会把没有price和name字段的文档也查出来！
```

#### 字段操作符

```
$exists 匹配包含查询字段的文档  
$type 匹配字段符合查询值的文档
```

**$type对应的类型和BSON类型序号**

```
Double	1	 
String	2	 
Object	3	 
Array	4	 
Binary data	5	 
Undefined	6	已废弃。
Object id	7	 
Boolean	8	 
Date	9	 
Null	10	 
Regular Expression	11	 
JavaScript	13	 
Symbol	14	 
JavaScript (with scope)	15	 
32-bit integer	16	 
Timestamp	17	 
64-bit integer	18	 
Min key	255	Query with -1.
Max key	127
```

示例

```
//查询复合主键中存在type字段的数据
db.goods.find({"_id.type":{$exists:true}})
//查询存在name字段的数据
db.goods.find({name:{$exists:true}})
//查询类型为普通主键和复合主键的数据
db.goods.find({_id:{$type:["objectId","object"]}})
//查询类型为string的数据
db.goods.find({name:{$type:["string"]}})
```

#### 数组操作符

```
$all 匹配数组字段中包含所有查询值的文档
$elemMatch 匹配数组字段中至少存在一个值满足筛选条件的文档
```

示例

```
先插入数据
db.goods.insert(
	[
		{
		    name:"皮卡丘一只",
			price:100,
			contact:["111111","Alabama","US"]
		},
		{
		    name:"小火龙一只",
			price:120,
			contact:[["222222","333333"],"Beijing","China"]
		}
	]
)
//查询contact字段中同时包含"China"和"Beijing"字段的文档
db.goods.find({contact:{$all:["China","Beijing"]}})
//查询联系方式中包含"222222","333333"的文档，注意，这里的数组如果只有"222222"是查询不到的，这里是数组全等的关系
db.goods.find({contact:{$all:[["222222","333333"]]}})
//查询电话号码范围在大于111110和小于222222之间的数据
db.goods.find({contact:{$elemMatch:{$gt:"111110",$lt:"222222"}}})
//查询电话号码范围在"大于111110和小于222222之间"并且"大于211111和小于444444之间"的数据
db.goods.find({
	contact:{$all:[
		{$elemMatch:{$gt:"111111",$lt:"222222"}},
		{$elemMatch:{$gt:"211111",$lt:"444444"}}
	]}
})
```

#### 运算操作符

```
{<field>:{:/pattern/,:'<options>'}}
{<field>:{:/pattern/<options>}}
$regex  
在和$in操作符一起使用时，只能使用/pattern/<options>
//读取name字段以"皮"或"j"开头的文档数据
db.goods.find({name:{$in:[/^皮/,/^j/]}})

//读取name字段包含LIE（不区分大小写）的文档数据
db.goods.find({name:{$regex:/LIE/,$options:'i'}})
```

### 游标

游历完游标中所有文档之后，或者在10分钟之后，游标便会自动关闭
可以使用noCursorTimeout()函数来保持游标一直有效

```
var myCursor=db.goods.find().noCursorTimeout()
```

在这之后，在不遍历游标的情况下，你需要主动关闭游标

```
myCursor.close()
```

#### 游标函数

```
cursor.hasNext() //当还有没遍历完的游标文档时，返回true
cursor.next()  //获取下一次遍历的游标文档
cursor.forEach(<function>) //遍历游标中所有指向的文档
cursor.limit(<number>)  //返回指定条数
cursor.skip(<offest>) //跳过文档中指定数量的文档（传入1表示跳过第一篇文档）
cursor.count(<applySkipLimit>) //默认情况下，<applySkipLimit>为false，即cursor.count()不会考虑cursor.skip()和cursor.limit()的效果
cursor.sort(<document>)  //这里的<document>定义了排序的要求（1从小到大排序，-1从大到小排序）
var myCursor=db.goods.find();
while(myCursor.hasNext()){
	printjson(myCursor.next());
}


var myCursor=db.goods.find();
myCursor.forEach(printjson)
db.goods.find().limit(1)
db.goods.find().skip(1)

db.goods.find().limit(1).count() //返回所有文档总数
db.goods.find().limit(1).count(true) //返回一篇文档
//price字段从大到小排序，并且name字段由小到大排序 （相当于mysql中同时两个排序条件的规则）
db.goods.find().sort({price:-1,name:1})
```

**注意事项
cursor.skip(),cursor.limit(),cursor.count()
优先级：count()->skip()->limit()**

```
cursor.skip()在cursor.limit()之前执行
db.goods.find().limit(5).skip(3)
结果返回的是5篇文章，从第4篇到第9篇文章
cursor.count()在cursor.skip()和cursor.limit()之前执行
db.goods.find().limit(5).skip(3).sort({price:-1})
```

### 文档投影

```
db.goods.find(<query>,<projection>)
不使用投影时，db.goods.find()返回符合筛选条件的完整文档
使用投影可以只返回指定的字段
{field:inclusion}
1表示返回部分字段，0表示不返回字段，（1和0不可组合使用，_id字段除外）
//只返回name字段
db.goods.find({},{name:1,_id:0})
//返回除name之外的字段
db.goods.find({},{name:0})
//$slide:2,表示返回前2条，-2表示返回倒数2条，[1,2]表示返回第二条到第三条
db.goods.find({},{name:1,content:{$slide:[1,2]}})
```

**$elemMatch和$操作符可以返回数组字段中满足筛选条件的第一个元素**

```
//返回content数组字段中第一个排序大于"Alabama"的数据，（没content字段的文档也会被返回）
db.goods.find({},{name:1,content:{$elemMatch:{$gt:"Alabama"}}})

//返回content数组字段中第一个排序大于"Alabama"的数据
db.goods.find({content:{$gt:"Alabama"}},{name:1,"content.$":1,})
```

## 更新操作

注意：
1、
db.goods.update(where查询条件,更新的值,其它条件)
db.goods.update({“uid”:3},{$rename:{“name”:”alias”}},{multi:true})
2、文档更新操作只会更新一篇文档，即使条件符合多篇文档，也只会更新一篇，如果想要更新所有符合条件的文档，需要添加第三个参数**{multi:true}**

### 文档更新操作符

```
$set 更新或新增字段
$unset 删除字段
$rename 重命名字段 {$rename:{<field1>:<newName1>,<field2>:<newName2>}}
$inc 加减字段值  (字段不存在时，会默认创建且值为加减的值)
$mul 相乘字段值 (字段不存在时，会默认创建且值为0 )
$min 比较减少字段值 (保留最小的值)(字段不存在会自动创建且值为指定的值)(类型不一致按BSON数据类型排序规则比较)
$max 比较增大字段值 (保留最大的值)(字段不存在会自动创建且值为指定的值)(类型不一致按BSON数据类型排序规则比较)
//（$rename）重命名写法
db.goods.update({"uid":3},{$rename:{"name":"alias"}})
//（$rename）将数组字段content中的name字段迁移到最外面的name字段
db.goods.update({"uid":3},{$rename:{"content.name":"name"}})
//（$rename）将最外面的name字段迁移到数组字段content中的name字段
db.goods.update({"uid":3},{$rename:{"name":"content.name"}})
//（$inc）将条件uid=3的文档，price字段加一
db.goods.update({"uid":3},{$inc:{"price":1}})
//（$min）源字段大于50时，修改成50
db.goods.update({"uid":3},{$min:{"price":50}}) （源price值为30时，不变，保留30）
BSON数据类型排序规则
最小
	Null
	Numbers(ints,longs,doubles,decimals)
    Symbol,String
	Object
	Array
	BinData
	ObjectId
	Boolean
	Date
最大
	Regular Expression
```

### 数组更新操作符

```
$addToSet 向数组中增添元素
$pop 从数组中移除元素
$pull 从数组中移除指定元素
$pullAll 从数组中有选择性地移除元素
$push 向数组中增添元素
//($addToSet)将content数组字段添加"nihao","wohao"两个值
db.goods.update({"uid":3},{$addToSet:{"content":{$each:["nihao","wohao"]}}})
//$pull删除content数组中包含"皮"字的字段
db.goods.update({"uid":3},{$pull:{"content":{$regex:/皮/}}})
{$pullAll:{<field>:[<vaule1>,<vaule2>]}}
相当于
{$pull:{<field>:{$in:[<vaule1>,<vaule2>]}}}
```

### 更新操作符

```
$ 第一个符合条件的占位符
$[] 数组中的所有元素
```

**更新数组中的特定元素
$是数组中第一个符合筛选条件的数组元素的占位符，搭配更新操作符使用，可以对满足筛选条件的数组元素进行更新**

```
db.goods.update({<array>:<query selector>},<update operator>:{"<array>.$",vaule})
```

$[]指代数组字段中的所有元素，搭配更新操作符使用，可以对数组中的所有元素进行更新

```
db.goods.update({<array>:<query selector>},<update operator>:{"<array>.$[]",vaule})
//源数据
{
    "_id": ObjectId("5e9f08904757000020000235"),
    "content": [
        "nihao",
        "我很好"
    ],
    "uid": 3,
    "name": "nihao",
    "num": 1,
    "num1": 0
}
//将content数组中值为"nihao"的替换成"updated"
db.goods.update({
    uid:3,
	content:"nihao"
}, {
    $set: {
        "content.$":"updated"
    }
})
将content数组中所有字段替换成"updated"
db.goods.update({
    uid:3
}, {
    $set: {
        "content.$[]":"updated"
    }
})
```

### 更新文档选项

{multi:}
更新多个文档
到目前为止，我们在update命令中使用的筛选条件只对应一篇文档
在默认情况下，即使筛选条件对应了多篇文档，update命令仍然只会更新一篇文档

```
将所有name值为"nihao"的文档num值改成10
db.goods.update({
    name:"nihao"
}, {$set: {"num":10}},{multi:true})
```

### 原子性

```
在MongoDB中，更新单个的文档操作是原子性的。默认情况下，如果一个update()更新多个文档，那么对每个文档的更新是原子性的，但是对整个update而言则不是原子性的。有可能存在前一个文档更新成功，后面的文档更新失败的情况。由于单个文档的更新是原子性的，如果两个更新同时发生，就会出现阻塞，先到的先执行，所以文档最终结果由靠后的操作决定。
**简单的说就是对同一篇文档进行更新，文档最终结果以最后的更新操作为结果**
```

## 删除命令

```
db.collection.remove() 删除文档
db.collection.drop() 删除集合
```

注：
1、删除文档默认是删除所有符合条件的文档，和update操作不一样，如果需要指定只删除一篇文档，加上第二个参数**（{justOne:true}）**

### 删除文档

```
db.<collection>.remove(<query>,<options>)
<options>声明了一些删除操作的参数

db.goods.remove()
//删除name值为"nihao"的所有文档
db.goods.remove({name:"nihao"})
//删除name值为"nihao"的一篇文档（{justOne:true}）
db.goods.remove({name:"nihao"},{justOne:true})
//删除集合内的所有文档
db.goods.remove({})
```

### 删除集合

```
db.<collection>.drop(<writeConcern>,<document>)
db.goods.drop()
```

这里的writeConcern文档定义了本次集合删除操作的安全写级别、
drop命令可以删除整个集合，包括集合中的所有文档，以及集合的索引