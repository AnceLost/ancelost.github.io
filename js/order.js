//категории блюд
const categories = {
    soup: { title: "Супы", key: "soup", label: "Суп" },
    main: { title: "Главные блюда", key: "main", label: "Главное блюдо" },
    drink: { title: "Напитки", key: "drink", label: "Напиток" }
};

//хранилище выьранных блюд
let selected = {
    soup: null,
    main: null,
    drink: null
};

function renderDishes() {
    const container = document.getElementById('dishes-container');
    container.innerHTML = '';

    //здесь группировка по категориям
    const grouped = {
        soup: dishes.filter(d => d.category === 'soup'),
        main: dishes.filter(d => d.category === 'main'),
        drink: dishes.filter(d => d.category === 'drink')
    };

    //здесь сортировка каждой группы по алфавиту
    for (let cat in grouped) {
        grouped[cat].sort((a, b) => a.name.localeCompare(b.name, 'ru'));
    }

    // Создаём секции
    for (let [catKey, catData] of Object.entries(categories)) {
        const dishesArray = grouped[catKey];
        if (!dishesArray.length) continue;

        const section = document.createElement('section');
        section.className = 'menu-section';
        section.innerHTML = `<h2>${catData.title}</h2><div class="dishes-grid" id="grid-${catKey}"></div>`;
        container.appendChild(section);

        const grid = section.querySelector('.dishes-grid');
        dishesArray.forEach(dish => {
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
            // Клик по карточке (можно и по кнопке, но удобнее по всей карточке)
            card.addEventListener('click', (e) => {
                e.stopPropagation();
                selectDish(dish);
            });
            grid.appendChild(card);
        });
    }
}

function selectDish(dish) {
    selected[dish.category] = dish;
    updateSelectedOrder();
}

//обновляет блок с заказом 
function updateSelectedOrder() {
    const container = document.getElementById('selected-items-container');
    const totalContainer = document.getElementById('total-price-container');
    let hasAny = false;
    let total = 0;

    //проверяем, есть ли хоть одно выбранное блюдо
    for (let cat of ['soup', 'main', 'drink']) {
        if (selected[cat]) {
            hasAny = true;
            total += selected[cat].price;
        }
    }

    if (!hasAny) {
        container.innerHTML = '<div id="nothing-selected">Ничего не выбрано</div>';
        totalContainer.style.display = 'none';
        // Обновляем скрытые поля
        document.getElementById('selected_soup').value = '';
        document.getElementById('selected_main').value = '';
        document.getElementById('selected_drink').value = '';
        return;
    }

    //здесь строится заказ (категория, блюдо, цена)
    let html = '';
    const categoryLabels = {
        soup: 'Суп',
        main: 'Главное блюдо',
        drink: 'Напиток'
    };
    for (let cat of ['soup', 'main', 'drink']) {
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

    // Отображаем итоговую стоимость
    document.getElementById('total-price').innerText = total;
    totalContainer.style.display = 'block';

    // Обновляем скрытые поля формы для отправки
    document.getElementById('selected_soup').value = selected.soup ? selected.soup.keyword : '';
    document.getElementById('selected_main').value = selected.main ? selected.main.keyword : '';
    document.getElementById('selected_drink').value = selected.drink ? selected.drink.keyword : '';
}

// Сброс выбранных блюд (очистка заказа)
function resetOrder() {
    selected = { soup: null, main: null, drink: null };
    updateSelectedOrder();
}

// Валидация и отправка формы
function setupFormSubmit() {
    const form = document.getElementById('orderForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        //проверяем, что выбраны все три категории
        if (!selected.soup || !selected.main || !selected.drink) {
            alert('Пожалуйста, выберите суп, главное блюдо и напиток!');
            return;
        }

        //проверка времени доставки
        const radioExact = document.querySelector('input[value="exact"]');
        const timeInput = document.getElementById('delivery_time');
        if (radioExact.checked && !timeInput.value) {
            alert('Укажите время доставки');
            timeInput.focus();
            return;
        }

        //проверяются обязательные поля
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const address = document.getElementById('address').value.trim();
        if (!name || !email || !phone || !address) {
            alert('Заполните все обязательные поля: имя, email, телефон, адрес');
            return;
        }

        // Если всё ок, отправляем форму
        form.submit();
    });
}

// Управление полем времени доставки (включение/выключение)
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

// Сброс всей формы (кнопка сброса + очистка выбранных блюд)
function setupResetButton() {
    const resetBtn = document.querySelector('button[type="reset"]');
    resetBtn.addEventListener('click', (e) => {
        resetOrder();
        //убедимся, что чекбокс подписки снова включен
        document.getElementById('newsletter').checked = true;
        //сброс времени доставки на "Как можно скорее"
        const radioAsync = document.querySelector('input[value="asap"]');
        radioAsync.checked = true;
        const timeInput = document.getElementById('delivery_time');
        timeInput.disabled = true;
        timeInput.required = false;
        timeInput.value = '';

    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderDishes();
    updateSelectedOrder();   // изначально ничего не выбрано
    setupFormSubmit();
    setupTimeField();
    setupResetButton();
});