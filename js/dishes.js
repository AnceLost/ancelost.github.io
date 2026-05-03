
let dishes = [];

async function loadDishes() {
    const apiUrl = 'https://edu.std-900.ist.mospolytech.ru/labs/api/dishes';
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ошибка загрузки блюд:', error);
        // Показываем уведомление пользователю
        showNotification('Не удалось загрузить меню. Попробуйте позже.');
        return [];
    }
}