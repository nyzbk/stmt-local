export const FAQ_ITEMS = [
  {
    q: "Does my bank statement leave this device?",
    a: "No. Ledger reads the PDF in this browser tab with Mozilla PDF.js, groups text into rows on your CPU, and writes Excel with SheetJS. There is no upload endpoint and no converter API. We cannot see the file. Refresh or close the tab and the bytes are gone. Ads, when they exist, never receive the PDF.",
  },
  {
    q: "Do I need an account?",
    a: "No. There is no signup, no email gate, and no daily quota. You drop a digital statement and download a spreadsheet. Ledger is not a cloud archive. We do not keep a copy of past conversions because we never receive them.",
  },
  {
    q: "Is there a watermark or a paid unlock?",
    a: "No. The Excel and CSV files Ledger writes are ordinary spreadsheets. We do not stamp a logo on the sheet, and we do not lock columns behind a paywall. Always check the numbers against the original PDF before you file or send them — that check is on you, not a premium feature.",
  },
  {
    q: "Which browsers work, including iPhone?",
    a: "Current Chrome, Edge, Firefox, and Safari (including iOS Safari) can run the PDF worker. Stay in this tab while a large statement is reading; locking an old iPhone mid-parse can starve memory. If Safari complains about a worker, try the same PDF on desktop Chrome. Password-locked files must be unlocked in the bank app first.",
  },
  {
    q: "How large a PDF can I drop, and can I batch?",
    a: "v1 accepts up to three PDFs in one drop, processed one after another. A typical monthly statement is a few dozen pages and is fine. Multi-hundred-page annual dumps can exhaust a phone tab — split the year in online banking, or use a desktop browser. There is no server queue because nothing is queued off-device.",
  },
  {
    q: "What goes in and what comes out?",
    a: "In: a text-based PDF statement — the file banks email or offer as “Download PDF”. Out: an .xlsx workbook (Transactions plus a Notes sheet with the original filename) or a UTF-8 CSV with a BOM so Excel on Windows keeps characters. Amounts become numbers when they parse; dates stay text so Excel does not shift the day across time zones.",
  },
  {
    q: "Will amounts be exact?",
    a: "Ledger guesses columns from headers and spacing. Banks do not share one layout. Parentheses like (12.50) can mean a debit; tick “Treat (123.45) as negative” if that matches your statement. Always compare totals to the PDF. Ledger is not a bank and the sheet is not an official statement.",
  },
  {
    q: "What happens to metadata inside the PDF?",
    a: "The PDF never leaves the tab, so document metadata does not go to our servers. The Excel Notes sheet records the filename you chose and that processing was on-device. We do not strip or copy bank-embedded producer tags into a tracking system because we have none.",
  },
  {
    q: "Does it work offline after the first visit?",
    a: "After the page, fonts, and PDF worker have loaded from this origin, extraction does not need a network. You can toggle airplane mode and still parse a statement already on the phone. The first visit does need HTTPS to fetch those libraries. We do not fetch the PDF from a URL for you.",
  },
  {
    q: "Why is this on a vercel.app domain? Is that safe?",
    a: "vercel.app is ordinary HTTPS hosting. Safety here is the architecture: your statement is not posted to Vercel as form data. The converter runs in the browser. A custom domain would not change that. Do not email the PDF to strangers either; use the tool, then delete the download when you are done.",
  },
  {
    q: "When do ads appear, and will they sit on my table?",
    a: "Ad placeholders exist after a successful extract, mid-page, and in the footer. They stay empty until Google marks the site Ready. Ads never sit on the drop zone, Extract, or Download. We do not ask you to click ads. The PDF bytes are not sent to the ad tag.",
  },
  {
    q: "Who runs Ledger, and how do I contact you?",
    a: "Ledger is a local-first tool from Ultimatum. Email ultaultimatum@gmail.com with the page URL, browser, and what you expected. Do not attach a real statement — that would undo the privacy promise. We do not open unsolicited PDFs.",
  },
  {
    q: "What if Ledger says the PDF is a scan?",
    a: "A scan or a photo of paper has no text layer. PDF.js then sees an image, not “01 Jan  GROCERY  12.40”. v1 refuses instead of inventing rows. Re-download a digital statement from online banking. Optical character recognition is not silently enabled; a later opt-in would have to download a model after you press a scan button.",
  },
  {
    q: "Can I use this as my only tax record?",
    a: "No. Keep the original PDF from the bank. Ledger is a convenience table, not a filing, not advice, and not a substitute for the institution’s document. If a column mapped to Description that was really a cheque number, fix it before anyone else sees the sheet.",
  },
] as const;
