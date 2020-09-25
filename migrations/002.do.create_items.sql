CREATE TABLE IF NOT EXISTS items (
  id INT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  vendor TEXT NOT NULL,
  items TEXT NOT NULL,
  full_price TEXT NOT NULL,
  alt_id uuid NOT NULL DEFAULT uuid_generate_v4(),
  alt_id2 uuid NOT NULL DEFAULT uuid_generate_v4(),
  owner_id INT REFERENCES users(id) ON DELETE CASCADE
);