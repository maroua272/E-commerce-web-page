function loadHTML(elementId, fileName, elementSelector) {
    fetch(fileName)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const elementContent = doc.querySelector(elementSelector).innerHTML;
            document.getElementById(elementId).innerHTML = elementContent;
        })
        .catch(error => console.error('Error loading HTML file:', error));
}

document.addEventListener("DOMContentLoaded", function() {
    loadHTML('head', '/acceuil/accueil.html', '#nav-content');
    loadHTML('foot', '/acceuil/accueil.html', '#footer-content');

});

//-------------------------------------------------------------------------------------//

function AjoutPrd(id) {
    // Load existing cart items from localStorage
    let card = JSON.parse(localStorage.getItem('card')) || [];

    // Check if the product is already in the cart
    let existingItem = card.find(item => item.id === id);
    if (existingItem) {
        existingItem.count++; // Increment quantity if already in cart
    } else {
        // Fetch the product details from allCoffees based on id
        let product = allCoffees.find(item => item.id === id);
        if (product) {
            card.push({
                id: product.id,
                nom: product.nom,
                prix: product.prix,
                img: product.img,
                count: 1
            });
        }
    }

    // Save updated cart back to localStorage
    localStorage.setItem('card', JSON.stringify(card));

    // Optionally, update the UI of panier.html here (if you want to display the cart immediately)
    // Example: window.location.href = 'panier.html'; // Redirect to cart page
}
