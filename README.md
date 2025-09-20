# Mecoco-1 - Shopify Theme with Custom Product Badges

A Shopify theme enhanced with a custom product badges system that allows merchants to create multiple badges per product with custom colors for display in collections.

## Features

### Custom Product Badges System
- ✅ **Multiple badges per product** - Add as many badges as needed
- ✅ **Custom colors** - Background, text, and border colors
- ✅ **Responsive design** - Optimized for mobile and desktop
- ✅ **Grid and carousel support** - Works in all collection views
- ✅ **Backward compatible** - Maintains existing sale/sold out badges
- ✅ **Easy setup** - Simple meta field configuration

### Theme Features
- Modern, clean design
- Mobile-first responsive layout
- Product quick add functionality
- Advanced filtering and search
- SEO optimized

## Quick Start

### 1. Install the Theme
1. Upload the theme files to your Shopify store
2. Activate the theme in your admin panel

### 2. Set Up Product Badges
1. Go to **Settings** > **Custom data** > **Products**
2. Create 9 individual meta fields for 3 badges (see detailed setup guide)
3. Add badges to your products using simple text fields (no JSON required!)

### 3. Configure Badge Settings
1. Go to **Online Store** > **Themes** > **Customize**
2. Navigate to **Theme settings** > **Badges**
3. Configure badge position, colors, and typography

## Badge Examples

### Simple Badge
- **Badge 1 - Text**: `New`
- **Badge 1 - Background Color**: (leave blank)
- **Badge 1 - Text Color**: (leave blank)

### Badge with Custom Colors
- **Badge 1 - Text**: `Premium`
- **Badge 1 - Background Color**: `#FFD700`
- **Badge 1 - Text Color**: `#000000`

### Multiple Badges
- **Badge 1:**
  - Text: `New Arrival`
  - Background Color: `#00C851`
  - Text Color: `#FFFFFF`
- **Badge 2:**
  - Text: `Best Seller`
  - Background Color: `#FF6B35`
  - Text Color: `#FFFFFF`
- **Badge 3:**
  - Text: `Limited Edition`
  - Background Color: `#8B5CF6`
  - Text Color: `#FFFFFF`

## File Structure

```
├── assets/
│   └── (theme assets)
├── blocks/
│   └── _product-card-gallery.liquid (updated with badge support)
├── config/
│   ├── meta_fields.json (meta field definition)
│   └── settings_schema.json (theme settings)
├── snippets/
│   └── product-card-badges.liquid (enhanced badge system)
├── examples/
│   └── badge-examples.html (visual examples)
├── scripts/
│   └── setup-product-badges-meta-field.js (setup script)
└── PRODUCT_BADGES_SETUP.md (detailed setup guide)
```

## Documentation

- **[Product Badges Setup Guide](PRODUCT_BADGES_SETUP.md)** - Comprehensive setup instructions
- **[Badge Examples](examples/badge-examples.html)** - Visual examples and configurations
- **[Meta Field Setup Script](scripts/setup-product-badges-meta-field.js)** - Automated setup

## Customization

### Badge Positioning
Badges can be positioned in three locations:
- Top Left
- Top Right
- Bottom Left

### Badge Styling
Customize badge appearance through:
- CSS variables in theme settings
- Custom CSS overrides
- Meta field color configurations

### Responsive Behavior
- Desktop: Max width 120px per badge
- Mobile: Max width 100px per badge
- Automatic font size scaling

## Support

For technical support or customization requests:
1. Check the [setup guide](PRODUCT_BADGES_SETUP.md)
2. Review the [examples](examples/badge-examples.html)
3. Contact your developer or theme support

## License

This theme is licensed for use with Shopify stores. Please refer to your Shopify theme license for specific terms and conditions.
