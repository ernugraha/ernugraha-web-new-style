---
layout: post
title: "Memulai dengan Jekyll: Panduan Lengkap"
date: 2026-06-15
categories: [Tutorial]
tags: [jekyll, web, static-site]
description: "Pelajari cara membangun website statis modern menggunakan Jekyll dari nol."
read_time: 5
search_exclude: false
---

Jekyll adalah generator situs statis yang powerful dan mudah digunakan. Dengan Jekyll, kamu bisa membuat website atau blog profesional tanpa database atau backend yang rumit.

## Apa itu Jekyll?

Jekyll mengubah teks biasa menjadi website statis yang siap di-deploy. Ditulis dalam Ruby, Jekyll sangat populer di kalangan developer karena integrasinya dengan GitHub Pages.

## Instalasi

Pastikan Ruby sudah terpasang, lalu jalankan:

```bash
gem install jekyll bundler
jekyll new nama-siteku
cd nama-siteku
bundle exec jekyll serve
```

## Struktur Folder

```
.
├── _config.yml      # Konfigurasi utama
├── _layouts/        # Template layout
├── _includes/       # Komponen yang bisa di-include
├── _posts/          # Artikel blog
├── _sass/           # File SCSS
└── assets/          # CSS, JS, gambar
```

## Front Matter

Setiap halaman dan post menggunakan YAML front matter di bagian atas:

```yaml
---
layout: post
title: "Judul Artikel"
date: 2026-06-15
categories: [Tutorial]
search_exclude: false
---
```

Dengan `search_exclude: true`, halaman tidak akan muncul di hasil pencarian.
