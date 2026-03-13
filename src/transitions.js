/**
 * Shared transitions for KRD subpages
 */
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        const target = this.getAttribute('href');
        const overlay = document.getElementById('transition-overlay');
        
        if (overlay) {
            overlay.classList.add('active');
            setTimeout(() => {
                window.location.href = target;
            }, 600);
        } else {
            window.location.href = target;
        }
    });
});

// Fade in from black on load
window.addEventListener('load', () => {
    const overlay = document.getElementById('transition-overlay');
    if (overlay) {
        // We start visible (opacity 1) and fade to 0
        overlay.style.opacity = "1";
        overlay.style.pointerEvents = "all";
        
        // Brief delay to ensure render
        setTimeout(() => {
            overlay.classList.remove('active');
            overlay.style.opacity = "0";
            overlay.style.pointerEvents = "none";
        }, 100);
    }
});
