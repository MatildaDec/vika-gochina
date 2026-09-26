document.getElementById('year').textContent = new Date().getFullYear();

const translations = {
  ru: {
    nav_route:'Поступление',nav_formats:'Форматы',nav_prices:'Пакеты',nav_cases:'Кейсы',consultation:'Консультация ↗',
    hero_title:'Китай ближе,<br><em>чем кажется.</em>',hero_lead:'Учёба, гранты, языковые программы и жизнь в Китае. Сначала разбираем твою ситуацию — потом строим маршрут под тебя.',hero_cta:'Записаться на консультацию ↗',hero_secondary:'Смотреть маршрут ↓',photo_note:'сюда ставим ночное фото Вики',hero_bottom:'START YOUR ROUTE',
    intro_title:'Я хочу<br>учиться<br>в Китае.',q1:'Но где?',q2:'На каком языке?',q3:'Платно или на гранте?',q4:'Нужен ли HSK?',q5:'Какой город выбрать?',intro_answer:'Вот с этого мы и начинаем.',
    route_title:'От идеи<br>до Китая.',route_copy:'Путь не обязан выглядеть одинаково для всех. Но в нём должны быть понятные шаги и логика.',route_1_title:'Знакомимся',route_1_text:'Оценки, документы, язык, бюджет, планы и ожидания от учёбы.',route_2_title:'Строим маршрут',route_2_text:'Выбираем язык обучения, уровень программы, город и стратегию подачи.',route_3_title:'Готовим документы',route_3_text:'Анкеты, CV, мотивационные письма и пакет документов под требования программ.',route_4_title:'Подаёмся',route_4_text:'Контролируем заявки, дедлайны, интервью и коммуникацию с университетами.',route_5_title:'Китай',route_5_text:'Разбираемся с результатом и следующими шагами перед поездкой.',
    formats_title:'Китай может быть<br><em>разным.</em>',format_language:'Языковой год',format_language_text:'Погрузиться в среду, подтянуть китайский и подготовиться к следующему этапу.',format_bachelor:'Бакалавриат',format_bachelor_text:'Программы на английском и китайском, разные города и варианты финансирования.',format_master:'Магистратура',format_master_text:'Треки для продолжения образования, грантовых стратегий и карьерных целей.',format_camps:'Лагеря и short programs',format_camps_text:'Короткие образовательные поездки, чтобы увидеть Китай и университетскую среду изнутри.',
    photo_day:'сюда ставим дневное фото Вики',about_big:'Не «эксперт из интернета», а человек, который сам однажды собирал документы и уезжал учиться в Китай.',about_text:'Китай начался с дополнительных занятий в школе, самостоятельного изучения языка и идеи «а что, если реально поступить?». Сейчас Вика заканчивает бакалавриат в Китае и живёт в Ханчжоу.',fact_1:'лет в теме Китая',fact_2:'Hangzhou',fact_3:'разные маршруты обучения',
    prices_title:'Выбираем не тариф.<br><em>Выбираем маршрут.</em>',prices_note:'Цены пока временные — сейчас нам важнее собрать структуру и визуальный язык сайта.',price_language_desc:'Для языковых программ и первого погружения в Китай.',price_bachelor_desc:'Для поступления на бакалавриат на английском или китайском языке.',price_master_desc:'Для магистратуры и маршрутов, где важна стратегия подачи на финансирование.',price_individual_desc:'Для нестандартных ситуаций, лагерей и коротких программ.',price_li_1:'Стартовая консультация',price_li_2:'Подбор вариантов',price_li_3:'Документы и заявки',price_li_4:'Сопровождение',price_li_5:'Стратегия поступления',price_li_6:'Контроль дедлайнов',price_li_7:'Разбор профиля',price_li_8:'Грантовая стратегия',price_li_9:'Усиление заявки',price_li_10:'Индивидуальный сценарий',price_li_11:'Гибкий состав услуги',price_li_12:'Под задачу и сроки',choose:'Обсудить ↗',
    quiz_title:'Не знаешь,<br>что тебе нужно?',quiz_q1:'Что хочешь?',quiz_q2:'На каком языке?',quiz_q3:'Есть HSK?',quiz_cta:'Обсудить мой маршрут ↗',
    cases_note:'Пока это демонстрационные кейсы для дизайна. Позже заменим их на реальные истории.',case1_title:'Без HSK → языковой год',case1_text:'Китайский почти с нуля, но есть желание начать путь именно в Китае.',case2_title:'English Bachelor',case2_text:'Хороший английский и сильные оценки, но нет китайского и списка университетов.',case3_title:'Grant Route',case3_text:'Цель — магистратура с финансированием и несколько сценариев подачи.',case4_title:'«Я вообще не знаю, чего хочу»',case4_text:'Начинаем не с вуза, а с вопросов: специальность, бюджет, язык и формат жизни.',
    life_title:'Не только поступить.<br><em>Жить.</em>',faq1_q:'Можно поступить без HSK?',faq1_a:'Да. Есть англоязычные программы, а также языковые маршруты для тех, кто пока только начинает китайский.',faq2_q:'Можно учиться полностью на английском?',faq2_a:'Да, в Китае есть программы бакалавриата и магистратуры на английском языке.',faq3_q:'Есть гранты?',faq3_a:'Есть разные варианты финансирования, но решение зависит от требований программы и конкурса.',faq4_q:'Когда начинать поступление?',faq4_a:'Чем раньше, тем спокойнее можно собрать документы и выбрать стратегию. Точные сроки зависят от программы.',faq5_q:'Если я пока не выбрал специальность?',faq5_a:'Это нормальная стартовая точка. На консультации можно сначала определить направление и ограничения.',final_title:'Готов<br>к Китаю?',final_text:'Начни с разговора. Без универсального шаблона — сначала разберём твою ситуацию.'
  },
  en: {
    nav_route:'Admissions',nav_formats:'Programs',nav_prices:'Packages',nav_cases:'Cases',consultation:'Consultation ↗',
    hero_title:'China is closer<br><em>than you think.</em>',hero_lead:'Study, scholarships, language programs and life in China. We start with your profile and build a route around you.',hero_cta:'Book a consultation ↗',hero_secondary:'See the route ↓',photo_note:'Vika night photo goes here',hero_bottom:'START YOUR ROUTE',
    intro_title:'I want<br>to study<br>in China.',q1:'But where?',q2:'In which language?',q3:'Self-funded or scholarship?',q4:'Do I need HSK?',q5:'Which city should I choose?',intro_answer:'That is exactly where we start.',
    route_title:'From idea<br>to China.',route_copy:'No two admissions routes have to look the same. But every route needs clear logic and clear steps.',route_1_title:'Meet & assess',route_1_text:'Grades, documents, language, budget, goals and expectations.',route_2_title:'Build the route',route_2_text:'Choose the study language, degree level, city and application strategy.',route_3_title:'Prepare documents',route_3_text:'Applications, CV, motivation letters and the document package.',route_4_title:'Apply',route_4_text:'Track applications, deadlines, interviews and university communication.',route_5_title:'China',route_5_text:'Review the result and prepare for the next steps before departure.',
    formats_title:'China can look<br><em>different.</em>',format_language:'Language year',format_language_text:'Immerse yourself, improve Chinese and prepare for the next stage.',format_bachelor:'Bachelor',format_bachelor_text:'English- and Chinese-taught programs, different cities and funding options.',format_master:'Master',format_master_text:'Routes for further education, scholarships and career goals.',format_camps:'Camps & short programs',format_camps_text:'Short educational trips to experience China and university life from the inside.',
    photo_day:'Vika day photo goes here',about_big:'Not an “internet expert”, but someone who once collected the same documents and moved to China to study.',about_text:'China started with extra classes at school, self-study and a simple thought: “what if I actually apply?” Today Vika is finishing her bachelor’s degree in China and lives in Hangzhou.',fact_1:'years around China',fact_2:'Hangzhou',fact_3:'different study routes',
    prices_title:'Not a tariff.<br><em>A route.</em>',prices_note:'Prices are placeholders for now — the priority is the structure and design system.',price_language_desc:'For language programs and your first immersion in China.',price_bachelor_desc:'For bachelor admissions in English or Chinese.',price_master_desc:'For master’s admissions and funding-focused strategies.',price_individual_desc:'For non-standard situations, camps and short programs.',price_li_1:'Kick-off consultation',price_li_2:'Program shortlist',price_li_3:'Documents & applications',price_li_4:'Ongoing support',price_li_5:'Admissions strategy',price_li_6:'Deadline tracking',price_li_7:'Profile review',price_li_8:'Scholarship strategy',price_li_9:'Application positioning',price_li_10:'Custom scenario',price_li_11:'Flexible scope',price_li_12:'Built around your timeline',choose:'Discuss ↗',
    quiz_title:'Not sure<br>what you need?',quiz_q1:'What do you want?',quiz_q2:'Study language?',quiz_q3:'Do you have HSK?',quiz_cta:'Discuss my route ↗',
    cases_note:'These are design demo cases for now. We will replace them with real stories later.',case1_title:'No HSK → language year',case1_text:'Chinese is almost zero, but the goal is to start the journey in China.',case2_title:'English Bachelor',case2_text:'Strong English and grades, but no Chinese and no university shortlist.',case3_title:'Grant Route',case3_text:'The goal is a funded master’s degree with several application scenarios.',case4_title:'“I have no idea what I want”',case4_text:'We start with the questions: subject, budget, language and lifestyle.',
    life_title:'Not only to study.<br><em>To live.</em>',faq1_q:'Can I apply without HSK?',faq1_a:'Yes. There are English-taught programs and language routes for students just starting Chinese.',faq2_q:'Can I study fully in English?',faq2_a:'Yes. China has English-taught bachelor’s and master’s programs.',faq3_q:'Are scholarships available?',faq3_a:'There are different funding options, but decisions depend on program requirements and competition.',faq4_q:'When should I start applying?',faq4_a:'The earlier you start, the calmer the preparation. Exact timelines depend on the program.',faq5_q:'What if I have not chosen a major yet?',faq5_a:'That is a normal starting point. A consultation can first define direction and constraints.',final_title:'READY<br>FOR CHINA?',final_text:'Start with a conversation. No universal template — first we understand your situation.'
  }
};

document.querySelectorAll('.lang-btn').forEach(function(btn){
  btn.addEventListener('click',function(){
    const lang=btn.dataset.lang;
    document.documentElement.lang=lang;
    document.querySelectorAll('.lang-btn').forEach(function(b){b.classList.toggle('active',b===btn);});
    document.querySelectorAll('[data-i18n]').forEach(function(el){
      const key=el.dataset.i18n;
      if(translations[lang][key]) el.innerHTML=translations[lang][key];
    });
  });
});

const revealEls=document.querySelectorAll('.route-step,.format-tile,.price-card,.case-card,.faq details,.facts div');
revealEls.forEach(function(el){el.classList.add('reveal');});
const io=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target);}});},{threshold:.12});
revealEls.forEach(function(el){io.observe(el);});

const questionEls=[].slice.call(document.querySelectorAll('.intro-questions p'));
const qObserver=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting)e.target.classList.add('active');});},{threshold:.65});
questionEls.forEach(function(el){qObserver.observe(el);});

const route=document.querySelector('.route-visual');
const progress=document.getElementById('routeProgress');
const marker=document.getElementById('routeMarker');
function updateRoute(){
  if(!route)return;
  const r=route.getBoundingClientRect();
  const vh=window.innerHeight;
  const total=r.height;
  const start=vh*.55;
  let p=(start-r.top)/total;
  p=Math.max(0,Math.min(1,p));
  progress.style.height=(p*100)+'%';
  marker.style.top='calc('+(p*100)+'% - 23px)';
}
window.addEventListener('scroll',updateRoute,{passive:true});updateRoute();

const stage=document.getElementById('heroStage');
window.addEventListener('mousemove',function(e){
  if(!stage||window.innerWidth<900)return;
  const x=(e.clientX/window.innerWidth-.5),y=(e.clientY/window.innerHeight-.5);
  stage.style.transform='translate3d('+(x*10)+'px,'+(y*8)+'px,0)';
  const v=stage.querySelector('.hero-vika');
  if(v)v.style.transform='translate3d('+(x*-14)+'px,'+(y*-10)+'px,20px)';
});

document.querySelectorAll('.quiz-row button').forEach(function(btn){
  btn.addEventListener('click',function(){
    const group=btn.parentElement;group.querySelectorAll('button').forEach(function(b){b.classList.remove('selected');});btn.classList.add('selected');
  });
});

const lifeTrack=document.querySelector('.life-track');
const lifeSection=document.querySelector('.china-life');
window.addEventListener('scroll',function(){
  if(!lifeTrack||!lifeSection||window.innerWidth<760)return;
  const r=lifeSection.getBoundingClientRect();
  const max=Math.max(0,lifeTrack.scrollWidth-window.innerWidth+100);
  const p=Math.max(0,Math.min(1,(window.innerHeight-r.top)/(r.height+window.innerHeight)));
  lifeTrack.style.transform='translateX('+(-max*p)+'px)';
},{passive:true});


/* 3D pointer interaction */
function attachTilt(selector, maxX, maxY){
  document.querySelectorAll(selector).forEach(function(el){
    el.addEventListener('mousemove',function(e){
      if(window.innerWidth<900)return;
      const r=el.getBoundingClientRect();
      const px=(e.clientX-r.left)/r.width-.5;
      const py=(e.clientY-r.top)/r.height-.5;
      el.style.transform='translateY(-7px) rotateX('+(-py*maxX)+'deg) rotateY('+(px*maxY)+'deg)';
    });
    el.addEventListener('mouseleave',function(){ el.style.transform=''; });
  });
}
attachTilt('.price-card',4,5);
attachTilt('.format-tile',3,4);

const visualBreak=document.querySelector('.visual-break');
if(visualBreak){
  window.addEventListener('scroll',function(){
    const r=visualBreak.getBoundingClientRect();
    const p=Math.max(-1,Math.min(1,(window.innerHeight/2-(r.top+r.height/2))/window.innerHeight));
    document.querySelectorAll('.visual-card').forEach(function(card,i){
      const depth=[18,-12,26][i]||10;
      const rot=[-3,4,2][i]||0;
      card.style.transform='translateY('+(p*depth)+'px) rotate('+rot+'deg) translateZ('+(20+i*14)+'px)';
    });
  },{passive:true});
}
