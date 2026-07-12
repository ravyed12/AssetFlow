-- ===========================
-- USER ROLES
-- ===========================
CREATE TYPE user_role AS ENUM (
    'ADMIN',
    'ASSET_MANAGER',
    'DEPARTMENT_HEAD',
    'EMPLOYEE'
);

-- ===========================
-- ASSET STATUS
-- ===========================
CREATE TYPE asset_status AS ENUM (
    'AVAILABLE',
    'ALLOCATED',
    'RESERVED',
    'UNDER_MAINTENANCE',
    'LOST',
    'RETIRED',
    'DISPOSED'
);

-- ===========================
-- ASSET CONDITION
-- ===========================
CREATE TYPE asset_condition AS ENUM (
    'EXCELLENT',
    'GOOD',
    'FAIR',
    'DAMAGED'
);

-- ===========================
-- ALLOCATION STATUS
-- ===========================
CREATE TYPE allocation_status AS ENUM (
    'ACTIVE',
    'RETURN_REQUESTED',
    'RETURNED',
    'OVERDUE'
);

-- ===========================
-- TRANSFER STATUS
-- ===========================
CREATE TYPE transfer_status AS ENUM (
    'REQUESTED',
    'APPROVED',
    'REJECTED',
    'COMPLETED'
);

-- ===========================
-- BOOKING STATUS
-- ===========================
CREATE TYPE booking_status AS ENUM (
    'UPCOMING',
    'ONGOING',
    'COMPLETED',
    'CANCELLED'
);

-- ===========================
-- MAINTENANCE STATUS
-- ===========================
CREATE TYPE maintenance_status AS ENUM (
    'PENDING',
    'APPROVED',
    'REJECTED',
    'TECHNICIAN_ASSIGNED',
    'IN_PROGRESS',
    'RESOLVED'
);

-- ===========================
-- AUDIT STATUS
-- ===========================
CREATE TYPE audit_status AS ENUM (
    'OPEN',
    'IN_PROGRESS',
    'CLOSED'
);

-- ===========================
-- AUDIT RESULT
-- ===========================
CREATE TYPE audit_result AS ENUM (
    'VERIFIED',
    'MISSING',
    'DAMAGED'
);