/*
 const listItems = [
 {name: 'dress', price: 100},
 {name: 'pants', price: 120},
 {name: 'shoes', price: 200},
 {name: 'hat', price: 70},
 ];

 const itemHTML = function ({name, price, imgURL = 'img/noImg.png'}) {
 return `<div class='item'><h3>${name}</h3><span>${price}</span><br><img src="${imgURL}" alt="Our Item"></div>`;
 };

 document.querySelector('.goods').innerHTML = listItems.map(itemHTML).join('');
 */


// Lesson 2

/*


 let Container = function (tagName, className = '', idName = '') {
 this.tag = tagName;
 this.class = className;
 this.id = idName;

 };

 Container.prototype.render = function () {
 return `<${this.tagName} class="${this.className}" id="${this.idName}">
 Hi!</${this.tagName}>`;
 };


 let obj = new Container('div', 'myClass');
 document.querySelector('.goods').innerHTML = obj.render();

 */


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
        this.items = [
            {name: 'dress', price: 100},
            {name: 'pants', price: 120},
            {name: 'shoes', price: 200},
            {name: 'hat', price: 70},
            {name: 'sweatshirt', price: 300},
        ];
    }

    render() {
        let listHtml = '';
        let total = 0;
        this.items.forEach(item => {
            const newItem = new Item(item.name, item.price);
            listHtml += newItem.render();
            total += item.price;
        });
        this.total = total;
        document.querySelector('.goods').innerHTML = listHtml;
    }

    totalRender() {
        let el = document.createElement('div');
        el.innerHTML = `<div>(This will be rendered into the cart) <span style="font-weight: bold">Total: ${this.total} rub</span></div>`;
        document.querySelector('.headerStyle').appendChild(el);
    }
}

let itemList = new ItemList;

itemList.fetchItems();
itemList.render();
itemList.totalRender();


// Lesson 3

let xhr;

if(window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
} else if(window.ActiveXObject) {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
}

xhr.onreadystatechange = function() {
    if(xhr.readyState === XMLHttpRequest.DONE) {

    }
};

xhr.open('GET', 'http://localhost:3000/', true);

xhr.timeout = 15000;

xhr.ontimeout = function() {

};

xhr.send();