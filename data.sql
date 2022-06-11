CREATE DATABASE IF NOT EXISTS `Music-System`;
-- DROP DATABASE IF EXISTS `Music-System`;

SET GLOBAL log_bin_trust_function_creators = 1;
SET SQL_SAFE_UPDATES = 0;

USE `Music-System`;

CREATE TABLE IF NOT EXISTS `Accounts`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `is_active` BOOLEAN NOT NULL,
    PRIMARY KEY (`id`)
);
CREATE INDEX `idx_Accounts_is_active` ON `Accounts` (`is_active`);

CREATE TABLE IF NOT EXISTS `Collections`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `number_of_songs` INT NOT NULL DEFAULT 0,
    `account_id` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`account_id`) REFERENCES `Accounts`(`id`)
);

CREATE TABLE IF NOT EXISTS `Songs`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `rate` INT NOT NULL,
    `duration` INT NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `Song_Collection`(
    `song_id` INT NOT NULL,
    `collection_id` INT NOT NULL,
    PRIMARY KEY (`song_id`, `collection_id`),
    FOREIGN KEY (`song_id`) REFERENCES `Songs`(`id`),
    FOREIGN KEY (`collection_id`) REFERENCES `Collections`(`id`)
);


-- function to  update the number of songs in a collection
DELIMITER //
CREATE PROCEDURE `update_number_of_songs` (id INT)
BEGIN
	DECLARE number_of_songs INT ;
	SET number_of_songs = (SELECT COUNT(*) FROM Song_Collection WHERE collection_id = id);
	UPDATE Collections SET number_of_songs = number_of_songs;
END//
DELIMITER ;

-- trigger to update number_of_songs after insert or delete
CREATE TRIGGER `increment_number_of_songs` AFTER INSERT ON `Song_Collection`
FOR EACH ROW
    CALL update_number_of_songs(NEW.collection_id);

CREATE TRIGGER `decrement_number_of_songs` AFTER DELETE ON `Song_Collection`
FOR EACH ROW
    CALL update_number_of_songs(OLD.collection_id);


INSERT INTO `Accounts`(`first_name`, `last_name`, `is_active`) VALUES ('John', 'Doe', TRUE);
INSERT INTO `Accounts`(`first_name`, `last_name`, `is_active`) VALUES ('Jane', 'Doe', TRUE);
INSERT INTO `Accounts`(`first_name`, `last_name`, `is_active`) VALUES ('John', 'Smith', FALSE);

INSERT INTO `Collections`(`title`, `account_id`) VALUES ('My Collection', 1);
INSERT INTO `Collections`(`title`, `account_id`) VALUES ('My Collection2', 2);
INSERT INTO `Collections`(`title`, `account_id`) VALUES ('My Collection3', 3);

INSERT INTO `Songs`(`name`, `rate`, `duration`) VALUES ('Song1', 5, 300);
INSERT INTO `Songs`(`name`, `rate`, `duration`) VALUES ('Song2', 5, 300);
INSERT INTO `Songs`(`name`, `rate`, `duration`) VALUES ('Song3', 5, 300);
INSERT INTO `Songs`(`name`, `rate`, `duration`) VALUES ('Song4', 5, 300);
INSERT INTO `Songs`(`name`, `rate`, `duration`) VALUES ('Song5', 5, 300);
INSERT INTO `Songs`(`name`, `rate`, `duration`) VALUES ('Song6', 5, 300);


INSERT INTO `Song_Collection`(`song_id`, `collection_id`) VALUES (1, 1);
INSERT INTO `Song_Collection`(`song_id`, `collection_id`) VALUES (2, 1);
INSERT INTO `Song_Collection`(`song_id`, `collection_id`) VALUES (3, 1);
INSERT INTO `Song_Collection`(`song_id`, `collection_id`) VALUES (4, 1);
INSERT INTO `Song_Collection`(`song_id`, `collection_id`) VALUES (5, 1);
INSERT INTO `Song_Collection`(`song_id`, `collection_id`) VALUES (6, 1);
INSERT INTO `Song_Collection`(`song_id`, `collection_id`) VALUES (1, 2);
INSERT INTO `Song_Collection`(`song_id`, `collection_id`) VALUES (2, 2);
INSERT INTO `Song_Collection`(`song_id`, `collection_id`) VALUES (3, 2);
INSERT INTO `Song_Collection`(`song_id`, `collection_id`) VALUES (4, 2);
INSERT INTO `Song_Collection`(`song_id`, `collection_id`) VALUES (5, 2);
INSERT INTO `Song_Collection`(`song_id`, `collection_id`) VALUES (6, 2);



-- Get collections by AccountsId.
SELECT * FROM `Collections` WHERE `account_id` = 1;

--  Get all empty collections
SELECT * FROM `Collections` WHERE `number_of_songs` = 0;

-- Get all active users.
SELECT * FROM `Accounts` WHERE `is_active` = 1;

--  Get songs by CollectionId
SELECT * FROM `Songs` JOIN `Song_Collection` ON `Songs`.`id` = `Song_Collection`.`song_id` WHERE `Song_Collection`.`collection_id` = 1;

--   Get collections by SongId
SELECT * FROM `Collections` JOIN `Song_Collection` ON `Collections`.`id` = `Song_Collection`.`collection_id` WHERE `Song_Collection`.`song_id` = 1;

--  Get all songs by UserId (use Collection).
SELECT `Songs`.`name`,`Songs`.`duration`,`Songs`.`rate` FROM `Songs` JOIN `Song_Collection` ON `songs`.`id` = `Song_Collection`.`song_id` JOIN `Collections` ON `Song_Collection`.`collection_id` = `Collections`.`id` WHERE `Collections`.`account_id` = 1;
-- Get all songs and for each one - display collection Tittle.
SELECT `Songs`.`name`, `Collections`.`title` FROM `Songs` JOIN `Song_Collection` ON `Songs`.`id` = `Song_Collection`.`song_id` JOIN `Collections` ON `Song_Collection`.`collection_id` = `Collections`.`id`;