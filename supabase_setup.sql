-- SQL Commands สำหรับเพิ่ม columns ใน table links

-- เพิ่ม columns ที่จำเป็น
ALTER TABLE links ADD COLUMN IF NOT EXISTS user_id text NOT NULL DEFAULT '';
ALTER TABLE links ADD COLUMN IF NOT EXISTS url text NOT NULL DEFAULT '';
ALTER TABLE links ADD COLUMN IF NOT EXISTS title text NOT NULL DEFAULT '';
ALTER TABLE links ADD COLUMN IF NOT EXISTS favicon text;
ALTER TABLE links ADD COLUMN IF NOT EXISTS order_index int4 DEFAULT 0;
ALTER TABLE links ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT now();
ALTER TABLE links ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

-- สร้าง index สำหรับประสิทธิภาพ
CREATE INDEX IF NOT EXISTS links_user_id_idx ON links(user_id);
CREATE INDEX IF NOT EXISTS links_order_idx ON links(user_id, order_index);

-- Enable Row Level Security
ALTER TABLE links ENABLE ROW LEVEL SECURITY;

-- สร้าง RLS Policies
DROP POLICY IF EXISTS "Users can view own links" ON links;
DROP POLICY IF EXISTS "Users can insert own links" ON links;
DROP POLICY IF EXISTS "Users can update own links" ON links;
DROP POLICY IF EXISTS "Users can delete own links" ON links;

CREATE POLICY "Users can view own links" ON links
    FOR SELECT USING (user_id = auth.uid()::text);

CREATE POLICY "Users can insert own links" ON links
    FOR INSERT WITH CHECK (user_id = auth.uid()::text);

CREATE POLICY "Users can update own links" ON links
    FOR UPDATE USING (user_id = auth.uid()::text);

CREATE POLICY "Users can delete own links" ON links
    FOR DELETE USING (user_id = auth.uid()::text);
