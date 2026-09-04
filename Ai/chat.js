  const messages = document.getElementById('messages');
  const input = document.getElementById('chatInput');
  const sendBtn = document.getElementById('sendBtn');
  const chips = document.querySelectorAll('.chip');
  const newChat = document.getElementById('newChat');

  const answers = {
    "زایمان": { text: "مرخصی زایمان طبق قانون کار ۹۰ روز تقویمی است و در پروندهٔ شما به‌صورت خودکار محاسبه و ثبت می‌شود.", cite:"سیاست مرخصی شرکت، بخش ۴" },
    "اضافه": { text: "اضافه‌کاری بر اساس ساعات ثبت‌شده در سامانهٔ حضور و ضریب مصوب شرکت محاسبه و در فیش حقوقی همان ماه نمایش داده می‌شود.", cite:"سیاست حقوق و دستمزد، بخش ۱" },
    "بیمه": { text: "سهم شما از بیمهٔ تأمین اجتماعی طبق نرخ مصوب کشور محاسبه و همراه با سهم کارفرما در فیش حقوقی درج می‌شود.", cite:"سیاست بیمه و مزایا، بخش ۲" },
    "فیش": { text: "فیش حقوقی هر ماه، بعد از تأیید نهایی، در بخش «پرتال من» → «فیش‌های حقوقی» برای شما در دسترس قرار می‌گیرد.", cite:"راهنمای پرتال خودخدمتی" }
  };
  const fallback = { text: "این سؤال را بر اساس مستندات داخلی شرکت شما بررسی می‌کنم و پاسخ دقیق را برایتان می‌آورم؛ برای موارد حساس، پیشنهاد می‌کنم با واحد منابع انسانی هم هماهنگ کنید.", cite:"مستندات داخلی شرکت" };

  function scrollDown(){ messages.scrollTop = messages.scrollHeight; }

  function addUserMsg(text){
    const row = document.createElement('div');
    row.className = 'msg-row me';
    row.innerHTML = `<div class="msg-av"></div><div class="bubble"></div>`;
    row.querySelector('.bubble').textContent = text;
    messages.appendChild(row);
    scrollDown();
  }

  function addTyping(){
    const row = document.createElement('div');
    row.className = 'msg-row bot';
    row.id = 'typingRow';
    row.innerHTML = `<div class="msg-av"></div><div class="bubble"><div class="typing"><span></span><span></span><span></span></div></div>`;
    messages.appendChild(row);
    scrollDown();
  }

  function addBotMsg(text, cite){
    const typingRow = document.getElementById('typingRow');
    if(typingRow) typingRow.remove();
    const row = document.createElement('div');
    row.className = 'msg-row bot';
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.textContent = text;
    if(cite){
      const c = document.createElement('span');
      c.className = 'cite';
      c.textContent = 'منبع: ' + cite;
      bubble.appendChild(c);
    }
    row.innerHTML = `<div class="msg-av"></div>`;
    row.appendChild(bubble);
    messages.appendChild(row);
    scrollDown();
  }

  function respond(q){
    let match = fallback;
    for(const key in answers){
      if(q.includes(key)){ match = answers[key]; break; }
    }
    addTyping();
    setTimeout(()=>{ addBotMsg(match.text, match.cite); }, 900 + Math.random()*500);
  }

  function handleSend(){
    const val = input.value.trim();
    if(!val) return;
    addUserMsg(val);
    input.value = '';
    respond(val);
  }

  sendBtn.addEventListener('click', handleSend);
  input.addEventListener('keydown', (e)=>{ if(e.key === 'Enter') handleSend(); });
  chips.forEach(chip=>{
    chip.addEventListener('click', ()=>{
      addUserMsg(chip.dataset.q);
      respond(chip.dataset.q);
    });
  });
  newChat.addEventListener('click', ()=>{
    messages.innerHTML = `<div class="msg-row bot"><div class="msg-av"></div><div class="bubble">سلام! چه سؤالی دربارهٔ سیاست‌های شرکت داری؟</div></div>`;
  });