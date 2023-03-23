-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema crochetmania
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `crochetmania` ;

-- -----------------------------------------------------
-- Schema crochetmania
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `crochetmania` DEFAULT CHARACTER SET utf8 ;
USE `crochetmania` ;

-- -----------------------------------------------------
-- Table `crochetmania`.`Entradas`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `crochetmania`.`Entradas` (
  `idEntrada` INT NOT NULL AUTO_INCREMENT,
  `nombre_entrada` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`idEntrada`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `crochetmania`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `crochetmania`.`usuario` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(200) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` TEXT NOT NULL,
  `fecha_alta` DATETIME NULL DEFAULT CURRENT_TIMESTAMP(),
  `reg_confirm` TINYINT(4) NOT NULL DEFAULT 0,
  `reg_token` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`idUsuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `crochetmania`.`comentarios`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `crochetmania`.`comentarios`;
CREATE TABLE IF NOT EXISTS `crochetmania`.`comentarios` (
  `idComentario` INT NOT NULL AUTO_INCREMENT,
  `idEntrada` INT NOT NULL,
  `idUsuario` INT NOT NULL,
  `nombre` VARCHAR(200) NOT NULL,
  `comentario` TEXT NOT NULL,
  `fecha_com` DATETIME NULL DEFAULT CURRENT_TIMESTAMP(),
  `respuesta` VARCHAR(250) NULL DEFAULT NULL,
  `fecha_resp` DATETIME NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  PRIMARY KEY (`idComentario`),
 
  CONSTRAINT `fk_comentarios_Entradas1`
    FOREIGN KEY (`idEntrada`)
    REFERENCES `crochetmania`.`Entradas` (`idEntrada`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_comentarios_usuario1`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `crochetmania`.`usuario` (`idUsuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `crochetmania`.`perfil`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `crochetmania`.`perfil` (
  `idUsuario` INT NOT NULL,
  `nombre_usuario` VARCHAR(200) NOT NULL,
  `apell1` VARCHAR(200) NULL DEFAULT NULL,
  `apell2` VARCHAR(200) NULL DEFAULT NULL,
  `email` VARCHAR(255) NOT NULL,
  `calle` VARCHAR(200) NULL DEFAULT NULL,
  `num_calle` INT(11) NULL DEFAULT NULL,
  `piso` VARCHAR(45) NULL DEFAULT NULL,
  `otros` VARCHAR(200) NULL DEFAULT NULL,
  `poblacion` VARCHAR(100) NULL DEFAULT NULL,
  `provincia` VARCHAR(100) NULL DEFAULT NULL,
  `CP` VARCHAR(5) NULL DEFAULT NULL,
  `DNI` VARCHAR(9) NULL DEFAULT NULL,
  `imagen` VARCHAR(100) NULL DEFAULT NULL,
  
  CONSTRAINT `fk_perfil_usuario`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `crochetmania`.`usuario` (`idUsuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `crochetmania`.`productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `crochetmania`.`productos` (
  `idProducto` INT NOT NULL AUTO_INCREMENT,
  `codigo` VARCHAR(45) NOT NULL,
  `nombre` VARCHAR(255) NOT NULL,
  `descripcion` TEXT NOT NULL,
  `categoria` VARCHAR(60) NOT NULL,
  `precio` FLOAT(5,2) NOT NULL,
  `stock` INT NOT NULL DEFAULT 0,
  `imagen_producto` VARCHAR(250) NULL,
  `h3` VARCHAR(45) NULL,
  `span1` VARCHAR(200) NULL,
  `span2` VARCHAR(200) NULL,
  `span3` VARCHAR(200) NULL,
  `span4` VARCHAR(200) NULL,
  `span5` VARCHAR(200) NULL,
  PRIMARY KEY (`idProducto`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `crochetmania`.`factura`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `crochetmania`.`factura` (
  `idFactura` INT NOT NULL AUTO_INCREMENT,
  `idUsuario` INT NOT NULL,
  `fechaFactura` DATE NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`idFactura`, `idUsuario`),
  
  CONSTRAINT `fk_factura_usuario1`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `crochetmania`.`usuario` (`idUsuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `crochetmania`.`detalle`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `crochetmania`.`detalle` (
  `numDetalle` INT NOT NULL AUTO_INCREMENT,
  `idFactura` INT NOT NULL,
  `idProducto` INT NOT NULL,
  `cantidad` INT NULL,
  `precio` INT NULL,
  PRIMARY KEY (`numDetalle`, `idFactura`, `idProducto`),
 
  CONSTRAINT `fk_usuario_has_productos_productos1`
    FOREIGN KEY (`idProducto`)
    REFERENCES `crochetmania`.`productos` (`idProducto`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_detalle_factura1`
    FOREIGN KEY (`idFactura`)
    REFERENCES `crochetmania`.`factura` (`idFactura`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `crochetmania`.`wiselist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `crochetmania`.`wiselist` (
  `idwiselist` INT NOT NULL AUTO_INCREMENT,
  `idUsuario` INT NOT NULL,
  `idProducto` INT NOT NULL,
 
  PRIMARY KEY (`idwiselist`),
 
  CONSTRAINT `fk_wiselist_usuario1`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `crochetmania`.`usuario` (`idUsuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_wiselist_productos1`
    FOREIGN KEY (`idProducto`)
    REFERENCES `crochetmania`.`productos` (`idProducto`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;



SET FOREIGN_KEY_CHECKS = 0; -- quita error 1451
SET SQL_SAFE_UPDATES = 0; -- quita error 1175
