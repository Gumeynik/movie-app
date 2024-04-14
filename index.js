const movieList = [];

const inputNode = document.querySelector('.js-input');
const btnNode = document.querySelector('.js-movie__btn-add');
const listNode = document.querySelector('.js-list-movie');

btnNode.addEventListener('click', addMovie);
inputNode.addEventListener('keypress', pressEnterToAddMovie);



function pressEnterToAddMovie(event) {
    if (event.keyCode === 13) {
        btnNode.click();
    }
};

function addMovie() {
    {  
        if (inputNode.value === '' ) {
            return;
        }    
        const newMovie = {
            title: inputNode.value,
            watched: false,
        }    
        movieList.push(newMovie);
        renderList(movieList);
        clearInput();
        console.log(movieList)
    }
    };

function clearInput() {
    inputNode.value = '';
};

function renderList(movies) {
    listNode.innerHTML = '';
    let movieListHTML = '';
    movies.forEach((movie, index) => {
        movieListHTML += `<li class='item-movie ${movie.watched ? 'watched' : ''}' data-index="${index}"><input type="checkbox" class="checkbox" ${movie.watched ? 'checked' : ''}><p class='item-text '>${movie.title}</p><button class=' delete-button'><span class='line-btn1 ${movie.watched ? 'span-color' : ''}'></span> <span class='line-btn2 ${movie.watched ? 'span-color' : ''}'></span></button></li>`;
    });
    listNode.innerHTML = `<ul class='list-movie'>${movieListHTML}</ul> `;
    const deleteButtons = listNode.querySelectorAll('.delete-button');
    const checkboxes = listNode.querySelectorAll('.checkbox');

    deleteButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            const li = event.target.closest('li');
            const index = li.dataset.index;
            movieList.splice(index, 1);
            li.remove();
            renderList(movieList); 
            console.log(movieList);
        });
    });

    checkboxes.forEach((checkbox, index) => {
        checkbox.addEventListener('change', function () {
            movieList[index].watched = checkbox.checked;
            renderList(movieList); 
        });
    });
}