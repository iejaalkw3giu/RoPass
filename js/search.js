document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const clearIcon = document.querySelector('.clear-icon');
    const dropdown = document.getElementById('dropdown');
    
    if (searchInput && clearIcon) {
        // Show/hide clear icon
        searchInput.addEventListener('input', function() {
            clearIcon.style.display = this.value ? 'block' : 'none';
        });
        
        // Clear search
        clearIcon.addEventListener('click', function() {
            searchInput.value = '';
            clearIcon.style.display = 'none';
            if (dropdown) dropdown.style.display = 'none';
        });
        
        // Simple filter function
        window.filterResults = function() {
            const searchText = searchInput.value;
            const searchTextSpans = document.querySelectorAll('.search-text');
            
            searchTextSpans.forEach(span => {
                span.textContent = searchText;
            });
            
            if (dropdown && searchText.length > 0) {
                dropdown.style.display = 'block';
            } else if (dropdown) {
                dropdown.style.display = 'none';
            }
        };
        
        // Clear search function
        window.clearSearch = function() {
            searchInput.value = '';
            clearIcon.style.display = 'none';
            if (dropdown) dropdown.style.display = 'none';
        };
    }
});
