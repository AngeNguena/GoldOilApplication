import React from 'react';
import Layout from '../components/Layout';
import { Link } from '@inertiajs/react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  :root {
    --ox: #6B1A1A;
    --ox-dark: #4A0F0F;
    --ox-light: #8B2E2E;
    --cream: #FAF7F2;
    --ink: #0E0C0B;
    --mid: #3A3330;
    --muted: #8C847C;
    --border: #E5DDD5;
    --gold: #C8922A;
  }

  .pw-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--ink);
    min-height: 100vh;
    padding: 40px 0;
  }
  .pw-container {
    max-width: 980px;
    margin: 0 auto;
    padding: 0 32px;
  }
  @media(max-width:640px){ .pw-container { padding: 0 20px; } }

  /* Action bar */
  .pw-actionbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
    flex-wrap: wrap;
    gap: 16px;
  }
  .pw-back-link {
    font-size: 13px;
    font-weight: 600;
    color: var(--mid);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: color .2s;
  }
  .pw-back-link:hover { color: var(--ox); }
  .pw-btn-row { display: flex; gap: 12px; }
  .pw-btn-print {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 22px;
    background: var(--ink);
    color: #fff;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.02em;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background .2s;
  }
  .pw-btn-print:hover { background: var(--ox-dark); }
  .pw-btn-download {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 22px;
    background: linear-gradient(135deg, var(--ox) 0%, var(--ox-dark) 100%);
    color: #fff;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.02em;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(107,26,26,0.3);
    transition: transform .2s, box-shadow .2s;
  }
  .pw-btn-download:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(107,26,26,0.4); }

  /* Invoice document */
  .pw-invoice {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 40px;
    box-shadow: 0 8px 28px rgba(0,0,0,0.05);
  }
  @media(max-width:640px){ .pw-invoice { padding: 22px; } }

  .pw-header-band {
    border: 3px solid var(--ox);
    border-radius: 10px;
    margin-bottom: 24px;
    overflow: hidden;
  }
  .pw-header-inner {
    background: linear-gradient(135deg, var(--ox) 0%, var(--ox-dark) 100%);
    padding: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 18px;
  }
  .pw-logo-box {
    background: #fff;
    border-radius: 8px;
    padding: 8px;
  }
  .pw-logo-placeholder {
    width: 60px;
    height: 60px;
    background: var(--ox);
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: 700;
    font-size: 12px;
    letter-spacing: 0.05em;
  }
  .pw-company-name {
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    font-weight: 700;
    color: var(--gold);
    text-align: center;
  }

  .pw-company-details {
    text-align: center;
    font-size: 11px;
    color: var(--mid);
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--border);
    line-height: 1.7;
  }
  .pw-company-details p:first-child { font-weight: 700; color: var(--ink); }

  .pw-date-row { margin-bottom: 24px; }
  .pw-date-row p { font-size: 13px; color: var(--mid); }
  .pw-invoice-number {
    text-align: center;
    font-family: 'Playfair Display', serif;
    font-size: 17px;
    font-weight: 700;
    color: var(--ink);
    margin-top: 14px;
  }

  .pw-client-block {
    margin-bottom: 24px;
    text-align: right;
    font-size: 13px;
    color: var(--mid);
    line-height: 1.7;
  }
  .pw-client-block p:first-child {
    font-weight: 700;
    color: var(--ink);
    font-size: 14px;
  }

  .pw-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 24px;
    font-size: 13px;
  }
  .pw-table th {
    background: var(--cream);
    border: 1px solid var(--border);
    padding: 10px 12px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-align: left;
    color: var(--mid);
  }
  .pw-table th.center { text-align: center; }
  .pw-table th.right { text-align: right; }
  .pw-table td {
    border: 1px solid var(--border);
    padding: 10px 12px;
    color: var(--mid);
  }
  .pw-table td.center { text-align: center; }
  .pw-table td.right { text-align: right; }
  .pw-table td.bold { font-weight: 700; color: var(--ink); }

  .pw-row-totalht td {
    background: var(--cream);
    font-weight: 700;
    color: var(--ink);
  }
  .pw-row-final td {
    background: rgba(107,26,26,0.08);
    font-weight: 700;
    color: var(--ox-dark);
  }

  .pw-amount-words {
    text-align: center;
    font-size: 12px;
    font-style: italic;
    color: var(--mid);
    margin-bottom: 24px;
  }
  .pw-amount-words span { font-weight: 700; color: var(--ink); font-style: normal; }

  .pw-terms {
    font-size: 13px;
    color: var(--mid);
    line-height: 1.8;
    margin-bottom: 24px;
  }
  .pw-terms p.title { font-weight: 700; color: var(--ink); }
  .pw-terms p.bank-name { font-weight: 700; color: var(--ink); margin-top: 12px; }

  .pw-footer {
    border-top: 2px solid var(--border);
    padding-top: 16px;
    text-align: center;
    font-size: 11px;
    color: var(--muted);
    line-height: 1.7;
  }
  .pw-footer p:first-child { font-weight: 700; color: var(--mid); }
`;

export default function ProformaView({ proforma, company_info }) {
  const formatFCFA = (amount) => {
    return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(Math.round(amount)) + ' FCFA';
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    try {
      const response = await fetch(`/inventory/proformas/download/${proforma.id}/`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Download failed");
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `Proforma_${proforma.proforma_number}.pdf`;

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(downloadUrl);

    } catch (error) {
      console.error("PDF Download Error:", error);
      alert("Unable to download PDF.");
    }
  };

  const totalHT = proforma.items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);
  const tva = totalHT * 0.1925;
  const pct = 0;
  const totalTTC = totalHT + tva + pct;

  return (
    <>
      {/* Print Styles - Must be OUTSIDE Layout */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          nav, aside, header, .no-print {
            display: none !important;
          }
          #invoice-content,
          #invoice-content * {
            visibility: visible;
          }
          #invoice-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 0;
          }
          #invoice-content {
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
          }
          @page {
            size: A4;
            margin: 0.5cm;
          }
          html, body {
            width: 210mm;
            height: 297mm;
            margin: 0;
            padding: 0;
          }
        }
      `}</style>

      <Layout>
        <style dangerouslySetInnerHTML={{ __html: styles }} />
        <div className="pw-root">
          <div className="pw-container">

            {/* Action Buttons */}
            <div className="pw-actionbar no-print">
              <Link href="/inventory/proformas/" className="pw-back-link">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to List
              </Link>
              <div className="pw-btn-row">
                <button onClick={handlePrint} className="pw-btn-print">
                  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Print
                </button>
                <button onClick={handleDownloadPDF} className="pw-btn-download">
                  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download PDF
                </button>
              </div>
            </div>

            {/* Invoice Document */}
            <div className="pw-invoice" id="invoice-content">

              {/* Header */}
              <div className="pw-header-band">
                <div className="pw-header-inner">
                  <div className="pw-logo-box">
                    <div className="pw-logo-placeholder">LOGO</div>
                  </div>
                  <h1 className="pw-company-name">GOLD OIL TRADING LTD</h1>
                </div>
              </div>

              {/* Company Details */}
              <div className="pw-company-details">
                <p>IMPORT & EXPORT - Vente en gros et en détails - Distribution - Vidange - Conseil</p>
                <p>Bonamoussadi Rond-point Maetur, Derrière la station OLA - Douala - Cameroun.</p>
                <p>Tel : (237)671516335/693805193</p>
                <p>Email : goldoiltradingltd@gmail.com</p>
                <p>RCCM : CM-DLA-02-2024-B12-00243 NUI : M042416661695E</p>
              </div>

              {/* Date and Invoice Number */}
              <div className="pw-date-row">
                <p>Douala le {new Date(proforma.created_at || Date.now()).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                <h2 className="pw-invoice-number">
                  FACTURE PROFORMA N° : {proforma.proforma_number}
                </h2>
              </div>

              {/* Client Information */}
              <div className="pw-client-block">
                <p>DOIT : {proforma.client_name}</p>
                <p>Adresse : {proforma.client_address || 'N/A'}</p>
                <p>BP : {proforma.client_bp || 'N/A'}</p>
                <p>NIU : {proforma.client_niu || 'N/A'}</p>
                <p>R.C.C.M. : {proforma.client_rccm || 'N/A'}</p>
                <p>Tel : {proforma.client_phone || 'N/A'}</p>
              </div>

              {/* Items Table */}
              <table className="pw-table">
                <thead>
                  <tr>
                    <th>N°</th>
                    <th>DESCRIPTION</th>
                    <th>REFERENCE</th>
                    <th className="center">QTE</th>
                    <th className="right">P. U(FCFA)</th>
                    <th className="right">P. T(FCFA)</th>
                  </tr>
                </thead>
                <tbody>
                  {proforma.items.map((item, index) => (
                    <tr key={index}>
                      <td className="center">{index + 1}</td>
                      <td>{item.product_name}</td>
                      <td>{item.product_reference}</td>
                      <td className="center">{item.quantity}</td>
                      <td className="right">{new Intl.NumberFormat('fr-FR').format(item.unit_price)}</td>
                      <td className="right bold">{new Intl.NumberFormat('fr-FR').format(item.quantity * item.unit_price)}</td>
                    </tr>
                  ))}

                  <tr className="pw-row-totalht">
                    <td colSpan={5} className="right bold">TOTAL HT</td>
                    <td className="right bold">{new Intl.NumberFormat('fr-FR').format(totalHT)}</td>
                  </tr>
                  <tr>
                    <td colSpan={4} className="right bold">TVA</td>
                    <td className="center">19,25%</td>
                    <td className="right bold">{new Intl.NumberFormat('fr-FR').format(tva)}</td>
                  </tr>
                  <tr>
                    <td colSpan={4} className="right bold">PCT</td>
                    <td className="center">2%</td>
                    <td className="right bold">{new Intl.NumberFormat('fr-FR').format(pct)}</td>
                  </tr>
                  <tr className="pw-row-final">
                    <td colSpan={5} className="right">TOTAL</td>
                    <td className="right">{new Intl.NumberFormat('fr-FR').format(totalTTC)}</td>
                  </tr>
                </tbody>
              </table>

              {/* Amount in Words */}
              <p className="pw-amount-words">
                Arrêté la présente proforma à la somme de : <span>{formatFCFA(totalTTC)}</span>
              </p>

              {/* Delivery and Payment Terms */}
              <div className="pw-terms">
                <p className="title">DELAI DE LIVRAISON : {proforma.delivery_time || '10 JOURS APRES LA RECEPTION DU BON DE COMMANDE'}</p>
                <p>Modalité de paiement par chèque ou virement bancaire.</p>
                <p className="bank-name">Banque: AFRICA GOLDEN BANK</p>
                <p>Intitule: GOLD OIL TRADING LIMITED COMPANY</p>
                <p>Numéro de compte : 10043 00101 37100049401 38</p>
              </div>

              {/* Footer */}
              <div className="pw-footer">
                <p>IMPORT & EXPORT - Vente en gros et en détails - Distribution - Vidange - Conseil</p>
                <p>Bonamoussadi Rond-point Maetur, Derrière la station OLA - Douala - Cameroun.</p>
                <p>Tel : (237)671516335/693805193</p>
                <p>Email : goldoiltradingltd@gmail.com</p>
                <p>RCCM : CM-DLA-02-2024-B12-00243 NUI : M042416661695E</p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}