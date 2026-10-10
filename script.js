'use strict';
const telegramBase = 'https://t.me/china_go_consultation';
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let language = 'ru', draftMessage = '', activeProgram = null;
const translations = [...document.querySelectorAll('[data-en]')].map(element => ({element, ru:element.innerHTML, en:element.dataset.en}));
const placeholders = [...document.querySelectorAll('[data-placeholder-en]')].map(element => ({element, ru:element.placeholder, en:element.dataset.placeholderEn}));
const menuButton = document.querySelector('.menu-toggle'), mobileNav = document.getElementById('mobile-nav'), dialog = document.getElementById('program-dialog');
const track = document.getElementById('story-track'), previousStory = document.getElementById('story-prev'), nextStory = document.getElementById('story-next');
const floatingCTA = document.querySelector('.floating-cta'), formResult = document.getElementById('form-result'), formStatus = document.getElementById('form-status'), draftLink = document.getElementById('telegram-draft'), copyButton = document.getElementById('copy-message');
const programs = {
language:{kicker:'01 / LANGUAGE YEAR',ru:{title:'Языковой год',intro:'Для тех, кто хочет погрузиться в среду, учить китайский в Китае и подготовиться к следующему этапу.',items:['Обсудим твой уровень языка и цель поездки.','Рассмотрим города и подходящие языковые программы.','Разберём документы, сроки и следующие шаги.']},en:{title:'Language year',intro:'Immerse yourself in China, study the language and prepare for the next stage.',items:['Discuss your language level and goals.','Explore cities and suitable programs.','Review documents, timelines and next steps.']}},
bachelor:{kicker:'02 / BACHELOR’S DEGREE',ru:{title:'Бакалавриат',intro:'Первое высшее образование в Китае — с выбором направления, языка обучения и города под твои планы.',items:['Разберём школьное образование, оценки и язык.','Сравним программы на английском и китайском.','Рассмотрим финансирование и стратегию подачи.']},en:{title:'Bachelor’s degree',intro:'Your first degree in China, with a major, study language and city chosen around your goals.',items:['Review your education, grades and languages.','Compare English- and Chinese-taught programs.','Explore funding and an application strategy.']}},
master:{kicker:'03 / MASTER’S DEGREE',ru:{title:'Магистратура',intro:'Следующий этап образования — с учётом диплома, академического опыта и карьерных целей.',items:['Разберём твой профиль и желаемое направление.','Подберём программы и варианты финансирования.','Обсудим документы, мотивационное письмо и подачу.']},en:{title:'Master’s degree',intro:'Your next stage of education, taking your degree, academic background and career goals into account.',items:['Review your background and desired field.','Shortlist programs and funding options.','Discuss documents, motivation letters and applications.']}},
short:{kicker:'04 / CAMPS & SHORT PROGRAMS',ru:{title:'Лагеря и short programs',intro:'Короткая образовательная поездка, чтобы познакомиться с Китаем и университетской средой.',items:['Обсудим возраст, интересы и даты поездки.','Рассмотрим доступные форматы и города.','Разберём условия участия и подготовку к поездке.']},en:{title:'Camps & short programs',intro:'A short educational trip to experience China and university life from the inside.',items:['Discuss your age, interests and travel dates.','Explore available formats and cities.','Review participation requirements and travel preparation.']}}
};
function renderProgram(key){
 const program=programs[key]; if(!program)return; const content=program[language];
 document.getElementById('dialog-kicker').textContent=program.kicker; document.getElementById('dialog-title').textContent=content.title; document.getElementById('dialog-intro').textContent=content.intro;
 document.getElementById('dialog-list').replaceChildren(...content.items.map(text=>{const item=document.createElement('li');item.textContent=text;return item;}));
 document.getElementById('dialog-note').textContent=language==='ru'?'Требования, доступность и стоимость зависят от программы. Обсудим их на консультации.':'Requirements, availability and costs depend on the program. We’ll discuss them in your consultation.';
}
function updateMenuLabel(){menuButton.setAttribute('aria-label',menuButton.getAttribute('aria-expanded')==='true'?(language==='ru'?'Закрыть меню':'Close menu'):(language==='ru'?'Открыть меню':'Open menu'));}
function setLanguage(next){
 if(!['ru','en'].includes(next))return; language=next; document.documentElement.lang=language;
 translations.forEach(({element,ru,en})=>{element.innerHTML=language==='en'?en:ru;}); placeholders.forEach(({element,ru,en})=>{element.placeholder=language==='en'?en:ru;});
 document.querySelectorAll('[data-lang]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.lang===language)));
 document.title=language==='ru'?'VIKA · Go China — твоё будущее в Китае':'VIKA · Go China — your future in China';
 const labels=[['.desktop-nav','Основная навигация','Main navigation'],['#mobile-nav','Мобильная навигация','Mobile navigation'],['#story-track','Примеры маршрутов поступления','Illustrative study routes'],['#story-prev','Предыдущие маршруты','Previous routes'],['#story-next','Следующие маршруты','Next routes'],['.dialog-close','Закрыть','Close']];
 labels.forEach(([selector,ru,en])=>document.querySelector(selector).setAttribute('aria-label',language==='ru'?ru:en)); updateMenuLabel();
 if(activeProgram)renderProgram(activeProgram); if(draftMessage)updateDraft();
 try{localStorage.setItem('vika-language',language);}catch{}
 updateStoryControls();
}
function closeMenu(){mobileNav.hidden=true;menuButton.setAttribute('aria-expanded','false');updateMenuLabel();}
document.querySelectorAll('[data-lang]').forEach(button=>button.addEventListener('click',()=>setLanguage(button.dataset.lang)));
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';mobileNav.hidden=!open;menuButton.setAttribute('aria-expanded',String(open));updateMenuLabel();});
mobileNav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
matchMedia('(min-width:801px)').addEventListener('change',event=>{if(event.matches)closeMenu();});
document.querySelectorAll('[data-program]').forEach(button=>button.addEventListener('click',()=>{activeProgram=button.dataset.program;renderProgram(activeProgram);dialog.showModal();document.body.classList.add('dialog-open');}));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const box=dialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)dialog.close();}});
dialog.addEventListener('close',()=>document.body.classList.remove('dialog-open'));
document.getElementById('dialog-cta').addEventListener('click',()=>{document.getElementById('program').value=activeProgram;dialog.close();if(draftMessage)updateDraft();});
function updateStoryControls(){previousStory.disabled=track.scrollLeft<3;nextStory.disabled=track.scrollLeft+track.clientWidth>=track.scrollWidth-3;}
function slideStories(direction){const card=track.querySelector('.story-card'),gap=parseFloat(getComputedStyle(track).columnGap)||18;track.scrollBy({left:direction*(card.getBoundingClientRect().width+gap),behavior:reducedMotion.matches?'instant':'smooth'});}
previousStory.addEventListener('click',()=>slideStories(-1));nextStory.addEventListener('click',()=>slideStories(1));track.addEventListener('scroll',updateStoryControls,{passive:true});
track.addEventListener('keydown',event=>{if(['ArrowRight','ArrowLeft'].includes(event.key)){event.preventDefault();slideStories(event.key==='ArrowRight'?1:-1);}});
new ResizeObserver(updateStoryControls).observe(track);
const form=document.getElementById('consultation-form');
function updateDraft(){
 const name=document.getElementById('name').value.trim(),program=document.getElementById('program').selectedOptions[0].textContent,message=document.getElementById('message').value.trim();
 draftMessage=language==='ru'?'Привет, Вика! Меня зовут '+name+'. Хочу записаться на консультацию по поступлению в Китай.\n\nИнтересует: '+program+'.'+(message?'\n\nО себе: '+message:''):'Hi Vika! My name is '+name+'. I’d like to book a consultation about studying in China.\n\nI’m interested in: '+program+'.'+(message?'\n\nAbout me: '+message:'');
 draftLink.href=telegramBase+'?text='+encodeURIComponent(draftMessage);
 formStatus.textContent=language==='ru'?'Черновик готов. Отправь его Вике в Telegram, чтобы договориться о времени. Если черновик не появился, скопируй сообщение.':'Your draft is ready. Send it to Vika in Telegram to arrange a time. If the draft doesn’t appear, copy the message.';
 copyButton.textContent=language==='ru'?'Скопировать сообщение':'Copy message';
}
form.addEventListener('submit',event=>{event.preventDefault();const name=document.getElementById('name');if(!name.value.trim()){name.setCustomValidity(language==='ru'?'Напиши своё имя.':'Please enter your name.');name.reportValidity();return;}name.setCustomValidity('');if(!form.reportValidity())return;updateDraft();formResult.hidden=false;window.open(draftLink.href,'_blank','noopener,noreferrer');});
form.addEventListener('input',()=>{document.getElementById('name').setCustomValidity('');if(!formResult.hidden)updateDraft();});form.addEventListener('change',()=>{if(!formResult.hidden)updateDraft();});
copyButton.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(draftMessage);copyButton.textContent=language==='ru'?'Сообщение скопировано ✓':'Message copied ✓';}catch{formStatus.textContent=(language==='ru'?'Скопируй текст вручную:':'Copy this message manually:')+'\n'+draftMessage;formStatus.style.whiteSpace='pre-wrap';}});
if('IntersectionObserver' in window){
 const reveals=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('show');entry.target.classList.remove('pending');reveals.unobserve(entry.target);}}),{threshold:.08});
 document.querySelectorAll('.reveal').forEach(element=>{if(!reducedMotion.matches&&element.getBoundingClientRect().top>innerHeight)element.classList.add('pending');reveals.observe(element);});
 new IntersectionObserver(([entry])=>floatingCTA.classList.toggle('visible',!entry.isIntersecting)).observe(document.querySelector('.hero'));
 new IntersectionObserver(([entry])=>{floatingCTA.style.visibility=entry.isIntersecting?'hidden':'';},{threshold:.12}).observe(document.querySelector('.consultation'));
}else{floatingCTA.classList.add('visible');}
const pass=document.querySelector('[data-tilt]');
if(matchMedia('(pointer:fine)').matches&&!reducedMotion.matches){pass.addEventListener('pointermove',event=>{const box=pass.getBoundingClientRect(),x=(event.clientX-box.left)/box.width-.5,y=(event.clientY-box.top)/box.height-.5;pass.style.transform='rotate(-9deg) rotateY('+x*8+'deg) rotateX('+(-y*8)+'deg) translateY(-4px)';});pass.addEventListener('pointerleave',()=>{pass.style.transform='';});}
document.getElementById('year').textContent=new Date().getFullYear();
try{setLanguage(localStorage.getItem('vika-language')||'ru');}catch{setLanguage('ru');}
updateStoryControls();

