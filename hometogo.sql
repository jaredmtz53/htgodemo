-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Tempo de geração: 07/05/2025 às 20:32
-- Versão do servidor: 8.0.39
-- Versão do PHP: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `hometogo`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `booking`
--

CREATE TABLE `booking` (
  `id` bigint NOT NULL,
  `booked` bit(1) NOT NULL,
  `end_date` date DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `property_id` bigint DEFAULT NULL,
  `tenant_id` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `booking`
--

INSERT INTO `booking` (`id`, `booked`, `end_date`, `start_date`, `property_id`, `tenant_id`) VALUES
(1, b'1', '2025-05-22', '2025-05-16', 1, 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `booking_seq`
--

CREATE TABLE `booking_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `booking_seq`
--

INSERT INTO `booking_seq` (`next_val`) VALUES
(51);

-- --------------------------------------------------------

--
-- Estrutura para tabela `host`
--

CREATE TABLE `host` (
  `id` bigint NOT NULL,
  `host_bio` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_id` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `host`
--

INSERT INTO `host` (`id`, `host_bio`, `user_id`) VALUES
(1, 'hey hey hey', 2),
(2, 'hey hey hey', 4),
(3, NULL, 6),
(4, 'hey hey hey hey hey ', 9),
(79, 'Hola Hola Hola', 13);

-- --------------------------------------------------------

--
-- Estrutura para tabela `host_seq`
--

CREATE TABLE `host_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `host_seq`
--

INSERT INTO `host_seq` (`next_val`) VALUES
(101);

-- --------------------------------------------------------

--
-- Estrutura para tabela `image`
--

CREATE TABLE `image` (
  `id` bigint NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `property_id` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `property`
--

CREATE TABLE `property` (
  `id` bigint NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `price` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `host_id` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `property`
--

INSERT INTO `property` (`id`, `address`, `description`, `image`, `price`, `title`, `host_id`) VALUES
(1, '123 Street rd Greensboro,NC 23453', 'hey hey ', 'pic', '12', 'House1', 1),
(23, '238767867 Road', 'Stinks', 'pic', '213', 'Stinky House', 79),
(33, '32423 Casas rd ', 'Hey hey hey hey hey hey', 'pic ', '1232', 'Casa', 2),
(67, '32 Smell Nice rd', 'Smells very nice', 'pic', '1', 'Nice Smelling House', 3),
(90, '3847823 house rd ', 'Casa Casa', 'pic', '23121', 'House', 4),
(3333, '3843 house rd', 'house of house', 'pic', '2312', 'house that is a house', 3);

-- --------------------------------------------------------

--
-- Estrutura para tabela `property_seq`
--

CREATE TABLE `property_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `property_seq`
--

INSERT INTO `property_seq` (`next_val`) VALUES
(1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `report`
--

CREATE TABLE `report` (
  `id` bigint NOT NULL,
  `message` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `reported_id` bigint DEFAULT NULL,
  `reporter_id` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `review`
--

CREATE TABLE `review` (
  `id` bigint NOT NULL,
  `content` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `rating` int NOT NULL,
  `host_id` bigint DEFAULT NULL,
  `property_id` bigint DEFAULT NULL,
  `reviewer_id` bigint DEFAULT NULL,
  `tenant_id` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `review`
--

INSERT INTO `review` (`id`, `content`, `rating`, `host_id`, `property_id`, `reviewer_id`, `tenant_id`) VALUES
(1, 'stinkuy', 1, NULL, 1, 2, 2);

-- --------------------------------------------------------

--
-- Estrutura para tabela `tenant`
--

CREATE TABLE `tenant` (
  `id` bigint NOT NULL,
  `tenant_bio` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_id` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tenant`
--

INSERT INTO `tenant` (`id`, `tenant_bio`, `user_id`) VALUES
(1, 'hey hey hey ', 2),
(2, 'hey hey hey ', 4),
(3, 'hey heuy hey ', 3),
(4, 'hey hey hey hey hey hey hey hey hey hey hey hey hey hey hey hey hey hey hey hey', 5),
(12, NULL, 10),
(45, 'Ola Ola Ola Ola', 12),
(87, 'Ola Ola Ola', 14),
(144, NULL, 11);

-- --------------------------------------------------------

--
-- Estrutura para tabela `user`
--

CREATE TABLE `user` (
  `id` bigint NOT NULL,
  `banned` bit(1) NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `google_sub` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `role` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `user`
--

INSERT INTO `user` (`id`, `banned`, `email`, `first_name`, `google_sub`, `last_name`, `role`, `username`) VALUES
(2, b'1', 'eduardo@gmail.com', 'Eduardo', NULL, 'Herrera', 'Host', 'EduHe'),
(3, b'1', 'lalo@gmail.com', 'lalo', NULL, 'barraza', 'tenant', 'LalBar'),
(4, b'1', 'João@gkay.com', 'João', NULL, 'Pedro', 'Tenant\r\n', 'JoaPed'),
(5, b'1', 'gil@email.com', 'Gil', NULL, 'smith', 'host', 'gilsmi'),
(6, b'1', 'email@email.com', 'John', NULL, 'Doe', 'Tenant', 'Johhny'),
(7, b'1', 'email@email.com', 'Jane', NULL, 'Doe', 'Host', 'Janey'),
(8, b'1', 'email@email.com', 'Lola', NULL, 'La Vaca', 'Host', 'LolaLoal'),
(9, b'1', 'email@email.com', 'Juan Jose', NULL, 'Rios', 'Host', 'RiosCasa'),
(10, b'1', 'email@email.com', 'Mario', NULL, 'Brgoli', 'Host', 'MarioSuper'),
(11, b'1', 'email@email.com', 'Pedro', NULL, 'Martinez', 'Host', 'PedroHost'),
(12, b'1', 'email@email.com', 'Juan', NULL, 'Lopez', 'Host', 'Lopez70'),
(13, b'1', 'email@email.com', 'Jose', NULL, 'Hernandez', 'Tenant ', 'HerJoe'),
(14, b'1', 'email@email.com', 'Issac', NULL, 'Eliyahu', 'Host', 'EliyahuIss'),
(15, b'0', 'eduardoherrerabarra@gmail.com', 'Eduardo', '104745641545485636929', 'Herrera-Barraza', 'TENANT', 'eduardoherrerabarra@gmail.com');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKbcgr7a3utjxb9n6ltvw0w6xqs` (`property_id`),
  ADD KEY `FK49glqy4ukug93t4n7pfspbeqe` (`tenant_id`);

--
-- Índices de tabela `host`
--
ALTER TABLE `host`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKhub4idr063m8d6cxn9mmqpxx6` (`user_id`);

--
-- Índices de tabela `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK6oqm8c6mg2dgedoppcbu8sm5q` (`property_id`);

--
-- Índices de tabela `property`
--
ALTER TABLE `property`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK1gryswim1skwpca1qa4enuqim` (`host_id`);

--
-- Índices de tabela `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKkqwu7egf4fup0xog0ot2s065c` (`reported_id`),
  ADD KEY `FKndpjl61ubcm2tkf7ml1ynq13t` (`reporter_id`);

--
-- Índices de tabela `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKpp86nhaq9pjsatcgdep7dq5n3` (`host_id`),
  ADD KEY `FK4r8tpgi3hq2ldtvry1gh0vgo` (`property_id`),
  ADD KEY `FKt58e9mdgxpl7j90ketlaosmx4` (`reviewer_id`),
  ADD KEY `FKmslajir00sqsmbyv2kw0neln8` (`tenant_id`);

--
-- Índices de tabela `tenant`
--
ALTER TABLE `tenant`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKimjhq4hbs88b71ne778ht8wvy` (`user_id`);

--
-- Índices de tabela `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `image`
--
ALTER TABLE `image`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `report`
--
ALTER TABLE `report`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de tabela `review`
--
ALTER TABLE `review`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `tenant`
--
ALTER TABLE `tenant`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=145;

--
-- AUTO_INCREMENT de tabela `user`
--
ALTER TABLE `user`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `FK49glqy4ukug93t4n7pfspbeqe` FOREIGN KEY (`tenant_id`) REFERENCES `tenant` (`id`),
  ADD CONSTRAINT `FKbcgr7a3utjxb9n6ltvw0w6xqs` FOREIGN KEY (`property_id`) REFERENCES `property` (`id`);

--
-- Restrições para tabelas `host`
--
ALTER TABLE `host`
  ADD CONSTRAINT `FK9hlhx55t325whiraf8newuxcv` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Restrições para tabelas `image`
--
ALTER TABLE `image`
  ADD CONSTRAINT `FK6oqm8c6mg2dgedoppcbu8sm5q` FOREIGN KEY (`property_id`) REFERENCES `property` (`id`);

--
-- Restrições para tabelas `property`
--
ALTER TABLE `property`
  ADD CONSTRAINT `FK1gryswim1skwpca1qa4enuqim` FOREIGN KEY (`host_id`) REFERENCES `host` (`id`);

--
-- Restrições para tabelas `report`
--
ALTER TABLE `report`
  ADD CONSTRAINT `FKkqwu7egf4fup0xog0ot2s065c` FOREIGN KEY (`reported_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FKndpjl61ubcm2tkf7ml1ynq13t` FOREIGN KEY (`reporter_id`) REFERENCES `user` (`id`);

--
-- Restrições para tabelas `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `FK4r8tpgi3hq2ldtvry1gh0vgo` FOREIGN KEY (`property_id`) REFERENCES `property` (`id`),
  ADD CONSTRAINT `FKmslajir00sqsmbyv2kw0neln8` FOREIGN KEY (`tenant_id`) REFERENCES `tenant` (`id`),
  ADD CONSTRAINT `FKpp86nhaq9pjsatcgdep7dq5n3` FOREIGN KEY (`host_id`) REFERENCES `host` (`id`),
  ADD CONSTRAINT `FKt58e9mdgxpl7j90ketlaosmx4` FOREIGN KEY (`reviewer_id`) REFERENCES `user` (`id`);

--
-- Restrições para tabelas `tenant`
--
ALTER TABLE `tenant`
  ADD CONSTRAINT `FKmoj8m61gtmcdo59nh0574w7q1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
