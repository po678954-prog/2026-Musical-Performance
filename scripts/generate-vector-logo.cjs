const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const fontkit = require('@pdf-lib/fontkit');

// Build vector text glyphs using fontkit
const fontCollection = fontkit.create(fs.readFileSync('/usr/share/fonts/truetype/wqy/wqy-zenhei.ttc'));
const font = fontCollection.fonts[0];
const text = '恩感事奉團隊';
const run = font.layout(text);
const fontSize = 54;
const fontScale = fontSize / font.unitsPerEm;

let currentX = 0;
const spacing = 22;
const glyphParts = [];

run.glyphs.forEach((g) => {
  const d = g.path.toSVG();
  const adv = g.advanceWidth * fontScale;
  glyphParts.push(`<g transform="translate(${currentX.toFixed(2)}, 0) scale(${fontScale.toFixed(5)}, ${(-fontScale).toFixed(5)})"><path d="${d}" fill="#161763"/></g>`);
  currentX += adv + spacing;
});

const totalWidth = currentX - spacing;
const startX = 500 - totalWidth / 2;
const textSvgGroup = `<g transform="translate(${startX.toFixed(2)}, 840)">${glyphParts.join('')}</g>`;

const fullSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 900" width="1000" height="900">
  <defs>
    <!-- Soft bread radial gradients -->
    <radialGradient id="bunGrad" cx="45%" cy="38%" r="65%">
      <stop offset="0%" stop-color="#FFF9DC"/>
      <stop offset="60%" stop-color="#FDE882"/>
      <stop offset="100%" stop-color="#F2CB51"/>
    </radialGradient>

    <!-- Red pool gradient -->
    <linearGradient id="redPool" x1="10%" y1="10%" x2="90%" y2="90%">
      <stop offset="0%" stop-color="#F04E72"/>
      <stop offset="60%" stop-color="#E52D54"/>
      <stop offset="100%" stop-color="#C21A40"/>
    </linearGradient>

    <!-- Blue pool gradient -->
    <linearGradient id="bluePool" x1="10%" y1="10%" x2="90%" y2="90%">
      <stop offset="0%" stop-color="#A5CEFD"/>
      <stop offset="45%" stop-color="#5E9FF5"/>
      <stop offset="100%" stop-color="#347DE0"/>
    </linearGradient>

    <!-- Clip path for the communion pool -->
    <clipPath id="poolClip">
      <ellipse cx="500" cy="585" rx="275" ry="122"/>
    </clipPath>
  </defs>

  <!-- G: Back Bread Buns (drawn behind pool) -->
  <g stroke="#3A1224" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round">
    <!-- Back-left bun -->
    <ellipse cx="375" cy="500" rx="85" ry="38" transform="rotate(-6 375 500)" fill="url(#bunGrad)"/>
    <!-- Back-right bun -->
    <ellipse cx="625" cy="500" rx="85" ry="38" transform="rotate(6 625 500)" fill="url(#bunGrad)"/>
  </g>

  <!-- G: The Central Communion Pool (Yin-Yang / Water & Blood) -->
  <g>
    <!-- Outermost pool outline border -->
    <ellipse cx="500" cy="585" rx="275" ry="122" fill="#347DE0" stroke="#3A1224" stroke-width="4.5"/>
    
    <g clip-path="url(#poolClip)">
      <!-- Right/Blue side base -->
      <rect x="200" y="435" width="600" height="300" fill="url(#bluePool)"/>

      <!-- Specular reflection on blue side -->
      <path d="M 640,525 C 690,545 720,595 710,625 C 690,605 670,565 630,545 Z" fill="#FFFFFF" opacity="0.45"/>

      <!-- Left/Red side: S-curve divider -->
      <path d="M 500,463 C 570,463 580,545 500,585 C 420,625 430,707 500,707 C 340,707 225,645 225,585 C 225,525 340,463 500,463 Z" fill="url(#redPool)"/>

      <!-- Dark plum dots in each half -->
      <!-- Dot in the blue/upper half -->
      <circle cx="475" cy="527" r="11" fill="#2D0D1D"/>
      <!-- Dot in the red/lower half -->
      <circle cx="525" cy="645" r="11" fill="#2D0D1D"/>

      <!-- Texture brush hatch marks on red side -->
      <g stroke="#911432" stroke-width="3.2" stroke-linecap="round" opacity="0.75">
        <line x1="310" y1="595" x2="330" y2="615"/>
        <line x1="320" y1="580" x2="345" y2="600"/>
        <line x1="335" y1="570" x2="360" y2="590"/>
        <line x1="390" y1="625" x2="415" y2="635"/>
        <line x1="410" y1="615" x2="435" y2="625"/>
        <line x1="430" y1="605" x2="455" y2="613"/>
      </g>

      <!-- Texture brush hatch marks on blue side -->
      <g stroke="#1F4D94" stroke-width="3.2" stroke-linecap="round" opacity="0.75">
        <line x1="570" y1="520" x2="605" y2="515"/>
        <line x1="580" y1="535" x2="620" y2="530"/>
        <line x1="580" y1="550" x2="625" y2="545"/>
        <line x1="565" y1="565" x2="615" y2="565"/>
        <line x1="550" y1="580" x2="600" y2="585"/>
        <line x1="660" y1="565" x2="695" y2="580"/>
        <line x1="670" y1="580" x2="705" y2="595"/>
      </g>
    </g>

    <!-- Re-stroke pool boundary line -->
    <ellipse cx="500" cy="585" rx="275" ry="122" fill="none" stroke="#3A1224" stroke-width="4.5"/>
  </g>

  <!-- G: Front and Side Bread Buns -->
  <g stroke="#3A1224" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round">
    <!-- Leftmost bun -->
    <ellipse cx="245" cy="600" rx="65" ry="42" transform="rotate(-22 245 600)" fill="url(#bunGrad)"/>
    <!-- Rightmost bun -->
    <ellipse cx="755" cy="600" rx="65" ry="42" transform="rotate(22 755 600)" fill="url(#bunGrad)"/>

    <!-- Front-left bun -->
    <ellipse cx="365" cy="695" rx="100" ry="42" transform="rotate(-6 365 695)" fill="url(#bunGrad)"/>
    <!-- Front-right bun -->
    <ellipse cx="635" cy="695" rx="100" ry="42" transform="rotate(6 635 695)" fill="url(#bunGrad)"/>

    <!-- Subtle toasted spots on buns -->
    <ellipse cx="240" cy="595" rx="18" ry="12" fill="#EAA036" opacity="0.6" stroke="none"/>
    <ellipse cx="360" cy="700" rx="26" ry="12" fill="#EAA036" opacity="0.6" stroke="none"/>
    <ellipse cx="640" cy="700" rx="26" ry="12" fill="#EAA036" opacity="0.6" stroke="none"/>
    <ellipse cx="760" cy="595" rx="18" ry="12" fill="#EAA036" opacity="0.6" stroke="none"/>

    <!-- Small hand-drawn sketch notches on buns -->
    <path d="M 330,720 L 340,723" stroke="#3A1224" stroke-width="3" fill="none"/>
    <path d="M 370,727 L 380,725" stroke="#3A1224" stroke-width="3" fill="none"/>
    <path d="M 625,727 L 635,725" stroke="#3A1224" stroke-width="3" fill="none"/>
    <path d="M 665,723 L 675,720" stroke="#3A1224" stroke-width="3" fill="none"/>
  </g>

  <!-- G: The Radiant 8-Pointed Guiding Star -->
  <!-- Top ray goes up to (500, 70), left to (340, 235), right to (660, 235), diagonals, and bottom ray extends down as a needle to (500, 585) into the pool -->
  <g stroke="#1A101C" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round">
    <polygon points="
      500,70
      525,210
      570,165
      545,225
      660,235
      545,250
      570,305
      525,265
      500,585
      475,265
      430,305
      455,250
      340,235
      455,225
      430,165
      475,210
    " fill="#FDF52A"/>
  </g>

  <!-- Pure Vector Typography: 恩感事奉團隊 -->
  ${textSvgGroup}
</svg>`;

const svgPath = path.join(__dirname, '../public/logo.svg');
const pngPath = path.join(__dirname, '../public/logo.png');

fs.writeFileSync(svgPath, fullSvg, 'utf8');
console.log('Saved public/logo.svg (vector glyphs embedded)');

try {
  execSync(`ffmpeg -y -i "${svgPath}" -vf "scale=1000:900" "${pngPath}"`);
  console.log('Generated public/logo.png using ffmpeg librsvg');
} catch (e) {
  console.error('ffmpeg conversion error:', e);
}
