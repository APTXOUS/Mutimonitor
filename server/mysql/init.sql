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
`shell` VARCHAR(4096)
);


CREATE TABLE IF NOT EXISTS `server`(
`id` INT UNSIGNED AUTO_INCREMENT KEY ,
`servername` VARCHAR(1024),
`owneid` INT UNSIGNED,
`ip` VARCHAR(20),
`port`INT
);

CREATE TABLE IF NOT EXISTS `server_info`(
`id` INT UNSIGNED AUTO_INCREMENT KEY ,
`serverid` INT UNSIGNED,
`servername` VARCHAR(1024),
`owneid` INT UNSIGNED,
`ip` VARCHAR(20),
`port`INT
);


CREATE TABLE IF NOT EXISTS `server_service`(
`id` INT UNSIGNED AUTO_INCREMENT KEY ,
`server_id`  INT UNSIGNED,
`service_id`  INT UNSIGNED
);



INSERT INTO service (servicename, creator,time,shell)
                       VALUES
                       ("Apache服务","admin",now(),"yum install apache2 -y");
INSERT INTO service (servicename, creator,time,shell)
                       VALUES
                       ("Nginx服务","admin",now(),"yum install nginx -y");
INSERT INTO service (servicename, creator,time,shell)
                       VALUES
                       ("Python3+pip","admin",now(),"curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py;sudo python get-pip.py" );


INSERT INTO user ( username,password,email,sex)
                       VALUES
                       ( 1,"Test account",md5("123456"),"test@test.com","man");
