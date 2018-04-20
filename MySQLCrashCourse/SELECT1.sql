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

-- 百分号（%）通配符(匹配任意字符)
SELECT * FROM food WHERE `title` LIKE '%水果%';

-- 下划线（_）通配符(匹配一个字符)
SELECT * FROM food WHERE `title` LIKE `_水果`;

-- 使用通配符的技巧

-- 不要过度使用通配符。如果其他操作符能达到相同的目的，应该使用其他操作符。

-- 在确实需要使用通配符时，除非绝对有必要，否则不要把它们用在搜索模式的开始处。把通配符置于搜索模式的开始处，搜索起来是最慢的。

-- 仔细注意通配符的位置。如果放错地方，可能不会返回想要的数据。



-- 用正则表达式进行搜索

-- 使用MySQL正则表达式

-- 基本字符匹配

-- 检索列prod_name包含文本1000的所有行:
SELECT * FROM food WHERE `prod_name` REGEXP 1000 ORDER BY `prod_name`; 

-- .是正则表达式语言中一个特殊的字符, 它表示匹配任意一个字符
SELECT * FROM food WHERE `prod_name` REGEXP '.00' ORDER BY `prod_name`;

-- 为区分大小写，可使用BINARY关键字
SELECT * FROM food WHERE `prod_name` REGEXP BINARY 'C .';

-- 进行OR匹配
SELECT * FROM food WHERE `prod_name` REGEXP '1000|2000|3000';

-- 匹配几个字符之一
SELECT * FROM food WHERE `prod_name` REGEXP '[1000,2000,3000] Ton';

-- 匹配范围
SELECT * FROM food WHERE `prod_name` REGEXP '[100-500] Ton';

-- 匹配特殊字符
SELECT * FROM food WHERE `prod_name` REGEXP '\\.';

-- 匹配字符类

-- 匹配多个实例
SELECT * FROM food WHERE `prod_name` REGEXP '\\([0-9] sticks?\\)';

-- 匹配连在一起的4位数字
SELECT * FROM food WHERE `prod_name` REGEXP '[[:digit:]]{4}';

-- 定位符

-- 找出以一个数（包括以小数点开始的数）开始的所有产品
SELECT * FROM food WHERE `prod_name` REGEXP '^[0-9\\.]';