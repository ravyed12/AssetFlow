-- =====================================================
-- ASSET ALLOCATIONS
-- =====================================================

CREATE TABLE asset_allocations (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    asset_id UUID NOT NULL
        REFERENCES assets(id)
        ON DELETE RESTRICT,

    employee_id UUID NOT NULL
        REFERENCES profiles(id)
        ON DELETE RESTRICT,

    department_id UUID
        REFERENCES departments(id)
        ON DELETE SET NULL,

    allocated_by UUID
        REFERENCES profiles(id)
        ON DELETE SET NULL,

    allocated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    expected_return_date DATE,

    returned_at TIMESTAMPTZ,

    return_notes TEXT,

    status allocation_status NOT NULL DEFAULT 'ACTIVE',

    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_alloc_asset
ON asset_allocations(asset_id);

CREATE INDEX idx_alloc_employee
ON asset_allocations(employee_id);

CREATE INDEX idx_alloc_status
ON asset_allocations(status);

-- =====================================================
-- TRANSFER REQUESTS
-- =====================================================

CREATE TABLE asset_transfer_requests (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    allocation_id UUID NOT NULL
        REFERENCES asset_allocations(id)
        ON DELETE CASCADE,

    requested_by UUID
        REFERENCES profiles(id),

    target_employee UUID
        REFERENCES profiles(id),

    reason TEXT,

    status transfer_status
        NOT NULL DEFAULT 'REQUESTED',

    approved_by UUID
        REFERENCES profiles(id),

    approved_at TIMESTAMPTZ,

    completed_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_transfer_status
ON asset_transfer_requests(status);

-- =====================================================
-- RESOURCE BOOKINGS
-- =====================================================

CREATE TABLE resource_bookings (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    asset_id UUID NOT NULL
        REFERENCES assets(id)
        ON DELETE CASCADE,

    employee_id UUID NOT NULL
        REFERENCES profiles(id)
        ON DELETE CASCADE,

    department_id UUID
        REFERENCES departments(id),

    start_time TIMESTAMPTZ NOT NULL,

    end_time TIMESTAMPTZ NOT NULL,

    purpose TEXT,

    status booking_status
        NOT NULL DEFAULT 'UPCOMING',

    created_at TIMESTAMPTZ DEFAULT now(),

    updated_at TIMESTAMPTZ DEFAULT now(),

    CHECK (end_time > start_time)
);

CREATE INDEX idx_booking_asset
ON resource_bookings(asset_id);

CREATE INDEX idx_booking_time
ON resource_bookings(start_time, end_time);

-- =====================================================
-- MAINTENANCE REQUESTS
-- =====================================================

CREATE TABLE maintenance_requests (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    asset_id UUID NOT NULL
        REFERENCES assets(id),

    raised_by UUID
        REFERENCES profiles(id),

    priority TEXT NOT NULL,

    description TEXT NOT NULL,

    photo_url TEXT,

    status maintenance_status
        DEFAULT 'PENDING',

    approved_by UUID
        REFERENCES profiles(id),

    assigned_to UUID
        REFERENCES profiles(id),

    resolved_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ DEFAULT now(),

    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_maintenance_asset
ON maintenance_requests(asset_id);

CREATE INDEX idx_maintenance_status
ON maintenance_requests(status);

-- =====================================================
-- AUDIT CYCLES
-- =====================================================

CREATE TABLE audit_cycles (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name TEXT NOT NULL,

    department_id UUID
        REFERENCES departments(id),

    location_id UUID
        REFERENCES asset_locations(id),

    start_date DATE NOT NULL,

    end_date DATE NOT NULL,

    status audit_status
        DEFAULT 'OPEN',

    created_by UUID
        REFERENCES profiles(id),

    created_at TIMESTAMPTZ DEFAULT now()
);

-- =====================================================
-- AUDIT ITEMS
-- =====================================================

CREATE TABLE audit_items (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    audit_cycle_id UUID NOT NULL
        REFERENCES audit_cycles(id)
        ON DELETE CASCADE,

    asset_id UUID NOT NULL
        REFERENCES assets(id),

    auditor_id UUID
        REFERENCES profiles(id),

    result audit_result,

    remarks TEXT,

    verified_at TIMESTAMPTZ
);

CREATE INDEX idx_audit_cycle
ON audit_items(audit_cycle_id);

-- =====================================================
-- NOTIFICATIONS
-- =====================================================

CREATE TABLE notifications (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL
        REFERENCES profiles(id)
        ON DELETE CASCADE,

    title TEXT NOT NULL,

    message TEXT NOT NULL,

    type TEXT,

    is_read BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_notifications_user
ON notifications(user_id);

-- =====================================================
-- ACTIVITY LOGS
-- =====================================================

CREATE TABLE activity_logs (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    actor_id UUID
        REFERENCES profiles(id),

    entity_type TEXT NOT NULL,

    entity_id UUID NOT NULL,

    action TEXT NOT NULL,

    metadata JSONB DEFAULT '{}'::jsonb,

    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_logs_entity
ON activity_logs(entity_type, entity_id);

