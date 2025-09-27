# 🔍 Badge Debug Test

## **Issue:** Only 1st badge showing, 2nd badge not visible

### **Debug Steps:**

1. **Check Collection Meta Field:**
   - Go to **Products** → **Collections**
   - Select your collection
   - Look for **"Collection Badges (Simple)"** field
   - Make sure you have exactly this format (2 lines):

   ```
   New|#00C851|#FFFFFF
   Hot|#FF6B35|#FFFFFF
   ```

2. **Check for Hidden Characters:**
   - Make sure there are no extra spaces
   - Make sure there are no extra line breaks
   - Each badge should be on its own line

3. **Test with Simple Badges:**
   Try this exact format:
   ```
   New
   Hot
   ```

4. **Check Browser Developer Tools:**
   - Right-click on a product card
   - Select "Inspect Element"
   - Look for HTML comments like:
     - `<!-- Debug: Found 2 badge lines -->`
     - `<!-- Badge 1: New -->`
     - `<!-- Badge 2: Hot -->`

### **Expected HTML Output:**
```html
<div class="product-badges product-badges--top-left">
  <!-- Debug: Found 2 badge lines -->
  <!-- Debug: Processing line: "New|#00C851|#FFFFFF" -->
  <!-- Badge 1: New -->
  <div class="product-badges__badge product-badges__badge--rectangle product-badges__badge--custom product-badges__badge--1" style="background-color: #00C851; color: #FFFFFF;">
    New
  </div>
  <!-- Debug: Processing line: "Hot|#FF6B35|#FFFFFF" -->
  <!-- Badge 2: Hot -->
  <div class="product-badges__badge product-badges__badge--rectangle product-badges__badge--custom product-badges__badge--2" style="background-color: #FF6B35; color: #FFFFFF;">
    Hot
  </div>
</div>
```

### **Common Issues:**

1. **Only 1 line in meta field** - Make sure you have 2 separate lines
2. **Extra spaces** - Remove any trailing spaces
3. **Wrong line breaks** - Use Enter key to create new lines
4. **Meta field not saved** - Make sure to save the collection

### **Quick Test:**

Try this exact format in your collection meta field:
```
New
Hot
```

This should show:
- "New" badge on the left
- "Hot" badge on the right

Let me know what you see in the browser developer tools!
