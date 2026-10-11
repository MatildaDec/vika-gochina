'use strict';
const telegramBase = 'https://t.me/china_go_consultation';
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const envelopeTrigger=document.querySelector('.envelope-trigger'),grantNote=document.getElementById('grant-note');
let language = 'ru', draftMessage = '';
const translations = [...document.querySelectorAll('[data-en]')].map(element => ({element, ru:element.innerHTML, en:element.dataset.en}));
const placeholders = [...document.querySelectorAll('[data-placeholder-en]')].map(element => ({element, ru:element.placeholder, en:element.dataset.placeholderEn}));
const menuButton = document.querySelector('.menu-toggle'), mobileNav = document.getElementById('mobile-nav');
const track = document.getElementById('story-track'), previousStory = document.getElementById('story-prev'), nextStory = document.getElementById('story-next');
const floatingCTA = document.querySelector('.floating-cta'), formResult = document.getElementById('form-result'), formStatus = document.getElementById('form-status'), draftLink = document.getElementById('telegram-draft'), copyButton = document.getElementById('copy-message');
function updateMenuLabel(){menuButton.setAttribute('aria-label',menuButton.getAttribute('aria-expanded')==='true'?(language==='ru'?'Закрыть меню':'Close menu'):(language==='ru'?'Открыть меню':'Open menu'));}
function setLanguage(next){
 if(!['ru','en'].includes(next))return; language=next; document.documentElement.lang=language;
 translations.forEach(({element,ru,en})=>{element.innerHTML=language==='en'?en:ru;}); placeholders.forEach(({element,ru,en})=>{element.placeholder=language==='en'?en:ru;});
 document.querySelectorAll('[data-lang]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.lang===language)));
 document.title=language==='ru'?(document.body.dataset.titleRu||'VIKA · Go China — твоё будущее в Китае'):(document.body.dataset.titleEn||'VIKA · Go China — your future in China');
 const labels=[['.desktop-nav','Основная навигация','Main navigation'],['#mobile-nav','Мобильная навигация','Mobile navigation'],['#story-track','Примеры маршрутов поступления','Illustrative study routes'],['#story-prev','Предыдущие маршруты','Previous routes'],['#story-next','Следующие маршруты','Next routes']];
 labels.forEach(([selector,ru,en])=>document.querySelector(selector)?.setAttribute('aria-label',language==='ru'?ru:en)); updateMenuLabel();
 if(draftMessage)updateDraft();
 try{localStorage.setItem('vika-language',language);}catch{}
 updateStoryControls();
 positionGrantNote();
}
function closeMenu(){mobileNav.hidden=true;menuButton.setAttribute('aria-expanded','false');updateMenuLabel();}
document.querySelectorAll('[data-lang]').forEach(button=>button.addEventListener('click',()=>setLanguage(button.dataset.lang)));
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';mobileNav.hidden=!open;menuButton.setAttribute('aria-expanded',String(open));updateMenuLabel();});
mobileNav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
matchMedia('(min-width:801px)').addEventListener('change',event=>{if(event.matches)closeMenu();});
function updateStoryControls(){if(!track)return;previousStory.disabled=track.scrollLeft<3;nextStory.disabled=track.scrollLeft+track.clientWidth>=track.scrollWidth-3;}
function slideStories(direction){if(!track)return;const card=track.querySelector('.story-card'),gap=parseFloat(getComputedStyle(track).columnGap)||18;track.scrollBy({left:direction*(card.getBoundingClientRect().width+gap),behavior:reducedMotion.matches?'instant':'smooth'});}
if(track){
previousStory.addEventListener('click',()=>slideStories(-1));nextStory.addEventListener('click',()=>slideStories(1));track.addEventListener('scroll',updateStoryControls,{passive:true});
track.addEventListener('keydown',event=>{if(['ArrowRight','ArrowLeft'].includes(event.key)){event.preventDefault();slideStories(event.key==='ArrowRight'?1:-1);}});
new ResizeObserver(updateStoryControls).observe(track);
}
const form=document.getElementById('consultation-form');
function updateDraft(){
 const name=document.getElementById('name').value.trim(),program=document.getElementById('program').selectedOptions[0].textContent,message=document.getElementById('message').value.trim();
 draftMessage=language==='ru'?'Привет, Вика! Меня зовут '+name+'. Хочу записаться на бесплатную консультацию по поступлению в Китай.\n\nИнтересует: '+program+'.'+(message?'\n\nО себе: '+message:''):'Hi Vika! My name is '+name+'. I’d like to book a free consultation about studying in China.\n\nI’m interested in: '+program+'.'+(message?'\n\nAbout me: '+message:'');
 draftLink.href=telegramBase+'?text='+encodeURIComponent(draftMessage);
 formStatus.textContent=language==='ru'?'Черновик готов. Отправь его Вике в Telegram, чтобы договориться о времени. Если черновик не появился, скопируй сообщение.':'Your draft is ready. Send it to Vika in Telegram to arrange a time. If the draft doesn’t appear, copy the message.';
 copyButton.textContent=language==='ru'?'Скопировать сообщение':'Copy message';
}
if(form){
const selectedProgram=new URLSearchParams(location.search).get('program'), programSelect=document.getElementById('program');
if([...programSelect.options].some(option=>option.value===selectedProgram))programSelect.value=selectedProgram;
form.addEventListener('submit',event=>{event.preventDefault();const name=document.getElementById('name');if(!name.value.trim()){name.setCustomValidity(language==='ru'?'Напиши своё имя.':'Please enter your name.');name.reportValidity();return;}name.setCustomValidity('');if(!form.reportValidity())return;updateDraft();formResult.hidden=false;window.open(draftLink.href,'_blank','noopener,noreferrer');});
form.addEventListener('input',()=>{document.getElementById('name').setCustomValidity('');if(!formResult.hidden)updateDraft();});form.addEventListener('change',()=>{if(!formResult.hidden)updateDraft();});
copyButton.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(draftMessage);copyButton.textContent=language==='ru'?'Сообщение скопировано ✓':'Message copied ✓';}catch{formStatus.textContent=(language==='ru'?'Скопируй текст вручную:':'Copy this message manually:')+'\n'+draftMessage;formStatus.style.whiteSpace='pre-wrap';}});
}
if('IntersectionObserver' in window){
 const reveals=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('show');entry.target.classList.remove('pending');reveals.unobserve(entry.target);}}),{threshold:.08});
 document.querySelectorAll('.reveal').forEach(element=>{if(!reducedMotion.matches&&element.getBoundingClientRect().top>innerHeight)element.classList.add('pending');reveals.observe(element);});
 const hero=document.querySelector('.hero,.program-detail-hero'); if(floatingCTA&&hero)new IntersectionObserver(([entry])=>floatingCTA.classList.toggle('visible',!entry.isIntersecting)).observe(hero);
 const consultation=document.querySelector('.consultation');if(floatingCTA&&consultation)new IntersectionObserver(([entry])=>{floatingCTA.style.visibility=entry.isIntersecting?'hidden':'';},{threshold:.12}).observe(consultation);
}else{floatingCTA.classList.add('visible');}
const pass=document.querySelector('[data-tilt]');
if(pass&&matchMedia('(pointer:fine)').matches&&!reducedMotion.matches){pass.addEventListener('pointermove',event=>{const box=pass.getBoundingClientRect(),x=(event.clientX-box.left)/box.width-.5,y=(event.clientY-box.top)/box.height-.5;pass.style.transform='rotate(-9deg) rotateY('+x*8+'deg) rotateX('+(-y*8)+'deg) translateY(-4px)';});pass.addEventListener('pointerleave',()=>{pass.style.transform='';});}
document.getElementById('year').textContent=new Date().getFullYear();
try{setLanguage(localStorage.getItem('vika-language')||'ru');}catch{setLanguage('ru');}
updateStoryControls();


function positionGrantNote(){
 if(!grantNote?.matches(':popover-open'))return;
 const trigger=envelopeTrigger.getBoundingClientRect(),note=grantNote.getBoundingClientRect(),gap=10,gutter=12;
 const left=Math.max(gutter,Math.min(trigger.right-note.width,innerWidth-note.width-gutter));
 const below=trigger.bottom+gap,above=trigger.top-note.height-gap;
 const top=Math.max(gutter,Math.min(below+note.height<=innerHeight-gutter?below:above,innerHeight-note.height-gutter));
 grantNote.style.left=left+'px';grantNote.style.top=top+'px';grantNote.style.transform='none';
}
if(grantNote){
 grantNote.addEventListener('toggle',event=>{envelopeTrigger.setAttribute('aria-expanded',String(event.newState==='open'));positionGrantNote();});
 window.addEventListener('resize',positionGrantNote);
 window.addEventListener('scroll',positionGrantNote,{passive:true});
}
