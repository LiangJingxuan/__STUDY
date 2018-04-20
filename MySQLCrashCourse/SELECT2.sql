-- 创建计算字段

-- 拼接字段
-- 拼接（concatenate） 将值联结到一起构成单个值。
SELECT CONCAT(`title`,'(',`class`,')') FROM food ORDER BY `id`;

-- 通过删除数据左右两边多余的空格来整理数据
SELECT CONCAT(TRIM(`title`),'=',TRIM(`class`)) FROM food ORDER BY `id`;

-- 使用别名
SELECT CONCAT(`title`,' (',`class`,') ') AS `item` FROM food ORDER BY `class` DESC;

-- 执行算术计算
-- 计算字段的另一常见用途是对检索出的数据进行算术计算
SELECT `id`,`title` FROM food WHERE `class`=22;

-- 汇总物品的价格（单价乘以订购数量）：
-- MySQL支持[+-*/]基本算术操作符,此外，圆括号可用来区分优先顺序。
SELECT `id`,`title`,`class`*`price` AS `allPrice` FROM food ORDER BY `allPrice` DESC;




-- 使用数据处理函数

-- 函数

-- 文本处理函数

-- 常用的文本处理函数
/*
	Left() 返回串左边的字符
	Length() 返回串的长度
	Locate() 找出串的一个子串
	Lower() 将串转换为小写
	LTrim() 去掉串左边的空格
	Right() 返回串右边的字符
	RTrim() 去掉串右边的空格
	Soundex() 返回串的SOUNDEX值
	SubString() 返回子串的字符
	Upper() 将串转换为大写
*/

-- 将串转换为大写
SELECT `id`,`title`,UPPER(`pic`) AS `pic_url` FROM food ORDER BY `id`;

-- 日期和时间处理函数

-- 常用日期和时间处理函数
/*
	AddDate() 增加一个日期（天、周等）
	AddTime() 增加一个时间（时、分等）
	CurDate() 返回当前日期
	CurTime() 返回当前时间
	Date() 返回日期时间的日期部分
	DateDiff() 计算两个日期之差
	Date_Add() 高度灵活的日期运算函数
	Date_Format() 返回一个格式化的日期或时间串
	Day() 返回一个日期的天数部分
	DayOfWeek() 对于一个日期，返回对应的星期几
	Hour() 返回一个时间的小时部分
	Minute() 返回一个时间的分钟部分
	Month() 返回一个日期的月份部分
	Now() 返回当前日期和时间
	Second() 返回一个时间的秒部分
	Time() 返回一个日期时间的时间部分
	Year() 返回一个日期的年份部分
*/

-- 基本的日期比较
-- SELECT `id`,`title`,`date` FROM food WHERE `date`='2018-04-20';
SELECT `id`,`title`,`date` FROM food WHERE Date(`date`)='2018-04-20';

-- 检索出2005年9月下的所有订单
SELECT `id`,`title`,`date` FROM food WHERE YEAR(`date`)=2005 AND MONTH(`date`)=9;

-- 数值处理函数

-- 常用数值处理函数
/*
	Abs() 返回一个数的绝对值
	Cos() 返回一个角度的余弦
	Exp() 返回一个数的指数值
	Mod() 返回除操作的余数
	Pi() 返回圆周率
	Rand() 返回一个随机数
	Sin() 返回一个角度的正弦
	Sqrt() 返回一个数的平方根
	Tan() 返回一个角度的正切
*/




-- 汇总数据

-- 聚集函数（aggregate function） 运行在行组上，计算和返回单个值的函数

-- SQL聚集函数
/*
	AVG() 返回某列的平均值
	COUNT() 返回某列的行数
	MAX() 返回某列的最大值
	MIN() 返回某列的最小值
	SUM() 返回某列值之和
*/

-- AVG函数 通过对表中行数计数并计算特定列值之和，求得该列的平均值 可用来返回所有列的平均值，也可以用来返回特定列或行的平均值

-- 使用AVG()返回products表中所有产品的平均价格：
SELECT AVG(`price`) AS `price_avg` FROM food;

-- 返回特定供应商所提供产品的平均价格：
SELECT AVG(`price`) AS `price_avg` FROM food WHERE `class`=23;

-- 只用于单个列 AVG()只能用来确定特定数值列的平均值，而且列名必须作为函数参数给出。为了获得多个列的平均值，必须使用多个AVG()函数。



-- COUNT()函数 确定表中行的数目或符合特定条件的行的数目。

-- 返回customers表中客户的总数(总记录数)：
SELECT COUNT(*) AS num_cust FROM cust;

-- 只对具有电子邮件地址的客户计数
SLECT COUNT(`title`) AS title_cust FROM food;




-- MAX()函数 返回指定列中的最大值。MAX()要求指定列名
SELECT MAX(`price`) AS `prics_max` FROM food; 

-- MIN()函数 返回指定列的最小值 要求指定列名
SELECT MIN(`price`) AS `price_min` FROM food;

-- SUM()函数 返回指定列值的和（总计）
SELECT SUM(`price`) AS `price_count` FROM food WHERE `class`=24;

-- 合计每项物品的item_price*quantity，得出总的订单金额
SELECT SUM(`price`*`class`) AS `price_count` FROM food WHERE `class`=24;



-- 组合聚集函数
SELECT COUNT(*) AS `num_items`, MIN(`price`) AS `price_min`, MAX(`price`) AS `pirce_max`, AVG(`price`) AS `price_avg` FROM food;






-- 分组数据 

-- 数据分组

-- 分组允许把数据分为多个逻辑组，以便能对每个组进行聚集计算。

-- 创建分组
SELECT `id`, COUNT(*) AS `food_items` FROM food GROUP BY `id`;

-- 过滤分组
SELECT `class`, COUNT(*) AS `food_class` FROM food GROUP BY `class` HAVING COUNT(*) >=2;

-- 列出具有2个（含）以上、价格为10（含）以上的产品的供应商
SELECT `class`, COUNT(*) AS `food_class` FROM food WHERE `price`>=10 GROUP BY `class` HAVING COUNT(*)>=2;

-- 分组和排序

-- 检索总计订单价格大于等于500的订单的订单号和总计订单价格
SELECT `title`,`class`,`price`,SUM(`class`*`price`) AS `food_price` FROM food GROUP BY `class` HAVING SUM(`class`*`price`)>=500;

-- SELECT子句顺序
/*
	SELECT 要返回的列或表达式 是
	FROM 从中检索数据的表 仅在从表选择数据时使用
	WHERE 行级过滤 否
	GROUP BY 分组说明 仅在按组计算聚集时使用
	HAVING 组级过滤 否
	ORDER BY 输出排序顺序 否
	LIMIT 要检索的行数 否
*/