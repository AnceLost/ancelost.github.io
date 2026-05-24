// checkout.js
const API_KEY = 'ad022de8-6304-41f5-ba38-71161ad583b2';

document.addEventListener('DOMContentLoaded', async () => {
    // Загружаем блюда, если они ещё не загружены
    if (!dishes || dishes.length === 0) {
        dishes = await loadDishes();
    }
    if (!dishes.length) {
        showNotification('Не удалось загрузить меню. Попробуйте позже.');
        return;
    }

    await restoreSelectedFromStorage();

    renderSelectedItems();

    setupFormSubmit();
    setupTimeField();
});

function renderSelectedItems() {
    const container = document.getElementById('selected-items-list');
    const hasAny = Object.values(selected).some(v => v !== null);

    if (!hasAny) {
        container.innerHTML = `
            <div class="empty-order-message">
                Ничего не выбрано. Чтобы добавить блюда в заказ, перейдите на страницу 
                <a href="build-lanch.html">Собрать ланч</a>.
            </div>`;
        return;
    }

    const categories = ['soup', 'main', 'salad', 'drink', 'dessert'];
    const labels = {
        soup: 'Суп',
        main: 'Главное блюдо',
        salad: 'Салат/стартер',
        drink: 'Напиток',
        dessert: 'Десерт'
    };
    const notChosenText = {
        soup: 'Не выбран',
        main: 'Не выбрано',
        salad: 'Не выбран',
        drink: 'Не выбран',
        dessert: 'Не выбран'
    };

    let html = '';
    for (const cat of categories) {
        const dish = selected[cat];
        html += `<div class="selected-category" data-category="${cat}">
                    <h4>${labels[cat]}</h4>`;
        if (dish) {
            html += `<div class="selected-item-info">
                        <span class="selected-item-name">${dish.name}</span>
                        <span class="selected-item-price">${dish.price} ₽</span>
                        <button class="remove-item-btn" data-cat="${cat}" data-id="${dish.id}">Удалить</button>
                    </div>`;
        } else {
            html += `<div class="empty-message">${notChosenText[cat]}</div>`;
        }
        html += `</div>`;
    }
    container.innerHTML = html;

    // Назначаем обработчики на кнопки удаления
    document.querySelectorAll('.remove-item-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const cat = btn.dataset.cat;
            selected[cat] = null;
            saveSelectedToStorage();   // функция из order.js
            renderSelectedItems();     // обновляем список
        });
    });
}

function setupFormSubmit() {
    const form = document.getElementById('checkoutForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Проверка, что состав заказа соответствует одному из комбо
        if (!isLunchValid()) {
            const notifType = getNotificationType();
            const msg = getNotificationText(notifType);
            showNotification(msg);
            return;
        }

        // Сбор данных формы
        const full_name = document.getElementById('full_name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const delivery_address = document.getElementById('delivery_address').value.trim();
        const comment = document.getElementById('comment').value;
        const subscribe = document.getElementById('subscribe').checked ? 1 : 0;
        const delivery_type = document.querySelector('input[name="delivery_type"]:checked').value;
        let delivery_time = null;
        if (delivery_type === 'by_time') {
            delivery_time = document.getElementById('delivery_time').value;
            if (!delivery_time) {
                alert('Укажите время доставки');
                return;
            }
        }

        if (!full_name || !email || !phone || !delivery_address) {
            alert('Заполните все обязательные поля');
            return;
        }

        // payload для отправки
        const payload = {
            full_name,
            email,
            phone,
            delivery_address,
            delivery_type,
            subscribe,
            comment,
            drink_id: selected.drink?.id,
            soup_id: selected.soup?.id,
            main_course_id: selected.main?.id,
            salad_id: selected.salad?.id,
            dessert_id: selected.dessert?.id
        };
        // Удаляем поля с null (необязательные)
        Object.keys(payload).forEach(key => {
            if (payload[key] === null || payload[key] === undefined) delete payload[key];
        });

        try {
            const response = await fetch(`https://edu.std-900.ist.mospolytech.ru/labs/api/orders?api_key=${API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || `Ошибка сервера: ${response.status}`);
            }

            const result = await response.json();
            // Успех – очищаем localStorage и перенаправляем на страницу сбора ланча
            localStorage.removeItem('selectedDishIds');
            alert('Заказ успешно оформлен!');
            window.location.href = 'build-lanch.html';
        } catch (error) {
            console.error('Ошибка при отправке заказа:', error);
            showNotification(`Не удалось оформить заказ: ${error.message}`);
        }
    });
}

function setupTimeField() {
    const radioNow = document.querySelector('input[name="delivery_type"][value="now"]');
    const radioByTime = document.querySelector('input[name="delivery_type"][value="by_time"]');
    const timeInput = document.getElementById('delivery_time');
    if (!radioNow || !radioByTime || !timeInput) return;

    const toggle = () => {
        if (radioByTime.checked) {
            timeInput.disabled = false;
            timeInput.required = true;
        } else {
            timeInput.disabled = true;
            timeInput.required = false;
            timeInput.value = '';
        }
    };
    radioNow.addEventListener('change', toggle);
    radioByTime.addEventListener('change', toggle);
    toggle();
}