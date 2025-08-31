-- แก้ไข RLS Policies สำหรับ Anonymous users

-- สร้าง function สำหรับนับข้อมูล (bypass RLS)
CREATE OR REPLACE FUNCTION get_all_links_count()
RETURNS bigint
LANGUAGE sql SECURITY DEFINER
AS $$
  SELECT count(*) FROM links;
$$;

-- เพิ่ม Policy สำหรับ anonymous users
CREATE POLICY "Anonymous can view all links" ON links
    FOR SELECT USING (true);

CREATE POLICY "Anonymous can insert links" ON links  
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Anonymous can update links" ON links
    FOR UPDATE USING (true);

CREATE POLICY "Anonymous can delete links" ON links
    FOR DELETE USING (true);

-- อีกวิธี: ปิด RLS ชั่วคราว (สำหรับ testing)
-- ALTER TABLE links DISABLE ROW LEVEL SECURITY;
