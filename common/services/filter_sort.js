// *********************filter start************
// JavaScript to toggle the active state
document.querySelectorAll('.filter-item input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        const filterBtn = document.querySelector('.filter-btn');
        if (document.querySelectorAll('.filter-item input[type="checkbox"]:checked').length > 0) {
            filterBtn.classList.add('active');
        } else {
            filterBtn.classList.remove('active');
        }
    });
});

// *********************filter end************


// *********************sort start************

document.querySelectorAll('.sort-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.sort-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        const sortDirection = item.dataset.sort;
        
    });
});
// *********************sort end************

