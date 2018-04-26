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

-- 调用存储过程
CALL productoricing();

-- 删除存储过程
DROP PROCEDURE productoricing;

--  使用参数
CREATE PROCEDURE productoricing(
	OUT pl DECIMAL (8,2),
	OUT ph DECIMAL (8,2),
	OUT pa DECIMAL (8,2)
)
BEGIN
	SELECT MIN(prod_price) INTO pl FROM products;
	SELECT MAX(prod_price) INTO ph FROM products;
	SELECT AVG(prod_price) INTO pa FROM products;
END;

-- 调用 
-- 参数存到三个变量中，所有MySQL变量都必须以@开始。
CALL productoricing(@pricelow,@pricehigh,@priceaverage);
SELECT @pricelow,@pricehigh,@priceaverage;

-- ordertotal接受订单号并返回该订单的合计
CREATE PROCEDURE ordertotal(
	IN onnumber INT,
	OUT ototal DECIMAL(8,2)
)
BEGIN
	SELECT Sum(item_price*quantity) FROM orderitems WHERE order_num=onumber INTO ototal;
END;

-- 调用
CALL ordertotal(20005,@total);
-- 为了显示此合计，可如下进行
SELECT @total;

-- 为了得到另一个订单的合计显示，需要再次调用存储过程，然后重新显示变量：
CALL ordertotal(20009,@total);
SELECT @total;


-- 建立智能存储过程

/*
	考虑这个场景。你需要获得与以前一样的订单合计，但需要对合计
	增加营业税，不过只针对某些顾客（或许是你所在州中那些顾客）。那么，
	你需要做下面几件事情：
	 获得合计（与以前一样）；
	 把营业税有条件地添加到合计；
	 返回合计（带或不带税）。
	存储过程的完整工作如下：
*/

-- Name: ordertotal
-- Parameters: onumber=order number
-- 			   taxable=0 if not taxable, 1 if taxable
-- 			   ototal=order total variable

CREATE PROCEDURE ordertotal(
	IN onumber INT,
	IN taxable BOOLEAN,
	OUT ototal DECIMAL(8,2)
) COMMENT 'Obtain order total, optionally adding tax'
BEGIN
	-- Declare variable for total
	DECLARE total DECIMAL(8,2);
	-- Declare tax percentage
	DECLARE taxrate INT DEFAULT 6;
	-- Get the order total
	SELECT Sum(item_price*quantity)
	FROM orderitems
	WHERE order_num=onumber
	INTO total;

	-- Is this taxable?
	IF taxable THEN
		-- Yes, so add taxrate to the total
		SELECT total+(total/100*taxable) INTO total;
	END IF;

	-- And finall, save to out variable
	SELECT total INTO ototal;
END;

-- 使用
CALL ordertotal(20005,0,@total);
SELECT @total;

CALL ordertotal(20005,1,@total);
SELECT @total;


-- 检查存储过程

-- 为显示用来创建一个存储过程的CREATE语句，使用SHOW CREATE PROCEDURE语句：
SHOW CREATE PROCEDURE ordertotal;





-- 游标

/*
	游标 （ cursor） 是一个存储在MySQL服务器上的数据库查询，
	它不是一条SELECT语句，而是被该语句检索出来的结果集。在存储了游
	标之后，应用程序可以根据需要滚动或浏览其中的数据。
	游标主要用于交互式应用，其中用户需要滚动屏幕上的数据，并对
	数据进行浏览或做出更改。只能用于存储过程
*/

/*
	在能够使用游标前，必须声明（定义）它。这个过程实际上没有检索数据，它只是定义要使用的SELECT语句。
 一旦声明后，必须打开游标以供使用。这个过程用前面定义的SELECT语句把数据实际检索出来。
 对于填有数据的游标，根据需要取出（检索）各行。
 在结束游标使用时，必须关闭游标。
*/


-- 创建游标
CREATE PROCEDURE processorders()
BEGIN
	DECLARE ordernumbers CURSOR
	FOR
	SELECT order_num FROM orders;
END;

-- 打开和关闭游标
OPEN ordernumbers;
CLOSE ordernumbers;


-- 例
CREATE PROCEDURE processorders()
BEGIN
	DECLARE ordernumbers CURSOR
	FOR
	SELECT order_num FROM orders;

	OPEN ordernumbers;

	CLOSE ordernumbers;
END;


-- 使用游标数据

/*
	在一个游标被打开后，可以使用FETCH语句分别访问它的每一行。
	FETCH指定检索什么数据（所需的列），检索出来的数据存储在什么地方。
	它还向前移动游标中的内部行指针，使下一条FETCH语句检索下一行（不
	重复读取同一行）
*/




-- 触发器

-- 需要在某个表发生更改时自动处理。这确切地说就是触发器。

-- 创建触发器
CREATE TRIGGER newproduct AFTER INSERT ON products FOR EACH ROW SELECT 'Product added';

-- 删除触发器
DROP TRIGGER newproduct;

-- INSERT触发器
CREATE TRIGGER mewprde AFTE INSERT ON orders FPR EACH ROW SELECT NEW.order_num;

-- DELETE触发器
CREATE TRIGGER deleteorder BEFORE DELETE ON orders FOR EACH ROW BEGIN
	INSERT INTO archive_orders(order_num,order_date,cust_id) VALUES(OLD.order_num,OLD.order_date,OLD.cust_id);
END;	

-- UPDATE触发器
CREATE TRIGGER updatevendor BEFOR UPDATE ON vendors FOR EACH ROW SER NEW.vend_state=UPPER(NEW.vend_state);
