
const rootDiv = document.getElementById('root');
// контейнер для каталогу
const divPreview = document.createElement('div');
divPreview.className = 'thumbnails';
location.hash = 'page1';
rootDiv.append(divPreview);

// контейнер для окремого танка
const divDetails = document.createElement('div');
divDetails.className = 'details';
rootDiv.append(divDetails);

// вміст каталогу
const heading = document.createElement('h1');
heading.innerHTML='Most popular tanks';
divPreview.append(heading);

const tanksList = document.createElement('ul');
divPreview.append(tanksList);

for (let i =0; i < tanks.length; i++) {
    const tank = document.createElement('li');
    tank.info = tanks[i];
    tank.setAttribute('title', 'Click to details');
    tank.innerHTML = `
    <img class="tank-img" src="${tanks[i].preview}" width="250">
    <div class="tank-caption" >
        <img class="tank-flag" src="${tanks[i].country_image}" title="${tanks[i].country}">
        <span class="tank-level">${tanks[i].level}</span>
        <span class="tank-model" title="${tanks[i].model}">${tanks[i].model.toUpperCase()}</span>
    </div>`;
    tanksList.append(tank);
}
// обробник подій 
tanksList.onclick = function (event) {
    const li = event.target.closest('li');
    if (!li) return;
    location.hash = "page2";
    showDetails(li.info);
}

window.addEventListener('hashchange', function () {
    if (location.hash === '#page2') {
        document.querySelector('.details').style.display = 'block';
        document.querySelector('.thumbnails').style.display='none';
    }
    if (location.hash === '#page1') {
        document.querySelector('.thumbnails').style.display = 'block';
        document.querySelector('.details').style.display = 'none';
    }
})
// Інформація про окремого танка
function showDetails(tank) {
    divDetails.innerHTML = `
    <h1>
        <img src = "${tank.country_image}" title = "${tank.country}" >
        ${tank.model.toUpperCase()}
    </h1>
    <div class="boxDetails">
        <div class="preview"> 
            <h2>Preview</h2>
            <img src="${tank.preview}">
        </div>
        <div class="characteristic">
            <h2>Characteristics</h2>
        </div>
    </div>`;
    const table = document.createElement('table');
    table.classList.add('table');
    divDetails.querySelector('.characteristic').append(table);

    for (let i = 0; i < Object.keys(tank.details).length; i++) {
        let row = document.createElement('tr');
        row.innerHTML = `<td>${Object.keys(tank.details)[i]}</td> <td>${Object.values(tank.details)[i]}</td>`;
        table.append(row);
    }
    const link = document.createElement('a');
    link.innerHTML = "Back to list view";
    
    divDetails.append(link);
    link.onclick = function () {
        location.hash = 'page1';
    }
}


