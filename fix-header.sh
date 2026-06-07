#!/bin/bash
# fix-header.sh

SITES=("health" "detox" "nomad" "creator" "tech" "climate" "seo")
TITLES=(
  "Hyper-Personalized Health"
  "Digital Detox"
  "Micro-Nomad Lifestyle"
  "Creator-Educator"
  "Ultra-Compact Tech"
  "Climate Travel"
  "Zero-Click SEO"
)

for i in "${!SITES[@]}"; do
  SITE="${SITES[$i]}"
  TITLE="${TITLES[$i]}"
  
  # Create header partial
  mkdir -p sites/$SITE/layouts/partials
  
  cat > sites/$SITE/layouts/partials/header.html << 'HEADEREOF'
<header class="header">
    <nav class="nav">
        <div class="logo">
            <a class="logo-link" href="/" title="Daily Pulse Network">
                ← Daily Pulse
            </a>
        </div>
        <div class="site-title">
            <a href="/SITE_PLACEHOLDER/">SITE_TITLE_PLACEHOLDER</a>
        </div>
        <span class="logo-switches">
            {{- if (not .Site.Params.disableThemeToggle) }}
            <button id="theme-toggle" accesskey="t" title="(Alt + T)">
                <svg id="moon" xmlns="http://www.w3.org/2000/svg" width="24" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            </button>
            {{- end }}
        </span>
    </nav>
</header>
HEADEREOF

  # Replace placeholders
  sed -i "s|SITE_PLACEHOLDER|$SITE|g" sites/$SITE/layouts/partials/header.html
  sed -i "s|SITE_TITLE_PLACEHOLDER|$TITLE|g" sites/$SITE/layouts/partials/header.html

  # Create custom CSS
  mkdir -p sites/$SITE/assets/css/extended
  
  cat > sites/$SITE/assets/css/extended/header.css << 'CSSEOF'
.logo-link {
    font-size: 0.85rem;
    color: var(--primary);
    text-decoration: none;
    font-weight: 600;
    padding: 6px 12px;
    border: 1px solid var(--border);
    border-radius: 8px;
    transition: background 0.2s;
    white-space: nowrap;
}

.logo-link:hover {
    background: var(--theme);
    color: white;
}

.site-title a {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--content);
    text-decoration: none;
}

.nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
    padding: 4px 0;
}
CSSEOF

  echo "✅ Fixed $SITE"
done

echo ""
echo "All 7 sites updated!"
