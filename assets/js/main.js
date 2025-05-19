// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Gallery Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Form Handling
const quoteForm = document.getElementById('quoteForm');

quoteForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Collect form data
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        service: document.getElementById('service').value,
        budget: document.getElementById('budget').value,
        message: document.getElementById('message').value,
        contactMethod: document.querySelector('input[name="contactMethod"]:checked').value
    };
    
    // Here you would typically send the data to a server
    // For demo purposes, just show an alert
    alert('Thank you for your request! We will contact you shortly.');
    
    // Reset the form
    quoteForm.reset();
});

// File Upload Preview
const fileInput = document.querySelector('input[type="file"]');
const uploadBtn = document.querySelector('.upload-btn');

fileInput.addEventListener('change', function() {
    if (this.files.length > 0) {
        const fileCount = this.files.length;
        uploadBtn.innerHTML = `<i class="fas fa-check"></i> ${fileCount} file(s) selected`;
        uploadBtn.style.borderColor = '#34a853';
        uploadBtn.style.color = '#34a853';
    } else {
        uploadBtn.innerHTML = `<i class="fas fa-cloud-upload-alt"></i> Drag & drop files here or click to browse`;
        uploadBtn.style.borderColor = '';
        uploadBtn.style.color = '';
    }
});