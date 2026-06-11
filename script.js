document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Stats Counter Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target;
            }
        });
    };

    // Trigger counter when in view
    const observer = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting) {
            animateCounters();
        }
    }, { threshold: 0.5 });

    observer.observe(document.querySelector('.stats-grid'));

    // 2. Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            
            // Update Active State in Sidebar
            document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // 3. Scroll Reveal Effect
    const revealSections = () => {
        const sections = document.querySelectorAll('.dashboard-section, .glass-card');
        sections.forEach(section => {
            const windowHeight = window.innerHeight;
            const revealTop = section.getBoundingClientRect().top;
            const revealPoint = 100;

            if (revealTop < windowHeight - revealPoint) {
                section.style.opacity = "1";
                section.style.transform = "translateY(0)";
            }
        });
    };

    // Set initial styles for reveal
    document.querySelectorAll('.dashboard-section, .glass-card').forEach(s => {
        s.style.opacity = "0";
        s.style.transform = "translateY(20px)";
        s.style.transition = "all 0.6s ease-out";
    });

    window.addEventListener('scroll', revealSections);
    revealSections(); // Run once on load
});