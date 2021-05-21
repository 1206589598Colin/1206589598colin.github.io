(window.webpackJsonp=window.webpackJsonp||[]).push([[42],{1050:function(t,a,s){t.exports=s.p+"assets/img/2021-04-23-10-06-38.d08f8add.png"},1051:function(t,a,s){t.exports=s.p+"assets/img/2021-04-23-10-07-19.3b022bf4.png"},1052:function(t,a,s){t.exports=s.p+"assets/img/2021-04-23-10-07-29.7a5429a3.png"},1053:function(t,a,s){t.exports=s.p+"assets/img/2021-04-23-10-07-54.e92dc520.png"},1054:function(t,a,s){t.exports=s.p+"assets/img/2021-04-23-10-08-08.6e52bbc7.png"},1284:function(t,a,s){"use strict";s.r(a);var n=s(19),e=Object(n.a)({},(function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h1",{attrs:{id:"部署性能监控平台"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#部署性能监控平台"}},[t._v("#")]),t._v(" 部署性能监控平台")]),t._v(" "),n("h2",{attrs:{id:"概述"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#概述"}},[t._v("#")]),t._v(" 概述")]),t._v(" "),n("p",[t._v("开源软件 cAdvisor（Container Advisor）用于监控所在节点的容器运行状态，当前已经被默认集成到 kubelet 组件内，默认使用 tcp 4194 端口。在大规模容器集群，一般使用Heapster+Influxdb+Grafana 平台实现集群性能数据的采集，存储与展示。")]),t._v(" "),n("h2",{attrs:{id:"环境准备"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#环境准备"}},[t._v("#")]),t._v(" 环境准备")]),t._v(" "),n("h3",{attrs:{id:"基础环境"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#基础环境"}},[t._v("#")]),t._v(" 基础环境")]),t._v(" "),n("p",[t._v("Kubernetes + heapster + Influxdb + grafana")]),t._v(" "),n("h3",{attrs:{id:"原理"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#原理"}},[t._v("#")]),t._v(" 原理")]),t._v(" "),n("p",[n("img",{attrs:{src:s(1050),alt:""}})]),t._v(" "),n("p",[t._v("Heapster：集群中各 node 节点的 cAdvisor 的数据采集汇聚系统，通过调用 node 上kubelet 的 api，再通过 kubelet 调用 cAdvisor 的 api 来采集所在节点上所有容器的性能数据。Heapster 对性能数据进行聚合，并将结果保存到后端存储系统，heapster 支持多种后端存储系统，如 memory，Influxdb 等。")]),t._v(" "),n("p",[t._v("Influxdb：分布式时序数据库（每条记录有带有时间戳属性），主要用于实时数据采集，时间跟踪记录，存储时间图表，原始数据等。Influxdb 提供 rest api 用于数据的存储与查询。")]),t._v(" "),n("p",[t._v("Grafana：通过 dashboard 将 Influxdb 中的时序数据展现成图表或曲线等形式，便于查看集群运行状态。")]),t._v(" "),n("p",[t._v("Heapster，Influxdb，Grafana 均以 Pod 的形式启动与运行。")]),t._v(" "),n("h2",{attrs:{id:"部署-kubernetes-集群性能监控"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#部署-kubernetes-集群性能监控"}},[t._v("#")]),t._v(" 部署 Kubernetes 集群性能监控")]),t._v(" "),n("h3",{attrs:{id:"准备-images"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#准备-images"}},[t._v("#")]),t._v(" 准备 images")]),t._v(" "),n("p",[t._v("kubernetes 部署服务时，为避免部署时发生 pull 镜像超时的问题，建议提前将相关镜像pull 到相关所有节点（以下以 kubenode1 为例），或搭建本地镜像系统。")]),t._v(" "),n("p",[t._v('需要从 gcr.io pull 的镜像，已利用 Docker Hub 的"Create Auto-Build GitHub"功能（Docker Hub 利用 GitHub 上的 Dockerfile 文件 build 镜像），在个人的 Docker Hub build 成功，可直接 pull 到本地使用。')]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# heapster")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("root@kubenode1 ~"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# docker pull netonline/heapster-amd64:v1.5.1")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# influxdb")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("root@kubenode1 ~"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# docker pull netonline/heapster-influxdb-amd64:v1.3.3")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# grafana")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("root@kubenode1 ~"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# docker pull netonline/heapster-grafana-amd64:v4.4.3")]),t._v("\n")])])]),n("h3",{attrs:{id:"下载-yaml-范本"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#下载-yaml-范本"}},[t._v("#")]),t._v(" 下载 yaml 范本")]),t._v(" "),n("p",[t._v("release 下载页：https://github.com/kubernetes/heapster/releases")]),t._v(" "),n("p",[t._v("release 中的 yaml 范本有时较 https://github.com/kubernetes/heapster/tree/master/deploy/kube-config/influxdb 的 yaml 新，但区别不大")]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("root@kubenode1 ~"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# cd /usr/local/src/")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("root@kubenode1 src"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# wget -O heapster-v1.5.1.tar.gz")]),t._v("\n\nhttps://github.com/kubernetes/heapster/archive/v1.5.1.tar.gz\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# yaml 范本在 heapster/deploy/kube-config/influxdb 目录，另有 1 个 heapster?rbac.yaml 在 heapster/deploy/kube-config/rbac 目录，两者目录结构同 github")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("root@kubenode1 src"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# tar -zxvf heapster-v1.5.1.tar.gz -C /usr/local/")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("root@kubenode1 src"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# mv /usr/local/heapster-1.5.1 /usr/local/heapster")]),t._v("\n\n")])])]),n("h3",{attrs:{id:"heapster-rbac-yaml"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#heapster-rbac-yaml"}},[t._v("#")]),t._v(" heapster-rbac.yaml")]),t._v(" "),n("ul",[n("li",[n("p",[t._v("heapster 需要向 kubernetes-master 请求 node 列表，需要设置相应权限；")])]),t._v(" "),n("li",[n("p",[t._v("默认不需要对 heapster-rbac.yaml 修改，将 kubernetes 集群自带的 ClusterRole ：")])])]),t._v(" "),n("p",[t._v("system:heapster 做 ClusterRoleBinding，完成授权")]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("root@kubenode1 ~"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# cd /usr/local/heapster/deploy/kube-config/rbac/")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("root@kubenode1 rbac"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# cat heapster-rbac.yaml")]),t._v("\n\n")])])]),n("div",{staticClass:"language-yaml extra-class"},[n("pre",{pre:!0,attrs:{class:"language-yaml"}},[n("code",[n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("kind")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" ClusterRoleBinding\n\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("apiVersion")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" rbac.authorization.k8s.io/v1beta1\n\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("metadata")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" heapster\n\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("roleRef")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("apiGroup")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" rbac.authorization.k8s.io\n\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("kind")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" ClusterRole\n\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" system"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("heapster\n\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("subjects")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n\n* kind"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" ServiceAccount\n\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" heapster\n\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("namespace")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" kube"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("system\n\n")])])]),n("h3",{attrs:{id:"heapster-yaml"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#heapster-yaml"}},[t._v("#")]),t._v(" heapster.yaml")]),t._v(" "),n("p",[t._v("hepster.yaml 由 3 个模块组成：ServiceAccout，Deployment，Service。")]),t._v(" "),n("h4",{attrs:{id:"serviceaccount"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#serviceaccount"}},[t._v("#")]),t._v(" ServiceAccount")]),t._v(" "),n("p",[t._v("默认不需要修改 ServiceAccount 部分，设置 ServiceAccount 资源，获取 rbac 中定义的权限。")]),t._v(" "),n("h4",{attrs:{id:"deployment"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#deployment"}},[t._v("#")]),t._v(" Deployment")]),t._v(" "),n("ul",[n("li",[n("p",[t._v("修改处：第 23 行，变更镜像名；")])]),t._v(" "),n("li",[n("p",[t._v("--source：配置采集源，使用安全端口调用 kubernetes 集群 api；")])]),t._v(" "),n("li",[n("p",[t._v("--sink：配置后端存储为 influxdb；地址采用 influxdb 的 service 名，需要集群 dns 正常工作，如果没有配置 dns 服务，可使用 service 的 ClusterIP 地址")])])]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("root@kubenode1 ~"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# cd /usr/local/heapster/deploy/kube-config/influxdb/")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("root@kubenode1 influxdb"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# sed -i 's|gcr.io/google_containers/heapster?amd64:v1.5.1|netonline/heapster-amd64:v1.5.1|g' heapster.yaml")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("root@kubenode1 influxdb"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# cat heapster.yaml ……")]),t._v("\n\n")])])]),n("div",{staticClass:"language-yaml extra-class"},[n("pre",{pre:!0,attrs:{class:"language-yaml"}},[n("code",[n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("apiVersion")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" extensions/v1beta1\n\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("kind")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Deployment\n\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("metadata")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" heapster\n\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("namespace")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" kube"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("system\n\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("spec")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("replicas")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("template")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("metadata")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("labels")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("task")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" monitoring\n\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("k8s-app")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" heapster\n\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("spec")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("serviceAccountName")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" heapster\n\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("containers")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n\n* name"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" heapster\n\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("image")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" netonline/heapster"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("amd64"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("v1.5.1\n\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("imagePullPolicy")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" IfNotPresent\n\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("command")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n\n* /heapster\n\n* "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("source=kubernetes"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("https"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("//kubernetes.default\n\n* "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("sink=influxdb"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("http"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("//monitoring"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("influxdb.kube"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("system.svc"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("8086")]),t._v("\n\n")])])]),n("ul",[n("li",[t._v("Service")])]),t._v(" "),n("p",[t._v("默认不需要修改 Service 部分。")]),t._v(" "),n("h3",{attrs:{id:"influxdb-yaml"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#influxdb-yaml"}},[t._v("#")]),t._v(" influxdb.yaml")]),t._v(" "),n("p",[t._v("influxdb.yaml 由 2 个模块组成：Deployment，Service。")]),t._v(" "),n("ul",[n("li",[t._v("Deployment")])]),t._v(" "),n("p",[t._v("修改处：第 16 行，变更镜像名；")]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("root@kubenode1 influxdb"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# sed -i 's|gcr.io/google_containers/heapster?influxdb-amd64:v1.3.3|netonline/heapster-influxdb-amd64:v1.3.3|g'")]),t._v("\n\n")])])]),n("p",[t._v("influxdb.yaml")]),t._v(" "),n("ul",[n("li",[t._v("Service")])]),t._v(" "),n("p",[t._v("默认不需要修改 Service 部分，注意 Service 名字的对应即可。")]),t._v(" "),n("h3",{attrs:{id:"grafana-yaml"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#grafana-yaml"}},[t._v("#")]),t._v(" grafana.yaml")]),t._v(" "),n("p",[t._v("grafana.yaml 由 2 个模块组成：Deployment，Service。")]),t._v(" "),n("ul",[n("li",[t._v("Deployment")])]),t._v(" "),n("p",[t._v("修改处：第 16 行，变更镜像名；")]),t._v(" "),n("p",[t._v("修改处：第 43 行，取消注释；“GF_SERVER_ROOT_URL”的 value 值设定后，只能通过 API Server proxy 访问 grafana；")]),t._v(" "),n("p",[t._v("修改处：第 44 行，注释本行；")]),t._v(" "),n("p",[t._v("INFLUXDB_HOST 的 value 值设定为 influxdb 的 service 名，依赖于集群 dns，或者直接")]),t._v(" "),n("p",[t._v("使用 ClusterIP")]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("root@kubenode1 influxdb"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# sed -i 's|gcr.io/google_containers/heapster-grafana?amd64:v4.4.3|netonline/heapster-grafana-amd64:v4.4.3|g' grafana.yaml")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("root@kubenode1 influxdb"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# sed -i '43s|# value:|value:|g' grafana.yaml")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("root@kubenode1 influxdb"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# sed -i '44s|value:|# value:|g' grafana.yaml")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("root@kubenode1 influxdb"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# cat grafana.yaml ……")]),t._v("\n\n")])])]),n("div",{staticClass:"language-yaml extra-class"},[n("pre",{pre:!0,attrs:{class:"language-yaml"}},[n("code",[n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("apiVersion")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" extensions/v1beta1\n\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("kind")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Deployment\n\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("metadata")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" monitoring"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("grafana\n\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("namespace")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" kube"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("system\n\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("spec")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("replicas")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("template")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("metadata")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("labels")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("task")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" monitoring\n\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("k8s-app")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" grafana\n\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("spec")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("containers")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n\n* name"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" grafana\n\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("image")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" netonline/heapster"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("grafana"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("amd64"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("v4.4.3\n\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("ports")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n\n* containerPort"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("3000")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("protocol")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" TCP\n\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("volumeMounts")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n\n* mountPath"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" /etc/ssl/certs\n\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" ca"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("certificates\n\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("readOnly")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token boolean important"}},[t._v("true")]),t._v("\n\n* mountPath"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" /var\n\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" grafana"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("storage\n\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("env")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n\n* name"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" INFLUXDB_HOST\n\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("value")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" monitoring"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("influxdb\n\n* name"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" GF\\_SERVER\\_HTTP_PORT\n\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("value")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"3000"')]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# The following env variables are required to make Grafana accessible")]),t._v("\n\nvia\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# the kubernetes api-server proxy. On production clusters, we")]),t._v("\n\nrecommend\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# removing these env variables, setup auth for grafana, and expose")]),t._v("\n\nthe grafana\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# service using a LoadBalancer or a public IP.")]),t._v("\n\n* name"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" GF\\_AUTH\\_BASIC_ENABLED\n\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("value")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"false"')]),t._v("\n\n* name"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" GF\\_AUTH\\_ANONYMOUS_ENABLED\n\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("value")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"true"')]),t._v("\n\n* name"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" GF\\_AUTH\\_ANONYMOUS\\_ORG\\_ROLE\n\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("value")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Admin\n\n* name"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" GF\\_SERVER\\_ROOT_URL\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# If you're only using the API Server proxy, set this value instead:")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("value")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" /api/v1/namespaces/kube"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("system/services/monitoring"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("?")]),t._v("grafana/proxy\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# value: /")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("volumes")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n\n* name"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" ca"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("certificates\n\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("hostPath")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("path")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" /etc/ssl/certs\n\n* name"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" grafana"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("storage\n\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("emptyDir")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" ……\n\n")])])]),n("ul",[n("li",[t._v("Service")])]),t._v(" "),n("p",[t._v("默认不需要修改 Service 部分，注意 Service 名字的对应即可。")]),t._v(" "),n("h2",{attrs:{id:"验证"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#验证"}},[t._v("#")]),t._v(" 验证")]),t._v(" "),n("h3",{attrs:{id:"启动监控相关服务"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#启动监控相关服务"}},[t._v("#")]),t._v(" 启动监控相关服务")]),t._v(" "),n("p",[t._v("将 heapster-rbac.yaml 复制到 influxdb/目录；")]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("root@kubenode1 ~"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# cd /usr/local/heapster/deploy/kube-config/influxdb/")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("root@kubenode1 influxdb"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# cp /usr/local/heapster/deploy/kube?config/rbac/heapster-rbac.yaml .")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("root@kubenode1 influxdb"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# kubectl create -f .")]),t._v("\n\n")])])]),n("h3",{attrs:{id:"查看相关服务"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#查看相关服务"}},[t._v("#")]),t._v(" 查看相关服务")]),t._v(" "),n("p",[t._v("查看 deployment 与 Pod 运行状态")]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("root@kubenode1 ~"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# kubectl get deploy -n kube-system | grep -E")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'heapster|monitoring'")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("root@kubenode1 ~"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# kubectl get pods -n kube-system | grep -E")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'heapster|monitoring'")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 查看 service 运行状态")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("root@kubenode1 ~"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# kubectl get svc -n kube-system | grep -E")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'heapster|monitoring'")]),t._v("\n\n")])])]),n("h3",{attrs:{id:"访问-dashboard"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#访问-dashboard"}},[t._v("#")]),t._v(" 访问 dashboard")]),t._v(" "),n("p",[t._v("浏览器访问访问 dashboard：https://172.30.200.10:6443/api/v1/namespaces/kube?system/services/https:kubernetes-dashboard:/proxy")]),t._v(" "),n("p",[t._v("注意：Dasheboard 没有配置 hepster 监控平台时，不能展示 node，Pod 资源的 CPU 与内存")]),t._v(" "),n("p",[t._v("等 metric 图形")]),t._v(" "),n("p",[t._v("Node 资源 CPU/内存 metric 图形：")]),t._v(" "),n("p",[n("img",{attrs:{src:s(1051),alt:""}})]),t._v(" "),n("p",[t._v("Pod 资源 CPU/内存 metric 图形：")]),t._v(" "),n("p",[n("img",{attrs:{src:s(1052),alt:""}})]),t._v(" "),n("h3",{attrs:{id:"访问-grafana"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#访问-grafana"}},[t._v("#")]),t._v(" 访问 grafana")]),t._v(" "),n("p",[t._v("通过 kube-apiserver 访问")]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("root@kubenode1 ~"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# kubectl cluster-info")]),t._v("\n\n")])])]),n("p",[t._v("浏览器访问访问 dashboard：https://172.30.200.10:6443/api/v1/namespaces/kube?system/services/monitoring-grafana/proxy")]),t._v(" "),n("p",[t._v("集群节点信息：")]),t._v(" "),n("p",[n("img",{attrs:{src:s(1053),alt:""}})]),t._v(" "),n("p",[t._v("Pod 信息：")]),t._v(" "),n("p",[n("img",{attrs:{src:s(1054),alt:""}})])])}),[],!1,null,null,null);a.default=e.exports}}]);