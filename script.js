// 페이지 로드 후 실행
document.addEventListener('DOMContentLoaded', function() {
    // AOS 초기화
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100
    });
    
    // 다크모드 토글 기능
    const themeToggle = document.getElementById('themeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // 로컬 스토리지에서 테마 설정 불러오기
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
    } else if (currentTheme === 'light') {
        document.body.classList.remove('dark-mode');
    } else if (prefersDarkScheme.matches) {
        // 시스템 설정이 다크모드면 다크모드 적용
        document.body.classList.add('dark-mode');
    }
    
    // 다크모드 토글 버튼 클릭 이벤트
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            // 현재 테마를 로컬 스토리지에 저장
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }
    
    // 스크롤 프로그레스 바
    const scrollProgressBar = document.getElementById('scrollProgressBar');
    if (scrollProgressBar) {
        window.addEventListener('scroll', function() {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            scrollProgressBar.style.width = scrolled + '%';
        });
    }
    
    // 네비게이션 바 스크롤 이벤트
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // 네비게이션 링크 부드럽게 스크롤
    const navLinks = document.querySelectorAll('#navbar a, .scroll-down a, .back-to-top a');
    const navbarHeight = navbar.getBoundingClientRect().height;
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // 상단으로 스크롤
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - navbarHeight,
                behavior: 'smooth'
            });
        });
    });
    
    // 활성 섹션 표시 기능 추가
    const sections = document.querySelectorAll('.section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            
            if (pageYOffset >= sectionTop - navbarHeight - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // 스타일 추가
    const style = document.createElement('style');
    style.textContent = `
        #navbar.scrolled {
            background-color: rgba(255, 255, 255, 0.95);
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
        }
        
        #navbar a.active {
            color: #4b6cb7 !important;
            font-weight: 700;
            position: relative;
        }
        
        #navbar a.active::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 30px;
            height: 3px;
            background-color: #4b6cb7;
            transition: width 0.3s ease;
        }
        
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .fade-in.appear {
            opacity: 1;
            transform: translateY(0);
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .pulse {
            animation: pulse 2s infinite;
        }
        
        .hover-lift {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .hover-lift:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
    `;
    document.head.appendChild(style);
    
    // 페이드인 애니메이션
    const fadeElements = document.querySelectorAll('.timeline-item, .research-item, .project-item, .focus-item, .skill-category, .card');
    
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
    });
    
    // 스크롤 시 애니메이션 실행
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(el => {
        fadeInObserver.observe(el);
    });
    
    // 카드 섹션 순차적 애니메이션
    const cardSections = ['#certificates', '#interests', '#github'];
    
    cardSections.forEach(sectionId => {
        const cards = document.querySelectorAll(`${sectionId} .card`);
        cards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;
        });
    });
    
    // 타임라인 항목 순차적 애니메이션
    const timelineEntries = document.querySelectorAll('.timeline-entry');
    timelineEntries.forEach((entry, index) => {
        entry.classList.add('fade-in');
        entry.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // 타임라인 애니메이션을 위한 observer
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });
    
    timelineEntries.forEach(entry => {
        timelineObserver.observe(entry);
    });
    
    // 프로젝트 아이템에 hover 효과 추가
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        item.classList.add('hover-lift');
    });
    
    // 스킬 진행 바 애니메이션
    const progressBars = document.querySelectorAll('.progress');
    const animateProgress = () => {
        progressBars.forEach(bar => {
            // 애니메이션 효과를 위해 일시적으로 너비를 0으로 설정
            const originalWidth = bar.style.width;
            bar.style.width = "0";
            
            // setTimeout을 사용하여 약간의 지연 후 원래 너비로 애니메이션
            setTimeout(() => {
                bar.style.width = originalWidth;
            }, 300);
        });
    };
    
    // 스킬 섹션이 보일 때 진행 바 애니메이션 실행
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateProgress();
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        skillsObserver.observe(skillsSection);
    }
    
    // 헤더 타이틀에 애니메이션 추가
    const headerTitle = document.querySelector('header h1');
    if (headerTitle && !headerTitle.innerHTML.includes('<span')) {
        setTimeout(() => {
            headerTitle.style.opacity = '0';
            headerTitle.style.transition = 'opacity 0.5s ease';
            
            setTimeout(() => {
                headerTitle.innerHTML = headerTitle.textContent.split('').map(letter => 
                    `<span style="display:inline-block;">${letter}</span>`
                ).join('');
                
                const spans = headerTitle.querySelectorAll('span');
                spans.forEach((span, i) => {
                    span.style.opacity = '0';
                    span.style.transform = 'translateY(20px)';
                    span.style.transition = `opacity 0.3s ease ${i * 0.05}s, transform 0.3s ease ${i * 0.05}s`;
                    
                    setTimeout(() => {
                        span.style.opacity = '1';
                        span.style.transform = 'translateY(0)';
                    }, 100);
                });
                
                headerTitle.style.opacity = '1';
            }, 500);
        }, 500);
    }
    
    // 스킬 태그에 호버 효과 추가
    const skillSpans = document.querySelectorAll('.skills-list span');
    skillSpans.forEach(span => {
        span.style.transition = 'color 0.3s ease';
        span.addEventListener('mouseover', () => {
            span.style.color = '#4b6cb7';
        });
        span.addEventListener('mouseout', () => {
            span.style.color = '';
        });
    });

    // 학력 토글 기능
    const eduToggleBtn = document.getElementById('edu-toggle-btn');
    const eduToggleContent = document.getElementById('edu-toggle-content');
    if (eduToggleBtn && eduToggleContent) {
        eduToggleBtn.addEventListener('click', function() {
            if (eduToggleContent.style.display === 'none') {
                eduToggleContent.style.display = 'block';
                eduToggleBtn.textContent = '접기';
            } else {
                eduToggleContent.style.display = 'none';
                eduToggleBtn.textContent = '더 보기';
            }
        });
    }

    // 논문·학회 활동 아코디언 토글 기능
    const researchAccordion = document.getElementById('research-accordion');
    if (researchAccordion) {
        const items = researchAccordion.querySelectorAll('.accordion-item');
        const toggles = researchAccordion.querySelectorAll('.accordion-toggle');
        // 최초 1개만 열기
        if (items.length > 0) {
            items[0].classList.add('open');
            toggles[0].classList.add('active');
        }
        toggles.forEach((toggle, idx) => {
            toggle.addEventListener('click', function() {
                items.forEach((item, i) => {
                    if (i === idx) {
                        const isOpen = item.classList.contains('open');
                        item.classList.toggle('open');
                        toggle.classList.toggle('active');
                        // 닫으려는 경우 return
                        if (isOpen) return;
                    } else {
                        item.classList.remove('open');
                        toggles[i].classList.remove('active');
                    }
                });
            });
        });
    }

    // 프로젝트 상세 모달 기능
    const projectCards = document.querySelectorAll('.project-card');
    const projectModal = document.getElementById('projectModal');
    const projectModalClose = document.getElementById('projectModalClose');
    const modalProjectTitle = document.getElementById('modalProjectTitle');
    const modalProjectDate = document.getElementById('modalProjectDate');
    const modalProjectDesc = document.getElementById('modalProjectDesc');
    const modalProjectTech = document.getElementById('modalProjectTech');

    const getProjectInfo = (card) => {
        const title = card.querySelector('h3')?.textContent || '';
        const date = card.querySelector('.project-date')?.textContent || '';
        const desc = card.querySelector('.project-desc')?.textContent || '';
        const tech = Array.from(card.querySelectorAll('.tech-tag')).map(tag => tag.textContent);
        return { title, date, desc, tech };
    };

    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const { title, date, desc, tech } = getProjectInfo(card);
            modalProjectTitle.textContent = title;
            modalProjectDate.textContent = date;
            modalProjectDesc.textContent = desc;
            modalProjectTech.innerHTML = tech.map(t => `<span class='tech-tag'>${t}</span>`).join(' ');
            projectModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    function closeProjectModal() {
        projectModal.style.display = 'none';
        document.body.style.overflow = '';
    }
    projectModalClose.addEventListener('click', closeProjectModal);
    projectModalClose.addEventListener('keydown', e => { if(e.key === 'Enter' || e.key === ' ') closeProjectModal(); });
    projectModal.addEventListener('click', e => { if(e.target === projectModal) closeProjectModal(); });
    document.addEventListener('keydown', e => { if(e.key === 'Escape') closeProjectModal(); });

    // 원형 그래프 퍼센트 적용
    const circles = document.querySelectorAll('.circle-graph');
    circles.forEach(circle => {
        const percent = circle.getAttribute('data-percent') || '80';
        circle.style.setProperty('--percent', percent);
    });

    // 카드 3D 틸트 효과
    function addCardTiltEffect(selector) {
        const cards = document.querySelectorAll(selector);
        cards.forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * 8;
                const rotateY = ((x - centerX) / centerX) * 12;
                card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }
    addCardTiltEffect('.card');
    addCardTiltEffect('.project-card');
    addCardTiltEffect('.hover-lift');

    // 인트로/로딩 애니메이션
    const introLoader = document.getElementById('introLoader');
    if (introLoader) {
        document.body.style.overflow = 'hidden';
        window.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                introLoader.classList.add('hide');
                document.body.style.overflow = '';
                setTimeout(() => { introLoader.style.display = 'none'; }, 700);
            }, 1000);
        });
    }

    // 방명록/피드백 폼 제출 처리
    const guestbookForm = document.getElementById('guestbookForm');
    const guestbookThanks = document.getElementById('guestbookThanks');
    if (guestbookForm) {
        guestbookForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('guestName').value.trim();
            const message = document.getElementById('guestMessage').value.trim();
            if (!name || !message) {
                alert('이름과 메시지를 모두 입력해 주세요.');
                return;
            }
            // 폼 초기화
            guestbookForm.reset();
            // 안내 메시지 표시
            guestbookThanks.style.display = 'block';
            setTimeout(() => {
                guestbookThanks.style.display = 'none';
            }, 2000);
        });
    }

    // particles.js 배경 효과 (네온/글로우 업그레이드)
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 120, density: { enable: true, value_area: 900 } },
                color: { value: ['#6d8ed9', '#ffd700', '#fff'] },
                shape: { type: 'circle' },
                opacity: { value: 0.7, random: true },
                size: { value: 3.5, random: true },
                line_linked: {
                    enable: true,
                    distance: 140,
                    color: '#fff',
                    opacity: 0.45,
                    width: 1.5,
                    shadow: { enable: true, color: '#ffd700', blur: 8 }
                },
                move: {
                    enable: true,
                    speed: 2.2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    attract: { enable: true, rotateX: 600, rotateY: 1200 }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'grab' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                },
                modes: {
                    grab: { distance: 180, line_linked: { opacity: 1 } },
                    bubble: { distance: 300, size: 8, duration: 2, opacity: 0.8, speed: 3 },
                    repulse: { distance: 200, duration: 0.4 },
                    push: { particles_nb: 4 },
                    remove: { particles_nb: 2 }
                }
            },
            retina_detect: true
        });
    }
}); 