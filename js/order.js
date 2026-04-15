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

//хранилище выбранных блюд
let selected = {
    soup: null,
    main: null,
    salad: null,
    drink: null,
    dessert: null
};

// Активные фильтры (по категориям). null = все блюда.
let activeFilters = {
    soup: null,
    main: null,
    salad: null,
    drink: null,
    dessert: null
};

function renderDishes() {
    const container = document.getElementById('dishes-container');
    container.innerHTML = '';

    for (const [catKey, catConfig] of Object.entries(categoriesConfig)) {
        let categoryDishes = dishes.filter(d => d.category === catKey);
        categoryDishes.sort((a, b) => a.name.localeCompare(b.name, 'ru'));

        // секция
        const section = document.createElement('section');
        section.className = 'menu-section';
        section.id = `section-${catKey}`;
        section.innerHTML = `
            <h2>${catConfig.title}</h2>
            <div class="filters-bar" id="filters-${catKey}"></div>
            <div class="dishes-grid" id="grid-${catKey}"></div>
        `;
        container.appendChild(section);

        
        const filtersBar = document.getElementById(`filters-${catKey}`);
        // кнопки фильтров под секцией
        catConfig.filters.forEach(filter => {
            const btn = document.createElement('button');
            btn.className = 'filter-btn';
            btn.textContent = filter.name;
            btn.dataset.kind = filter.kind;
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleFilter(catKey, filter.kind, btn);
            });
            filtersBar.appendChild(btn);
        });

        // Первоначальная отрисовка сетки (все блюда)
        renderDishesGrid(catKey, categoryDishes);
    }
}

// Отрисовка сетки блюд для конкретной категории с учётом активного фильтра
function renderDishesGrid(categoryKey, allDishes) {
    const grid = document.getElementById(`grid-${categoryKey}`);
    if (!grid) return;

    // у нас фильтр (на категорию) - это просто значение признака, которое должно быть у блюда
    const activeKind = activeFilters[categoryKey];
    let filteredDishes = allDishes;
    if (activeKind) {
        filteredDishes = allDishes.filter(d => d.kind === activeKind);
    }

    grid.innerHTML = '';
    filteredDishes.forEach(dish => {
        const card = document.createElement('div');
        card.className = 'dish-card';
        card.setAttribute('data-dish', dish.keyword);
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
}

// Переключение фильтра
function toggleFilter(categoryKey, kind, buttonElement) {
    const current = activeFilters[categoryKey];
    if (current === kind) {
        // Снимаем фильтр
        activeFilters[categoryKey] = null;
        buttonElement.classList.remove('active');
    } else {
        // Устанавливаем новый фильтр, снимаем active со всех кнопок этой категории
        activeFilters[categoryKey] = kind;
        const filtersBar = document.getElementById(`filters-${categoryKey}`);
        Array.from(filtersBar.querySelectorAll('.filter-btn')).forEach(btn => {
            btn.classList.remove('active');
        });
        buttonElement.classList.add('active');
    }
    // Перерисовываем сетку для этой категории
    const allDishes = dishes.filter(d => d.category === categoryKey);
    allDishes.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
    renderDishesGrid(categoryKey, allDishes);
}

// Выбор блюда (обновляет selected и блок "Ваш заказ")
function selectDish(dish) {
    selected[dish.category] = dish;
    updateSelectedOrder();
}

// Обновление блока "Ваш заказ" (с учётом всех категорий)
function updateSelectedOrder() {
    const container = document.getElementById('selected-items-container');
    const totalContainer = document.getElementById('total-price-container');
    let hasAny = false;
    let total = 0;

    for (let cat in selected) {
        if (selected[cat]) {
            hasAny = true;
            total += selected[cat].price;
        }
    }

    if (!hasAny) {
        container.innerHTML = '<div id="nothing-selected">Ничего не выбрано</div>';
        totalContainer.style.display = 'none';
        // Очищаем скрытые поля
        for (let cat in selected) {
            document.getElementById(`selected_${cat}`).value = '';
        }
        return;
    }

    let html = '';
    const categoryLabels = {
        soup: 'Суп',
        main: 'Главное блюдо',
        salad: 'Салат / стартер',
        drink: 'Напиток',
        dessert: 'Десерт'
    };
    const categoryOrder = ['soup', 'main', 'salad', 'drink', 'dessert'];
    for (let cat of categoryOrder) {
        const dish = selected[cat];
        html += `<div class="selected-category">
                    <h4>${categoryLabels[cat]}</h4>`;
        if (dish) {
            html += `<div class="selected-item-info">
                        <span class="selected-item-name">${dish.name}</span>
                        <span class="selected-item-price">${dish.price} ₽</span>
                    </div>`;
        } else {
            html += `<div class="empty-message">Блюдо не выбрано</div>`;
        }
        html += `</div>`;
    }
    container.innerHTML = html;

    document.getElementById('total-price').innerText = total;
    totalContainer.style.display = 'block';

    // Обновляем скрытые поля для отправки формы
    for (let cat in selected) {
        const hidden = document.getElementById(`selected_${cat}`);
        if (hidden) hidden.value = selected[cat] ? selected[cat].keyword : '';
    }
}

// Сброс выбранных блюд
function resetOrder() {
    for (let cat in selected) {
        selected[cat] = null;
    }
    updateSelectedOrder();
}

// Валидация и отправка формы (теперь требуются все 5 категорий)
function setupFormSubmit() {
    const form = document.getElementById('orderForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!selected.soup || !selected.main || !selected.salad || !selected.drink || !selected.dessert) {
            alert('Пожалуйста, выберите блюда из каждой категории: суп, главное блюдо, салат/стартер, напиток, десерт.');
            return;
        }

        const radioExact = document.querySelector('input[value="exact"]');
        const timeInput = document.getElementById('delivery_time');
        if (radioExact.checked && !timeInput.value) {
            alert('Укажите время доставки');
            timeInput.focus();
            return;
        }

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const address = document.getElementById('address').value.trim();
        if (!name || !email || !phone || !address) {
            alert('Заполните все обязательные поля: имя, email, телефон, адрес');
            return;
        }

        form.submit();
    });
}

// Управление полем времени доставки
function setupTimeField() {
    const radioAsync = document.querySelector('input[value="asap"]');
    const radioExact = document.querySelector('input[value="exact"]');
    const timeInput = document.getElementById('delivery_time');
    function toggle() {
        if (radioExact.checked) {
            timeInput.disabled = false;
            timeInput.required = true;
        } else {
            timeInput.disabled = true;
            timeInput.required = false;
            timeInput.value = '';
        }
    }
    radioAsync.addEventListener('change', toggle);
    radioExact.addEventListener('change', toggle);
    toggle();
}

// Сброс формы (кнопка reset)
function setupResetButton() {
    const resetBtn = document.querySelector('button[type="reset"]');
    resetBtn.addEventListener('click', (e) => {
        setTimeout(() => {
            resetOrder();
            document.getElementById('newsletter').checked = true;
            const radioAsync = document.querySelector('input[value="asap"]');
            radioAsync.checked = true;
            const timeInput = document.getElementById('delivery_time');
            timeInput.disabled = true;
            timeInput.required = false;
            timeInput.value = '';
            // Сброс активных фильтров
            for (let cat in activeFilters) {
                activeFilters[cat] = null;
            }
            // Перерисовываем все сетки с блюдами (без фильтров)
            for (let catKey of Object.keys(categoriesConfig)) {
                const allDishes = dishes.filter(d => d.category === catKey);
                allDishes.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
                renderDishesGrid(catKey, allDishes);
                // Убираем active класс у всех кнопок фильтров
                const filtersBar = document.getElementById(`filters-${catKey}`);
                if (filtersBar) {
                    Array.from(filtersBar.querySelectorAll('.filter-btn')).forEach(btn => {
                        btn.classList.remove('active');
                    });
                }
            }
        }, 10);
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    renderDishes();
    updateSelectedOrder();
    setupFormSubmit();
    setupTimeField();
    setupResetButton();
});