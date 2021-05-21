# 添加账号密码

```
use admin
db.createUser({user:"root",pwd:"",roles:["root"]})

use test
db.createUser({user:'root',pwd:'root',roles:['readWrite']})
```