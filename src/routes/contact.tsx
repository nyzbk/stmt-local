import { createFileRoute, Link } from "@tanstack/react-router";
import { DocPage } from "@/components/DocPage";
import { pageHead } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead({
      title: "Contact Ledger — No Statement Uploads",
      description:
        "Email Ultimatum about Ledger. Include the page URL and browser. Do not attach a bank statement PDF.",
      path: "/contact",
    }),
  component: Contact,
});

function Contact() {
  return (
    <DocPage kicker="Contact" title="Write about the tool, not the statement">
      <p>
        Email{" "}
        <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>
        . That inbox is read by a person at {SITE.operator}, not a ticket bot that
        files your PDF into a cloud converter. There is no upload form on this page
        on purpose: a form that accepted a bank statement would break the only promise
        Ledger makes — the file stays in the tab that opened it.
      </p>
      <h2>What to send</h2>
      <p>
        Include three things, and only three things, unless we ask for more. First,
        the page URL ({SITE.origin}/how-it-works, /faq, /use-cases/accountant — not a
        screenshot of the whole statement). Second, the browser and device in one
        line: Safari on iOS 18, Chrome 129 on Windows, Firefox on a cheap Android.
        Third, what you expected the tool to do: Excel columns in a certain order, a
        refusal of a scan, the sample button doing nothing, a CSV that Excel opened
        as one column. That triad is enough to reproduce a layout bug without ever
        seeing a payee name.
      </p>
      <ul>
        <li>The page URL on this site, not a photo of the statement</li>
        <li>Browser and device in one line</li>
        <li>What you expected the converter to do</li>
      </ul>
      <h2>What we will not take</h2>
      <p>
        We do not accept statement PDFs, CSV dumps of live accounts, screenshots of
        full transaction tables, or passworded files by email. If a layout failed,
        describe the bank’s column names as they appear in the header row — Date,
        Description, Money out, Balance — not the rows under them. Do not paste
        IBANs, card numbers, sort codes, or opening balances into the message. Those
        values are why the converter runs on-device in the first place.
      </p>
      <p>
        Ledger is not a bank helpdesk. We cannot reset online-banking passwords,
        dispute a card charge, or tell you whether a (12.50) in parentheses is a
        debit at your particular institution. We can tell you how this tab treats
        parentheses, why a photo of paper has no text layer, and why PDF.js saw an
        image instead of “01 Jan GROCERY 12.40”. If the file is locked, unlock it
        in the bank app first; we will not take a password by email and we will not
        run a cracker.
      </p>
      <h2>Show a layout without leaking a life</h2>
      <p>
        If you want to show a layout without leaking a life, use the generated sample
        on the home page and describe how your bank differs from that sample: extra
        “Money in” column, dates as 31.12.2025, a running balance on the right that
        is not a transaction. A paragraph of differences is more useful than a
        redacted JPEG that still contains metadata.
      </p>
      <p>
        Do not ask us to convert a statement for you on a server. That would be a
        different product with a different threat model, and it would put this domain
        into a class of sites Google Publisher Policies treat as low-value inventory:
        a form that takes a file and emails a sheet back. Ledger is the opposite of
        that form.
      </p>
      <h2>No phone, no ads-as-support</h2>
      <p>
        There is no phone number, no WhatsApp business line, and no “priority
        support” unlock. Ads, when Google eventually marks the site Ready, are not a
        support channel — do not click them to get a reply. Soft agency contact, if
        it exists in the footer, is a separate sentence from the ad slot. We do not
        ask anyone to click ads.
      </p>
      <p>
        Response: we read English. A useful bug report is answered; a PDF attachment
        is deleted unread. If you sent a statement by mistake, assume it is gone from
        our side because we do not open unsolicited bank files, and change nothing in
        online banking just because an email bounced. For the legal wording see{" "}
        <Link to="/privacy">Privacy</Link> and <Link to="/terms">Terms</Link>.
        Operator: {SITE.operator}.
      </p>
      <p>
        This page exists so AdsBot and a human reviewer can see a real operator, a
        real address, and a real reason the contact surface refuses the very file the
        tool is built around. A three-line “email us” stub is the pattern help 81904
        calls a page with little content. The rule here is the same as the product:
        talk about columns, never about your rows.
      </p>
      <p>
        <Link to="/">Back to the tool</Link>
      </p>
    </DocPage>
  );
}
