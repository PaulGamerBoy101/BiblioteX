// books-search.js

document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.querySelector('.search-bar');

    searchBar.addEventListener('keypress', async (e) => {
        if (e.key === 'Enter') {
            const query = searchBar.value.trim();
            if (!query) return;

            const results = await searchBooks(query);
            displayBooks(results);
        }
    });

    async function searchBooks(query) {
        const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data.items || [];
        } catch (err) {
            console.error('Error fetching books:', err);
            return [];
        }
    }

    function displayBooks(books) {
        // Target Featured section for displaying results (can change to any section)
        const bookSection = document.getElementById('featured');
        const bookList = bookSection.querySelector('.book-list');
        bookList.innerHTML = '';

        if (books.length === 0) {
            bookList.innerHTML = '<li>No results found.</li>';
            return;
        }

        books.forEach(book => {
            const li = document.createElement('li');
            li.classList.add('book-item');

            const title = book.volumeInfo.title || 'No Title';
            const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author';
            const thumbnail = book.volumeInfo.imageLinks?.thumbnail || '';

            li.innerHTML = `
                <div class="book-cover">
                    ${thumbnail ? `<img src="${thumbnail}" alt="${title} Cover">` : '<div class="no-cover">No Cover</div>'}
                </div>
                <div class="book-info">
                    <h3>${title}</h3>
                    <p>${authors}</p>
                </div>
            `;

            bookList.appendChild(li);
        });
    }
});
