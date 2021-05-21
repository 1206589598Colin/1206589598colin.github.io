(window.webpackJsonp=window.webpackJsonp||[]).push([[167],{1273:function(a,t,s){"use strict";s.r(t);var e=s(19),n=Object(e.a)({},(function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("h1",{attrs:{id:"核心技术-namespace"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#核心技术-namespace"}},[a._v("#")]),a._v(" 核心技术-Namespace")]),a._v(" "),s("h2",{attrs:{id:"namespace-概述"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#namespace-概述"}},[a._v("#")]),a._v(" Namespace 概述")]),a._v(" "),s("p",[a._v('Namespace 在很多情况下用于实现多用户的资源隔离，通过将集群内部的资源对象分配到不同的 Namespace 中， 形成逻辑上的分组，便于不同的分组在共享使用整个集群的资源同时还能被分别管理。Kubernetes 集群在启动后，会创建一个名为"default"的 Namespace，如果不特别指明 Namespace, 则用户创建的 Pod，RC，Service 都将 被系统 创建到这个默认的名为 default 的 Namespace 中。')]),a._v(" "),s("h2",{attrs:{id:"namespace-创建"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#namespace-创建"}},[a._v("#")]),a._v(" Namespace 创建")]),a._v(" "),s("div",{staticClass:"language-yaml extra-class"},[s("pre",{pre:!0,attrs:{class:"language-yaml"}},[s("code",[s("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("apiVersion")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("v1 kind")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("Namespace metadata")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v("\n\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("name")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" development\n\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("---")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("---")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("---")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("---")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("---")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("---")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("---")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("-")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("-")]),a._v("\n\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("apiVersion")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("v1 kind")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("Pod metadata")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v("\n\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("name")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("busybox namespace")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" development\n\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("spec")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v("\n\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("containers")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v("\n\n "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("-")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("image")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("busybox command")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v("\n\n "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("-")]),a._v(" sleep\n\n "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("-")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("-")]),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"3600"')]),a._v("\n\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("name")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" busybox\n")])])]),s("h2",{attrs:{id:"namespace-查看"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#namespace-查看"}},[a._v("#")]),a._v(" Namespace 查看")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("kubectl get pods --namespace"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("development\n")])])])])}),[],!1,null,null,null);t.default=n.exports}}]);