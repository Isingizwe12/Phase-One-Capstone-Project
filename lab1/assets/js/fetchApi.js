export async function fetchBooks(query = 'javascript') {
  const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
  const data = await res.json();
  return data.docs.slice(0, 20).map(book => ({
    id: book.key,
    title: book.title,
    author: book.author_name ? book.author_name.join(', ') : 'Unknown',
    image: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : 'assets/images/library.jpg',
    description: book.first_sentence ? (Array.isArray(book.first_sentence) ? book.first_sentence.join(' ') : book.first_sentence) : 'No description available.'
  }));
}
