
CREATE TABLE `user` ( 
 `id` int(11) NOT NULL auto_increment, 
 `username` varchar(30) NOT NULL COMMENT '�û���', 
 `password` varchar(32) NOT NULL COMMENT '����', 
 `login_time` int(10) default NULL COMMENT '��¼ʱ��', 
 `login_ip` varchar(32) default NULL COMMENT '��¼IP', 
 `login_counts` int(10) NOT NULL default '0' COMMENT '��¼����', 
 PRIMARY KEY (`id`) 
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 


