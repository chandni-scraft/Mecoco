# 🎯 Collection-Level Badges - Quick Setup Guide

## ✅ **What You Get:**

### **Collection Badges (Recommended)**
- Set badges **once** for an entire collection
- All products in the collection automatically get the same badges
- **Maximum 2 badges** - one left, one right
- **Priority over individual product badges**
- Same simple format as product badges

### **Product Badges (Fallback)**
- Individual product badges still work
- Only show if collection has no badges set
- Perfect for special individual products

## 🚀 **How to Set Up:**

### **Step 1: Create Collection Meta Field**
1. Go to **Settings** → **Custom data** → **Collections**
2. Click **Add definition**
3. Set:
   - **Name**: `Collection Badges (Simple)`
   - **Namespace and key**: `custom.collection_badges_simple`
   - **Type**: `Multi-line text`

### **Step 2: Add Badges to Collections**
1. Go to **Products** → **Collections**
2. Select any collection
3. Find the **"Collection Badges (Simple)"** field
4. Add badges like this:

```
New Collection|#00C851|#FFFFFF
Best Sellers|#FF6B35|#FFFFFF
Limited Edition|#8B5CF6|#FFFFFF
```

## 📝 **Format Examples:**

### **Simple Badge (no colors):**
```
Sale
```

### **Badge with background color:**
```
Premium|#FFD700
```

### **Full Badge with all colors:**
```
New Collection|#00C851|#FFFFFF
```

### **Multiple Badges (Max 2):**
```
New Collection|#00C851|#FFFFFF
Best Sellers|#FF6B35|#FFFFFF
```

**Note:** Only the first 2 badges will be displayed - first badge on the left, second badge on the right.

## 🎨 **What You See:**

In your Shopify admin, you'll see one simple text area in each collection:

```
┌─────────────────────────────────────────────────────────┐
│ Collection Badges (Simple)                             │
├─────────────────────────────────────────────────────────┤
│ New Collection|#00C851|#FFFFFF                         │
│ Best Sellers|#FF6B35|#FFFFFF                           │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Layout on Product Cards:**
```
┌─────────────────────────────────┐
│ [New Collection]    [Best Sellers] │
│  ┌─────────────────────────┐    │
│  │                         │    │
│  │      Product Image      │    │
│  │                         │    │
│  └─────────────────────────┘    │
└─────────────────────────────────┘
```

## 🔄 **How It Works:**

1. **Collection badges** are checked first
2. If collection has badges → show collection badges
3. If collection has no badges → check individual product badges
4. If neither has badges → show only default sale/sold out badges

## 💡 **Pro Tips:**

- **Use collection badges** for seasonal collections, new arrivals, or category-wide promotions
- **Use product badges** for individual product specials or unique items
- **Mix both** - collection badges for general category info, product badges for specific items
- **Easy to update** - change collection badges once, affects all products in that collection

## 🎯 **Perfect For:**

- **Seasonal Collections**: "Holiday Sale", "Summer Collection"
- **Category Badges**: "New Arrivals", "Best Sellers", "Limited Edition"
- **Promotional Collections**: "Flash Sale", "Clearance", "Featured"
- **Brand Collections**: "Premium", "Eco-Friendly", "Made in USA"
