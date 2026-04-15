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
        image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=350&fit=crop"
    },
    {
        keyword: "fish_soup_2",
        name: "Суп с фрикадельками из трески",
        price: 270,
        category: "soup",
        kind: "fish",
        count: "330 г",
        image: "https://images.unsplash.com/photo-1581349485609-78e4d0e1d58d?w=400&h=350&fit=crop"
    },
    // мясные (2)
    {
        keyword: "meat_soup_1",
        name: "Солянка мясная сборная",
        price: 250,
        category: "soup",
        kind: "meat",
        count: "350 г",
        image: "https://images.unsplash.com/photo-1581349485609-78e4d0e1d58d?w=400&h=350&fit=crop"
    },
    {
        keyword: "meat_soup_2",
        name: "Борщ с говядиной",
        price: 260,
        category: "soup",
        kind: "meat",
        count: "380 г",
        image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=350&fit=crop"
    },
    // вегетарианские (2)
    {
        keyword: "veg_soup_1",
        name: "Сливочный суп с тыквой",
        price: 210,
        category: "soup",
        kind: "veg",
        count: "280 г",
        image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=350&fit=crop"
    },
    {
        keyword: "veg_soup_2",
        name: "Крем-суп из белых грибов",
        price: 230,
        category: "soup",
        kind: "veg",
        count: "300 г",
        image: "https://images.unsplash.com/photo-1576872381149-7847515ce5d8?w=400&h=350&fit=crop"
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
        image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&h=350&fit=crop"
    },
    {
        keyword: "fish_main_2",
        name: "Стейк из палтуса с овощами",
        price: 490,
        category: "main",
        kind: "fish",
        count: "400 г",
        image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=350&fit=crop"
    },
    // мясные (2)
    {
        keyword: "meat_main_1",
        name: "Тефтели в томатном соусе с пюре",
        price: 310,
        category: "main",
        kind: "meat",
        count: "420 г",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=350&fit=crop"
    },
    {
        keyword: "meat_main_2",
        name: "Паста Болоньезе с пармезаном",
        price: 340,
        category: "main",
        kind: "meat",
        count: "400 г",
        image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=400&h=350&fit=crop"
    },
    // вегетарианские (2)
    {
        keyword: "veg_main_1",
        name: "Куриная грудка с киноа (замена на тофу)",
        price: 320,
        category: "main",
        kind: "veg",
        count: "380 г",
        image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=350&fit=crop"
    },
    {
        keyword: "veg_main_2",
        name: "Рататуй с киноа",
        price: 290,
        category: "main",
        kind: "veg",
        count: "370 г",
        image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=350&fit=crop"
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
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=350&fit=crop"
    },
    // мясные (1)
    {
        keyword: "meat_salad_1",
        name: "Цезарь с курицей",
        price: 280,
        category: "salad",
        kind: "meat",
        count: "270 г",
        image: "https://images.unsplash.com/photo-1550304943-4f24f54dd8f9?w=400&h=350&fit=crop"
    },
    // вегетарианские (4)
    {
        keyword: "veg_salad_1",
        name: "Греческий салат",
        price: 240,
        category: "salad",
        kind: "veg",
        count: "250 г",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=350&fit=crop"
    },
    {
        keyword: "veg_salad_2",
        name: "Салат с рукколой и помидорами",
        price: 210,
        category: "salad",
        kind: "veg",
        count: "200 г",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=350&fit=crop"
    },
    {
        keyword: "veg_salad_3",
        name: "Овощной тартар",
        price: 230,
        category: "salad",
        kind: "veg",
        count: "220 г",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=350&fit=crop"
    },
    {
        keyword: "veg_salad_4",
        name: "Салат с киноа и огурцом",
        price: 220,
        category: "salad",
        kind: "veg",
        count: "230 г",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=350&fit=crop"
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
        image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400&h=350&fit=crop"
    },
    {
        keyword: "cold_drink_2",
        name: "Домашний лимонад",
        price: 140,
        category: "drink",
        kind: "cold",
        count: "350 мл",
        image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=350&fit=crop"
    },
    {
        keyword: "cold_drink_3",
        name: "Компот из сухофруктов",
        price: 90,
        category: "drink",
        kind: "cold",
        count: "250 мл",
        image: "https://images.unsplash.com/photo-1551030173-1220ae47b2a9?w=400&h=350&fit=crop"
    },
    // горячие (3)
    {
        keyword: "hot_drink_1",
        name: "Чай чёрный с бергамотом",
        price: 80,
        category: "drink",
        kind: "hot",
        count: "250 мл",
        image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&h=350&fit=crop"
    },
    {
        keyword: "hot_drink_2",
        name: "Капучино",
        price: 150,
        category: "drink",
        kind: "hot",
        count: "200 мл",
        image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=350&fit=crop"
    },
    {
        keyword: "hot_drink_3",
        name: "Горячий шоколад",
        price: 160,
        category: "drink",
        kind: "hot",
        count: "250 мл",
        image: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=400&h=350&fit=crop"
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
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=350&fit=crop"
    },
    {
        keyword: "small_dessert_2",
        name: "Чизкейк Нью-Йорк",
        price: 190,
        category: "dessert",
        kind: "small",
        count: "130 г",
        image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=350&fit=crop"
    },
    {
        keyword: "small_dessert_3",
        name: "Тирамису",
        price: 200,
        category: "dessert",
        kind: "small",
        count: "120 г",
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=350&fit=crop"
    },
    // средняя порция (2)
    {
        keyword: "medium_dessert_1",
        name: "Брауни с мороженым",
        price: 250,
        category: "dessert",
        kind: "medium",
        count: "180 г",
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=350&fit=crop"
    },
    {
        keyword: "medium_dessert_2",
        name: "Яблочный штрудель",
        price: 230,
        category: "dessert",
        kind: "medium",
        count: "170 г",
        image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=350&fit=crop"
    },
    // большая порция (1)
    {
        keyword: "large_dessert_1",
        name: "Медовик (большая порция)",
        price: 300,
        category: "dessert",
        kind: "large",
        count: "250 г",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1c958e?w=400&h=350&fit=crop"
    }
];