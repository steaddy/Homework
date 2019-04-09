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
        let filteredItems = []; // чтобы не забыть потом сделать поиск товаров
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

/*

 // Пример с Fetch()


 let list = document.querySelector('#phones ul');

 fetch(`http://localhost:3000/users`)
 .then((response) => response.json())
 .then((response) => {
 list.innerHTML = response.map(item =>
 `<li data-id="${item.id}">Name: ${item.name}, number: ${item.phoneNumber}.</li>` // вставили пользовательский id чтобы по нему удалять элементы списка телефонов
 ).join('')
 })













 // Загрузка на сервер пользователей и их удаление


 class User {
 constructor(name, number, id) {
 this.id = id;
 this.name = name;
 this.number = number;
 }

 render() {
 return `<li>${this.name}: ${this.number}</li>`;
 }
 }

 class UsersList {
 constructor() {
 this.users = [];
 this.filteredUsers = [];
 }

 getUsers(url = `http://localhost:3000/users`) {
 return fetch(url)
 .then((response) => response.json())
 .then((response) => {
 this.users = response.map(item => new User(item.name, item.phoneNumber, item.id));
 this.filteredUsers = this.users;
 console.log(this.filteredUsers);
 })
 }

 addUser(url = `http://localhost:3000/users`, name, number) {

 }

 deleteUser(url = `http://localhost:3000/users`, id) {

 }

 filterUsers(query) {
 let regexp = new RegExp(query, 'i');
 this.filteredUsers = this.users.filter((item) => regexp.test(item.name));
 }

 render(elementId) {
 let element = document.querySelector(`#${elementId}`);
 element.innerHTML = this.filteredUsers.map(item => item.render()).join('');
 }
 }

 // Обрабатываем событие, фильтруем список пользователей на клиентской стороне
 let searchButton = document.querySelector('#searchbutton');
 searchButton.addEventListener('click', () => {
 let searchQuery = document.querySelector('#searchquery').value;
 newUsers.filterUsers(searchQuery);
 newUsers.render(`newList`);
 });

 // Получаем и отображаем список пользователей с сервера при загрузке страницы
 let newUsers = new UsersList();
 newUsers.getUsers().then(() => {
 newUsers.render(`newList`);
 });



 let uploadButt = document.querySelector('#butt');
 let forDel = document.querySelector('#phones');

 forDel.addEventListener('click', (event) => {
 let id = event.target.dataset.id;
 fetch(`http://localhost:3000/users/${id}`, {
 method: 'DELETE',
 }).then(() => {
 console.log(id);
 console.log(event.target);
 event.target.parentElement.removeChild(event.target);
 });
 })


 uploadButt.addEventListener('click', () => {
 let name = prompt('Enter your name.');
 let phone = prompt('Enter your phone.');

 fetch(`http://localhost:3000/users`, {
 method: 'POST',
 body: JSON.stringify({name: name, phoneNumber: phone}),
 headers: {'Content-Type': 'application/json'}
 }).then((response) => response.json())   // Оказывается POST возвращает в промисе  отправленный нами объект
 // нужно только узнать он его с сервера берет или нет.
 .then((user) => {               // через еще один then возвращаем распаршеный объект и отображаем его в html
 list.innerHTML +=
 `<li data-id="${user.id}">Name: ${user.name}, number: ${user.phoneNumber}.</li>`;  // вставили пользовательский id чтобы по нему удалять элементы списка телефонов
 })
 });

 function usersQuery(url) {
 return fetch((url), {
 method: 'GET',
 }).then((response) => response.json());
 }

 usersQuery(`http://localhost:3000/users`).then((users) => {
 console.log(users);
 });
 */


let butt = document.querySelector('.cartButton');
butt.addEventListener('click', () => {
    sendRequest(`${API_URL}/catalogData.json`).then((phones) => {
        let phonesString = phones.map(item => `<li>${item.name}: ${item.number}</li>`).join('');
        document.getElementById('phones').innerHTML = "<ul>" + phonesString + "</ul>";
    }/*, onRejected => console.log(onRejected)   */)
})


// Lesson 5

let app1 = new Vue({
    el: '#app',
    data: {
        name: '',
        goods: ['One good', 'Another good', 'The last one'],
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

