-- 存储过程

/*
	为了处理订单，需要核对以保证库存中有相应的物品。
	如果库存有物品，这些物品需要预定以便不将它们再卖给别的人，	并且要减少可用的物品数量以反映正确的库存量。
	库存中没有的物品需要订购，这需要与供应商进行某种交互。
	关于哪些物品入库（并且可以立即发货）和哪些物品退订，需要	通知相应的客户。	
*/

-- 存储过程简单来说，就是为以后的使用而保存的一条或多条MySQL语句的集合。可将其视为批文件，虽然它们的作用不仅限于批处理

-- 执行存储过程

/*MySQL称存储过程的执行为调用，因此MySQL执行存储过程的语句
为CALL。CALL接受存储过程的名字以及需要传递给它的任意参数。*/
CALL productoricing(@pricelow,@pricehigh,@priceaverage);


-- 创建存储过程

-- 一个返回产品平均价格的存储过程
CREATE PROCEDURE productoricing() BEGIN SELECT AVG(prod_price) AS priceaverage FROM products; END;
