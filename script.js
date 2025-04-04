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
    const button = document.getElementById('myButton');
    button.addEventListener('click', function(e) {
        e.preventDefault();
        this.textContent = '🤡 Забудь, ти раб 🤡';
        
        setTimeout(() => {
            const rect = button.getBoundingClientRect();
            for (let i = 0; i < 30; i++) {
                let particle = document.createElement('div');
                particle.classList.add('particle');
                document.body.appendChild(particle);
                
                particle.style.left = `${rect.left + rect.width / 2}px`;
                particle.style.top = `${rect.top + rect.height / 2}px`;
                particle.style.setProperty('--x', `${(Math.random() - 0.5) * 200}px`);
                particle.style.setProperty('--y', `${(Math.random() - 0.5) * 200}px`);
                
                setTimeout(() => particle.remove(), 1000);
            }
            button.style.visibility = 'hidden';
        }, 1500);
        
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