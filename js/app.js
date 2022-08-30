const loadPhones = async (searchText,datalimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, datalimit)}

    const processSearch = (datalimit)=>{
        togglSpinner(true);
            const searchField = document.getElementById('search-field');
            const searchText = searchField.value;
            loadPhones(searchText,datalimit)
    }

const displayPhones = (phones,datalimit) => {
    // console.log(phones)
    
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerText = '';
    //displsy 20 phones only
    const showButton = document.getElementById('show-all')
    // console.log(datalimit)
    if (datalimit) {
        
        phones = phones.slice(0,datalimit);
        showButton.classList.remove('d-none');
    } else {
    
        showButton.classList.add('d-none');
    }
   
    
   
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
                            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            <button onclick="loadPhoneDetails('${phone.slug}')"href="#" class="btn btn-primary">Show details</button>
                                
                        </div>
                    </div>
    
    
    
    `
        phoneContainer.appendChild(phoneDiv)
        //stop loader or spinner
        togglSpinner(false);
    })

    
//handle search button clicked
    document.getElementById('btn-search').addEventListener
        ('click', function () {
            //start loader
            processSearch(10)
        })
    
}

// search input field button kypress enter added
document.getElementById('search-field').addEventListener('keypress', function (event) {
    // console.log(event.key)
    if (event.key === "Enter") {
        processSearch(10)
    }
});


// loader adding codes
const togglSpinner = isLoading => {
    const loadersection = document.getElementById('loader');
    if (isLoading) {
        loadersection.classList.remove('d-none')
    } else {
        loadersection.classList.add('d-none')
    }
}



//show all button added this is the not best way
document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch();

})

const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data.slug);
    
}
loadPhones();