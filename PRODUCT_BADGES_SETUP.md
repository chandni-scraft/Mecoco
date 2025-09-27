# Product Badges Meta Field Setup Guide

This guide explains how to set up and use the custom product badges system that allows you to create multiple badges with custom colors for display in collections. You can now set badges at both the **collection level** (applies to all products in the collection) and **product level** (individual product badges).

## Features

- ✅ **Collection-level badges** - Set badges once for entire collections
- ✅ **Product-level badges** - Individual product badges (fallback)
- ✅ **Priority system** - Collection badges override product badges
- ✅ **Maximum 2 badges** - one left, one right positioning
- ✅ Custom background colors
- ✅ Custom text colors  
- ✅ Custom border colors
- ✅ Responsive design
- ✅ Works in both grid and carousel views
- ✅ Maintains existing sale/sold out badges

## Setup Instructions

### 1. Meta Field Configuration

The system uses two meta fields:
- `custom.collection_badges_simple` - For collection-level badges (recommended)
- `custom.product_badges_simple` - For individual product badges (fallback)

Each badge can have:
- `text` (required): The badge text (max 50 characters)
- `background_color` (optional): Hex color code (e.g., "#FF0000")
- `text_color` (optional): Hex color code (e.g., "#FFFFFF")

### 2. Creating Meta Fields in Shopify Admin

You need to create **2 meta fields**:

#### Collection Badges (Recommended)
1. Go to **Settings** > **Custom data** > **Collections**
2. Click **Add definition**
3. Set the following:
   - **Name**: Collection Badges (Simple)
   - **Namespace and key**: `custom.collection_badges_simple`
   - **Type**: Multi-line text
   - **Description**: Add multiple badges for all products in this collection. Format: Badge Text|Background Color|Text Color (one per line)

#### Product Badges (Fallback)
1. Go to **Settings** > **Custom data** > **Products**
2. Click **Add definition**
3. Set the following:
   - **Name**: Product Badges (Simple)
   - **Namespace and key**: `custom.product_badges_simple`
   - **Type**: Multi-line text
   - **Description**: Add multiple badges with text and colors. Format: Badge Text|Background Color|Text Color (one per line)

### 3. Adding Badges

#### Option A: Collection-Level Badges (Recommended)

1. Go to **Products** > **Collections** in your Shopify admin
2. Select a collection
3. Scroll down to find the **"Collection Badges (Simple)"** field
4. Add badges using this simple format (one badge per line):

**Format:** `Badge Text|Background Color|Text Color`

**Examples:**

**Single Badge:**
```
New Collection|#00C851|#FFFFFF
```

**Multiple Badges (Max 2):**
```
New Collection|#00C851|#FFFFFF
Best Sellers|#FF6B35|#FFFFFF
```

**Note:** Only the first 2 badges will be displayed - first badge on the left, second badge on the right.

**Simple Badge (no colors):**
```
Sale
```

**Badge with only background color:**
```
Premium|#FFD700
```

#### Option B: Product-Level Badges (Fallback)

1. Go to **Products** in your Shopify admin
2. Select a product
3. Scroll down to find the **"Product Badges (Simple)"** field
4. Add badges using the same format as above

**Note:** Collection badges will override product badges when both are set.

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
