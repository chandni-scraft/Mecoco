# Variant Price Display Examples

## How to Use the Enhanced Variant Picker

### Example 1: Face Cream with Different Sizes

**Product Setup:**
1. Create metafield `custom.weight_grams` in Shopify Admin
2. Add weight values to each variant:
   - 50g variant → weight_grams: `50`
   - 100g variant → weight_grams: `100`
   - 250g variant → weight_grams: `250`

**Theme Settings:**
- ✅ Show price in variants
- ✅ Show per gram pricing
- Weight metafield: `custom.weight_grams`
- Weight unit: Grams
- Display price per: Per gram

**Result Display:**
```
Size:
[ 50g ]          [ 100g ]         [ 250g ]
  ₹500             ₹900            ₹2000
  (₹10/g)          (₹9/g)          (₹8/g)
```

### Example 2: Bulk Products with KG Pricing

**Product Setup:**
1. Create metafield `custom.weight_kg` 
2. Add weight values:
   - 1kg variant → weight_kg: `1`
   - 5kg variant → weight_kg: `5`
   - 10kg variant → weight_kg: `10`

**Theme Settings:**
- Weight metafield: `custom.weight_kg`
- Weight unit: Kilograms
- Display price per: Per kilogram

**Result Display:**
```
Size:
[ 1 KG ]         [ 5 KG ]         [ 10 KG ]
  ₹1,000          ₹4,500           ₹8,000
  (₹1,000/kg)     (₹900/kg)        (₹800/kg)
```

### Example 3: Premium Products with Per 100g Pricing

**Theme Settings:**
- Weight unit: Grams
- Display price per: Per 100g

**Result Display:**
```
Size:
[ 30g ]          [ 50g ]          [ 100g ]
  ₹600            ₹950             ₹1,800
  (₹2,000/100g)   (₹1,900/100g)    (₹1,800/100g)
```

### Example 4: Sale Products with Compare Pricing

**Result Display:**
```
Size:
[ 100g ]                [ 250g ]
  ₹̶1̶,̶0̶0̶0̶ ₹800          ₹̶2̶,̶5̶0̶0̶ ₹2,000
  (₹8/g)                 (₹8/g)
```

## Configuration Steps:

### Step 1: Create Metafield
```
Shopify Admin → Settings → Custom data → Variants → Add definition
Name: Weight in Grams
Namespace and key: custom.weight_grams
Type: Number (Integer or Decimal)
```

### Step 2: Add Weight to Variants
```
Products → Select Product → Variants
Edit each variant and add weight value
```

### Step 3: Configure Theme
```
Theme Editor → Product Page → Variant Picker Block
- Enable "Show price in variants"
- Enable "Show per gram pricing"
- Set weight metafield: custom.weight_grams
- Choose weight unit (how it's stored)
- Choose display unit (how to show price)
```

## Common Use Cases:

1. **Beauty Products**: Show per gram for value comparison
2. **Food Items**: Show per 100g for standard comparison
3. **Bulk Items**: Show per kg for wholesale pricing
4. **Supplements**: Show per serving or per gram

## Dropdown Style Example:

When using dropdown style, prices appear inline:
```
Size: [▼ 100g - ₹900 (₹9/g)     ]
```

## Tips:

1. Use consistent weight units across variants
2. Round prices for cleaner display
3. Consider which unit makes most sense for customers
4. Test on mobile to ensure good readability