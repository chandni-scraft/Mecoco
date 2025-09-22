# Variant Weight Setup Guide for Per Gram/KG Pricing

## Step 1: Create Weight Metafield in Shopify Admin

1. Go to **Settings** → **Custom data** → **Variants**
2. Click **"Add definition"**
3. Set up the metafield:
   - **Name**: "Weight in Grams"
   - **Namespace and key**: `custom.weight_grams`
   - **Type**: Select "Integer" or "Decimal"
   - **Validation**: Add minimum value: 1

## Step 2: Add Weight to Your Product Variants

1. Go to **Products** → Select your product
2. For each variant, add the weight:
   - **50g variant**: Enter `50`
   - **100g variant**: Enter `100`
   - **250g variant**: Enter `250`
   - **500g variant**: Enter `500`
   - **1kg variant**: Enter `1000`

## Step 3: Configure the Variant Picker

1. In Theme Editor, go to your product page
2. Find the **Variant Picker** block
3. Configure settings:
   - ✅ **Show price in variants**: Enable
   - ✅ **Show per gram pricing**: Enable
   - **Weight metafield**: Enter `custom.weight_grams`

## Example Setup:

### Product: Premium Face Cream

| Variant | Price | Weight (grams) | Calculated Per Gram | Display |
|---------|-------|----------------|---------------------|----------|
| 50g | ₹500 | 50 | ₹10/g | 50g - ₹500 (₹10/g) |
| 100g | ₹900 | 100 | ₹9/g | 100g - ₹900 (₹9/g) |
| 250g | ₹2000 | 250 | ₹8/g | 250g - ₹2000 (₹8/g) |
| 500g | ₹3500 | 500 | ₹7/g | 500g - ₹3500 (₹7/g) |

## Alternative Metafield Names:

You can use different metafield names based on your setup:
- `product.weight` 
- `variant.weight_grams`
- `custom.net_weight`
- `inventory.weight`

Just make sure to enter the exact namespace and key in the theme settings.

## For Different Weight Units:

### If storing in Kilograms:
- Store as: `custom.weight_kg`
- Values: `0.05`, `0.1`, `0.25`, `0.5`, `1`

### If storing in Milligrams:
- Store as: `custom.weight_mg`
- Values: `50000`, `100000`, `250000`, `500000`, `1000000`

## Displaying Per KG Instead of Per Gram:

To show price per kilogram, we'll need to modify the display calculation.