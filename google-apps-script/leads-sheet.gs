// ============================================================
// Combo Studio Paint — Lead Capture to Google Sheets
// ============================================================
// DEPLOY: Extensions > Apps Script > Deploy > New deployment
//   Type: Web App
//   Execute as: Me (combostudiopaint@gmail.com)
//   Who has access: Anyone
// Then copy the deployment URL into Contact.tsx → SHEETS_URL
// ============================================================

const SHEET_NAME = "Leads";

const COLUMNS = [
  "Fecha",
  "Nombre",
  "Teléfono",
  "Email",
  "Tipo de proyecto",
  "Servicio",
  "Ubicación",
  "Mensaje",
  "Contactar por",
];

function doPost(e) {
  try {
    const sheet = getOrCreateSheet();
    const data = JSON.parse(e.postData.contents);

    const row = [
      formatDate(data.timestamp || new Date().toISOString()),
      data.name || "",
      data.phone || "",
      data.email || "",
      data.type || "",
      data.service || "",
      data.location || "",
      data.message || "",
      data.method || "",
    ];

    sheet.appendRow(row);
    autoFormatNewRow(sheet);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ── Helpers ──────────────────────────────────────────────────

function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    setupHeaders(sheet);
  } else if (sheet.getLastRow() === 0) {
    setupHeaders(sheet);
  }

  return sheet;
}

function setupHeaders(sheet) {
  sheet.appendRow(COLUMNS);

  const headerRange = sheet.getRange(1, 1, 1, COLUMNS.length);
  headerRange.setBackground("#1F1F1F");
  headerRange.setFontColor("#F4F0E8");
  headerRange.setFontWeight("bold");
  headerRange.setFontSize(10);

  sheet.setFrozenRows(1);
  sheet.setColumnWidth(1, 140);  // Fecha
  sheet.setColumnWidth(2, 160);  // Nombre
  sheet.setColumnWidth(3, 130);  // Teléfono
  sheet.setColumnWidth(4, 200);  // Email
  sheet.setColumnWidth(5, 130);  // Tipo
  sheet.setColumnWidth(6, 160);  // Servicio
  sheet.setColumnWidth(7, 150);  // Ubicación
  sheet.setColumnWidth(8, 300);  // Mensaje
  sheet.setColumnWidth(9, 120);  // Método
}

function autoFormatNewRow(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) return;

  const rowRange = sheet.getRange(lastRow, 1, 1, COLUMNS.length);
  const isEven = lastRow % 2 === 0;
  rowRange.setBackground(isEven ? "#F4F0E8" : "#FFFFFF");
  rowRange.setFontColor("#1F1F1F");
  rowRange.setFontSize(10);
  rowRange.setVerticalAlignment("middle");
}

function formatDate(isoString) {
  const d = new Date(isoString);
  return Utilities.formatDate(d, "America/New_York", "dd/MM/yyyy HH:mm");
}
