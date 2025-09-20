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

You need to create 9 individual meta fields for the 3 badges. Here's how:

1. Go to **Settings** > **Custom data** > **Products**
2. Click **Add definition** and create these 9 meta fields:

**Badge 1:**
- **Name**: Badge 1 - Text
- **Namespace and key**: `custom.badge_1_text`
- **Type**: Single line text
- **Description**: First badge text (e.g., 'New', 'Sale', 'Best Seller')

- **Name**: Badge 1 - Background Color
- **Namespace and key**: `custom.badge_1_background_color`
- **Type**: Single line text
- **Description**: Background color for first badge (e.g., #FF0000)

- **Name**: Badge 1 - Text Color
- **Namespace and key**: `custom.badge_1_text_color`
- **Type**: Single line text
- **Description**: Text color for first badge (e.g., #FFFFFF)

**Badge 2:**
- **Name**: Badge 2 - Text
- **Namespace and key**: `custom.badge_2_text`
- **Type**: Single line text
- **Description**: Second badge text (e.g., 'Limited Edition', 'Free Shipping')

- **Name**: Badge 2 - Background Color
- **Namespace and key**: `custom.badge_2_background_color`
- **Type**: Single line text
- **Description**: Background color for second badge (e.g., #00FF00)

- **Name**: Badge 2 - Text Color
- **Namespace and key**: `custom.badge_2_text_color`
- **Type**: Single line text
- **Description**: Text color for second badge (e.g., #000000)

**Badge 3:**
- **Name**: Badge 3 - Text
- **Namespace and key**: `custom.badge_3_text`
- **Type**: Single line text
- **Description**: Third badge text (e.g., 'Premium', 'Exclusive')

- **Name**: Badge 3 - Background Color
- **Namespace and key**: `custom.badge_3_background_color`
- **Type**: Single line text
- **Description**: Background color for third badge (e.g., #8B5CF6)

- **Name**: Badge 3 - Text Color
- **Namespace and key**: `custom.badge_3_text_color`
- **Type**: Single line text
- **Description**: Text color for third badge (e.g., #FFFFFF)

### 3. Adding Badges to Products

1. Go to **Products** in your Shopify admin
2. Select a product
3. Scroll down to find the badge fields (they'll be grouped together)
4. Simply fill in the text and color fields:

**Example for Badge 1:**
- Badge 1 - Text: `New Arrival`
- Badge 1 - Background Color: `#00C851`
- Badge 1 - Text Color: `#FFFFFF`

**Example for Badge 2:**
- Badge 2 - Text: `Best Seller`
- Badge 2 - Background Color: `#FF6B35`
- Badge 2 - Text Color: `#FFFFFF`

**Example for Badge 3:**
- Badge 3 - Text: `Limited Edition`
- Badge 3 - Background Color: `#8B5CF6`
- Badge 3 - Text Color: `#FFFFFF`

### 4. Badge Configuration Options

#### Text Fields
- **Required**: Only the text field is required for each badge
- **Maximum**: 50 characters per badge
- **Behavior**: Will wrap to multiple lines if needed

#### Color Fields
- **Format**: Hex color codes (`#RRGGBB` or `#RGB`)
- **Optional**: If left blank, uses theme default colors
- **Validation**: Automatically validates hex color format

#### Examples

**Simple badge with just text:**
- Badge 1 - Text: `Sale`
- Badge 1 - Background Color: (leave blank)
- Badge 1 - Text Color: (leave blank)

**Badge with custom colors:**
- Badge 1 - Text: `Premium`
- Badge 1 - Background Color: `#FFD700`
- Badge 1 - Text Color: `#000000`

**Multiple badges:**
- **Badge 1:**
  - Text: `New Arrival`
  - Background Color: `#00C851`
  - Text Color: `#FFFFFF`
- **Badge 2:**
  - Text: `Limited Stock`
  - Background Color: `#FF4444`
  - Text Color: `#FFFFFF`
- **Badge 3:**
  - Text: `Free Shipping`
  - Background Color: `#2196F3`
  - Text Color: `#FFFFFF`

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
