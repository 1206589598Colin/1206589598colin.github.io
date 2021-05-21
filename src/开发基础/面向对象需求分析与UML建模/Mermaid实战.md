# Mermaid实战

## 时序图

### 参加者

``` 

sequenceDiagram
    participant John
    participant Alice
    Alice->>John: Hello John, how are you?
    John-->>Alice: Great!
```

``` mermaid
sequenceDiagram
    participant John
    participant Alice
    Alice->>John: Hello John,how are you?
    John-->>Alice: Great!
```

### 别名

``` 

sequenceDiagram
    participant A as Alice
    participant J as John
    A->>J: Hello John, how are you?
    J->>A: Great!
```

``` mermaid
sequenceDiagram
    participant A as Alice
    participant J as John
    A->>J: Hello John,how are you?
    J->>A: Great!
```

### 消息

 `消息可以是实线或虚线显示的两种`

**当前支持六种类型的箭头**

| 类型 | 描述 |
| --- | --- |
| -> | 实线无箭头 |
| --> | 虚线无箭头|
| ->> | 实线有箭头|
| -->> | 虚线有箭头|
| -x | 实线末端带x|
| --x | 虚线末端带x|
| -) | 实线，末端带开放箭头（异步）|
| --) | 虚线，末端带开放箭头（异步）|

### 激活方式

 `可以激活和停用角色：`

``` 

sequenceDiagram
    Alice->>John: Hello John, how are you?
    activate John
    John-->>Alice: Great!
    deactivate John
```

``` mermaid
sequenceDiagram
    Alice->>John: Hello John,how are you?
    activate John
    John-->>Alice: Great!
    deactivate John
```

 `通过在消息箭头后面添加+/-后缀，还有一种快捷方法表示法`

``` 

sequenceDiagram
    Alice->>+John: Hello John, how are you?
    John-->>-Alice: Great!
```

``` mermaid
sequenceDiagram
    Alice->>+John: Hello John,how are you?
    John-->>-Alice:Great!
```

可以为相同参与者堆叠激活

``` 

sequenceDiagram
    Alice->>+John: Hello John, how are you?
    Alice->>+John: John, can you hear me?
    John-->>-Alice: Hi Alice, I can hear you!
    John-->>-Alice: I feel great!
```

``` mermaid
sequenceDiagram
    Alice->>+John:Hello John,how are you?
    Alice->>+John:John,can you hear me?
    John-->>-Alice:Hi Alice,I can hear you!
    John-->>-Alice: I feel great!
```

### 笔记

 `可以通过注解[right of | left of | over]来完成`

``` 

sequenceDiagram
    participant John
    Note right of John: Text in note
```

``` mermaid
sequenceDiagram
    participant John
    Note right of John: Text in note
```

 `可以跨越在多个参与者之间的笔记`

``` 

sequenceDiagram
    Alice->John: Hello John, how are you?
    Note over Alice,John: A typical interaction
```

``` mermaid
sequenceDiagram
    Alice->John: Hello John,how are you?
    Note over Alice,John: A typical interaction 
```

### 循环

 `在顺序图中表示循环，可以通过以下符号完成`

``` 

 loop Loop text
... statements ...
end
```

 `参见以下实例`

``` 

sequenceDiagram
    Alice->John: Hello John, how are you?
    loop Every minute
        John-->Alice: Great!
    end
```

``` mermaid
sequenceDiagram
    Alice->John:Hello John,how are you
    loop Every minute
        John-->Alice: Greate!
    end
```

### Alt

 `表示替代路径：`

``` 

alt Describing text
... statements ...
else
... statements ...
end
```

 `或者是否可以选序列（如果没有其他序列）：`

``` 

opt Describing text
... statements ...
end
```

 `详情实例：`

``` 

sequenceDiagram
    Alice->>Bob: Hello Bob, how are you?
    alt is sick
        Bob->>Alice: Not so good :(
    else is well
        Bob->>Alice: Feeling fresh like a daisy
    end
    opt Extra response
        Bob->>Alice: Thanks for asking
    end
```

``` mermaid
sequenceDiagram
    Alice->>Bob:Hello Box,how are you?
    alt is sick
        Bob->>Alice:Not so good:(
    else is well
        Bob->>Alice:Feeling fresh like a daisy
    end 
    opt Extra response
        Bob->>Alice: Thanks for asking
    end
```

### 并行

 `表示并行执行，通过以下符号完成：`

``` 

par [Action 1]
... statements ...
and [Action 2]
... statements ...
and [Action N]
... statements ...
end
```

 `以下实例：`

``` 

sequenceDiagram
    participant Alice
    participant Bob
    participant John
    
    par Alice to Bob
        Alice->>Bob: Hello guys!
    and Alice to John
        Alice->>John: Hello guys!
    end

    Bob-->>Alice: Hi Alice!
    John-->>Alice: Hi Alice!
```

``` mermaid
sequenceDiagram
    participant Alice
    participant Bob
    participant John
    
    par Alice to Bob
        Alice->>Bob: Hello guys!
    and Alice to John
        Alice->>John: Hello guys!
    end

    Bob-->>Alice: Hi Alice!
    John-->>Alice: Hi Alice!
```

 `也可以嵌套并行块`

``` 

sequenceDiagram
    participant Alice
    participant Bob
    participant John
    participant Charlie 
    participant Diana

    par Alice to Bob
        Alice->>Bob: Go help John
    and Alice to John
        Alice->>John: I want this done today
        par John to Charlie
            John->>Charlie: Can we do this today?
        and John to Diana
            John->>Diana: Can you help us today?
        end
    end
```

``` mermaid
sequenceDiagram
    participant Alice
    participant Bob
    participant John
    participant Charlie 
    participant Diana

    par Alice to Bob
        Alice->>Bob: Go help John
    and Alice to John
        Alice->>John: I want this done today
        par John to Charlie
            John->>Charlie: Can we do this today?
        and John to Diana
            John->>Diana: Can you help us today?
        end
    end
```

### 背景突出显示

 **颜色获取网站:https://www.w3cschool.cn/tools/index?name=cpicker**

 `通过提供彩色背景矩形块可以突出显示流：`

 `颜色是使用rgb和rgba语法定义:`

``` 

rect rgb(0, 255, 0)
... content ...
end
```

``` 

rect rgba(0, 0, 255, .1)
... content ...
end
```

 `请参见以下示例：`

``` 

sequenceDiagram 
    participant Alice
    participant John
    
    Note right of Alice: Alice calls John.

    rect rgb(191, 223, 255)
        Alice->>+John: Hello John,how are you?
        rect rgb(200, 150, 255)
            Alice->>+John: John,can you hear me?
            John-->>-Alice: Hi Alice,I can hear you?
        end
        John-->>-Alice: I feel great!
    end

    Alice->>+John: Did you want to go to the game tonight?
    John->>-Alice: Yeah!See you there
```

``` mermaid
sequenceDiagram 
    participant Alice
    participant John
    
    Note right of Alice: Alice calls John.

    rect rgb(191, 223, 255)
        Alice->>+John: Hello John,how are you?
        rect rgb(200, 150, 255)
            Alice->>+John: John,can you hear me?
            John-->>-Alice: Hi Alice,I can hear you?
        end
        John-->>-Alice: I feel great!
    end

    Alice->>+John: Did you want to go to the game tonight?
    John->>-Alice: Yeah!See you there
```

### 注释

 `可以在图中添加注释，解析器将忽悠它们。注释单行：必须以%%开头`

``` mermaid
sequenceDiagram
    Alice->>John: Hello John, how are you?
    %% this is a comment
    John-->>Alice: Great!
```

### 实体代码以转义字符表示

 **在线转换网站：https://www.qqxiuzi.cn/bianma/zifushiti.php**

 `给定的数字以10为底，因此#可以编码为#35; 。还支持使用HTML字符名称。`

``` 

sequenceDiagram
    A->>B: I #9829; you!
    B->>A: I #9829; you #infin; times more!
```

``` mermaid
sequenceDiagram
    A->>B: I #9829; you!
    B->>A: I #9829; you #infin; times more!
```

### sequenceNumbers（箭头前附加序列号）

 `网站上进行配置`

``` 

   <script>
      mermaid.initialize({
        sequence: { showSequenceNumbers: true },
      });
    </script>
```

 `示例代码：`

``` mermaid
sequenceDiagram
    participant Alice
    participant John
    participant Bob
    
    Alice->John: Hello John,how are you?
    loop Healthcheck
        John->>John: Fight against hypochondria
    end

    John-->>Alice: Great!
    John->>Bob: How about you?
    Bob-->>John: Jolly good!
```

### 样式

 `样式是通过定义多个CSS类来完成的。在渲染期间，这些类是从src / themes / sequence.scss中的文件中提取的`

 `class 使用：`

| class | 描述 |
| --- |  --- |
| actor | 图顶部的actor框的样式。 |
| text.actor | 图顶部的actor框中的文本样式。 |
| actor-line | 演员的垂直线。 |
| messageLine0 | 实线消息行的样式。 |
| messageLine1 | 虚线消息行的样式。 |
| messageText | 为消息箭头上的文本定义样式。 |
| labelBox | 在循环中向左定义样式标签。 |
| labelText | 循环标签中文本的样式。 |
| loopText | 循环框中文本的样式。 |
| loopLine | 为循环框中的线定义样式。 |
| note | 注释框的样式。 |
| noteText | 注释框中的文本样式。 |

 `样式表样本`

 

``` css
body {
  background: white;
}

.actor {
  stroke: #ccccff;
  fill: #ececff;
}

text.actor {
  fill: black;
  stroke: none;
  font-family: Helvetica;
}

.actor-line {
  stroke: grey;
}

.messageLine0 {
  stroke-width: 1.5;
  stroke-dasharray: '2 2';
  marker-end: 'url(#arrowhead)';
  stroke: black;
}

.messageLine1 {
  stroke-width: 1.5;
  stroke-dasharray: '2 2';
  stroke: black;
}

#arrowhead {
  fill: black;
}

.messageText {
  fill: black;
  stroke: none;
  font-family: 'trebuchet ms', verdana, arial;
  font-size: 14px;
}

.labelBox {
  stroke: #ccccff;
  fill: #ececff;
}

.labelText {
  fill: black;
  stroke: none;
  font-family: 'trebuchet ms', verdana, arial;
}

.loopText {
  fill: black;
  stroke: none;
  font-family: 'trebuchet ms', verdana, arial;
}

.loopLine {
  stroke-width: 2;
  stroke-dasharray: '2 2';
  marker-end: 'url(#arrowhead)';
  stroke: #ccccff;
}

.note {
  stroke: #decc93;
  fill: #fff5ad;
}

.noteText {
  fill: black;
  stroke: none;
  font-family: 'trebuchet ms', verdana, arial;
  font-size: 14px;
}
```

### 配置

 `通过自定义mermaid.sequenceConfig CLI中使用json文件进行配置`

``` javascript
mermaid.sequenceConfig = {
  diagramMarginX: 50,
  diagramMarginY: 10,
  boxTextMargin: 5,
  noteMargin: 10,
  messageMargin: 35,
  mirrorActors: true
};
```

 `参考配置`

| 范围 | 描述 | 默认值 |
| --- |  --- |  --- |
| mirrorActors | 打开/关闭图表下方及其上方的参与者渲染 | false |
| bottomMarginAdj | 调整图形结束的距离。使用CSS的宽边框样式可能会产生不必要的裁剪，这就是存在此配置参数的原因。 | 1 |
| actorFontSize | 设置参与者描述的字体大小 | 14 |
| actorFontFamily | 设置参与者描述的字体系列 | "Open-Sans", "sans-serif" |
| actorFontWeight | 设置参与者描述的字体粗细 | "Open-Sans", "sans-serif" |
| noteFontSize | 设置参与者附加注释的字体大小 | 14 |
| noteFontFamily | 设置参与者附加注释的字体系列 | "trebuchet ms", verdana, arial |
| noteFontWeight | 设置参与者附加注释的字体粗细 | "trebuchet ms", verdana, arial|
| noteAlign | 设置参与者附加注释中文本的文本对齐方式 | center |
| messageFontSize | 设置参与者 <-> 参与者消息的字体大小 | 16 |
| messageFontFamily | 设置参与者 <-> 参与者消息的字体系列 | "trebuchet ms", verdana, arial |
| messageFontWeight | 设置参与者 <-> 参与者消息的字体粗细 | "trebuchet ms", verdana, arial |

## 流程图

### 流程图方向

 `T:顶部，B:底部，L:左边，R:右边`

* TB(TD)-从上到下
* BT-从下到上
* RL-从右到左
* LR-从左到右

 `声明图的方向是从上到下（TD或TB）`

``` 

 graph TD
    Start --> Stop
```

``` mermaid
graph TD
    Start --> Stop
```

 `声明图的方向是从左到右（LR）`

``` 

graph LR
    Start --> Stop
```

``` mermaid
graph LR
    Start --> Stop

```

### 节点

#### 节点（默认）

``` 

graph LR
 id
```

``` mermaid
graph LR
    id
```

#### 带有文本的节点

 `通过[]符号，在ID框后面添加文本`

``` 

graph LR
    id[This is the text in the box]
```

``` mermaid
graph LR
    id[This is the text in the box]

```

### 节点形状

#### 圆边节点

``` 

graph LR
    id(This is the text in the box)
```

``` mermaid
graph LR
    id(This is the text in the box)

```

#### 体育场形状节点

``` 

graph LR
    id([This is the text in the box])
```

``` mermaid
graph LR
    id([This is the text in the box])
```

#### 子例程形状节点

``` 

graph LR
    id[[This is the text in the box]]
```

``` mermaid
graph LR
    id[[This is the text in the box]]
```

#### 圆柱状节点

``` 

graph LR
    id[(Database)]
```

``` mermaid
graph LR
    id[(Database)]
```

#### 圆形式节点

``` 

graph LR
    id((This is the text in the circle))
```

``` mermaid
graph LR
    id((This is the text in the circle))
```

#### 不对称形状节点

``` 

graph LR
    id>This is the text in the box]
```

``` mermaid
graph LR
    id>This is the text in the box]
```

#### 菱形节点

``` 

graph LR
    id{This is the text in the box}
```

``` mermaid
graph LR
    id{This is the text in the box}

```

#### 六脚形节点

``` 

graph LR
    id{{This is the text in the box}}
```

``` mermaid
graph LR
    id{{This is the text in the box}}
```

#### 平行四边形

 `例子1：`

``` 

graph TD
    id[/This is the text in the box/]
```

``` mermaid
graph TD
    id[/This is the text in the box/]
```

 `例子2：`

``` 

 graph TD
    id[\This is the text in the box\]
```

``` mermaid
graph TD
    id[\This is the text in the box\]
```

#### 梯形

 `例子1：`

``` 

graph TD
    A[/Christmas\]
```

``` mermaid
graph TD
    A[/Chirstmas\]
```

 `例子2：`

``` 

graph TD
    A[\Christmas/]
```

``` mermaid
graph TD
    A[\Chirstmas/]
```

### 节点之间的连接

#### 箭头链接

``` 

graph LR
    A-->B
```

``` mermaid
graph LR
    A-->B
```

#### 开放的链接

``` 

graph LR
    A---B
```

``` mermaid
graph LR
    A---B
```

#### 链接上的文字

 `例子1：`

``` 

graph LR
    A-- This is the text! ---B
```

``` mermaid
graph LR
    A--This is the text!---B
```

 `例子2：`

``` 

graph LR
    A-- This is the text! ---B
```

``` mermaid
graph LR
    A---|This is the text!|B
```

#### 带箭头的文字或链接

 `例子1：`

``` 

graph LR
    A-->|text|B
```

``` mermaid

graph LR
    A-->|text|B
```

 `例子2：`

``` 

graph LR
    A--text-->B
```

``` mermaid

graph LR
    A--text-->B
```

#### 虚线链接

``` 

graph LR
    A-.->B
```

``` mermaid
graph LR
    A-.->B
```

#### 带文字的虚线链接

``` 

graph LR
    A-.text.->B
```

``` mermaid
graph LR
    A-.text.->B
```

#### 粗链接

``` 

graph LR
    A ==> B
```

``` mermaid
graph LR
    A ==> B
```

#### 带有文字的粗链接

``` 

graph LR
    A == text ==> B
```

``` mermaid
graph LR
    A == text ==> B
```

#### 连锁链接

 `例子1（同一行声明多个链接）：`

``` 

graph LR
    A -- text --> B -- text2 --> C
```

``` mermaid
graph LR
    A -- text --> B -- text2 --> C
```

 `例子2（同一行声明多个节点）：`

``` 

graph LR
    a --> b & c --> d
```

``` mermaid
graph LR
    a --> b & c --> d
```

 `例子3（描述依赖关系）：`

``` 

graph TB
    A & B --> C & D
```

 `或其他表达方式`

``` 

graph TB
    A --> C
    A --> D
    B --> C
    B --> D
```

``` mermaid
graph TB
    A & B --> C & D
```

#### 新箭头类型

 `当使用流程图而不是图形时，支持以下新的箭头：`

``` 

flowchart LR
    A --o B
    B --x C
```

``` mermaid
flowchart LR
    A --o B
    B --x C
```

#### 多向箭头

 `当使用流程图而不是图形时，可以使用多向箭头。`

``` 

flowchart LR
    A o--o B
    B <--> C
    C x--x D
```

``` mermaid
flowchart LR
    A o--o B
    B <--> C
    C x--x D
```

#### 链接长度

 `-->中添加-，表示添加长度，-号越多，长度越长`

``` 

graph TD
    A[Start] --> B{Is it?};
    B -->|Yes| C[OK];
    C --> D[Rethink];
    D --> B;
    B ---->|No| E[End];
```

``` mermaid
graph TD
    A[Start] --> B{Is it?}
    B --> |Yes| C[OK]
    C --> D[Rethink]
    D --> B
    B ----> |No| E[End]

```

 `对于点或粗链接，要添加的字符是=或.，如下表所示：`

| 长度 | 1个 | 2个 | 3 |
| --- |  :-: |  :-: |  :-: |
| 普通的 | `---` | `----` | `-----` |
| 普通带箭头 | `-->` | `--->` | `---->` |
| 厚的 | `===` | `====` | `=====` |
| 粗箭头 | `==>` | `===>` | `====>` |
| 点缀 | `-.-` | `-..-` | `-...-` |
| 点缀箭头 | `-.->` | `-..->` | `-...->` |

### 语法字符转义普通字符串

 `使用双"号将文本中的语法字符转为普通字符串`

``` 

graph LR
    id["This is the (text) in the box"]
```

``` mermaid
graph LR
    id["This is the (text) in the box"]

```

#### 实体代码以转义字符表示

 `给定的数字以10为底，因此#可以编码为#35; 。还支持使用HTML字符名称。`

``` 

graph LR
        A["A double quote:#quot;"] -->B["A dec char:#9829;"]
```

``` mermaid
graph LR
    A["A double quote:#quot;"] --> B["A dec char:#9829;"]
```

### 子图

 `语法：`

``` 

subgraph title
    graph definition
end
```

 `例子：`

``` 

 graph TB
    c1 --> a2
    subgraph three
        c1 --> c2
    end
    subgraph two
        b1 --> b2
    end
    subgraph one
        a1 --> a2
    end
```

``` mermaid
graph TB
    c1 --> a2
    subgraph three
        c1 --> c2
    end
    subgraph two
        b1 --> b2
    end
    subgraph one
        a1 --> a2
    end
```

 `可以为子图明确一个ID`

``` 

 graph TB
    c1-->a2
    subgraph ide1 [one]
    a1-->a2
    end
```

``` mermaid
graph TB 
    c1 --> a2
    subgraph one
        a1 --> a2
    end
```

### 流程图

 `使用flowchart，可以在子图间设置边线`

``` mermaid
flowchart TB
    subgraph one
        a1 --> a2
    end

    subgraph two
        b1 --> b2
    end

    subgraph three
        c1 --> c2
    end
    one --> two
    three --> two
    two --> c2
```

### 相互作用

**在线测试网站：https://jsfiddle.net/s37cjoau/3/**
 `可以将click时间绑定到节点上，单击通过javascript回调或链接，该链接将在浏览器新选项卡中打开。注意：使用securityLevel='strict'时将禁用此功能，启用securityLevel='loose'时将开启此功能`

 `语法：`

``` 

click nodeId callback
click nodeId call callback()
```

* nodeId是节点的ID
* callback是在显示图形的页面上定义的javascript函数的名称，该函数将使用nodeId作为参数来调用。

 `js使用：`

``` html
<script>
  var callback = function() {
    alert('A callback was triggered');
  }
</script>
```

``` 

graph LR
    A --> B
    B --> C
    C --> D
    click A callback "Tooltip for a callback"
    click B "http://www.github.com" "This is a tooltip for a link"
    click C call callback() "Tooltip for a callback"
    click D href "http://www.github.com" "This is a tooltip for a link"
```

``` mermaid
graph LR
    A --> B
    B --> C
    C --> D
    click A callback "Tooltip for a callback"
    click B "http://www.github.com" "This is a tooltip for a link"
    click C callback "Tooltip for a callback"
    click D "http://www.github.com" "This is a tooltip for a link"
```

 `打开链接方式：_self，_blank，_parent和_top`

``` 

graph LR;
    A-->B;
    B-->C;
    C-->D;
    D-->E;
    click A "http://www.github.com" _blank
    click B "http://www.github.com" "Open this in a new tab" _blank
    click C "http://www.github.com" _blank
    click D "http://www.github.com" "Open this in a new tab" _blank
```

``` mermaid
graph LR;
    A-->B;
    B-->C;
    C-->D;
    D-->E;
    click A "http://www.github.com" _blank
    click B "http://www.github.com" "Open this in a new tab" _blank
    click C "http://www.github.com" _blank
    click D "http://www.github.com" "Open this in a new tab" _blank
```

 `在html中使用示例：`

``` html
 <body>
   <div class="mermaid">
     graph LR;
     A-->B;
     B-->C;
     C-->D;
     click A callback "Tooltip"
     click B "http://www.github.com" "This is a link"
     click C call callback() "Tooltip"
     click D href "http://www.github.com" "This is a link"
   </div>

   <script>
     var callback = function() {
       alert('A callback was triggered');
     }
     var config = {
       startOnLoad: true,
       flowchart: {
         useMaxWidth: true,
         htmlLabels: true,
         curve: 'cardinal',
       },
       securityLevel: 'loose',
     };

     mermaid.initialize(config);
   </script>
 </body>
```

### 注释

 `使用%%（双百分号）符号注释单行代码`

``` 

 graph LR
%% this is a comment A -- text --> B{node}
   A -- text --> B -- text2 --> C
```

### 样式和class

#### 链接样式

 `在下面的示例中，linkStyle语句中定义的样式将属于图形中的第四个链接：`

``` 

linkStyle 3 stroke:#ff3,stroke-width:4px,color:red;
```

#### 设置节点样式

 `可以将特定样式（例如，较粗的边框或不同的背景颜色）应用于节点`

``` mermaid
graph LR
    id1(Start)-->id2(Stop)
    style id1 fill:#f9f,stroke:#333,stroke-width:4px
    style id2 fill:#bbf,stroke:#f66,stroke-width:2px,color:#fff,stroke-dasharray: 5 5
```

#### class

 `定义类`

``` 

 classDef className fill:#f9f,stroke:#333,stroke-width:4px;
```

 `将class附加到节点上`

``` 

     class nodeId1 className;
```

 `将class附加到多个节点上`

``` 

     class nodeId1,nodeId2 className;
```

 `使用 ::: 操作符将类名附加到节点`

``` mermaid
graph LR
    A:::someclass --> B
    classDef someclass fill:#f96
```

#### CSS class

``` html
<style>
  .cssClass>rect {
    fill: #FF0000;
    stroke: #FFFF00;
    stroke-width: 4px;
  }
</style>
```

 `示例`

``` 

 graph LR;
    A-->B[AAA<span>BBB</span>];
    B-->D;
    class A cssClass;
```

``` mermaid
 graph LR;
    A-->B[AAA<span>BBB</span>];
    B-->D;
    class A cssClass;
```

#### 默认class

 `如果将一个类命名为default，则它将被分配给所有类，而无需特定的类定义。`

``` 

   classDef default fill:#f9f,stroke:#333,stroke-width:4px;
```

### 支持基本fontawesome

**fontawesome网站：http://www.fontawesome.com.cn/**
 `可以从fontawesome添加图标。`

 `通过语法fa：#icon类名＃访问图标。`

``` 

graph TD
    B["fa:fa-twitter for peace"]
    B-->C[fa:fa-ban forbidden]
    B-->D(fa:fa-spinner);
    B-->E(A fa:fa-camera-retro perhaps?);
```

``` mermaid
graph TD
    B["fa:fa-twitter for peace"]
    B-->C[fa:fa-ban forbidden]
    B-->D(fa:fa-spinner);
    B-->E(A fa:fa-camera-retro perhaps?);
```

### 图的声明在顶点和链接之间有空格，并且没有分号

 `在图声明中，语句现在也可以不使用分号结束`

 `顶点和链接之间只能有一个空格。`

``` 

graph LR
    A[Hard edge] --> |Link text| B[Round edge]
    B --> C{Decision}
    C --> D[Result one]
    C --> E[Result two]
```

``` mermaid
graph LR
    A[Hard edge] --> |Link text| B[Round edge]
    B --> C{Decision}
    C --> D[Result one]
    C --> E[Result two]
```

### 配置流程图宽度

 `通过定义mermaid.flowchartConfig或通过CLI在配置中使用json文件来完成的`

``` 

mermaid.flowchartConfig = {
    width: 100%
}

```

## 状态图

 `状态图是计算机科学及相关领域中用于描述系统行为的一种图。状态图要求所描述的系统由有限数量的状态组成；`

### 状态

 `定义方式1（使用状态id）：`

``` 

stateDiagram-v2
    s1
```

``` mermaid
stateDiagram-v2
    s1
```

 `定义方式2（使用state关键字）：`

``` 

stateDiagram-v2
    state "This is a state description" as s2
```

``` mermaid
stateDiagram-v2
    state "This is a state description" as s2
```

 `定义方式3（使用另一种状态id,后跟冒号和描述）：`

``` 

stateDiagram-v2
    s2: This is a state description
```

``` mermaid
stateDiagram-v2
    s2: This is a state description
```

### 转场

 `定义：使用-->符号表示`

``` 

stateDiagram-v2
    s1 --> s2
```

``` mermaid
stateDiagram-v2
    s1 --> s2
```

 `添加文本描述,：后面添加描述`

``` 

stateDiagram-v2
    s1 --> s2: A transition
```

``` mermaid
stateDiagram-v2
    s1 --> s2 : A transition
```

### 开始和结束

 `两种特殊指示图开始和结束，使用*符号编写，转换到的方向，定义为开始和结束`

``` mermaid
stateDiagram-v2
    [*] --> s1
    s1 --> [*]
```

### 复合状态

 `一个状态中包含多个状态，称复合状态`

 `使用state关键字，后跟和id，以及{}之间的复合状态的主体`

``` 

stateDiagram-v2
    [*] --> First
    state First {
        [*] --> second
        second --> [*]
    }
```

``` mermaid
stateDiagram-v2
    [*] --> First
    state First {
        [*] --> second
        second --> [*]
    }
```

 `可以在多个层中执行操作`

``` 

stateDiagram-v2
    [*] --> First
    state First {
        [*] --> Second
        state Second {
            [*] --> second2
            second2 --> Third
            state Third {
                [*] --> third
                third --> [*]
            }
        } 
    }
```

``` mermaid
stateDiagram-v2
    [*] --> First
    state First {
        [*] --> Second
        state Second {
            [*] --> second2
            second2 --> Third
            state Third {
                [*] --> third
                third --> [*]
            }
        } 
    }
```

 `可以在复合状态中定义`

``` 

stateDiagram-v2
    [*] --> First
    state First {
        [*] --> fir
        fir --> [*]
    }
    state Second {
        [*] --> second
        second --> [*]
    }
    state Third {
        [*] --> third
        third --> [*]
    }

    First --> Second
    First --> Third
```

``` mermaid
stateDiagram-v2
    [*] --> First
    state First {
        [*] --> fir
        fir --> [*]
    }
    state Second {
        [*] --> second
        second --> [*]
    }
    state Third {
        [*] --> third
        third --> [*]
    }

    First --> Second
    First --> Third
```

### 分叉

 `可以使用<< fork >> << join >>在图中指定一个分叉`

``` 

stateDiagram-v2
    state fork_state <<fork>>
    [*] --> fork_state 
    fork_state --> state2
    fork_state --> state3

    state join_state <<join>>
    state2 --> join_state
    state3 --> join_state

    join_state --> state4
    state4 --> [*]
```

``` mermaid
stateDiagram-v2
    state fork_state <<fork>>
    [*] --> fork_state 
    fork_state --> state2
    fork_state --> state3

    state join_state <<join>>
    state2 --> join_state
    state3 --> join_state

    join_state --> state4
    state4 --> [*]
```

### 笔记

 `将笔记放在图解的左边和右边`

``` mermaid
stateDiagram-v2
    state1: The state with a note
    note right of state1
        Important information! You can wirte
        note
    end note
    state1 --> state2
    note left of state2: This is the note to the left
```

### 并发

 `使用--符号表示并发`

``` mermaid
stateDiagram-v2
    [*] --> Active
    
    state Active {
        [*] --> NumLockOff
        NumLockOff --> NumLockOn :EvNumLockPressed
        NumLockOn --> NumLockOff : EvNumLockPressed
        --
        [*] --> CapsLockOff
        CapsLockOff --> CapsLockOn :EvCapsLockPressed
        CapsLockOn --> CapsLockOff : EvCapsLockPressed
        -- 
        ScrollLockOff --> ScrollLockOn :EvScrollLockPressed
        ScrollLockOn --> ScrollLockOff : EvScrollLockPressed
    }
```

### 注释

 `单行注释,使用%%（双百分号）开头`

``` 

stateDiagram-v2
    [*] --> Still
    Still --> [*]
%% this is a comment
    Still --> Moving
    Moving --> Still %% another comment
    Moving --> Crash
    Crash --> [*]
```

### 造型风格

 `状态图的样式是通过定义多个CSS类来完成的。在渲染期间，这些类是从位于src / themes / state.scss的文件中提取的`

## 类图

 `在软件工程中，统一建模语言（UML）中的类图是一种静态结构图，它通过显示系统的类，其属性，操作（或方法）以及对象之间的关系来描述系统的结构。`

### class

 `UML提供了表示类成员的机制，例如属性和方法，以及有关它们的其他信息。图中一个类的单个实例包含三个隔离专区：`

* 顶部的小节包含类的名称。它以粗体和居中打印，并且第一个字母大写。它还可能包含描述类性质的可选注释文本。
* 中间隔间包含类的属性。它们是左对齐的，第一个字母是小写。底部的隔离区包含类可以执行的操作。它们也左对齐，首字母为小写。

``` mermaid
classDiagram
    class BankAccount
    BankAccount : +String owner
    BankAccount : -BigDecimal balance
    BankAccount : +deposit()
    BankAccount : -withdraw()
```

### 定义一个class

 `方法一：使用关键字class`

 `方法二：通过它们之间的关系定义，如 Vehicle <|-- Car`

``` 

classDiagram
    class Animal
    Vehicle <|-- Car
```

``` mermaid
classDiagram
    class Animal
    Vehicle <|-- Car
```

### 定义类成员

 `UML类成员中包括属性和方法，使用()符号区分，后面带()符号的为方法，其他为属性`

 `使用：号后面跟一个类成员`

``` 

classDiagram
    class BankAccount
    BankAccount : +String owner
    BankAccount : +BigDecimal balance
    BankAccount : +deposit(amount)
    BankAccount : +withdraw(amount)
```

``` mermaid
classDiagram
    class BankAccount
    BankAccount : +String owner
    BankAccount : +BigDecimal balance
    BankAccount : +deposit(amount)
    BankAccount : +withdraw(amount)
```

 `可以使用{}包含类中所有成员`

``` 

classDiagram
class BankAccount{
    +String owner
    +BigDecimal balance
    +deposit(amount) bool
    +withdrawl(amount)
}
```

``` mermaid
classDiagram
class BankAccount{
    +String owner
    +BigDecimal balance
    +deposit(amount) bool
    +withdrawl(amount)
}
```

### 添加返回类型

 `方法后面空格加方法值类型`

``` 

classDiagram
 class BankAccount{
    +String owner
    +BigDecimal balance
    +deposit(amount) bool
    +withdrawl(amount) int
}

```

``` mermaid
classDiagram
 class BankAccount{
    +String owner
    +BigDecimal balance
    +deposit(amount) bool
    +withdrawl(amount) int
}

```

### 成员访问类型

* `+` Public
* `-` Private
* `#` Protected
* `~` Package/Internal

 `定义方法类型`

* `*` Abstract e.g.: `someAbstractMethod()*`
* `$` Static e.g.: `someStaticMethod()$`

### 定义关系

| 类型 | 描述 |
| --- |  --- |
| <|-- | 继承 |
| *-- | 组合 |
| o-- | 聚合 |
| --> | 关联 |
| -- | 链接（实线） |
| ..> | 依赖 |
| ..|> | 实现 |
| .. | 链接 (虚线) | 

``` 

classDiagram
classA <|-- classB
classC *-- classD
classE o-- classF
classG <-- classH
classI -- classJ
classK <.. classL
classM <|.. classN
classO .. classP
```

``` mermaid
classDiagram
classA <|-- classB
classC *-- classD
classE o-- classF
classG <-- classH
classI -- classJ
classK <.. classL
classM <|.. classN
classO .. classP
```

 `使用标签描述两个类之间的关系`

``` 

classDiagram
classA --|> classB : Inheritance
classC --* classD : Composition
classE --o classF : Aggregation
classG --> classH : Association
classI -- classJ : Link(Solid)
classK ..> classL : Dependency
classM ..|> classN : Realization
classO .. classP : Link(Dashed)
```

``` mermaid
classDiagram
classA --|> classB : Inheritance
classC --* classD : Composition
classE --o classF : Aggregation
classG --> classH : Association
classI -- classJ : Link(Solid)
classK ..> classL : Dependency
classM ..|> classN : Realization
classO .. classP : Link(Dashed)
```

### 关系标签

 `可以在关系中添加标签文本：`

``` 

classDiagram
classA <|-- classB : implements
classC *-- classD : composition
classE o-- classF : association
```

``` mermaid
classDiagram
classA <|-- classB : implements
classC *-- classD : composition
classE o-- classF : association
```

### 关系的基数/多重性

 `类图中的多重性或基数表示链接到另一类的一个实例的一个类的实例数。例如，一个公司将有一个或多个员工，但每个员工仅为一个公司工作。`

* `1` 只有1个
* `0..1` 0或1
* `1..*` 一个或多个
* `*` 多个
* `n` n {其中n> 1}
* `0..n` 0到n {n > 1}
* `1..n` 一对n{n > 1}

 `通过将基数文本放在"给定箭头之前（可选）和之后（可选）的引号内可以轻松定义基数。`

``` 

[classA] "cardinality1" [Arrow] "cardinality2" [ClassB]:LabelText
```

``` 

classDiagram

    Customer "1" --> "*" Ticket
    Student "1" --> "1..n" Course
    Galaxy --> "many" Star : Contains

```

``` mermaid
classDiagram
    Customer "1" --> "*" Ticket
    Student "1" --> "1..n" Course
    Galaxy --> "many" Star : Contains
```

### 类的注释

 `可以使用特定的标记文本为类添加注释，该标记文本类似于该类的元数据，从而可以清楚地表明其性质。`

* `<<Interface>>` 表示一个接口类
* `<<abstract>>` 代表抽象类
* `<<Service>>` 代表服务等级
* `<<enumeration>>` 代表一个枚举

 `注解使用：<<元数据>> `

 `定义方法一（定义类后，在单独一行中定义）：`

``` 

classDiagram
    class Shape
    <<interface>> Shape
```

``` mermaid
classDiagram
    class Shape
    <<interface>> Shape
```

 `定义方法二（与类定义一起在嵌套结构中）：`

``` 

classDiagram
class Shape{
    <<interface>>
    noOfVertices
    draw()
}

class Color{
    <<enumeration>>
    RED
    BLUE
    GREEN
    WHITH
    BLACK
}
```

``` mermaid
classDiagram
class Shape{
    <<interface>>
    noOfVertices
    draw()
}

class Color{
    <<enumeration>>
    RED
    BLUE
    GREEN
    WHITH
    BLACK
}
```

### 注释

 `以%%（双百分号）开头注解代码`

``` 

classDiagram
%% This whole line is a comment classDiagram class Shape <<interface>>
class Shape{
    <<interface>>
    noOfVertices
    draw()
}
```

## 其它示例

### 基本时序图

``` 

sequenceDiagram
    participant Alice
    participant Bob
    participant John

    Alice ->> Bob: Hello Bob,how are you?
    Bob -->> John: How about you John?
    Bob --x Alice: I am good thanks!
    Bob -x John: I am good thanks!
    Bob --> Alice: Checking with John...
    Alice -> John: Yes... John,how are you?
    
    Note right of John: Bob thinks a long<br/>long time, so long<br/>that the <br/>text does<br/>not fit on a row.

```

``` mermaid
sequenceDiagram
    participant Alice
    participant Bob
    participant John

    Alice ->> Bob: Hello Bob,how are you?
    Bob -->> John: How about you John?
    Bob --x Alice: I am good thanks!
    Bob -x John: I am good thanks!
    Bob --> Alice: Checking with John...
    Alice -> John: Yes... John,how are you?
    
    Note right of John: Bob thinks a long<br/>long time, so long<br/>that the <br/>text does<br/>not fit on a row.

```

### 基本流程图

``` 

graph LR
    A[Square Rect] -->|Link text| B((Circle))
    A --> C(Round Rect)
    B --> D{Rhombus}
    C --> D
```

``` mermaid
graph LR
    A[Square Rect] -->|Link text| B((Circle))
    A --> C(Round Rect)
    B --> D{Rhombus}
    C --> D
```

### 具有某些样式的较大流程图

``` 

graph TB
    subgraph A
        od>Odd Shape] -->|Two line edge comment| ro(Rounded square share)
        di{Diamond with line break} --> ro
        di ==> ro2(Rounded square share)
    end

    sq[Square share] --> ci((Circle shape))

    in((inner/circle <br> and some odd <br> special characters)) --> re>Really long text with linebreak in an Odd shape]
    in --> fh(,.?!+-*ز)

    cy[Cyrillic] --> ci2((Circle shape Начало))

    classDef green fill:#9f6,stroke:#333,stroke-width:2px;
    classDef orange fill:#f96,stroke:#333,stroke-width:4px;
    class sq,in green
    class di orange
```

``` mermaid
graph TB
    subgraph A
        od>Odd Shape] -->|Two line edge comment| ro(Rounded square share)
        di{Diamond with line break} --> ro
        di ==> ro2(Rounded square share)
    end

    sq[Square share] --> ci((Circle shape))

    in((inner/circle <br> and some odd <br> special characters)) --> re>Really long text with linebreak in an Odd shape]
    in --> fh(,.?!+-*ز)

    cy[Cyrillic] --> ci2((Circle shape Начало))

    classDef green fill:#9f6,stroke:#333,stroke-width:2px;
    classDef orange fill:#f96,stroke:#333,stroke-width:4px;
    class sq,in green
    class di orange
```

### 时序图:loop, alt, opt

``` 

sequenceDiagram
    participant Alice
    participant Bob
    loop Daily query
        Alice ->> Bob: Hello Bob,how are you?
        alt is sict
            Bob ->> Alice: Not so good:(
        else is well
            Bob ->> Alice: Feelling fresh like a daisy
        end
        opt Extra response
            Bob ->> Alice: Thanks for asking
        end
    end
```

``` mermaid
sequenceDiagram
    participant Alice
    participant Bob
    loop Daily query
        Alice ->> Bob: Hello Bob,how are you?
        alt is sict
            Bob ->> Alice: Not so good:(
        else is well
            Bob ->> Alice: Feelling fresh like a daisy
        end
        opt Extra response
            Bob ->> Alice: Thanks for asking
        end
    end
```

### 时序图：自循环消息

``` 

sequenceDiagram
    participant Alice
    participant Bob
    participant John

    Alice ->> John: Hello John,how are you?
    loop Healthcheck
        John ->> John: Fight against hypochondria
    end

    John -->> Alice: Great!
    John ->> Bob: How about you?
    Bob -->> John: Jolly good!

    Note right of John: Rational thoughts prevail...
```

``` mermaid
sequenceDiagram
    participant Alice
    participant Bob
    participant John

    Alice ->> John: Hello John,how are you?
    loop Healthcheck
        John ->> John: Fight against hypochondria
    end

    John -->> Alice: Great!
    John ->> Bob: How about you?
    Bob -->> John: Jolly good!

    Note right of John: Rational thoughts prevail...
```
