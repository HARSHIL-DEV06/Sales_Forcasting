// Authentication Handler

// Login Form Handler
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;
        
        // Basic validation
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }
        
        // Store user data (in production, this would be server-side)
        const userData = {
            email: email,
            loggedIn: true,
            loginTime: new Date().toISOString()
        };
        
        if (remember) {
            localStorage.setItem('userData', JSON.stringify(userData));
        } else {
            sessionStorage.setItem('userData', JSON.stringify(userData));
        }
        
        // Add smooth transition
        document.querySelector('.auth-box').style.opacity = '0';
        document.querySelector('.auth-box').style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 300);
    });
}

// Register Form Handler
if (document.getElementById('registerForm')) {
    document.getElementById('registerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const branchId = document.getElementById('branchId').value;
        const fullName = document.getElementById('fullName').value;
        const storeName = document.getElementById('storeName').value;
        const workEmail = document.getElementById('workEmail').value;
        const password = document.getElementById('registerPassword').value;
        
        // Validation
        if (!branchId || !fullName || !storeName || !workEmail || !password) {
            alert('Please fill in all fields');
            return;
        }
        
        // Password validation
        const passwordRegex = /^(?=.*\d).{8,}$/;
        if (!passwordRegex.test(password)) {
            alert('Password must be at least 8 characters with one number');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(workEmail)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Store registration data
        const registrationData = {
            branchId: branchId,
            fullName: fullName,
            storeName: storeName,
            email: workEmail,
            registeredAt: new Date().toISOString()
        };
        
        localStorage.setItem('registrationData', JSON.stringify(registrationData));
        localStorage.setItem('userData', JSON.stringify({
            email: workEmail,
            loggedIn: true,
            loginTime: new Date().toISOString()
        }));
        
        // Add smooth transition
        document.querySelector('.auth-box').style.opacity = '0';
        document.querySelector('.auth-box').style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 300);
    });
}

// Check if user is logged in (for protected pages)
function checkAuth() {
    const userData = localStorage.getItem('userData') || sessionStorage.getItem('userData');
    
    if (!userData && window.location.pathname.includes('dashboard.html')) {
        window.location.href = 'login.html';
    }
}

// Run auth check on page load
if (window.location.pathname.includes('dashboard.html') || window.location.pathname.includes('analysis.html')) {
    checkAuth();
}

// Logout function (can be called from dashboard)
function logout() {
    localStorage.removeItem('userData');
    sessionStorage.removeItem('userData');
    window.location.href = 'login.html';
}

// Add smooth fade-in animation on page load
window.addEventListener('load', function() {
    const authBox = document.querySelector('.auth-box');
    if (authBox) {
        setTimeout(() => {
            authBox.style.opacity = '1';
        }, 100);
    }
});
