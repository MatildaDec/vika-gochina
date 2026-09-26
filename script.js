document.getElementById('year').textContent = new Date().getFullYear();

const items = document.querySelectorAll('.route-step,.format-card,.vika-copy,.mood,.consult-card,.faq details');
items.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});

items.forEach(el=>observer.observe(el));

window.addEventListener('scroll',()=>{
  const y=window.scrollY;
  document.querySelectorAll('.poster').forEach((el,i)=>{
    el.style.translate = '0 ' + Math.min(y*(0.018 + i*0.005),18) + 'px';
  });
},{passive:true});
