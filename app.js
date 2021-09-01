/* --------------------------------------------------------------
            get user input text and pass to fetchData 
-----------------------------------------------------------------*/
const loadData = () =>
{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    document.getElementById('result-count').innerText = 0;
    document.getElementById('display-field').textContent = '';
    document.getElementById('error-message').style.display = 'none';
    // input error handle
    if (searchText === '') {
        document.getElementById('error-message').style.display = 'block';
    } else {
        fetchData(searchText);
    };
};

/* --------------------------------------------------------------
            API call for fetch data and pass to displayData
-----------------------------------------------------------------*/
const fetchData = searchText =>
{
    fetch(`https://openlibrary.org/search.json?q=${searchText}`)
        .then(res => res.json())
        .then(data => displayData(data.docs));
};

/* --------------------------------------------------------------
            API data looping and display panel
-----------------------------------------------------------------*/
const displayData = results =>
{
    // input error handle
    if (results.length === 0) {
        document.getElementById('error-message').style.display = 'block';
    } else {
        //search result counter
        document.getElementById('result-count').innerText = results.length;

        const displayField = document.getElementById('display-field');
        displayField.textContent = '';

        // data looping and make dynamically display
        results?.forEach(x =>
        {
            const { title, author_name, first_publish_year, publisher, cover_i } = x;
            const div = document.createElement('div');
            div.classList.add('card', 'm-1', 'bg-secondary', 'bg-opacity-10');
            div.setAttribute('id', 'book-item');
            div.innerHTML = `
            <div class="row g-0">
                <div class="col-md-4 p-2">
                    <img src="https://covers.openlibrary.org/b/id/${cover_i ? cover_i : ''}-M.jpg" class="img-fluid rounded" alt="Book Cover Image">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${title ? title : 'Unknown'}</h5>
                        <p class="card-text">
                            <small class="text-muted">By</small>
                            <span class="fst-italic">${author_name ? author_name : 'Unknown'}</span>
                        </p>
                        <p class="card-text fw-lighter">
                            This edition was first published in 
                            <span class="fw-bold">${first_publish_year ? first_publish_year : 'Unknown'}</span>
                            <small class="text-muted">By</small>
                            <span class="fw-bold">${publisher ? publisher : 'Unknown'}</span>
                        </p>
                    </div>
                </div>
            </div>
            `;
            displayField.appendChild(div);
        });
    };
};