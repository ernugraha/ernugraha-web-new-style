---
layout: post
title: "Dark Mode di Website: Kenapa Penting?"
date: 2026-06-10
categories: [Desain]
tags: [dark-mode, css, ux]
description: "Dark mode bukan sekadar tren — ini tentang aksesibilitas dan kenyamanan pengguna."
read_time: 3
search_exclude: false
---

Dark mode telah menjadi fitur standar yang diharapkan pengguna modern. Lebih dari sekadar estetika, dark mode memberikan manfaat nyata bagi pengguna.

## Manfaat Dark Mode

**Mengurangi kelelahan mata** — Layar terang di lingkungan gelap bisa menyebabkan ketegangan mata. Dark mode mengurangi kontras yang ekstrem ini.

**Hemat baterai** — Pada layar OLED/AMOLED, piksel hitam tidak memancarkan cahaya, sehingga konsumsi daya berkurang signifikan.

**Aksesibilitas** — Beberapa kondisi seperti fotofobia membuat pengguna lebih nyaman dengan latar belakang gelap.

## Implementasi dengan CSS Custom Properties

```css
:root {
  --color-bg: #f5f5f7;
  --color-text: #1d1d1f;
}

[data-theme="dark"] {
  --color-bg: #000000;
  --color-text: #f5f5f7;
}
```

Dengan pendekatan ini, seluruh tema bisa diubah hanya dengan mengganti atribut `data-theme` di elemen `<html>`.

## Simpan Preferensi Pengguna

```javascript
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
}
```

Template ini sudah mengimplementasikan semua fitur di atas!
