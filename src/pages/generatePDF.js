import { jsPDF } from 'jspdf';

// Content mapping for all season-undertone combinations with RGB colors
const PDF_CONTENT = {
  'Winter_Cool Undertone': {
    flattering_colors: [
      { name: 'Cool Blue', rgb: [83, 109, 161] },
      { name: 'Light Blue', rgb: [137, 169, 205] },
      { name: 'Pale Blue', rgb: [229, 231, 244] },
      { name: 'Snow White', rgb: [252, 253, 255] },
      { name: 'Silver Gray', rgb: [168, 170, 181] },
      { name: 'Navy Blue', rgb: [54, 90, 128] },
      { name: 'Ice Blue', rgb: [177, 192, 196] },
      { name: 'Glacial Blue', rgb: [185, 198, 202] },
      { name: 'Frost Blue', rgb: [193, 205, 208] },
      { name: 'Winter Sky', rgb: [200, 211, 214] },
      { name: 'Icy Gray', rgb: [208, 217, 220] },
      { name: 'Slate Gray', rgb: [216, 224, 226] },
      { name: 'Pale Gray', rgb: [224, 230, 231] },
      { name: 'Soft Gray', rgb: [232, 236, 237] },
      { name: 'Frost White', rgb: [239, 242, 243] },
      { name: 'Pure White', rgb: [247, 249, 249] },
      { name: 'Bright White', rgb: [255, 255, 255] },
      { name: 'Aqua Blue', rgb: [160, 230, 255] },
      { name: 'Sky Blue', rgb: [170, 233, 255] },
      { name: 'Light Aqua', rgb: [179, 235, 255] },
      { name: 'Pale Aqua', rgb: [189, 238, 255] },
      { name: 'Soft Aqua', rgb: [198, 240, 255] },
      { name: 'Ice Aqua', rgb: [208, 243, 255] },
      { name: 'Frost Aqua', rgb: [217, 245, 255] },
      { name: 'Glacial Aqua', rgb: [227, 248, 255] },
      { name: 'Pale Sky', rgb: [236, 250, 255] },
      { name: 'Winter Aqua', rgb: [246, 253, 255] },
      { name: 'Coral Red', rgb: [211, 84, 52] },
      { name: 'Soft Coral', rgb: [228, 164, 149] },
      { name: 'Deep Rust', rgb: [108, 40, 23] },
      { name: 'Warm Red', rgb: [160, 92, 84] },
      { name: 'Blush Coral', rgb: [204, 178, 174] },
      { name: 'Earthy Brown', rgb: [114, 84, 65] },
      { name: 'Classic Black', rgb: [0, 0, 0] },
      { name: 'Bright Red', rgb: [255, 0, 0] },
      { name: 'Deep Purple', rgb: [128, 0, 128] },
      { name: 'Navy Blue', rgb: [0, 51, 102] },
      { name: 'Dim Gray', rgb: [105, 105, 105] },
      { name: 'Silver', rgb: [192, 192, 192] },
      { name: 'Pure White', rgb: [255, 255, 255] }
    ],
    less_flattering_colors: [
      'Muted Tones: Beige, olive green (can look dull)',
      'Warm Pastels: Peach, coral (clash with your cool undertone)',
      'Warm Neutrals: Camel, warm beige (can look muddy)'
    ],
    jewelry_recommendations: [
      'Silver: Complements your cool undertone',
      'White Gold: A sleek, modern choice',
      'Platinum: A luxurious option',
      'Avoid Gold: May look too warm'
    ],
    additional_tips: [
      'Opt for bold, cool makeup tones (e.g., red lipstick, cool-toned eyeshadow)',
      'Hair colors with cool undertones (e.g., jet black, ash brown) work best'
    ]
  },
  'Autumn_Neutral Undertone': {
    flattering_colors: [
      { name: 'Dark Brown', rgb: [110, 57, 26] },
      { name: 'Rust Red', rgb: [209, 73, 59] },
      { name: 'Coral', rgb: [255, 127, 80] },
      { name: 'Orange Red', rgb: [255, 69, 0] },
      { name: 'Saddle Brown', rgb: [139, 69, 19] },
      { name: 'Sienna', rgb: [160, 82, 45] },
      { name: 'Peru', rgb: [205, 133, 63] },
      { name: 'Chocolate', rgb: [210, 105, 30] },
      { name: 'Dark Red', rgb: [139, 0, 0] },
      { name: 'Firebrick', rgb: [178, 34, 34] },
      { name: 'Tan', rgb: [160, 100, 66] },
      { name: 'Light Tan', rgb: [212, 146, 110] },
      { name: 'Peach', rgb: [255, 194, 157] },
      { name: 'Cream', rgb: [255, 245, 206] },
      { name: 'Olive Green', rgb: [153, 193, 79] },
      { name: 'Soft Peach', rgb: [255, 181, 133] },
      { name: 'Golden Yellow', rgb: [255, 226, 19] },
      { name: 'Burnt Orange', rgb: [230, 132, 14] },
      { name: 'Earthy Brown', rgb: [97, 78, 36] },
      { name: 'Deep Red', rgb: [210, 3, 3] },
      { name: 'Bright Gold', rgb: [249, 226, 19] },
      { name: 'Light Olive', rgb: [153, 193, 79] },
      { name: 'Dark Olive', rgb: [139, 69, 0] },
      { name: 'Rich Brown', rgb: [128, 64, 0] },
      { name: 'Brown Red', rgb: [165, 42, 42] },
      { name: 'Indian Red', rgb: [205, 92, 92] },
      { name: 'Dark Orange', rgb: [255, 140, 0] },
      { name: 'Goldenrod', rgb: [184, 134, 11] },
      { name: 'Sandy Brown', rgb: [244, 164, 96] },
      { name: 'Light Tan', rgb: [210, 180, 140] },
      { name: 'Burlywood', rgb: [222, 184, 135] },
      { name: 'Rosy Brown', rgb: [188, 143, 143] },
      { name: 'Saddle Brown', rgb: [139, 69, 19] },
      { name: 'Sienna', rgb: [160, 82, 45] },
      { name: 'Peru', rgb: [205, 133, 63] },
      { name: 'Coral', rgb: [255, 127, 80] },
      { name: 'Tomato', rgb: [255, 99, 71] },
      { name: 'Orange Red', rgb: [255, 69, 0] },
      { name: 'Maroon', rgb: [128, 0, 0] }
    ],
    less_flattering_colors: [
      'Bright Neons: Electric blue, neon pink (overpower your muted palette)',
      'Cool Pastels: Ice blue, lavender (can wash you out)',
      'Cool Grays: Ash gray (can look dull)'
    ],
    jewelry_recommendations: [
      'Gold: Works well with your neutral-warm leaning',
      'Rose Gold: A flattering, modern choice',
      'Copper: Adds warmth and richness',
      'Silver: Can work in small doses'
    ],
    additional_tips: [
      'Experiment with both warm and cool makeup tones, but lean slightly warmer',
      'Hair colors with neutral undertones (e.g., chestnut, dark blonde) work best'
    ]
  },
  'Spring_Warm Undertone': {
    flattering_colors: [
      { name: 'Goldenrod Yellow', rgb: [247, 202, 140] },
      { name: 'Emerald Green', rgb: [46, 204, 113] },
      { name: 'Sky Blue', rgb: [0, 188, 212] },
      { name: 'Cherry Blossom Pink', rgb: [255, 209, 220] },
      { name: 'Blush Pink', rgb: [255, 231, 235] },
      { name: 'Soft Sky Blue', rgb: [188, 224, 253] },
      { name: 'Soft Turquoise', rgb: [143, 216, 234] },
      { name: 'Light Pink', rgb: [255, 214, 214] },
      { name: 'Blush Pink', rgb: [255, 178, 178] },
      { name: 'Coral Pink', rgb: [255, 140, 140] },
      { name: 'Salmon Pink', rgb: [255, 102, 102] },
      { name: 'Magenta Pink', rgb: [230, 0, 124] },
      { name: 'Lime Green', rgb: [40, 180, 99] },
      { name: 'Sapphire Blue', rgb: [0, 123, 255] },
      { name: 'Soft Pink', rgb: [242, 183, 202] },
      { name: 'Lavender Blue', rgb: [131, 164, 212] },
      { name: 'Lime Green', rgb: [212, 225, 87] },
      { name: 'Coral Red', rgb: [202, 96, 114] },
      { name: 'Zesty Lemon', rgb: [255, 204, 41] },
      { name: 'Tangerine Tango', rgb: [243, 130, 111] },
      { name: 'Periwinkle Blue', rgb: [181, 218, 255] },
      { name: 'Limeade Green', rgb: [158, 219, 134] },
      { name: 'Lemon Yellow', rgb: [255, 255, 153] },
      { name: 'Sunny Yellow', rgb: [255, 255, 102] },
      { name: 'Mustard Yellow', rgb: [255, 214, 51] },
      { name: 'Golden Yellow', rgb: [255, 204, 0] },
      { name: 'Mandarin Dream', rgb: [255, 191, 64] },
      { name: 'Lime Zest', rgb: [127, 184, 14] },
      { name: 'Orange', rgb: [255, 165, 0] },
      { name: 'Cream', rgb: [255, 255, 215] },
      { name: 'Turquoise', rgb: [66, 139, 202] },
      { name: 'Raspberry Pink', rgb: [199, 21, 133] },
      { name: 'Lemon Yellow', rgb: [242, 194, 51] },
      { name: 'Watermelon Pink', rgb: [250, 91, 112] },
      { name: 'Forest Green', rgb: [40, 124, 62] },
      { name: 'Caramel Brown', rgb: [198, 120, 69] },
      { name: 'Peach', rgb: [255, 221, 177] },
      { name: 'Azure Blue', rgb: [174, 223, 247] },
      { name: 'Amethyst Purple', rgb: [178, 102, 255] },
      { name: 'Mauve Purple', rgb: [153, 82, 204] }
    ],
    less_flattering_colors: [
      'Dark Muted Tones: Burgundy, olive green (can overwhelm your brightness)',
      'Cool Pastels: Ice blue, lavender (can wash you out)',
      'Cool Grays: Ash gray (can look dull)'
    ],
    jewelry_recommendations: [
      'Gold: Works well with your neutral-warm leaning',
      'Rose Gold: A flattering, modern choice',
      'Copper: Adds warmth and richness',
      'Silver: Can work in small doses'
    ],
    additional_tips: [
      'Experiment with both warm and cool makeup tones, but lean slightly warmer',
      'Hair colors with neutral undertones (e.g., honey blonde, light brown) work best'
    ]
  },
  'Summer_Warm Undertone': {
    flattering_colors: [
      { name: 'Light Pink', rgb: [255, 182, 193] },
      { name: 'Peach Puff', rgb: [255, 218, 185] },
      { name: 'Pale Goldenrod', rgb: [255, 239, 219] },
      { name: 'Lavender', rgb: [230, 230, 250] },
      { name: 'Dark Magenta', rgb: [139, 0, 139] },
      { name: 'Hot Pink', rgb: [255, 105, 180] },
      { name: 'Royal Blue', rgb: [65, 105, 225] },
      { name: 'Sky Blue', rgb: [135, 206, 235] },
      { name: 'Gold', rgb: [255, 215, 0] },
      { name: 'Honeydew', rgb: [240, 255, 240] },
      { name: 'Pale Green', rgb: [152, 251, 152] },
      { name: 'Light Goldenrod Yellow', rgb: [250, 250, 210] },
      { name: 'Moccasin', rgb: [255, 228, 181] },
      { name: 'Tomato', rgb: [255, 99, 71] },
      { name: 'Dark Orange', rgb: [255, 140, 0] },
      { name: 'Lime Green', rgb: [50, 205, 50] },
      { name: 'Orange Red', rgb: [255, 69, 0] },
      { name: 'Steel Blue', rgb: [70, 130, 180] },
      { name: 'Powder Blue', rgb: [176, 224, 230] },
      { name: 'Peach Puff', rgb: [255, 218, 185] },
      { name: 'Light Blue', rgb: [173, 216, 230] },
      { name: 'Periwinkle', rgb: [199, 206, 234] },
      { name: 'Soft Lavender', rgb: [255, 212, 227] },
      { name: 'Pistachio', rgb: [196, 245, 166] },
      { name: 'Radical Red', rgb: [255, 90, 95] },
      { name: 'Electric Orange', rgb: [255, 174, 3] },
      { name: 'Mustard', rgb: [255, 213, 79] },
      { name: 'Amber', rgb: [255, 193, 7] },
      { name: 'Deep Orange', rgb: [255, 87, 34] },
      { name: 'Tangerine Tango', rgb: [255, 172, 90] },
      { name: 'Jungle Green', rgb: [94, 127, 94] },
      { name: 'Baby Blue', rgb: [174, 223, 242] },
      { name: 'Mint', rgb: [157, 224, 173] },
      { name: 'Turquoise', rgb: [0, 206, 209] },
      { name: 'Robin’s Egg Blue', rgb: [0, 172, 193] },
      { name: 'Pacific Blue', rgb: [0, 151, 167] },
      { name: 'Teal', rgb: [0, 121, 107] },
      { name: 'Coral', rgb: [255, 127, 80] },
      { name: 'Light Salmon', rgb: [255, 160, 122] },
      { name: 'Light Coral', rgb: [240, 128, 128] }
    ],
    less_flattering_colors: [
      'Bright Warm Tones: Orange, golden yellow (clash with your cool undertone)',
      'Dark Muted Tones: Burgundy, olive green (can overwhelm your soft palette)',
      'Warm Neutrals: Camel, warm beige (can look muddy)'
    ],
    jewelry_recommendations: [
      'Silver: Works well with your neutral-cool leaning',
      'White Gold: A sleek, modern choice',
      'Rose Gold: Can work in small doses',
      'Gold: Can work in small doses'
    ],
    additional_tips: [
      'Experiment with both warm and cool makeup tones, but lean slightly cooler',
      'Hair colors with neutral undertones (e.g., light brown, ash blonde) work best'
    ]
  },
  'Winter_Warm Undertone': {
    flattering_colors: [
      { name: 'Cool Blue', rgb: [83, 109, 161] },
      { name: 'Light Blue', rgb: [137, 169, 205] },
      { name: 'Pale Blue', rgb: [229, 231, 244] },
      { name: 'Snow White', rgb: [252, 253, 255] },
      { name: 'Silver Gray', rgb: [168, 170, 181] },
      { name: 'Navy Blue', rgb: [54, 90, 128] },
      { name: 'Ice Blue', rgb: [177, 192, 196] },
      { name: 'Glacial Blue', rgb: [185, 198, 202] },
      { name: 'Frost Blue', rgb: [193, 205, 208] },
      { name: 'Winter Sky', rgb: [200, 211, 214] },
      { name: 'Icy Gray', rgb: [208, 217, 220] },
      { name: 'Slate Gray', rgb: [216, 224, 226] },
      { name: 'Pale Gray', rgb: [224, 230, 231] },
      { name: 'Soft Gray', rgb: [232, 236, 237] },
      { name: 'Frost White', rgb: [239, 242, 243] },
      { name: 'Pure White', rgb: [247, 249, 249] },
      { name: 'Bright White', rgb: [255, 255, 255] },
      { name: 'Aqua Blue', rgb: [160, 230, 255] },
      { name: 'Sky Blue', rgb: [170, 233, 255] },
      { name: 'Light Aqua', rgb: [179, 235, 255] },
      { name: 'Pale Aqua', rgb: [189, 238, 255] },
      { name: 'Soft Aqua', rgb: [198, 240, 255] },
      { name: 'Ice Aqua', rgb: [208, 243, 255] },
      { name: 'Frost Aqua', rgb: [217, 245, 255] },
      { name: 'Glacial Aqua', rgb: [227, 248, 255] },
      { name: 'Pale Sky', rgb: [236, 250, 255] },
      { name: 'Winter Aqua', rgb: [246, 253, 255] },
      { name: 'Coral Red', rgb: [211, 84, 52] },
      { name: 'Soft Coral', rgb: [228, 164, 149] },
      { name: 'Deep Rust', rgb: [108, 40, 23] },
      { name: 'Warm Red', rgb: [160, 92, 84] },
      { name: 'Blush Coral', rgb: [204, 178, 174] },
      { name: 'Earthy Brown', rgb: [114, 84, 65] },
      { name: 'Classic Black', rgb: [0, 0, 0] },
      { name: 'Bright Red', rgb: [255, 0, 0] },
      { name: 'Deep Purple', rgb: [128, 0, 128] },
      { name: 'Navy Blue', rgb: [0, 51, 102] },
      { name: 'Dim Gray', rgb: [105, 105, 105] },
      { name: 'Silver', rgb: [192, 192, 192] },
      { name: 'Pure White', rgb: [255, 255, 255] }
    ],
    less_flattering_colors: [
      'Cool Pastels: Ice blue, lavender (can wash you out)',
      'Muted Earthy Tones: Olive green, muted beige (can look dull)'
    ],
    jewelry_recommendations: [
      'Gold: Complements your warm undertone',
      'Rose Gold: A flattering, modern choice',
      'Copper: Adds warmth and richness'
    ],
    additional_tips: [
      'Lean toward warm makeup tones (e.g., coral lipstick, warm eyeshadow)',
      'Hair colors with warm undertones (e.g., warm brown, auburn) work best'
    ]
  },
  'Winter_Neutral Undertone': {
    flattering_colors: [
      { name: 'Cool Blue', rgb: [83, 109, 161] },
      { name: 'Light Blue', rgb: [137, 169, 205] },
      { name: 'Pale Blue', rgb: [229, 231, 244] },
      { name: 'Snow White', rgb: [252, 253, 255] },
      { name: 'Silver Gray', rgb: [168, 170, 181] },
      { name: 'Navy Blue', rgb: [54, 90, 128] },
      { name: 'Ice Blue', rgb: [177, 192, 196] },
      { name: 'Glacial Blue', rgb: [185, 198, 202] },
      { name: 'Frost Blue', rgb: [193, 205, 208] },
      { name: 'Winter Sky', rgb: [200, 211, 214] },
      { name: 'Icy Gray', rgb: [208, 217, 220] },
      { name: 'Slate Gray', rgb: [216, 224, 226] },
      { name: 'Pale Gray', rgb: [224, 230, 231] },
      { name: 'Soft Gray', rgb: [232, 236, 237] },
      { name: 'Frost White', rgb: [239, 242, 243] },
      { name: 'Pure White', rgb: [247, 249, 249] },
      { name: 'Bright White', rgb: [255, 255, 255] },
      { name: 'Aqua Blue', rgb: [160, 230, 255] },
      { name: 'Sky Blue', rgb: [170, 233, 255] },
      { name: 'Light Aqua', rgb: [179, 235, 255] },
      { name: 'Pale Aqua', rgb: [189, 238, 255] },
      { name: 'Soft Aqua', rgb: [198, 240, 255] },
      { name: 'Ice Aqua', rgb: [208, 243, 255] },
      { name: 'Frost Aqua', rgb: [217, 245, 255] },
      { name: 'Glacial Aqua', rgb: [227, 248, 255] },
      { name: 'Pale Sky', rgb: [236, 250, 255] },
      { name: 'Winter Aqua', rgb: [246, 253, 255] },
      { name: 'Coral Red', rgb: [211, 84, 52] },
      { name: 'Soft Coral', rgb: [228, 164, 149] },
      { name: 'Deep Rust', rgb: [108, 40, 23] },
      { name: 'Warm Red', rgb: [160, 92, 84] },
      { name: 'Blush Coral', rgb: [204, 178, 174] },
      { name: 'Earthy Brown', rgb: [114, 84, 65] },
      { name: 'Classic Black', rgb: [0, 0, 0] },
      { name: 'Bright Red', rgb: [255, 0, 0] },
      { name: 'Deep Purple', rgb: [128, 0, 128] },
      { name: 'Navy Blue', rgb: [0, 51, 102] },
      { name: 'Dim Gray', rgb: [105, 105, 105] },
      { name: 'Silver', rgb: [192, 192, 192] },
      { name: 'Pure White', rgb: [255, 255, 255] }
    ],
    less_flattering_colors: [
      'Warm Pastels: Peach, coral (can clash with your palette)',
      'Muted Earthy Tones: Olive green, muted beige (can look dull)'
    ],
    jewelry_recommendations: [
      'Silver: Works well with neutral leaning',
      'White Gold: A sleek, modern choice',
      'Gold: Can work in small doses'
    ],
    additional_tips: [
      'Experiment with both cool and warm makeup tones',
      'Hair colors with neutral undertones (e.g., medium brown, ash blonde) work best'
    ]
  },
  'Autumn_Cool Undertone': {
    flattering_colors: [
      { name: 'Dark Brown', rgb: [110, 57, 26] },
      { name: 'Rust Red', rgb: [209, 73, 59] },
      { name: 'Coral', rgb: [255, 127, 80] },
      { name: 'Orange Red', rgb: [255, 69, 0] },
      { name: 'Saddle Brown', rgb: [139, 69, 19] },
      { name: 'Sienna', rgb: [160, 82, 45] },
      { name: 'Peru', rgb: [205, 133, 63] },
      { name: 'Chocolate', rgb: [210, 105, 30] },
      { name: 'Dark Red', rgb: [139, 0, 0] },
      { name: 'Firebrick', rgb: [178, 34, 34] },
      { name: 'Tan', rgb: [160, 100, 66] },
      { name: 'Light Tan', rgb: [212, 146, 110] },
      { name: 'Peach', rgb: [255, 194, 157] },
      { name: 'Cream', rgb: [255, 245, 206] },
      { name: 'Olive Green', rgb: [153, 193, 79] },
      { name: 'Soft Peach', rgb: [255, 181, 133] },
      { name: 'Golden Yellow', rgb: [255, 226, 19] },
      { name: 'Burnt Orange', rgb: [230, 132, 14] },
      { name: 'Earthy Brown', rgb: [97, 78, 36] },
      { name: 'Deep Red', rgb: [210, 3, 3] },
      { name: 'Bright Gold', rgb: [249, 226, 19] },
      { name: 'Light Olive', rgb: [153, 193, 79] },
      { name: 'Dark Olive', rgb: [139, 69, 0] },
      { name: 'Rich Brown', rgb: [128, 64, 0] },
      { name: 'Brown Red', rgb: [165, 42, 42] },
      { name: 'Indian Red', rgb: [205, 92, 92] },
      { name: 'Dark Orange', rgb: [255, 140, 0] },
      { name: 'Goldenrod', rgb: [184, 134, 11] },
      { name: 'Sandy Brown', rgb: [244, 164, 96] },
      { name: 'Light Tan', rgb: [210, 180, 140] },
      { name: 'Burlywood', rgb: [222, 184, 135] },
      { name: 'Rosy Brown', rgb: [188, 143, 143] },
      { name: 'Saddle Brown', rgb: [139, 69, 19] },
      { name: 'Sienna', rgb: [160, 82, 45] },
      { name: 'Peru', rgb: [205, 133, 63] },
      { name: 'Coral', rgb: [255, 127, 80] },
      { name: 'Tomato', rgb: [255, 99, 71] },
      { name: 'Orange Red', rgb: [255, 69, 0] },
      { name: 'Maroon', rgb: [128, 0, 0] }
    ],
    less_flattering_colors: [
      'Bright Warm Tones: Orange, golden yellow (can clash with your cool undertone)',
      'Neon Colors: Electric blue, neon pink (overpower your palette)'
    ],
    jewelry_recommendations: [
      'Silver: Complements your cool undertone',
      'White Gold: A sleek, modern choice',
      'Platinum: A luxurious option'
    ],
    additional_tips: [
      'Opt for cool makeup tones (e.g., pink lipstick, cool-toned eyeshadow)',
      'Hair colors with cool undertones (e.g., ash brown, dark blonde) work best'
    ]
  },
  'Autumn_Warm Undertone': {
    flattering_colors: [
      { name: 'Dark Brown', rgb: [110, 57, 26] },
      { name: 'Rust Red', rgb: [209, 73, 59] },
      { name: 'Coral', rgb: [255, 127, 80] },
      { name: 'Orange Red', rgb: [255, 69, 0] },
      { name: 'Saddle Brown', rgb: [139, 69, 19] },
      { name: 'Sienna', rgb: [160, 82, 45] },
      { name: 'Peru', rgb: [205, 133, 63] },
      { name: 'Chocolate', rgb: [210, 105, 30] },
      { name: 'Dark Red', rgb: [139, 0, 0] },
      { name: 'Firebrick', rgb: [178, 34, 34] },
      { name: 'Tan', rgb: [160, 100, 66] },
      { name: 'Light Tan', rgb: [212, 146, 110] },
      { name: 'Peach', rgb: [255, 194, 157] },
      { name: 'Cream', rgb: [255, 245, 206] },
      { name: 'Olive Green', rgb: [153, 193, 79] },
      { name: 'Soft Peach', rgb: [255, 181, 133] },
      { name: 'Golden Yellow', rgb: [255, 226, 19] },
      { name: 'Burnt Orange', rgb: [230, 132, 14] },
      { name: 'Earthy Brown', rgb: [97, 78, 36] },
      { name: 'Deep Red', rgb: [210, 3, 3] },
      { name: 'Bright Gold', rgb: [249, 226, 19] },
      { name: 'Light Olive', rgb: [153, 193, 79] },
      { name: 'Dark Olive', rgb: [139, 69, 0] },
      { name: 'Rich Brown', rgb: [128, 64, 0] },
      { name: 'Brown Red', rgb: [165, 42, 42] },
      { name: 'Indian Red', rgb: [205, 92, 92] },
      { name: 'Dark Orange', rgb: [255, 140, 0] },
      { name: 'Goldenrod', rgb: [184, 134, 11] },
      { name: 'Sandy Brown', rgb: [244, 164, 96] },
      { name: 'Light Tan', rgb: [210, 180, 140] },
      { name: 'Burlywood', rgb: [222, 184, 135] },
      { name: 'Rosy Brown', rgb: [188, 143, 143] },
      { name: 'Saddle Brown', rgb: [139, 69, 19] },
      { name: 'Sienna', rgb: [160, 82, 45] },
      { name: 'Peru', rgb: [205, 133, 63] },
      { name: 'Coral', rgb: [255, 127, 80] },
      { name: 'Tomato', rgb: [255, 99, 71] },
      { name: 'Orange Red', rgb: [255, 69, 0] },
      { name: 'Maroon', rgb: [128, 0, 0] }
    ],
    less_flattering_colors: [
      'Cool Pastels: Ice blue, lavender (can wash you out)',
      'Cool Grays: Ash gray (can look dull)'
    ],
    jewelry_recommendations: [
      'Gold: Complements your warm undertone',
      'Rose Gold: A flattering, modern choice',
      'Copper: Adds warmth and richness'
    ],
    additional_tips: [
      'Lean toward warm makeup tones (e.g., coral lipstick, warm eyeshadow)',
      'Hair colors with warm undertones (e.g., chestnut, warm brown) work best'
    ]
  },
  'Spring_Cool Undertone': {
    flattering_colors: [
      { name: 'Goldenrod Yellow', rgb: [247, 202, 140] },
      { name: 'Emerald Green', rgb: [46, 204, 113] },
      { name: 'Sky Blue', rgb: [0, 188, 212] },
      { name: 'Cherry Blossom Pink', rgb: [255, 209, 220] },
      { name: 'Blush Pink', rgb: [255, 231, 235] },
      { name: 'Soft Sky Blue', rgb: [188, 224, 253] },
      { name: 'Soft Turquoise', rgb: [143, 216, 234] },
      { name: 'Light Pink', rgb: [255, 214, 214] },
      { name: 'Blush Pink', rgb: [255, 178, 178] },
      { name: 'Coral Pink', rgb: [255, 140, 140] },
      { name: 'Salmon Pink', rgb: [255, 102, 102] },
      { name: 'Magenta Pink', rgb: [230, 0, 124] },
      { name: 'Lime Green', rgb: [40, 180, 99] },
      { name: 'Sapphire Blue', rgb: [0, 123, 255] },
      { name: 'Soft Pink', rgb: [242, 183, 202] },
      { name: 'Lavender Blue', rgb: [131, 164, 212] },
      { name: 'Lime Green', rgb: [212, 225, 87] },
      { name: 'Coral Red', rgb: [202, 96, 114] },
      { name: 'Zesty Lemon', rgb: [255, 204, 41] },
      { name: 'Tangerine Tango', rgb: [243, 130, 111] },
      { name: 'Periwinkle Blue', rgb: [181, 218, 255] },
      { name: 'Limeade Green', rgb: [158, 219, 134] },
      { name: 'Lemon Yellow', rgb: [255, 255, 153] },
      { name: 'Sunny Yellow', rgb: [255, 255, 102] },
      { name: 'Mustard Yellow', rgb: [255, 214, 51] },
      { name: 'Golden Yellow', rgb: [255, 204, 0] },
      { name: 'Mandarin Dream', rgb: [255, 191, 64] },
      { name: 'Lime Zest', rgb: [127, 184, 14] },
      { name: 'Orange', rgb: [255, 165, 0] },
      { name: 'Cream', rgb: [255, 255, 215] },
      { name: 'Turquoise', rgb: [66, 139, 202] },
      { name: 'Raspberry Pink', rgb: [199, 21, 133] },
      { name: 'Lemon Yellow', rgb: [242, 194, 51] },
      { name: 'Watermelon Pink', rgb: [250, 91, 112] },
      { name: 'Forest Green', rgb: [40, 124, 62] },
      { name: 'Caramel Brown', rgb: [198, 120, 69] },
      { name: 'Peach', rgb: [255, 221, 177] },
      { name: 'Azure Blue', rgb: [174, 223, 247] },
      { name: 'Amethyst Purple', rgb: [178, 102, 255] },
      { name: 'Mauve Purple', rgb: [153, 82, 204] }
    ],
    less_flattering_colors: [
      'Dark Muted Tones: Burgundy, olive green (can overwhelm your brightness)',
      'Warm Neons: Orange, golden yellow (can clash with your cool undertone)'
    ],
    jewelry_recommendations: [
      'Silver: Complements your cool undertone',
      'White Gold: A sleek, modern choice',
      'Platinum: A luxurious option'
    ],
    additional_tips: [
      'Opt for cool makeup tones (e.g., pink lipstick, cool-toned eyeshadow)',
      'Hair colors with cool undertones (e.g., ash blonde, light brown) work best'
    ]
  },
  'Spring_Neutral Undertone': {
    flattering_colors: [
      { name: 'Goldenrod Yellow', rgb: [247, 202, 140] },
      { name: 'Emerald Green', rgb: [46, 204, 113] },
      { name: 'Sky Blue', rgb: [0, 188, 212] },
      { name: 'Cherry Blossom Pink', rgb: [255, 209, 220] },
      { name: 'Blush Pink', rgb: [255, 231, 235] },
      { name: 'Soft Sky Blue', rgb: [188, 224, 253] },
      { name: 'Soft Turquoise', rgb: [143, 216, 234] },
      { name: 'Light Pink', rgb: [255, 214, 214] },
      { name: 'Blush Pink', rgb: [255, 178, 178] },
      { name: 'Coral Pink', rgb: [255, 140, 140] },
      { name: 'Salmon Pink', rgb: [255, 102, 102] },
      { name: 'Magenta Pink', rgb: [230, 0, 124] },
      { name: 'Lime Green', rgb: [40, 180, 99] },
      { name: 'Sapphire Blue', rgb: [0, 123, 255] },
      { name: 'Soft Pink', rgb: [242, 183, 202] },
      { name: 'Lavender Blue', rgb: [131, 164, 212] },
      { name: 'Lime Green', rgb: [212, 225, 87] },
      { name: 'Coral Red', rgb: [202, 96, 114] },
      { name: 'Zesty Lemon', rgb: [255, 204, 41] },
      { name: 'Tangerine Tango', rgb: [243, 130, 111] },
      { name: 'Periwinkle Blue', rgb: [181, 218, 255] },
      { name: 'Limeade Green', rgb: [158, 219, 134] },
      { name: 'Lemon Yellow', rgb: [255, 255, 153] },
      { name: 'Sunny Yellow', rgb: [255, 255, 102] },
      { name: 'Mustard Yellow', rgb: [255, 214, 51] },
      { name: 'Golden Yellow', rgb: [255, 204, 0] },
      { name: 'Mandarin Dream', rgb: [255, 191, 64] },
      { name: 'Lime Zest', rgb: [127, 184, 14] },
      { name: 'Orange', rgb: [255, 165, 0] },
      { name: 'Cream', rgb: [255, 255, 215] },
      { name: 'Turquoise', rgb: [66, 139, 202] },
      { name: 'Raspberry Pink', rgb: [199, 21, 133] },
      { name: 'Lemon Yellow', rgb: [242, 194, 51] },
      { name: 'Watermelon Pink', rgb: [250, 91, 112] },
      { name: 'Forest Green', rgb: [40, 124, 62] },
      { name: 'Caramel Brown', rgb: [198, 120, 69] },
      { name: 'Peach', rgb: [255, 221, 177] },
      { name: 'Azure Blue', rgb: [174, 223, 247] },
      { name: 'Amethyst Purple', rgb: [178, 102, 255] },
      { name: 'Mauve Purple', rgb: [153, 82, 204] }
    ],
    less_flattering_colors: [
      'Dark Muted Tones: Burgundy, olive green (can overwhelm your brightness)',
      'Cool Grays: Ash gray (can look dull)'
    ],
    jewelry_recommendations: [
      'Gold: Works well with neutral leaning',
      'Rose Gold: A flattering, modern choice',
      'Silver: Can work in small doses'
    ],
    additional_tips: [
      'Experiment with both warm and cool makeup tones',
      'Hair colors with neutral undertones (e.g., honey blonde, medium brown) work best'
    ]
  },
  'Summer_Cool Undertone': {
    flattering_colors: [
      { name: 'Light Pink', rgb: [255, 182, 193] },
      { name: 'Peach Puff', rgb: [255, 218, 185] },
      { name: 'Pale Goldenrod', rgb: [255, 239, 219] },
      { name: 'Lavender', rgb: [230, 230, 250] },
      { name: 'Dark Magenta', rgb: [139, 0, 139] },
      { name: 'Hot Pink', rgb: [255, 105, 180] },
      { name: 'Royal Blue', rgb: [65, 105, 225] },
      { name: 'Sky Blue', rgb: [135, 206, 235] },
      { name: 'Gold', rgb: [255, 215, 0] },
      { name: 'Honeydew', rgb: [240, 255, 240] },
      { name: 'Pale Green', rgb: [152, 251, 152] },
      { name: 'Light Goldenrod Yellow', rgb: [250, 250, 210] },
      { name: 'Moccasin', rgb: [255, 228, 181] },
      { name: 'Tomato', rgb: [255, 99, 71] },
      { name: 'Dark Orange', rgb: [255, 140, 0] },
      { name: 'Lime Green', rgb: [50, 205, 50] },
      { name: 'Orange Red', rgb: [255, 69, 0] },
      { name: 'Steel Blue', rgb: [70, 130, 180] },
      { name: 'Powder Blue', rgb: [176, 224, 230] },
      { name: 'Peach Puff', rgb: [255, 218, 185] },
      { name: 'Light Blue', rgb: [173, 216, 230] },
      { name: 'Periwinkle', rgb: [199, 206, 234] },
      { name: 'Soft Lavender', rgb: [255, 212, 227] },
      { name: 'Pistachio', rgb: [196, 245, 166] },
      { name: 'Radical Red', rgb: [255, 90, 95] },
      { name: 'Electric Orange', rgb: [255, 174, 3] },
      { name: 'Mustard', rgb: [255, 213, 79] },
      { name: 'Amber', rgb: [255, 193, 7] },
      { name: 'Deep Orange', rgb: [255, 87, 34] },
      { name: 'Tangerine Tango', rgb: [255, 172, 90] },
      { name: 'Jungle Green', rgb: [94, 127, 94] },
      { name: 'Baby Blue', rgb: [174, 223, 242] },
      { name: 'Mint', rgb: [157, 224, 173] },
      { name: 'Turquoise', rgb: [0, 206, 209] },
      { name: 'Robin’s Egg Blue', rgb: [0, 172, 193] },
      { name: 'Pacific Blue', rgb: [0, 151, 167] },
      { name: 'Teal', rgb: [0, 121, 107] },
      { name: 'Coral', rgb: [255, 127, 80] },
      { name: 'Light Salmon', rgb: [255, 160, 122] },
      { name: 'Light Coral', rgb: [240, 128, 128] }
    ],
    less_flattering_colors: [
      'Bright Warm Tones: Orange, golden yellow (clash with your cool undertone)',
      'Dark Muted Tones: Burgundy, olive green (can overwhelm your soft palette)'
    ],
    jewelry_recommendations: [
      'Silver: Complements your cool undertone',
      'White Gold: A sleek, modern choice',
      'Platinum: A luxurious option'
    ],
    additional_tips: [
      'Opt for cool makeup tones (e.g., pink lipstick, cool-toned eyeshadow)',
      'Hair colors with cool undertones (e.g., ash blonde, light brown) work best'
    ]
  },
  'Summer_Neutral Undertone': {
    flattering_colors: [
      { name: 'Light Pink', rgb: [255, 182, 193] },
      { name: 'Peach Puff', rgb: [255, 218, 185] },
      { name: 'Pale Goldenrod', rgb: [255, 239, 219] },
      { name: 'Lavender', rgb: [230, 230, 250] },
      { name: 'Dark Magenta', rgb: [139, 0, 139] },
      { name: 'Hot Pink', rgb: [255, 105, 180] },
      { name: 'Royal Blue', rgb: [65, 105, 225] },
      { name: 'Sky Blue', rgb: [135, 206, 235] },
      { name: 'Gold', rgb: [255, 215, 0] },
      { name: 'Honeydew', rgb: [240, 255, 240] },
      { name: 'Pale Green', rgb: [152, 251, 152] },
      { name: 'Light Goldenrod Yellow', rgb: [250, 250, 210] },
      { name: 'Moccasin', rgb: [255, 228, 181] },
      { name: 'Tomato', rgb: [255, 99, 71] },
      { name: 'Dark Orange', rgb: [255, 140, 0] },
      { name: 'Lime Green', rgb: [50, 205, 50] },
      { name: 'Orange Red', rgb: [255, 69, 0] },
      { name: 'Steel Blue', rgb: [70, 130, 180] },
      { name: 'Powder Blue', rgb: [176, 224, 230] },
      { name: 'Peach Puff', rgb: [255, 218, 185] },
      { name: 'Light Blue', rgb: [173, 216, 230] },
      { name: 'Periwinkle', rgb: [199, 206, 234] },
      { name: 'Soft Lavender', rgb: [255, 212, 227] },
      { name: 'Pistachio', rgb: [196, 245, 166] },
      { name: 'Radical Red', rgb: [255, 90, 95] },
      { name: 'Electric Orange', rgb: [255, 174, 3] },
      { name: 'Mustard', rgb: [255, 213, 79] },
      { name: 'Amber', rgb: [255, 193, 7] },
      { name: 'Deep Orange', rgb: [255, 87, 34] },
      { name: 'Tangerine Tango', rgb: [255, 172, 90] },
      { name: 'Jungle Green', rgb: [94, 127, 94] },
      { name: 'Baby Blue', rgb: [174, 223, 242] },
      { name: 'Mint', rgb: [157, 224, 173] },
      { name: 'Turquoise', rgb: [0, 206, 209] },
      { name: 'Robin’s Egg Blue', rgb: [0, 172, 193] },
      { name: 'Pacific Blue', rgb: [0, 151, 167] },
      { name: 'Teal', rgb: [0, 121, 107] },
      { name: 'Coral', rgb: [255, 127, 80] },
      { name: 'Light Salmon', rgb: [255, 160, 122] },
      { name: 'Light Coral', rgb: [240, 128, 128] }
    ],
    less_flattering_colors: [
      'Bright Warm Tones: Orange, golden yellow (can overpower your palette)',
      'Dark Muted Tones: Burgundy, olive green (can look heavy)'
    ],
    jewelry_recommendations: [
      'Silver: Works well with neutral leaning',
      'White Gold: A sleek, modern choice',
      'Gold: Can work in small doses'
    ],
    additional_tips: [
      'Experiment with both warm and cool makeup tones',
      'Hair colors with neutral undertones (e.g., light brown, ash blonde) work best'
    ]
  }
};





export const generatePDF = (season, undertone) => {
  const contentKey = `${season}_${undertone}`;
  const content = PDF_CONTENT[contentKey];

  // Create PDF using jsPDF
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const lineHeight = 7;
  let y = 20;

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text(`A Guide for ${season} with ${undertone}`, pageWidth / 2, y, { align: 'center' });
  y += 15;

  // Helper function to draw regular sections
  const drawSection = (title, items) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text(title, margin, y);
    y += lineHeight;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    items.forEach(item => {
      const splitText = doc.splitTextToSize(item, pageWidth - 2 * margin - 10);
      doc.text('•', margin + 5, y);
      doc.text(splitText, margin + 10, y);
      y += lineHeight * splitText.length + 2;
    });
    y += 5; // Extra spacing between sections
  };

  // Helper function to draw Flattering Colors section in 4 columns with color names
  const drawColorSection = (title, colors) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text(title, margin, y);
    y += lineHeight + 5;

    const squareSize = 10; // 10x10 point squares
    const squareSpacing = 5; // Space between square and text
    const textWidth = 30; // Width for color name text
    const columnWidth = (pageWidth - 2 * margin - 3 * squareSpacing) / 4; // Divide page into 4 columns
    const rowHeight = 12; // Height per row to accommodate square and text

    let column = 0;
    let rowStartY = y;

    colors.forEach((color, index) => {
      const x = margin + column * (columnWidth + squareSpacing);

      // Draw colored square
      doc.setFillColor(...color.rgb);
      doc.rect(x, rowStartY, squareSize, squareSize, 'F');

      // Draw color name text
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      const text = color.name;
      const splitText = doc.splitTextToSize(text, textWidth);
      doc.text(splitText, x + squareSize + squareSpacing, rowStartY + squareSize - 2);

      column++;
      if (column === 4 || index === colors.length - 1) {
        // Move to next row
        column = 0;
        rowStartY += rowHeight * Math.max(1, splitText.length);
        y = rowStartY;
        // Check for page overflow
        if (y + rowHeight > pageHeight - margin) {
          doc.addPage();
          y = margin;
          rowStartY = y;
        }
      }
    });
    y += rowHeight; // Add space after the grid
    y += 5; // Extra spacing after section
  };

  // Draw sections
  drawColorSection('Flattering Colors:', content.flattering_colors);
  drawSection('Less Flattering Colors:', content.less_flattering_colors);
  drawSection('Jewelry Recommendations:', content.jewelry_recommendations);
  drawSection('Additional Tips:', content.additional_tips);

  // Save PDF
  doc.save(`${undertone.split(' ')[0].toLowerCase()}_${season.toLowerCase()}.pdf`);
};