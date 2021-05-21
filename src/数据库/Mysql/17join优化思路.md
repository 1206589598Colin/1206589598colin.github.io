# join优化以及条件解析

### 0. 课程内容
<pre>
1. 课程回顾
   1.1 第五题
   1.2 5.5与5.7 版本之间子查询的区别
   1.3 join算法
   1.4 连接驱动表选择
2. join的实现原理及优化思路
3. 性客户的数量和平均月薪&不同城市的客户数量和平均月薪
4. 列出没有手机号码，或者没有照片，或者没有年奖金的客户姓名
5. 不同年龄段(0到100岁之间，每10岁为一个年龄段)的客户平均年收入&列出每个城市的年收入最高和最低的男性和女性的姓名和年收入
</pre>

### 1. join的实现原理及优化思路

MySQL中对于join的实现主要是通过Nest额的 Loop join算法处理的，其他数据库可能是使用hash join以及sort merge join。NLJ实际上就是通过驱动表的结构及作为循环基础数据，然后讲该结果集中的数据作为过滤条件一条条第到下一个表中查询数据，最后合并结构。如果还有第三个表参与join，则把前面两个表的join结果集作为循环基础数据，再一次通过循环查询条件到第三个表中查询数据，以此往下推

优化的思路：尽可能减少 Join 语句中的 Nested Loop 的循环总次数；
如何减少 Nested Loop 的循环总次数？最有效的办法只有一个，那就是让驱动表的结果集尽可能的小，这也正是在本章第二节中的优化基本原则之一“永远用小结果集驱动大的结果集”。

1. 优先优化 Nested Loop 的内层循环；
2. 保证 Join 语句中被驱动表上 Join 条件字段已经被索引；
3. 当无法保证被驱动表的 Join 条件字段被索引且内存资源充足的前提下，不要太吝惜 JoinBuffer 的设置；

两个 for 连接关系

1. 外 * 内 = 循环次数
2. 尽量让关联字段在索引上 主键(hash)
3. join buffer

for (){ 外
  for(){ 内
  }
}

### 2. 性客户的数量和平均月薪&不同城市的客户数量和平均月薪
通过explain分析一下
```sql
explain select count(*),avg(s.monthsalary) from	customers c,salary s where c.gender = 0 and c.id=s.id;
+----+-------------+-------+--------+---------------+---------+---------+--------------+--------+----------+-------------+
| id | select_type | table | type   | possible_keys | key     | key_len | ref          | rows   | filtered | Extra       |
+----+-------------+-------+--------+---------------+---------+---------+--------------+--------+----------+-------------+
|  1 | SIMPLE      | c     | ALL    | PRIMARY       | NULL    | NULL    | NULL         | 992340 |    10.00 | Using where |
|  1 | SIMPLE      | s     | eq_ref | PRIMARY       | PRIMARY | 60      | mysql12.c.id |      1 |   100.00 | NULL        |
+----+-------------+-------+--------+---------------+---------+---------+--------------+--------+----------+-------------+
2 rows in set, 1 warning (0.00 sec)

explain select count(*),avg(s.monthsalary) from  customers c,salary s where c.id=s.id group by c.city \G;
*************************** 1. row ***************************
           id: 1
  select_type: SIMPLE
        table: s
   partitions: NULL
         type: ALL
possible_keys: PRIMARY
          key: NULL
      key_len: NULL
          ref: NULL
         rows: 980276
     filtered: 100.00
        Extra: Using temporary; Using filesort
*************************** 2. row ***************************
           id: 1
  select_type: SIMPLE
        table: c
   partitions: NULL
         type: eq_ref
possible_keys: PRIMARY
          key: PRIMARY
      key_len: 60
          ref: mysql12.s.id
         rows: 1
     filtered: 100.00
        Extra: NULL
2 rows in set, 1 warning (0.00 sec)
```
通过如上的分析，第一个SQL使用的是customers作为了驱动表，而第二个则是使用的是salary作为驱动表。之所以选择主要是因为MySQL的优化器会先获取两个表的结构信息，根据表的大小优先选择小表然后再选择大表，但是在其中有条件的情况下会选择与根据条件刷选之后的数据表，相对来说数据会少一些

当然优化就比较简单分别对于salary与customers表建立对应的索引就可以(gender,city)和(monthsalary)

### 3. 列出没有手机号码，或者没有照片，或者没有年奖金的客户姓名
```sql
explain select name from customers,salary where customers.id = salary.id and (photo = 0 or mobile = 0 or yearbonus = 0);
+----+-------------+-----------+--------+---------------+---------+---------+-------------------+--------+----------+-------------+
| id | select_type | table     | type   | possible_keys | key     | key_len | ref               | rows   | filtered | Extra       |
+----+-------------+-----------+--------+---------------+---------+---------+-------------------+--------+----------+-------------+
|  1 | SIMPLE      | salary    | ALL    | PRIMARY       | NULL    | NULL    | NULL              | 473912 |   100.00 | NULL        |
|  1 | SIMPLE      | customers | eq_ref | PRIMARY       | PRIMARY | 60      | mysql12.salary.id |      1 |   100.00 | Using where |
+----+-------------+-----------+--------+---------------+---------+---------+-------------------+--------+----------+-------------+
2 rows in set, 1 warning (0.00 sec)

explain select name from customers,salary where (photo = 0 or mobile = 0 or yearbonus = 0) and customers.id = salary.id;
+----+-------------+-----------+--------+---------------+---------+---------+-------------------+--------+----------+-------------+
| id | select_type | table     | type   | possible_keys | key     | key_len | ref               | rows   | filtered | Extra       |
+----+-------------+-----------+--------+---------------+---------+---------+-------------------+--------+----------+-------------+
|  1 | SIMPLE      | salary    | ALL    | PRIMARY       | NULL    | NULL    | NULL              | 473912 |   100.00 | NULL        |
|  1 | SIMPLE      | customers | eq_ref | PRIMARY       | PRIMARY | 60      | mysql12.salary.id |      1 |   100.00 | Using where |
+----+-------------+-----------+--------+---------------+---------+---------+-------------------+--------+----------+-------------+
2 rows in set, 1 warning (0.00 sec)

注意不要这么写：
explain select name from customers,salary where customers.id = salary.id and photo = 0 or mobile = 0 or yearbonus = 0 ;
+----+-------------+-----------+------+---------------+--------+----------+----------------------------------------------------
+
| id | select_type | table     | type | possible_keys | rows   | filtered | Extra
|
+----+-------------+-----------+------+---------------+--------+----------+----------------------------------------------------
+
|  1 | SIMPLE      | salary    | ALL  | PRIMARY       | 473912 |   100.00 | NULL
|
|  1 | SIMPLE      | customers | ALL  | PRIMARY       | 490153 |   100.00 | Using where; Using join buffer (Block Nested Loop)
|
+----+-------------+-----------+------+---------------+--------+----------+----------------------------------------------------
+
2 rows in set, 1 warning (0.00 sec)
```
如上是通过explain分析之后的，在实际执行的过程

![](assets/markdown-img-paste-20190618171602303.png)


实际上第一条的执行SQL的速度会比第二条要慢，差距并不是太明显；这主要是因为与MySQL在进行执行的时候已经根据对应的条件事先过滤了一遍数据，然后再去进行关联 ；而第三条通过explain分析，发现两个表都进行了全表的扫描，并且是通过block nested loop的方式进行join的连接；而第三种很显然是效率最低的，主要是MySQL不确定相互之间的关联where的条件

现在改为之前的union all在前面提过的方法对于 一个表的优化方式：
```sql
select name from customers,salary where customers.photo = 0 and customers.id = salary.id;
union all
select name from customers,salary where customers.mobile = 0 and customers.id = salary.id
union all
select name from1 customers,salary where salary.yearbonus = 0 and customers.id = salary.id   -- 1.488s
select name from customers where id in (select id from salary where salary.yearbonus = 0);   -- 0.944s

我们会发现之前的方法不合适了主要是进行了三次对于两个表进行扫描，但是如果只是根据题目的意思的话实际上SQL可以这么写

select name from customers where mobile = 0 and  photo = 0
union all
select name from customers where id in (select id from salary where salary.yearbonus = 0);   -- 0.765s

那么这个时候我们就可以单独针对于如上的两条SQL进行优化实际上最好的优化方式是（建立的索引）

alter table customers add index idx_mobile_photo_name(mobile,photo,name);
alter table salary add index idx_yearbonus(yearbonus);
```
对于idx_mobile_photo_name的解释，在where中我们对于mobile，photo，name定义了一个关联的索引对于MySQL来说；会查找where上的(所有)字段是否包含在了某一个索引中如果说存在就会生效
```sql
explain select name from customers where mobile = "0" and  photo = "0" ;
+----+-------------+-----------+------+-----------------------+-----------------------+---------+-------------+--------+----------+--------------+
| id | select_type | table     | type | possible_keys         | key                   | key_len | ref         | rows   | filtered | Extra        |
+----+-------------+-----------+------+-----------------------+-----------------------+---------+-------------+--------+----------+--------------+
|  1 | SIMPLE      | customers | ref  | idx_mobile_photo_name | idx_mobile_photo_name | 95      | const,const | 245076 |   100.00 | Using index  |
+----+-------------+-----------+------+-----------------------+-----------------------+---------+-------------+--------+----------+--------------+
1 row in set, 1 warning (0.01 sec)

explain select name from customers where mobile = "0" and  photo = "0" or gender = 0 ;
+----+-------------+-----------+------------+------+---------------------------------------+------+---------+------+--------+----------+-------------+
| id | select_type | table     | partitions | type | possible_keys                         | key  | key_len | ref  | rows   | filtered | Extra       |
+----+-------------+-----------+------------+------+---------------------------------------+------+---------+------+--------+----------+-------------+
|  1 | SIMPLE      | customers | NULL       | ALL  | idx_gender_city,idx_mobile_photo_name | NULL | NULL    | NULL | 490153 |   100.00 | Using where |
+----+-------------+-----------+------------+------+---------------------------------------+------+---------+------+--------+----------+-------------+
1 row in set, 1 warning (0.03 sec)
```
where上的所有字段列只要有一个不存在于MySQL的其中一个联合索引就不会使用到索引

### 4. 不同年龄段(0到100岁之间，每10岁为一个年龄段)的客户平均年收入&列出每个城市的年收入最高和最低的男性和女性的姓名和年收入
```sql



```
索引在联合查询的时候驱动以及索引的建立

驱动表选择,建立索引之后优化效率最高的

背景:数据量相同的情况下
知识:正常的没有join连接小表做驱动

数据量(驱动表刷选之后的数据量) > 大表的查询率低于小表的查询, 优化考虑大表 查询效率 > 优化考虑获取是否进行函数操作(获取之后还需进行函数处理就考虑优化使用函数字段的表)

本质是全表的查询就要考虑优化大表

同等的大小:优化考虑获取列的复杂度(获取之后还需进行函数处理就考虑优化使用函数字段的表)

customers

优化的核心点:选择最需要优化
```sql
select a.id,a.gender,a.city,max(monthsalary * 12 + yearbonus) as income from customers a ,salary b where a.id = b.id group by gender,city
```

1. 表大小
2. 获取的列 -> 是否有做运算 -> 运算复杂




### 3. 问题
<pre>
1. 一般on后面都是用主键关联的吧，用主键做条件有什么问题吗？
   主要是非驱动表会使用这个主键作为索引条件查询,而作为主键通常来说并不会与其他字段再建立以主键为第一个的联合索引,因此对于非驱动表的where上的查询条件就很难使用到索引了.

   先查询驱动表数据 驱动关联的字段 去找非驱动表中的数据

2. 唯一索引页可以起主键索引的效果吗? yes - idx_col_id();

3. 用主键索引应该好过用下面yearbonus的索引好吧，这里怎么判断用哪个索引好的?
   a. mysql的优化器会进行索引的推导选择与合适的索引,通常来说是会选择合适的索引的,但是有些时候我们还是需要自己去根据自己定义的索引来强制mysql索引索引,因为mysql他也会存在失误判断的情况.
   b. 判断的方式主要是看索引上的使用率,简单来说定义的索引包含的字段在SQL中能够使用到

4. 是建议用主键做条件，还是不建议?
   这个问题没有绝对答案,但是通常来说推荐主键作为条件在单表的时候在join的时候不一定了如上1有解释;因此单表推荐使用主键作为条件,join看实际操作吧并不是特别推荐有限制

5. 使用order by 是不是总会出现隐式临时表Using temporary？order by有没有可优化的空间。(group by 也是)
    mysql是先根据where 从磁盘中获取数据(using where 和 using index) ;然后会把他们变成虚拟表再进行排序所以会有(Using temporary)
</pre>








-
