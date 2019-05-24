
CREATE TABLE `user` ( 
 `id` int(11) NOT NULL auto_increment, 
 `username` varchar(30) NOT NULL COMMENT '用户名', 
 `password` varchar(32) NOT NULL COMMENT '密码', 
 `login_time` int(10) default NULL COMMENT '登录时间', 
 `login_ip` varchar(32) default NULL COMMENT '登录IP', 
 `login_counts` int(10) NOT NULL default '0' COMMENT '登录次数', 
 PRIMARY KEY (`id`) 
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 


