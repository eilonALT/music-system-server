CREATE DATABASE IF NOT EXISTS `music-system`;
-- DROP DATABASE IF EXISTS `Music-System`;

SET GLOBAL log_bin_trust_function_creators = 1;
SET SQL_SAFE_UPDATES = 0;

USE `music-system`;

CREATE TABLE IF NOT EXISTS `accounts`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `is_active` BOOLEAN NOT NULL,
    PRIMARY KEY (`id`)
);
CREATE INDEX `idx_accounts_is_active` ON `accounts` (`is_active`);

CREATE TABLE IF NOT EXISTS `collections`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `number_of_songs` INT NOT NULL DEFAULT 0,
    `account_id` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`)
);

CREATE TABLE IF NOT EXISTS `songs`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `rate` INT NOT NULL,
    `duration` INT NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `song_collection`(
    `song_id` INT NOT NULL,
    `collection_id` INT NOT NULL,
    PRIMARY KEY (`song_id`, `collection_id`),
    FOREIGN KEY (`song_id`) REFERENCES `songs`(`id`),
    FOREIGN KEY (`collection_id`) REFERENCES `collections`(`id`)
);

-- i would have done it in server bl but i am not implementing post requests nor delete requests
-- function to  update the number of songs in a collection
DELIMITER //
CREATE PROCEDURE `update_number_of_songs` (idNum INT)
BEGIN
	DECLARE numberOfSongs INT ;
	SET numberOfSongs = (SELECT COUNT(*) FROM song_collection WHERE collection_id = idNum);
	UPDATE collections SET number_of_songs = numberOfSongs WHERE id = idNum;
END//
DELIMITER ;

-- trigger to update number_of_songs after insert or delete
CREATE TRIGGER `increment_number_of_songs` AFTER INSERT ON `song_collection`
FOR EACH ROW
    CALL update_number_of_songs(NEW.collection_id);

CREATE TRIGGER `decrement_number_of_songs` AFTER DELETE ON `song_collection`
FOR EACH ROW
    CALL update_number_of_songs(OLD.collection_id);


INSERT INTO `accounts`(`first_name`, `last_name`, `is_active`) VALUES ('John', 'Doe', TRUE);
INSERT INTO `accounts`(`first_name`, `last_name`, `is_active`) VALUES ('Jane', 'Doe', TRUE);
INSERT INTO `accounts`(`first_name`, `last_name`, `is_active`) VALUES ('John', 'Smith', FALSE);

INSERT INTO `collections`(`title`, `account_id`) VALUES ('My Collection', 1);
INSERT INTO `collections`(`title`, `account_id`) VALUES ('My Collection2', 2);
INSERT INTO `collections`(`title`, `account_id`) VALUES ('My Collection3', 3);

INSERT INTO `songs`(`name`, `rate`, `duration`) VALUES ('Song1', 5, 300);
INSERT INTO `songs`(`name`, `rate`, `duration`) VALUES ('Song2', 5, 300);
INSERT INTO `songs`(`name`, `rate`, `duration`) VALUES ('Song3', 5, 300);
INSERT INTO `songs`(`name`, `rate`, `duration`) VALUES ('Song4', 5, 300);
INSERT INTO `songs`(`name`, `rate`, `duration`) VALUES ('Song5', 5, 300);
INSERT INTO `songs`(`name`, `rate`, `duration`) VALUES ('Song6', 5, 300);


INSERT INTO `song_collection`(`song_id`, `collection_id`) VALUES (1, 1);
INSERT INTO `song_collection`(`song_id`, `collection_id`) VALUES (2, 1);
INSERT INTO `song_collection`(`song_id`, `collection_id`) VALUES (3, 1);
INSERT INTO `song_collection`(`song_id`, `collection_id`) VALUES (4, 1);
INSERT INTO `song_collection`(`song_id`, `collection_id`) VALUES (5, 1);
INSERT INTO `song_collection`(`song_id`, `collection_id`) VALUES (6, 1);
INSERT INTO `song_collection`(`song_id`, `collection_id`) VALUES (1, 2);
INSERT INTO `song_collection`(`song_id`, `collection_id`) VALUES (2, 2);
INSERT INTO `song_collection`(`song_id`, `collection_id`) VALUES (3, 2);
INSERT INTO `song_collection`(`song_id`, `collection_id`) VALUES (4, 2);
INSERT INTO `song_collection`(`song_id`, `collection_id`) VALUES (5, 2);
INSERT INTO `song_collection`(`song_id`, `collection_id`) VALUES (6, 2);



-- Get collections by accountsId.
SELECT * FROM `collections` WHERE `account_id` = 1;

--  Get all empty collections
SELECT * FROM `collections` WHERE `number_of_songs` = 0;

-- Get all active users.
SELECT * FROM `accounts` WHERE `is_active` = 1;

--  Get songs by CollectionId
SELECT * FROM `songs` JOIN `song_collection` ON `songs`.`id` = `song_collection`.`song_id` WHERE `song_collection`.`collection_id` = 1;

--   Get collections by SongId
SELECT * FROM `collections` JOIN `song_collection` ON `collections`.`id` = `song_collection`.`collection_id` WHERE `song_collection`.`song_id` = 1;

--  Get all songs by UserId (use Collection).
SELECT `songs`.`name`,`songs`.`duration`,`songs`.`rate` FROM `songs` JOIN `song_collection` ON `songs`.`id` = `song_collection`.`song_id` JOIN `collections` ON `song_collection`.`collection_id` = `collections`.`id` WHERE `collections`.`account_id` = 1;
-- Get all songs and for each one - display collection Tittle.
SELECT `songs`.`name`, `collections`.`title` FROM `songs` JOIN `song_collection` ON `songs`.`id` = `song_collection`.`song_id` JOIN `collections` ON `song_collection`.`collection_id` = `collections`.`id`;