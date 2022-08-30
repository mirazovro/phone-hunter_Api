const loadPhones = async (searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data)}


const displayPhones = phones => {
    // console.log(phones)
    
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerText = '';
    //displsy 20 phones only
    phones = phones.slice(0, 30);
    // display no phone found
    const noPohnes = document.getElementById('Not-found')
    if (phones.length === 0) {
        noPohnes.classList.remove('d-none')
       
    } else {
        noPohnes.classList.add('d-none')
    }

    //display all phones
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div')
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML = `
            <div class="card p-4">
                        <img src="${phone.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${phone.phone_name}</h5>
                            <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                                to additional content. This content is a little bit longer.</p>
                        </div>
                    </div>
    
    
    
    `
        phoneContainer.appendChild(phoneDiv)
        //stop loader or spinner
        togglSpinner(false);
    })
    

    document.getElementById('btn-search').addEventListener
        ('click', function () {
            //start loader
            togglSpinner(true);
            const searchField = document.getElementById('search-field');
            const searchText = searchField.value;
            loadPhones(searchText)
        })
    
}
// loader adding codes
const togglSpinner = isLoading => {
    const loadersection = document.getElementById('loader');
    if (isLoading) {
        loadersection.classList.remove('d-none')
    } else {
        loadersection.classList.add('d-none')
    }
}

loadPhones();