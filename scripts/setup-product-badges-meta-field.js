/**
 * Shopify Admin API Script to Create Product Badges Meta Field
 * 
 * This script creates the product badges meta field definition in your Shopify store.
 * Run this using the Shopify Admin API or Shopify CLI.
 * 
 * Prerequisites:
 * - Shopify CLI installed
 * - Store access with admin permissions
 * - Node.js environment
 */

const metaFieldDefinition = {
  "meta_field": {
    "namespace": "custom",
    "key": "product_badges",
    "name": "Product Badges",
    "description": "Custom badges to display on product cards in collections. Each badge can have text, background color, text color, and border color.",
    "type": "list.list.single_line_text",
    "access": {
      "admin": "merchant_write",
      "storefront": "public_read"
    },
    "validations": [
      {
        "name": "json",
        "value": "{\"type\":\"array\",\"items\":{\"type\":\"object\",\"properties\":{\"text\":{\"type\":\"string\",\"minLength\":1,\"maxLength\":50},\"background_color\":{\"type\":\"string\",\"pattern\":\"^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$\"},\"text_color\":{\"type\":\"string\",\"pattern\":\"^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$\"},\"border_color\":{\"type\":\"string\",\"pattern\":\"^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$\"}},\"required\":[\"text\"]}}"
      }
    ],
    "default": "[]"
  }
};

// Example usage with Shopify CLI
console.log('To create the meta field using Shopify CLI, run:');
console.log('');
console.log('shopify app generate extension --type=admin_action');
console.log('');
console.log('Then use this meta field definition in your extension:');
console.log(JSON.stringify(metaFieldDefinition, null, 2));

// Example usage with Admin API
console.log('');
console.log('To create via Admin API:');
console.log('POST /admin/api/2023-10/metafields.json');
console.log('Content-Type: application/json');
console.log('');
console.log(JSON.stringify(metaFieldDefinition, null, 2));

// Example badge data for testing
const exampleBadgeData = [
  {
    "text": "New Arrival",
    "background_color": "#00C851",
    "text_color": "#FFFFFF"
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
];

console.log('');
console.log('Example badge data for testing:');
console.log(JSON.stringify(exampleBadgeData, null, 2));

module.exports = {
  metaFieldDefinition,
  exampleBadgeData
};
