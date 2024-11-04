    const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
    }


    const displayPhones = (phones, isShowAll) =>{
    // console.log(phones);

// step 1
    const phoneContainer = document.getElementById('phone-container');

// clear
    phoneContainer.textContent = '';

    // display show all button hidden
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }
    
    // console.log('is show all', isShowAll);
// display only first 12 phones
    if(!isShowAll){
        phones = phones.slice(0, 12);
    }

    phones.forEach(phone => {
    // console.log(phone);

 // step 2 create a div
    const phoneCard = document.createElement('div');
    phoneCard.classList = `card bg-gray-200 p-4 shadow-xl`;
// step 3
    phoneCard.innerHTML = `
    <figure> <img src="${phone.image}"https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-mini.jpg"
    alt="Shoes" />
    </figure>
    <div class="card-body">
    <h2 class="card-title">${phone.phone_name}</h2>
    <h4><span>Brand:</span>${phone?.brand}</h4> 
    <div class="card-actions justify-center">
    <button onclick="handelShowDetails('${phone.slug}')" 
    class="btn btn-primary">Show Details</button>
    </div>
    </div>
    </div>
    `;

// step 4
    phoneContainer.appendChild(phoneCard);
    });


// hide loading spinner
    toggleLoadingSpinner(false);
}

// handel show details
    const handelShowDetails = async (id) => {
    // console.log('clicked show details', id);
// load data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;

    showPhoneDetails(phone);
    console.log(phone);
    }


// show phone details
    const showPhoneDetails = (phone) => {
    const phoneName = document.getElementById('show-details-phone-name');
    phoneName.innerHTML = phone.name;

    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
    <img class="items-center" src="${phone.image}" alt="" />
    <h4><span>Brand:</span>${phone?.brand}</h4> 
    <p><span>Memory:</span>${phone?.mainFeatures?.memory}</p>
    <p><span>Storage:</span>${phone?.mainFeatures?.storage}</p>
    <p><span>DisplaySize:</span>${phone?.mainFeatures?.displaySize}</p>
    <p><span>ChipSet:</span>${phone?.mainFeatures?.chipSet
    || 'No chipSet Available in this Device'}</p>
    <p><span>GPS:</span>${phone?.others?.GPS
    || 'No GPS Available in this Device'}</p>
    <p><span>Bluetooth:</span>${phone?.others?.Bluetooth 
    || 'No Bluetooth Available in this Device'}</p>
    <p><span>NFC:</span>${phone?.others?.NFC 
    || 'No NFC Available in this Device'}</p>
    <p><span>Radio:</span>${phone?.others?.Radio
    || 'No Radio Available in this Device'}</p>
    <p><span>USB:</span>${phone?.others?.USB 
    || 'No USB Available in this Device'}</p>
    <p><span>WLAN:</span>${phone?.others?.WLAN 
    || 'No WLAN Available in this Device'}</p>
    <p><span>ReleaseDate:</span>${phone?.releaseDate
    || 'No Release Date Available in this Device'}</p>
    `
    

// show the modal
   show_details_modal.showModal();
}

// handel search button
    const handelSearch = (isShowAll) =>{
        toggleLoadingSpinner(true);
    const searchfield = document.getElementById('search-field');
    const searchText = searchfield.value;
    console.log(searchText);
    loadPhone(searchText, isShowAll);
}


// loafing spinner
   const toggleLoadingSpinner =(isLoading) =>{
    const loadingSpinner = document.getElementById("loading-spinner");
   if(isLoading){
    loadingSpinner.classList.remove('hidden');
   }
   else{
    loadingSpinner.classList.add('hidden');
   }
   }

//    handel show all
const handelShowAll = () => {
    handelSearch(true);
}


