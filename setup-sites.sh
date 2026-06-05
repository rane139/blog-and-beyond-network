#!/bin/bash
# setup-sites.sh

SITES=("health" "detox" "nomad" "creator" "tech" "climate" "seo")
DOMAINS=(
  "health.blogandbeyond.com"
  "detox.blogandbeyond.com"
  "nomad.blogandbeyond.com"
  "creator.blogandbeyond.com"
  "tech.blogandbeyond.com"
  "climate.blogandbeyond.com"
  "seo.blogandbeyond.com"
)
TITLES=(
  "Daily Pulse: Health"
  "Daily Pulse: Digital Detox"
  "Daily Pulse: Micro-Nomad"
  "Daily Pulse: Creator-Educator"
  "Daily Pulse: Compact Tech"
  "Daily Pulse: Climate Travel"
  "Daily Pulse: Zero-Click SEO"
)

for i in "${!SITES[@]}"; do
  SITE="${SITES[$i]}"
  DOMAIN="${DOMAINS[$i]}"
  TITLE="${TITLES[$i]}"
  
  echo "Setting up $SITE..."
  
  # Create Hugo site
  cd sites/$SITE
  hugo new site . --force
  
  # Add theme
  git submodule add https://github.com/adityatelange/hugo-PaperMod.git themes/PaperMod
  
  # Create hugo.toml
  cat > hugo.toml << EOF
baseURL = 'https://${DOMAIN}/'
languageCode = 'en-us'
title = '${TITLE}'
theme = 'PaperMod'

enableRobotsTXT = true
enableEmoji = true

[params]
  env = "production"
  ShowReadingTime = true
  ShowShareButtons = true
  ShowPostNavLinks = true
  ShowBreadCrumbs = true
  ShowCodeCopyButtons = false
  ShowToc = false
  ShowFullTextinRSS = true
  
  [params.homeInfoParams]
    Title = "${TITLE}"
    Content = "Daily AI-powered insights. Pure information. No sales pitch."
  
  [params.label]
    text = "Daily Pulse"
    icon = "/icons/favicon.png"

[markup]
  [markup.goldmark]
    [markup.goldmark.renderer]
      unsafe = true

[outputs]
  home = ["HTML", "RSS", "JSON"]
EOF

  # Create CNAME file for custom domain
  echo "${DOMAIN}" > static/CNAME
  
  # Create content directory
  mkdir -p content/posts
  
  # Create icons directory
  mkdir -p static/icons
  
  cd ../..
  
  echo "✅ $SITE setup complete"
done

echo "All sites created!"