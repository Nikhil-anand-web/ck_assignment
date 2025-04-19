-- MySQL dump 10.13  Distrib 8.0.41, for Linux (x86_64)
--
-- Host: localhost    Database: ck_asg
-- ------------------------------------------------------
-- Server version	8.0.41-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('109f1c06-2028-47e5-8102-248dbc668106','71963b22dd3460568ffea5a0f2e1f2a72fdbdc2c2a2061703b920e9b34dfa012','2025-04-17 16:08:27.456','20250417160826_initial',NULL,NULL,'2025-04-17 16:08:26.078',1),('3bac79e4-198a-4f57-98bb-2031f0bbf604','b79372e52e7b2165e7d0edd9b8944dcc32f274583d77faa511e5793252d248d3','2025-04-17 19:55:40.627','20250417195538_varient_corr',NULL,NULL,'2025-04-17 19:55:40.365',1),('428830c4-b918-4f13-8aa4-902ee9475ae2','201d9cea3b08ff462d341d85a707afc2533702d99ebf02364d1bd10f32fbde26','2025-04-18 08:08:23.909','20250418080821_st',NULL,NULL,'2025-04-18 08:08:23.718',1),('f8f5fd92-a016-4e45-8eea-208774ac2374','40ee9e3147b3fc765062e0f99b597b59fb5e38ebf39df14bcdf6424eab65aac5','2025-04-18 11:03:26.733','20250418110324_order',NULL,NULL,'2025-04-18 11:03:26.662',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `referalCoins` int NOT NULL DEFAULT '0',
  `refralDiscountAbsolute` double NOT NULL DEFAULT '0',
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cart_userId_fkey` (`userId`),
  CONSTRAINT `cart_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES ('71a83b3f-f3a2-4185-a35f-b981c98bc155','2025-04-17 17:23:44.502','2025-04-17 17:23:44.502',0,0,'a378ddfb-6aa7-4f8a-9faa-05aeb0f478f2'),('a0cbab52-f510-47f2-9f44-a63d4d6d734f','2025-04-19 07:26:33.147','2025-04-19 07:26:33.147',0,0,'a1bd2f8f-8549-4dfd-b9d8-5ab847b43e02');
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cartItem`
--

DROP TABLE IF EXISTS `cartItem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cartItem` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cartId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `varientId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `qty` int NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cartItem_cartId_fkey` (`cartId`),
  KEY `cartItem_varientId_fkey` (`varientId`),
  CONSTRAINT `cartItem_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `cart` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `cartItem_varientId_fkey` FOREIGN KEY (`varientId`) REFERENCES `varient` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cartItem`
--

LOCK TABLES `cartItem` WRITE;
/*!40000 ALTER TABLE `cartItem` DISABLE KEYS */;
INSERT INTO `cartItem` VALUES ('af38b7b3-29a4-4be2-abba-deb0e987d9c1','71a83b3f-f3a2-4185-a35f-b981c98bc155','643531c5-5d78-47dd-b55d-fd7d6f2a83d4',2,'2025-04-18 16:41:35.600','2025-04-18 16:41:44.990');
/*!40000 ALTER TABLE `cartItem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `categoryName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` int NOT NULL DEFAULT '1',
  `image` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `category_slug_key` (`slug`),
  KEY `category_userId_fkey` (`userId`),
  CONSTRAINT `category_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES ('44a3abb4-19f1-4c0a-9b5a-975828665683','Bracelets','bracelet',1,'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg','2025-04-18 19:58:39.102','2025-04-18 19:58:39.102','a378ddfb-6aa7-4f8a-9faa-05aeb0f478f2'),('66ea538b-b784-40e1-9b92-3d2fa8fc21bf','cat1','cat1',1,'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg','2025-04-17 19:20:13.887','2025-04-18 07:23:57.128','a378ddfb-6aa7-4f8a-9faa-05aeb0f478f2'),('7dc3756d-f2f8-4499-8aab-680d6597c72f','Electronics','electronics',1,'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg','2025-04-18 20:00:15.828','2025-04-18 20:00:15.828','a378ddfb-6aa7-4f8a-9faa-05aeb0f478f2'),('a3561388-bdbb-49a6-bed0-d8dffc4e152f','Storage','storage',1,'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg','2025-04-18 20:01:33.815','2025-04-18 20:01:33.815','a378ddfb-6aa7-4f8a-9faa-05aeb0f478f2'),('e3b83728-ced5-4834-bb1e-092f47762176','winter','winter',1,'https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg','2025-04-18 20:00:44.137','2025-04-18 20:00:44.137','a378ddfb-6aa7-4f8a-9faa-05aeb0f478f2');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `orderId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customerId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CustomerMeta` json DEFAULT NULL,
  `varientIds` json NOT NULL,
  `varientMeta` json NOT NULL,
  `finalPrice` double DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `paymentToken` json DEFAULT NULL,
  `paymentStatus` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `orders_orderId_key` (`orderId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES ('00f7b2ed-59b8-459e-94d7-013266268db5','174499101325072627','a378ddfb-6aa7-4f8a-9faa-05aeb0f478f2','{\"phone\": \"7979864022\", \"address\": \"jhiguyyu\", \"fullName\": \"kjnjkjkk\"}','[\"643531c5-5d78-47dd-b55d-fd7d6f2a83d4\", \"a9f8832f-f435-4aa4-b07f-f5eb81dff472\"]','[{\"qty\": 2, \"varient\": {\"id\": \"643531c5-5d78-47dd-b55d-fd7d6f2a83d4\", \"mrp\": 800.0, \"size\": \"kk\", \"slug\": \"t-3\", \"weight\": 44.0, \"product\": {\"name\": \"test3\", \"slug\": \"nuu\", \"category\": {\"categoryName\": \"cat1\"}}, \"discount\": 7.0, \"productId\": \"29e92e82-b7ed-4c5b-9b2c-809f8c6606ff\"}}, {\"qty\": 2, \"varient\": {\"id\": \"a9f8832f-f435-4aa4-b07f-f5eb81dff472\", \"mrp\": 777.0, \"size\": \"xl\", \"slug\": \"jj\", \"weight\": 4.0, \"product\": {\"name\": \"test 2\", \"slug\": \"jjj\", \"category\": {\"categoryName\": \"cat1\"}}, \"discount\": 3.0, \"productId\": \"755fbca5-4c6a-4c38-a6cb-31245b091f17\"}}]',2996,'2025-04-18 15:43:33.252','2025-04-18 15:44:00.157','{\"TXNID\": \"20250418210430000120099052282402402\", \"STATUS\": \"TXN_SUCCESS\", \"RESPMSG\": \"Txn Success\", \"CURRENCY\": \"INR\", \"BANKTXNID\": \"510873835589\", \"TXNAMOUNT\": \"1.00\"}',1),('495c1452-9323-44ac-a735-173c4125b9d1','174497576563675198','a378ddfb-6aa7-4f8a-9faa-05aeb0f478f2','{\"phone\": \"7979864022\", \"address\": \"kjfbiweuh\", \"fullName\": \"Nikhil anand\"}','[\"a9f8832f-f435-4aa4-b07f-f5eb81dff472\"]','[{\"qty\": 2, \"varient\": {\"id\": \"a9f8832f-f435-4aa4-b07f-f5eb81dff472\", \"mrp\": 777.0, \"size\": \"xl\", \"slug\": \"jj\", \"weight\": 4.0, \"product\": {\"name\": \"test 2\", \"slug\": \"jjj\", \"category\": {\"categoryName\": \"cat1\"}}, \"discount\": 3.0, \"productId\": \"755fbca5-4c6a-4c38-a6cb-31245b091f17\"}}]',1508,'2025-04-18 11:29:25.637','2025-04-18 12:31:19.697',NULL,0),('7a043534-0840-451e-80f0-9d2541144696','174499050476872514','a378ddfb-6aa7-4f8a-9faa-05aeb0f478f2',NULL,'[\"643531c5-5d78-47dd-b55d-fd7d6f2a83d4\", \"a9f8832f-f435-4aa4-b07f-f5eb81dff472\"]','[{\"qty\": 2, \"varient\": {\"id\": \"643531c5-5d78-47dd-b55d-fd7d6f2a83d4\", \"mrp\": 800.0, \"size\": \"kk\", \"slug\": \"t-3\", \"weight\": 44.0, \"product\": {\"name\": \"test3\", \"slug\": \"nuu\", \"category\": {\"categoryName\": \"cat1\"}}, \"discount\": 7.0, \"productId\": \"29e92e82-b7ed-4c5b-9b2c-809f8c6606ff\"}}, {\"qty\": 2, \"varient\": {\"id\": \"a9f8832f-f435-4aa4-b07f-f5eb81dff472\", \"mrp\": 777.0, \"size\": \"xl\", \"slug\": \"jj\", \"weight\": 4.0, \"product\": {\"name\": \"test 2\", \"slug\": \"jjj\", \"category\": {\"categoryName\": \"cat1\"}}, \"discount\": 3.0, \"productId\": \"755fbca5-4c6a-4c38-a6cb-31245b091f17\"}}]',2996,'2025-04-18 15:35:04.770','2025-04-18 15:35:04.770',NULL,0),('92d84d04-b604-4d55-94fb-12ea530b56f6','174499052600893601','a378ddfb-6aa7-4f8a-9faa-05aeb0f478f2',NULL,'[\"643531c5-5d78-47dd-b55d-fd7d6f2a83d4\", \"a9f8832f-f435-4aa4-b07f-f5eb81dff472\"]','[{\"qty\": 2, \"varient\": {\"id\": \"643531c5-5d78-47dd-b55d-fd7d6f2a83d4\", \"mrp\": 800.0, \"size\": \"kk\", \"slug\": \"t-3\", \"weight\": 44.0, \"product\": {\"name\": \"test3\", \"slug\": \"nuu\", \"category\": {\"categoryName\": \"cat1\"}}, \"discount\": 7.0, \"productId\": \"29e92e82-b7ed-4c5b-9b2c-809f8c6606ff\"}}, {\"qty\": 2, \"varient\": {\"id\": \"a9f8832f-f435-4aa4-b07f-f5eb81dff472\", \"mrp\": 777.0, \"size\": \"xl\", \"slug\": \"jj\", \"weight\": 4.0, \"product\": {\"name\": \"test 2\", \"slug\": \"jjj\", \"category\": {\"categoryName\": \"cat1\"}}, \"discount\": 3.0, \"productId\": \"755fbca5-4c6a-4c38-a6cb-31245b091f17\"}}]',2996,'2025-04-18 15:35:26.010','2025-04-18 15:35:26.010',NULL,0),('9cc57e95-9166-4ab0-97be-417d76566460','174499116723323512','a378ddfb-6aa7-4f8a-9faa-05aeb0f478f2','{\"phone\": \"7979864022\", \"address\": \"kjbhhjju\", \"fullName\": \"Nikhil anand\"}','[\"643531c5-5d78-47dd-b55d-fd7d6f2a83d4\", \"a9f8832f-f435-4aa4-b07f-f5eb81dff472\"]','[{\"qty\": 2, \"varient\": {\"id\": \"643531c5-5d78-47dd-b55d-fd7d6f2a83d4\", \"mrp\": 800.0, \"size\": \"kk\", \"slug\": \"t-3\", \"weight\": 44.0, \"product\": {\"name\": \"test3\", \"slug\": \"nuu\", \"category\": {\"categoryName\": \"cat1\"}}, \"discount\": 7.0, \"productId\": \"29e92e82-b7ed-4c5b-9b2c-809f8c6606ff\"}}, {\"qty\": 2, \"varient\": {\"id\": \"a9f8832f-f435-4aa4-b07f-f5eb81dff472\", \"mrp\": 777.0, \"size\": \"xl\", \"slug\": \"jj\", \"weight\": 4.0, \"product\": {\"name\": \"test 2\", \"slug\": \"jjj\", \"category\": {\"categoryName\": \"cat1\"}}, \"discount\": 3.0, \"productId\": \"755fbca5-4c6a-4c38-a6cb-31245b091f17\"}}]',2996,'2025-04-18 15:46:07.235','2025-04-18 15:46:35.583','{\"TXNID\": \"20250418210570000120099700339715042\", \"STATUS\": \"TXN_SUCCESS\", \"RESPMSG\": \"Txn Success\", \"CURRENCY\": \"INR\", \"BANKTXNID\": \"547426667812\", \"TXNAMOUNT\": \"1.00\"}',1),('b2c2f2eb-39ec-45a8-a32c-393e4ffe467d','174499070498468373','a378ddfb-6aa7-4f8a-9faa-05aeb0f478f2','{\"phone\": \"7979864022\", \"address\": \"kjnihuii\", \"fullName\": \"Nikhil anand\"}','[\"643531c5-5d78-47dd-b55d-fd7d6f2a83d4\", \"a9f8832f-f435-4aa4-b07f-f5eb81dff472\"]','[{\"qty\": 2, \"varient\": {\"id\": \"643531c5-5d78-47dd-b55d-fd7d6f2a83d4\", \"mrp\": 800.0, \"size\": \"kk\", \"slug\": \"t-3\", \"weight\": 44.0, \"product\": {\"name\": \"test3\", \"slug\": \"nuu\", \"category\": {\"categoryName\": \"cat1\"}}, \"discount\": 7.0, \"productId\": \"29e92e82-b7ed-4c5b-9b2c-809f8c6606ff\"}}, {\"qty\": 2, \"varient\": {\"id\": \"a9f8832f-f435-4aa4-b07f-f5eb81dff472\", \"mrp\": 777.0, \"size\": \"xl\", \"slug\": \"jj\", \"weight\": 4.0, \"product\": {\"name\": \"test 2\", \"slug\": \"jjj\", \"category\": {\"categoryName\": \"cat1\"}}, \"discount\": 3.0, \"productId\": \"755fbca5-4c6a-4c38-a6cb-31245b091f17\"}}]',2996,'2025-04-18 15:38:24.986','2025-04-18 15:38:39.596',NULL,0),('cc1a4dab-a968-43e5-8e97-11ad4b61f4c1','174499051964856594','a378ddfb-6aa7-4f8a-9faa-05aeb0f478f2',NULL,'[\"643531c5-5d78-47dd-b55d-fd7d6f2a83d4\", \"a9f8832f-f435-4aa4-b07f-f5eb81dff472\"]','[{\"qty\": 2, \"varient\": {\"id\": \"643531c5-5d78-47dd-b55d-fd7d6f2a83d4\", \"mrp\": 800.0, \"size\": \"kk\", \"slug\": \"t-3\", \"weight\": 44.0, \"product\": {\"name\": \"test3\", \"slug\": \"nuu\", \"category\": {\"categoryName\": \"cat1\"}}, \"discount\": 7.0, \"productId\": \"29e92e82-b7ed-4c5b-9b2c-809f8c6606ff\"}}, {\"qty\": 2, \"varient\": {\"id\": \"a9f8832f-f435-4aa4-b07f-f5eb81dff472\", \"mrp\": 777.0, \"size\": \"xl\", \"slug\": \"jj\", \"weight\": 4.0, \"product\": {\"name\": \"test 2\", \"slug\": \"jjj\", \"category\": {\"categoryName\": \"cat1\"}}, \"discount\": 3.0, \"productId\": \"755fbca5-4c6a-4c38-a6cb-31245b091f17\"}}]',2996,'2025-04-18 15:35:19.650','2025-04-18 15:35:19.650',NULL,0),('e5451372-c164-402a-af99-c1911f2ca1a0','174499054998386529','a378ddfb-6aa7-4f8a-9faa-05aeb0f478f2',NULL,'[\"643531c5-5d78-47dd-b55d-fd7d6f2a83d4\", \"a9f8832f-f435-4aa4-b07f-f5eb81dff472\"]','[{\"qty\": 2, \"varient\": {\"id\": \"643531c5-5d78-47dd-b55d-fd7d6f2a83d4\", \"mrp\": 800.0, \"size\": \"kk\", \"slug\": \"t-3\", \"weight\": 44.0, \"product\": {\"name\": \"test3\", \"slug\": \"nuu\", \"category\": {\"categoryName\": \"cat1\"}}, \"discount\": 7.0, \"productId\": \"29e92e82-b7ed-4c5b-9b2c-809f8c6606ff\"}}, {\"qty\": 2, \"varient\": {\"id\": \"a9f8832f-f435-4aa4-b07f-f5eb81dff472\", \"mrp\": 777.0, \"size\": \"xl\", \"slug\": \"jj\", \"weight\": 4.0, \"product\": {\"name\": \"test 2\", \"slug\": \"jjj\", \"category\": {\"categoryName\": \"cat1\"}}, \"discount\": 3.0, \"productId\": \"755fbca5-4c6a-4c38-a6cb-31245b091f17\"}}]',2996,'2025-04-18 15:35:49.984','2025-04-18 15:35:49.984',NULL,0),('ec63f907-766e-465c-8dc0-6447fe94edc8','174499051710085585','a378ddfb-6aa7-4f8a-9faa-05aeb0f478f2',NULL,'[\"643531c5-5d78-47dd-b55d-fd7d6f2a83d4\", \"a9f8832f-f435-4aa4-b07f-f5eb81dff472\"]','[{\"qty\": 2, \"varient\": {\"id\": \"643531c5-5d78-47dd-b55d-fd7d6f2a83d4\", \"mrp\": 800.0, \"size\": \"kk\", \"slug\": \"t-3\", \"weight\": 44.0, \"product\": {\"name\": \"test3\", \"slug\": \"nuu\", \"category\": {\"categoryName\": \"cat1\"}}, \"discount\": 7.0, \"productId\": \"29e92e82-b7ed-4c5b-9b2c-809f8c6606ff\"}}, {\"qty\": 2, \"varient\": {\"id\": \"a9f8832f-f435-4aa4-b07f-f5eb81dff472\", \"mrp\": 777.0, \"size\": \"xl\", \"slug\": \"jj\", \"weight\": 4.0, \"product\": {\"name\": \"test 2\", \"slug\": \"jjj\", \"category\": {\"categoryName\": \"cat1\"}}, \"discount\": 3.0, \"productId\": \"755fbca5-4c6a-4c38-a6cb-31245b091f17\"}}]',2996,'2025-04-18 15:35:17.102','2025-04-18 15:35:17.102',NULL,0),('f47dd72a-55ea-4fd2-ac2c-50d6c551646d','174499132362614708','a378ddfb-6aa7-4f8a-9faa-05aeb0f478f2','{\"phone\": \"7979864022\", \"address\": \"kvufugk\", \"fullName\": \"Nikhil anand\"}','[\"643531c5-5d78-47dd-b55d-fd7d6f2a83d4\", \"a9f8832f-f435-4aa4-b07f-f5eb81dff472\"]','[{\"qty\": 2, \"varient\": {\"id\": \"643531c5-5d78-47dd-b55d-fd7d6f2a83d4\", \"mrp\": 800.0, \"size\": \"kk\", \"slug\": \"t-3\", \"weight\": 44.0, \"product\": {\"name\": \"test3\", \"slug\": \"nuu\", \"category\": {\"categoryName\": \"cat1\"}}, \"discount\": 7.0, \"productId\": \"29e92e82-b7ed-4c5b-9b2c-809f8c6606ff\"}}, {\"qty\": 2, \"varient\": {\"id\": \"a9f8832f-f435-4aa4-b07f-f5eb81dff472\", \"mrp\": 777.0, \"size\": \"xl\", \"slug\": \"jj\", \"weight\": 4.0, \"product\": {\"name\": \"test 2\", \"slug\": \"jjj\", \"category\": {\"categoryName\": \"cat1\"}}, \"discount\": 3.0, \"productId\": \"755fbca5-4c6a-4c38-a6cb-31245b091f17\"}}]',2996,'2025-04-18 15:48:43.628','2025-04-18 15:49:11.675','{\"TXNID\": \"20250418210550000120100353652657347\", \"STATUS\": \"TXN_SUCCESS\", \"RESPMSG\": \"Txn Success\", \"CURRENCY\": \"INR\", \"BANKTXNID\": \"547401382757\", \"TXNAMOUNT\": \"1.00\"}',1);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `categoryId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `thumbNail` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `images` json DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `product_slug_key` (`slug`),
  KEY `product_categoryId_fkey` (`categoryId`),
  KEY `product_userId_fkey` (`userId`),
  CONSTRAINT `product_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `product_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES ('0a514c89-b033-4e06-9ca4-bacddd0b12c3','7dc3756d-f2f8-4499-8aab-680d6597c72f','charger','this is charger for redmi','charger','https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRYT-ZozN0yi-nMJH8vi4HhdA-ICgXgxczUIiTDDjaSiKWybFbdPLEYyc1vUcviz3U3pkv-h15cDkjAuhYPiOdruxwuFZdQNPtBy51Xa5w7gBD1SmgB02soFA',NULL,1,'2025-04-18 20:05:50.476','2025-04-18 20:05:50.476','a378ddfb-6aa7-4f8a-9faa-05aeb0f478f2'),('253b4d20-41a3-4666-a1c5-8f062820a9eb','7dc3756d-f2f8-4499-8aab-680d6597c72f','Powe bank','this is powerbank for realme','power-bank','https://unixindia.in/cdn/shop/files/UX-1531-1_5c19ead2-f1f8-4651-8e39-e9ec363bdbec.jpg?v=1741327737&width=600',NULL,1,'2025-04-18 20:04:28.660','2025-04-18 20:04:28.660','a378ddfb-6aa7-4f8a-9faa-05aeb0f478f2'),('29e92e82-b7ed-4c5b-9b2c-809f8c6606ff','66ea538b-b784-40e1-9b92-3d2fa8fc21bf','test3','jinihihni','nuu','https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',NULL,1,'2025-04-18 08:27:29.934','2025-04-18 08:27:29.934','a378ddfb-6aa7-4f8a-9faa-05aeb0f478f2'),('755fbca5-4c6a-4c38-a6cb-31245b091f17','66ea538b-b784-40e1-9b92-3d2fa8fc21bf','test 2','ibhiguvuivbu','jjj','https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',NULL,1,'2025-04-18 08:17:09.335','2025-04-18 08:17:09.335','a378ddfb-6aa7-4f8a-9faa-05aeb0f478f2'),('820395a4-4256-4e08-818f-da1a6a5b95d6','7dc3756d-f2f8-4499-8aab-680d6597c72f','Keyboard','this is keyboard for apple','keyboard','https://unixindia.in/cdn/shop/files/UX-1531-1_5c19ead2-f1f8-4651-8e39-e9ec363bdbec.jpg?v=1741327737&width=600',NULL,1,'2025-04-18 20:08:44.128','2025-04-18 20:23:58.893','a378ddfb-6aa7-4f8a-9faa-05aeb0f478f2'),('93ab0564-14aa-47d7-9830-87ea766b4114','66ea538b-b784-40e1-9b92-3d2fa8fc21bf','kjbghr','hjjhghj','jhhj','https://unixindia.in/cdn/shop/files/UX-1531-1_5c19ead2-f1f8-4651-8e39-e9ec363bdbec.jpg?v=1741327737&width=600',NULL,1,'2025-04-17 19:32:16.545','2025-04-18 20:23:58.893','a378ddfb-6aa7-4f8a-9faa-05aeb0f478f2'),('9ff4cdad-b810-45ad-a625-f181b1ca666f','7dc3756d-f2f8-4499-8aab-680d6597c72f','Earphone','this is earphone for apple','earphone','https://unixindia.in/cdn/shop/files/UX-1531-1_5c19ead2-f1f8-4651-8e39-e9ec363bdbec.jpg?v=1741327737&width=600',NULL,1,'2025-04-18 20:07:19.928','2025-04-18 20:23:58.893','a378ddfb-6aa7-4f8a-9faa-05aeb0f478f2');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `googleJti` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fullName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `picture` json DEFAULT NULL,
  `role` int NOT NULL,
  `status` int NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('a1bd2f8f-8549-4dfd-b9d8-5ab847b43e02','117419324481677991741','nikhil',NULL,'[{\"url\": \"https://lh3.googleusercontent.com/a/ACg8ocJ8s4sVw8BHcv9-j18tIuaUvZIwiOr30hxp1FaKDw_tYbL7xA=s96-c\"}]',3,1,'nikhilishere7@gmail.com','2025-04-19 07:26:33.147','2025-04-19 07:26:33.147'),('a378ddfb-6aa7-4f8a-9faa-05aeb0f478f2','107727550616127195910','Nikhil Anand',NULL,'[{\"url\": \"https://lh3.googleusercontent.com/a/ACg8ocJW9TdcKJ-9At9VYoqobsEhFNg5G7MYogZvXT-eMfgd6LmC83aJ=s96-c\"}]',1,1,'na52m2002@gmail.com','2025-04-17 17:23:44.502','2025-04-17 17:24:13.400');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `varient`
--

DROP TABLE IF EXISTS `varient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `varient` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `weight` decimal(10,2) NOT NULL,
  `size` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `qty` int NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `discount` decimal(10,2) NOT NULL DEFAULT '0.00',
  `mrp` decimal(10,2) NOT NULL,
  `isDefault` tinyint(1) NOT NULL DEFAULT '0',
  `productId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `varient_slug_key` (`slug`),
  KEY `varient_productId_fkey` (`productId`),
  CONSTRAINT `varient_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `varient`
--

LOCK TABLES `varient` WRITE;
/*!40000 ALTER TABLE `varient` DISABLE KEYS */;
INSERT INTO `varient` VALUES ('16f11048-dc5c-4e52-8163-8ed725b9c512','earphone-mobile',1.00,'pl',44,1,4.00,1000.00,0,'9ff4cdad-b810-45ad-a625-f181b1ca666f'),('46dc4567-0d87-40fa-b1a5-69e9403e2a07','power-bank-2000mah',1.00,'xl',44,1,4.00,700.00,0,'253b4d20-41a3-4666-a1c5-8f062820a9eb'),('5059e7b0-1630-4060-abd5-b46287f637a2','keyboard-mobile',1.00,'xlll',44,1,4.00,700.00,1,'820395a4-4256-4e08-818f-da1a6a5b95d6'),('52910943-6925-4c57-8b42-b09114398cbc','power-bank-1000w',1.00,'xll',44,1,4.00,700.00,1,'253b4d20-41a3-4666-a1c5-8f062820a9eb'),('643531c5-5d78-47dd-b55d-fd7d6f2a83d4','t-3',44.00,'kk',77,1,7.00,800.00,1,'29e92e82-b7ed-4c5b-9b2c-809f8c6606ff'),('6e841561-bfdd-48fe-bc12-2b705b1674ef','sluggg',44.00,'dd',44,1,0.00,44.00,1,'93ab0564-14aa-47d7-9830-87ea766b4114'),('903b6fcd-0157-41ab-91db-dfad29d2128d','charger-5v',1.00,'xl',44,1,4.00,700.00,1,'0a514c89-b033-4e06-9ca4-bacddd0b12c3'),('999518ac-a651-4164-b67c-122cbb1f6f2e','earphone-laptop',1.00,'pl',44,1,4.00,700.00,1,'9ff4cdad-b810-45ad-a625-f181b1ca666f'),('a9f8832f-f435-4aa4-b07f-f5eb81dff472','jj',4.00,'xl',44,1,3.00,777.00,1,'755fbca5-4c6a-4c38-a6cb-31245b091f17'),('aa90f447-55fd-4952-b5f1-7342e7bb3850','charger-10v',1.00,'xll',44,1,4.00,700.00,0,'0a514c89-b033-4e06-9ca4-bacddd0b12c3'),('b15b66e2-db31-4254-bcc0-e7b699e057c9','keyboard-laptop',1.00,'xlll',44,1,4.00,700.00,0,'820395a4-4256-4e08-818f-da1a6a5b95d6');
/*!40000 ALTER TABLE `varient` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-19 13:20:26
