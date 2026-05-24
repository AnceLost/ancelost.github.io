// dishesData.js – единое хранилище и загрузчик блюд
let dishes = [];
let dishesLoaded = false;
let dishesLoadingPromise = null;

async function loadDishes(forceReload = false) {
    if (!forceReload && dishesLoaded && dishes.length) {
        return dishes;
    }
    // Предотвращаем повторные параллельные запросы
    if (dishesLoadingPromise) {
        return dishesLoadingPromise;
    }
    const apiUrl = 'https://edu.std-900.ist.mospolytech.ru/labs/api/dishes';
    dishesLoadingPromise = (async () => {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            dishes = data;
            dishesLoaded = true;
            return data;
        } catch (error) {
            console.error('Ошибка загрузки блюд:', error);
            showNotification('Не удалось загрузить меню. Попробуйте позже.');
            return [];
        } finally {
            dishesLoadingPromise = null;
        }
    })();
    return dishesLoadingPromise;
}
