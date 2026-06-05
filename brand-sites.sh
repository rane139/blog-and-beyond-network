#!/bin/bash
# brand-sites.sh

# Health Site - Cyan theme
cat > sites/health/assets/css/extended/custom.css << 'EOF'
:root {
  --theme: #06b6d4;
  --primary: #0891b2;
  --content: #164e63;
  --secondary: #a5f3fc;
}
.site-header { border-bottom: 3px solid var(--theme); }
.post-content a { color: var(--primary); }
EOF

# Detox Site - Green theme
cat > sites/detox/assets/css/extended/custom.css << 'EOF'
:root {
  --theme: #84cc16;
  --primary: #65a30d;
  --content: #365314;
  --secondary: #d9f99d;
}
.site-header { border-bottom: 3px solid var(--theme); }
.post-content a { color: var(--primary); }
EOF

# Nomad Site - Amber theme
cat > sites/nomad/assets/css/extended/custom.css << 'EOF'
:root {
  --theme: #f59e0b;
  --primary: #d97706;
  --content: #78350f;
  --secondary: #fde68a;
}
.site-header { border-bottom: 3px solid var(--theme); }
.post-content a { color: var(--primary); }
EOF

# Creator Site - Purple theme
cat > sites/creator/assets/css/extended/custom.css << 'EOF'
:root {
  --theme: #8b5cf6;
  --primary: #7c3aed;
  --content: #4c1d95;
  --secondary: #ddd6fe;
}
.site-header { border-bottom: 3px solid var(--theme); }
.post-content a { color: var(--primary); }
EOF

# Tech Site - Slate theme
cat > sites/tech/assets/css/extended/custom.css << 'EOF'
:root {
  --theme: #64748b;
  --primary: #475569;
  --content: #1e293b;
  --secondary: #e2e8f0;
}
.site-header { border-bottom: 3px solid var(--theme); }
.post-content a { color: var(--primary); }
EOF

# Climate Site - Teal theme
cat > sites/climate/assets/css/extended/custom.css << 'EOF'
:root {
  --theme: #14b8a6;
  --primary: #0d9488;
  --content: #134e4a;
  --secondary: #99f6e4;
}
.site-header { border-bottom: 3px solid var(--theme); }
.post-content a { color: var(--primary); }
EOF

# SEO Site - Blue theme
cat > sites/seo/assets/css/extended/custom.css << 'EOF'
:root {
  --theme: #3b82f6;
  --primary: #2563eb;
  --content: #1e3a5f;
  --secondary: #bfdbfe;
}
.site-header { border-bottom: 3px solid var(--theme); }
.post-content a { color: var(--primary); }
EOF

echo "✅ All sites branded"