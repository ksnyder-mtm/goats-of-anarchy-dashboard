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
    .substring(0, 3)
    .toUpperCase();

  const shapes: { [key: string]: string } = {
    'Animal Welfare': `
      <path d="M25 45 Q20 30 25 25 Q30 20 35 25 Q40 30 35 45 Z" fill="${branding.secondaryColor}" opacity="0.7"/>
      <circle cx="30" cy="35" r="12" fill="${branding.primaryColor}"/>
      <path d="M22 32 Q25 28 30 28 Q35 28 38 32" stroke="white" stroke-width="2" fill="none"/>
      <circle cx="25" cy="35" r="1.5" fill="white"/>
      <circle cx="35" cy="35" r="1.5" fill="white"/>
    `,
    'Education': `
      <rect x="20" y="25" width="20" height="25" fill="${branding.secondaryColor}" rx="2"/>
      <path d="M15 20 L30 10 L45 20 L30 30 Z" fill="${branding.primaryColor}"/>
      <circle cx="30" cy="20" r="3" fill="${branding.accentColor}"/>
    `,
    'Healthcare': `
      <rect x="25" y="15" width="10" height="30" fill="${branding.primaryColor}" rx="2"/>
      <rect x="15" y="25" width="30" height="10" fill="${branding.primaryColor}" rx="2"/>
      <circle cx="30" cy="30" r="18" fill="none" stroke="${branding.secondaryColor}" stroke-width="2"/>
    `,
    'Environment': `
      <path d="M30 45 Q20 35 20 25 Q20 15 30 10 Q40 15 40 25 Q40 35 30 45 Z" fill="${branding.primaryColor}"/>
      <path d="M30 20 L30 35" stroke="${branding.backgroundColor}" stroke-width="2"/>
      <path d="M25 25 L30 30 L35 25" stroke="${branding.backgroundColor}" stroke-width="2"/>
    `,
    'Food Bank': `
      <rect x="18" y="25" width="24" height="20" fill="${branding.secondaryColor}" rx="3"/>
      <path d="M20 25 Q30 15 40 25" fill="${branding.primaryColor}"/>
      <circle cx="25" cy="32" r="3" fill="${branding.backgroundColor}"/>
      <circle cx="35" cy="32" r="3" fill="${branding.backgroundColor}"/>
    `,
    'Default': `
      <circle cx="30" cy="30" r="20" fill="${branding.primaryColor}"/>
      <polygon points="30,15 35,25 45,25 37,33 40,43 30,37 20,43 23,33 15,25 25,25" fill="${branding.backgroundColor}"/>
    `
  };

  const shapeContent = shapes[nonprofitType] || shapes['Default'];

  return `
    <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="60" rx="12" fill="${branding.backgroundColor}"/>
      ${shapeContent}
      <text x="30" y="52" font-family="${branding.fontFamily}" font-size="8" font-weight="bold" fill="${branding.textColor}" text-anchor="middle">
        ${initials}
      </text>
    </svg>
  `;
}