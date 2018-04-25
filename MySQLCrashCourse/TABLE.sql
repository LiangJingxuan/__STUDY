-- 表创建基础
CREATE TABLE customers(
	cust_id	INT	NOT NULL AUTO_INCREMENT,
	cust_name CHAR (50) NOT NULL,
	cust_address CHAR (50) NULL,
	cust_city CHAR (50) NULL,
	cust_state CHAR (5) NULL,
	cust_zip CHAR (10) NULL,
	cust_country CHAR (50) NULL,
	cust_contact CHAR (50) NULL,
	cust_email CHAR (255) NULL,
	PRIMARY KEY (cust_id)
) ENGINE=InnoDB;

CREATE TABLE orders(
	order_num INT NOT NULL AUTO_INCREMENT,
	order_date DATETIME NOT NULL,
	cust_id INT NOT NULL,
	PRIMARY KEY (order_num)
) ENGINE=InnoDB;

CREATE TABLE vendors(
	vend_id INT NOT NULL AUTO_INCREMENT,
	vend_name CHAR (50) NOT NULL,
	vend_address CHAR (50) NULL,
	vend_city CHAR (50) NULL,
	vend_state CHAR (5) NULL,
	vend_zip CHAR (10) NULL,
	vend_country CHAR (50) NULL,
	PRIMARY KEY (vend_id,vend_name)
) ENGINE=InnoDB;


-- 指定默认值
-- 默认值用CREATE TABLE语句的列定义中的DEFAULT关键字指定
CREATE TABLE orderitems(
	order_num INT NOT NULL,
	order_item INT NOT NULL,
	prod_id CHAR (10) NOT NULL,
	quantity INT NOT NULL DEFAULT 1,
	item_price DECIMAL (8,2) NOT NULL,
	PRIMARY KEY (order_num,order_item)
) ENGINE=InnoDB;


-- 引擎类型
/*
	InnoDB是一个可靠的事务处理引擎，它不支持全文本搜索；
	MEMORY在功能等同于MyISAM，但由于数据存储在内存（不是磁盘）中，速度很快（特别适合于临时表）；
	MyISAM是一个性能极高的引擎，它支持全文本搜索，但不支持事务处理。
*/




-- 更新表

-- 给表添加一个列
ALTER TABLE vendors ADD vend_phone CHAR (20);

-- 给表删除一个列
ALTER TABLE vendors DROP COLUMN vend_phone;

-- ALTER TABLE的一种常见用途是定义外键

ALTER TABLE orderitems ADD CONSTRAINT fk_orderitems_orders FOREIGN KEY (order_num) REFERENCES orders (order_num);

ALTER TABLE orderitems ADD CONSTRAINT fk_orderitems_products FOREIGN KEY (prod_id) REFERENCES products (prod_id);

ALTER TABLE orders ADD CONSTRAINT fk_orderitems_customers FOREIGN KEY (cust_id) REFERENCES customers (cust_id);

ALTER TABLE products ADD CONSTRAINT fk_orderitems_vendors FOREIGN KEY (vend_id) REFERENCES vendors (vend_id);



-- 删除表
DROP TABLE customers2;



-- 重命名表
RENAME TABLE customers2 TO customers;

-- 多个表重命名
RENAME TABLE backup_customers TO customers, backup_vendors TO vendors, backup_products TO products;

