# Sebastian Hinz — Portfolio Website

Responsive, zweisprachige (DE/EN) Portfolio-Website mit Dark/Light-Theme und
Apple-artigen Scroll-Fade-Ins. Reine statische Seite ohne Build-Schritt.

## Features

- **Responsive** von Mobile bis Desktop
- **Zweisprachig** – Deutsch / Englisch, Umschaltung oben rechts (in `localStorage` gespeichert)
- **Dark / Light Theme** – folgt anfangs dem System, per Button umschaltbar
- **Scroll-Reveal** – der erste Abschnitt (Hero) ist sofort sichtbar, alle
  weiteren Abschnitte faden beim Scrollen von unten nach oben ein
  (`IntersectionObserver`), respektiert `prefers-reduced-motion`
- **Design** – Dunkelgrautöne mit Orange-Akzent (+ harmonisierendes Amber),
  Ambient-Orbs, Grid-Overlay, Scroll-Progress

## Struktur

```
index.html                 # Aufbau & Inhalte (data-i18n Attribute)
assets/css/styles.css      # Design-Tokens, Dark/Light, Layout, Animationen
assets/js/i18n.js          # Übersetzungen DE/EN
assets/js/main.js          # Theme, Sprache, Reveal, Nav, Counter
assets/img/sebastian-hinz.png   # Profilbild
assets/img/favicon.svg
```

## Lokal ansehen

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Deployment

Als statische Seite direkt über **GitHub Pages** hostbar
(Settings → Pages → Branch auswählen, Root-Ordner `/`).

## Abschnitte

01 Profil · 02 Technologien & Kenntnisse · 03 Aktuelles Projekt (KMP/CMP)
· 04 Berufserfahrung · 05 Bildung · 06 Kontakt
