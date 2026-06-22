---
layout: post
title: "Optimasi Performa Website dengan Lazy Loading"
date: 2026-06-05
categories: [Performa]
tags: [performance, images, web-vitals]
description: "Teknik lazy loading bisa memangkas waktu muat halaman secara drastis."
read_time: 4
search_exclude: false
---

Lazy loading adalah teknik yang menunda pemuatan resource (gambar, video, iframe) sampai benar-benar dibutuhkan — ketika elemen mendekati viewport pengguna.

## Kenapa Penting?

Halaman yang lambat kehilangan pengunjung. Setiap detik keterlambatan bisa mengurangi konversi hingga 7%. Lazy loading adalah salah satu cara paling efektif untuk meningkatkan performa.

## Native Lazy Loading

Browser modern sudah mendukung lazy loading secara native:

```html
<img src="foto.jpg" alt="Deskripsi" loading="lazy">
<iframe src="video.html" loading="lazy"></iframe>
```

Cukup tambahkan `loading="lazy"` — tidak perlu JavaScript!

## Intersection Observer API

Untuk kontrol lebih lanjut, gunakan Intersection Observer:

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      observer.unobserve(img);
    }
  });
});

document.querySelectorAll('img[data-src]').forEach(img => {
  observer.observe(img);
});
```

Template ini sudah menggunakan `loading="lazy"` pada semua gambar secara default.
