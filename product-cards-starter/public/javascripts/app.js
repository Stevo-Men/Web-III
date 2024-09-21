console.log("Hello World");
const cards = document.querySelectorAll("[data-price]");

for (const card of cards) {
    card.addEventListener("click", (event) => {
        const target = event.currentTarget;
        const price = parseFloat(target.dataset.price);
       // const priceElem = target.querySelector(".product-card__price");
       // const price = priceElem.textContent;
        console.log(price)
    });
}

