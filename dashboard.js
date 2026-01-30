// Dashboard JavaScript

// Check authentication
const userData = localStorage.getItem('userData') || sessionStorage.getItem('userData');
if (!userData) {
    window.location.href = 'login.html';
}

// CSV File Upload Handler
const dropZone = document.getElementById('dropZone');
const csvFileInput = document.getElementById('csvFileInput');

// Drag and drop functionality
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFileUpload(files[0]);
    }
});

// File input change handler
csvFileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        handleFileUpload(e.target.files[0]);
    }
});

// Handle file upload
function handleFileUpload(file) {
    if (!file.name.endsWith('.csv')) {
        alert('Please upload a CSV file');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const csvData = e.target.result;
        processCSVData(csvData);
        
        // Show success message
        const dropText = document.querySelector('.drop-text');
        dropText.innerHTML = '✓ File uploaded successfully!';
        dropText.style.color = 'var(--success-green)';
        
        // Redirect to analysis page after 2 seconds
        setTimeout(() => {
            window.location.href = 'analysis.html';
        }, 2000);
    };
    reader.readAsText(file);
}

// Process CSV data
function processCSVData(csvData) {
    // Store CSV data in localStorage for use in analysis page
    localStorage.setItem('csvData', csvData);
    
    // Parse CSV (basic parsing)
    const rows = csvData.split('\n');
    const headers = rows[0].split(',');
    
    console.log('CSV Headers:', headers);
    console.log('Total Rows:', rows.length);
}

// Start Feed Button
const startFeedBtn = document.getElementById('startFeedBtn');
if (startFeedBtn) {
    startFeedBtn.addEventListener('click', () => {
        // Simulate starting live feed
        startFeedBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6" fill="currentColor"/>
            </svg>
            Starting feed...
        `;
        
        setTimeout(() => {
            window.location.href = 'analysis.html';
        }, 1500);
    });
}

// Chart.js - Sales Trend Chart
const salesTrendCtx = document.getElementById('salesTrendChart');
if (salesTrendCtx) {
    // Generate sample data for 30 days
    const labels = [];
    const data = [];
    
    for (let i = 30; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        
        // Generate random sales data with slight upward trend
        const baseValue = 15000;
        const trend = (30 - i) * 50;
        const randomVariation = Math.random() * 3000 - 1500;
        data.push(baseValue + trend + randomVariation);
    }
    
    new Chart(salesTrendCtx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Daily Sales',
                data: data,
                borderColor: '#4169FF',
                backgroundColor: 'rgba(65, 105, 255, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: '#4169FF',
                pointHoverBorderColor: '#fff',
                pointHoverBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return '₹ ' + context.parsed.y.toLocaleString('en-IN');
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        maxTicksLimit: 8,
                        font: {
                            size: 11
                        }
                    }
                },
                y: {
                    beginAtZero: false,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return '₹ ' + (value / 1000).toFixed(0) + 'k';
                        },
                        font: {
                            size: 11
                        }
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    });
}

// Forecast Chart
const forecastCtx = document.getElementById('forecastChart');
if (forecastCtx) {
    new Chart(forecastCtx, {
        type: 'bar',
        data: {
            labels: ['Oct 2025', 'Nov 2025', 'Dec 2025'],
            datasets: [{
                label: 'Forecasted Sales',
                data: [15500, 16200, 17600],
                backgroundColor: [
                    '#10B981',
                    '#06B6D4',
                    '#A855F7'
                ],
                borderRadius: 8,
                barThickness: 60
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            return 'Avg Sales: ₹ ' + context.parsed.y.toLocaleString('en-IN');
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return '₹ ' + (value / 1000).toFixed(0) + 'k';
                        }
                    }
                }
            }
        }
    });
}

// Time filter buttons
const timeButtons = document.querySelectorAll('.time-btn');
timeButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        timeButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // In production, this would update the chart data
        console.log('Time filter changed to:', this.textContent);
    });
});

// User button
const userBtn = document.querySelector('.user-btn');
if (userBtn) {
    userBtn.addEventListener('click', () => {
        const confirmLogout = confirm('Do you want to logout?');
        if (confirmLogout) {
            localStorage.removeItem('userData');
            sessionStorage.removeItem('userData');
            window.location.href = 'login.html';
        }
    });
}
