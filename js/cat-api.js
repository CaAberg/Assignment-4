function fetchCatImage() {
    fetch('https://api.thecatapi.com/v1/images/search')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const imageUrl = data[0].url;
            document.getElementById('catImage').src = imageUrl;
        })
        .catch(error => console.error('Error fetching cat image:', error));
}

function fetchCatFact() {
    fetch('https://catfact.ninja/fact')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const fact = data.fact;
            document.getElementById('catFact').textContent = fact;
        })
        .catch(error => console.error('Error fetching cat fact:', error));
}

document.addEventListener('DOMContentLoaded', function() {
    fetchCatImage();
    fetchCatFact();
});

document.getElementById('fetchCatImageButton').addEventListener('click', fetchCatImage);
document.getElementById('fetchCatFactButton').addEventListener('click', fetchCatFact);
