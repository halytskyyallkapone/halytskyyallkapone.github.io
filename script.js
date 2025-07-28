document.addEventListener('DOMContentLoaded', function() {
    // Инициализация Telegram Web App с проверкой
    function initTelegramApp() {
        const tg = window.Telegram.WebApp;
        if (tg) {
            tg.ready();
            tg.expand();
            
            // Проверяем, находимся ли мы на главной странице index.html
            const currentPath = window.location.pathname;
            const isIndexPage = currentPath === '' || 
                               currentPath === '/' ||
                               currentPath.endsWith('index.html');
            
            // Настраиваем цвет шапки только если это НЕ главная страница
            if (!isIndexPage) {
                setHeaderColor();
            }
            
            // Настройка кнопки в шапке
            setupHeaderButton();
        } else {
            // Если Telegram Web App еще не загружен, пробуем через небольшую задержку
            setTimeout(initTelegramApp, 100);
        }
    }
    
    initTelegramApp();
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
        
        // Настраиваем цвет шапки при применении темы
        setHeaderColor();
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
        
        // Настраиваем цвет шапки при переключении темы
        setHeaderColor();
    });

    // Применяем сохраненную тему при загрузке страницы
    applyTheme();
});

// Функция для настройки цвета шапки Telegram Web App
function setHeaderColor() {
    const tg = window.Telegram.WebApp;
    if (!tg) return;
    
    // Проверяем, находимся ли мы на главной странице index.html
    const currentPath = window.location.pathname;
    const isIndexPage = currentPath === '' || 
                       currentPath === '/' ||
                       currentPath.endsWith('index.html');
    
    if (isIndexPage) {
        // На главной странице - черный цвет шапки
        tg.setHeaderColor('#000000'); // Черный цвет
    } else {
        // На остальных страницах - подстройка под тему
        const savedTheme = localStorage.getItem('theme') || 'default';
        
        if (savedTheme === 'pink') {
            // Розовая тема - розовый цвет шапки
            tg.setHeaderColor('#ffd1ff'); // rgb(255, 209, 255)
        } else {
            // Дефолтная тема - темный цвет шапки
            tg.setHeaderColor('#1d2026'); // rgba(29, 32, 38)
        }
    }
}

// Функция для настройки кнопки в шапке Telegram Web App
function setupHeaderButton() {
    const tg = window.Telegram.WebApp;
    if (!tg) {
        return;
    }
    
    // Проверяем, находимся ли мы на странице welcome.html
    const currentPath = window.location.pathname;
    const isWelcomePage = currentPath.endsWith('welcome.html') || 
                         currentPath.endsWith('/') ||
                         currentPath === '' ||
                         currentPath === '/index.html';
    
    if (isWelcomePage) {
        // На странице welcome.html - скрываем кнопку
        tg.MainButton.hide();
    } else {
        // На остальных страницах - кнопка "Назад"
        tg.MainButton.setText('Назад');
        tg.MainButton.onClick(() => {
            // Определяем правильный путь к welcome.html
            let backPath = 'welcome.html';
            
            // Если мы в папке player, нужно подняться на уровень выше
            if (currentPath.includes('/player/')) {
                backPath = '../welcome.html';
            }
            
            window.location.href = backPath;
        });
        tg.MainButton.show();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Перевіряємо, чи ми на сторінці з івентами (тут перевірка за URL)
    const isEventsPage = window.location.pathname.includes("FAQ-event.html") || window.location.pathname.endsWith("events.html");
    if (!isEventsPage) return; // Вихід, якщо не сторінка івентів

    // Знаходимо всі елементи з класом "btn-block"
    document.querySelectorAll(".btn-block").forEach(block => {
        // Обробник ПКМ (правий клік миші)
        block.addEventListener("contextmenu", e => {
            e.preventDefault(); // Блокуємо стандартне контекстне меню браузера
            if (block.id) {
                copyLink(block.id); // Копіюємо посилання з id блока
            } else {
                showCopiedMsg("Помилка: у цього івенту немає ідентифікатора"); // Показуємо помилку, якщо id немає
            }
        });

        // Обробник початку торкання пальцем (для мобільних)
        block.addEventListener("touchstart", () => {
            block.dataset.touchStart = Date.now(); // Запам’ятовуємо час початку торкання
        });

        // Обробник завершення торкання пальцем
        block.addEventListener("touchend", () => {
            const time = Date.now() - block.dataset.touchStart; // Визначаємо тривалість тапу
            if (time > 500) { // Якщо тап довгий (понад 500 мс)
                if (block.id) {
                    copyLink(block.id); // Копіюємо посилання з id блока
                } else {
                    showCopiedMsg("Помилка: відсутній ідентифікатор"); // Показуємо помилку, якщо id немає
                }
            }
        });
    });

    // Функція копіювання посилання у буфер обміну
    function copyLink(id) {
        const url = `${window.location.origin}${window.location.pathname}#${id}`; // Формуємо посилання
        navigator.clipboard.writeText(url).then(() => {
            showCopiedMsg("Посилання скопійовано!"); // Показуємо повідомлення про успіх
        }).catch(() => {
            showCopiedMsg("Не вдалося скопіювати посилання"); // Показуємо повідомлення про помилку
        });
    }

    /**
     * Функція створює тимчасове повідомлення у вигляді "тосту" (toast),
     * яке з’являється у нижній частині екрану і плавно зникає через 2 секунди.
     */
    function showCopiedMsg(message) {
        const toast = document.createElement("div"); // Створюємо елемент для повідомлення
        toast.textContent = message; // Вставляємо текст повідомлення

        // Задаємо стилі для повідомлення
        Object.assign(toast.style, {
            position: "fixed",
            bottom: "30px",
            left: "50%",
            transform: "translateX(-50%) translateY(20px)",
            background: "rgba(0, 0, 0, 0.8)",
            color: "#fff",
            padding: "12px 24px",
            borderRadius: "6px",
            fontSize: "16px",
            opacity: "0",
            pointerEvents: "none",
            transition: "opacity 0.3s ease, transform 0.3s ease",
            zIndex: "9999",
        });

        document.body.appendChild(toast); // Додаємо повідомлення до DOM

        // Запускаємо анімацію появи
        requestAnimationFrame(() => {
            toast.style.opacity = "1";
            toast.style.transform = "translateX(-50%) translateY(0)";
        });

        // Через 1.7 секунди починаємо анімацію зникнення
        setTimeout(() => {
            toast.style.opacity = "0";
            toast.style.transform = "translateX(-50%) translateY(20px)";
        }, 1700);

        // Після завершення анімації видаляємо повідомлення з DOM
        toast.addEventListener("transitionend", () => {
            if (toast.style.opacity === "0") {
                toast.remove();
            }
        }, { once: true }); // Обробник спрацює один раз і відпишеться
    }
});




