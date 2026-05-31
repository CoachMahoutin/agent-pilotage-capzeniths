import React, { useState, useEffect } from 'react';

// ─── INJECT STYLES ────────────────────────────────────────────────────────────
function injectStyles() {
  if (document.getElementById('cz-pilotage-styles')) return;
  const style = document.createElement('style');
  style.id = 'cz-pilotage-styles';
  style.textContent = `
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --or: #F5A623;
      --lavande: #9B8ED4;
      --aubergine: #2D0A3E;
      --creme: #FFF8E8;
      --fond: #FAF8F5;
      --texte: #1A0A2E;
      --gris: #6B7280;
      --gris-clair: #E5E7EB;
      --vert: #10B981;
      --rouge: #EF4444;
      --bleu: #3B82F6;
      --orange: #F59E0B;
    }

    body {
      font-family: 'Outfit', sans-serif;
      background: var(--fond);
      color: var(--texte);
      min-height: 100vh;
    }

    /* ── NAVBAR ── */
    .navbar {
      background: var(--creme);
      border-bottom: 2px solid var(--or);
      padding: 0 24px;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .navbar-logo { display: flex; align-items: center; gap: 10px; }
    .navbar-title { font-family: 'DM Serif Display', serif; font-size: 1.1rem; color: var(--aubergine); }
    .navbar-subtitle { font-size: 0.7rem; font-weight: 500; color: var(--gris); letter-spacing: 0.05em; text-transform: uppercase; }
    .navbar-badge { background: var(--or); color: var(--aubergine); font-size: 0.65rem; font-weight: 700; padding: 3px 8px; border-radius: 20px; letter-spacing: 0.05em; text-transform: uppercase; }

    /* ── HERO ── */
    .hero {
      background: linear-gradient(135deg, var(--aubergine) 0%, #1A0652 100%);
      padding: 40px 24px 36px;
      text-align: center;
    }
    .hero-tag { display: inline-block; background: rgba(245,166,35,0.15); border: 1px solid rgba(245,166,35,0.4); color: var(--or); font-size: 0.7rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; padding: 4px 14px; border-radius: 20px; margin-bottom: 14px; }
    .hero h1 { font-family: 'DM Serif Display', serif; font-size: clamp(1.6rem, 4vw, 2.2rem); color: #fff; line-height: 1.2; margin-bottom: 8px; }
    .hero h1 span { font-style: italic; color: var(--or); }
    .hero p { color: rgba(255,255,255,0.7); font-size: 0.88rem; max-width: 480px; margin: 0 auto; line-height: 1.6; }

    /* ── MOIS SELECTOR ── */
    .mois-bar {
      background: var(--creme);
      border-bottom: 1px solid var(--gris-clair);
      padding: 12px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
    }
    .mois-label { font-size: 0.78rem; font-weight: 700; color: var(--aubergine); text-transform: uppercase; letter-spacing: 0.05em; }
    .mois-controls { display: flex; align-items: center; gap: 8px; }
    .mois-btn { background: none; border: 1.5px solid var(--gris-clair); border-radius: 6px; padding: 5px 10px; font-size: 0.82rem; font-weight: 600; color: var(--aubergine); cursor: pointer; transition: all 0.15s; font-family: 'Outfit', sans-serif; }
    .mois-btn:hover { border-color: var(--or); }
    .mois-current { font-size: 0.9rem; font-weight: 700; color: var(--aubergine); min-width: 130px; text-align: center; }
    .btn-bilan { background: var(--or); border: none; border-radius: 8px; padding: 7px 16px; font-size: 0.78rem; font-weight: 700; color: var(--aubergine); cursor: pointer; font-family: 'Outfit', sans-serif; transition: all 0.2s; display: flex; align-items: center; gap: 6px; }
    .btn-bilan:hover { background: #e8960a; }

    /* ── TABS ── */
    .tabs-wrapper { background: var(--creme); border-bottom: 1px solid var(--gris-clair); overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
    .tabs-wrapper::-webkit-scrollbar { display: none; }
    .tabs { display: flex; min-width: max-content; padding: 0 16px; }
    .tab { display: flex; align-items: center; gap: 7px; padding: 14px 18px; font-size: 0.82rem; font-weight: 600; color: var(--gris); cursor: pointer; border-bottom: 3px solid transparent; white-space: nowrap; transition: all 0.2s; background: none; border-top: none; border-left: none; border-right: none; font-family: 'Outfit', sans-serif; }
    .tab:hover { color: var(--aubergine); }
    .tab.active { color: var(--aubergine); border-bottom-color: var(--or); }

    /* ── MAIN ── */
    .main { max-width: 960px; margin: 0 auto; padding: 28px 16px 64px; }

    /* ── KPI GRID ── */
    .kpi-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 14px; margin-bottom: 28px; }
    .kpi-card { background: #fff; border: 1.5px solid var(--gris-clair); border-radius: 12px; padding: 18px 16px; position: relative; overflow: hidden; }
    .kpi-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: var(--or); }
    .kpi-card.vert::before { background: var(--vert); }
    .kpi-card.lavande::before { background: var(--lavande); }
    .kpi-card.bleu::before { background: var(--bleu); }
    .kpi-card.rouge::before { background: var(--rouge); }
    .kpi-icon { font-size: 1.4rem; margin-bottom: 8px; }
    .kpi-value { font-family: 'DM Serif Display', serif; font-size: 1.8rem; color: var(--aubergine); line-height: 1; margin-bottom: 4px; }
    .kpi-label { font-size: 0.75rem; font-weight: 600; color: var(--gris); text-transform: uppercase; letter-spacing: 0.04em; }
    .kpi-delta { font-size: 0.72rem; font-weight: 600; margin-top: 6px; }
    .kpi-delta.up { color: var(--vert); }
    .kpi-delta.down { color: var(--rouge); }
    .kpi-delta.neutral { color: var(--gris); }

    /* ── SECTION ── */
    .section-title { font-family: 'DM Serif Display', serif; font-size: 1.15rem; color: var(--aubergine); margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
    .section-title::after { content: ''; flex: 1; height: 1px; background: var(--gris-clair); }

    /* ── FORM ELEMENTS ── */
    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }
    @media (max-width: 560px) { .form-grid { grid-template-columns: 1fr; } }
    .form-grid.col3 { grid-template-columns: 1fr 1fr 1fr; }
    @media (max-width: 700px) { .form-grid.col3 { grid-template-columns: 1fr 1fr; } }
    .field { display: flex; flex-direction: column; gap: 6px; }
    .field label { font-size: 0.78rem; font-weight: 600; color: var(--aubergine); letter-spacing: 0.03em; text-transform: uppercase; }
    .field select, .field input, .field textarea {
      font-family: 'Outfit', sans-serif; font-size: 0.88rem; padding: 10px 12px;
      border: 1.5px solid var(--gris-clair); border-radius: 8px; background: #fff;
      color: var(--texte); transition: border-color 0.2s; outline: none; width: 100%;
    }
    .field select:focus, .field input:focus, .field textarea:focus { border-color: var(--or); }
    .field textarea { resize: vertical; min-height: 80px; }

    /* ── BUTTONS ── */
    .btn-primary { background: linear-gradient(135deg, var(--or), #E8960A); color: var(--aubergine); font-family: 'Outfit', sans-serif; font-size: 0.88rem; font-weight: 700; padding: 11px 20px; border: none; border-radius: 8px; cursor: pointer; transition: all 0.2s; display: inline-flex; align-items: center; gap: 7px; }
    .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 4px 14px rgba(245,166,35,0.3); }
    .btn-secondary { background: #fff; color: var(--aubergine); font-family: 'Outfit', sans-serif; font-size: 0.83rem; font-weight: 600; padding: 9px 16px; border: 1.5px solid var(--gris-clair); border-radius: 8px; cursor: pointer; transition: all 0.15s; display: inline-flex; align-items: center; gap: 6px; }
    .btn-secondary:hover { border-color: var(--or); }
    .btn-danger { background: rgba(239,68,68,0.08); color: var(--rouge); font-family: 'Outfit', sans-serif; font-size: 0.78rem; font-weight: 600; padding: 6px 12px; border: 1px solid rgba(239,68,68,0.2); border-radius: 6px; cursor: pointer; transition: all 0.15s; }
    .btn-danger:hover { background: rgba(239,68,68,0.15); }

    /* ── TABLE ── */
    .data-table { width: 100%; border-collapse: collapse; background: #fff; border-radius: 12px; overflow: hidden; border: 1.5px solid var(--gris-clair); margin-bottom: 20px; }
    .data-table th { background: var(--aubergine); color: #fff; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; padding: 11px 14px; text-align: left; }
    .data-table td { padding: 11px 14px; font-size: 0.85rem; border-bottom: 1px solid var(--gris-clair); vertical-align: middle; }
    .data-table tr:last-child td { border-bottom: none; }
    .data-table tr:hover td { background: var(--fond); }
    .data-table .actions { display: flex; gap: 6px; }

    /* ── STATUS BADGES ── */
    .badge { display: inline-block; font-size: 0.68rem; font-weight: 700; padding: 3px 8px; border-radius: 20px; letter-spacing: 0.04em; text-transform: uppercase; }
    .badge.actif { background: rgba(16,185,129,0.1); color: var(--vert); }
    .badge.termine { background: rgba(107,114,128,0.1); color: var(--gris); }
    .badge.pause { background: rgba(245,158,11,0.1); color: var(--orange); }
    .badge.prospect { background: rgba(59,130,246,0.1); color: var(--bleu); }
    .badge.converti { background: rgba(155,142,212,0.1); color: var(--lavande); }

    /* ── PILIERS BARS ── */
    .piliers-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
    @media (max-width: 560px) { .piliers-grid { grid-template-columns: 1fr; } }
    .pilier-row { display: flex; align-items: center; gap: 10px; }
    .pilier-name { font-size: 0.78rem; font-weight: 600; color: var(--aubergine); min-width: 80px; }
    .pilier-bar-bg { flex: 1; height: 8px; background: var(--gris-clair); border-radius: 4px; overflow: hidden; }
    .pilier-bar-fill { height: 100%; border-radius: 4px; background: var(--or); transition: width 0.4s ease; }
    .pilier-bar-fill.low { background: var(--rouge); }
    .pilier-bar-fill.mid { background: var(--orange); }
    .pilier-bar-fill.high { background: var(--vert); }
    .pilier-score { font-size: 0.75rem; font-weight: 700; color: var(--aubergine); min-width: 28px; text-align: right; }

    /* ── CARD ── */
    .card { background: #fff; border: 1.5px solid var(--gris-clair); border-radius: 12px; padding: 20px; margin-bottom: 16px; }
    .card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; flex-wrap: wrap; gap: 8px; }
    .card-title { font-family: 'DM Serif Display', serif; font-size: 1rem; color: var(--aubergine); }

    /* ── BILAN IA ── */
    .bilan-box { background: linear-gradient(135deg, var(--aubergine), #4A1A6E); border-radius: 12px; padding: 24px; color: #fff; margin-top: 24px; }
    .bilan-box h3 { font-family: 'DM Serif Display', serif; font-size: 1.1rem; margin-bottom: 16px; }
    .bilan-content { font-size: 0.87rem; line-height: 1.8; white-space: pre-wrap; }
    .bilan-section { margin-bottom: 14px; }
    .bilan-section-title { font-size: 0.7rem; font-weight: 700; color: var(--or); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 6px; }

    /* ── IMPORT ── */
    .import-zone { border: 2px dashed var(--gris-clair); border-radius: 12px; padding: 32px; text-align: center; cursor: pointer; transition: all 0.2s; background: #fff; }
    .import-zone:hover, .import-zone.dragover { border-color: var(--or); background: rgba(245,166,35,0.04); }
    .import-zone p { font-size: 0.85rem; color: var(--gris); margin-top: 8px; }
    .import-zone strong { color: var(--aubergine); }

    /* ── PROGRESS RING ── */
    .progress-ring { position: relative; display: inline-flex; align-items: center; justify-content: center; }
    .progress-ring svg { transform: rotate(-90deg); }
    .progress-ring-text { position: absolute; font-family: 'DM Serif Display', serif; font-size: 1.1rem; color: var(--aubergine); }

    /* ── EMPTY STATE ── */
    .empty-state { text-align: center; padding: 48px 24px; color: var(--gris); }
    .empty-state .empty-icon { font-size: 2.5rem; margin-bottom: 12px; }
    .empty-state p { font-size: 0.88rem; line-height: 1.6; }

    /* ── LOADING ── */
    .loading-box { background: #fff; border: 1.5px solid var(--gris-clair); border-radius: 12px; padding: 32px; text-align: center; margin-top: 20px; }
    .spinner { width: 32px; height: 32px; border: 3px solid var(--gris-clair); border-top-color: var(--or); border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 14px; }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* ── MODAL ── */
    .modal-overlay { position: fixed; inset: 0; background: rgba(45,10,62,0.5); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 16px; }
    .modal { background: #fff; border-radius: 14px; padding: 28px; width: 100%; max-width: 520px; max-height: 90vh; overflow-y: auto; }
    .modal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
    .modal-title { font-family: 'DM Serif Display', serif; font-size: 1.15rem; color: var(--aubergine); }
    .modal-close { background: none; border: none; font-size: 1.3rem; cursor: pointer; color: var(--gris); padding: 4px; }
    .modal-footer { display: flex; gap: 10px; justify-content: flex-end; margin-top: 20px; }

    /* ── TOAST ── */
    .toast { position: fixed; bottom: 24px; right: 24px; background: var(--aubergine); color: #fff; padding: 10px 18px; border-radius: 8px; font-size: 0.82rem; font-weight: 600; z-index: 999; animation: slideUp 0.25s ease; box-shadow: 0 4px 16px rgba(45,10,62,0.3); }
    @keyframes slideUp { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

    /* ── ERROR ── */
    .error-box { background: rgba(239,68,68,0.05); border: 1px solid rgba(239,68,68,0.2); border-radius: 10px; padding: 14px; margin-top: 16px; font-size: 0.85rem; color: var(--rouge); }

    /* ── FOOTER ── */
    .footer { text-align: center; padding: 20px; font-size: 0.72rem; color: var(--gris); }
    .footer span { color: var(--or); font-weight: 600; }

    /* ── RESPONSIVE ── */
    @media (max-width: 480px) {
      .navbar { padding: 0 14px; height: 56px; }
      .navbar-subtitle { display: none; }
      .hero { padding: 28px 14px 24px; }
      .hero h1 { font-size: 1.4rem; }
      .mois-bar { padding: 10px 14px; }
      .main { padding: 16px 12px 48px; }
      .kpi-grid { grid-template-columns: 1fr 1fr; gap: 10px; }
      .kpi-value { font-size: 1.5rem; }
      .tab { padding: 11px 12px; font-size: 0.76rem; }
      .data-table { font-size: 0.78rem; }
      .data-table th, .data-table td { padding: 8px 10px; }
      .modal { padding: 20px; }
    }
  `;
  document.head.appendChild(style);
}

// ─── STORAGE HELPERS ─────────────────────────────────────────────────────────

const STORAGE_KEY = 'cz-pilotage-data';

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return getDefaultData();
}

function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

function getDefaultData() {
  return {
    clients: [],
    diagnostics: [],
    contenu: [],
  };
}

// ─── UTILS ───────────────────────────────────────────────────────────────────

const MOIS_NOMS = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];

function getMoisLabel(y, m) { return `${MOIS_NOMS[m]} ${y}`; }

function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2,6); }

const PILIERS = ['Cash','Stratégie','Clients','Équipe','Risques','Croissance','Résilience'];

const STATUTS_CLIENT = ['prospect','actif','pause','terminé','converti'];
const STATUTS_DIAG = ['planifié','réalisé','rapport envoyé','converti'];
const TYPES_CONTENU = ['Post LinkedIn','Newsletter','Article blog','Script vidéo','Autre'];
const CANAUX_CONTENU = ['LinkedIn','Email','Blog','YouTube','Autre'];

// ─── API CALL ────────────────────────────────────────────────────────────────

async function callAPI(systemPrompt, userPrompt) {
  const res = await fetch('/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }]
    })
  });
  if (!res.ok) throw new Error(`Erreur API: ${res.status}`);
  const data = await res.json();
  const text = data.content?.[0]?.text || data.content?.map?.(b => b.text || '').join('') || '';
  return JSON.parse(text.replace(/```json|```/g, '').trim());
}

// ─── PILIER BARS ─────────────────────────────────────────────────────────────

function PilierBars({ scores }) {
  return (
    <div className="piliers-grid">
      {PILIERS.map(p => {
        const val = scores?.[p] || 0;
        const cls = val < 4 ? 'low' : val < 7 ? 'mid' : 'high';
        return (
          <div key={p} className="pilier-row">
            <span className="pilier-name">{p}</span>
            <div className="pilier-bar-bg">
              <div className={`pilier-bar-fill ${cls}`} style={{ width: `${val * 10}%` }} />
            </div>
            <span className="pilier-score">{val}/10</span>
          </div>
        );
      })}
    </div>
  );
}

// ─── MODULE DASHBOARD ────────────────────────────────────────────────────────

function ModuleDashboard({ data, moisIdx, annee, onBilan, bilanLoading, bilanResult, bilanError }) {
  const moisStr = `${annee}-${String(moisIdx + 1).padStart(2, '0')}`;

  const clientsActifs = data.clients.filter(c => c.statut === 'actif').length;
  const clientsTotal = data.clients.length;
  const revenuMois = data.clients
    .filter(c => c.statut === 'actif' && c.moisDebut?.startsWith(annee.toString()))
    .reduce((s, c) => s + (parseFloat(c.tarif) || 0), 0);
  const diagMois = data.diagnostics.filter(d => d.date?.startsWith(moisStr)).length;
  const diagTotal = data.diagnostics.length;
  const diagConvertis = data.diagnostics.filter(d => d.statut === 'converti').length;
  const tauxConversion = diagTotal > 0 ? Math.round((diagConvertis / diagTotal) * 100) : 0;
  const contenuMois = data.contenu.filter(c => c.date?.startsWith(moisStr)).length;
  const contenuTotal = data.contenu.length;

  const kpis = [
    { icon: '👥', value: clientsActifs, label: 'Clients actifs', delta: `${clientsTotal} au total`, color: 'vert' },
    { icon: '💶', value: `${revenuMois.toLocaleString('fr')} €`, label: 'CA estimé / mois', delta: 'clients actifs', color: '' },
    { icon: '🔍', value: diagMois, label: 'Diagnostics ce mois', delta: `${diagTotal} au total`, color: 'lavande' },
    { icon: '🎯', value: `${tauxConversion}%`, label: 'Taux de conversion', delta: `${diagConvertis} convertis`, color: tauxConversion >= 30 ? 'vert' : 'rouge' },
    { icon: '✍️', value: contenuMois, label: 'Contenus ce mois', delta: `${contenuTotal} au total`, color: 'bleu' },
    { icon: '📊', value: data.clients.filter(c => c.statut === 'prospect').length, label: 'Prospects en cours', delta: 'à relancer', color: '' },
  ];

  // Scores piliers moyens sur tous les diagnostics
  const avgScores = {};
  PILIERS.forEach(p => {
    const vals = data.diagnostics.map(d => parseFloat(d.scores?.[p]) || 0).filter(v => v > 0);
    avgScores[p] = vals.length > 0 ? Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10 : 0;
  });

  return (
    <div>
      <div className="kpi-grid">
        {kpis.map((k, i) => (
          <div key={i} className={`kpi-card ${k.color}`}>
            <div className="kpi-icon">{k.icon}</div>
            <div className="kpi-value">{k.value}</div>
            <div className="kpi-label">{k.label}</div>
            <div className="kpi-delta neutral">{k.delta}</div>
          </div>
        ))}
      </div>

      {data.diagnostics.length > 0 && (
        <div className="card" style={{ marginBottom: 20 }}>
          <div className="card-header">
            <div className="card-title">📊 Scores piliers moyens (tous diagnostics)</div>
          </div>
          <PilierBars scores={avgScores} />
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
        <button className="btn-bilan" onClick={onBilan} disabled={bilanLoading}>
          {bilanLoading ? '⏳ Analyse...' : '🤖 Générer le bilan IA du mois'}
        </button>
      </div>

      {bilanLoading && (
        <div className="loading-box">
          <div className="spinner"></div>
          <p>Analyse de tes données en cours...</p>
        </div>
      )}

      {bilanError && <div className="error-box">❌ {bilanError}</div>}

      {bilanResult && (
        <div className="bilan-box">
          <h3>🤖 Bilan IA — {getMoisLabel(annee, moisIdx)}</h3>
          {bilanResult.sections?.map((s, i) => (
            <div key={i} className="bilan-section">
              <div className="bilan-section-title">{s.titre}</div>
              <div className="bilan-content">{s.contenu}</div>
            </div>
          ))}
          {bilanResult.alerte && (
            <div style={{ marginTop: 14, background: 'rgba(239,68,68,0.15)', borderRadius: 8, padding: '10px 14px', fontSize: '0.85rem' }}>
              ⚠️ <strong>Alerte :</strong> {bilanResult.alerte}
            </div>
          )}
          {bilanResult.action_prioritaire && (
            <div style={{ marginTop: 10, background: 'rgba(245,166,35,0.2)', borderRadius: 8, padding: '10px 14px', fontSize: '0.85rem' }}>
              🎯 <strong>Action prioritaire :</strong> {bilanResult.action_prioritaire}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── MODULE CLIENTS ───────────────────────────────────────────────────────────

function ModuleClients({ data, setData, onToast }) {
  const [showModal, setShowModal] = useState(false);
  const [editClient, setEditClient] = useState(null);
  const [form, setForm] = useState({});

  function openNew() {
    setForm({ nom: '', secteur: '', statut: 'prospect', tarif: '', moisDebut: '', notes: '' });
    setEditClient(null);
    setShowModal(true);
  }

  function openEdit(c) {
    setForm({ ...c });
    setEditClient(c.id);
    setShowModal(true);
  }

  function save() {
    if (!form.nom) return;
    let clients;
    if (editClient) {
      clients = data.clients.map(c => c.id === editClient ? { ...form, id: editClient } : c);
    } else {
      clients = [...data.clients, { ...form, id: uid() }];
    }
    const nd = { ...data, clients };
    setData(nd);
    saveData(nd);
    setShowModal(false);
    onToast(editClient ? 'Client modifié ✓' : 'Client ajouté ✓');
  }

  function remove(id) {
    const nd = { ...data, clients: data.clients.filter(c => c.id !== id) };
    setData(nd);
    saveData(nd);
    onToast('Client supprimé');
  }

  function handleImport(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const lines = ev.target.result.split('\n').filter(Boolean);
        const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
        const imported = lines.slice(1).map(line => {
          const vals = line.split(',');
          const obj = { id: uid() };
          headers.forEach((h, i) => { obj[h] = vals[i]?.trim() || ''; });
          if (!obj.statut) obj.statut = 'prospect';
          return obj;
        }).filter(o => o.nom);
        const nd = { ...data, clients: [...data.clients, ...imported] };
        setData(nd);
        saveData(nd);
        onToast(`${imported.length} client(s) importé(s) ✓`);
      } catch {
        onToast('Erreur import CSV');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  const f = (k, v) => setForm(p => ({ ...p, [k]: v }));

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
        <div className="section-title" style={{ margin: 0, flex: 1 }}>👥 Clients & Prospects</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <label className="btn-secondary" style={{ cursor: 'pointer' }}>
            📥 Import CSV
            <input type="file" accept=".csv" style={{ display: 'none' }} onChange={handleImport} />
          </label>
          <button className="btn-primary" onClick={openNew}>+ Ajouter</button>
        </div>
      </div>

      {data.clients.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">👥</div>
          <p>Aucun client pour l'instant.<br />Ajoute ton premier client ou importe un CSV.</p>
          <div style={{ marginTop: 12, fontSize: '0.75rem', color: 'var(--gris)' }}>Format CSV : nom, secteur, statut, tarif, moisDebut, notes</div>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Secteur</th>
                <th>Statut</th>
                <th>Tarif/mois</th>
                <th>Début</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.clients.map(c => (
                <tr key={c.id}>
                  <td><strong>{c.nom}</strong></td>
                  <td>{c.secteur || '—'}</td>
                  <td><span className={`badge ${c.statut}`}>{c.statut}</span></td>
                  <td>{c.tarif ? `${c.tarif} €` : '—'}</td>
                  <td>{c.moisDebut || '—'}</td>
                  <td>
                    <div className="actions">
                      <button className="btn-secondary" style={{ padding: '4px 10px', fontSize: '0.72rem' }} onClick={() => openEdit(c)}>✏️</button>
                      <button className="btn-danger" onClick={() => remove(c.id)}>🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">{editClient ? 'Modifier le client' : 'Nouveau client'}</div>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="form-grid">
              <div className="field">
                <label>Nom *</label>
                <input value={form.nom || ''} onChange={e => f('nom', e.target.value)} placeholder="Nom ou entreprise" />
              </div>
              <div className="field">
                <label>Secteur</label>
                <input value={form.secteur || ''} onChange={e => f('secteur', e.target.value)} placeholder="ex: BTP, Retail..." />
              </div>
              <div className="field">
                <label>Statut</label>
                <select value={form.statut || 'prospect'} onChange={e => f('statut', e.target.value)}>
                  {STATUTS_CLIENT.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="field">
                <label>Tarif mensuel (€)</label>
                <input type="number" value={form.tarif || ''} onChange={e => f('tarif', e.target.value)} placeholder="ex: 500" />
              </div>
              <div className="field">
                <label>Mois de début</label>
                <input type="month" value={form.moisDebut || ''} onChange={e => f('moisDebut', e.target.value)} />
              </div>
            </div>
            <div className="field">
              <label>Notes</label>
              <textarea value={form.notes || ''} onChange={e => f('notes', e.target.value)} placeholder="Contexte, besoins, points clés..." />
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowModal(false)}>Annuler</button>
              <button className="btn-primary" onClick={save} disabled={!form.nom}>Enregistrer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── MODULE DIAGNOSTICS ───────────────────────────────────────────────────────

function ModuleDiagnostics({ data, setData, onToast }) {
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({});
  const [scores, setScores] = useState({});

  function openNew() {
    const s = {}; PILIERS.forEach(p => s[p] = 5);
    setForm({ nom: '', secteur: '', date: new Date().toISOString().slice(0, 10), statut: 'réalisé', notes: '' });
    setScores(s);
    setEditId(null);
    setShowModal(true);
  }

  function openEdit(d) {
    setForm({ ...d });
    setScores(d.scores || {});
    setEditId(d.id);
    setShowModal(true);
  }

  function save() {
    if (!form.nom) return;
    const entry = { ...form, scores, id: editId || uid() };
    let diags;
    if (editId) {
      diags = data.diagnostics.map(d => d.id === editId ? entry : d);
    } else {
      diags = [...data.diagnostics, entry];
    }
    const nd = { ...data, diagnostics: diags };
    setData(nd);
    saveData(nd);
    setShowModal(false);
    onToast(editId ? 'Diagnostic modifié ✓' : 'Diagnostic ajouté ✓');
  }

  function remove(id) {
    const nd = { ...data, diagnostics: data.diagnostics.filter(d => d.id !== id) };
    setData(nd);
    saveData(nd);
    onToast('Supprimé');
  }

  function handleImport(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const lines = ev.target.result.split('\n').filter(Boolean);
        const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
        const imported = lines.slice(1).map(line => {
          const vals = line.split(',');
          const obj = { id: uid(), scores: {} };
          headers.forEach((h, i) => {
            if (PILIERS.map(p => p.toLowerCase()).includes(h)) {
              obj.scores[PILIERS.find(p => p.toLowerCase() === h)] = parseFloat(vals[i]) || 5;
            } else {
              obj[h] = vals[i]?.trim() || '';
            }
          });
          if (!obj.statut) obj.statut = 'réalisé';
          return obj;
        }).filter(o => o.nom);
        const nd = { ...data, diagnostics: [...data.diagnostics, ...imported] };
        setData(nd);
        saveData(nd);
        onToast(`${imported.length} diagnostic(s) importé(s) ✓`);
      } catch { onToast('Erreur import'); }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  const f = (k, v) => setForm(p => ({ ...p, [k]: v }));

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
        <div className="section-title" style={{ margin: 0, flex: 1 }}>🔍 Diagnostics réalisés</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <label className="btn-secondary" style={{ cursor: 'pointer' }}>
            📥 Import CSV
            <input type="file" accept=".csv" style={{ display: 'none' }} onChange={handleImport} />
          </label>
          <button className="btn-primary" onClick={openNew}>+ Ajouter</button>
        </div>
      </div>

      {data.diagnostics.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <p>Aucun diagnostic enregistré.<br />Format CSV : nom, secteur, date, statut, cash, stratégie, clients, équipe, risques, croissance, résilience</p>
        </div>
      ) : (
        <>
          <div style={{ overflowX: 'auto', marginBottom: 24 }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Prospect/Client</th>
                  <th>Secteur</th>
                  <th>Date</th>
                  <th>Statut</th>
                  <th>Score moy.</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.diagnostics.map(d => {
                  const vals = PILIERS.map(p => parseFloat(d.scores?.[p]) || 0);
                  const avg = vals.length ? Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10 : 0;
                  return (
                    <tr key={d.id}>
                      <td><strong>{d.nom}</strong></td>
                      <td>{d.secteur || '—'}</td>
                      <td>{d.date || '—'}</td>
                      <td><span className={`badge ${d.statut === 'converti' ? 'converti' : d.statut === 'réalisé' ? 'actif' : 'prospect'}`}>{d.statut}</span></td>
                      <td><strong style={{ color: avg >= 7 ? 'var(--vert)' : avg >= 4 ? 'var(--orange)' : 'var(--rouge)' }}>{avg}/10</strong></td>
                      <td>
                        <div className="actions">
                          <button className="btn-secondary" style={{ padding: '4px 10px', fontSize: '0.72rem' }} onClick={() => openEdit(d)}>✏️</button>
                          <button className="btn-danger" onClick={() => remove(d.id)}>🗑️</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {data.diagnostics.length > 1 && (
            <div className="card">
              <div className="card-header"><div className="card-title">📊 Scores piliers — moyenne globale</div></div>
              <PilierBars scores={(() => {
                const avg = {};
                PILIERS.forEach(p => {
                  const vals = data.diagnostics.map(d => parseFloat(d.scores?.[p]) || 0).filter(v => v > 0);
                  avg[p] = vals.length ? Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10 : 0;
                });
                return avg;
              })()} />
            </div>
          )}
        </>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">{editId ? 'Modifier' : 'Nouveau diagnostic'}</div>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="form-grid">
              <div className="field">
                <label>Nom *</label>
                <input value={form.nom || ''} onChange={e => f('nom', e.target.value)} placeholder="Nom ou entreprise" />
              </div>
              <div className="field">
                <label>Secteur</label>
                <input value={form.secteur || ''} onChange={e => f('secteur', e.target.value)} />
              </div>
              <div className="field">
                <label>Date</label>
                <input type="date" value={form.date || ''} onChange={e => f('date', e.target.value)} />
              </div>
              <div className="field">
                <label>Statut</label>
                <select value={form.statut || 'réalisé'} onChange={e => f('statut', e.target.value)}>
                  {STATUTS_DIAG.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--aubergine)', textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: 10 }}>Scores 7 piliers (/10)</label>
              {PILIERS.map(p => (
                <div key={p} className="pilier-row" style={{ marginBottom: 8 }}>
                  <span className="pilier-name">{p}</span>
                  <input
                    type="range" min="0" max="10" step="0.5"
                    value={scores[p] || 5}
                    onChange={e => setScores(s => ({ ...s, [p]: parseFloat(e.target.value) }))}
                    style={{ flex: 1, accentColor: 'var(--or)' }}
                  />
                  <span className="pilier-score">{scores[p] || 5}/10</span>
                </div>
              ))}
            </div>
            <div className="field">
              <label>Notes</label>
              <textarea value={form.notes || ''} onChange={e => f('notes', e.target.value)} placeholder="Observations clés..." />
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowModal(false)}>Annuler</button>
              <button className="btn-primary" onClick={save} disabled={!form.nom}>Enregistrer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── MODULE CONTENU ───────────────────────────────────────────────────────────

function ModuleContenu({ data, setData, onToast }) {
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({});

  function openNew() {
    setForm({ titre: '', type: 'Post LinkedIn', canal: 'LinkedIn', date: new Date().toISOString().slice(0, 10), likes: '', commentaires: '', clics: '', pilier: '', notes: '' });
    setEditId(null);
    setShowModal(true);
  }

  function openEdit(c) { setForm({ ...c }); setEditId(c.id); setShowModal(true); }

  function save() {
    if (!form.titre) return;
    const entry = { ...form, id: editId || uid() };
    let contenu;
    if (editId) {
      contenu = data.contenu.map(c => c.id === editId ? entry : c);
    } else {
      contenu = [...data.contenu, entry];
    }
    const nd = { ...data, contenu };
    setData(nd);
    saveData(nd);
    setShowModal(false);
    onToast(editId ? 'Modifié ✓' : 'Contenu ajouté ✓');
  }

  function remove(id) {
    const nd = { ...data, contenu: data.contenu.filter(c => c.id !== id) };
    setData(nd);
    saveData(nd);
    onToast('Supprimé');
  }

  function handleImport(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const lines = ev.target.result.split('\n').filter(Boolean);
        const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
        const imported = lines.slice(1).map(line => {
          const vals = line.split(',');
          const obj = { id: uid() };
          headers.forEach((h, i) => { obj[h] = vals[i]?.trim() || ''; });
          return obj;
        }).filter(o => o.titre);
        const nd = { ...data, contenu: [...data.contenu, ...imported] };
        setData(nd);
        saveData(nd);
        onToast(`${imported.length} contenu(s) importé(s) ✓`);
      } catch { onToast('Erreur import'); }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  const totalLikes = data.contenu.reduce((s, c) => s + (parseInt(c.likes) || 0), 0);
  const totalComm = data.contenu.reduce((s, c) => s + (parseInt(c.commentaires) || 0), 0);
  const totalClics = data.contenu.reduce((s, c) => s + (parseInt(c.clics) || 0), 0);
  const f = (k, v) => setForm(p => ({ ...p, [k]: v }));

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
        <div className="section-title" style={{ margin: 0, flex: 1 }}>✍️ Suivi contenu</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <label className="btn-secondary" style={{ cursor: 'pointer' }}>
            📥 Import CSV
            <input type="file" accept=".csv" style={{ display: 'none' }} onChange={handleImport} />
          </label>
          <button className="btn-primary" onClick={openNew}>+ Ajouter</button>
        </div>
      </div>

      {data.contenu.length > 0 && (
        <div className="kpi-grid" style={{ marginBottom: 20 }}>
          <div className="kpi-card bleu"><div className="kpi-icon">📝</div><div className="kpi-value">{data.contenu.length}</div><div className="kpi-label">Contenus publiés</div></div>
          <div className="kpi-card vert"><div className="kpi-icon">❤️</div><div className="kpi-value">{totalLikes}</div><div className="kpi-label">Likes total</div></div>
          <div className="kpi-card lavande"><div className="kpi-icon">💬</div><div className="kpi-value">{totalComm}</div><div className="kpi-label">Commentaires</div></div>
          <div className="kpi-card"><div className="kpi-icon">🔗</div><div className="kpi-value">{totalClics}</div><div className="kpi-label">Clics total</div></div>
        </div>
      )}

      {data.contenu.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">✍️</div>
          <p>Aucun contenu enregistré.<br />Format CSV : titre, type, canal, date, likes, commentaires, clics, pilier, notes</p>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Titre</th>
                <th>Type</th>
                <th>Canal</th>
                <th>Date</th>
                <th>❤️</th>
                <th>💬</th>
                <th>🔗</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.contenu.map(c => (
                <tr key={c.id}>
                  <td><strong>{c.titre}</strong>{c.pilier && <span style={{ marginLeft: 6, fontSize: '0.68rem', color: 'var(--lavande)', fontWeight: 600 }}>[{c.pilier}]</span>}</td>
                  <td>{c.type || '—'}</td>
                  <td>{c.canal || '—'}</td>
                  <td>{c.date || '—'}</td>
                  <td>{c.likes || 0}</td>
                  <td>{c.commentaires || 0}</td>
                  <td>{c.clics || 0}</td>
                  <td>
                    <div className="actions">
                      <button className="btn-secondary" style={{ padding: '4px 10px', fontSize: '0.72rem' }} onClick={() => openEdit(c)}>✏️</button>
                      <button className="btn-danger" onClick={() => remove(c.id)}>🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">{editId ? 'Modifier' : 'Nouveau contenu'}</div>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="field" style={{ marginBottom: 14 }}>
              <label>Titre *</label>
              <input value={form.titre || ''} onChange={e => f('titre', e.target.value)} placeholder="Titre du contenu" />
            </div>
            <div className="form-grid">
              <div className="field">
                <label>Type</label>
                <select value={form.type || 'Post LinkedIn'} onChange={e => f('type', e.target.value)}>
                  {TYPES_CONTENU.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="field">
                <label>Canal</label>
                <select value={form.canal || 'LinkedIn'} onChange={e => f('canal', e.target.value)}>
                  {CANAUX_CONTENU.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="field">
                <label>Date</label>
                <input type="date" value={form.date || ''} onChange={e => f('date', e.target.value)} />
              </div>
              <div className="field">
                <label>Pilier lié</label>
                <select value={form.pilier || ''} onChange={e => f('pilier', e.target.value)}>
                  <option value="">Aucun</option>
                  {PILIERS.map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div className="field">
                <label>Likes</label>
                <input type="number" value={form.likes || ''} onChange={e => f('likes', e.target.value)} placeholder="0" />
              </div>
              <div className="field">
                <label>Commentaires</label>
                <input type="number" value={form.commentaires || ''} onChange={e => f('commentaires', e.target.value)} placeholder="0" />
              </div>
              <div className="field">
                <label>Clics</label>
                <input type="number" value={form.clics || ''} onChange={e => f('clics', e.target.value)} placeholder="0" />
              </div>
            </div>
            <div className="field">
              <label>Notes</label>
              <textarea value={form.notes || ''} onChange={e => f('notes', e.target.value)} placeholder="Observations..." />
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowModal(false)}>Annuler</button>
              <button className="btn-primary" onClick={save} disabled={!form.titre}>Enregistrer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────

const TABS = [
  { id: 'dashboard', icon: '📊', label: 'Vue d\'ensemble' },
  { id: 'clients', icon: '👥', label: 'Clients' },
  { id: 'diagnostics', icon: '🔍', label: 'Diagnostics' },
  { id: 'contenu', icon: '✍️', label: 'Contenu' },
];

export default function App() {
  injectStyles();
  const now = new Date();
  const [moisIdx, setMoisIdx] = useState(now.getMonth());
  const [annee, setAnnee] = useState(now.getFullYear());
  const [activeTab, setActiveTab] = useState('dashboard');
  const [data, setData] = useState(loadData);
  const [toast, setToast] = useState('');
  const [bilanLoading, setBilanLoading] = useState(false);
  const [bilanResult, setBilanResult] = useState(null);
  const [bilanError, setBilanError] = useState('');

  function showToast(msg) { setToast(msg); setTimeout(() => setToast(''), 2500); }

  function prevMois() {
    if (moisIdx === 0) { setMoisIdx(11); setAnnee(a => a - 1); }
    else setMoisIdx(m => m - 1);
    setBilanResult(null);
  }
  function nextMois() {
    if (moisIdx === 11) { setMoisIdx(0); setAnnee(a => a + 1); }
    else setMoisIdx(m => m + 1);
    setBilanResult(null);
  }

  async function genererBilan() {
    setBilanLoading(true);
    setBilanError('');
    setBilanResult(null);
    try {
      const moisStr = `${annee}-${String(moisIdx + 1).padStart(2, '0')}`;
      const clientsActifs = data.clients.filter(c => c.statut === 'actif').length;
      const diagMois = data.diagnostics.filter(d => d.date?.startsWith(moisStr)).length;
      const diagTotal = data.diagnostics.length;
      const diagConvertis = data.diagnostics.filter(d => d.statut === 'converti').length;
      const contenuMois = data.contenu.filter(c => c.date?.startsWith(moisStr)).length;
      const revenu = data.clients.filter(c => c.statut === 'actif').reduce((s, c) => s + (parseFloat(c.tarif) || 0), 0);
      const avgScores = {};
      PILIERS.forEach(p => {
        const vals = data.diagnostics.map(d => parseFloat(d.scores?.[p]) || 0).filter(v => v > 0);
        avgScores[p] = vals.length ? Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10 : 0;
      });

      const sys = `Tu es le coach business d'Ogan, fondateur de CapZéniths (prévention défaillance TPE/PME, méthode 7 piliers). Réponds UNIQUEMENT en JSON valide sans backticks. Format: {"sections": [{"titre": "...", "contenu": "..."}, ...], "alerte": "...", "action_prioritaire": "..."}. Sections attendues: "Performance commerciale", "Analyse diagnostics", "Contenu & visibilité", "Recommandations". Style direct, anti-bullshit, données chiffrées. alerte peut être null si rien de critique.`;
      const prompt = `Mois: ${getMoisLabel(annee, moisIdx)} | Clients actifs: ${clientsActifs} | CA mensuel: ${revenu}€ | Diagnostics ce mois: ${diagMois} | Total diagnostics: ${diagTotal} | Convertis: ${diagConvertis} | Taux conversion: ${diagTotal > 0 ? Math.round(diagConvertis/diagTotal*100) : 0}% | Contenus ce mois: ${contenuMois} | Scores piliers moyens: ${JSON.stringify(avgScores)}. Génère un bilan mensuel percutant avec recommandations concrètes.`;
      const result = await callAPI(sys, prompt);
      setBilanResult(result);
    } catch (e) {
      setBilanError(e.message);
    } finally {
      setBilanLoading(false);
    }
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="16" fill="#2D0A3E"/>
            <rect x="7" y="19" width="4" height="6" rx="0.8" fill="#F5A623"/>
            <rect x="13" y="15" width="4" height="10" rx="0.8" fill="#F5A623"/>
            <rect x="19" y="11" width="4.5" height="14" rx="0.8" fill="#F5A623"/>
            <polygon points="21.25,4 22.2,7 25.3,7 22.8,8.8 23.7,11.8 21.25,10 18.8,11.8 19.7,8.8 17.2,7 20.3,7" fill="#F5A623"/>
          </svg>
          <div>
            <div className="navbar-title"><span style={{ color: '#F5A623' }}>Cap</span><span style={{ color: '#9B8ED4' }}>Zéniths</span></div>
            <div className="navbar-subtitle">Agent Pilotage</div>
          </div>
        </div>
        <div className="navbar-badge">📊 Tableau de bord</div>
      </nav>

      <div className="hero">
        <div className="hero-tag">📊 Pilotage Business</div>
        <h1>Pilote ton activité <span>sans te noyer</span></h1>
        <p>Clients, diagnostics, contenu — tout dans un tableau de bord avec bilan IA mensuel.</p>
      </div>

      <div className="mois-bar">
        <span className="mois-label">Période</span>
        <div className="mois-controls">
          <button className="mois-btn" onClick={prevMois}>‹</button>
          <span className="mois-current">{getMoisLabel(annee, moisIdx)}</span>
          <button className="mois-btn" onClick={nextMois}>›</button>
        </div>
        {activeTab === 'dashboard' && (
          <button className="btn-bilan" onClick={genererBilan} disabled={bilanLoading}>
            {bilanLoading ? '⏳' : '🤖'} Bilan IA
          </button>
        )}
      </div>

      <div className="tabs-wrapper">
        <div className="tabs">
          {TABS.map(tab => (
            <button key={tab.id} className={`tab ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      <main className="main">
        {activeTab === 'dashboard' && (
          <ModuleDashboard
            data={data} moisIdx={moisIdx} annee={annee}
            onBilan={genererBilan}
            bilanLoading={bilanLoading} bilanResult={bilanResult} bilanError={bilanError}
          />
        )}
        {activeTab === 'clients' && <ModuleClients data={data} setData={setData} onToast={showToast} />}
        {activeTab === 'diagnostics' && <ModuleDiagnostics data={data} setData={setData} onToast={showToast} />}
        {activeTab === 'contenu' && <ModuleContenu data={data} setData={setData} onToast={showToast} />}
      </main>

      <div className="footer">
        <span>CapZéniths</span> · Agent Pilotage · Méthode 7 Piliers · Tous droits réservés
      </div>

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
