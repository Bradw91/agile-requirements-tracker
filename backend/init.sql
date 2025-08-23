CREATE TYPE work_item_type AS ENUM ('epic', 'feature', 'user_story', 'defect', 'test');

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS work_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(500) NOT NULL,
    description TEXT,
    type work_item_type NOT NULL,
    parent_id UUID REFERENCES work_items(id) ON DELETE SET NULL,
    status VARCHAR(50) DEFAULT 'open',

-- Epic fields
tshirt_size VARCHAR(10), -- XS, S, M, L, XL, XXL

-- Feature + UserStory fields
acceptance_criteria TEXT,

-- UserStory specific fields
story_points INTEGER CHECK (
    story_points >= 0
    AND story_points <= 100
),
business_value INTEGER CHECK (
    business_value >= 0
    AND business_value <= 100
),

-- Defect specific fields
resolution TEXT, incident_number VARCHAR(100),

-- Test specific fields


expected_result TEXT,
    input_data TEXT,
    setup_steps TEXT,
    actual_result TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS work_item_owners (
    work_item_id UUID REFERENCES work_items (id) ON DELETE CASCADE,
    user_id UUID REFERENCES users (id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (work_item_id, user_id)
);

CREATE TABLE IF NOT EXISTS attachments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    work_item_id UUID REFERENCES work_items (id) ON DELETE CASCADE,
    filename VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size BIGINT,
    mime_type VARCHAR(100),
    uploaded_by UUID REFERENCES users (id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_work_items_type ON work_items(type);

CREATE INDEX IF NOT EXISTS idx_work_items_parent_id ON work_items (parent_id);

CREATE INDEX IF NOT EXISTS idx_work_items_status ON work_items (status);

CREATE INDEX IF NOT EXISTS idx_work_items_created_at ON work_items (created_at);

CREATE INDEX IF NOT EXISTS idx_work_item_owners_work_item_id ON work_item_owners (work_item_id);

CREATE INDEX IF NOT EXISTS idx_work_item_owners_user_id ON work_item_owners (user_id);

CREATE INDEX IF NOT EXISTS idx_attachments_work_item_id ON attachments (work_item_id);