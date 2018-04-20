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