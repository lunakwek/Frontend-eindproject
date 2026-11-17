function toonwinkelmand() {
    const container = document.getElementById("winkelmand-container")
    const totaalprijsdiv = document.getElementById("totaal-prijs")
    const cart = JSON.parse(localStorage.getItem('webshop_cart')) || [];

    if (cart.length === 0) {
        container.innerHTML = "<p class='text-gray-600 text-center py-8'>Je winkelmandje is nog leeg.</p>";
        if (totaalprijsdiv) totaalprijsdiv.textContent = "$0.00";
        return;
    }
    container.innerHTML = "";
    let totaalPrijs = 0;
    cart.forEach(item => {
        const card = document.createElement('div');
        card.className = 'Musiccard';
        card.innerHTML = `
            <div class="flex items-center gap-4">
                <img src="${item.image_url}" alt="${item.artist}" class="w-16 h-16 object-cover rounded-full border border-black">
                <div>
                    <h3 class="font-bold text-lg">${item.artist}</h3>
                    <p class="text-sm text-gray-600">${item.album} (${item.format})</p>
                </div>
            </div>
            <div class="text-right">
                <span class="block font-semibold">${item.price}</span>
            </div>
        `
        container.appendChild(card);
    });
    if (totaalprijsdiv) {
        totaalprijsdiv.textContent = `€${totaalPrijs.toFixed(2)}`;
    }
}

document.addEventListener('DOMContentLoaded', toonwinkelmand);