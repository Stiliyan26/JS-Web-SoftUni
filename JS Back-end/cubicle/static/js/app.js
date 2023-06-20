document.getElementById('cars').addEventListener('click', (ev) => {
    if (ev.target.classList.contains('more')){
        const desc = ev.target.parentElement.querySelector('.description');

        if (desc.style.display == 'block'){
            desc.style.display = 'none';
            ev.target.textContent = 'Show more';
        } else {
            desc.style.display = 'block';
            ev.target.textContent = 'Hide';
        }
    }
});