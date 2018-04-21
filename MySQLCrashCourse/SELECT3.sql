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
