// Analysis Page JavaScript

// Check authentication
const userData = localStorage.getItem('userData') || sessionStorage.getItem('userData');
if (!userData) {
    window.location.href = 'login.html';
}

// Stop Feed Button
const stopFeedBtn = document.getElementById('stopFeedBtn');
if (stopFeedBtn) {
    stopFeedBtn.addEventListener('click', () => {
        // Simulate stopping live feed
        stopFeedBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="4" y="4" width="8" height="8" fill="currentColor"/>
            </svg>
            Stopping feed...
        `;
        
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    });
}

// Chart.js - Sales Trend Chart for Analysis
const salesTrendCtx = document.getElementById('salesTrendChartAnalysis');
if (salesTrendCtx) {
    // Generate sample data for 30 days with higher values
    const labels = [];
    const data = [];
    
    for (let i = 30; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        
        // Generate higher sales data with upward trend
        const baseValue = 20000;
        const trend = (30 - i) * 100;
        const randomVariation = Math.random() * 4000 - 2000;
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
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 8,
                pointHoverBackgroundColor: '#4169FF',
                pointHoverBorderColor: '#fff',
                pointHoverBorderWidth: 3
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
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    padding: 14,
                    displayColors: false,
                    titleFont: {
                        size: 13,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 14
                    },
                    callbacks: {
                        label: function(context) {
                            return 'Sales: ₹ ' + context.parsed.y.toLocaleString('en-IN');
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
                        },
                        color: '#6B7280'
                    }
                },
                y: {
                    beginAtZero: false,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        callback: function(value) {
                            return '₹ ' + (value / 1000).toFixed(0) + 'k';
                        },
                        font: {
                            size: 11
                        },
                        color: '#6B7280'
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

// Forecast Chart for Analysis
const forecastCtx = document.getElementById('forecastChartAnalysis');
if (forecastCtx) {
    const forecastData = {
        labels: ['Oct 2025', 'Nov 2025', 'Dec 2025'],
        datasets: [{
            label: 'Forecasted Sales',
            data: [18000, 19500, 21000],
            backgroundColor: [
                '#10B981',
                '#06B6D4',
                '#A855F7'
            ],
            borderRadius: 10,
            barThickness: 80
        }]
    };
    
    const forecastChart = new Chart(forecastCtx, {
        type: 'bar',
        data: forecastData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    padding: 14,
                    displayColors: true,
                    titleFont: {
                        size: 13,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 14
                    },
                    callbacks: {
                        label: function(context) {
                            return 'Avg Daily Sales: ₹ ' + context.parsed.y.toLocaleString('en-IN');
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
                        font: {
                            size: 12,
                            weight: '500'
                        },
                        color: '#374151'
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        callback: function(value) {
                            return '₹ ' + (value / 1000).toFixed(0) + 'k';
                        },
                        font: {
                            size: 11
                        },
                        color: '#6B7280'
                    }
                }
            }
        }
    });
    
    // Animate bars on load
    setTimeout(() => {
        forecastChart.update({
            duration: 800,
            easing: 'easeInOutQuart'
        });
    }, 100);
}

// Time filter buttons
const timeButtons = document.querySelectorAll('.time-btn');
timeButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        timeButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Show loading state
        const chartArea = this.closest('.chart-card').querySelector('.chart-area');
        chartArea.style.opacity = '0.5';
        
        setTimeout(() => {
            chartArea.style.opacity = '1';
            console.log('Chart updated for:', this.textContent);
        }, 500);
    });
});

// Live data simulation
let liveDataInterval;

function startLiveDataSimulation() {
    // Simulate live data updates every 3 seconds
    liveDataInterval = setInterval(() => {
        updateStats();
    }, 3000);
}

function updateStats() {
    // Get random small increase
    const statValues = document.querySelectorAll('.stat-value');
    
    statValues.forEach((statValue, index) => {
        if (index === 0 || index === 1) { // Total Sales and Average Daily Sales
            const currentText = statValue.textContent;
            const currentValue = parseInt(currentText.replace(/[^0-9]/g, ''));
            const increase = Math.floor(Math.random() * 500) + 100;
            const newValue = currentValue + increase;
            
            // Animate value change
            animateValue(statValue, currentValue, newValue, 1000);
        }
    });
}

function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        
        // Format with rupee symbol and commas
        element.textContent = '₹ ' + Math.floor(current).toLocaleString('en-IN');
    }, 16);
}

// Start live simulation on page load
window.addEventListener('load', () => {
    startLiveDataSimulation();
    
    // Add pulse animation to live badge
    const liveBadge = document.querySelector('.info-badge.live');
    if (liveBadge) {
        setInterval(() => {
            liveBadge.style.transform = 'scale(1.1)';
            setTimeout(() => {
                liveBadge.style.transform = 'scale(1)';
            }, 200);
        }, 2000);
    }
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (liveDataInterval) {
        clearInterval(liveDataInterval);
    }
});

// User button
const userBtn = document.querySelector('.user-btn');
if (userBtn) {
    userBtn.addEventListener('click', () => {
        const confirmLogout = confirm('Do you want to logout?');
        if (confirmLogout) {
            if (liveDataInterval) {
                clearInterval(liveDataInterval);
            }
            localStorage.removeItem('userData');
            sessionStorage.removeItem('userData');
            window.location.href = 'login.html';
        }
    });
}

// Future cards hover effect
const futureCards = document.querySelectorAll('.future-card');
futureCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});
