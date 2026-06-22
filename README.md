# Jekyll Apple-Style Template

Template Jekyll dengan desain terinspirasi Apple — navbar blur dinamis, dark mode, dan pencarian bawaan.

## Fitur

- **Navbar dinamis** — transparan di top, frosted-glass blur saat scroll
- **Dark / Light mode** — toggle manual + ikuti preferensi sistem, disimpan ke localStorage
- **Pencarian bawaan** — full-text search tanpa plugin eksternal, shortcut `Ctrl+K` / `⌘K`
- **`search_exclude`** — tambahkan `search_exclude: true` di front matter untuk mengecualikan halaman dari pencarian
- **Responsif** — mobile-first, hamburger menu animasi
- **Animasi halus** — hero entrance, card hover, float devices, reduced-motion aware

## Cara Memulai

### Prasyarat

- Ruby 3.1+
- Bundler

### Instalasi

```bash
git clone <repo-url>
cd jekyll-template
bundle install
bundle exec jekyll serve --livereload
```

Buka `http://localhost:4000`

## Struktur

```
.
├── _config.yml          # Konfigurasi utama
├── _layouts/
│   ├── default.html     # Layout dasar
│   ├── home.html        # Homepage dengan hero
│   ├── post.html        # Halaman artikel
│   └── page.html        # Halaman statis
├── _includes/
│   ├── navbar.html      # Navbar dengan blur effect
│   ├── footer.html      # Footer
│   └── search-modal.html # Modal pencarian
├── _sass/
│   ├── _variables.scss  # Design tokens & CSS custom properties
│   ├── _base.scss       # Reset, tipografi, utilitas
│   ├── _navbar.scss     # Navbar + mobile menu
│   ├── _hero.scss       # Hero section + animasi
│   └── _components.scss # Search modal, cards, footer
├── assets/
│   ├── css/main.scss    # Entry point SCSS
│   └── js/
│       ├── theme.js     # Dark/light mode manager
│       ├── navbar.js    # Scroll detection + mobile menu
│       └── search.js    # Search modal + keyboard nav
├── _posts/              # Artikel blog (YYYY-MM-DD-judul.md)
└── _pages/              # Halaman statis
```

## Konfigurasi

Edit `_config.yml`:

```yaml
title: "Nama Situs"
description: "Deskripsi singkat."
search: true           # aktifkan/matikan fitur pencarian
```

## search_exclude

Untuk mengecualikan halaman dari pencarian:

```yaml
---
layout: page
title: "Rahasia"
search_exclude: true   # tidak muncul di hasil pencarian
---
```

## Kustomisasi Tema

Warna dan token desain ada di `_sass/_variables.scss`. Edit nilai CSS custom properties di blok `:root` (light) dan `[data-theme="dark"]`.

## Deploy

### GitHub Pages

```bash
# Tambahkan gem "github-pages" ke Gemfile
bundle exec jekyll build
# Push ke branch gh-pages
```

### Netlify / Vercel

Build command: `bundle exec jekyll build`  
Publish directory: `_site`
