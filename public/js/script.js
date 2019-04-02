
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
        return new Promise ((resolve, reject) => {
            sendRequest(`${API_URL}/catalogData.json`).then(answer => {
                this.items = answer;
                resolve();
            });
        });
    }

    render() {
        let listHtml = '';
        this.items.forEach(item => {
            const newItem = new Item(item.product_name, item.price);
            listHtml += newItem.render();
        });
        document.querySelector('.goods').innerHTML = listHtml;
    }

}

let itemList = new ItemList;

itemList.fetchItems().then(() => {
    itemList.render();
});




function sendRequest(url) {
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
/*


let butt = document.querySelector('.cartButton');
butt.addEventListener('click', () => {
    sendRequest(`${API_URL}/catalogData.json`).then((phones) => {
        let phonesString = phones.map(item => `<li>${item.name}: ${item.number}</li>`).join('');
        document.getElementById('phones').innerHTML = "<ul>" + phonesString + "</ul>";
    }/!*, onRejected => console.log(onRejected)   *!/)
})


let obj = new Vue({
    el: '#app',
    data: {
        names: ['Geek', 'Bud', 'Hobo', 'The Guy'],
        name1: 'Peter'
    },
    methods: {
        clickHandler() {
            console.log('click');
        }
    },
    computed: {
        upperCaseName() {
            return this.name1.toUpperCase();
        }
    },
});

*/
