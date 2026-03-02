document.addEventListener('DOMContentLoaded', () => {
    // Reveal elements on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    // Scroll Progress Bar
    const progressBar = document.getElementById('progressBar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        // Progress Bar
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (progressBar) progressBar.style.width = scrolled + "%";

        // Navbar transparency
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(2, 6, 23, 0.95)';
                navbar.style.boxShadow = '0 10px 30px -10px rgba(0, 0, 0, 0.5)';
            } else {
                navbar.style.background = 'rgba(2, 6, 23, 0.8)';
                navbar.style.boxShadow = 'none';
            }
        }

        // Back to Top Button
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // Back to Top Click
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Tutorial Search Filtering
    const searchInput = document.getElementById('tutorialSearch');
    const tutorialCards = document.querySelectorAll('.tutorial-card');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            tutorialCards.forEach(card => {
                const title = card.querySelector('.card-title').innerText.toLowerCase();
                const text = card.querySelector('.card-text').innerText.toLowerCase();
                if (title.includes(term) || text.includes(term)) {
                    card.style.display = 'block';
                    // Re-trigger reveal for filtered results
                    card.querySelector('.reveal').classList.add('reveal-active');
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Form submission animation
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerText = 'Sent Successfully!';
                btn.classList.add('btn-success');
                btn.classList.remove('btn-primary-custom');
                form.reset();

                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.classList.remove('btn-success');
                    btn.classList.add('btn-primary-custom');
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // Close mobile menu on link click
    const navLinks = document.querySelectorAll('.nav-link');
    const menu = document.getElementById('menu');
    if (menu) {
        const bsCollapse = new bootstrap.Collapse(menu, { toggle: false });
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (menu.classList.contains('show')) {
                    bsCollapse.hide();
                }
            });
        });
    }
});
