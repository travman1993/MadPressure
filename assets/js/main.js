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
const filePreview = document.getElementById('filePreview');
let fileData = []; // Array to store file data for preview

if (fileInput && uploadBtn) {
    // Make the upload button trigger the file input
    uploadBtn.addEventListener('click', function() {
        fileInput.click();
    });
    
    // Handle the drag and drop functionality
    uploadBtn.addEventListener('dragover', function(e) {
        e.preventDefault();
        uploadBtn.style.borderColor = '#34a853';
        uploadBtn.style.backgroundColor = 'rgba(52, 168, 83, 0.1)';
    });
    
    uploadBtn.addEventListener('dragleave', function() {
        uploadBtn.style.borderColor = '';
        uploadBtn.style.backgroundColor = '';
    });
    
    uploadBtn.addEventListener('drop', function(e) {
        e.preventDefault();
        uploadBtn.style.borderColor = '';
        uploadBtn.style.backgroundColor = '';
        
        if (e.dataTransfer.files.length > 0) {
            fileInput.files = e.dataTransfer.files;
            handleFileSelect(e.dataTransfer.files);
        }
    });
    
    // Handle file selection
    fileInput.addEventListener('change', function() {
        if (this.files.length > 0) {
            handleFileSelect(this.files);
        }
    });
    
    function handleFileSelect(files) {
        const fileCount = files.length;
        uploadBtn.innerHTML = `<i class="fas fa-check"></i> ${fileCount} file(s) selected`;
        uploadBtn.style.borderColor = '#34a853';
        uploadBtn.style.color = '#34a853';
        
        // Clear previous previews
        filePreview.innerHTML = '';
        fileData = [];
        
        // Process each file
        Array.from(files).forEach((file, index) => {
            if (!file.type.match('image.*')) {
                return; // Skip non-image files
            }
            
            const reader = new FileReader();
            
            reader.onload = function(e) {
                // Store the file data
                fileData.push({
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    data: e.target.result
                });
                
                // Create preview element
                const previewContainer = document.createElement('div');
                previewContainer.className = 'preview-item';
                
                const previewImg = document.createElement('img');
                previewImg.src = e.target.result;
                previewImg.alt = file.name;
                previewImg.style.width = '100px';
                previewImg.style.height = '100px';
                previewImg.style.objectFit = 'cover';
                previewImg.style.borderRadius = '4px';
                previewImg.style.marginRight = '10px';
                
                const previewInfo = document.createElement('div');
                previewInfo.className = 'preview-info';
                previewInfo.innerHTML = `
                    <p>${file.name}</p>
                    <p>${(file.size / 1024).toFixed(2)} KB</p>
                `;
                
                const removeBtn = document.createElement('button');
                removeBtn.className = 'remove-file';
                removeBtn.innerHTML = '<i class="fas fa-times"></i>';
                removeBtn.style.background = 'none';
                removeBtn.style.border = 'none';
                removeBtn.style.color = '#ff4d4d';
                removeBtn.style.cursor = 'pointer';
                removeBtn.style.fontSize = '16px';
                
                removeBtn.addEventListener('click', function() {
                    // Remove this file from preview and data
                    fileData = fileData.filter(f => f.name !== file.name);
                    previewContainer.remove();
                    
                    // Update the upload button text
                    if (fileData.length === 0) {
                        uploadBtn.innerHTML = `<i class="fas fa-cloud-upload-alt"></i> Drag & drop files here or click to browse`;
                        uploadBtn.style.borderColor = '';
                        uploadBtn.style.color = '';
                    } else {
                        uploadBtn.innerHTML = `<i class="fas fa-check"></i> ${fileData.length} file(s) selected`;
                    }
                });
                
                previewContainer.appendChild(previewImg);
                previewContainer.appendChild(previewInfo);
                previewContainer.appendChild(removeBtn);
                
                previewContainer.style.display = 'flex';
                previewContainer.style.alignItems = 'center';
                previewContainer.style.marginBottom = '10px';
                previewContainer.style.padding = '8px';
                previewContainer.style.backgroundColor = '#f8f8f8';
                previewContainer.style.borderRadius = '4px';
                
                filePreview.appendChild(previewContainer);
            };
            
            reader.readAsDataURL(file);
        });
    }
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
        
        // Add note about attachments if there are any
        if (fileData.length > 0) {
            body += `%0D%0A%0D%0A${fileData.length} image(s) were attached by the customer via the website form.`;
        }
        
        // Create mailto link
        const mailtoLink = `mailto:kylem731@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
        
        // Open the email client
        window.location.href = mailtoLink;
        
        // Create a message about the attachments
        if (fileData.length > 0) {
            alert('Your email client will open with your quote information.\n\nIMPORTANT: Your images are not automatically attached to the email due to browser limitations. Please manually attach the images you selected to the email before sending.');
        } else {
            alert('Your email client will open with your quote information. Please send the email to complete your request.');
        }
        
        // Reset the form and file preview
        fileData = [];
        if (filePreview) {
            filePreview.innerHTML = '';
        }
        if (uploadBtn) {
            uploadBtn.innerHTML = `<i class="fas fa-cloud-upload-alt"></i> Drag & drop files here or click to browse`;
            uploadBtn.style.borderColor = '';
            uploadBtn.style.color = '';
        }
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