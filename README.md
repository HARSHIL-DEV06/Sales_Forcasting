# Sales Forecasting Application

A modern, responsive web application for sales forecasting using live POS data simulation.

## Features

✨ **Beautiful UI Design**
- Modern gradient backgrounds
- Smooth animations and transitions
- Professional color scheme
- Responsive design for all devices

📊 **Complete Dashboard**
- Real-time sales statistics
- Interactive charts using Chart.js
- CSV file upload functionality
- Live data feed simulation

🔐 **Authentication System**
- Login page with remember me option
- Registration page with validation
- Session management
- Protected routes

## File Structure

```
├── login.html          - Login page
├── register.html       - Registration page
├── dashboard.html      - Main dashboard with upload
├── analysis.html       - Analysis page with live feed
├── styles.css          - All styling (shared across pages)
├── auth.js            - Authentication logic
├── dashboard.js       - Dashboard functionality
└── analysis.js        - Analysis page functionality
```

## How to Use

### 1. Login Page (`login.html`)
- Enter email/username and password
- Check "Remember me" to stay logged in
- Click "Login" to access dashboard
- Click "Register now" to create a new account

### 2. Registration Page (`register.html`)
- Fill in all required fields:
  - Branch ID
  - Full Name
  - Store/Organization Name
  - Work Email
  - Password (must be 8+ characters with at least one number)
- Automatically redirects to dashboard after registration

### 3. Dashboard Page (`dashboard.html`)
- View sales statistics in 4 cards:
  - Total Sales
  - Average Daily Sales
  - Recent Growth
  - Expected Growth
- Upload CSV files by:
  - Dragging and dropping files
  - Clicking "Upload CSV" button
- View historical sales trend chart
- View 3-month sales forecast chart
- Click "Start live feed" to begin simulation

### 4. Analysis Page (`analysis.html`)
- Shows live feed active status
- Real-time updating statistics
- Enhanced charts with more data
- Click "Stop feed" to return to dashboard

## Features in Detail

### Authentication
- Form validation
- Password strength requirements
- Local/session storage for user data
- Automatic redirect to login if not authenticated

### CSV Upload
- Drag and drop support
- File type validation
- Success feedback
- Automatic navigation to analysis page

### Charts
- Line chart for historical sales trends
- Bar chart for sales forecasts
- Interactive tooltips
- Time range filters (7D, 1M, 6M, 1Y, Max)
- Smooth animations

### Live Data Simulation
- Auto-updates statistics every 3 seconds
- Animated number transitions
- Visual pulse effect on live badge

### Responsive Design
- Mobile-friendly layout
- Tablet optimization
- Desktop-first design
- Touch-friendly controls

## Technology Stack

- **HTML5** - Structure
- **CSS3** - Styling with modern features
  - CSS Grid & Flexbox
  - CSS Variables
  - Animations & Transitions
- **JavaScript (ES6+)** - Functionality
  - Event handling
  - DOM manipulation
  - Data visualization
- **Chart.js** - Data visualization
- **Google Fonts** - Typography (Outfit & DM Sans)

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Setup Instructions

1. Download all 8 files to the same directory
2. Open `login.html` in a web browser
3. No server setup required - runs completely client-side

## Color Scheme

- **Primary Blue**: #4169FF
- **Success Green**: #10B981
- **Cyan**: #06B6D4
- **Purple**: #A855F7
- **Backgrounds**: Gray scale (50-900)

## Future Enhancements

The application includes placeholder sections for:
- Category-wise Sales Analysis
- Store-wise Performance

These can be implemented by adding more pages or expanding the existing ones.

## Notes

- All data is stored in browser's localStorage/sessionStorage
- CSV processing is simulated (not fully parsed in this version)
- Charts use randomly generated sample data for demonstration
- In production, connect to a real backend API

## Credits

Designed and developed with attention to detail and user experience.
