export interface BrandingConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  logoPath: string;
  fontFamily: string;
}

const brandingTemplates: { [key: string]: Partial<BrandingConfig> } = {
  'Animal Welfare': {
    primaryColor: '#FF6B35',
    secondaryColor: '#F7931E',
    accentColor: '#FCB900',
    backgroundColor: '#FFF5F0',
    textColor: '#2C3E50',
    fontFamily: "'Segoe UI', 'Roboto', sans-serif"
  },
  'Education': {
    primaryColor: '#4A90E2',
    secondaryColor: '#7B68EE',
    accentColor: '#50C878',
    backgroundColor: '#F0F4F8',
    textColor: '#2C3E50',
    fontFamily: "'Georgia', serif"
  },
  'Healthcare': {
    primaryColor: '#00A8E8',
    secondaryColor: '#00C9A7',
    accentColor: '#845EC2',
    backgroundColor: '#F0F9FF',
    textColor: '#1A202C',
    fontFamily: "'Arial', sans-serif"
  },
  'Environment': {
    primaryColor: '#22C55E',
    secondaryColor: '#84CC16',
    accentColor: '#14B8A6',
    backgroundColor: '#F0FDF4',
    textColor: '#15803D',
    fontFamily: "'Helvetica Neue', sans-serif"
  },
  'Food Bank': {
    primaryColor: '#059669',
    secondaryColor: '#F59E0B',
    accentColor: '#DC2626',
    backgroundColor: '#FEFCE8',
    textColor: '#451A03',
    fontFamily: "'Open Sans', sans-serif"
  },
  'Default': {
    primaryColor: '#6366F1',
    secondaryColor: '#EC4899',
    accentColor: '#F59E0B',
    backgroundColor: '#FAFAFA',
    textColor: '#1F2937',
    fontFamily: "'Inter', sans-serif"
  }
};

export function generateBranding(nonprofitType: string, nonprofitName: string): BrandingConfig {
  const template = brandingTemplates[nonprofitType] || brandingTemplates['Default'];
  
  return {
    primaryColor: template.primaryColor!,
    secondaryColor: template.secondaryColor!,
    accentColor: template.accentColor!,
    backgroundColor: template.backgroundColor!,
    textColor: template.textColor!,
    logoPath: '',
    fontFamily: template.fontFamily!
  };
}

export function generateLogoSVG(nonprofitName: string, nonprofitType: string, branding: BrandingConfig): string {
  const initials = nonprofitName
    .split(' ')
    .map(word => word[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const shapes: { [key: string]: string } = {
    'Animal Welfare': `
      <defs>
        <linearGradient id="goatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${branding.primaryColor};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${branding.secondaryColor};stop-opacity:1" />
        </linearGradient>
        <filter id="shadow">
          <feDropShadow dx="0" dy="1" stdDeviation="1" flood-opacity="0.2"/>
        </filter>
      </defs>
      <!-- Goat silhouette -->
      <g transform="translate(30, 30) scale(0.8)">
        <!-- Body -->
        <ellipse cx="0" cy="3" rx="12" ry="8" fill="url(#goatGrad)" filter="url(#shadow)"/>
        <!-- Head -->
        <ellipse cx="-8" cy="-2" rx="6" ry="5" fill="url(#goatGrad)"/>
        <!-- Horns -->
        <path d="M-10 -5 L-11 -9" stroke="${branding.primaryColor}" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M-6 -5 L-5 -9" stroke="${branding.primaryColor}" stroke-width="1.5" stroke-linecap="round"/>
        <!-- Legs -->
        <rect x="-8" y="8" width="2" height="6" fill="${branding.primaryColor}" rx="1"/>
        <rect x="-3" y="8" width="2" height="6" fill="${branding.primaryColor}" rx="1"/>
        <rect x="2" y="8" width="2" height="6" fill="${branding.primaryColor}" rx="1"/>
        <rect x="7" y="8" width="2" height="6" fill="${branding.primaryColor}" rx="1"/>
        <!-- Eye -->
        <circle cx="-8" cy="-2" r="1" fill="white"/>
        <circle cx="-8" cy="-2" r="0.5" fill="#333"/>
        <!-- Tail -->
        <path d="M10 2 Q13 0 12 -3" stroke="${branding.primaryColor}" stroke-width="2" fill="none" stroke-linecap="round"/>
      </g>
    `,
    'Education': `
      <defs>
        <linearGradient id="eduGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${branding.primaryColor};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${branding.secondaryColor};stop-opacity:1" />
        </linearGradient>
      </defs>
      <!-- Graduation cap -->
      <g transform="translate(30, 28)">
        <path d="M0 -8 L-15 0 L0 8 L15 0 Z" fill="url(#eduGrad)"/>
        <path d="M0 8 L0 12 L-12 6 L-12 2" fill="${branding.secondaryColor}"/>
        <path d="M0 8 L0 12 L12 6 L12 2" fill="${branding.secondaryColor}"/>
        <!-- Tassel -->
        <line x1="15" y1="0" x2="20" y2="5" stroke="${branding.accentColor}" stroke-width="2"/>
        <circle cx="20" cy="8" r="2" fill="${branding.accentColor}"/>
      </g>
      <!-- Book base -->
      <rect x="18" y="38" width="24" height="3" fill="${branding.primaryColor}" rx="1"/>
    `,
    'Healthcare': `
      <defs>
        <linearGradient id="healthGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${branding.primaryColor};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${branding.secondaryColor};stop-opacity:1" />
        </linearGradient>
      </defs>
      <!-- Medical cross with heart -->
      <g transform="translate(30, 30)">
        <!-- Heart background -->
        <path d="M0 -5 C-5 -12, -15 -12, -15 -5 C-15 0, -10 5, 0 12 C10 5, 15 0, 15 -5 C15 -12, 5 -12, 0 -5 Z" 
              fill="${branding.secondaryColor}" opacity="0.3" transform="scale(1.2)"/>
        <!-- Medical cross -->
        <rect x="-3" y="-12" width="6" height="24" fill="url(#healthGrad)" rx="2"/>
        <rect x="-12" y="-3" width="24" height="6" fill="url(#healthGrad)" rx="2"/>
      </g>
    `,
    'Environment': `
      <defs>
        <linearGradient id="envGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${branding.primaryColor};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${branding.secondaryColor};stop-opacity:1" />
        </linearGradient>
      </defs>
      <!-- Tree with leaves -->
      <g transform="translate(30, 30)">
        <!-- Trunk -->
        <rect x="-3" y="5" width="6" height="10" fill="${branding.secondaryColor}" rx="1"/>
        <!-- Tree crown layers -->
        <circle cx="0" cy="-5" r="8" fill="url(#envGrad)"/>
        <circle cx="-6" cy="0" r="6" fill="url(#envGrad)"/>
        <circle cx="6" cy="0" r="6" fill="url(#envGrad)"/>
        <circle cx="0" cy="3" r="7" fill="url(#envGrad)"/>
        <!-- Leaf details -->
        <circle cx="-3" cy="-3" r="1" fill="${branding.backgroundColor}" opacity="0.6"/>
        <circle cx="3" cy="-1" r="1" fill="${branding.backgroundColor}" opacity="0.6"/>
        <circle cx="0" cy="2" r="1" fill="${branding.backgroundColor}" opacity="0.6"/>
      </g>
    `,
    'Food Bank': `
      <defs>
        <linearGradient id="foodGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${branding.primaryColor};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${branding.secondaryColor};stop-opacity:1" />
        </linearGradient>
      </defs>
      <!-- Shopping basket with food -->
      <g transform="translate(30, 30)">
        <!-- Basket -->
        <path d="M-12 0 L-10 12 L10 12 L12 0" stroke="url(#foodGrad)" stroke-width="2" fill="none"/>
        <path d="M-12 0 L12 0" stroke="url(#foodGrad)" stroke-width="2"/>
        <!-- Handle -->
        <path d="M-8 0 Q0 -8 8 0" stroke="${branding.primaryColor}" stroke-width="2" fill="none"/>
        <!-- Food items -->
        <circle cx="-4" cy="5" r="3" fill="${branding.accentColor}"/>
        <ellipse cx="4" cy="6" rx="4" ry="3" fill="${branding.secondaryColor}"/>
        <rect x="-2" y="3" width="4" height="6" fill="${branding.primaryColor}" rx="1"/>
      </g>
    `,
    'Default': `
      <defs>
        <linearGradient id="defaultGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${branding.primaryColor};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${branding.secondaryColor};stop-opacity:1" />
        </linearGradient>
      </defs>
      <!-- Star with circle -->
      <circle cx="30" cy="30" r="18" fill="url(#defaultGrad)" opacity="0.9"/>
      <path d="M30 18 L33 25 L40 25 L34 30 L37 37 L30 33 L23 37 L26 30 L20 25 L27 25 Z" 
            fill="${branding.backgroundColor}"/>
    `
  };

  const shapeContent = shapes[nonprofitType] || shapes['Default'];

  return `
    <svg width="80" height="80" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="logoShadow">
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.15"/>
        </filter>
      </defs>
      <rect width="60" height="60" rx="14" fill="${branding.backgroundColor}" filter="url(#logoShadow)"/>
      <rect width="60" height="60" rx="14" fill="white" opacity="0.9"/>
      ${shapeContent}
      <text x="30" y="54" font-family="${branding.fontFamily}" font-size="6" font-weight="800" 
            fill="${branding.textColor}" text-anchor="middle" opacity="0.8" letter-spacing="1">
        ${initials}
      </text>
    </svg>
  `;
}