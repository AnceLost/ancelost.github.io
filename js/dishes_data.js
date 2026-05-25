
let dishes = [];
let dishesLoaded = false;
let dishesLoadingPromise = null;
const API_KEY = 'ad022de8-6304-41f5-ba38-71161ad583b2';

async function loadDishes(forceReload = false) {
    if (!forceReload && dishesLoaded && dishes.length) {
        return dishes;
    }
    // Предотвращаем повторные параллельные запросы
    if (dishesLoadingPromise) {
        return dishesLoadingPromise;
    }
    const apiUrl = 'https://edu.std-900.ist.mospolytech.ru/labs/api/dishes?api_key=${API_KEY}';
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
