const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class Item {
    constructor(name, price, imgURL = 'img/noImg.png', className = 'item') {
        this.name = name;
        this.price = price;
        this.imgURL = imgURL;
        this.className = className;
    }

    render() {
        return `<div class='${this.className}'><h3>${this.name}</h3><span>${this.price}</span><br><img src="${this.imgURL}" alt="Our Item"></div>`;
    }
}

class ItemList {
    constructor() {
        let items = [];
        let total = 0;
    }

    fetchItems() {
        return newSendRequest(`http://localhost:3000/products.json`).then((answer) => {
            this.items = answer.map(arrayElement => new Item(arrayElement.name, arrayElement.price));
            //return this.items;
        })
    }


    render() {
        let listHtml = '';

        this.items.forEach(item => {
            listHtml += item.render();
        });
        document.querySelector('.goods').innerHTML = listHtml;
    }
}



let itemList = new ItemList;
itemList.fetchItems().then(() => itemList.render());


function newSendRequest(url) {
    return new Promise((resolve, reject) => {
        let xhr1 = new XMLHttpRequest();
        xhr1.open('GET', url);
        xhr1.send();
        xhr1.onreadystatechange = () => {
            if (xhr1.readyState === XMLHttpRequest.DONE) {
                if (xhr1.status === 200) {
                    resolve((JSON.parse(xhr1.responseText)));
                } else {
                    reject();
                }
            }
        };
    })
}


// Пример с Fetch()


let list = document.querySelector('#phones ul');

fetch(`http://localhost:3000/phones.json`)
    .then((response) => response.json())
    .then((response) => {
        list.innerHTML = response.map(item =>
            `<li>Name: ${item.name}, number: ${item.number}.</li>`
        ).join('')
    })









/*
 let butt = document.querySelector('.cartButton');
 butt.addEventListener('click', () => {
 sendRequest(`${API_URL}/catalogData.json`).then((phones) => {
 let phonesString = phones.map(item => `<li>${item.name}: ${item.number}</li>`).join('');
 document.getElementById('phones').innerHTML = "<ul>" + phonesString + "</ul>";
 }/!*, onRejected => console.log(onRejected)   *!/)
 })


 // Lesson 5

 let app = new Vue({
 el: '#app',
 data: {
 goods: [],
 filteredGoods: [],
 searchLine: '',
 },
 methods: {

 sendRequest(url) {
 return new Promise((resolve, reject) => {
 let xhr = new XMLHttpRequest();
 xhr.open('GET', url, true);
 xhr.send();
 xhr.onreadystatechange = () => {
 if (xhr.readyState === 4) {
 resolve(JSON.parse(xhr.responseText));
 }
 }
 })
 }


 },

 mounted() {
 sendRequest(`${API_URL}/catalogData.json`).then(answer => {
 this.goods = answer;
 this.filteredGoods = answer;
 });
 }
 });

 */
