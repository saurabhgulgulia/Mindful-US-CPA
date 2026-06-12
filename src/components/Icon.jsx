import React from 'react';
import * as LucideIcons from 'lucide-react';

function toPascal(s) {
  return String(s).split(/[-_\s]+/).filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join('');
}

// Icon — thin wrapper around lucide-react. Original <Icon name="arrow-right" /> API preserved.
export function Icon({ name, size = 20, color, style, className }) {
  const Cmp = LucideIcons[toPascal(name)] || LucideIcons.Circle;
  return (
    <span className={className} style={{ display: 'inline-flex', alignItems: 'center', color, ...(style || {}) }}>
      <Cmp size={size} color={color} strokeWidth={1.5} />
    </span>
  );
}
