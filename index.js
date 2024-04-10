const movieList = [];

const inputNode = document.querySelector('.js-input');
const btnNode = document.querySelector('.js-movie__btn-add');
const listNode = document.querySelector('.js-list-movie');

btnNode.addEventListener('click', function () {
    const movie = getMovieFromUser();
    if (!movie) {
        return;
    }           
    trackFilm(movie);
    renderList(movieList);
    clearInput();
});

function trackFilm(movie) {
    movieList.push({ value: movie, checked: false, index: movieList.length });
};

function getMovieFromUser() {
    if (inputNode.value === '' ) {
        return null;
    }
    return inputNode.value;
};

function clearInput() {
    inputNode.value = '';
};

function renderList(movieList) {
    let movieListHTML = '';

    movieList.forEach((movie, index) => {
        movieListHTML += `<li class='item-movie ${movie.checked ? 'checked' : ''}' data-index='${movie.index}'><input type="checkbox" class="checkbox" ${movie.checked ? 'checked' : ''}><p class='item-text'>${movie.value}</p><button class='delete-button' data-index='${movie.index}'><span class='line-btn1'></span> <span class='line-btn2'></span></button></li>`;
    });

    listNode.innerHTML = `<ul class='list-movie'>${movieListHTML}</ul> `;
    const deleteButtons = listNode.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            const index = this.dataset.index;
            movieList.splice(index, 1); 
            renderList(movieList); 
        });
    });
    listNode.addEventListener('click', function (event) {
        const target = event.target;
        if (target.classList.contains('checkbox')) {
            const listItem = target.closest('.item-movie');
            const index = listItem.dataset.index;
            movieList[index].checked = target.checked;
            renderList(movieList);
        }
    });
}