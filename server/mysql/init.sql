use multimonitor;
CREATE TABLE IF NOT EXISTS `user`(
`id` INT UNSIGNED AUTO_INCREMENT KEY ,
`username` VARCHAR(20) NOT NULL UNIQUE ,
`password` CHAR(32) NOT NULL,
`email` VARCHAR(50) NOT NULL UNIQUE ,
`sex` ENUM('man','woman','baomi') NOT NULL DEFAULT 'baomi' 
);

INSERT INTO user ( id, username,password,email,sex)
                       VALUES
                       ( 1,"Test account",md5("123456"),"test@test.com","man");