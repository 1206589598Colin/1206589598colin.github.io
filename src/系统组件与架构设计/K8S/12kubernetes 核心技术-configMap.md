# 核心技术-configMap

## ConfigMap 概述

ConfigMap 功能在 Kubernetes1.2 版本中引入，许多应用程序会从配置文件、命令行参数或环境变量中读取配 置信息。ConfigMap AP 丨给我们提供了向容器中注入配置信息的机制，ConfigMap 可以被用来保存单个属性，也 可以用来保存整个配置文件或者 JSON 二进制大对象

## ConfigMap 的创建

### 使用目录创建

``` bash
ls docs/user-guide/configmap/kubectl/

-- 显示
game.properties

ui.properties
```

``` bash
cat docs/user-guide/configmap/kubectl/game.properties

-- 显示
enemies=aliens

lives=3

enemies.cheat=true

enemies.cheat.level=noGoodRotten

secret.code.passphrase=UUDDLRLRBABAS

secret.code.allowed=true

secret.code.lives=30

```

``` bash
cat docs/user-guide/configmap/kubectl/ui.properties

-- 显示
color.good=purple

color.bad=yellow

allow.textmode=true

how.nice.to.look=fairlyNice

kubectl create configmap game-config --from-file=docs/user?guide/configmap/kubectl
```

-from-file 指定在目录下的所有文件都会被用在 ConfigMap 里面创建一个键值对，键的名

字就是文件名，值就 是文件的内容

### 使用文件创建

只要指定为一个文件就可以从单个文件中创建 ConfigMap

``` bash
kubectl create configmap game-config-2 --from-file=docs/user- guide/configmap/kubectl/game.properties

kubectl get configmaps game-config-2 -o yaml

```

-from-file 这个参数可以使用多次，你可以使用两次分別指定上个实例中的那两个配置文件，效果就跟指定整个 目录是一样的

### 使用字面值创建

使用文字值创建，利用-from-literal 参数传递配置信息，该参数可以使用多次，格式如下

``` bash
kubectl create configmap special-config --from-literal=special.how=very --from-literal=special.type=charm

kubectl get configmaps special-config -o yaml

```

## Pod 中使用 ConfigMap

### 使用 ConfigMap 来替代环境变量

``` yaml
apiVersion: v1

kind: ConfigMap

metadata:

name: special-config

namespace: default

data:

special.how: very

special.type: charm

apiVersion: v1

kind: ConfigMap

metadata:

name: env-config

namespace: default

data:

log_level: INFO

apiVersion: v1

kind: Pod

metadata:

name: dapi-test-pod

spec:

containers:

 - name: test-container

image: hub.atguigu.com/library/myapp:v1

command: [ "/bin/sh", "-c", "env"]

env:

-name: SPECIAL\_LEVEL\_KEY

valueFrom:

configMapKeyRef:

name: special-config

key: special.how

-name: SPECIAL\_TYPE\_KEY

valueFrom:

configMapKeyRef:

name: special-config

key: special.type

envFrom:

-configMapRef:

name: env-config

restartPolicy: Never

```

### 使用 ConfigMap 设置命令行参数

### 通过数据卷插件使用 ConfigMap

在数据卷里面使用这个 ConfigMap, 有不同的选项。最基本的就是将文件填入数据卷，在这个文件中，键就是文 件名，键值就是文件内容

## ConfigMap 的热更新

``` bash
kubectl exec 'kubectl get pods -l run=my-nginx -o=name|cut -d "/" -f2' cat

/etc/config/log_level

-- 显示
INFO
```

修改 ConfigMap

``` bash
kubectl edit configmap log-config
```

修改 log_level 的值为 DEBUG 等待大概 10 秒钟时间，再次查看环境变量的值

``` bash
$ kubectl exec 'kubectl get pods -l run=my-nginx -o=name|cut -d "/" -f2' cat
/tmp/log_level DEBUG
```

## ConfigMap 更新后滚动更新 Pod

更新 ConfigMap 目前并不会触发相关 Pod 的滚动更新，可以通过修改 pod annotations 的

方式强制触发滚动更新

``` bash
kubectl patch deployment my-nginx --patch '{"spec": {"template": {"metadata":
{"annotations": {"version/config": "20190411" }}}}}' 
```

这个例子里我们在.spec.template.metadata.annotations 中添加 version/config , 每次通过修改 version/config 来触发滚动更新更新 ConfigMap 后：

* 使用该 ConfigMap 挂载的 Env 不会同步更新

* 使用该 ConfigMap 挂载的 Volume 中的数据需要一段时间（实测大概 10 秒）才能同步更新
