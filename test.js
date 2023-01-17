const form = document.querySelector('.js-search-form')

form.addEventListener('submit', controlSubmit)

async function controlSubmit(event){
    event.preventDefault();
    const inputValue = document.querySelector('.js-search-input').value
    const mainInput = inputValue.trim()
    const searchResults = document.querySelector('.js-search-results')
    searchResults.innerHTML = ''
    const spinner = document.querySelector('.js-spinner')
    spinner.classList.remove('hidden')
    try {
       const searchResult = await searchPedia(mainInput)
       if (searchResult.query.searchinfo.totalhits === 0) {
        alert('No results found. Try different keywords');
        return;
      }
        showResult(searchResult);

    }
    catch(err) {
        console.log(err)
        alert('search box is empty')
    }
    finally{
        spinner.classList.add('hidden')
    }
}

async function searchPedia(searchQuery) {
    const wikiApi = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`
    const response = await fetch(wikiApi)

    if(!response.ok){
        throw Error(response.statusText)
    }

    const json = response.json()
    return json

}


async function showResult(results) {
    const searchResult = document.querySelector('.js-search-results')

   results.query.search.forEach(result => {
    const url = `https://en.wikipedia.org/?curid=${result.pageid}`;
       // Append the search result to the DOM
       searchResult.insertAdjacentHTML(
        'beforeend',
        `<div class="result-item">
          <h3 class="result-title">
            <a href="${url}" target="_blank" rel="noopener">${result.title}</a>
          </h3>
          <a href="${url}" class="result-link" target="_blank" rel="noopener">${url}</a>
          <span class="result-snippet">${result.snippet}</span><br>
        </div>`
      );
    
   });


}