# Pruek-pruek Portfolio

A modern, responsive portfolio website built with pure HTML, CSS, and JavaScript. Designed for GitHub Pages deployment with no build tools required.

## Features

- **Modern Design**: Clean, premium aesthetic with gradient accents
- **Responsive Layout**: Mobile-first design that works on all devices
- **Dark/Light Mode**: Theme toggle with localStorage persistence
- **Accessibility**: Semantic HTML, keyboard navigation, screen reader support
- **Interactive Elements**:
  - Smooth scrolling navigation
  - Active section highlighting
  - Project filtering (All/Web/Systems/AI)
  - Contact form with validation
- **Media Showcase**: Support for image galleries and video cards
- **No Dependencies**: Pure static site, no frameworks or build tools

## File Structure

```
Pruek-pruek-Portfolio/
├── index.html          # Main HTML file
├── styles.css          # All CSS with theme system
├── script.js           # All JavaScript functionality
├── README.md           # This file
├── .gitignore          # Git ignore rules
└── assets/             # Media assets (create this folder)
    ├── media/
    │   ├── aca_mozart_ee_ai/     # Image files go here
    │   └── sigma_alpha/          # Video files go here
    └── favicon.ico     # Optional favicon
```

## Adding Your Content

### 1. Media Files

Place your media files in the appropriate directories:

#### Images (Gallery/Thumbnails)
- **Location**: `assets/media/aca_mozart_ee_ai/`
- **Supported formats**: `.jpg`, `.png`, `.webp`
- **Naming convention**: Use descriptive names like:
  - `project-showcase-1.jpg`
  - `artwork-series-2.png`
  - `generative-pattern-3.webp`

#### Videos (MP4 files)
- **Location**: `assets/media/sigma_alpha/`
- **Format**: `.mp4` (recommended for web compatibility)
- **Naming convention**:
  - `demo-showcase.mp4`
  - `tutorial-walkthrough.mp4`
  - `motion-reel.mp4`

### 2. Updating HTML for Media

In `index.html`, update the media card sections:

#### For Images:
```html
<div class="media-preview">
    <!-- Replace placeholder with actual image -->
    <img src="assets/media/aca_mozart_ee_ai/your-image.jpg" 
         alt="Description of your image"
         class="media-image">
</div>
```

#### For Videos:
```html
<div class="media-preview">
    <!-- Replace placeholder with video player -->
    <video class="media-video" controls poster="assets/media/sigma_alpha/thumbnail.jpg">
        <source src="assets/media/sigma_alpha/your-video.mp4" type="video/mp4">
        Your browser does not support the video tag.
    </video>
</div>
```

### 3. Adding Project Cards

To add a new project card, copy and modify this template in the projects section:

```html
<article class="project-card" data-category="web"> <!-- Change category: web/systems/ai -->
    <div class="project-image">
        <img src="assets/projects/your-project-image.jpg" 
             alt="Your project name"
             class="project-preview">
    </div>
    <div class="project-content">
        <h3 class="project-title">Your Project Name</h3>
        <p class="project-description">
            Brief description of your project. Keep it concise and compelling.
        </p>
        <div class="project-tags">
            <span class="tag">Technology 1</span>
            <span class="tag">Technology 2</span>
            <span class="tag">Technology 3</span>
        </div>
        <a href="your-project-link.html" class="project-link">View Details →</a>
    </div>
</article>
```

### 4. Updating Personal Information

Edit these sections in `index.html`:

- **Hero section**: Update title, subtitle, and description
- **About section**: Modify text and statistics
- **Contact section**: Update email, social links
- **Footer**: Update copyright and links

## Customization

### Theme Colors

Edit the CSS variables in `styles.css` at the top of the file:

```css
:root {
    /* Light Theme Colors */
    --color-primary: #4361ee;
    --color-secondary: #7209b7;
    --color-accent: #f72585;
    
    /* Dark Theme Colors */
    /* These are in the [data-theme="dark"] section */
}
```

### Typography

The site uses Google Fonts (Inter and Space Grotesk). To change fonts:

1. Update the font import in `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Your+Font&display=swap" rel="stylesheet">
```

2. Update font variables in `styles.css`:
```css
:root {
    --font-primary: 'Your Font', sans-serif;
    --font-secondary: 'Your Secondary Font', monospace;
}
```

## Development

### Local Testing

1. Open `index.html` directly in your browser
2. Or use a local server:
```bash
# Python 3
python -m http.server 8000

# Node.js with http-server
npx http-server
```

### Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Deployment

### GitHub Pages

1. Push to GitHub repository
2. Go to Repository Settings → Pages
3. Select branch (usually `main` or `master`)
4. Select root folder
5. Save - your site will be available at `https://username.github.io/repository`

### Custom Domain

1. Add `CNAME` file with your domain
2. Update DNS settings with your domain provider
3. Configure in GitHub Pages settings

## Performance Tips

1. **Optimize Images**:
   - Use WebP format when possible
   - Compress images (aim for < 200KB)
   - Specify width/height attributes

2. **Optimize Videos**:
   - Use MP4 with H.264 codec
   - Keep videos under 10MB for web
   - Add poster images for faster loading

3. **Lazy Loading**:
   - Add `loading="lazy"` to images
   - Consider lazy loading for videos

## Accessibility Checklist

- [ ] All images have alt text
- [ ] Form inputs have labels
- [ ] Color contrast meets WCAG AA standards
- [ ] Keyboard navigation works throughout
- [ ] Screen reader announcements for dynamic content
- [ ] Focus indicators visible
- [ ] Semantic HTML structure

## Troubleshooting

### Media Files Not Showing
- Check file paths are correct
- Ensure file extensions match (.jpg vs .jpeg)
- Check file permissions

### Theme Not Persisting
- Clear browser localStorage and reload
- Check browser console for errors

### Mobile Menu Not Working
- Check JavaScript console for errors
- Ensure all required elements exist in HTML

## License

This portfolio template is free to use and modify for personal and commercial projects. Attribution is appreciated but not required.

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review browser console for errors
3. Ensure all files are in correct locations

---

**Last Updated**: April 2024  
**Version**: 1.0.0