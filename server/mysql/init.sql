Drop database if EXISTS multimonitor;
create database multimonitor;
use multimonitor;
CREATE TABLE IF NOT EXISTS `user`(
`id` INT UNSIGNED AUTO_INCREMENT KEY ,
`username` VARCHAR(20) NOT NULL UNIQUE ,
`password` CHAR(32) NOT NULL,
`email` VARCHAR(50) NOT NULL UNIQUE ,
`sex` ENUM('man','woman','baomi') NOT NULL DEFAULT 'baomi' 
);

CREATE TABLE IF NOT EXISTS `chat`(
`id` INT UNSIGNED AUTO_INCREMENT KEY ,
`username` VARCHAR(20) NOT NULL ,
`message` VARCHAR(1024) NOT NULL ,
`time` VARCHAR(1024) NOT NULL 
);


CREATE TABLE IF NOT EXISTS `service`(
`id` INT UNSIGNED AUTO_INCREMENT KEY ,
`servicename` VARCHAR(1024),
`creator` VARCHAR(1024),
`time` VARCHAR(1024),
`introduction` VARCHAR(4096),
`likenum` INT,
`view` INT,
`shell` VARCHAR(4096)
);


CREATE TABLE IF NOT EXISTS `server`(
`id` INT UNSIGNED AUTO_INCREMENT KEY ,
`servername` VARCHAR(1024),
`ownerid` INT UNSIGNED,
`ip` VARCHAR(20),
`port`INT
);

CREATE TABLE IF NOT EXISTS `server_info`(
`id` INT UNSIGNED AUTO_INCREMENT KEY ,
`serverid` INT UNSIGNED,
`servername` VARCHAR(1024),
`ownerid` INT UNSIGNED,
`ip` VARCHAR(20),
`port`INT
);


CREATE TABLE IF NOT EXISTS `server_service`(
`id` INT UNSIGNED AUTO_INCREMENT KEY ,
`server_id`  INT UNSIGNED,
`service_id`  INT UNSIGNED
);



INSERT INTO service (servicename, creator,time,shell,view,likenum,introduction)
                       VALUES
                       ("Apache服务","admin",now(),"yum install apache2 -y",0,0,"Apache是世界使用排名第一的Web服务器软件。它可以运行在几乎所有广泛使用的计算机平台上，由于其跨平台和安全性被广泛使用，是最流行的Web服务器端软件之一。它快速、可靠并且可通过简单的API扩充，将Perl/Python等解释器编译到服务器中。");
INSERT INTO service (servicename, creator,time,shell,view,likenum,introduction)
                       VALUES
                       ("Nginx服务","admin",now(),"yum install nginx -y",0,0,"Nginx是一款轻量级的Web 服务器/反向代理服务器及电子邮件（IMAP/POP3）代理服务器，在BSD-like 协议下发行。其特点是占有内存少，并发能力强，事实上nginx的并发能力确实在同类型的网页服务器中表现较好，中国大陆使用nginx网站用户有：百度、京东、新浪、网易、腾讯、淘宝等。");
INSERT INTO service (servicename, creator,time,shell,view,likenum,introduction)
                       VALUES
                       ("Python3+pip","admin",now(),"curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py;sudo python get-pip.py",0,0,"pip 是 Python 包管理工具，该工具提供了对Python 包的查找、下载、安装、卸载的功能。" );


INSERT INTO user ( username,password,email,sex)
                       VALUES
                       ("Test account",md5("123456"),"test@test.com","man");

INSERT INTO server ( servername,ownerid,ip,port)
                       VALUES
                       ("Test server",1,"119.28.139.244","8080");
INSERT INTO server ( servername,ownerid,ip,port)
                       VALUES
                       ("localhost",1,"0.0.0.0","8000");

INSERT INTO server_service ( server_id,service_id)
                       VALUES
                       (1,1);
INSERT INTO server_service ( server_id,service_id)
                       VALUES
                       (1,2);
