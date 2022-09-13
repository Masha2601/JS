"use strict";

const basketCounterEl = document.querySelector('.menuLink2 span');
const basketTotalValueEl = document.querySelector('.basketTotalValue');
const basketEl = document.querySelector('.basket');
const basketTotalEl = document.querySelector('.basketTotal')

document.querySelector('.menuLink2').addEventListener('click', () => {
    basketEl.classList.toggle('hidden');
})

const basket = {};

document.querySelector('.catalog-item').addEventListener('click', event => {
    if (!event.target.closest('.addCard')) {
        return;
    }
  const itemFlexEl = event.target.closest('.itemFlex');
    const id = +itemFlexEl.dataset.id;
    const name = itemFlexEl.dataset.name;
    const price = +itemFlexEl.dataset.price;
    addCard(id,name,price);
});

function addCard(id,name,price) {
    if (!(id in basket)) {
        basket[id] = {id: id, name: name, price: price, count: 0};
    }
    basket[id].count++;
    basketCounterEl.textContent = getTotalCount().toString();
    basketTotalValueEl.textContent = getTotalBasketPrice().toFixed(2);
    renderProductInBasket(id);
}
function getTotalCount() {
    const productsArr = Object.values(basket);
    let count = 0;
    for (const product of productsArr ) {
        count += product.count;
    }
    return count;
    //return Object.values(basket).reduce((acc, product) =>  acc + product.count, 0);//
}
function getTotalBasketPrice() {
   return Object.values(basket).reduce((acc, product) => acc + product.count * product.price, 0)
}

function renderProductInBasket(id) {
    const basketRowEl = basketEl.querySelector(`.basketInside[data-id="${id}"]`);
    if (!basketRowEl){
        renderNewProductInBasket(id);
        return;
    }
    const product = basket[id];
    basketRowEl.querySelector('.productCount').textContent = basket[id].count;
    basketRowEl.querySelector('.productTotalRow').textContent = basket[id].count * basket[id].price;
}


function renderNewProductInBasket(productId) {
    const productRow = `
    <div class="basketInside" data-id="${productId}">
      <div>${basket[productId].name}</div>
      <div>
        <span class="productCount">${basket[productId].count}</span> шт.
      </div>
      <div>$${basket[productId].price}</div>
      <div>
        $<span class="productTotalRow">${(basket[productId].price * basket[productId].count).toFixed(2)}</span>
      </div>
    </div>
    `;
    basketTotalEl.insertAdjacentHTML("beforebegin", productRow);

    /*
    const productRow = `
    <div class="basketInside data-productId="${productId}">
    <div>${basket[productId].name}<div>
    <div>
    <span class="productCount">${basket[productId].count}<span> шт.
    <div>
    <div>${basket[productId].price}<div>
    <div>
    <span class="productTotalRow">${(basket[productId].price)*basket[productId].count}<span>
    <div>
    <div>
    `;
    basketTotalEl.insertAdjacentHTML('beforebegin',productRow);

     */
}