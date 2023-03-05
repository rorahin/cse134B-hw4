import { myConfirm } from './customdialog';

export var movies = [  /******** */];

export function deleteMovie (movieID) {
    /******************* */
    let dialog = myConfirm('Delete movie?');
    dialog.addEventListener('close', function () {
        if (this.returnValue) {
            movies.splice(movieID, 1);
            renderMovies();
        }
    })
}

export function editMovie (movieID) {
    if (movieID) {
        let movie = movies[movieID];
        document.getElementById('title').value = movie.title;
        document.getElementById('released').value = Number(movie.released);
        document.getElementById('rating').value = movie.rating;
        document.getElementById('movieId').value = movieID;
    }
    document.querySelector('#addDialog').showModal();
}

export function addMovie () {
    /************** */
}

export function renderMovies () {
    /**************************** */
    let markup = '';

    if (movies.length === 0) markup = 'No movies currently listed';
    else {
        markup = `<ul>
                    ${movies
                .map(
                    (movie, index) => `
                                <li>${movie.title} (${movie.released}) - 
                                Rated: ${movie.rating}
                                <button onclick="editMovie(${index})">
                                Edit
                                </button>
                                <button onclick ="deleteMovie(${index})">
                                Delete
                                </button>
                                </li>`
                )
                .join('')
            }
                  </ul>`
    }

    document.querySelector('#movieList').innerHTML = markup;

}