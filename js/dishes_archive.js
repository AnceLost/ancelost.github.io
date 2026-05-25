const dishes = [
    //  СУПЫ 
    // рыбные (2)
    {
        keyword: "fish_soup_1",
        name: "Уха из лосося",
        price: 290,
        category: "soup",
        kind: "fish",
        count: "350 г",
        image: "static/img/"
    },
    {
        keyword: "fish_soup_2",
        name: "Суп с фрикадельками из трески",
        price: 270,
        category: "soup",
        kind: "fish",
        count: "330 г",
        image: "static/img/"
    },
    // мясные (2)
    {
        keyword: "meat_soup_1",
        name: "Солянка мясная сборная",
        price: 250,
        category: "soup",
        kind: "meat",
        count: "350 г",
        image: "static/img/"
    },
    {
        keyword: "meat_soup_2",
        name: "Борщ с говядиной",
        price: 260,
        category: "soup",
        kind: "meat",
        count: "380 г",
        image: "static/img/"
    },
    // вегетарианские (2)
    {
        keyword: "veg_soup_1",
        name: "Сливочный суп с тыквой",
        price: 210,
        category: "soup",
        kind: "veg",
        count: "280 г",
        image: "static/img/"
    },
    {
        keyword: "veg_soup_2",
        name: "Крем-суп из белых грибов",
        price: 230,
        category: "soup",
        kind: "veg",
        count: "300 г",
        image: "static/img/"
    },

    //  ГЛАВНЫЕ БЛЮДА 
    // рыбные (2)
    {
        keyword: "fish_main_1",
        name: "Рис с лососем на пару",
        price: 450,
        category: "main",
        kind: "fish",
        count: "360 г",
        image: "static/img/"
    },
    {
        keyword: "fish_main_2",
        name: "Стейк из палтуса с овощами",
        price: 490,
        category: "main",
        kind: "fish",
        count: "400 г",
        image: "static/img/"
    },
    // мясные (2)
    {
        keyword: "meat_main_1",
        name: "Тефтели в томатном соусе с пюре",
        price: 310,
        category: "main",
        kind: "meat",
        count: "420 г",
        image: "static/img/"
    },
    {
        keyword: "meat_main_2",
        name: "Паста Болоньезе с пармезаном",
        price: 340,
        category: "main",
        kind: "meat",
        count: "400 г",
        image: "static/img/"
    },
    // вегетарианские (2)
    {
        keyword: "veg_main_1",
        name: "Куриная грудка с киноа (замена на тофу)",
        price: 320,
        category: "main",
        kind: "veg",
        count: "380 г",
        image: "static/img/"
    },
    {
        keyword: "veg_main_2",
        name: "Рататуй с киноа",
        price: 290,
        category: "main",
        kind: "veg",
        count: "370 г",
        image: "static/img/"
    },

    //  САЛАТЫ И СТАРТЕРЫ (новая категория) 
    // рыбные (1)
    {
        keyword: "fish_salad_1",
        name: "Салат с креветками и авокадо",
        price: 350,
        category: "salad",
        kind: "fish",
        count: "250 г",
        image: "static/img/"
    },
    // мясные (1)
    {
        keyword: "meat_salad_1",
        name: "Цезарь с курицей",
        price: 280,
        category: "salad",
        kind: "meat",
        count: "270 г",
        image: "static/img/"
    },
    // вегетарианские (4)
    {
        keyword: "veg_salad_1",
        name: "Греческий салат",
        price: 240,
        category: "salad",
        kind: "veg",
        count: "250 г",
        image: "static/img/"
    },
    {
        keyword: "veg_salad_2",
        name: "Салат с рукколой и помидорами",
        price: 210,
        category: "salad",
        kind: "veg",
        count: "200 г",
        image: "static/img/"
    },
    {
        keyword: "veg_salad_3",
        name: "Овощной тартар",
        price: 230,
        category: "salad",
        kind: "veg",
        count: "220 г",
        image: "static/img/"
    },
    {
        keyword: "veg_salad_4",
        name: "Салат с киноа и огурцом",
        price: 220,
        category: "salad",
        kind: "veg",
        count: "230 г",
        image: "static/img/"
    },

    //  НАПИТКИ 
    // холодные (3)
    {
        keyword: "cold_drink_1",
        name: "Клюквенный морс",
        price: 120,
        category: "drink",
        kind: "cold",
        count: "300 мл",
        image: "static/img/"
    },
    {
        keyword: "cold_drink_2",
        name: "Домашний лимонад",
        price: 140,
        category: "drink",
        kind: "cold",
        count: "350 мл",
        image: "static/img/"
    },
    {
        keyword: "cold_drink_3",
        name: "Компот из сухофруктов",
        price: 90,
        category: "drink",
        kind: "cold",
        count: "250 мл",
        image: "static/img/"
    },
    // горячие (3)
    {
        keyword: "hot_drink_1",
        name: "Чай чёрный с бергамотом",
        price: 80,
        category: "drink",
        kind: "hot",
        count: "250 мл",
        image: "static/img/"
    },
    {
        keyword: "hot_drink_2",
        name: "Капучино",
        price: 150,
        category: "drink",
        kind: "hot",
        count: "200 мл",
        image: "static/img/"
    },
    {
        keyword: "hot_drink_3",
        name: "Горячий шоколад",
        price: 160,
        category: "drink",
        kind: "hot",
        count: "250 мл",
        image: "static/img/"
    },

    //  ДЕСЕРТЫ (новая категория) 
    // маленькая порция (3)
    {
        keyword: "small_dessert_1",
        name: "Панна котта с ягодным соусом",
        price: 180,
        category: "dessert",
        kind: "small",
        count: "120 г",
        image: "static/img/"
    },
    {
        keyword: "small_dessert_2",
        name: "Чизкейк Нью-Йорк",
        price: 190,
        category: "dessert",
        kind: "small",
        count: "130 г",
        image: "static/img/"
    },
    {
        keyword: "small_dessert_3",
        name: "Тирамису",
        price: 200,
        category: "dessert",
        kind: "small",
        count: "120 г",
        image: "static/img/"
    },
    // средняя порция (2)
    {
        keyword: "medium_dessert_1",
        name: "Брауни с мороженым",
        price: 250,
        category: "dessert",
        kind: "medium",
        count: "180 г",
        image: "static/img/"
    },
    {
        keyword: "medium_dessert_2",
        name: "Яблочный штрудель",
        price: 230,
        category: "dessert",
        kind: "medium",
        count: "170 г",
        image: "static/img/"
    },
    // большая порция (1)
    {
        keyword: "large_dessert_1",
        name: "Медовик (большая порция)",
        price: 300,
        category: "dessert",
        kind: "large",
        count: "250 г",
        image: "static/img/"
    }
];

async function loadDishes(forceReload = false){}