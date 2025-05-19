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

// File Upload Preview
const fileInput = document.querySelector('input[type="file"]');
const uploadBtn = document.querySelector('.upload-btn');

if (fileInput && uploadBtn) {
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
}

// Email Quote Form handling
const quoteForm = document.getElementById('quoteForm');
const submitQuoteBtn = document.getElementById('submitQuoteBtn');

if (quoteForm) {
    quoteForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent the default form submission
        
        // Get form values
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const service = document.getElementById('service').value;
        const budget = document.getElementById('budget').value;
        const message = document.getElementById('message').value;
        const contactMethod = document.querySelector('input[name="contactMethod"]:checked').value;
        
        // Create email subject
        const subject = `Quote Request for ${service} from ${firstName} ${lastName}`;
        
        // Create email body
        let body = `Name: ${firstName} ${lastName}%0D%0A`;
        body += `Email: ${email}%0D%0A`;
        body += `Phone: ${phone}%0D%0A`;
        body += `Address: ${address}%0D%0A`;
        body += `Service Needed: ${service}%0D%0A`;
        body += `Budget: ${budget}%0D%0A`;
        body += `Preferred Contact Method: ${contactMethod}%0D%0A`;
        body += `%0D%0AMessage:%0D%0A${message}`;
        
        // Create mailto link
        const mailtoLink = `mailto:travisgolembiewski@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
        
        // Open the email client
        window.location.href = mailtoLink;
        
        // Show success message
        alert('Your email client will open with your quote information. Please send the email to complete your request.');
        
        // Reset the form
        quoteForm.reset();
    });
}

// Newsletter Form handling
const newsletterForm = document.getElementById('newsletterForm');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent the default form submission
        
        // Get email value
        const email = document.getElementById('newsletter_email').value;
        
        // Create email subject
        const subject = `Newsletter Signup from ${email}`;
        
        // Create email body
        let body = `Please add me to your newsletter.%0D%0A`;
        body += `Email: ${email}`;
        
        // Create mailto link
        const mailtoLink = `mailto:info@madpressure.com?subject=${encodeURIComponent(subject)}&body=${body}`;
        
        // Open the email client
        window.location.href = mailtoLink;
        
        // Show success message
        alert('Your email client will open. Please send the email to complete your newsletter signup.');
        
        // Reset the form
        newsletterForm.reset();
    });
}