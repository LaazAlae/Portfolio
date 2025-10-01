# Professional Portfolio Template

A secure, scalable, and highly customizable professional portfolio built with industry best practices. This template is designed to be easily deployed on Digital Ocean or any cloud platform using Docker, while maintaining enterprise-level security and performance standards.

## Features

### Security First
- **Comprehensive Security Headers**: Helmet.js with CSP, HSTS, and XSS protection
- **Rate Limiting**: Configurable rate limits for API and general requests
- **Input Sanitization**: Automatic sanitization of all user inputs
- **CORS Protection**: Configurable CORS with specific origin restrictions
- **Non-root Container**: Docker containers run as non-privileged users
- **Security Auditing**: Built-in security best practices and monitoring

### Performance & Scalability
- **Multi-stage Docker Build**: Optimized container images for production
- **Nginx Reverse Proxy**: Production-ready nginx configuration with SSL
- **Compression**: Gzip compression for all static assets
- **Caching**: Intelligent caching strategies for optimal performance
- **Health Checks**: Built-in health monitoring for container orchestration

### Developer Experience
- **One-File Configuration**: Update `config/personal-info.json` to customize everything
- **Environment Variables**: Secure configuration management with `.env` files
- **Local Development**: Easy local development without Docker
- **Industry Structure**: Clean, maintainable codebase following best practices
- **Responsive Design**: Perfect on all devices and screen sizes

## Quick Start

### Local Development (Recommended for Testing)

1. **Clone and Setup**
   ```bash
   cd "/Users/personal/Desktop/simple portfolio"
   npm install
   ```

2. **Configure Your Information**
   - Edit `config/personal-info.json` with your personal details
   - Copy `.env.example` to `.env` and configure as needed

3. **Run Locally**
   ```bash
   npm run dev
   ```
   Visit: http://localhost:3000

### Docker Deployment (Production)

1. **Quick Docker Run**
   ```bash
   npm run docker:build
   npm run docker:run
   ```

2. **Full Production Stack with Nginx**
   ```bash
   docker-compose --profile production up -d
   ```

### Digital Ocean Deployment

1. **Setup Digital Ocean Droplet**
   - Create a new droplet with Docker pre-installed
   - SSH into your droplet

2. **Deploy Your Portfolio**
   ```bash
   # Upload your portfolio
   scp -r . user@your-droplet-ip:/var/www/portfolio

   # SSH into droplet
   ssh user@your-droplet-ip
   cd /var/www/portfolio

   # Configure environment
   cp .env.example .env
   nano .env  # Edit with your settings

   # Deploy with Docker
   docker-compose up -d
   ```

3. **SSL Certificate (Optional but Recommended)**
   ```bash
   # Install certbot for free SSL
   sudo apt update
   sudo apt install certbot

   # Get SSL certificate
   sudo certbot certonly --standalone -d yourdomain.com

   # Update nginx.conf with your certificate paths
   ```

## Configuration

### Personal Information
Edit `config/personal-info.json` to customize:
- Personal details (name, title, contact)
- About section content
- Education information
- Work experience
- Skills and technologies
- Project portfolio
- Languages spoken

### Environment Variables
Configure `.env` file:
```bash
PORT=3000
NODE_ENV=production
CORS_ORIGIN=https://yourdomain.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Optional: AI API keys for future features
OPENAI_API_KEY=your_key_here
ANTHROPIC_API_KEY=your_key_here
```

### Security Configuration
The application includes multiple security layers:
- **Helmet.js**: Security headers and CSP
- **Rate Limiting**: Configurable request limits
- **CORS**: Cross-origin request protection
- **Input Sanitization**: XSS and injection prevention
- **Environment Isolation**: Secure environment variable handling

## API Endpoints

- `GET /api/portfolio` - Get all portfolio data
- `GET /api/project/:id` - Get specific project details
- `GET /api/health` - Health check endpoint
- `POST /api/contact` - Contact form (placeholder for future implementation)

## File Structure

```
portfolio/
├── src/                    # Application source code
│   ├── app.js             # Main application entry point
│   ├── config/            # Configuration management
│   ├── middleware/        # Security and utility middleware
│   └── routes/            # API route handlers
├── public/                # Static assets
│   ├── css/               # Stylesheets
│   ├── js/                # Client-side JavaScript
│   └── index.html         # Main HTML template
├── config/                # Configuration files
│   └── personal-info.json # Your personal information
├── docker/                # Docker configuration
├── docs/                  # Documentation
├── Dockerfile             # Production Docker image
├── docker-compose.yml     # Container orchestration
└── nginx.conf             # Production nginx configuration
```

## Customization

### Adding New Sections
1. Update `config/personal-info.json` with new data
2. Modify `public/js/portfolio.js` to render new sections
3. Add corresponding CSS styles in `public/css/styles.css`

### Changing Colors/Theme
Edit CSS variables in `public/css/styles.css`:
```css
:root {
    --bg-color: #f5f1ea;
    --text-color: #3c2415;
    --primary-color: #2d5016;
    --secondary-color: #8b4513;
    --accent-color: #9caf88;
}
```

### Adding New Features
The modular architecture makes it easy to extend:
- Add new API endpoints in `src/routes/`
- Create new middleware in `src/middleware/`
- Add client-side features in `public/js/`

## Security Best Practices

This portfolio implements enterprise-level security:

1. **Container Security**
   - Non-root user execution
   - Read-only filesystem
   - Minimal attack surface

2. **Network Security**
   - Rate limiting on all endpoints
   - CORS protection
   - Security headers (HSTS, CSP, etc.)

3. **Application Security**
   - Input sanitization
   - XSS prevention
   - SQL injection protection (when database is added)

4. **Infrastructure Security**
   - SSL/TLS encryption
   - Nginx security configuration
   - Environment variable protection

## Performance Optimization

- **Multi-stage Docker builds** for minimal image size
- **Gzip compression** for all text assets
- **Static asset caching** with proper cache headers
- **CDN ready** for global content delivery
- **Health checks** for reliable container orchestration

## Monitoring and Maintenance

### Health Monitoring
The application includes health check endpoints:
- `GET /health` - Basic health status
- `GET /api/health` - Detailed API health with uptime

### Logs
Application logs are available:
```bash
# View logs in Docker
docker logs portfolio_portfolio_1

# Follow logs in real-time
docker logs -f portfolio_portfolio_1
```

### Updates
To update your portfolio:
1. Modify `config/personal-info.json`
2. Restart the container:
   ```bash
   docker-compose restart
   ```

## Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# Find process using port 3000
lsof -i :3000
# Kill the process
kill -9 <PID>
```

**Docker Permission Issues**
```bash
# Add user to docker group
sudo usermod -aG docker $USER
# Re-login or restart terminal
```

**SSL Certificate Issues**
```bash
# Verify certificate
openssl x509 -in /path/to/cert.pem -text -noout
# Check nginx configuration
nginx -t
```

## Support

This portfolio template is designed to be self-contained and easy to deploy. For additional customization or enterprise features, the modular architecture allows for easy extension.

## License

MIT License - Feel free to use this template for your professional portfolio.

---

**Built with security, performance, and professionalism in mind.**