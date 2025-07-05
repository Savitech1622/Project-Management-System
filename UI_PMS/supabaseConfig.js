import { createClient } from '@supabase/supabase-js';
const url = 'https://nkjndkdczgibwuzvtrvj.supabase.co';
const apikey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ram5ka2RjemdpYnd1enZ0cnZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3MTE3NDUsImV4cCI6MjA2NzI4Nzc0NX0.TCI3DBqQ27-jMOkIObkDwnWHWSDtVZXgobc3TtCdddQ';
export const supabase = createClient(url, apikey);