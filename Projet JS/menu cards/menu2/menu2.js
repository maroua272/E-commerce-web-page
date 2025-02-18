function loadData(){

    $.ajax({
        url:'menu2.json',
        success: function(crds){
        //  checkB=document.querySelectorAll('input[name="c"]');
            for(let i=0;i<crds.length;i++){
                
                $("#data").append(`
                <div class='cards'>
                    <div class='img'><img src="${crds[i].img}"></div>
                    <div class='t'>
                        <div class='nom'>${crds[i].nom}</div>
                        <div class='btn-prix'>
                            <div class='prix'>${crds[i].prix}DH</div>
                            <div class='btn'><input type='number' value='1' id='pp' class='plus' min='1' max='100' ><button type='submit' class='add' onclick='AjoutPrd(${crds[i].id})'><i class="fa fa-cart-plus"></i></button></div>
                        </div>
                    </div>
                </div>
                `)
            }
        }
    });
  }
  
  loadData();
  //------------------------------------------------------------------------------------//
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
//------------------------------------------------------------------------------------//
$(document).ready(function() {
    const dataType = $('#data').data('type');
    if (dataType === 'green') {
        $('#data').html(`
            <div id="card-container">
        <div class="row" id="data"></div>
        </div>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
        <script src="./menu2.js"></script>
        `);
    }
});
