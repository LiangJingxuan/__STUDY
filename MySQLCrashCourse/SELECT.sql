-- 使用
-- mysql -u root -p;  链接sql
-- SHOW DATABESES;  显示库
-- USE food;  使用库
-- SHOW COLUMNS FROM food; 显示表结构


-- SELECT语句

-- 检索单个列
SELECT `title` FROM food;
SELECT `pic` FROM food;

-- 检索多个列
SELECT `id`,`title`,`pic` FROM food;

-- 检索所有列
SELECT * FROM food;

-- 检索不同的行(返回不同的值)
SELECT DISTINCT `class` FROM food;

-- 限制结果
SELECT `pic` FROM food LIMIT 5;
SELECT `pic` FROM food LIMIT 5,5;

-- 使用完全限定的表名
SELECT food.title FROM food;


-- 排序检索数据

-- 排序数据
SELECT `title` FROM food ORDER BY `class`;

-- 按多个列排序
SELECT `class`,`title` FROM food ORDER BY `class`,`title`;

-- 指定排序方向
SELECT * FROM food ORDER BY `class` DESC;
SELECT * FROM food ORDER BY `class` ASC; 
SELECT * FROM food ORDER BY `class` DESC, `title`;

-- 使用ORDER BY和LIMIT的组合，能够找出一个列中最高或最低的值。
SELECT * FROM food ORDER BY `class` DESC LIMIT 1;
SELECT * FROM food ORDER BY `class` ASC LIMIT 1;


-- 过滤数据 
SELECT * FROM food WHERE `class`=20;

-- WHERE子句操作符

/*
	=		等于
	!=		不等
	<		小于
	<=		小于等于
	>		大于
	>=		大于等于
	BETWEEN	在指定的两个值之间
*/

-- 检查单个值
SELECT * FROM food WHERE `class`=43;

-- 列出价格小于10美元的所有产品
SELECT * FROM food WHERE `class`<10;

-- 检索价格小于等于10美元的所有产品
SELECT * FROM food WHERE `class`<=10;

-- 不匹配检查
-- 不是由供应商1003制造的所有产品
SELECT `vend_id`,`prod_name` FROM products WHERE `vend_id`!=1003;

-- 范围值检查
SELECT * FROM food WHERE `class` BETWEEN 20 AND 30;

-- 空值检查
SELECT * FROM food WHERE `class` IS NULL;



-- 组合WHERE子句

-- AND操作符
SELECT * FROM food WHERE `class`>10 AND `class`<20; 
-- OR操作符
SELECT * FROM food WHERE `class`<10 OR `class`=42;

-- 计算次序
SELECT * FROM food WHERE (`class`=11 OR `class`=20) AND `class`<40;

-- IN操作符
SELECT * FROM food WHERE `class` IN (11,21,32) ORDER BY `id`;

-- NOT操作符
SELECT * FROM food WHERE `class` NOT IN (11,21,32) ORDER BY `id`;



-- 用通配符进行过滤

-- LIKE操作符

-- 百分号（%）通配符
SELECT * FROM food WHERE `title` LIKE '%水果%';


-- ---------------------------------+++++++++++++++++++++++++++++++++++++++++++++63页