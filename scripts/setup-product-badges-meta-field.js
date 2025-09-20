/**
 * Shopify Admin API Script to Create Product Badges Meta Fields
 * 
 * This script creates 9 individual meta field definitions for user-friendly product badges.
 * Run this using the Shopify Admin API or Shopify CLI.
 * 
 * Prerequisites:
 * - Shopify CLI installed
 * - Store access with admin permissions
 * - Node.js environment
 */

const metaFieldDefinitions = [
  // Badge 1
  {
    "meta_field": {
      "namespace": "custom",
      "key": "badge_1_text",
      "name": "Badge 1 - Text",
      "description": "First badge text (e.g., 'New', 'Sale', 'Best Seller')",
      "type": "single_line_text",
      "access": {
        "admin": "merchant_write",
        "storefront": "public_read"
      },
      "validations": [
        {
          "name": "length",
          "value": "50"
        }
      ]
    }
  },
  {
    "meta_field": {
      "namespace": "custom",
      "key": "badge_1_background_color",
      "name": "Badge 1 - Background Color",
      "description": "Background color for first badge (e.g., #FF0000)",
      "type": "single_line_text",
      "access": {
        "admin": "merchant_write",
        "storefront": "public_read"
      },
      "validations": [
        {
          "name": "regex",
          "value": "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
        }
      ]
    }
  },
  {
    "meta_field": {
      "namespace": "custom",
      "key": "badge_1_text_color",
      "name": "Badge 1 - Text Color",
      "description": "Text color for first badge (e.g., #FFFFFF)",
      "type": "single_line_text",
      "access": {
        "admin": "merchant_write",
        "storefront": "public_read"
      },
      "validations": [
        {
          "name": "regex",
          "value": "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
        }
      ]
    }
  },
  // Badge 2
  {
    "meta_field": {
      "namespace": "custom",
      "key": "badge_2_text",
      "name": "Badge 2 - Text",
      "description": "Second badge text (e.g., 'Limited Edition', 'Free Shipping')",
      "type": "single_line_text",
      "access": {
        "admin": "merchant_write",
        "storefront": "public_read"
      },
      "validations": [
        {
          "name": "length",
          "value": "50"
        }
      ]
    }
  },
  {
    "meta_field": {
      "namespace": "custom",
      "key": "badge_2_background_color",
      "name": "Badge 2 - Background Color",
      "description": "Background color for second badge (e.g., #00FF00)",
      "type": "single_line_text",
      "access": {
        "admin": "merchant_write",
        "storefront": "public_read"
      },
      "validations": [
        {
          "name": "regex",
          "value": "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
        }
      ]
    }
  },
  {
    "meta_field": {
      "namespace": "custom",
      "key": "badge_2_text_color",
      "name": "Badge 2 - Text Color",
      "description": "Text color for second badge (e.g., #000000)",
      "type": "single_line_text",
      "access": {
        "admin": "merchant_write",
        "storefront": "public_read"
      },
      "validations": [
        {
          "name": "regex",
          "value": "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
        }
      ]
    }
  },
  // Badge 3
  {
    "meta_field": {
      "namespace": "custom",
      "key": "badge_3_text",
      "name": "Badge 3 - Text",
      "description": "Third badge text (e.g., 'Premium', 'Exclusive')",
      "type": "single_line_text",
      "access": {
        "admin": "merchant_write",
        "storefront": "public_read"
      },
      "validations": [
        {
          "name": "length",
          "value": "50"
        }
      ]
    }
  },
  {
    "meta_field": {
      "namespace": "custom",
      "key": "badge_3_background_color",
      "name": "Badge 3 - Background Color",
      "description": "Background color for third badge (e.g., #8B5CF6)",
      "type": "single_line_text",
      "access": {
        "admin": "merchant_write",
        "storefront": "public_read"
      },
      "validations": [
        {
          "name": "regex",
          "value": "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
        }
      ]
    }
  },
  {
    "meta_field": {
      "namespace": "custom",
      "key": "badge_3_text_color",
      "name": "Badge 3 - Text Color",
      "description": "Text color for third badge (e.g., #FFFFFF)",
      "type": "single_line_text",
      "access": {
        "admin": "merchant_write",
        "storefront": "public_read"
      },
      "validations": [
        {
          "name": "regex",
          "value": "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
        }
      ]
    }
  }
];

// Example usage with Shopify CLI
console.log('To create the meta fields using Shopify CLI, run:');
console.log('');
console.log('shopify app generate extension --type=admin_action');
console.log('');
console.log('Then use these meta field definitions in your extension:');
console.log(JSON.stringify(metaFieldDefinitions, null, 2));

// Example usage with Admin API
console.log('');
console.log('To create via Admin API, make 9 separate POST requests:');
console.log('POST /admin/api/2023-10/metafields.json');
console.log('Content-Type: application/json');
console.log('');
metaFieldDefinitions.forEach((definition, index) => {
  console.log(`Request ${index + 1}:`);
  console.log(JSON.stringify(definition, null, 2));
  console.log('');
});

// Example badge data for testing
const exampleBadgeData = {
  "badge_1_text": "New Arrival",
  "badge_1_background_color": "#00C851",
  "badge_1_text_color": "#FFFFFF",
  "badge_2_text": "Best Seller",
  "badge_2_background_color": "#FF6B35",
  "badge_2_text_color": "#FFFFFF",
  "badge_3_text": "Limited Edition",
  "badge_3_background_color": "#8B5CF6",
  "badge_3_text_color": "#FFFFFF"
};

console.log('');
console.log('Example badge data for testing (add to product meta fields):');
console.log(JSON.stringify(exampleBadgeData, null, 2));

module.exports = {
  metaFieldDefinitions,
  exampleBadgeData
};
