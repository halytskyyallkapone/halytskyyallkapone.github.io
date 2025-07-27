document.addEventListener('DOMContentLoaded', function() {
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();
});

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.btn-rules').forEach(button => {
        button.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const arrow = this.querySelector('.arrow');
            
            content.classList.toggle('visible');
            arrow.classList.toggle('rotate');
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    checkHashAndToggle(); // Проверяем хэш при загрузке
    window.addEventListener("hashchange", checkHashAndToggle); // И при изменении
});

function checkHashAndToggle() {
    const hash = window.location.hash.substring(1); // Убираем # (например, "krampus")
    if (!hash) return; // Если хэша нет, ничего не делаем

    // Закрываем ВСЕ открытые блоки (если нужно)
    document.querySelectorAll(".btn-content.visible").forEach(content => {
        content.classList.remove("visible");
        const arrow = content.closest(".btn-block").querySelector(".arrow");
        if (arrow) arrow.classList.remove("rotate");
    });

    // Находим блок с ID = хэшу (например, id="krampus" для #krampus)
    const targetBlock = document.getElementById(hash);
    if (!targetBlock) return; // Если такого блока нет, выходим

    // Открываем нужный блок
    const content = targetBlock.querySelector(".btn-content");
    const arrow = targetBlock.querySelector(".arrow");
    if (content && arrow) {
        content.classList.add("visible");
        arrow.classList.add("rotate");
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('slaveButton');
    
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Зміна тексту на кнопці з плавним ефектом
        this.textContent = '🤡 Забудь, ти раб 🤡';
        
        // Затримка для плавної зміни тексту (0.7 секунди)
        setTimeout(() => {
            // Затримка перед початком анімації часток
            const rect = button.getBoundingClientRect();
            const offsetX = window.scrollX + rect.left + rect.width / 2;
            const offsetY = window.scrollY + rect.top + rect.height / 2;

            
            // Створюємо 30 часток
            for (let i = 0; i < 30; i++) {
                let particle = document.createElement('div');
                particle.classList.add('particle');
                document.body.appendChild(particle);
                
                // Визначаємо початкову позицію частки (центральна точка кнопки)
                particle.style.left = `${offsetX}px`;
                particle.style.top = `${offsetY}px`;
                
                // Випадкове переміщення частки
                
                particle.style.setProperty('--x', `${(Math.random() - 0.5) * 200}px`);
                particle.style.setProperty('--y', `${(Math.random() - 0.5) * 200}px`);
                
                // Видаляємо частки після 2 секунд
                setTimeout(() => particle.remove(), 2000);
            }

            // Приховуємо кнопку після того, як частки почали анімуватися
            button.style.opacity = '0';  // Змінюємо opacity для плавного зникнення кнопки
            setTimeout(() => button.style.display = 'none', 700);  // Приховуємо кнопку після завершення анімації
        }, 700);  // Затримка для плавної зміни тексту
    });
});




    
function copyHiddenText(element) {
    const textToCopy = element.getAttribute('data-copy-text');
    
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            // Сохраняем исходные стили текста
            const originalColor = element.style.color;
            const originalTransition = element.style.transition;

            // 1. Мгновенное изменение цвета текста (как :active)
            element.style.transition = 'none';
            element.style.color = '#d01d3e'; // Ярко-красный (как в первом варианте)

            // 2. Через 100мс включаем плавный переход обратно
            setTimeout(() => {
                element.style.transition = 'color 0.7s ease';
                element.style.color = originalColor || ''; // Возвращаем исходный цвет

                // 3. Через 0.7s убираем transition (если не нужен)
                setTimeout(() => {
                    element.style.transition = originalTransition || '';
                }, 700);
            }, 100);
        })
        .catch(err => {
            console.error('Помилка копіювання: ', err);
            alert('Не вдалося скопіювати текст');
        });
}

document.addEventListener('DOMContentLoaded', function() {
    // Функция для применения сохраненной темы
    function applyTheme() {
        const savedTheme = localStorage.getItem('theme') || 'default';
        const link = document.getElementById('theme-link');
        const themeToggleButton = document.getElementById('theme-toggle');
        
        if (savedTheme === 'pink') {
            link.setAttribute('href', '/theme/pink.css');
            themeToggleButton.textContent = 'Ну нахєр...';  // Текст для розовой темы
        } else {
            link.setAttribute('href', '/theme/default.css');
            themeToggleButton.textContent = '🎀 Пікмі Галицький 🎀';  // Текст для дефолтной темы
        }
    }

    // Функция для переключения темы
    document.getElementById('theme-toggle')?.addEventListener('click', function() {
        const link = document.getElementById('theme-link');
        const current = link.getAttribute('href');
        const themeToggleButton = document.getElementById('theme-toggle');
        
        if (current === '/theme/default.css') {
            link.setAttribute('href', '/theme/pink.css');
            localStorage.setItem('theme', 'pink');
            themeToggleButton.textContent = 'Ну нахєр...';  // Меняем текст при переключении на розовую тему
        } else {
            link.setAttribute('href', '/theme/default.css');
            localStorage.setItem('theme', 'default');
            themeToggleButton.textContent = '🎀 Пікмі Галицький 🎀';  // Меняем текст при переключении на дефолтную тему
        }
    });

    // Применяем сохраненную тему при загрузке страницы
    applyTheme();
});


