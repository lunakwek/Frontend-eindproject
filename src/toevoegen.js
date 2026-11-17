// Functie om de huidige lijst van artiesten op te halen
async function haalArtiestop() {
    let opslag = localStorage.getItem('artiesten');

    if (opslag) {
        return JSON.parse(opslag);
    } else {
        try {
            const response = await fetch('artiesten.json');
            const data = await response.json();
            return data;
        } catch (fout) {
            console.error("Kon artiesten.json niet laden:", fout);
            return [];
        }
    }
}

document.getElementById('productForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    let artiesten = await haalArtiestop();
    const nieuwId = artiesten.length > 0 ? Math.max(...artiesten.map(a => a.id)) + 1 : 1;
    const nieuwItem = {
        id: nieuwId,
        artist: document.getElementById('artist').value,
        album: document.getElementById('album').value,
        price: document.getElementById('price').value,
        format: document.getElementById('format').value,
        image_url: document.getElementById('image_url').value
    };

    artiesten.push(nieuwItem);
    localStorage.setItem('artiesten', JSON.stringify(artiesten));

    alert(`"${nieuwItem.artist}" is succesvol toegevoegd!`);
    this.reset();
});