(window.webpackJsonp=window.webpackJsonp||[]).push([[153],{1229:function(t,a,e){"use strict";e.r(a);var s=e(19),n=Object(s.a)({},(function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h2",{attrs:{id:"索引管理"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#索引管理"}},[t._v("#")]),t._v(" 索引管理")]),t._v(" "),e("h3",{attrs:{id:"创建索引"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#创建索引"}},[t._v("#")]),t._v(" 创建索引")]),t._v(" "),e("p",[e("img",{attrs:{src:"/assets/images/2021-01-31-23-17-57.png",alt:""}}),e("br"),t._v("\n请求：PUT http://localhost:9200/test/"),e("br"),t._v("\n内容：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v('{\n    "settings":{\n        "index":{\n            "number_of_shards":3,\n            "number_of_replicas":2\n        }\n    }\n}\n')])])]),e("p",[t._v("响应内容：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v('{\n    "acknowledged":true,\n    "shards_acknowledged":true,\n    "index":"test"\n}\n')])])]),e("h3",{attrs:{id:"删除索引"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#删除索引"}},[t._v("#")]),t._v(" 删除索引")]),t._v(" "),e("p",[e("img",{attrs:{src:"/assets/images/2021-02-01-19-43-49.png",alt:""}}),e("br"),t._v("\n请求：DELETE http://localhost:9200/test/"),e("br"),t._v("\n内容：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("{}\n")])])]),e("p",[t._v("响应内容：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v('{\n    "acknowledged": true\n}\n')])])]),e("h3",{attrs:{id:"获取索引"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#获取索引"}},[t._v("#")]),t._v(" 获取索引")]),t._v(" "),e("p",[e("img",{attrs:{src:"/assets/images/2021-02-01-19-49-54.png",alt:""}}),e("br"),t._v("\n请求：GET http://localhost:9200/test/"),e("br"),t._v("\n内容：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("{}\n")])])]),e("p",[t._v("响应内容：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v('{\n    "test":{\n        "aliases":{\n\n        },\n        "mappings":{\n\n        },\n        "settings":{\n            "index":{\n                "routing":{\n                    "allocation":{\n                        "include":{\n                            "_tier_preference":"data_content"\n                        }\n                    }\n                },\n                "number_of_shards":"1",\n                "provided_name":"test",\n                "creation_date":"1612194497630",\n                "number_of_replicas":"1",\n                "uuid":"L2_mG8_9Ra-3Zdrs1QvW_w",\n                "version":{\n                    "created":"7100199"\n                }\n            }\n        }\n    }\n}\n')])])]),e("h3",{attrs:{id:"打开-关闭索引"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#打开-关闭索引"}},[t._v("#")]),t._v(" 打开/关闭索引")]),t._v(" "),e("p",[e("img",{attrs:{src:"/assets/images/2021-02-01-19-54-48.png",alt:""}})]),t._v(" "),e("p",[t._v("请求：POST http://localhost:9200/test/"),e("br"),t._v("\n内容：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("{}\n")])])]),e("p",[t._v("响应内容：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v('{\n    "acknowledged":true,\n    "shards_acknowledged":true\n}\n')])])]),e("h2",{attrs:{id:"索引别名"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#索引别名"}},[t._v("#")]),t._v(" 索引别名")]),t._v(" "),e("h3",{attrs:{id:"增加索引别名"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#增加索引别名"}},[t._v("#")]),t._v(" 增加索引别名")]),t._v(" "),e("p",[e("img",{attrs:{src:"/assets/images/2021-02-02-15-24-21.png",alt:""}}),e("br"),t._v("\n请求：POST http://localhost:9200/_aliases")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v('// 添加单个别名\n{\n    "actions": [\n        {\n            "add": {\n                "index": "test", \n                "alias": "alias1"\n            }\n        }\n    ]\n}\n\n// 添加多个别名（方法1）\n{\n    "actions": [\n        {\n            "add": {\n                "index": "test", \n                "alias": "alias1"\n            }\n        },\n        {\n            "add": {\n                "index": "test", \n                "alias": "alias2"\n            }\n        }\n    ]\n}\n\n// 添加多个别名（方法2）\n{\n    "actions": [\n        {\n            "add": {\n                "indices":["test1","test2"],\n                "alias":"alias1"\n            }\n        }\n    ]\n}\n\n// 添加多个别名（方法3）使用通配符\n\n{\n    "actions": [\n        {\n            "add": {\n                "index": "test*", \n                "alias": "alias1"\n            }\n        }\n    ]\n}\n\n')])])]),e("p",[t._v("响应内容：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v('{\n    "acknowledged": true\n}\n')])])]),e("h3",{attrs:{id:"删除索引别名"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#删除索引别名"}},[t._v("#")]),t._v(" 删除索引别名")]),t._v(" "),e("p",[e("img",{attrs:{src:"/assets/images/2021-02-02-15-34-54.png",alt:""}})]),t._v(" "),e("p",[t._v("请求：POST http://localhost:9200/_aliases")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v('{\n    "actions": [\n        {\n            "add": {\n                "index": "test", \n                "alias": "alias1"\n            }\n        }\n    ]\n}\n')])])]),e("p",[t._v("响应内容：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v('{\n    "acknowledged": true\n}\n')])])]),e("h3",{attrs:{id:"修改索引别名"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#修改索引别名"}},[t._v("#")]),t._v(" 修改索引别名")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("PS：索引别名没有修改api,可以先删除后添加\n")])])]),e("p",[e("img",{attrs:{src:"/assets/images/2021-02-02-15-45-56.png",alt:""}})]),t._v(" "),e("p",[t._v("请求：POST http://localhost:9200/_aliases")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v('{\n    "actions": [\n        {\n            "remove": {\n                "index": "test", \n                "alias": "alias1"\n            }\n        }, \n        {\n            "add": {\n                "index": "test", \n                "alias": "alias2"\n            }\n        }\n    ]\n}\n\n')])])]),e("p",[t._v("响应内容：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v('{\n    "acknowledged": true\n}\n')])])]),e("h3",{attrs:{id:"过滤索引别名"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#过滤索引别名"}},[t._v("#")]),t._v(" 过滤索引别名")]),t._v(" "),e("h3",{attrs:{id:"删除索引别名-2"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#删除索引别名-2"}},[t._v("#")]),t._v(" 删除索引别名")]),t._v(" "),e("p",[e("img",{attrs:{src:"/assets/images/2021-02-02-16-34-15.png",alt:""}})]),t._v(" "),e("p",[t._v("请求：POST http://localhost:9200/test/_alias/alias2")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("{}\n")])])]),e("p",[t._v("响应内容：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v('{\n    "acknowledged": true\n}\n')])])]),e("h3",{attrs:{id:"查询现有别名"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#查询现有别名"}},[t._v("#")]),t._v(" 查询现有别名")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("可以通过索引名或者别名进行查询。参数如下：\n\n* index ：索引别名的名称。部分名称支持通配符用逗号分隔也可以指定多个索引名称，还可以使用索引的别名名称。\n* alias ：在响应中返回的别名名称。该参数支持通配符和用逗号分隔的多个别名\n* ignore _ unavailable ：如果一个指定的索引名称不存在该怎么办。如果设置为 true ，那么这些索引将被忽略。\n\n")])])]),e("p",[e("img",{attrs:{src:"/assets/images/2021-02-02-16-52-49.png",alt:""}})]),t._v(" "),e("p",[t._v("请求：POST http://localhost:9200/test/_alias/*/")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("{}\n")])])]),e("p",[t._v("响应内容：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v('{\n    "test": {\n        "aliases": {\n            "alias1": { }\n        }\n    }\n}\n')])])]),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("其他使用\n\n* http://localhost:9200/_alias/alias1\n* http://localhost:9200/_alias/al*\n\n")])])]),e("h2",{attrs:{id:"索引配置"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#索引配置"}},[t._v("#")]),t._v(" 索引配置")]),t._v(" "),e("h3",{attrs:{id:"更新索引配置"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#更新索引配置"}},[t._v("#")]),t._v(" 更新索引配置")]),t._v(" "),e("p",[e("img",{attrs:{src:"/assets/images/2021-02-02-17-09-20.png",alt:""}}),e("br"),t._v("\n请求： PUT http://localhost:9200/test/_settings")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v('{\n    "index": {\n        "number_of_replicas": 4\n    }\n}\n')])])]),e("p",[t._v("响应内容：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v('{\n    "acknowledged": true\n}\n')])])]),e("h3",{attrs:{id:"获取配置"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#获取配置"}},[t._v("#")]),t._v(" 获取配置")]),t._v(" "),e("p",[e("img",{attrs:{src:"/assets/images/2021-02-02-17-17-54.png",alt:""}})]),t._v(" "),e("p",[t._v("请求： GET http://localhost:9200/test/_settings/")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("\n* 索引名称可以接受多种参数： *|_all|name1,name2\n\n")])])]),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("{}\n")])])]),e("p",[t._v("响应内容：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v('{\n    "test": {\n        "settings": {\n            "index": {\n                "routing": {\n                    "allocation": {\n                        "include": {\n                            "_tier_preference": "data_content"\n                        }\n                    }\n                }, \n                "number_of_shards": "1", \n                "provided_name": "test", \n                "creation_date": "1612194497630", \n                "number_of_replicas": "4", \n                "uuid": "L2_mG8_9Ra-3Zdrs1QvW_w", \n                "version": {\n                    "created": "7100199"\n                }\n            }\n        }\n    }\n}\n\n')])])]),e("h3",{attrs:{id:"索引分析"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#索引分析"}},[t._v("#")]),t._v(" 索引分析")]),t._v(" "),e("p",[t._v("分析模块一般由分析器、标记器、tokenfilters 和 charfilters 组成")]),t._v(" "),e("p",[t._v("如果没有显式的定义任何分析器，那么 Elasticsearch 会使用相应的默认的内建分析器，这些默认的分析器由分析模块注册，包括分析器、令牌、过滤器和标记器")]),t._v(" "),e("h3",{attrs:{id:"范例"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#范例"}},[t._v("#")]),t._v(" 范例")]),t._v(" "),e("p",[t._v("例如下面这个请求，创建一个默认的图片索引")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("POST http://localhost:9200/pictures\n\n")])])]),e("p",[t._v("请求正文")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v('{\n   "settings": {\n      "analysis": {\n         "analyzer": {\n            "index_analyzer": {\n               "tokenizer": "standard", "filter": [\n                  "standard", "my_delimiter", "lowercase", "stop",\n                     "asciifolding", "porter_stem"\n               ]\n            },\n\n            "search_analyzer": {\n               "tokenizer": "standard", "filter": [\n                  "standard", "lowercase", "stop", "asciifolding", "porter_stem"\n               ]\n            }\n         },\n\n         "filter": {\n            "my_delimiter": {\n               "type": "word_delimiter",\n               "generate_word_parts": true,\n               "catenate_words": true,\n               "catenate_numbers": true,\n               "catenate_all": true,\n               "split_on_case_change": true,\n               "preserve_original": true,\n               "split_on_numerics": true,\n               "stem_english_possessive": true\n            }\n         }\n      }\n   }\n}\n\n')])])]),e("h2",{attrs:{id:"分析过程"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#分析过程"}},[t._v("#")]),t._v(" 分析过程")]),t._v(" "),e("p",[t._v("分析 ( analysis ) 是这样一个过程：")]),t._v(" "),e("ol",[e("li",[t._v("首先，标记化一个文本块为适用于倒排索引单独的 "),e("strong",[t._v("词")]),t._v(" (term)")]),t._v(" "),e("li",[t._v("然后标准化这些词为标准形式，提高它们的 「 可搜索性 」 和 「 查全率 」")])]),t._v(" "),e("p",[t._v("这两个工作由 分析器 (analyzer) 完成的")]),t._v(" "),e("p",[t._v("一个分析器 (analyzer) 一般由下面三个功能组成：")]),t._v(" "),e("ol",[e("li",[e("p",[e("strong",[t._v("字符过滤器")])]),t._v(" "),e("p",[t._v("首先字符串经过字符过滤器( character filter )，它们的工作是在标记化前处理字符串")]),t._v(" "),e("p",[t._v('字符过滤器能够去除 HTML 标记，或者转换 "&" 为 "and"')])]),t._v(" "),e("li",[e("p",[e("strong",[t._v("分词器")])]),t._v(" "),e("p",[t._v("下一步，分词器 (tokenizer) 被标记化成独立的词")]),t._v(" "),e("p",[t._v("一个简单的分词器 (tokenizer) 可以根据空格或逗号将单词分开")]),t._v(" "),e("blockquote",[e("p",[t._v("译者注：这个在中文中不适用")])])]),t._v(" "),e("li",[e("p",[e("strong",[t._v("标记过滤")])]),t._v(" "),e("p",[t._v('最后，每个词都通过所有标记过滤(token filters)，它可以修改词（例如将 "Quick" 转为小写），去掉词（ 例如停用词像 "a"、"and"、"the"等等），或者增加词（ 例如同义词像 "jump" 和 "leap" ）')])])]),t._v(" "),e("p",[t._v("Elasticsearch 提供很多开箱即用的字符过滤器，分词器和标记过滤器")]),t._v(" "),e("p",[t._v("这些可以组合来创建自定义的分析器以应对不同的需求")]),t._v(" "),e("h2",{attrs:{id:"分析器"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#分析器"}},[t._v("#")]),t._v(" 分析器")]),t._v(" "),e("p",[t._v("分词器由一个标记器和可选的标记过滤器组成")]),t._v(" "),e("p",[t._v("下表列出了 Elasticsearch 提供的大量的内置分词器，这些分词器在分析模块中使用逻辑名称进行注册，可以在映射定义中或在某些 API 中引用它们")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",{staticStyle:{"text-align":"left"}},[t._v("分析器")]),t._v(" "),e("th",{staticStyle:{"text-align":"left"}},[t._v("逻辑名")]),t._v(" "),e("th",{staticStyle:{"text-align":"left"}},[t._v("说明")])])]),t._v(" "),e("tbody",[e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("标准分词器")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("standard")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("可以自定义停止词 ( stopwords ) 和最大 token 长度 ( max_token_length )默认设置中，停止词为空，最大 token 长度为 255")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("简单分词器")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("simple")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("该分词器使用了小写标记器 (lowercase tokenizer )")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("空白分词器")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("whitespace")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("该非瓷器使用了空白标记器 ( whitespace tokenizer )")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("停止词分词器")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("stop")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("可以自定义停止词 ( stopwords ) 和停止词所在路径保存 ( stopwords_path )默认情况下，停止词使用了英文停止词 ( English stop words ) ，而停止词保存路径则是该英文停止词文件所在的路径")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("关键字分析器")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("keyword")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("该分析器将传递的所有参数内容视为一个单一标记，可以用于类似电话号码或邮政编码等")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("正则分析器")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("pattern")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("该分析器主要处理正则表达式。可以在此分析器中设置大小写敏感、模式、标志、停用词等")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("特定语言分析器")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}}),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("该分析仪处理诸如印地语，阿拉伯语，荷兰语等")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("雪球分析器")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("snowball")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("该分析器使用标准的分词器，并且组合使用了标准过滤器、小写过滤器、停止词过滤器和雪球过滤器")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("自定义分析器")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("custom")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("主要在用户需要自定义分析器时使用，由自定义分词器，可选的标记过滤器和可选的字符过滤器组成可以设置的选项有分词器 ( tokenizer ), 过滤器 ( filter ), 字符过滤器 ( char_filter ) 和 position_increment_gap")])])])]),t._v(" "),e("h2",{attrs:{id:"分词器-tokenizers"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#分词器-tokenizers"}},[t._v("#")]),t._v(" 分词器 ( Tokenizers )")]),t._v(" "),e("p",[t._v("分词器可以将一段分本分割为一个一个单词或词语")]),t._v(" "),e("p",[t._v("一个简单的分词器 ( tokenizer ) 可以根据空格或逗号将单词分开 ( 这个在中文中不适用 )")]),t._v(" "),e("p",[t._v("Elasticsearch 提供了有许多内置的分词器，我们也可用于自定义分词器")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",{staticStyle:{"text-align":"left"}},[t._v("分词器")]),t._v(" "),e("th",{staticStyle:{"text-align":"left"}},[t._v("逻辑名")]),t._v(" "),e("th",{staticStyle:{"text-align":"left"}},[t._v("说明")])])]),t._v(" "),e("tbody",[e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("标准分词器")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("standard")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("该分词器使用基于词的语法来分词，可配置的选项有  "),e("code",[t._v("max_token_length")])])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("edgeNGram 分词器")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("edgeNGram")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("可以配置的选项有  "),e("code",[t._v("min_gram")]),t._v(" ,   "),e("code",[t._v("max_gram")]),t._v("  ,   "),e("code",[t._v("token_chars")])])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("关键字分词器")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("keyword")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("该分词器将一整块的输入数据作为一个单独的分词。可以配置的选项有  "),e("code",[t._v("buffer_size")])])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("字母分词器")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("letter")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("该分词器会将遇到非字母之前的所有字母视为一个词")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("小写分词器")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("lowercase")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("和字母分词器相同，但在获取到一个词后会将其中的大写字母转换为小写")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("NGram 分词器")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("nGram")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("可配置的选项有  "),e("code",[t._v("min_gram")]),t._v("  ( 默认值 1) 、  "),e("code",[t._v("max_gram")]),t._v("  (默认值 2 ) 和  "),e("code",[t._v("token_chars")])])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("空白符分词器")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("whitespace")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("这个过滤器使用空白符划分文本")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("正则分词器")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("pattern")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("使用正则表达式作为分词分隔符，可以配置的选项有  "),e("code",[t._v("Pattern")]),t._v(" ,   "),e("code",[t._v("flags")]),t._v("  和  "),e("code",[t._v("group")])])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("UAX Email URL Tokenizer")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("uax_url_email")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("和标准分词器相同，但会把电子邮件和 URL 视为一个单独的词")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("层级路径分词器")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("path_hierarchy")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("该分词器会生成输入路径的所有可能路径可配置的选项有  "),e("code",[t._v("delimiter")]),t._v("  ( 默认  "),e("code",[t._v("/")]),t._v("  ),   "),e("code",[t._v("replacement")]),t._v(" ,   "),e("code",[t._v("buffer_size")]),t._v("  ( 默认 1024), reverse ( 默认  "),e("code",[t._v("false")]),t._v("  ) 和 skip ( 默认 0 )")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("经典分词器")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("classic")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("该分词器使用基于词的基本语法来分词。可配置的选项有  "),e("code",[t._v("max_token_length")])])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("泰语分词器")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("thai")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("使用内置的泰语分词算法对泰语进行分词")])])])]),t._v(" "),e("h2",{attrs:{id:"标记过滤器-token-filters"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#标记过滤器-token-filters"}},[t._v("#")]),t._v(" 标记过滤器 ( token filters )")]),t._v(" "),e("p",[t._v('标记过滤可以修改词 ( 例如将 "Quick" 转为小写），去掉词（ 例如停用词像 "a"、"and"、"the" 等等 ），或者增加词 ( 例如同义词像 "jump" 和 "leap" )')]),t._v(" "),e("p",[t._v("Elasticsearch 提供很多开箱即用的字符过滤器")]),t._v(" "),e("h2",{attrs:{id:"字符过滤器"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#字符过滤器"}},[t._v("#")]),t._v(" 字符过滤器")]),t._v(" "),e("p",[t._v("这些过滤器一般在分词器之前使用")]),t._v(" "),e("p",[t._v("字符过滤器查找特殊字符或 "),e("a",{attrs:{href:"https://www.twle.cn/l/yufei/html/html-baisc-index.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("HTML"),e("OutboundLink")],1),t._v(" 标记或指定模式，然后将其删除或更改为适当的单词，例如将  "),e("code",[t._v("＆")]),t._v("  改成  "),e("code",[t._v("and")]),t._v("  , 同时移除 html 标记标签")]),t._v(" "),e("p",[t._v("下面的代码是一个分析器的例子， "),e("code",[t._v("synonym.txt")]),t._v("  文件用于指定同义词")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v('{\n    "settings":{\n        "index":{\n            "analysis":{\n                "analyzer":{\n                    "synonym":{\n                        "tokenizer":"whitespace",\n                        "filter":["synonym"]\n                    }\n                },\n                "filter":{\n                    "synonym":{\n                        "type":"synonym",\n                        "synonyms_path":"synonym.txt",\n                        "ignore_case":"true"\n                    }\n                }\n            }\n        }\n    }\n}\n')])])]),e("h3",{attrs:{id:"复制配置"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#复制配置"}},[t._v("#")]),t._v(" 复制配置")]),t._v(" "),e("h3",{attrs:{id:"重键索引"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#重键索引"}},[t._v("#")]),t._v(" 重键索引")]),t._v(" "),e("h3",{attrs:{id:"索引统计"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#索引统计"}},[t._v("#")]),t._v(" 索引统计")]),t._v(" "),e("ul",[e("li",[t._v("获取所有聚合以及索引的统计数据")])]),t._v(" "),e("p",[t._v("请求：http://localhost:9200/_stats")]),t._v(" "),e("ul",[e("li",[t._v("获取指定索引的统计数据")])]),t._v(" "),e("p",[t._v("请求：http://localhost:9200/test/_stats")]),t._v(" "),e("p",[e("img",{attrs:{src:"/assets/images/2021-02-03-14-41-43.png",alt:""}})]),t._v(" "),e("p",[e("img",{attrs:{src:"/assets/images/2021-02-03-14-42-28.png",alt:""}})]),t._v(" "),e("h3",{attrs:{id:"索引分片"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#索引分片"}},[t._v("#")]),t._v(" 索引分片")]),t._v(" "),e("h4",{attrs:{id:"分片请求"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#分片请求"}},[t._v("#")]),t._v(" 分片请求")]),t._v(" "),e("p",[t._v("请求 GET")])])}),[],!1,null,null,null);a.default=n.exports}}]);