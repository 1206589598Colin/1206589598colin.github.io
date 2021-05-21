# centos7安装mongodb和设置开机自动启动

## 1、安装mongod

```
wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-rhel70-4.2.5.tgz
tar -zxvf mongodb-linux-x86_64-rhel70-4.2.5.tgz
mv mongodb-linux-x86_64-rhel70-4.2.5/ /usr/local/mongodb

mkdir  -p  /usr/local/mongodb/data
mkdir  -p  /usr/local/mongodb/logs

ln -s /usr/local/mongodb/bin/mongod mongod
ln -s /usr/local/mongodb/bin/mongo mongo
```

## 2、设置开机自动启动

### 1、新增sh脚本

添加关联mongodb.conf文件
vim /etc/mongodb.conf

```
net:
  port: 27017
  bindIp: 0.0.0.0  # Listen to local interface only, comment to listen on all interfaces.
  ipv6: false
```

新增sh脚本放在根目录的shell下面mongod_start.sh

```
#!/bin/bash
# pkill -9 mongod;
/usr/local/mongodb/bin/mongod --shutdown --dbpath /usr/local/mongodb/data/;
nohup /usr/local/mongodb/bin/mongod  -f /etc/mongodb.conf --dbpath=/usr/local/mongodb/data --logpath=/usr/local/mongodb/logs/log.txt  > /shell/mongod.log 2>&1 &
```

设置权限777

```
chmod 777 mongod_start.sh
```

### 2、添加脚本到开机自启动

```
vim /etc/rc.d/rc.local
```

文件后面追加
sh /shell/mongod_start.sh

```
chmod +x /etc/rc.d/rc.local
```

然后就搞定了