// ฟังก์ชัน initializeSupabase ที่ถูกต้อง
async initializeSupabase() {
    try {
        if (!window.supabase) {
            console.log('Supabase not loaded yet, retrying...');
            setTimeout(() => this.initializeSupabase(), 1000);
            return;
        }

        // Use FIXED user ID instead of anonymous authentication
        this.supabaseUser = { 
            id: 'shared-user-2025',  // Fixed ID for everyone
            aud: 'authenticated', 
            role: 'authenticated' 
        };
        this.useSupabase = true;
        this.isOnlineStorage = true;
        
        console.log('🗄️ Supabase using FIXED user ID:', this.supabaseUser.id);
        this.showSupabaseStatus('เชื่อมต่อสำเร็จ (Shared User Mode) 🟢', true);
        await this.loadFromSupabase();
        
    } catch (error) {
        console.error('Supabase initialization error:', error);
        this.showSupabaseStatus('การเชื่อมต่อล้มเหลว 🔴', false);
        this.useSupabase = false;
        this.isOnlineStorage = false;
        this.loadFromLocal();
    }
}
