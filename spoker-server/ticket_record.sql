/*
SQLyog Ultimate v12.08 (64 bit)
MySQL - 5.7.24-log 
*********************************************************************
*/
/*!40101 SET NAMES utf8 */;

CREATE TABLE `ticket_record` (
	`id` int (11),
	`ticket_num` text ,
	`story_point` double ,
	`users` text ,
	`description` text ,
	`date` date
);

insert into `ticket_record` (`id`, `ticket_num`, `story_point`, `users`, `description`, `date`) values('1','DOM-123','3','jianyang,jason,xianchen,da-long,yangliu','DOM-123:description','2018-12-22');

CREATE TABLE `user` (
	`id` int (11) NOT NULL AUTO_INCREMENT ,
	`user_name` text ,
	`password` text ,
	`email` text,
	 PRIMARY KEY(id)
);
insert into `user` (`id`, `user_name`, `password`, `email`) values('1','jianyang','$2a$10$5wJcLP1Bx3.iJ/Jyrtc/nOcbIMOiDeZiP3sF.Pe.lG68CFuHBfiYS','naijgnay@163.com');
