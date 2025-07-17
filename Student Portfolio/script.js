// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinkItems = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const contactForm = document.getElementById('contactForm');
const yearElement = document.getElementById('year');

// Typing effect variables (make sure these exist in your HTML/script)
const typingElement = document.querySelector('.typing'); // ← Make sure this class exists
const words = ["Developer", "Designer", "Freelancer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

// Sample social + contact data (required for `loadSocialLinks` and `loadContactDetails`)
const contactDetails = [
    { icon: "fas fa-envelope", text: "your.email@example.com" },
    { icon: "fas fa-phone", text: "+91 12345 67890" },
    { icon: "fas fa-map-marker-alt", text: "Chennai, India" }
];

const socialLinks = [
    { icon: "fab fa-github", url: "https://github.com/yourusername" },
    { icon: "fab fa-linkedin", url: "https://linkedin.com/in/yourprofile" },
    { icon: "fab fa-twitter", url: "https://twitter.com/yourhandle" }
];

// Education Data
const educationData = [
    {
        position: 'left',
        title: "Bachelor's in Computer Science Engineering",
        date: "2025 - Present",
        institution: "SRM University",
        description: "Specializing in Artificial Intelligence and Machine Learning"
    },
    {
        position: 'right',
        title: "Intermediate",
        date: "2021 - 2023",
        institution: "Tirumala Junior College",
        description: "GPA: 8.8/10.0"
    },
    {
        position: 'left',
        title: "High School",
        date: "2007 - 2021",
        institution: "Ashram Public School",
        description: "Honors Student"
    }
];

// Skills Data
const skillsData = {
    technical: [
        { name: "JavaScript", level: 90 },
        { name: "Python", level: 85 },
        { name: "HTML/CSS", level: 95 },
        { name: "React", level: 80 }
    ],
    design: [
        { name: "UI/UX Design", level: 75 },
        { name: "Adobe Photoshop", level: 70 },
        { name: "Figma", level: 85 }
    ],
    soft: [
        { name: "Communication", level: 90 },
        { name: "Teamwork", level: 85 },
        { name: "Problem Solving", level: 95 },
        { name: "Time Management", level: 80 }
    ]
};

// Initialize Portfolio
function initPortfolio() {
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    loadEducation();
    loadSkills();
    loadContactDetails();
    loadSocialLinks();
    type();
    setupEventListeners();
}

// Load Education Timeline
function loadEducation() {
    const timeline = document.querySelector('.timeline');
    if (!timeline) return;

    educationData.forEach(item => {
        const timelineItem = document.createElement('div');
        timelineItem.className = `timeline-item ${item.position}`;

        timelineItem.innerHTML = `
            <div class="timeline-content">
                <h3>${item.title}</h3>
                <p class="timeline-date">${item.date}</p>
                <p>${item.institution}</p>
                <p>${item.description}</p>
            </div>
        `;

        timeline.appendChild(timelineItem);
    });
}

// Load Skills
function loadSkills() {
    const skillsContainer = document.querySelector('.skills-container');
    if (!skillsContainer) return;

    for (const category in skillsData) {
        const skillCategory = document.createElement('div');
        skillCategory.className = 'skill-category';

        let categoryTitle = '';
        switch (category) {
            case 'technical':
                categoryTitle = 'Technical Skills';
                break;
            case 'design':
                categoryTitle = 'Design Skills';
                break;
            case 'soft':
                categoryTitle = 'Soft Skills';
                break;
        }

        skillCategory.innerHTML = `<h3>${categoryTitle}</h3>`;

        const skillsList = document.createElement('div');
        skillsList.className = 'skills-list'; // optional, for styling

        skillsData[category].forEach(skill => {
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item';

            skillItem.innerHTML = `
                <div class="skill-name">
                    <span>${skill.name}</span>
                    <span>${skill.level}%</span>
                </div>
                <div class="skill-bar">
                    <div class="skill-progress" data-level="${skill.level}"></div>
                </div>
            `;

            skillsList.appendChild(skillItem);
        });

        skillCategory.appendChild(skillsList);
        skillsContainer.appendChild(skillCategory);
    }

    animateSkills();
}

// Load Contact Details
function loadContactDetails() {
    const contactDetailsList = document.querySelector('.contact-details');
    if (!contactDetailsList) return;

    contactDetails.forEach(detail => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="${detail.icon}"></i><span>${detail.text}</span>`;
        contactDetailsList.appendChild(li);
    });
}

// Load Social Links
function loadSocialLinks() {
    const socialLinksContainer = document.querySelector('.social-links');
    if (!socialLinksContainer) return;

    socialLinks.forEach(link => {
        const a = document.createElement('a');
        a.href = link.url;
        a.target = "_blank";
        a.innerHTML = `<i class="${link.icon}"></i>`;
        socialLinksContainer.appendChild(a);
    });
}

// Typing Effect
function type() {
    if (!typingElement) return;

    const currentWord = words[wordIndex];
    const currentChar = currentWord.substring(0, charIndex);

    typingElement.textContent = currentChar;
    typingElement.classList.add('typing-cursor');

    if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
        setTimeout(type, 100);
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(type, 50);
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
            wordIndex = (wordIndex + 1) % words.length;
        }
        setTimeout(type, 1000);
    }
}

// Animate Skills
function animateSkills() {
    const skillProgressBars = document.querySelectorAll('.skill-progress');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const level = entry.target.getAttribute('data-level');
                entry.target.style.width = `${level}%`;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillProgressBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Setup Event Listeners
function setupEventListeners() {
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    navLinkItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 300) {
                current = section.getAttribute('id');
            }
        });

        navLinkItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });

    // Contact Form Submission
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);

            fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        alert("✅ Message sent successfully!");
                        contactForm.reset();
                    } else {
                        alert("❌ Error: " + data.message);
                    }
                })
                .catch(() => {
                    alert("⚠️ Something went wrong. Please try again later.");
                });
        });
    }
}

// Run the Portfolio Script
document.addEventListener('DOMContentLoaded', initPortfolio);
