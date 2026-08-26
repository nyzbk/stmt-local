export const FAQ_ITEMS = [
  {
    q: "Does my statement leave this device?",
    a: "No. The PDF is parsed in this tab with PDF.js. There is no upload, no account, and no server-side converter.",
  },
  {
    q: "Which PDFs work?",
    a: "Text-based digital statements — the files banks email or offer as a download. Scans and photos have no selectable text, so Ledger v1 will refuse them instead of inventing rows.",
  },
  {
    q: "What if columns look wrong?",
    a: "Use the dropdown on each column. Ignore anything that is not a transaction field. Then export.",
  },
  {
    q: "Do you store the file?",
    a: "No. Refresh or close the tab and the bytes are gone. We cannot see your statement.",
  },
  {
    q: "Is this an official bank document?",
    a: "No. Ledger is not a bank and not financial advice. Verify numbers before tax filings or sending them to an accountant.",
  },
  {
    q: "Are there ads on the statement?",
    a: "Ads never sit next to Drop, Extract, or Download. Placeholders stay off until a site is Ready in AdSense.",
  },
  {
    q: "What GitHub projects power this?",
    a: "Mozilla PDF.js reads the file. A small on-device table heuristic groups rows. SheetJS writes Excel. Nothing is sent to those projects’ servers — the libraries run in this tab.",
  },
  {
    q: "Can I convert a photo of a paper statement?",
    a: "Not in this version. Photograph PDFs have no text layer. Unlock or re-download a digital statement from the bank instead.",
  },
] as const;
