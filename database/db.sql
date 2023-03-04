DROP DATABASE IF EXISTS `login`;

CREATE DATABASE `login`;

CREATE TABLE `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

CREATE TABLE `state` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  uf CHAR(2) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE `city` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  state_id INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (state_id) REFERENCES state(id)
);

CREATE TABLE `address` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `street` VARCHAR(100) NOT NULL,
  `number` VARCHAR(10) NOT NULL,
  `complement` VARCHAR(100) NULL,
  `neighborhood` VARCHAR(100) NOT NULL,
  `zip_code` VARCHAR(10) NOT NULL,
  city_id INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (city_id) REFERENCES city(id)
);

CREATE TABLE `user_address` (
  `user_id` INT NOT NULL,
  `address_id` INT NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `user`(`id`),
  FOREIGN KEY (`address_id`) REFERENCES `address`(`id`)
);

INSERT INTO
  `state` (`name`, `uf`)
VALUES
  ('Acre', 'AC'),
  ('Alagoas', 'AL'),
  ('Amapá', 'AP'),
  ('Amazonas', 'AM'),
  ('Bahia', 'BA'),
  ('Ceará', 'CE'),
  ('Distrito Federal', 'DF'),
  ('Espírito Santo', 'ES'),
  ('Goiás', 'GO'),
  ('Maranhão', 'MA'),
  ('Mato Grosso', 'MT'),
  ('Mato Grosso do Sul', 'MS'),
  ('Minas Gerais', 'MG'),
  ('Pará', 'PA'),
  ('Paraíba', 'PB'),
  ('Paraná', 'PR'),
  ('Pernambuco', 'PE'),
  ('Piauí', 'PI'),
  ('Rio de Janeiro', 'RJ'),
  ('Rio Grande do Norte', 'RN'),
  ('Rio Grande do Sul', 'RS'),
  ('Rondônia', 'RO'),
  ('Roraima', 'RR'),
  ('Santa Catarina', 'SC'),
  ('São Paulo', 'SP'),
  ('Sergipe', 'SE'),
  ('Tocantins', 'TO');