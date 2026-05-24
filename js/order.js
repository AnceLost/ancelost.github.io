// Глобальные переменные
let selected = {         // выбранные блюда по категориям (храним объекты блюд)
    soup: null,
    main: null,
    salad: null,
    drink: null,
    dessert: null
};
let activeFilters = {};   // для фильтрации

// Сохранение выбранных ID в localStorage
function saveSelectedToStorage() {
    const ids = {
        soup: selected.soup?.id || null,
        main: selected.main?.id || null,
        salad: selected.salad?.id || null,
        drink: selected.drink?.id || null,
        dessert: selected.dessert?.id || null
    };
    localStorage.setItem('selectedDishIds', JSON.stringify(ids));
}

// Восстановление выбранных блюд из localStorage (после загрузки dishes)
async function restoreSelectedFromStorage() {
    const stored = localStorage.getItem('selectedDishIds');
    if (!stored) return;
    const ids = JSON.parse(stored);
    for (let cat of ['soup', 'main', 'salad', 'drink', 'dessert']) {
        const id = ids[cat];
        if (id && dishes.length) {
            const dish = dishes.find(d => d.id === id && d.category === cat);
            if (dish) selected[cat] = dish;
            else selected[cat] = null;
        } else {
            selected[cat] = null;
        }
    }
    saveSelectedToStorage(); // синхронизируем (удаляем несуществующие)
}

// Проверка комбо (без десерта)
function isLunchValid() {
    const hasSoup = !!selected.soup;
    const hasMain = !!selected.main;
    const hasSalad = !!selected.salad;
    const hasDrink = !!selected.drink;

    if (!hasDrink) return false;
    // Допустимые комбинации
    if (hasSoup && hasMain && hasSalad) return true;
    if (hasSoup && hasMain && !hasSalad) return true;
    if (hasSoup && !hasMain && hasSalad) return true;
    if (!hasSoup && hasMain && hasSalad) return true;
    if (!hasSoup && hasMain && !hasSalad) return true;
    return false;
}

// Определение типа уведомления для некорректного комбо \
function getNotificationType() {
    const hasSoup = !!selected.soup;
    const hasMain = !!selected.main;
    const hasSalad = !!selected.salad;
    const hasDrink = !!selected.drink;
    const hasAny = hasSoup || hasMain || hasSalad || hasDrink;

    if (!hasAny) return "nothing";
    if (!hasDrink) return "no_drink";
    if (hasDrink) {
        if (hasSoup && !hasMain && !hasSalad) return "no_main_or_salad";
        if (!hasSoup && !hasMain && hasSalad) return "no_soup_or_main";
        if (!hasSoup && !hasMain && !hasSalad) return "no_main";
    }
    return "invalid";
}

function getNotificationText(type) {
    switch(type) {
        case "nothing": return "Ничего не выбрано. Выберите блюда для заказа";
        case "no_drink": return "Выберите напиток";
        case "no_main_or_salad": return "Выберите главное блюдо/салат/стартер";
        case "no_soup_or_main": return "Выберите суп или главное блюдо";
        case "no_main": return "Выберите главное блюдо";
        default: return "Невозможно оформить заказ. Проверьте состав.";
    }
}

// Показ модального уведомления
function showNotification(message) {
    const existing = document.querySelector('.notification-overlay');
    if (existing) existing.remove();
    const overlay = document.createElement('div');
    overlay.className = 'notification-overlay';
    overlay.innerHTML = `<div class="notification-modal"><p>${message}</p><button id="notification-ok">Окей</button></div>`;
    document.body.appendChild(overlay);
    const okBtn = overlay.querySelector('#notification-ok');
    okBtn.addEventListener('click', () => overlay.remove());
    okBtn.addEventListener('mouseenter', (e) => {
        e.target.style.backgroundColor = '#ff6347';
        e.target.style.color = 'white';
    });
    okBtn.addEventListener('mouseleave', (e) => {
        e.target.style.backgroundColor = '#f1eee9';
        e.target.style.color = '#1e2a2e';
    });
}

// Подсчёт итоговой стоимости
function calculateTotal() {
    let total = 0;
    for (let cat of ['soup', 'main', 'salad', 'drink', 'dessert']) {
        if (selected[cat]) total += selected[cat].price;
    }
    return total;
}

// Обновление панели (на странице собрать ланч)
function updateOrderPanel() {
    const panel = document.getElementById('order-summary-panel');
    if (!panel) return;
    const total = calculateTotal();
    const valid = isLunchValid();
    const hasAny = Object.values(selected).some(v => v !== null);
    if (!hasAny) {
        panel.style.display = 'none';
        return;
    }
    panel.style.display = 'block';
    document.getElementById('panel-total').textContent = total;
    const checkoutLink = document.getElementById('checkout-link');
    if (valid) {
        checkoutLink.classList.remove('disabled');
        checkoutLink.removeAttribute('disabled');
        checkoutLink.style.pointerEvents = 'auto';
        checkoutLink.style.opacity = '1';
    } else {
        checkoutLink.classList.add('disabled');
        checkoutLink.style.pointerEvents = 'none';
        checkoutLink.style.opacity = '0.5';
    }
}
