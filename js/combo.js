const comboVariants = [
    {
        name: "Полный ланч",
        dishes: ["soup", "main", "salad", "drink"],
        labels: ["Суп", "Главное", "Салат", "Напиток"],
        images: ["🍲", "🍛", "🥗", "🥤"] // эмодзи как fallback, но используем картинки
    },
    {
        name: "Классический",
        dishes: ["soup", "main", "drink"],
        labels: ["Суп", "Главное", "Напиток"],
        images: ["🍲", "🍛", "🥤"] // эмодзи как fallback, но используем картинки
    },
    {
        name: "Лёгкий",
        dishes: ["soup", "salad", "drink"],
        labels: ["Суп", "Салат", "Напиток"],
        images: ["🍲", "🥗", "🥤"] // эмодзи как fallback, но используем картинки
    },
    {
        name: "Сытный",
        dishes: ["main", "salad", "drink"],
        labels: ["Главное", "Салат", "Напиток"],
        images: ["🍛", "🥗", "🥤"] // эмодзи как fallback, но используем картинки
    },
    {
        name: "Минимальный",
        dishes: ["main", "drink"],
        labels: ["Главное", "Напиток"],
        images: ["🍛", "🥤"] // эмодзи как fallback, но используем картинки
    }
];

//генерируем блоки с комбо
function renderComboVariants() {
    const container = document.getElementById('combo-grid');
    if (!container) return;
    container.innerHTML = '';
    comboVariants.forEach((combo, idx) => {
        const card = document.createElement('div');
        card.className = 'combo-card';
        card.innerHTML = `<h3>${combo.name}</h3><div class="combo-dishes"></div>`;
        const dishesDiv = card.querySelector('.combo-dishes');
        combo.dishes.forEach((cat, i) => {
            const dishItem = document.createElement('div');
            dishItem.className = 'combo-dish-item';
            // Используем маленькие картинки (можно заменить на реальные)
            let imgUrl = '';
            if (cat === 'soup') imgUrl = '#';
            else if (cat === 'main') imgUrl = '#';
            else if (cat === 'salad') imgUrl = '#';
            else if (cat === 'drink') imgUrl = '#';
            dishItem.innerHTML = `<img src="${imgUrl}" alt="${combo.labels[i]}" loading="lazy"><span>${combo.labels[i]}</span>`;
            dishesDiv.appendChild(dishItem);
        });
        container.appendChild(card);
    });
}

//валидация комбо
function isLunchValid(selected) {
    const hasSoup = selected.soup !== null;
    const hasMain = selected.main !== null;
    const hasSalad = selected.salad !== null;
    const hasDrink = selected.drink !== null;

    if (!hasDrink) return false; // напиток обязателен во всех комбо

    // суп+главное+салат+напиток
    if (hasSoup && hasMain && hasSalad) return true;
    // суп+главное+напиток
    if (hasSoup && hasMain && !hasSalad) return true;
    // суп+салат+напиток
    if (hasSoup && !hasMain && hasSalad) return true;
    // главное+салат+напиток
    if (!hasSoup && hasMain && hasSalad) return true;
    // главное+напиток
    if (!hasSoup && hasMain && !hasSalad) return true;

    return false;
}

//определение типа уведомления
function getNotificationType(selected) {
    const hasSoup = selected.soup !== null;
    const hasMain = selected.main !== null;
    const hasSalad = selected.salad !== null;
    const hasDrink = selected.drink !== null;
    const hasAny = hasSoup || hasMain || hasSalad || hasDrink;

    if (!hasAny) return "nothing";
    if (!hasDrink) return "no_drink";
    if (hasDrink) {
        if (hasSoup && !hasMain && !hasSalad) return "no_main_or_salad";
        if (!hasSoup && !hasMain && hasSalad) return "no_soup_or_main";
        if (!hasSoup && !hasMain && !hasSalad) return "no_main";
        if (hasSoup && !hasMain && !hasSalad) return "no_main_or_salad"; // уже покрыто
        if (!hasSoup && !hasMain && hasSalad) return "no_soup_or_main";
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

// Показ уведомления
function showNotification(message) {
    // Удаляем предыдущее, если есть
    const existing = document.querySelector('.notification-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.className = 'notification-overlay';
    overlay.innerHTML = `
        <div class="notification-modal">
            <p>${message}</p>
            <button id="notification-ok">Окей</button>
        </div>
    `;
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

document.addEventListener('DOMContentLoaded', ()=> {
    renderComboVariants();
});