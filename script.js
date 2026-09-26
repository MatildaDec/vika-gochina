document.getElementById('year').textContent=new Date().getFullYear();

const io=new IntersectionObserver((entries)=>{
  entries.forEach((e)=>{
    if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target)}
  })
},{threshold:.12});

document.querySelectorAll('.way,.consult-card,.ed,.faq details,.about-copy').forEach((el)=>{
  el.style.opacity='0';
  el.style.transform=(el.classList.contains('consult-card')?'translateY(28px) rotate(1.5deg)':'translateY(28px)');
  el.style.transition='opacity .7s ease, transform .7s ease';
  io.observe(el);
});

const style=document.createElement('style');
style.textContent='.show{opacity:1!important;transform:translateY(0)!important}';
document.head.appendChild(style);
