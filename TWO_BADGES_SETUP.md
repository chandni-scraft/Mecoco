# 🎯 Two Badges Setup - Left & Right Positioning

## ✅ **Perfect! Now You Have Exactly 2 Badges**

### **What's New:**

- **🎯 Maximum 2 badges** - no more, no less
- **📍 Left & Right positioning** - first badge on left, second on right
- **🎨 Same simple format** - easy to use
- **⚡ Collection-level** - set once for entire collections

## 🚀 **How It Works:**

### **Badge Positioning:**
```
┌─────────────────────────────────┐
│ [Badge 1]           [Badge 2]   │
│  ┌─────────────────────────┐    │
│  │                         │    │
│  │      Product Image      │    │
│  │                         │    │
│  └─────────────────────────┘    │
└─────────────────────────────────┘
```

### **Badge Limit:**
- **First badge** → Left side
- **Second badge** → Right side  
- **Third+ badges** → Ignored (only first 2 show)

## 📝 **Setup Instructions:**

### **1. Create Collection Meta Field:**
- Go to **Settings** → **Custom data** → **Collections**
- Add definition: `custom.collection_badges_simple`
- Type: Multi-line text

### **2. Add Your 2 Badges:**
- Go to **Products** → **Collections**
- Select any collection
- Add exactly 2 badges:

```
New Collection|#00C851|#FFFFFF
Best Sellers|#FF6B35|#FFFFFF
```

## 🎨 **Examples:**

### **Single Badge (Left Only):**
```
Sale|#FF0000|#FFFFFF
```

### **Two Badges (Left & Right):**
```
New|#00C851|#FFFFFF
Hot|#FF6B35|#FFFFFF
```

### **More Than 2 (Only First 2 Show):**
```
New|#00C851|#FFFFFF
Hot|#FF6B35|#FFFFFF
Sale|#FF0000|#FFFFFF
Limited|#8B5CF6|#FFFFFF
```
**Result:** Only "New" (left) and "Hot" (right) will display.

## 🔄 **Priority System:**

1. **Collection badges** (if set) → Show collection badges
2. **Product badges** (if no collection badges) → Show product badges  
3. **Default badges** (sale/sold out) → Always show when applicable

## 💡 **Pro Tips:**

- **Left badge** = Primary message (e.g., "New", "Sale")
- **Right badge** = Secondary message (e.g., "Hot", "Limited")
- **Keep text short** - badges have limited space
- **Use contrasting colors** - ensure readability
- **Test on mobile** - badges scale down on smaller screens

## ✅ **Ready to Use!**

Your two-badge system is now fully implemented and ready to use. Set badges once for entire collections and they'll appear perfectly positioned on all product cards!
