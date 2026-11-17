async function fetchkaarten() {
    try {
        const opgeslagenArtiesten = localStorage.getItem('artiesten');
        let artiesten = [];

        if (opgeslagenArtiesten) {
            artiesten = JSON.parse(opgeslagenArtiesten);
        } else {
            const response = await fetch('artiesten.json');
            if (!response.ok) {
                throw new Error('Kon het JSON-bestand niet laden');
            }
            artiesten = await response.json();

            localStorage.setItem('artiesten', JSON.stringify(artiesten));
        }

        const container = document.getElementById("kaart-container");
        container.innerHTML = "";

        artiesten.forEach(item => {
            const card = document.createElement('div');
            card.className = 'Musiccard';
            card.innerHTML = `
            <div class="bg-orange-100 border-[12px] border-[#D2B999] p-6 rounded-2xl h-full flex flex-col justify-between">
                <div class="w-3/4 aspect-square rounded-full border-[8px] border-black overflow-hidden mb-8 mx-auto relative">
                    <img src="${item.image_url}" alt="${item.artist}" class="w-full h-full object-cover rounded-full">
                </div>
                <div class="flex justify-between items-end mt-auto">
                    <div class="flex flex-col gap-1.5">
                        <span class="text-2xl font-extrabold text-black">${item.price.includes('€') ? item.price : '€' + item.price}</span>
                        <h3 class="text-xl font-bold text-black">${item.artist} - ${item.album}</h3>
                        <span class="text-sm text-gray-600 lowercase">${item.format}</span>
                    </div>
                    <button
                        class="winkelmandje-btn w-14 h-14 min-w-[3.5rem] min-h-[3.5rem] flex-shrink-0 bg-[#e5dac4] hover:bg-[#d8cbb1] rounded-full flex items-center justify-center text-black">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                            stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                    </button>
                </div>
            </div>
            `;

            const winkelbtn = card.querySelector(".winkelmandje-btn");
            winkelbtn.addEventListener('click', () => {
                let cart = JSON.parse(localStorage.getItem('webshop_cart')) || [];
                const bestaandItem = cart.find(cartItem => cartItem.artist === item.artist && cartItem.album === item.album);

                if (bestaandItem) {
                    bestaandItem.quantity += 1;
                } else {
                    cart.push({ ...item, quantity: 1 });
                }
                localStorage.setItem('webshop_cart', JSON.stringify(cart));

                alert(`${item.artist} - ${item.album} is toegevoegd aan je winkelmand!`);
            });

            container.append(card);
        });
    } catch (error) {
        console.error("Er is iets fout gegaan:", error);
    }
}

fetchkaarten();