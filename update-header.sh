#!/bin/bash

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
PATHS=("health" "detox" "nomad" "creator" "tech" "climate" "seo")
ICONS=(
  '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>'
  '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/><path d="M12 7a5 5 0 0 1 0 10" stroke-width="1.5"/>'
  '<circle cx="12" cy="10" r="3"/><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z"/>'
  '<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>'
  '<rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>'
  '<path d="M12 22c5.523 0 10-4.477 10-10 0-4.478-2.943-8.268-7-9.542v2.124a7.003 7.003 0 0 1 0 12.836v2.124C20.057 18.268 23 14.478 23 10c0-5.523-4.477-10-10-10S2 4.477 2 10c0 4.478 2.943 8.268 7 9.542v-2.124a7.003 7.003 0 0 1 0-12.836V2.458C4.943 3.732 2 7.522 2 12c0 5.523 4.477 10 10 10z"/>'
  '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><path d="M11 8a3 3 0 0 0-3 3"/>'
)

HOME_ICON='<path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z"/>'

for i in "${!SITES[@]}"; do
  SITE="${SITES[$i]}"
  TITLE="${TITLES[$i]}"
  PATH_NAME="${PATHS[$i]}"
  ICON="${ICONS[$i]}"
  
  mkdir -p sites/$SITE/layouts/partials
  mkdir -p sites/$SITE/assets/css/extended
  
  cat > sites/$SITE/layouts/partials/header.html << HEADEREOF
<header class="header">
    <div class="header-inner">
        <nav class="nav">
            <div class="nav-left">
                {{ if .IsHome }}
                <a class="brand-link" href="/">
                    <span class="brand-icon">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                            ${HOME_ICON}
                        </svg>
                    </span>
                    <span class="brand-title">Blog and Beyond</span>
                </a>
                {{ else if eq .Kind "section" }}
                <a class="brand-link" href="/">
                    <span class="brand-icon">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                            ${HOME_ICON}
                        </svg>
                    </span>
                    <span class="brand-title">Blog and Beyond</span>
                </a>
                {{ else }}
                <a class="brand-link" href="/${PATH_NAME}/">
                    <span class="brand-icon">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                            ${ICON}
                        </svg>
                    </span>
                    <span class="brand-title">${TITLE}</span>
                </a>
                {{ end }}
            </div>
            
            <div class="nav-right">
                {{- if (not .Site.Params.disableThemeToggle) }}
                <button id="theme-toggle" accesskey="t" title="Toggle theme" aria-label="Toggle dark mode">
                    <svg class="theme-sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="5"/>
                        <line x1="12" y1="1" x2="12" y2="3"/>
                        <line x1="12" y1="21" x2="12" y2="23"/>
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                        <line x1="1" y1="12" x2="3" y2="12"/>
                        <line x1="21" y1="12" x2="23" y2="12"/>
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                    </svg>
                    <svg class="theme-moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                    </svg>
                </button>
                {{- end }}
            </div>
        </nav>
    </div>
</header>
HEADEREOF

  cat > sites/$SITE/assets/css/extended/header.css << 'CSSEOF'
.header {
    padding: 16px 0 12px;
    border-bottom: 1px solid var(--border);
    margin-bottom: 28px;
    background: var(--theme);
}

.header-inner {
    max-width: var(--main-width);
    margin: 0 auto;
    padding: 0 var(--gap);
}

.nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 36px;
}

.nav-left {
    display: flex;
    align-items: center;
}

.brand-link {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    color: var(--content);
    transition: opacity 0.2s ease;
    padding: 2px 0;
}

.brand-link:hover {
    opacity: 0.75;
}

.brand-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: rgba(128, 128, 128, 0.12);
    flex-shrink: 0;
    color: var(--primary);
}

.brand-title {
    font-size: 1.05rem;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: var(--content);
}

.nav-right {
    display: flex;
    align-items: center;
    flex-shrink: 0;
}

#theme-toggle {
    background: rgba(128, 128, 128, 0.1);
    border: none;
    border-radius: 10px;
    width: 36px;
    height: 36px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s ease;
    color: var(--content);
    position: relative;
}

#theme-toggle:hover {
    background: rgba(128, 128, 128, 0.2);
}

.theme-sun,
.theme-moon {
    position: absolute;
    transition: opacity 0.2s ease, transform 0.3s ease;
}

.theme-sun {
    opacity: 0;
    transform: rotate(-90deg) scale(0.5);
}

.theme-moon {
    opacity: 1;
    transform: rotate(0) scale(1);
}

html.dark .theme-sun,
body.dark .theme-sun {
    opacity: 1;
    transform: rotate(0) scale(1);
}

html.dark .theme-moon,
body.dark .theme-moon {
    opacity: 0;
    transform: rotate(90deg) scale(0.5);
}

@media (max-width: 600px) {
    .header {
        padding: 12px 0 10px;
        margin-bottom: 20px;
    }
    
    .brand-title {
        font-size: 0.95rem;
    }
    
    .brand-icon,
    #theme-toggle {
        width: 32px;
        height: 32px;
        border-radius: 8px;
    }
    
    .brand-link {
        gap: 8px;
    }
}
CSSEOF

  echo "✅ $SITE updated"
done

echo ""
echo "All 7 sites updated with elegant header!"
