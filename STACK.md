# Ledger — stack (source of truth)

**Job:** bank statement PDF → table → Excel/CSV. File never leaves the device.

## GitHub ядра (обязательно)

| Role | GitHub | npm | License |
|------|--------|-----|---------|
| PDF text + coordinates | https://github.com/mozilla/pdf.js | `pdfjs-dist@6.2.108` | Apache-2.0 |
| Excel write | https://github.com/SheetJS/sheetjs | `xlsx@0.18.5` | Apache-2.0 (community) |
| iOS-safe Blob download | https://github.com/eligrey/FileSaver.js | `file-saver` | MIT |
| Table mapping | this repo `src/lib/ledger/*` | — | ours |

Do **not** add: Tabula, pdfplumber, Camelot, Tesseract (v1), Plaid, upload APIs, `@imgly/*`.

## Worker / fonts (без этого extract висит)

```ts
GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();
```

```bash
cp -a node_modules/pdfjs-dist/standard_fonts public/standard_fonts
```

`getDocument({ standardFontDataUrl: "/standard_fonts/", disableStream: true, disableAutoFetch: true })`

Prefetch: `useEffect(() => { void import("@/lib/ledger/extract"); }, [])`

## Shell (workspace)

Vite + React 19 + TanStack Start/Router + Tailwind v4. Auth OFF. DB OFF.

## Ads / GSC

See `ADSENSE.md` and `SEARCH_CONSOLE.md`. `VITE_ADSENSE_LIVE` stays false until Site Ready.

Origin: `https://stmt-local.vercel.app`  
Repo target: `nyzbk/stmt-local`
