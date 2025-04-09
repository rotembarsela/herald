-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create plans table
CREATE TABLE IF NOT EXISTS plans (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    userId INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT fk_user FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_plans_userId ON plans(userId);


INSERT INTO users (email) VALUES ('user1@example.com'), ('user2@example.com')
ON CONFLICT (email) DO NOTHING;

INSERT INTO plans (title, description, userId)
VALUES
  ('Plan A', 'Description for Plan A', 1),
  ('Plan B', 'Description for Plan B', 2)
ON CONFLICT DO NOTHING;
