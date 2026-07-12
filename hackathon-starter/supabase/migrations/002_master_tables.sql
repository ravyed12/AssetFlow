-- =====================================================
-- EXTENSION
-- =====================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- DEPARTMENTS
-- =====================================================

CREATE TABLE departments (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name TEXT NOT NULL UNIQUE,

    parent_department_id UUID REFERENCES departments(id)
        ON DELETE SET NULL,

    status BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()

);

-- =====================================================
-- PROFILES
-- Linked with auth.users
-- =====================================================

CREATE TABLE profiles (

    id UUID PRIMARY KEY REFERENCES auth.users(id)
        ON DELETE CASCADE,

    full_name TEXT NOT NULL,

    email TEXT NOT NULL UNIQUE,

    phone TEXT,

    department_id UUID REFERENCES departments(id)
        ON DELETE SET NULL,

    role user_role NOT NULL DEFAULT 'EMPLOYEE',

    active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()

);

-- =====================================================
-- Department Head
-- Added AFTER profiles to avoid circular FK
-- =====================================================

ALTER TABLE departments
ADD COLUMN head_id UUID REFERENCES profiles(id)
ON DELETE SET NULL;

-- =====================================================
-- ASSET CATEGORIES
-- =====================================================

CREATE TABLE asset_categories (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name TEXT NOT NULL UNIQUE,

    description TEXT,

    custom_fields JSONB DEFAULT '{}'::jsonb,

    active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()

);

-- =====================================================
-- ASSET LOCATIONS
-- =====================================================

CREATE TABLE asset_locations (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name TEXT NOT NULL,

    building TEXT,

    floor TEXT,

    room TEXT,

    active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()

);

-- =====================================================
-- ASSETS
-- =====================================================

CREATE TABLE assets (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    asset_tag TEXT NOT NULL UNIQUE,

    name TEXT NOT NULL,

    serial_number TEXT UNIQUE,

    category_id UUID NOT NULL
        REFERENCES asset_categories(id)
        ON DELETE RESTRICT,

    location_id UUID
        REFERENCES asset_locations(id)
        ON DELETE SET NULL,

    status asset_status
        NOT NULL DEFAULT 'AVAILABLE',

    condition asset_condition
        NOT NULL DEFAULT 'GOOD',

    acquisition_date DATE,

    acquisition_cost NUMERIC(12,2),

    manufacturer TEXT,

    model TEXT,

    photo_url TEXT,

    document_url TEXT,

    is_bookable BOOLEAN NOT NULL DEFAULT FALSE,

    created_by UUID
        REFERENCES profiles(id)
        ON DELETE SET NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()

);

-- =====================================================
-- INDEXES
-- =====================================================

CREATE INDEX idx_profiles_department
ON profiles(department_id);

CREATE INDEX idx_assets_status
ON assets(status);

CREATE INDEX idx_assets_category
ON assets(category_id);

CREATE INDEX idx_assets_location
ON assets(location_id);

CREATE INDEX idx_assets_bookable
ON assets(is_bookable);

CREATE INDEX idx_departments_parent
ON departments(parent_department_id);