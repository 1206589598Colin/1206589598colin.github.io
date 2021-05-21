(window.webpackJsonp=window.webpackJsonp||[]).push([[173],{1302:function(s,e,t){"use strict";t.r(e);var a=t(19),n=Object(a.a)({},(function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"在linux下使用rsync的6个实例"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#在linux下使用rsync的6个实例"}},[s._v("#")]),s._v(" 在Linux下使用rsync的6个实例")]),s._v(" "),t("p",[s._v("Rsync同样是一个在类Unix和Window系统上通过网络在系统间同步文件夹和文件的网络协议。Rsync可以复制或者显示目录并复制文件。Rsync默认监听TCP 873端口，通过远程"),t("a",{attrs:{href:"https://www.linuxcool.com/",title:"shell",target:"_blank",rel:"noopener noreferrer"}},[s._v("shell"),t("OutboundLink")],1),s._v("如rsh和ssh复制文件。Rsync必须在远程和本地系统上都安装。")]),s._v(" "),t("p",[s._v("rsync的主要好处是：")]),s._v(" "),t("p",[s._v("速度：最初会在本地和远程之间拷贝所有内容。下次，只会传输发生改变的块或者字节。")]),s._v(" "),t("p",[s._v("安全：传输可以通过ssh协议加密数据。")]),s._v(" "),t("p",[s._v("低带宽：rsync可以在两端压缩和解压数据块。")]),s._v(" "),t("p",[s._v("语法:")]),s._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("#rsysnc [options] source path destination path\n")])])]),t("p",[t("strong",[s._v("示例： 1 - 启用压缩")])]),s._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("[root@localhost /]# rsync -zvr /home/aloft/ /backuphomedir\nbuilding file list ... done\nbash_logout\nbash_profile\nbashrc\nsent 472 bytes received 86 bytes 1116.00 bytes/sec\ntotal size is 324 speedup is 0.58\n")])])]),t("p",[s._v("上面的rsync"),t("a",{attrs:{href:"https://www.linuxcool.com/",title:"命令",target:"_blank",rel:"noopener noreferrer"}},[s._v("命令"),t("OutboundLink")],1),s._v("使用了-z来启用压缩，-v是可视化，-r是递归。上面在本地的/home/aloft/和/backuphomedir之间同步。")]),s._v(" "),t("p",[t("strong",[s._v("示例： 2 - 保留文件和文件夹的属性")])]),s._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("[root@localhost /]# rsync -azvr /home/aloft/ /backuphomedir\nbuilding file list ... done\n/\nbash_logout\nbash_profile\nbashrc\n\nsent 514 bytes received 92 bytes 1212.00 bytes/sec\ntotal size is 324 speedup is 0.53\n")])])]),t("p",[s._v("上面我们使用了-a选项，它保留了所有人和所属组、时间戳、软链接、权限，并以递归模式运行。")]),s._v(" "),t("p",[t("strong",[s._v("示例： 3 - 同步本地到远程主机")])]),s._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("root@localhost /]# rsync -avz /home/aloft/ azmath@192.168.1.4:192.168.1.4:/share/rsysnctest/\nPassword:\n\nbuilding file list ... done\n/\nbash_logout\nbash_profile\nbashrc\nsent 514 bytes received 92 bytes 1212.00 bytes/sec\ntotal size is 324 speedup is 0.53\n")])])]),t("p",[s._v("上面的"),t("a",{attrs:{href:"https://www.linuxcool.com/",title:"命令",target:"_blank",rel:"noopener noreferrer"}},[s._v("命令"),t("OutboundLink")],1),s._v("允许你在本地和远程机器之间同步。你可以看到，在同步文件到另一个系统时提示你输入密码。在做远程同步时，你需要指定远程系统的用户名和IP或者主机名。")]),s._v(" "),t("p",[t("strong",[s._v("示例： 4 - 远程同步到本地")])]),s._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("[root@localhost /]# rsync -avz azmath@192.168.1.4:192.168.1.4:/share/rsysnctest/ /home/aloft/\nPassword:\nbuilding file list ... done\n/\nbash_logout\nbash_profile\nbashrc\nsent 514 bytes received 92 bytes 1212.00 bytes/sec\ntotal size is 324 speedup is 0.53\n")])])]),t("p",[s._v("上面的命令同步远程文件到本地。")]),s._v(" "),t("p",[t("strong",[s._v("示例： 5 - 找出文件间的不同")])]),s._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("[root@localhost backuphomedir]# rsync -avzi /backuphomedir /home/aloft/\nbuilding file list ... done\ncd+++++++ backuphomedir/\n>f+++++++ backuphomedir/.bash_logout\n>f+++++++ backuphomedir/.bash_profile\n>f+++++++ backuphomedir/.bashrc\n>f+++++++ backuphomedir/abc\n>f+++++++ backuphomedir/xyz\n\nsent 650 bytes received 136 bytes 1572.00 bytes/sec\ntotal size is 324 speedup is 0.41\n")])])]),t("p",[t("strong",[s._v("示例: 6 - 备份")])]),s._v(" "),t("p",[s._v("rsync命令可以用来备份"),t("a",{attrs:{href:"https://www.linuxprobe.com/",title:"linux",target:"_blank",rel:"noopener noreferrer"}},[s._v("linux"),t("OutboundLink")],1),s._v("。")]),s._v(" "),t("p",[s._v("你可以在cron中使用rsync安排备份。")]),s._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("0 0 * * * /usr/local/sbin/bkpscript &> /dev/null\n")])])]),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("vi /usr/local/sbin/bkpscript\n\nrsync -avz -e 'ssh -p2093′ /home/test/ root@192.168.1.150:/oracle/data/\n")])])])])}),[],!1,null,null,null);e.default=n.exports}}]);