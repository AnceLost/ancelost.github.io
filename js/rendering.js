// Инициализация
document.addEventListener('DOMContentLoaded', async () => {
    // Загружаем блюда
    dishes = await loadDishes();
    if (!dishes.length) return;

    await restoreSelectedFromStorage();

    renderComboVariants();
    renderAllSections();
    highlightSelectedCards();
    updateOrderPanel();

    setupFiltersAndReset();
});

const categoriesConfig = {
    soup: {
        title: "Супы",
        label: "Суп",
        filters: [
            { name: "рыбный", kind: "fish" },
            { name: "мясной", kind: "meat" },
            { name: "вегетарианский", kind: "veg" }
        ]
    },
    main: {
        title: "Главные блюда",
        label: "Главное блюдо",
        filters: [
            { name: "рыбное", kind: "fish" },
            { name: "мясное", kind: "meat" },
            { name: "вегетарианское", kind: "veg" }
        ]
    },
    salad: {
        title: "Салаты и стартеры",
        label: "Салат/стартер",
        filters: [
            { name: "рыбный", kind: "fish" },
            { name: "мясной", kind: "meat" },
            { name: "вегетарианский", kind: "veg" }
        ]
    },
    drink: {
        title: "Напитки",
        label: "Напиток",
        filters: [
            { name: "холодный", kind: "cold" },
            { name: "горячий", kind: "hot" }
        ]
    },
    dessert: {
        title: "Десерты",
        label: "Десерт",
        filters: [
            { name: "маленькая порция", kind: "small" },
            { name: "средняя порция", kind: "medium" },
            { name: "большая порция", kind: "large" }
        ]
    }
};

function renderAllSections() {
    const container = document.getElementById('dishes-container');
    container.innerHTML = '';
    for (const [catKey, catConfig] of Object.entries(categoriesConfig)) {
        let categoryDishes = dishes.filter(d => d.category === catKey);
        categoryDishes.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
        const section = document.createElement('section');
        section.className = 'menu-section';
        section.id = `section-${catKey}`;
        section.innerHTML = `<h2>${catConfig.title}</h2>
            <div class="filters-bar" id="filters-${catKey}"></div>
            <div class="dishes-grid" id="grid-${catKey}"></div>`;
        container.appendChild(section);
        // фильтры
        const filtersBar = document.getElementById(`filters-${catKey}`);
        catConfig.filters.forEach(filter => {
            const btn = document.createElement('button');
            btn.className = 'filter-btn';
            btn.textContent = filter.name;
            btn.dataset.kind = filter.kind;
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleFilter(catKey, filter.kind);
            });
            filtersBar.appendChild(btn);
        });
        renderDishesGrid(catKey, categoryDishes);
    }
}

function renderDishesGrid(categoryKey, allDishes) {
    const grid = document.getElementById(`grid-${categoryKey}`);
    if (!grid) return;
    const activeKind = activeFilters[categoryKey];
    let filtered = activeKind ? allDishes.filter(d => d.kind === activeKind) : allDishes;
    grid.innerHTML = '';
    filtered.forEach(dish => {
        const card = document.createElement('div');
        card.className = 'dish-card';
        card.dataset.dishId = dish.id;
        card.dataset.category = dish.category;
        card.innerHTML = `
            <img src="${dish.image}" alt="${dish.name}" loading="lazy">
            <p class="dish-price">${dish.price} ₽</p>
            <p class="dish-title">${dish.name}</p>
            <p class="dish-weight">${dish.count}</p>
            <button>Добавить</button>
        `;
        card.addEventListener('click', (e) => {
            e.stopPropagation();
            selectDish(dish);
        });
        grid.appendChild(card);
    });
    highlightSelectedCards();
}

function selectDish(dish) {
    // Заменяем блюдо в своей категории
    selected[dish.category] = dish;
    saveSelectedToStorage();
    highlightSelectedCards();
    updateOrderPanel();
}

function highlightSelectedCards() {
    // Убираем выделение со всех
    document.querySelectorAll('.dish-card').forEach(card => {
        card.classList.remove('selected');
    });
    for (let cat in selected) {
        const dish = selected[cat];
        if (dish) {
            const card = document.querySelector(`.dish-card[data-dish-id="${dish.id}"]`);
            if (card) card.classList.add('selected');
        }
    }
}

function toggleFilter(categoryKey, kind) {
    const current = activeFilters[categoryKey];
    if (current === kind) {
        activeFilters[categoryKey] = null;
    } else {
        activeFilters[categoryKey] = kind;
    }
    // Перерисовываем сетку
    const allDishes = dishes.filter(d => d.category === categoryKey);
    allDishes.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
    renderDishesGrid(categoryKey, allDishes);
}

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
            // Используем маленькие картинки
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