/**
 * Syed Altaf - Portfolio Website Logic
 * Pure Vanilla JavaScript implementation
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Current Year in Footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Mobile Navigation Toggle
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navLinks = document.getElementById('nav-links');
    
    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener('click', () => {
            const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
            hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active');
        });

        // Close mobile nav when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // 3. Active Section Indicator on Scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinkItems = document.querySelectorAll('.nav-link');

    function highlightNavOnScroll() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinkItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavOnScroll);

    // 4. Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top-btn');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 5. Contact Form Interactive Handler (Client-side simulation)
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById('form-submit-btn');
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

            setTimeout(() => {
                formStatus.className = 'form-status success';
                formStatus.textContent = 'Thank you! Your message has been sent successfully.';
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';

                setTimeout(() => {
                    formStatus.textContent = '';
                }, 5000);
            }, 1200);
        });
    }

    // 6. Project Modal Details
    const projectData = {
        deepfake: {
            title: "Deepfake Detection System",
            date: "September 2025",
            tech: ["Python", "PyTorch", "OpenCV", "CNN", "Deep Learning"],
            details: [
                "Built a deep learning framework dedicated to identifying synthetic/manipulated video media.",
                "Utilized OpenCV for efficient frame extraction, noise reduction, and input standardizations.",
                "Trained CNN architectures using PyTorch with extensive validation to optimize accuracy and F1-score metrics.",
                "Engineered to help combat digital media manipulation and identity fraud."
            ]
        },
        sentiment: {
            title: "Sentiment Analysis on Social Media Data",
            date: "October 2025",
            tech: ["Python", "NLP", "Machine Learning", "Tokenization", "Data Visualization"],
            details: [
                "Designed a comprehensive NLP processing pipeline to analyze unstructured public social media feeds.",
                "Applied text normalization techniques: tokenization, stop-word filtering, stemming, and TF-IDF vectorization.",
                "Classified sentiments into positive, neutral, and negative metrics to track audience opinion trends.",
                "Generated clean visualization dashboards to display real-time sentiment distribution."
            ]
        }
    };

    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    document.querySelectorAll('.project-details-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.getAttribute('data-project');
            const data = projectData[key];

            if (data && modal && modalBody) {
                modalBody.innerHTML = `
                    <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">${data.title}</h3>
                    <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 1rem;">Completed: ${data.date}</p>
                    <div style="display: flex; gap: 0.4rem; flex-wrap: wrap; margin-bottom: 1.25rem;">
                        ${data.tech.map(t => `<span class="tech-badge">${t}</span>`).join('')}
                    </div>
                    <ul style="padding-left: 1.2rem; color: var(--text-secondary); line-height: 1.7; font-size: 0.95rem;">
                        ${data.details.map(d => `<li style="margin-bottom: 0.5rem;">${d}</li>`).join('')}
                    </ul>
                `;
                modal.classList.add('active');
            }
        });
    });

    if (modalCloseBtn && modal) {
        modalCloseBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
});