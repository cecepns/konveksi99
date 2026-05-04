-- Optional multiple images per order progress row (JSON array of paths, e.g. ["/uploads/file.jpg"])

USE denko_db;

ALTER TABLE order_progress
ADD COLUMN images TEXT NULL COMMENT 'JSON array of /uploads/... paths'
AFTER description;
