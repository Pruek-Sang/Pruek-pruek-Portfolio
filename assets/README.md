# Assets Directory

This directory contains all media files for the portfolio website.

## Directory Structure

- `media/aca_mozart_ee_ai/` - Place image files here (.jpg, .png, .webp)
- `media/sigma_alpha/` - Place video files here (.mp4 recommended)

## File Naming Guidelines

### Images
- Use descriptive names: `project-showcase-1.jpg`, `artwork-series-2.png`
- Keep filenames lowercase with hyphens
- Optimize images for web (aim for < 200KB each)

### Videos
- Use MP4 format with H.264 codec
- Keep videos under 10MB for web playback
- Create thumbnails for better loading performance

## Optimization Tips

1. **Image Compression**:
   - Use tools like Squoosh, TinyPNG, or ImageOptim
   - Convert to WebP format for better compression
   - Specify image dimensions in HTML

2. **Video Optimization**:
   - Use HandBrake or FFmpeg for compression
   - Keep resolution at 720p or 1080p max
   - Use 30fps for most content

3. **Organization**:
   - Group related files in subdirectories
   - Keep a consistent naming convention
   - Document what each file represents

## Adding New Media

1. Place files in the appropriate directory
2. Update the HTML file with correct file paths
3. Add alt text for images
4. Test on different devices and connections