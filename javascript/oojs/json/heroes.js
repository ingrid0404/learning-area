const URL = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json';

async function populate() {
    const request = new Request(URL);

    const response = await fetch(request);
    const responsJson = await response.json();

    populateHeader(responsJson);

    populateData(responsJson);

    //console.log(responsJson);
}

function populateHeader(data) {
    const headerElement = document.querySelector('header');

    const h1 = document.createElement('h1');
    h1.textContent = data.squadName;

    headerElement.appendChild(h1);

    const p = document.createElement('p');
    p.textContent = data.homeTown;

    headerElement.appendChild(p);
}

function populateData(data) {
    const members = data.members;

    const sectionElement = document.querySelector('section');

    members.forEach(member => {
        const _article = document.createElement('article');

        const h2 = document.createElement('h2');
        h2.textContent = member.name;

        const p1 = document.createElement('p');
        p1.textContent = member.secretIdentity;


        const p2 = document.createElement('p');
        p2.textContent = "Super Powers: "

        const _list = document.createElement('ul');
        
        member.powers.forEach(power => {
            const _listItem = document.createElement('li');
            _listItem.textContent = power;

            _list.appendChild(_listItem);
        })

        _article.appendChild(h2);
        _article.appendChild(p1);
        _article.appendChild(p2);
        _article.appendChild(_list);

        sectionElement.appendChild(_article);

    })
}

populate();