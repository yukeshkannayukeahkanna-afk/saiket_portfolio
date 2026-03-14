/* ===========================
   PORTFOLIO - Main JavaScript
   =========================== */

document.addEventListener('DOMContentLoaded', () => {

    // ========== TYPING EFFECT ==========
    const typingElement = document.getElementById('typingText');
    const roles = ['Web Developer', 'Frontend Enthusiast', 'Problem Solver', 'Quick Learner', 'Tech Enthusiast'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 80;
    const deleteSpeed = 40;
    const pauseEnd = 2000;
    const pauseStart = 500;

    function typeEffect() {
        const currentRole = roles[roleIndex];

        if (!isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === currentRole.length) {
                isDeleting = true;
                setTimeout(typeEffect, pauseEnd);
                return;
            }
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(typeEffect, pauseStart);
                return;
            }
        }

        setTimeout(typeEffect, isDeleting ? deleteSpeed : typeSpeed);
    }

    typeEffect();


    // ========== NAVBAR SCROLL EFFECT ==========
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    function handleScroll() {
        const scrollY = window.scrollY;

        // Navbar background
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button
        if (scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });


    // ========== ACTIVE NAV LINK ON SCROLL ==========
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        const scrollY = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });


    // ========== MOBILE NAV TOGGLE ==========
    const navToggle = document.getElementById('navToggle');
    const navLinksContainer = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
    });

    // Close mobile nav when a link is clicked
    navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinksContainer.classList.remove('active');
        });
    });


    // ========== BACK TO TOP ==========
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });


    // ========== SCROLL REVEAL ANIMATIONS ==========
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger the animation for grid items
                const delay = entry.target.closest('.skills-grid, .projects-grid')
                    ? index * 100
                    : 0;

                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, delay);

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

    // Timeline items
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.timeline-item').forEach(el => timelineObserver.observe(el));


    // ========== SKILL BAR ANIMATION ==========
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bars = entry.target.querySelectorAll('.skill-progress');
                bars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = width + '%';
                    }, 300);
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const skillsSection = document.querySelector('.skills-grid');
    if (skillsSection) {
        skillObserver.observe(skillsSection);
    }


    // ========== PROJECT FILTER ==========
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    card.style.display = '';
                    // Re-trigger animation
                    card.classList.remove('animate-in');
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            card.classList.add('animate-in');
                        });
                    });
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });


    // ========== OPS SIM BIG MODEL ==========
    const modelCanvas = document.getElementById('opsModelCanvas');
    if (modelCanvas) {
        const ctx = modelCanvas.getContext('2d');
        const scaleLabel = document.getElementById('modelScaleLabel');
        const objectCountLabel = document.getElementById('modelObjectCount');
        const legendContainer = document.getElementById('modelLegend');
        const zoomInBtn = document.getElementById('modelZoomIn');
        const zoomOutBtn = document.getElementById('modelZoomOut');
        const resetBtn = document.getElementById('modelReset');

        const opsSimData = {
            plane: [50, 50, 0],
            AppVersion: ['Educational_1'],
            'VMC_#2': [-5.031937899386804, -5.144494765245838, 3.6589110066181854e-8, 89.99999803884896, -1.2722218725854067e-14, -89.99999999999999],
            'HMC_#2': [-2.7007925965962434, 6.423698375109417, 0.007486203305604683, 89.99999803884896, 0, 0],
            'Supply_Truck#2': [-5.385809051559525, 16.800740872887097, 0.0012057853542100404, 90.00001174148164, 1.1886654788038985e-7, 1.3704802200634447],
            'Delivery_Truck#2': [-2.5678573119757893, -13.462235317550768, 0.04140060234261846, 90.00001735754327, 9.54166404439055e-15, -1.4033418597069752e-14],
            'Worker_Man_B#2': [null, null, null, null, null, null],
            'OfficerWomen_W#2': [-2.8442846920808975, -4.3324159464699985, 0.000664353370672055, 0, 0, 0],
            'Officer_Man_W#2': [-3.044381170551432, 3.89645808669376, -0.002053983400536228, -0.000032329708739916346, -179.9999999999995, 3.5731415582850627],
            'cmm_#2': [15.79421625481151, 5.109990988664828, 0.003931462764745541, 0, 0, 0],
            'Worker_Man_B#3': [15.79421625481151, 5.109990988664828, -0.0016792588994127425, 179.99996767029128, -4.995565827772045e-13, 3.573141558285041],
            'connect-Delivery_Truck#2-cmm_#2': ['Delivery_Truck#2', 'cmm_#2', 'rgb(254,254,254)'],
            'connect-cmm_#2-HMC_#2': ['cmm_#2', 'HMC_#2', 'rgb(254,254,254)']
        };

        const typePalette = {
            vmc: '#ff7f50',
            hmc: '#4dd0e1',
            truck: '#f9c74f',
            worker: '#80ed99',
            officer: '#a78bfa',
            cmm: '#f72585',
            unknown: '#94a3b8'
        };

        function getType(name) {
            const key = name.toLowerCase();
            if (key.includes('vmc')) return 'vmc';
            if (key.includes('hmc')) return 'hmc';
            if (key.includes('truck')) return 'truck';
            if (key.includes('worker')) return 'worker';
            if (key.includes('officer')) return 'officer';
            if (key.includes('cmm')) return 'cmm';
            return 'unknown';
        }

        const objects = Object.entries(opsSimData)
            .filter(([name, value]) => !name.startsWith('connect-') && Array.isArray(value) && value.length === 6 && value[0] !== null)
            .map(([name, value]) => ({
                name,
                x: value[0],
                y: value[1],
                z: value[2],
                type: getType(name)
            }));

        const byName = new Map(objects.map(item => [item.name, item]));

        const links = Object.entries(opsSimData)
            .filter(([name, value]) => name.startsWith('connect-') && Array.isArray(value) && value.length >= 2)
            .map(([, value]) => ({
                from: value[0],
                to: value[1],
                color: value[2] || 'rgb(254,254,254)'
            }));

        const xValues = objects.map(item => item.x);
        const yValues = objects.map(item => item.y);
        const bounds = {
            minX: Math.min(...xValues),
            maxX: Math.max(...xValues),
            minY: Math.min(...yValues),
            maxY: Math.max(...yValues)
        };

        let zoom = 1.8;
        const PADDING = 90;

        function project(point, baseScale, offsetX, offsetY) {
            return {
                px: (point.x - bounds.minX) * baseScale * zoom + offsetX,
                py: (bounds.maxY - point.y) * baseScale * zoom + offsetY
            };
        }

        function drawArrow(x1, y1, x2, y2, color) {
            const headLen = 10;
            const angle = Math.atan2(y2 - y1, x2 - x1);
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();

            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(x2, y2);
            ctx.lineTo(x2 - headLen * Math.cos(angle - Math.PI / 6), y2 - headLen * Math.sin(angle - Math.PI / 6));
            ctx.lineTo(x2 - headLen * Math.cos(angle + Math.PI / 6), y2 - headLen * Math.sin(angle + Math.PI / 6));
            ctx.closePath();
            ctx.fill();
        }

        function drawModel() {
            ctx.clearRect(0, 0, modelCanvas.width, modelCanvas.height);

            const width = bounds.maxX - bounds.minX || 1;
            const height = bounds.maxY - bounds.minY || 1;
            const baseScale = Math.min(
                (modelCanvas.width - PADDING * 2) / width,
                (modelCanvas.height - PADDING * 2) / height
            );

            const usedWidth = width * baseScale * zoom;
            const usedHeight = height * baseScale * zoom;
            const offsetX = (modelCanvas.width - usedWidth) / 2;
            const offsetY = (modelCanvas.height - usedHeight) / 2;

            ctx.font = '12px Inter, sans-serif';

            links.forEach(link => {
                const from = byName.get(link.from);
                const to = byName.get(link.to);
                if (!from || !to) return;

                const start = project(from, baseScale, offsetX, offsetY);
                const end = project(to, baseScale, offsetX, offsetY);
                drawArrow(start.px, start.py, end.px, end.py, '#e2e8f0');
            });

            objects.forEach(item => {
                const node = project(item, baseScale, offsetX, offsetY);
                const color = typePalette[item.type] || typePalette.unknown;
                const radius = Math.max(6, Math.min(14, 7 + zoom * 2));

                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(node.px, node.py, radius, 0, Math.PI * 2);
                ctx.fill();

                ctx.lineWidth = 2;
                ctx.strokeStyle = '#0b1020';
                ctx.stroke();

                ctx.fillStyle = '#f8fafc';
                ctx.fillText(item.name, node.px + 12, node.py - 10);
                ctx.fillStyle = '#94a3b8';
                ctx.fillText(`(${item.x.toFixed(2)}, ${item.y.toFixed(2)}, ${item.z.toFixed(2)})`, node.px + 12, node.py + 6);
            });

            if (scaleLabel) {
                scaleLabel.textContent = `Scale: ${zoom.toFixed(1)}x`;
            }
            if (objectCountLabel) {
                objectCountLabel.textContent = `Objects: ${objects.length}`;
            }
        }

        function renderLegend() {
            if (!legendContainer) return;
            const seen = new Set(objects.map(item => item.type));
            const typeNames = Array.from(seen);

            legendContainer.innerHTML = typeNames.map(type => {
                const color = typePalette[type] || typePalette.unknown;
                return `
                    <div class="model-legend-item">
                        <span class="model-dot" style="background:${color}"></span>
                        <span>${type.toUpperCase()}</span>
                    </div>
                `;
            }).join('');
        }

        renderLegend();
        drawModel();

        if (zoomInBtn) {
            zoomInBtn.addEventListener('click', () => {
                zoom = Math.min(3.2, zoom + 0.2);
                drawModel();
            });
        }

        if (zoomOutBtn) {
            zoomOutBtn.addEventListener('click', () => {
                zoom = Math.max(0.8, zoom - 0.2);
                drawModel();
            });
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                zoom = 1.8;
                drawModel();
            });
        }
    }


    // ========== CONTACT FORM ==========
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // Basic validation
        if (!name || !email || !subject || !message) {
            showFormMessage('Please fill in all fields.', 'error');
            return;
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate form submission (replace with actual backend integration)
        const submitBtn = contactForm.querySelector('.btn-submit');
        submitBtn.disabled = true;
        submitBtn.querySelector('span').textContent = 'Sending...';

        setTimeout(() => {
            showFormMessage('Thank you! Your message has been sent successfully.', 'success');
            contactForm.reset();
            submitBtn.disabled = false;
            submitBtn.querySelector('span').textContent = 'Send Message';
        }, 1500);
    });

    function showFormMessage(text, type) {
        // Remove any existing message
        const existingMsg = contactForm.querySelector('.form-message');
        if (existingMsg) existingMsg.remove();

        const msgEl = document.createElement('div');
        msgEl.className = 'form-message ' + type;
        msgEl.textContent = text;
        contactForm.insertBefore(msgEl, contactForm.firstChild);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (msgEl.parentNode) {
                msgEl.style.opacity = '0';
                setTimeout(() => msgEl.remove(), 300);
            }
        }, 5000);
    }


    // ========== SMOOTH SCROLL FOR ALL ANCHOR LINKS ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

});
