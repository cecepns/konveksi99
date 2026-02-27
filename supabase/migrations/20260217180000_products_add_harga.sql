-- Add harga field to products table
-- Created: 2026-02-17

USE denko_db;

ALTER TABLE products
ADD COLUMN harga BIGINT UNSIGNED NULL AFTER subcategory_id;

