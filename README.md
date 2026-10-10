# VIKA · Go China

[Открыть сайт](https://matildadec.github.io/vika-gochina/) · [Сразу к карточкам отзывов](https://matildadec.github.io/vika-gochina/#reviews)

Responsive study-in-China landing page with Russian and English versions, four standalone program pages and a free consultation draft in Telegram.

Run `npm run dev` with Node.js. Build with `npm run build`; no dependencies are required.

GitHub Pages publishes from `main` / root. All asset paths are relative, so the site works under `/vika-gochina/`. `.nojekyll` disables Jekyll processing for this static site.

## Как заполнить карточки отзывов

В `index.html` найдите секцию `id="reviews"`. В ней три шаблона: о поступлении, сопровождении и жизни в Китае. Карточки адаптируются к мобильным экранам.

1. Замените `[Имя студента]`, `[Университет · город]`, `[Программа]`, `[Год поступления]` и текст в `.review-text` реальными данными.
2. Обновите соответствующие атрибуты `data-en` для английской версии.
3. Для фотографии замените SVG внутри `.review-avatar` на `<img src="assets/student-1.webp" alt="">` и добавьте файл в `assets/`.
4. Удалите элемент `.review-template` с надписью «ШАБЛОН» после заполнения карточки. Когда реальные отзывы будут добавлены, обновите пояснение под заголовком секции.
5. Сохраните изменения в `main`. GitHub Pages опубликует новую версию автоматически.

Student routes are illustrative and review cards are clearly marked templates; verified testimonials have not been supplied. The about section includes the approved Vika portrait and personal story.

## Страницы программ

- [Языковой год](https://matildadec.github.io/vika-gochina/language-year.html)
- [Бакалавриат](https://matildadec.github.io/vika-gochina/bachelor.html)
- [Магистратура](https://matildadec.github.io/vika-gochina/master.html)
- [Лагеря и короткие программы](https://matildadec.github.io/vika-gochina/short-programs.html)

Кнопки консультации со страниц программ открывают главную с выбранной программой в форме. Все страницы поддерживают RU/EN.
