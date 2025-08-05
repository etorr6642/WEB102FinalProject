import {createClient} from '@supabase/supabase-js'

const URL = 'https://mcztyyjvmncskgkkflhu.supabase.co'
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jenR5eWp2bW5jc2tna2tmbGh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzMTA5NjIsImV4cCI6MjA2ODg4Njk2Mn0.guBPRL7j6-TBrTjDuMZ-yPaoa3GqWbG93y-IJrZp6ow'

export const supabase = createClient(URL, API_KEY)