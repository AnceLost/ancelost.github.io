let orders = [];

// Загрузка заказов пользователя
async function loadOrders() {
    try {
        const resp = await fetch(`https://edu.std-900.ist.mospolytech.ru/labs/api/orders?api_key=${API_KEY}`);
        if (!resp.ok) throw new Error();
        const data = await resp.json();
        // Сортировка по дате (новые сверху)
        data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        orders = data;
        return data;
    } catch {
        showToast('Не удалось загрузить заказы', 'error');
        return [];
    }
}

// Получение названия блюда по ID
function getDishName(id) {
    if (!id) return null;
    const dish = dishes.find(d => d.id === id);
    return dish ? dish.name : `Блюдо #${id}`;
}

// Формирование строки состава заказа
function formatComposition(order) {
    const items = [];
    if (order.soup_id) items.push(getDishName(order.soup_id));
    if (order.main_course_id) items.push(getDishName(order.main_course_id));
    if (order.salad_id) items.push(getDishName(order.salad_id));
    if (order.drink_id) items.push(getDishName(order.drink_id));
    if (order.dessert_id) items.push(getDishName(order.dessert_id));
    return items.length ? items.join(', ') : '—';
}

// Подсчёт стоимости заказа
function calculatePrice(order) {
    let total = 0;
    const ids = [order.soup_id, order.main_course_id, order.salad_id, order.drink_id, order.dessert_id];
    ids.forEach(id => {
        const dish = dishes.find(d => d.id === id);
        if (dish) total += dish.price;
    });
    return total;
}

// Формат времени доставки
function formatDelivery(order) {
    return order.delivery_type === 'now'
        ? 'Как можно скорее (с 7:00 до 23:00)'
        : (order.delivery_time ? `В ${order.delivery_time}` : 'Не указано');
}

// Рендер списка заказов
async function renderOrders() {
    const container = document.getElementById('orders-list');
    if (!orders.length) {
        container.innerHTML = '<div class="empty-message">У вас пока нет заказов. Перейдите на страницу <a href="build-lanch.html">Собрать ланч</a>, чтобы сделать первый заказ.</div>';
        return;
    }
    let html = `
        <div class="orders-table">
            <div class="orders-header">
                <div>#</div><div>Дата</div><div>Состав</div><div>Стоимость</div><div>Доставка</div><div>Действия</div>
            </div>
    `;
    orders.forEach((order, idx) => {
        const date = new Date(order.created_at).toLocaleString('ru-RU');
        const composition = formatComposition(order);
        const price = calculatePrice(order);
        const delivery = formatDelivery(order);
        html += `
            <div class="order-row" data-order-id="${order.id}">
                <div>${idx + 1}</div>
                <div>${date}</div>
                <div class="order-composition" title="${composition.replace(/"/g, '&quot;')}">${composition}</div>
                <div>${price} ₽</div>
                <div>${delivery}</div>
                <div class="order-actions">
                    <button class="action-btn view-btn" data-id="${order.id}" title="Подробнее"><i class="bi bi-eye"></i></button>
                    <button class="action-btn edit-btn" data-id="${order.id}" title="Редактировать"><i class="bi bi-pencil"></i></button>
                    <button class="action-btn delete-btn" data-id="${order.id}" title="Удалить"><i class="bi bi-trash"></i></button>
                </div>
            </div>
        `;
    });
    html += '</div>';
    container.innerHTML = html;

    document.querySelectorAll('.view-btn').forEach(btn => btn.addEventListener('click', () => showDetails(parseInt(btn.dataset.id))));
    document.querySelectorAll('.edit-btn').forEach(btn => btn.addEventListener('click', () => showEditForm(parseInt(btn.dataset.id))));
    document.querySelectorAll('.delete-btn').forEach(btn => btn.addEventListener('click', () => showDeleteConfirm(parseInt(btn.dataset.id))));
}

// --- Модальные окна ---
function showModal(content) {
    const overlay = document.getElementById('modal-overlay');
    document.getElementById('modal-body').innerHTML = content;
    overlay.style.display = 'flex';
    const closeBtn = overlay.querySelector('.modal-close');
    if (closeBtn) closeBtn.onclick = () => overlay.style.display = 'none';
    overlay.onclick = (e) => { if (e.target === overlay) overlay.style.display = 'none'; };
}
function hideModal() {
    document.getElementById('modal-overlay').style.display = 'none';
}

// Просмотр заказа
async function showDetails(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    await loadDishes();
    let itemsHtml = '';
    if (order.soup_id) itemsHtml += `<li>Суп: ${getDishName(order.soup_id)}</li>`;
    if (order.main_course_id) itemsHtml += `<li>Главное: ${getDishName(order.main_course_id)}</li>`;
    if (order.salad_id) itemsHtml += `<li>Салат: ${getDishName(order.salad_id)}</li>`;
    if (order.drink_id) itemsHtml += `<li>Напиток: ${getDishName(order.drink_id)}</li>`;
    if (order.dessert_id) itemsHtml += `<li>Десерт: ${getDishName(order.dessert_id)}</li>`;
    if (!itemsHtml) itemsHtml = '<li>Нет блюд</li>';
    const html = `
        <h3>Заказ #${order.id}</h3>
        <p><strong>Дата:</strong> ${new Date(order.created_at).toLocaleString('ru-RU')}</p>
        <p><strong>Клиент:</strong> ${escapeHtml(order.full_name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(order.email)}</p>
        <p><strong>Телефон:</strong> ${escapeHtml(order.phone)}</p>
        <p><strong>Адрес:</strong> ${escapeHtml(order.delivery_address)}</p>
        <p><strong>Доставка:</strong> ${formatDelivery(order)}</p>
        <p><strong>Комментарий:</strong> ${escapeHtml(order.comment || '—')}</p>
        <p><strong>Состав:</strong></p>
        <ul>${itemsHtml}</ul>
        <p><strong>Итого:</strong> ${calculatePrice(order)} ₽</p>
        <div class="modal-buttons"><button class="btn-modal-ok">Ок</button></div>
    `;
    showModal(html);
    document.querySelector('.btn-modal-ok').onclick = () => hideModal();
}

// Редактирование заказа (только поля клиента)
async function showEditForm(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    await loadDishes();
    const html = `
        <h3>Редактирование заказа #${order.id}</h3>
        <form id="edit-order-form">
            <div class="form-group"><label>Полное имя *</label><input type="text" name="full_name" value="${escapeHtml(order.full_name)}" required></div>
            <div class="form-group"><label>Email *</label><input type="email" name="email" value="${escapeHtml(order.email)}" required></div>
            <div class="form-group"><label>Телефон *</label><input type="tel" name="phone" value="${escapeHtml(order.phone)}" required></div>
            <div class="form-group"><label>Адрес *</label><input type="text" name="delivery_address" value="${escapeHtml(order.delivery_address)}" required></div>
            <div class="form-group">
                <label>Тип доставки</label>
                <div class="radio-option">
                    <label><input type="radio" name="delivery_type" value="now" ${order.delivery_type === 'now' ? 'checked' : ''}> Как можно скорее</label>
                    <label><input type="radio" name="delivery_type" value="by_time" ${order.delivery_type === 'by_time' ? 'checked' : ''}> В определенное время</label>
                </div>
            </div>
            <div class="form-group">
                <label>Время доставки</label>
                <input type="time" name="delivery_time" id="edit-delivery-time" value="${order.delivery_time || ''}" min="07:00" max="23:00" step="300" ${order.delivery_type === 'by_time' ? '' : 'disabled'}>
            </div>
            <div class="form-group"><label>Комментарий</label><textarea name="comment">${escapeHtml(order.comment || '')}</textarea></div>
            <div class="modal-buttons"><button type="submit" class="btn-save">Сохранить</button><button type="button" class="btn-cancel">Отмена</button></div>
        </form>
    `;
    showModal(html);
    const form = document.getElementById('edit-order-form');
    const radioNow = form.querySelector('input[value="now"]');
    const radioByTime = form.querySelector('input[value="by_time"]');
    const timeInput = form.querySelector('#edit-delivery-time');
    const toggle = () => { timeInput.disabled = !radioByTime.checked; if (!radioByTime.checked) timeInput.value = ''; };
    radioNow.addEventListener('change', toggle);
    radioByTime.addEventListener('change', toggle);
    toggle();

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fd = new FormData(form);
        const payload = {
            full_name: fd.get('full_name'),
            email: fd.get('email'),
            phone: fd.get('phone'),
            delivery_address: fd.get('delivery_address'),
            delivery_type: fd.get('delivery_type'),
            delivery_time: fd.get('delivery_time') || null,
            comment: fd.get('comment')
        };
        if (!payload.delivery_time) delete payload.delivery_time;
        try {
            const resp = await fetch(`https://edu.std-900.ist.mospolytech.ru/labs/api/orders/${order.id}?api_key=${API_KEY}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!resp.ok) throw new Error();
            const updated = await resp.json();
            // Обновляем локальный массив
            const idx = orders.findIndex(o => o.id === order.id);
            if (idx !== -1) orders[idx] = { ...orders[idx], ...payload };
            hideModal();
            showToast('Заказ успешно изменён', 'success');
            renderOrders();
        } catch {
            showToast('Ошибка при изменении заказа', 'error');
        }
    });
    form.querySelector('.btn-cancel').onclick = () => hideModal();
}

// Удаление заказа
function showDeleteConfirm(orderId) {
    const html = `
        <h3>Подтверждение удаления</h3>
        <p>Вы уверены, что хотите удалить заказ #${orderId}?</p>
        <div class="modal-buttons"><button class="btn-confirm-delete">Да</button><button class="btn-cancel-delete">Отмена</button></div>
    `;
    showModal(html);
    document.querySelector('.btn-confirm-delete').onclick = async () => {
        try {
            const resp = await fetch(`https://edu.std-900.ist.mospolytech.ru/labs/api/orders/${orderId}?api_key=${API_KEY}`, { method: 'DELETE' });
            if (!resp.ok) throw new Error();
            orders = orders.filter(o => o.id !== orderId);
            hideModal();
            showToast('Заказ удалён', 'success');
            renderOrders();
        } catch {
            showToast('Ошибка при удалении заказа', 'error');
        }
    };
    document.querySelector('.btn-cancel-delete').onclick = () => hideModal();
}

// Вспомогательные функции
function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[m]));
}

function showToast(msg, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `custom-notification ${type}`;
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// Инициализация
document.addEventListener('DOMContentLoaded', async () => {
    await loadDishes();
    await loadOrders();
    await renderOrders();
});