  -- 子查询

  -- 利用子查询进行过滤

  -- 列出订购物品TNT2的所有客户

  /*
	1) 检索包含物品TNT2的所有订单的编号。
	2) 检索具有前一步骤列出的订单编号的所有客户的ID。
	3) 检索前一步骤返回的所有客户ID的客户信息。
  */

-- 1.对于prod_id为TNT2的所有订单物品，它检索其order_num列：
SELECT `order_num` FROM ordertime WHERE `prod_id`='TNT2';

-- 2.查询具有订单20005和20007的客户ID
SELECT `cust_id` FROM orders WHERE `order_num` IN (20005,20007);

-- 3.检索这些客户ID的客户信息
SELECT `cust_name`,`cust_contact` FROM customers WHERE `cust_id` IN (10001,10004);


-- 将上面三条查询组合成一条子查询：

SELECT `cust_name`,`cust_contact` FROM customers WHERE `cust_id` IN 
	(SELECT `cust_id` FROM orders WHERE `order_num` IN 
		(SELECT `order_num` FROM ordertime WHERE `prod_id`=`TNT2`));


-- 作为计算字段使用子查询

-- 对客户10001的订单进行计数：
SELECT COUNT(*) AS `orders` FROM orders WHERE `cust_id`=10001;

-- 为了对每个客户执行COUNT(*)计算，应该将COUNT(*)作为一个子查询。
SELECT `cust_name`,`cust_state`, 
	(SELECT COUNT(*) FROM orders WHERE `orders.cust_id`=`customers.cust_id`) AS `orders` 
		FROM customers ORDER BY `cust_name`; 




-- 联结表

-- 创建联结 规定要联结的所有表以及它们如何关联
SELECT vend_name,prod_name,prod_price FROM vendors,products WHERE vendors.vend_id=products.vend_id ORDER BY vend_name,prod_name;

-- 写法2(推荐使用)
SELECT vend_name,prod_name,prod_price FROM vendors INNER JSIN products ON vendors.vend_id=products.vend_id;


-- 联结多个表
SELECT cust_name,cust_contact FROM customers,orders,ordertime 
WHERE customers.cust_id=orders.cust_id AND ordertime.order_num=orders.order_num AND prod_id='TNT2';




-- 创建高级联结

-- 使用表别名
SELECT cust_name,cust_contact FROM customers AS c,orders AS o,ordertime AS oi
WHERE c.cust_id=o.cust_id AND oi.order_num=o.order_num AND prod_id='TNT2';


-- 使用不同类型的联结

-- 自联结
SELECT p1.prod_id,p1.prod_name FROM products AS p1,products AS p2 WHERE p1.vend_id=p2.vend_id AND p2.prod_id='DTNTR';

-- 自然联结
SELECT c.*,o.order_num,o.order_date,oi.prod_id,oi.quantity,oi.item_price 
FROM customers AS c,orders AS o,ordertime AS oi WHERE c.cust_id=o.cust_id AND oi.order_num=o.order_num AND prod_id='FB';

-- 外部联结