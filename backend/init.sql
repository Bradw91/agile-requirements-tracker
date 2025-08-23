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

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_work_items_updated_at BEFORE UPDATE ON work_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

INSERT INTO
    users (
        username,
        email,
        first_name,
        last_name
    )
VALUES (
        'john.doe',
        'john.doe@company.com',
        'John',
        'Doe'
    ),
    (
        'jane.smith',
        'jane.smith@company.com',
        'Jane',
        'Smith'
    ),
    (
        'bob.wilson',
        'bob.wilson@company.com',
        'Bob',
        'Wilson'
    ),
    (
        'alice.johnson',
        'alice.johnson@company.com',
        'Alice',
        'Johnson'
    ) ON CONFLICT (username) DO NOTHING;

-- Insert sample work items
WITH
    sample_users AS (
        SELECT id, username
        FROM users
        LIMIT 4
    )
INSERT INTO
    work_items (
        title,
        description,
        type,
        status,
        tshirt_size,
        acceptance_criteria,
        story_points,
        business_value
    )
VALUES (
        'User Authentication System',
        'Implement complete user authentication and authorization system',
        'epic',
        'in_progress',
        'L',
        NULL,
        NULL,
        NULL
    ),
    (
        'Login Feature',
        'Users should be able to login with email and password',
        'feature',
        'open',
        NULL,
        'Given a user with valid credentials, when they enter email and password, then they should be logged in successfully',
        NULL,
        NULL
    ),
    (
        'Login Form UI',
        'Create responsive login form with validation',
        'user_story',
        'open',
        NULL,
        'Given a user on the login page, when they interact with the form, then they should see appropriate validation messages',
        5,
        8
    ),
    (
        'Password Reset',
        'Users should be able to reset their password via email',
        'user_story',
        'todo',
        NULL,
        'Given a user who forgot their password, when they click "Forgot Password" and enter their email, then they should receive a password reset email',
        8,
        6
    ),
    (
        'Login button not working on mobile',
        'The login button does not respond to clicks on iOS Safari',
        'defect',
        'open',
        NULL,
        NULL,
        NULL,
        NULL,
        'Fix button click handler for mobile browsers',
        'INC-001'
    ),
    (
        'Test user registration flow',
        'Verify complete user registration process',
        'test',
        'todo',
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        'User successfully creates account and receives confirmation email',
        'Valid email, strong password',
        '1. Navigate to registration page\n2. Fill in all required fields\n3. Submit form',
        NULL
    );