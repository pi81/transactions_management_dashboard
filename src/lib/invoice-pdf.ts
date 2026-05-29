export function createInvoicePdf(transactionId: string): Blob {
  const lines = [
    "Invoice",
    `Transaction ID: ${transactionId}`,
    `Generated: ${new Date().toLocaleString()}`,
    "Thank you for your subscription.",
  ];

  return new Blob([createPdfDocument(lines)], { type: "application/pdf" });
}

function createPdfDocument(lines: string[]): string {
  const stream = [
    "BT",
    "/F1 18 Tf",
    "72 720 Td",
    `(${escapePdfText(lines[0])}) Tj`,
    "/F1 11 Tf",
    ...lines.slice(1).map((line) => `0 -24 Td (${escapePdfText(line)}) Tj`),
    "ET",
  ].join("\n");

  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
  ];

  const body = objects.map(
    (object, index) => `${index + 1} 0 obj\n${object}\nendobj\n`,
  );
  const header = "%PDF-1.4\n";
  const offsets: number[] = [];
  let cursor = header.length;

  for (const object of body) {
    offsets.push(cursor);
    cursor += object.length;
  }

  const xrefStart = cursor;
  const xref = [
    "xref",
    `0 ${objects.length + 1}`,
    "0000000000 65535 f ",
    ...offsets.map((offset) => `${String(offset).padStart(10, "0")} 00000 n `),
    "trailer",
    `<< /Size ${objects.length + 1} /Root 1 0 R >>`,
    "startxref",
    String(xrefStart),
    "%%EOF",
  ].join("\n");

  return `${header}${body.join("")}${xref}`;
}

function escapePdfText(value: string): string {
  return value
    .replaceAll("\\", "\\\\")
    .replaceAll("(", "\\(")
    .replaceAll(")", "\\)");
}
