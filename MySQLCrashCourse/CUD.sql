-- 插入完整的行
INSERT INTO customers(cust_name,cust_city,cust,state) VALUES ('pep','Street','CA');

-- 插入多个行
INSERT INTO customers(cust_name,cust_city,cust,state) VALUES ('pep','Street','CA'),('yii','Canada','QA');

-- 插入检索出的数据
INSERT INTO customers(cust_id,cust_name,cust_city,cust,state) SELECT (cust_id,cust_name,cust_city,cust,state) FROM custnew;




-- 更新数据

-- 客户10005现在有了电子邮件地址，因此他的记录需要更新，语句如下：
UPDATE customers SET cust_email='elmer@fudd.com' WHERE cust_id=10005;

-- 更新多个数据
UPDATE customers SET cust_name='ppe',cust_email='elmer@fudd.com' WHERE cust_id=10005;

-- 为了删除某个列的值，可设置它为NULL（假如表定义允许NULL值）。
UPDATE customers SET cust_email=NULL WHERE cust_id=10005;





-- 删除数据
DELETE FROM customers WHERE cust_id=10005;

-- 更快的删除所有数据
TRUNCATE customers;