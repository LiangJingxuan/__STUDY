-- 管理事务处理

/*
	事务处理是一种
	机制，用来管理必须成批执行的MySQL操作，以保证数据库不包含不完
	整的操作结果。利用事务处理，可以保证一组操作不会中途停止，它们
	或者作为整体执行，或者完全不执行（除非明确指示）。如果没有错误发
	生，整组语句提交给（写到）数据库表。如果发生错误，则进行回退（撤
	销）以恢复数据库到某个已知且安全的状态。
*/

-- MySQL使用下面的语句来标识事务的开始：
START TRANSACTION;

-- 使用ROLLBACK
SELECT * FROM orderstotals;
START TRANSACTION;
DELETE FROM orderstotals;
SELECT * FROM orderstotals;
ROLLBACK;
SELECT * FROM orderstotals;

-- 使用COMMIT