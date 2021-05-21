# 核心技术-Pod

## Pod 概述

Pod 是 k8s 系统中可以创建和管理的最小单元，是资源对象模型中由用户创建或部署的最小资源对象模型，也是在 k8s 上运行容器化应用的资源对象，其他的资源对象都是用来支撑或者扩展 Pod 对象功能的，比如控制器对象是用来管控 Pod 对象的，Service 或者Ingress 资源对象是用来暴露 Pod 引用对象的，PersistentVolume 资源对象是用来为 Pod提供存储等等，k8s 不会直接处理容器，而是 Pod，Pod 是由一个或多个 container 组成Pod 是 Kubernetes 的最重要概念，每一个 Pod 都有一个特殊的被称为”根容器“的 Pause容器。Pause 容器对应的镜 像属于 Kubernetes 平台的一部分，除了 Pause 容器，每个 Pod 还包含一个或多个紧密相关的用户业务容器

![](../../assets/images/2021-04-22-16-43-16.png)

![](../../assets/images/2021-04-22-16-43-29.png)

### Pod vs 应用

每个 Pod 都是应用的一个实例，有专用的 IP

### Pod vs 容器

一个 Pod 可以有多个容器，彼此间共享网络和存储资源，每个 Pod 中有一个 Pause 容器保存所有的容器状态， 通过管理 pause 容器，达到管理 pod 中所有容器的效果

### Pod vs 节点

同一个 Pod 中的容器总会被调度到相同 Node 节点，不同节点间 Pod 的通信基于虚拟二层网络技术实现

### Pod vs Pod

普通的 Pod 和静态 Pod

## Pod 特性

### 资源共享

一个 Pod 里的多个容器可以共享存储和网络，可以看作一个逻辑的主机。共享的如 namespace, cgroups 或者其他的隔离资源。

多个容器共享同一 network namespace，由此在一个 Pod 里的多个容器共享 Pod 的 IP 和 端口 namespace，所以一个 Pod 内的多个容器之间可以通过 localhost 来进行通信, 所需要

注意的是不同容器要注意不要有端口冲突即可。不同的 Pod 有不同的 IP, 不同 Pod 内的多个容器之前通信，不可以使用 IPC（如果没有特殊指定的话）通信，通常情况下使用 Pod 的 IP 进行通信。

一个 Pod 里的多个容器可以共享存储卷，这个存储卷会被定义为 Pod 的一部分，并且可以挂载到该 Pod 里的所有容器的文件系统上。

### 生命周期短暂

Pod 属于生命周期比较短暂的组件，比如，当 Pod 所在节点发生故障，那么该节点上的 Pod 会被调度到其他节点，但需要注意的是，被重新调度的 Pod 是一个全新的 Pod, 跟之前的Pod 没有半毛钱关系。

### 平坦的网络

K8s 集群中的所有 Pod 都在同一个共享网络地址空间中，也就是说每个 Pod 都可以通过其他 Pod 的 IP 地址来实现访问。

## Pod 定义

（1）下面是 yaml 文件定义的 Pod 的完整内容

``` yaml
apiVersion: v1
kind: Pod
metadata: //元数据
name: string
namespace: string
labels:

  + name: string

annotations:

  + name: string

spec:
containers: //pod 中的容器列表，可以有多个容器

  + name: string //容器的名称

image: string //容器中的镜像
imagesPullPolicy: [Always|Never|IfNotPresent]//获取镜像的策略，默认值为Always，每次都尝试重新下载镜像
command: [string] //容器的启动命令列表（不配置的话使用镜像内部的命令） 
args: [string] //启动参数列表
workingDir: string //容器的工作目录 volumeMounts: //挂载到到容器内部的存储卷设置
  -name: string
mountPath: string //存储卷在容器内部 Mount 的绝对路径 
readOnly: boolean //默认值为读写
ports: //容器需要暴露的端口号列表
  -name: string
containerPort: int //容器要暴露的端口
hostPort: int //容器所在主机监听的端口（容器暴露端口映射到宿主机的端口，设置hostPort 时同一 台宿主机将不能再启动该容器的第 2 份副本）
protocol: string //TCP 和 UDP，默认值为 TCP env: //容器运行前要设置的环境列表
  -name: string value: string
resources:
limits: //资源限制，容器的最大可用资源数量 cpu: Srting
memory: string
requeste: //资源限制，容器启动的初始可用资源数量 cpu: string
memory: string
livenessProbe: //pod 内容器健康检查的设置 exec:
command: [string] //exec 方式需要指定的命令或脚本 httpGet: //通过 httpget 检查健康
path: string port: number host: string scheme: Srtring httpHeaders:
  -name: Stirng value: string
tcpSocket: //通过 tcpSocket 检查健康
port: number initialDelaySeconds: 0//首次检查时间 timeoutSeconds: 0 //检查超时时间
periodSeconds: 0 //检查间隔时间
successThreshold: 0
failureThreshold: 0 securityContext: //安全配置
privileged: falae
restartPolicy: [Always|Never|OnFailure]//重启策略，默认值为 Always
nodeSelector: object //节点选择，表示将该 Pod 调度到包含这些 label 的 Node 上，以key:value 格式指定
imagePullSecrets:
  -name: string
hostNetwork: false //是否使用主机网络模式，弃用 Docker 网桥，默认否
volumes: //在该 pod 上定义共享存储卷列表
  -name: string emptyDir: {} hostPath:
path: string secret:
secretName: string item:
  -key: string path: string
configMap: name: string items:

  + key: string

path: string
```

## Pod 的基本使用方法

在 kubernetes 中对运行容器的要求为：容器的主程序需要一直在前台运行，而不是后台运行。应用需要改造成前 台运行的方式。如果我们创建的 Docker 镜像的启动命令是后台执行程序，则在 kubelet 创建包含这个容器的 pod 之 后运行完该命令，即认为 Pod 已经结束，将立刻销毁该 Pod。如果为该 Pod 定义了 RC，则创建、销毁会陷入一个无 限循环的过程中。Pod 可以由 1 个或多个容器组合而成。

* 一个容器组成的 Pod 的 yaml 示例

``` yaml
# 一个容器组成的 Pod
apiVersion: v1 
kind: Pod metadata:
name: mytomcat labels:
name: mytomcat spec:
containers:

  + name: mytomcat image: tomcat ports:
  + containerPort: 8000

```

* 多个容器组成的 Pod 的 yaml 示例

``` yaml
# 两个紧密耦合的容器
apiVersion: v1 
kind: Pod 
metadata:

name: myweb labels:

name: tomcat-redis

spec:

containers:

-name: tomcat image: tomcat ports:

-containerPort: 8080

-name: redis image: redis ports:

-containerPort: 6379

```

* 创建

``` bash
kubectl create -f xxx.yaml
```

* 查看

``` bash
kubectl get pod/po <Pod_name>

kubectl get pod/po <Pod_name> -o wide

kubectl describe pod/po <Pod_name>
```

* 删除

``` bash
kubectl delete -f pod pod_name.yaml

kubectl delete pod --all/[pod_name]
```

## Pod 的分类

Pod 有两种类型

### 普通 Pod

普通 Pod 一旦被创建，就会被放入到 etcd 中存储，随后会被 Kubernetes Master 调度到某个具体的 Node 上并进行绑定，随后该 Pod 对应的 Node 上的 kubelet 进程实例化成一组相关的 Docker 容器并启动起来。在默认情 况下，当 Pod 里某个容器停止时，Kubernetes 会自动检测到这个问题并且重新启动这个 Pod 里某所有容器， 如果 Pod 所在的 Node 宕机，则会将这个 Node 上的所有 Pod 重新调度到其它节点上。

### 静态 Pod

静态 Pod 是由 kubelet 进行管理的仅存在于特定 Node 上的 Pod, 它们不能通过 API Server 进行管理，无法与 ReplicationController、Deployment 或 DaemonSet 进行关联，并且

kubelet 也无法对它们进行健康检查。

## Pod 生命周期和重启策略

### Pod 的状态

![](../../assets/images/2021-04-22-17-40-14.png)

### Pod 重启策略

Pod 的重启策略包括 Always、OnFailure 和 Never，默认值是 Always
![](../../assets/images/2021-04-22-17-40-35.png)

### 常见状态转换

![](../../assets/images/2021-04-22-17-40-58.png)

## Pod 资源配置

每个 Pod 都可以对其能使用的服务器上的计算资源设置限额，Kubernetes 中可以设置限额的计算资源有 CPU 与 Memory 两种，其中 CPU 的资源单位为 CPU 数量, 是一个绝对值而非相对值。Memory 配额也是一个绝对值，它的单 位是内存字节数。
Kubernetes 里，一个计算资源进行配额限定需要设定以下两个参数： Requests 该资源最小申请数量，系统必须满足要求 Limits 该资源最大允许使用的量，不能突破，当容器试图使用超过这个量的资源时，可能会被 Kubernetes Kill 并重启

### 举例

``` bash
sepc

containers:

 - name: db

image: mysql

resources:

requests:

memory: "64Mi"

cpu: "250m"

limits:

memory: "128Mi"

cpu: "500m" 
```

上述代码表明 MySQL 容器申请最少 0.25 个 CPU 以及 64MiB 内存，在运行过程中容器所能使用的资源配额为 0.5 个 CPU 以及 128MiB 内存。 
