// بعد إنشاء مشروع Supabase، ضعي الرابط والمفتاح هنا.
const SUPABASE_URL = "ضعِي_رابط_المشروع_هنا";
const SUPABASE_ANON_KEY = "ضعِي_مفتاح_anon_هنا";
const wall=document.getElementById('wall'), form=document.getElementById('form'), status=document.getElementById('status');
const configured=SUPABASE_URL.startsWith('http')&&!SUPABASE_ANON_KEY.startsWith('ضعِي_');
let db=null;
function esc(s){return s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}
async function load(){if(!configured){wall.innerHTML='<div class="empty">الموقع جاهز، وباقي فقط ربط قاعدة البيانات حتى تكون الرسائل مشتركة للجميع 🌷</div>';return}const {data,error}=await db.from('messages').select('*').order('created_at',{ascending:false});if(error){wall.innerHTML='<div class="empty">تعذر تحميل الرسائل.</div>';return}wall.innerHTML=data.length?data.map(x=>`<article class="note"><div class="name">🌸 ${esc(x.name)}</div><div class="text">${esc(x.message)}</div><div class="date">${new Date(x.created_at).toLocaleString('ar-SA')}</div></article>`).join(''):'<div class="empty">لا توجد رسائل بعد 🌷</div>'}
form.addEventListener('submit',async e=>{e.preventDefault();if(!configured){status.textContent='باقي ربط قاعدة البيانات أولًا.';return}const name=document.getElementById('name').value.trim(),message=document.getElementById('message').value.trim();status.textContent='جارٍ الإضافة...';const {error}=await db.from('messages').insert({name,message});if(error){status.textContent='حدث خطأ.';return}form.reset();status.textContent='تمت إضافة الرسالة 💗';load()});
if(configured){db=window.supabase.createClient(SUPABASE_URL,SUPABASE_ANON_KEY)}load();
