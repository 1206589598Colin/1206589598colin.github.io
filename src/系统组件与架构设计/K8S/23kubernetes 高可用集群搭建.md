# 高可用集群搭建

kubeadm是官方社区推出的一个用于快速部署kubernetes集群的工具。

这个工具能通过两条指令完成一个kubernetes集群的部署：

``` 

# 创建一个 Master 节点
$ kubeadm init

# 将一个 Node 节点加入到当前集群中
$ kubeadm join <Master节点的IP和端口 >
```

## 安装要求

在开始之前，部署Kubernetes集群机器需要满足以下几个条件：

* 一台或多台机器，操作系统 CentOS7.x-86_x64
* 硬件配置：2GB或更多RAM，2个CPU或更多CPU，硬盘30GB或更多
* 可以访问外网，需要拉取镜像，如果服务器不能上网，需要提前下载镜像并导入节点
* 禁止swap分区

## 准备环境

| 角色          | IP             |
| ------------- | -------------- |
| master1       | 192.168.44.155 |
| master2       | 192.168.44.156 |
| node1         | 192.168.44.157 |
| VIP（虚拟ip） | 192.168.44.158 |

``` 

# 关闭防火墙
systemctl stop firewalld
systemctl disable firewalld

# 关闭selinux
sed -i 's/enforcing/disabled/' /etc/selinux/config  # 永久
setenforce 0  # 临时

# 关闭swap
swapoff -a  # 临时
sed -ri 's/.*swap.*/#&/' /etc/fstab    # 永久

# 根据规划设置主机名
hostnamectl set-hostname <hostname>

# 在master添加hosts
cat >> /etc/hosts << EOF
192.168.44.158    master.k8s.io   k8s-vip
192.168.44.155    master01.k8s.io master1
192.168.44.156    master02.k8s.io master2
192.168.44.157    node01.k8s.io   node1
EOF

# 将桥接的IPv4流量传递到iptables的链
cat > /etc/sysctl.d/k8s.conf << EOF
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
EOF
sysctl --system  # 生效

# 时间同步
yum install ntpdate -y
ntpdate time.windows.com
```

## 所有master节点部署keepalived

### 安装相关包和keepalived

``` 

yum install -y conntrack-tools libseccomp libtool-ltdl

yum install -y keepalived
```

### 配置master节点

master1节点配置

``` 

cat > /etc/keepalived/keepalived.conf <<EOF 
! Configuration File for keepalived

global_defs {
   router_id k8s
}

vrrp_script check_haproxy {
    script "killall -0 haproxy"
    interval 3
    weight -2
    fall 10
    rise 2
}

vrrp_instance VI_1 {
    state MASTER 
    interface ens33 
    virtual_router_id 51
    priority 250
    advert_int 1
    authentication {
        auth_type PASS
        auth_pass ceb1b3ec013d66163d6ab
    }
    virtual_ipaddress {
        192.168.44.158
    }
    track_script {
        check_haproxy
    }

}
EOF
```

master2节点配置

``` 

cat > /etc/keepalived/keepalived.conf <<EOF 
! Configuration File for keepalived

global_defs {
   router_id k8s
}

vrrp_script check_haproxy {
    script "killall -0 haproxy"
    interval 3
    weight -2
    fall 10
    rise 2
}

vrrp_instance VI_1 {
    state BACKUP 
    interface ens33 
    virtual_router_id 51
    priority 200
    advert_int 1
    authentication {
        auth_type PASS
        auth_pass ceb1b3ec013d66163d6ab
    }
    virtual_ipaddress {
        192.168.44.158
    }
    track_script {
        check_haproxy
    }

}
EOF
```

### 启动和检查

在两台master节点都执行

``` 

# 启动keepalived
$ systemctl start keepalived.service
设置开机启动
$ systemctl enable keepalived.service
# 查看启动状态
$ systemctl status keepalived.service
```

启动后查看master1的网卡信息

``` 

ip a s ens33
```

## 部署haproxy

### 安装

``` 

yum install -y haproxy
```

### 配置

两台master节点的配置均相同，配置中声明了后端代理的两个master节点服务器，指定了haproxy运行的端口为16443等，因此16443端口为集群的入口

``` 

cat > /etc/haproxy/haproxy.cfg << EOF
#---------------------------------------------------------------------
# Global settings
#---------------------------------------------------------------------
global
    # to have these messages end up in /var/log/haproxy.log you will
    # need to:
    # 1) configure syslog to accept network log events.  This is done
    #    by adding the '-r' option to the SYSLOGD_OPTIONS in
    #    /etc/sysconfig/syslog
    # 2) configure local2 events to go to the /var/log/haproxy.log
    #   file. A line like the following can be added to
    #   /etc/sysconfig/syslog
    #
    #    local2.*                       /var/log/haproxy.log
    #
    log         127.0.0.1 local2
    
    chroot      /var/lib/haproxy
    pidfile     /var/run/haproxy.pid
    maxconn     4000
    user        haproxy
    group       haproxy
    daemon 
       
    # turn on stats unix socket
    stats socket /var/lib/haproxy/stats
#---------------------------------------------------------------------
# common defaults that all the 'listen' and 'backend' sections will
# use if not designated in their block
#---------------------------------------------------------------------  
defaults
    mode                    http
    log                     global
    option                  httplog
    option                  dontlognull
    option http-server-close
    option forwardfor       except 127.0.0.0/8
    option                  redispatch
    retries                 3
    timeout http-request    10s
    timeout queue           1m
    timeout connect         10s
    timeout client          1m
    timeout server          1m
    timeout http-keep-alive 10s
    timeout check           10s
    maxconn                 3000
#---------------------------------------------------------------------
# kubernetes apiserver frontend which proxys to the backends
#--------------------------------------------------------------------- 
frontend kubernetes-apiserver
    mode                 tcp
    bind                 *:16443
    option               tcplog
    default_backend      kubernetes-apiserver    
#---------------------------------------------------------------------
# round robin balancing between the various backends
#---------------------------------------------------------------------
backend kubernetes-apiserver
    mode        tcp
    balance     roundrobin
    server      master01.k8s.io   192.168.44.155:6443 check
    server      master02.k8s.io   192.168.44.156:6443 check
#---------------------------------------------------------------------
# collection haproxy statistics message
#---------------------------------------------------------------------
listen stats
    bind                 *:1080
    stats auth           admin:awesomePassword
    stats refresh        5s
    stats realm          HAProxy\ Statistics
    stats uri            /admin?stats
EOF
```

### 启动和检查

两台master都启动

``` 

# 设置开机启动
$ systemctl enable haproxy
# 开启haproxy
$ systemctl start haproxy
# 查看启动状态
$ systemctl status haproxy
```

检查端口

``` 

netstat -lntup|grep haproxy
```

## 所有节点安装Docker/kubeadm/kubelet

Kubernetes默认CRI（容器运行时）为Docker，因此先安装Docker。

### 安装Docker

``` 

$ wget https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo -O /etc/yum.repos.d/docker-ce.repo
$ yum -y install docker-ce-18.06.1.ce-3.el7
$ systemctl enable docker && systemctl start docker
$ docker --version
Docker version 18.06.1-ce, build e68fc7a
```

``` 

$ cat > /etc/docker/daemon.json << EOF
{
  "registry-mirrors": ["https://b9pmyelo.mirror.aliyuncs.com"]
}
EOF
```

### 添加阿里云YUM软件源

``` 

$ cat > /etc/yum.repos.d/kubernetes.repo << EOF
[kubernetes]
name=Kubernetes
baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=0
repo_gpgcheck=0
gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF
```

### 安装kubeadm，kubelet和kubectl

由于版本更新频繁，这里指定版本号部署：

``` 

$ yum install -y kubelet-1.16.3 kubeadm-1.16.3 kubectl-1.16.3
$ systemctl enable kubelet
```

## 部署Kubernetes Master

### 创建kubeadm配置文件

在具有vip的master上操作，这里为master1

``` 

$ mkdir /usr/local/kubernetes/manifests -p

$ cd /usr/local/kubernetes/manifests/

$ vi kubeadm-config.yaml

apiServer:
  certSANs:

    - master1
    - master2
    - master.k8s.io
    - 192.168.44.158
    - 192.168.44.155
    - 192.168.44.156
    - 127.0.0.1

  extraArgs:
    authorization-mode: Node,RBAC
  timeoutForControlPlane: 4m0s
apiVersion: kubeadm.k8s.io/v1beta1
certificatesDir: /etc/kubernetes/pki
clusterName: kubernetes
controlPlaneEndpoint: "master.k8s.io:16443"
controllerManager: {}
dns: 
  type: CoreDNS
etcd:
  local:    
    dataDir: /var/lib/etcd
imageRepository: registry.aliyuncs.com/google_containers
kind: ClusterConfiguration
kubernetesVersion: v1.16.3
networking: 
  dnsDomain: cluster.local  
  podSubnet: 10.244.0.0/16
  serviceSubnet: 10.1.0.0/16
scheduler: {}
```

### 在master1节点执行

``` 

$ kubeadm init --config kubeadm-config.yaml
```

按照提示配置环境变量，使用kubectl工具：

``` bash
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
$ kubectl get nodes
$ kubectl get pods -n kube-system
```

**按照提示保存以下内容，一会要使用：**

``` bash
kubeadm join master.k8s.io:16443 --token jv5z7n.3y1zi95p952y9p65 \
    --discovery-token-ca-cert-hash sha256:403bca185c2f3a4791685013499e7ce58f9848e2213e27194b75a2e3293d8812 \
    --control-plane 
```

查看集群状态

``` bash
kubectl get cs

kubectl get pods -n kube-system
```

## 安装集群网络

从官方地址获取到flannel的yaml，在master1上执行

``` bash
mkdir flannel
cd flannel
wget -c https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
```

安装flannel网络

``` bash
kubectl apply -f kube-flannel.yml 
```

检查

``` bash
kubectl get pods -n kube-system
```

## master2节点加入集群

### 复制密钥及相关文件

从master1复制密钥及相关文件到master2

``` bash
# ssh root@192.168.44.156 mkdir -p /etc/kubernetes/pki/etcd

# scp /etc/kubernetes/admin.conf root@192.168.44.156:/etc/kubernetes
   
# scp /etc/kubernetes/pki/{ca.*,sa.*,front-proxy-ca.*} root@192.168.44.156:/etc/kubernetes/pki
   
# scp /etc/kubernetes/pki/etcd/ca.* root@192.168.44.156:/etc/kubernetes/pki/etcd
```

### master2加入集群

执行在master1上init后输出的join命令, 需要带上参数 `--control-plane` 表示把master控制节点加入集群

``` 

kubeadm join master.k8s.io:16443 --token ckf7bs.30576l0okocepg8b     --discovery-token-ca-cert-hash sha256:19afac8b11182f61073e254fb57b9f19ab4d798b70501036fc69ebef46094aba --control-plane
```

检查状态

``` 

kubectl get node

kubectl get pods --all-namespaces
```

## 

## 加入Kubernetes Node

在node1上执行

向集群添加新节点，执行在kubeadm init输出的kubeadm join命令：

``` 

kubeadm join master.k8s.io:16443 --token ckf7bs.30576l0okocepg8b     --discovery-token-ca-cert-hash sha256:19afac8b11182f61073e254fb57b9f19ab4d798b70501036fc69ebef46094aba
```

**集群网络重新安装，因为添加了新的node节点**

检查状态

``` 

kubectl get node

kubectl get pods --all-namespaces
```

## 

## 测试kubernetes集群

在Kubernetes集群中创建一个pod，验证是否正常运行：

``` 

$ kubectl create deployment nginx --image=nginx
$ kubectl expose deployment nginx --port=80 --type=NodePort
$ kubectl get pod,svc
```

访问地址：http://NodeIP: Port  

## 部署 Nginx 负载均衡器

* kube-apiserver 高可用架构图：
* 涉及软件：

Keepalived 是一个主流高可用软件，基于 VIP 绑定实现服务器双机热备，在上述拓扑中，Keepalived 主要根据 Nginx 运行状态判断是否需要故障转移（偏移 VIP），例如当 Nginx主节点挂掉，VIP 会自动绑定在 Nginx 备节点，从而保证 VIP 一直可用，实现 Nginx 高可用。
Nginx 是一个主流 Web 服务和反向代理服务器，这里用四层实现对 apiserver 实现负载均
衡。

### 安装软件包（主/备）

### Nginx 配置文件（主/备一样）

### keepalived 配置文件（Nginx Master）

vrrp_script：指定检查 nginx 工作状态脚本（根据 nginx 状态判断是否故障转移）
virtual_ipaddress：虚拟 IP（VIP）

### 检查 nginx 状态脚本：

### keepalived 配置文件（Nginx Backup）

上述配置文件中检查 nginx 运行状态脚本：
注：keepalived 根据脚本返回状态码（0 为工作正常，非 0 不正常）判断是否故障转移。

### 启动并设置开机启动

### 查看 keepalived 工作状态

可以看到，在 ens33 网卡绑定了 192.168.31.88 虚拟 IP，说明工作正常。

### Nginx+Keepalived 高可用测试

关闭主节点 Nginx，测试 VIP 是否漂移到备节点服务器。
在 Nginx Master 执行 pkill nginx
在 Nginx Backup，ip addr 命令查看已成功绑定 VIP。

### 访问负载均衡器测试

找 K8s 集群中任意一个节点，使用 curl 查看 K8s 版本测试，使用 VIP 访问：
可以正确获取到 K8s 版本信息，说明负载均衡器搭建正常。该请求数据流程：curl -> vip(nginx) -> apiserver
通过查看 Nginx 日志也可以看到转发 apiserver IP：

### 修改所有 Worker Node 连接 LB VIP

试想下，虽然我们增加了 Master2 和负载均衡器，但是我们是从单 Master 架构扩容的，也
就是说目前所有的 Node 组件连接都还是 Master1，如果不改为连接 VIP 走负载均衡器，那
么 Master 还是单点故障。
因此接下来就是要改所有 Node 组件配置文件中的连接 apiserver IP：
也就是通过 kubectl get node 命令查看到的节点。
在上述所有 Worker Node 执行：

``` bash
yum install epel-release -y
yum install nginx keepalived -y
cat > /etc/nginx/nginx.conf << "EOF"
user nginx; 
worker_processes auto; 
error_log /var/log/nginx/error.log; 
pid /run/nginx.pid; 
include /usr/share/nginx/modules/*.conf; 
events {
worker_connections 1024; 
}

# 四层负载均衡，为两台 Master apiserver 组件提供负载均衡

stream {
log_format main '$remote_addr $upstream_addr - [$time_local] $status
$upstream_bytes_sent'; 
access_log /var/log/nginx/k8s-access.log main; 
upstream k8s-apiserver {
server 192.168.31.71:6443; # Master1 APISERVER IP: PORT
server 192.168.31.74:6443; # Master2 APISERVER IP: PORT
}
server {
listen 6443; 
proxy_pass k8s-apiserver; 
}
}
http {
log_format main '$remote_addr - $remote_user [$time_local] "$request" '
'$status $body_bytes_sent "$http_referer" '
'"$http_user_agent" "$http_x_forwarded_for"'; 
access_log /var/log/nginx/access.log main; 
sendfile on; 
tcp_nopush on; 
tcp_nodelay on; 
keepalive_timeout 65; 
types_hash_max_size 2048; 
include /etc/nginx/mime.types; 
default_type application/octet-stream; 
server {
listen 80 default_server; 
server_name _; 
location / {
}
}
}
EOF
cat > /etc/keepalived/keepalived.conf << EOF
global_defs {
notification_email {
acassen@firewall.loc
failover@firewall.loc
sysadmin@firewall.loc
}
notification_email_from Alexandre. Cassen@firewall.loc
smtp_server 127.0.0.1
smtp_connect_timeout 30
router_id NGINX_MASTER
}
vrrp_script check_nginx {
script "/etc/keepalived/check_nginx.sh"
}
vrrp_instance VI_1 {
state MASTER
interface ens33
virtual_router_id 51 # VRRP 路由 ID 实例，每个实例是唯一的
priority 100 # 优先级，备服务器设置 90
advert_int 1 # 指定 VRRP 心跳包通告间隔时间，默认 1 秒
authentication {
auth_type PASS
auth_pass 1111
}

# 虚拟 IP

virtual_ipaddress {
192.168.31.88/24
}
track_script {
check_nginx
}
}
EOF
cat >/etc/keepalived/check_nginx.sh << "EOF"
#!/bin/bash
count=$(ps -ef |grep nginx |egrep -cv "grep|$$")
if [ "$count" -eq 0 ]; then
exit 1
else
exit 0
fi
EOF
chmod +x /etc/keepalived/check_nginx.sh
cat > /etc/keepalived/keepalived.conf << EOF
global_defs {
notification_email {
acassen@firewall.loc
failover@firewall.loc
sysadmin@firewall.loc
}
notification_email_from Alexandre. Cassen@firewall.loc
smtp_server 127.0.0.1
smtp_connect_timeout 30
router_id NGINX_BACKUP
}
vrrp_script check_nginx {
script "/etc/keepalived/check_nginx.sh"
}
vrrp_instance VI_1 {
state BACKUP
interface ens33
virtual_router_id 51 # VRRP 路由 ID 实例，每个实例是唯一的
priority 90
advert_int 1
authentication {
auth_type PASS
auth_pass 1111
}
virtual_ipaddress {
192.168.31.88/24
}
track_script {
check_nginx
}
}
EOF
cat >/etc/keepalived/check_nginx.sh << "EOF"
#!/bin/bash
count=$(ps -ef |grep nginx |egrep -cv "grep|$$")
if [ "$count" -eq 0 ]; then
exit 1
else
exit 0
fi
EOF
chmod +x /etc/keepalived/check_nginx.sh
systemctl daemon-reload
systemctl start nginx
systemctl start keepalived
systemctl enable nginx
systemctl enable keepalived
ip a
1: lo: <LOOPBACK, UP, LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group
default qlen 1000
link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
inet 127.0.0.1/8 scope host lo
valid_lft forever preferred_lft forever
inet6 ::1/128 scope host
valid_lft forever preferred_lft forever
2: ens33: <BROADCAST, MULTICAST, UP, LOWER_UP> mtu 1500 qdisc pfifo_fast state UP
group default qlen 1000
link/ether 00:0c:29:04:f7:2c brd ff:ff:ff:ff:ff:ff
inet 192.168.31.80/24 brd 192.168.31.255 scope global noprefixroute ens33
valid_lft forever preferred_lft forever
inet 192.168.31.88/24 scope global secondary ens33
valid_lft forever preferred_lft forever
inet6 fe80::20c:29ff:fe04:f72c/64 scope link
valid_lft forever preferred_lft forever
curl -k https://192.168.31.88:6443/version
{
"major": "1", 
"minor": "18", 
"gitVersion": "v1.18.3", 
"gitCommit": "2e7996e3e2712684bc73f0dec0200d64eec7fe40", 
"gitTreeState": "clean", 
"buildDate": "2020-05-20T12:43:34Z", 
"goVersion": "go1.13.9", 
"compiler": "gc", 
"platform": "linux/amd64"
}
tail /var/log/nginx/k8s-access.log -f
192.168.31.81 192.168.31.71:6443 - [30/May/2020:11:15:10 +0800] 200 422
192.168.31.81 192.168.31.74:6443 - [30/May/2020:11:15:26 +0800] 200 422
角色
IP
k8s-master1
192.168.31.71
k8s-master2
192.168.31.74
k8s-node1
192.168.31.72
k8s-node2
192.168.31.73
sed -i 's#192.168.31.71:6443#192.168.31.88:6443#' /opt/kubernetes/cfg/*
systemctl restart kubelet
systemctl restart kube-proxy
kubectl get node
```
