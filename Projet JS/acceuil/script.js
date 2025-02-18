function ClickonMenu() {
    const menu = document.querySelector('.nav-responsive-menu');
    menu.classList.toggle('menu-open');
}
//---------------------------------------------------------//
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
    loadHTML('header', '/acceuil/accueil.html', '#nav-content');
    loadHTML('footer', '/acceuil/accueil.html', '#footer-content');
    loadHTML('head', '/acceuil/accueil.html', '#nav-content');
    loadHTML('foot', '/acceuil/accueil.html', '#footer-content');
    loadHTML('head-er', '/acceuil/accueil.html', '#nav-content');
    loadHTML('foot-er', '/acceuil/accueil.html', '#footer-content');
    loadHTML('navbar', '/acceuil/accueil.html', '#nav-content');
    loadHTML('navbar-f', '/acceuil/accueil.html', '#footer-content');
});

//---------------------------------------------------//
// function loadData(){

//   $.ajax({
//       url:'accueil.json',
//       success: function(crds){
//       //  checkB=document.querySelectorAll('input[name="c"]');
//           for(let i=0;i<crds.length;i++){
              
//               $("#data").append(`
//               <div class='cards'>
//                   <div class='img'><img src="${crds[i].img}"></div>
//                   <div class='t'>
//                       <div class='nom'>${crds[i].nom}</div>
//                       <div class='btn-prix'>
//                           <div class='prix'>${crds[i].prix}DH</div>
//                           <div class='btn'><input type='number' value='0' id='pp' class='plus' min='1' max='100' ><button type='submit' class='add' onclick='AjoutPrd(${crds[i].id})'><i class="fa fa-cart-plus"></i></button></div>
//                       </div>
//                   </div>
//               </div>
//               `)
//           }
//       }
//   });
// }

// loadData();
//-------------------------------------------------------------------------------------//


//------------------------------------------------------------------------------------//
$(document).ready(function() {
    function loadData(filePath) {
        console.log("Loading data from: " + filePath); // Debugging output
        $.ajax({
            url: filePath,
            success: function(crds) {
                $("#data").empty();
                for(let i = 0; i < crds.length; i++) {
                    $("#data").append(`
                        <div class='cards'>
                            <div class='img'><img src="${crds[i].img}"></div>
                            <div class='t'>
                                <div class='nom'>${crds[i].nom}</div>
                                <div class='btn-prix'>
                                    <div class='prix'>${crds[i].prix} DH</div>
                                    <div class='btn'>
                                        <input type='number' value='1' id='pp' class='plus' min='1' max='100'>
                                        <button type='submit' class='add' onclick='AjoutPrd(${crds[i].id})'>
                                            <i class="fa fa-cart-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `);
                }
            },
            error: function(xhr, status, error) {
                console.log("Error loading data: ", error);
            }
        });
    }

    $('#coffee').on('change', function() {
        var selectedCoffee = $(this).val();
        console.log("Selected coffee: " + selectedCoffee); 
        if (selectedCoffee === "bean") {
            loadData('accueil.json');
        } else if (selectedCoffee === "green") {
            loadData('menu2.json'); 
        } else if(selectedCoffee === "instant"){
            loadData('menu3.json');
        } else {
            $("#data").empty();
        }
    });
    //--------------------------------------------------------------//
    });
          


    // Initial load with default selection if needed
    // loadData('accueil.json'); // Uncomment if you want to load data on page load
//-------------------------------------------------------------------------------------//
$('#price input[type="radio"]').on('change', function() {
    var selectedPrice = $(this).val();
    console.log("Selected price: " + selectedPrice); // Debugging output

    $('#data').empty(); // Clear existing data

    if (selectedPrice == 40 || selectedPrice == 50 || selectedPrice == 60) {
        // Load data based on the selected price
        loadData('accueil.json', selectedPrice);
        loadData('menu2.json', selectedPrice);
        loadData('menu3.json', selectedPrice);
    }
});

function loadData(filePath, selectedPrice) {
    $.ajax({
        url: filePath,
        dataType: 'json',
        success: function(cards) {
            // Filter cards based on the selected price
            var filteredCards = cards.filter(function(card) {
                return card.prix == selectedPrice;
            });

            // Append filtered cards to the #data element
            filteredCards.forEach(function(card) {
                $('#data').append(`
                    <div class='cards' id='card-${card.id}'>
                        <div class='img'><img src="${card.img}"></div>
                        <div class='t'>
                            <div class='nom'>${card.nom}</div>
                            <div class='btn-prix'>
                                <div class='prix'>${card.prix} DH</div>
                                <div class='btn'>
                                    <input type='number' value='1' id='pp' class='plus' min='1' max='100'>
                                    <button type='submit' class='add' onclick='AjoutPrd(${card.id})'>
                                        <i class="fa fa-cart-plus"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `);
            });
        },
        error: function(xhr, status, error) {
            console.error("Error loading data: ", error);
        }
    });
}

//--------------------------------------------------------------------------------------//

let allCoffees = [];

// Load all three JSON files
Promise.all([
    fetch('accueil.json').then(response => response.json()),
    fetch('menu2.json').then(response => response.json()),
    fetch('menu3.json').then(response => response.json())
]).then(data => {
    allCoffees = data.flat(); // Merge the arrays into a single array
}).catch(error => {
    console.error('Error fetching JSON files:', error);
});

function searchCoffee() {
    var searchTerm = document.querySelector('.input').value.toLowerCase();
    var filteredCoffees = allCoffees.filter(function(coffee) {
        return coffee.nom.toLowerCase().includes(searchTerm);
    });
    displayCoffees(filteredCoffees);
}

function displayCoffees(coffees) {
    var dataContainer = document.getElementById('data');
    dataContainer.innerHTML = ''; 

    coffees.forEach(function(coffee) {
        dataContainer.insertAdjacentHTML('beforeend', 
            `
            <div class='cards' id='card-${coffee.id}'>
                <div class='img'><img src="${coffee.img}" alt="${coffee.nom}"></div>
                <div class='t'>
                    <div class='nom'>${coffee.nom}</div>
                    <div class='btn-prix'>
                        <div class='prix'>${coffee.prix} DH</div>
                        <div class='btn'>
                            <input type='number' value='1' class='plus' min='1' max='100'>
                            <button type='submit' class='add' onclick='AjoutPrd(${coffee.id})'>
                                <i class="fa fa-cart-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            `
        );
    });
}
//-------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------//




//-------------------------------------------------------------------------------------//




//   Example product data
// home.js (or script.js)

// Function to fetch products from accueil.json, menu2.json, and menu3.json
// async function fetchProducts() {
//     try {
//         let products = await Promise.all([
//             fetch('accueil.json').then(response => response.json()),
//             fetch('menu2.json').then(response => response.json()),
//             fetch('menu3.json').then(response => response.json())
//         ]);

//         displayProducts(products);
//     } catch (error) {
//         console.error('Error fetching products:', error);
//     }
// }

// // Function to display products
// function displayProducts(products) {
//     const productsDiv = document.getElementById('products');
//     products.forEach(product => {
//         let productHtml = `
//             <div class='cards' id='card-${product.id}'>
//                 <div class='img'><img src="${product.img}" alt="${product.nom}"></div>
//                 <div class='t'>
//                     <div class='nom'>${product.nom}</div>
//                     <div class='btn-prix'>
//                         <div class='prix'>${product.prix} DH</div>
//                         <div class='btn'>
//                             <input type='number' value='1' class='plus' min='1' max='100'>
//                             <button type='button' class='add' onclick='AjoutPrd(${product.id}, "${product.nom}", ${product.prix})'>
//                                 <i class="fa fa-cart-plus"></i> Add to Cart
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         `;
//         productsDiv.innerHTML += productHtml;
//     });
// }

// // Call fetchProducts to initiate loading and displaying products
// fetchProducts();
// Function to add a product to localStorage or perform other actions
// function AjoutPrd(id, nom, prix) {
//     // Example: Adding to localStorage
//     let panier = localStorage.getItem('panier');
//     panier = panier ? JSON.parse(panier) : [];

//     // Check if the product is already in the panier
//     const existingProduct = panier.find(item => item.id === id);
//     if (existingProduct) {
//         existingProduct.quantity++;
//     } else {
//         panier.push({ id: id, nom: nom, prix: prix, quantity: 1 });
//     }

//     localStorage.setItem('panier', JSON.stringify(panier));
//     displayCart(); // Update cart display after adding product
// }

// // Function to display products in the cart
// function displayCart() {
//     // Wrap this inside DOMContentLoaded or ensure script is at the end of body
//     document.addEventListener("DOMContentLoaded", function() {
//         const cartItemsDiv = document.getElementById('cart-items');
//         cartItemsDiv.innerHTML = ''; // Clear previous content

//         let panier = localStorage.getItem('panier');
//         panier = panier ? JSON.parse(panier) : [];

//         panier.forEach(item => {
//             const cartItemDiv = document.createElement('div');
//             cartItemDiv.classList.add('cart-item');

//             cartItemDiv.innerHTML = `
//                 <h3>${item.nom}</h3>
//                 <p>Price: $${item.prix.toFixed(2)} - Quantity: ${item.quantity}</p>
//             `;

//             cartItemsDiv.appendChild(cartItemDiv);
//         });
//     });
// }

// // Call displayCart to initially display cart items on page load
// displayCart();

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

  