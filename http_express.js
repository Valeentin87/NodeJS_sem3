// Напишите HTTP сервер на express и реализуйте два обработчика “/” и “/about”, где:

// — На каждой странице реализован счетчик просмотров
// — Значение счетчика необходимо сохранять в файл каждый раз, когда обновляется страница
// — Также значение счетчика должно загружаться из файла, когда запускается обработчик страницы
// — Таким образом счетчик не должен обнуляться каждый раз, когда перезапускается сервер.

const express = require('express');
const fs = require('fs');

const app = express();

let count1 = 0;
let count2 = 0;
let currentCount = 0;
let countData = null;
let jsonStr = null;
const mainPage = '/';
const aboutPage = '/about';

const getCountData = function() {
    return require('./counts.json');
}


app.get(`${mainPage}`, (req, res) => {
    countData = getCountData();
    currentCount = countData['mainPage']['count'];
    currentCount = Number(currentCount) + 1;
    countData['mainPage']['count'] = currentCount;
    jsonStr = JSON.stringify(countData);

    try {
        fs.writeFileSync('./counts.json', jsonStr);
        console.log('Файл с данными о счётчиках перезаписан', `обновлен счётчик страницы "${mainPage}" его значение теперь равно ${currentCount}`);
    }
    catch(err) {
        console.error(err);
    };
    res.send(`<h1> Добро пожаловать !!! Ниже ссылка на вторую страницу Cчётчик равен ${currentCount}</h1> <a href="http://127.0.0.1:3000/about">About</a>`)
    res.status(404).send('Sorry, cant find that');
    
})

app.get(`${aboutPage}`, (req, res) => {
    countData = getCountData();
    currentCount = countData['aboutPage']['count'];
    currentCount = Number(currentCount) + 1;
    countData['aboutPage']['count'] = currentCount;
    jsonStr = JSON.stringify(countData);

    try {
        fs.writeFileSync('./counts.json', jsonStr);
        console.log('Файл с данными о счётчиках перезаписан', `обновлен счётчик страницы "${aboutPage}" его значение теперь равно ${currentCount}`);
    }
    catch(err) {
        console.error(err);
    };

    res.send(`<h1> Добро пожаловать !!! Ниже ссылка на первую страницу. Cчётчик равен ${currentCount}</h1> <a href="http://127.0.0.1:3000/">Main</a>`)
    res.status(404).send('Sorry, cant find that');
})

app.listen(3000, () => {
    console.log('Сервер запущен на порту 3000');
});


