# Professional Portfolio

A secure, high-performance portfolio website built with vanilla JavaScript and optimized for production deployment.

## Features

- Responsive design optimized for all devices
- Government-level security implementation
- DDoS protection and rate limiting
- Advanced content security policies
- Professional scrollbar styling
- Interactive project modals with filtering
- Real-time clipboard functionality
- Optimized performance with compression and caching

## Security Features

- Comprehensive HTTP security headers
- Content Security Policy (CSP) implementation
- XSS and clickjacking protection
- Rate limiting and DDoS mitigation
- Malicious request blocking
- Sensitive file access prevention
- Attack pattern detection and blocking

## Technology Stack

- Frontend: Vanilla JavaScript, CSS3, HTML5
- Server: Nginx with advanced security configuration
- Deployment: Docker containerization
- Hosting: Railway platform

## File Structure

```
├── public/
│   ├── css/
│   │   └── styles.css          # Main stylesheet
│   ├── js/
│   │   ├── portfolio.js        # Core application logic
│   │   └── navigation.js       # Navigation functionality
│   ├── index.html              # Main HTML file
│   └── personal-info.json      # Portfolio data
├── nginx.conf                  # Security-hardened Nginx configuration
├── Dockerfile                  # Container configuration
└── README.md                   # Documentation
```

## Deployment

### Railway Deployment

1. Push repository to GitHub
2. Connect Railway account to GitHub
3. Create new project from GitHub repository
4. Railway will automatically deploy using Dockerfile
5. Application runs on port 80

### Local Development

```bash
# Serve files locally
python3 -m http.server 8000

# Access at http://localhost:8000/public/
```

### Docker Deployment

```bash
# Build image
docker build -t portfolio .

# Run container
docker run -p 80:80 portfolio
```

## Configuration

### Personal Information

Edit `public/personal-info.json` to customize:

- Personal details and contact information
- Work experience and education
- Technical skills and proficiencies
- Project portfolio with descriptions
- Language capabilities

### Security Configuration

The nginx.conf file includes:

- HTTP security headers
- Content Security Policy rules
- Rate limiting configurations
- Attack pattern blocking
- File access restrictions

## Performance Optimizations

- Gzip compression for all text-based files
- Long-term caching for static assets
- Optimized image loading
- Minified CSS and JavaScript
- Efficient DOM manipulation

## Browser Support

- Chrome/Chromium 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Security Compliance

This portfolio implements security measures equivalent to government and enterprise standards:

- OWASP security guidelines compliance
- Defense against common web vulnerabilities
- Comprehensive logging and monitoring
- Secure file handling and access control

## Maintenance

Regular security updates are recommended:

1. Monitor nginx security advisories
2. Update base Docker images
3. Review and update CSP policies
4. Monitor access logs for suspicious activity

## License

Private portfolio project. All rights reserved.