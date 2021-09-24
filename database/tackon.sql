-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema tackon
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema tackon
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `tackon` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `tackon` ;

-- -----------------------------------------------------
-- Table `tackon`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tackon`.`user` (
  `id` VARCHAR(36) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `email` VARCHAR(320) NOT NULL,
  `password` CHAR(60) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tackon`.`question`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tackon`.`question` (
  `id` VARCHAR(36) NOT NULL,
  `user_id` VARCHAR(36) NOT NULL,
  `title` VARCHAR(100) NOT NULL,
  `text` TEXT NOT NULL,
  `upvote` INT NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL,
  `solving_comment_id` VARCHAR(36) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_question_user1_idx` (`user_id` ASC) INVISIBLE,
  FULLTEXT INDEX `question_fulltext` (`title`, `text`) VISIBLE,
  CONSTRAINT `fk_question_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `tackon`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tackon`.`comment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tackon`.`comment` (
  `id` VARCHAR(36) NOT NULL,
  `user_id` VARCHAR(36) NOT NULL,
  `question_id` VARCHAR(36) NOT NULL,
  `text` TEXT NOT NULL,
  `created_at` DATETIME NOT NULL,
  PRIMARY KEY (`user_id`, `question_id`, `id`),
  INDEX `fk_user_has_question_question1_idx` (`question_id` ASC) VISIBLE,
  INDEX `fk_user_has_question_user_idx` (`user_id` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  CONSTRAINT `fk_user_has_question_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `tackon`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_question_question1`
    FOREIGN KEY (`question_id`)
    REFERENCES `tackon`.`question` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
