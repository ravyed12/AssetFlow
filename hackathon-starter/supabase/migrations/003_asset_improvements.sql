-- ==========================================
-- Asset Improvements
-- ==========================================

-- QR Code for asset identification
ALTER TABLE assets
ADD COLUMN qr_code TEXT UNIQUE;

-- Warranty expiry date
ALTER TABLE assets
ADD COLUMN warranty_expiry DATE;