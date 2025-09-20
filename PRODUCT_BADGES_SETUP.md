# Product Badges Meta Field Setup Guide

This guide explains how to set up and use the custom product badges system that allows you to create multiple badges per product with custom colors for display in collections.

## Features

- ✅ Multiple badges per product
- ✅ Custom background colors
- ✅ Custom text colors  
- ✅ Custom border colors
- ✅ Responsive design
- ✅ Works in both grid and carousel views
- ✅ Maintains existing sale/sold out badges

## Setup Instructions

### 1. Meta Field Configuration

The system uses a meta field called `custom.product_badges` that stores an array of badge objects. Each badge can have:

- `text` (required): The badge text (max 50 characters)
- `background_color` (optional): Hex color code (e.g., "#FF0000")
- `text_color` (optional): Hex color code (e.g., "#FFFFFF")
- `border_color` (optional): Hex color code (e.g., "#000000")

### 2. Creating Meta Fields in Shopify Admin

1. Go to **Settings** > **Custom data** > **Products**
2. Click **Add definition**
3. Set the following:
   - **Name**: Product Badges
   - **Namespace and key**: `custom.product_badges`
   - **Type**: List of single line text
   - **Description**: Custom badges to display on product cards in collections

### 3. Adding Badges to Products

1. Go to **Products** in your Shopify admin
2. Select a product
3. Scroll down to the **Product Badges** section
4. Add badge entries in JSON format:

```json
[
  {
    "text": "New",
    "background_color": "#00FF00",
    "text_color": "#FFFFFF",
    "border_color": "#000000"
  },
  {
    "text": "Best Seller",
    "background_color": "#FF6B35",
    "text_color": "#FFFFFF"
  },
  {
    "text": "Limited Edition",
    "background_color": "#8B5CF6",
    "text_color": "#FFFFFF",
    "border_color": "#6D28D9"
  }
]
```

### 4. Badge Configuration Options

#### Text
- Required field
- Maximum 50 characters
- Will wrap to multiple lines if needed

#### Colors
- All color fields accept hex color codes
- Format: `#RRGGBB` or `#RGB`
- If not specified, uses theme default colors

#### Examples

**Simple badge with just text:**
```json
[
  {
    "text": "Sale"
  }
]
```

**Badge with custom colors:**
```json
[
  {
    "text": "Premium",
    "background_color": "#FFD700",
    "text_color": "#000000",
    "border_color": "#FFA500"
  }
]
```

**Multiple badges:**
```json
[
  {
    "text": "New Arrival",
    "background_color": "#00C851",
    "text_color": "#FFFFFF"
  },
  {
    "text": "Limited Stock",
    "background_color": "#FF4444",
    "text_color": "#FFFFFF"
  },
  {
    "text": "Free Shipping",
    "background_color": "#2196F3",
    "text_color": "#FFFFFF"
  }
]
```

## Display Behavior

### Badge Positioning
Badges are positioned based on your theme's badge settings:
- Top Left
- Top Right  
- Bottom Left

### Badge Stacking
- Multiple badges stack vertically
- 4px gap between badges
- Responsive sizing on mobile devices

### Responsive Design
- Desktop: Max width 120px per badge
- Mobile: Max width 100px per badge
- Smaller font size on mobile for better fit

## Integration Points

The badges system integrates with:

1. **Collection Pages**: Displays in product grids
2. **Search Results**: Shows in search result grids
3. **Product Recommendations**: Appears in recommendation carousels
4. **Featured Product Sections**: Works in any product card display

## Troubleshooting

### Badges Not Showing
1. Check that the meta field is properly configured
2. Verify the JSON format is valid
3. Ensure the `text` field is not empty
4. Check that the meta field namespace is `custom.product_badges`

### Styling Issues
1. Verify hex color codes are valid (6 or 3 characters)
2. Check that the theme's badge settings are configured
3. Ensure the product card gallery block is included in your sections

### Performance
- Badges are rendered server-side for optimal performance
- No additional JavaScript required
- Minimal impact on page load times

## Customization

### CSS Variables
The system uses these CSS variables for styling:
- `--badge-border-radius`: Border radius for all badges
- `--badge-font-family`: Font family for badge text
- `--badge-font-weight`: Font weight for badge text
- `--badge-text-transform`: Text transform for badge text

### Custom Styling
You can add custom CSS to override badge styles:

```css
.product-badges__badge--custom {
  /* Your custom styles here */
  font-size: 12px;
  padding: 8px 12px;
}
```

## Support

For technical support or customization requests, refer to your theme documentation or contact your developer.
