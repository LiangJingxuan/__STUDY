-- 视图

-- 视图是虚拟的表。与包含数据的表不一样，视图只包含使用时动态检索数据的查询。

-- 使用视图

/*
	视图用CREATE VIEW语句来创建。
	使用SHOW CREATE VIEW viewname；来查看创建视图的语句。
	用DROP删除视图，其语法为DROP VIEW viewname;。
	更新视图时，可以先用DROP再用CREATE，也可以直接用CREATE OR 	REPLACE VIEW。如果要更新的视图不存在，则第2条更新语句会创
	建一个视图；如果要更新的视图存在，则第2条更新语句会替换原有视图。
*/

-- 利用视图简化复杂的联结
CREATE VIEW prodictcustomers AS SELECT cust_name,cust_contact,prod_id 
FROM customers,orders,orderitems WHERE customers.cust_id=orders.cust_id 
AND orderitems.order_num=orders.order_num;
-- 使用视图
SELECT * FROM prodictcustomers WHERE prod_id='TNT2';


-- 例
CREATE VIEW vendorlocations AS SELECT 
CONCAT(RTRIM(vend_name),' ( ',RTRIM(vend_country),' ) ')
AS vend_title
FROM vendors ORDER BY vend_name;
-- 使用视图
SELECT * FROM vendorlocations;


-- 用视图过滤不想要的数据

-- 过滤没有电子邮件地址的客户
CREATE VIEW custmeremaillist AS SELECT cust_id,cust_name,cust_email
FROM customers WHERE cust_email IS NOT NULL;
-- 使用视图
SELECT * FROM custmeremaillist;


-- 使用视图与计算字段

-- 检索某个特定订单中的物品，计算每种物品的总价格
CREATE VIEW orderitemsexpanded AS SELECT order_num,prod_id,quantity,item_price,
quantity*item_price AS expanded_price
FROM orderitems;
-- 使用视图
SELECT * FROM orderitemsexpanded WHERE order_num=20005;


-- 更新视图
-- 将视图用于检索 一般，应该将视图用于检索（SELECT语句）而不用于更新（INSERT、UPDATE和DELETE）。
