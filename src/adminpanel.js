async function haalDataOp() {
    const opgeslagen = localStorage.getItem('artiesten');
    if (opgeslagen) {
        return JSON.parse(opgeslagen);
    } else {
        try {
            const res = await fetch('artiesten.json');
            const data = await res.json();
            localStorage.setItem('artiesten', JSON.stringify(data));
            return data;
        } catch (e) {
            console.error("Fout bij laden JSON:", e);
            return [];
        }
    }
}
async function laadTabel() {
    const artiesten = await haalDataOp();
    const tabel = document.getElementById('productTabel');
    tabel.innerHTML = '';

    artiesten.forEach(item => {
        const tr = document.createElement('tr');
        tr.className = 'hover:bg-gray-50';
        tr.innerHTML = `
                    <td class="p-3 font-bold">${item.id}</td>
                    <td class="p-3"><img src="${item.image_url}" class="w-12 h-12 object-cover rounded-lg border border-gray-300" alt="${item.artist}"></td>
                    <td class="p-3 font-semibold">${item.artist}</td>
                    <td class="p-3">${item.album}</td>
                    <td class="p-3 font-semibold text-green-700">${item.price}</td>
                    <td class="p-3"><span class="bg-gray-100 text-xs px-2 py-1 rounded-md border">${item.format}</span></td>
                    <td class="p-3 text-right flex gap-2 justify-end">
                        <button onclick="openBewerken(${item.id})" class="px-3 py-1 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition">Bewerken</button>
                        <button onclick="verwijderItem(${item.id})" class="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">Verwijderen</button>
                    </td>
                `;
        tabel.appendChild(tr);
    });
}
async function verwijderItem(id) {
    if (confirm("Weet je zeker dat je dit product wilt verwijderen uit de lijst?")) {
        let artiesten = await haalDataOp();
        artiesten = artiesten.filter(item => item.id !== id);
        localStorage.setItem('artiesten', JSON.stringify(artiesten));
        laadTabel();
    }
}

async function openBewerken(id) {
    const artiesten = await haalDataOp();
    const item = artiesten.find(a => a.id === id);

    if (item) {
        document.getElementById('edit-id').value = item.id;
        document.getElementById('edit-artist').value = item.artist;
        document.getElementById('edit-album').value = item.album;
        document.getElementById('edit-price').value = item.price;
        document.getElementById('edit-format').value = item.format;
        document.getElementById('edit-image').value = item.image_url;

        document.getElementById('editModal').classList.remove('hidden');
    }
}

document.getElementById('editForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const id = parseInt(document.getElementById('edit-id').value);
    let artiesten = await haalDataOp();

    const index = artiesten.findIndex(a => a.id === id);
    if (index !== -1) {
        artiesten[index] = {
            id: id,
            artist: document.getElementById('edit-artist').value,
            album: document.getElementById('edit-album').value,
            price: document.getElementById('edit-price').value,
            format: document.getElementById('edit-format').value,
            image_url: document.getElementById('edit-image').value
        };

        localStorage.setItem('artiesten', JSON.stringify(artiesten));
        document.getElementById('editModal').classList.add('hidden');
        laadTabel();
    }
});

document.getElementById('cancelBtn').addEventListener('click', () => {
    document.getElementById('editModal').classList.add('hidden');
});

document.getElementById('resetBtn').addEventListener('click', () => {
    if (confirm("Wil je de aanpassingen wissen en terugzetten naar het originele artiesten.json bestand?")) {
        localStorage.removeItem('artiesten');
        laadTabel();
    }
});

laadTabel();