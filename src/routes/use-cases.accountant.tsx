import { createFileRoute, Link } from "@tanstack/react-router";
import { DocPage } from "@/components/DocPage";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/use-cases/accountant")({
  head: () => ({
    meta: [
      { title: "Send an Accountant a Spreadsheet, Not the Bank PDF | Ledger" },
      {
        name: "description",
        content:
          "Convert a digital statement to Excel on this device, remap columns, and send the sheet. Keep the original PDF. Ledger is not a filing.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE.origin}/use-cases/accountant` }],
  }),
  component: Accountant,
});

function Accountant() {
  return (
    <DocPage kicker="Use case" title="Give an accountant a table without forwarding the whole PDF">
      <p>
        Accountants often ask for “the statement”. What they can work with is usually a
        list of dates, payees and amounts they can filter. Forwarding the bank PDF also
        forwards letterhead, account numbers in the header, and every page of noise.
        Uploading that PDF to a free converter adds a third party. Ledger is for the
        case you want a sheet you produced yourself, on your machine, from the digital
        file the bank already issued.
      </p>
      <p>
        Drop the PDF, remap Date / Description / Debit / Credit / Balance, export Excel.
        The Notes sheet records the original filename so you can match it to the PDF you
        keep in the same folder. Send the .xlsx if that is what they asked for. Keep the
        PDF as the official document — Ledger is not a substitute for it and not a
        signature on a return.
      </p>
      <p>
        If the accountant needs an untouched PDF, send that instead and skip this tool.
        If they need a working table and you do not want the file sitting on a converter
        host, this is the job. Check totals before you attach the sheet to an email.
        Do not paste the live statement into a chat with us; we do not want it.
      </p>
      <p>
        Typical flow: download January from the bank as PDF, convert on this page,
        rename the xlsx to the client and the month, store the PDF next to it. If
        two accounts exist (current and savings), convert them separately so columns
        do not merge. Ignore fee-summary boxes at the end if they are not
        transactions — set those columns to Ignore. If a foreign-currency line
        printed two amounts, keep the one in the account currency and tell the
        accountant which it is. Ledger will not pick a FX rate for you.
      </p>
      <p>
        Self-employed people sometimes need a year of tables. Do not drop a 200-page
        annual scan. Export each quarter from online banking as a digital PDF, run
        Ledger four times, and concatenate in Excel. That is slower than a magic
        “all banks API”, and it does not require sharing credentials with us,
        because we never asked for credentials.
      </p>
      <p>
        When the sheet goes out, say in the email that it was produced locally from
        the bank PDF dated X, and attach the PDF if they still want the original.
        Two files: official document plus working table. That pairing is what
        “not a filing” means in practice.
      </p>
      <p>
        <Link to="/">Convert a statement</Link>
        {" · "}
        <Link to="/use-cases">All use cases</Link>
      </p>
    </DocPage>
  );
}
