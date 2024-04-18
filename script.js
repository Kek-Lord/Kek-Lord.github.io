document.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById('search-input').addEventListener('input', handleSearch);
  });

  const recipes = [
    {
        name: 'French Toast',
        image: 'images/FrenchToast.png',
        link: 'html/frenchToast.html',
    },
    {
        name: 'Jacket Potato',
        image: 'images/Jacketpotato.png',
        link: 'html/jacketpotato.html',
    },
    {
        name: 'Omelette',
        image: 'images/omelette.png',
        link: 'html/omelette.html',
    },
    {
        name: 'Pancakes',
        image: 'images/Pancake.png',
        link: 'html/pancake.html',
    },
    {
        name: 'Scrambled Eggs',
        image: 'images/ScrambledEgg.png',
        link: 'html/scrambledEgg.html',
    },
    {
        name: 'Spaghetti',
        image: 'images/spaghetti.png',
        link: 'html/spaghetti.html',
    },
    {
        name: 'Tomato and Pasta Soup',
        image: 'images/TomatoPastaSoup.png',
        link: 'html/tomatoPastaSoup.html',
    }
];

/**
 * @param {InputEvent} event
 */
function handleSearch(event) {
    const text = event.target?.value;
    const gallery = document.getElementById('card-gallery');
    const template = document.getElementById('recipe-card-template');
    const cards = [...gallery.getElementsByTagName('div')];
    for (const card of cards) {
        gallery.removeChild(card);
    }
    if (text.length===0) {
        return;
    }
    for (const recipe of recipes) {
        if(recipe.name.toLowerCase().includes(text.toLowerCase())) {
            const card = template.content.cloneNode(true);
            card.children[0].getElementsByClassName('recipe-card-image')[0].src=recipe.image;
            card.children[0].getElementsByClassName('recipe-card-text')[0].textContent=recipe.name;
            card.children[0].getElementsByClassName('recipe-link')[0].href=recipe.link;
            gallery.appendChild(card);
        }
    }
}