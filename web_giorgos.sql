-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Φιλοξενητής: 127.0.0.1
-- Χρόνος δημιουργίας: 18 Μαρ 2022 στις 14:38:10
-- Έκδοση διακομιστή: 10.4.6-MariaDB
-- Έκδοση PHP: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Βάση δεδομένων: `web_giorgos`
--
CREATE DATABASE IF NOT EXISTS `web_giorgos` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `web_giorgos`;

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `admin`
--

CREATE TABLE `admin` (
  `username` varchar(50) NOT NULL,
  `password` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `covid`
--

CREATE TABLE `covid` (
  `username` varchar(50) DEFAULT NULL,
  `date1` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `points`
--

CREATE TABLE `points` (
  `id` varchar(100) NOT NULL,
  `name` varchar(300) NOT NULL,
  `address` varchar(400) NOT NULL,
  `lat` float(20,10) NOT NULL,
  `lng` float(20,10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `populartimes`
--

CREATE TABLE `populartimes` (
  `idp` varchar(100) NOT NULL,
  `day` varchar(20) NOT NULL,
  `time` int(11) NOT NULL,
  `popularity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `type`
--

CREATE TABLE `type` (
  `idp` varchar(100) NOT NULL,
  `type` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `user`
--

CREATE TABLE `user` (
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `user_visit`
--

CREATE TABLE `user_visit` (
  `username` varchar(50) NOT NULL,
  `idp` varchar(100) NOT NULL,
  `date1` datetime NOT NULL,
  `persons` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Ευρετήρια για άχρηστους πίνακες
--

--
-- Ευρετήρια για πίνακα `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`username`);

--
-- Ευρετήρια για πίνακα `covid`
--
ALTER TABLE `covid`
  ADD KEY `username` (`username`);

--
-- Ευρετήρια για πίνακα `points`
--
ALTER TABLE `points`
  ADD PRIMARY KEY (`id`);

--
-- Ευρετήρια για πίνακα `populartimes`
--
ALTER TABLE `populartimes`
  ADD KEY `idp` (`idp`);

--
-- Ευρετήρια για πίνακα `type`
--
ALTER TABLE `type`
  ADD KEY `idp` (`idp`);

--
-- Ευρετήρια για πίνακα `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`username`);

--
-- Ευρετήρια για πίνακα `user_visit`
--
ALTER TABLE `user_visit`
  ADD KEY `user_visit_ibfk_1` (`username`),
  ADD KEY `idp` (`idp`);

--
-- Περιορισμοί για άχρηστους πίνακες
--

--
-- Περιορισμοί για πίνακα `covid`
--
ALTER TABLE `covid`
  ADD CONSTRAINT `covid_ibfk_1` FOREIGN KEY (`username`) REFERENCES `user` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Περιορισμοί για πίνακα `populartimes`
--
ALTER TABLE `populartimes`
  ADD CONSTRAINT `populartimes_ibfk_1` FOREIGN KEY (`idp`) REFERENCES `points` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Περιορισμοί για πίνακα `type`
--
ALTER TABLE `type`
  ADD CONSTRAINT `type_ibfk_1` FOREIGN KEY (`idp`) REFERENCES `points` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Περιορισμοί για πίνακα `user_visit`
--
ALTER TABLE `user_visit`
  ADD CONSTRAINT `user_visit_ibfk_1` FOREIGN KEY (`username`) REFERENCES `user` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_visit_ibfk_2` FOREIGN KEY (`idp`) REFERENCES `points` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
