import { useState, useEffect, useCallback } from 'react';

// ─── STYLES ───────────────────────────────────────────────────────────────────
function injectStyles() {
  if (document.getElementById('czp2-s')) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Outfit:wght@300;400;500;600;700&display=swap';
  document.head.appendChild(link);
  const s = document.createElement('style');
  s.id = 'czp2-s';
  s.textContent = `
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --or: #F5A623; --lavande: #9B8ED4; --aubergine: #2D0A3E;
      --creme: #FFF8E8; --fond: #FAF8F5; --texte: #1A0A2E;
      --gris: #6B7280; --gris-clair: #E5E7EB;
      --vert: #10B981; --rouge: #EF4444; --bleu: #3B82F6; --orange: #F59E0B;
    }
    body { font-family: 'Outfit', sans-serif; background: var(--fond); color: var(--texte); min-height: 100vh; }

    /* NAVBAR */
    .nav { background: var(--creme); border-bottom: 2px solid var(--or); padding: 0 24px; height: 64px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 100; }
    .nav-logo { display: flex; align-items: center; gap: 10px; }
    .nav-title { font-family: 'DM Serif Display', serif; font-size: 1.05rem; color: var(--aubergine); }
    .nav-sub { font-size: 0.68rem; font-weight: 600; color: var(--gris); text-transform: uppercase; letter-spacing: 0.05em; }
    .nav-right { display: flex; align-items: center; gap: 10px; }
    .badge-live { background: var(--vert); color: #fff; font-size: 0.62rem; font-weight: 700; padding: 3px 8px; border-radius: 20px; letter-spacing: 0.06em; text-transform: uppercase; display: flex; align-items: center; gap: 4px; }
    .badge-live::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: #fff; animation: pulse 1.5s infinite; }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
    .btn-refresh { font-family: 'Outfit', sans-serif; font-size: 0.75rem; font-weight: 600; padding: 6px 12px; border: 1.5px solid var(--gris-clair); border-radius: 8px; background: #fff; color: var(--aubergine); cursor: pointer; transition: all 0.15s; display: flex; align-items: center; gap: 5px; }
    .btn-refresh:hover { border-color: var(--or); }
    .btn-refresh.spinning svg { animation: spin 0.8s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* TABS */
    .tabs-wrapper { background: var(--creme); border-bottom: 1px solid var(--gris-clair); overflow-x: auto; scrollbar-width: none; }
    .tabs-wrapper::-webkit-scrollbar { display: none; }
    .tabs { display: flex; min-width: max-content; padding: 0 16px; }
    .tab { display: flex; align-items: center; gap: 7px; padding: 14px 18px; font-size: 0.82rem; font-weight: 600; color: var(--gris); cursor: pointer; border-bottom: 3px solid transparent; white-space: nowrap; transition: all 0.2s; background: none; border-top: none; border-left: none; border-right: none; font-family: 'Outfit', sans-serif; }
    .tab:hover { color: var(--aubergine); }
    .tab.active { color: var(--aubergine); border-bottom-color: var(--or); }
    .tab-count { background: var(--gris-clair); color: var(--gris); font-size: 0.62rem; font-weight: 700; padding: 1px 6px; border-radius: 10px; }
    .tab.active .tab-count { background: var(--or); color: var(--aubergine); }

    /* MAIN */
    .main { max-width: 1000px; margin: 0 auto; padding: 28px 16px 64px; }

    /* SECTION TITLE */
    .sec-title { font-family: 'DM Serif Display', serif; font-size: 1.1rem; color: var(--aubergine); margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
    .sec-title::after { content: ''; flex: 1; height: 1px; background: var(--gris-clair); }

    /* KPI GRID */
    .kpi-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); gap: 12px; margin-bottom: 28px; }
    .kpi { background: #fff; border: 1.5px solid var(--gris-clair); border-radius: 12px; padding: 16px; position: relative; overflow: hidden; }
    .kpi::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; }
    .kpi.or::before { background: var(--or); }
    .kpi.vert::before { background: var(--vert); }
    .kpi.lavande::before { background: var(--lavande); }
    .kpi.bleu::before { background: var(--bleu); }
    .kpi.rouge::before { background: var(--rouge); }
    .kpi-icon { font-size: 1.3rem; margin-bottom: 6px; }
    .kpi-val { font-family: 'DM Serif Display', serif; font-size: 1.8rem; color: var(--aubergine); line-height: 1; margin-bottom: 3px; }
    .kpi-label { font-size: 0.72rem; font-weight: 600; color: var(--gris); text-transform: uppercase; letter-spacing: 0.04em; }
    .kpi-sub { font-size: 0.68rem; color: var(--gris); margin-top: 5px; }

    /* TABLE */
    .tbl { width: 100%; border-collapse: collapse; background: #fff; border-radius: 12px; overflow: hidden; border: 1.5px solid var(--gris-clair); margin-bottom: 20px; }
    .tbl th { background: var(--aubergine); color: #fff; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; padding: 10px 14px; text-align: left; }
    .tbl td { padding: 10px 14px; font-size: 0.83rem; border-bottom: 1px solid var(--gris-clair); vertical-align: middle; }
    .tbl tr:last-child td { border-bottom: none; }
    .tbl tr:hover td { background: var(--fond); }

    /* BADGE */
    .bdg { display: inline-block; font-size: 0.65rem; font-weight: 700; padding: 2px 8px; border-radius: 20px; letter-spacing: 0.04em; text-transform: uppercase; }
    .bdg.vert { background: rgba(16,185,129,0.1); color: var(--vert); }
    .bdg.rouge { background: rgba(239,68,68,0.1); color: var(--rouge); }
    .bdg.orange { background: rgba(245,158,11,0.1); color: var(--orange); }
    .bdg.bleu { background: rgba(59,130,246,0.1); color: var(--bleu); }
    .bdg.lavande { background: rgba(155,142,212,0.1); color: var(--lavande); }
    .bdg.gris { background: rgba(107,114,128,0.1); color: var(--gris); }

    /* PILIER BARS */
    .pilier-row { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
    .pilier-name { font-size: 0.76rem; font-weight: 600; color: var(--aubergine); min-width: 78px; }
    .pilier-bar-bg { flex: 1; height: 7px; background: var(--gris-clair); border-radius: 4px; overflow: hidden; }
    .pilier-bar { height: 100%; border-radius: 4px; transition: width 0.5s ease; }
    .pilier-score { font-size: 0.72rem; font-weight: 700; color: var(--aubergine); min-width: 28px; text-align: right; }

    /* CARD */
    .card { background: #fff; border: 1.5px solid var(--gris-clair); border-radius: 12px; padding: 20px; margin-bottom: 16px; }
    .card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; flex-wrap: wrap; gap: 8px; }
    .card-title { font-family: 'DM Serif Display', serif; font-size: 1rem; color: var(--aubergine); }

    /* ALERTE VEILLE */
    .alerte { display: flex; gap: 12px; padding: 12px 16px; border-radius: 10px; margin-bottom: 8px; border: 1.5px solid; }
    .alerte.CRITIQUE { background: rgba(239,68,68,0.05); border-color: rgba(239,68,68,0.25); }
    .alerte.IMPORTANT { background: rgba(245,158,11,0.05); border-color: rgba(245,158,11,0.25); }
    .alerte.INFO { background: rgba(59,130,246,0.05); border-color: rgba(59,130,246,0.2); }
    .alerte-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; margin-top: 4px; }
    .alerte.CRITIQUE .alerte-dot { background: var(--rouge); }
    .alerte.IMPORTANT .alerte-dot { background: var(--orange); }
    .alerte.INFO .alerte-dot { background: var(--bleu); }
    .alerte-titre { font-size: 0.82rem; font-weight: 700; margin-bottom: 2px; }
    .alerte.CRITIQUE .alerte-titre { color: var(--rouge); }
    .alerte.IMPORTANT .alerte-titre { color: var(--orange); }
    .alerte.INFO .alerte-titre { color: var(--bleu); }
    .alerte-desc { font-size: 0.78rem; color: var(--gris); line-height: 1.5; }

    /* BILAN IA */
    .bilan-box { background: linear-gradient(135deg, var(--aubergine), #4A1A6E); border-radius: 12px; padding: 22px; color: #fff; margin-top: 20px; }
    .bilan-box h3 { font-family: 'DM Serif Display', serif; font-size: 1rem; margin-bottom: 14px; }
    .bilan-section { margin-bottom: 12px; }
    .bilan-section-title { font-size: 0.68rem; font-weight: 700; color: var(--or); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 5px; }
    .bilan-content { font-size: 0.85rem; line-height: 1.75; white-space: pre-wrap; }

    /* LOADING */
    .loading { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 60vh; gap: 16px; }
    .spinner { width: 36px; height: 36px; border: 3px solid var(--gris-clair); border-top-color: var(--or); border-radius: 50%; animation: spin 0.8s linear infinite; }
    .loading p { font-size: 0.88rem; color: var(--gris); }

    /* EMPTY */
    .empty { text-align: center; padding: 40px 20px; color: var(--gris); }
    .empty-icon { font-size: 2.5rem; margin-bottom: 10px; }
    .empty p { font-size: 0.85rem; line-height: 1.6; }

    /* BTN */
    .btn-primary { background: linear-gradient(135deg, var(--or), #E8960A); color: var(--aubergine); font-family: 'Outfit', sans-serif; font-size: 0.85rem; font-weight: 700; padding: 10px 18px; border: none; border-radius: 8px; cursor: pointer; transition: all 0.2s; display: inline-flex; align-items: center; gap: 6px; }
    .btn-primary:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 4px 14px rgba(245,166,35,0.3); }
    .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }

    /* ERROR */
    .error-box { background: rgba(239,68,68,0.05); border: 1px solid rgba(239,68,68,0.2); border-radius: 10px; padding: 14px; margin: 16px 0; font-size: 0.83rem; color: var(--rouge); }

    /* MOIS SELECTOR */
    .mois-bar { background: var(--creme); border-bottom: 1px solid var(--gris-clair); padding: 10px 24px; display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
    .mois-btn { background: none; border: 1.5px solid var(--gris-clair); border-radius: 6px; padding: 5px 10px; font-size: 0.8rem; font-weight: 600; color: var(--aubergine); cursor: pointer; font-family: 'Outfit', sans-serif; }
    .mois-btn:hover { border-color: var(--or); }
    .mois-current { font-size: 0.88rem; font-weight: 700; color: var(--aubergine); min-width: 130px; text-align: center; }

    /* FOOTER */
    .footer { text-align: center; padding: 16px; font-size: 0.7rem; color: var(--gris); }
    .footer span { color: var(--or); font-weight: 600; }

    /* RESPONSIVE */
    @media (max-width: 480px) {
      .nav { padding: 0 14px; height: 56px; }
      .nav-sub { display: none; }
      .kpi-grid { grid-template-columns: 1fr 1fr; gap: 10px; }
      .kpi-val { font-size: 1.5rem; }
      .tab { padding: 11px 12px; font-size: 0.76rem; }
      .main { padding: 16px 12px 48px; }
      .tbl { font-size: 0.76rem; }
      .tbl th, .tbl td { padding: 8px 10px; }
    }
  `;
  document.head.appendChild(s);
}

// ─── UTILS ────────────────────────────────────────────────────────────────────
const MOIS_NOMS = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
const PILIERS = ['Cash','Stratégie','Clients','Équipe','Risques','Croissance','Résilience'];
const PILIER_KEYS = ['score_cash','score_strategie','score_clients','score_equipe','score_risques','score_croissance','score_resilience'];

function getMoisLabel(y, m) { return `${MOIS_NOMS[m]} ${y}`; }

function pilierColor(score) {
  if (score <= 3) return 'var(--rouge)';
  if (score <= 6) return 'var(--orange)';
  return 'var(--vert)';
}

function avgScoresDiags(diagnostics) {
  const avg = {};
  PILIERS.forEach((p, i) => {
    const vals = diagnostics.map(d => parseFloat(d[PILIER_KEYS[i]]) || 0).filter(v => v > 0);
    avg[p] = vals.length ? Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10 : 0;
  });
  return avg;
}

function avgScoresSeances(seances) {
  const avg = {};
  PILIERS.forEach((p, i) => {
    const vals = seances.map(s => parseFloat(s[PILIER_KEYS[i]]) || 0).filter(v => v > 0);
    avg[p] = vals.length ? Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10 : 0;
  });
  return avg;
}

function formatDate(str) {
  if (!str) return '—';
  try { return new Date(str).toLocaleDateString('fr-FR'); } catch { return str; }
}

function PilierBars({ scores }) {
  return (
    <div>
      {PILIERS.map(p => {
        const val = scores?.[p] || 0;
        return (
          <div key={p} className="pilier-row">
            <span className="pilier-name">{p}</span>
            <div className="pilier-bar-bg">
              <div className="pilier-bar" style={{ width: `${val * 10}%`, background: pilierColor(val) }} />
            </div>
            <span className="pilier-score">{val}/10</span>
          </div>
        );
      })}
    </div>
  );
}

// ─── API ──────────────────────────────────────────────────────────────────────
async function fetchData() {
  const res = await fetch('/api/data');
  if (!res.ok) throw new Error(`Erreur ${res.status}`);
  return res.json();
}

async function callAI(systemPrompt, userPrompt) {
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
  if (!res.ok) throw new Error(`Erreur API ${res.status}`);
  const data = await res.json();
  const text = data.content?.[0]?.text || data.content?.map?.(b => b.text || '').join('') || '';
  return JSON.parse(text.replace(/```json|```/g, '').trim());
}

// ─── TAB: DASHBOARD ───────────────────────────────────────────────────────────
function TabDashboard({ data, moisIdx, annee, onBilan, bilanLoading, bilanResult, bilanError }) {
  const moisStr = `${annee}-${String(moisIdx + 1).padStart(2, '0')}`;

  const clientsActifs = data.clients.filter(c => c.statut === 'actif').length;
  const revenu = data.clients.filter(c => c.statut === 'actif').reduce((s, c) => s + (parseFloat(c.tarif_mensuel) || 0), 0);
  const diagMois = data.diagnostics.filter(d => d.date_diag?.startsWith(moisStr)).length;
  const diagTotal = data.diagnostics.length;
  const diagConvertis = data.diagnostics.filter(d => d.statut === 'converti').length;
  const tauxConv = diagTotal > 0 ? Math.round((diagConvertis / diagTotal) * 100) : 0;
  const contenuMois = data.contenus.filter(c => c.date_pub?.startsWith(moisStr)).length;
  const prospects = data.prospects.filter(p => p.statut === 'contacté').length;
  const seancesMois = data.seances.filter(s => s.date_seance?.startsWith(moisStr)).length;
  const veillesCritiques = data.veilles.filter(v => v.niveau_alerte === 'CRITIQUE').length;

  const kpis = [
    { icon: '👥', val: clientsActifs, label: 'Clients actifs', sub: `${data.clients.length} total`, color: 'vert' },
    { icon: '💶', val: `${revenu.toLocaleString('fr')} €`, label: 'CA mensuel estimé', sub: 'clients actifs', color: 'or' },
    { icon: '🔍', val: diagMois, label: 'Diagnostics ce mois', sub: `${diagTotal} au total`, color: 'lavande' },
    { icon: '🎯', val: `${tauxConv}%`, label: 'Taux conversion', sub: `${diagConvertis} convertis`, color: tauxConv >= 30 ? 'vert' : 'rouge' },
    { icon: '📅', val: seancesMois, label: 'Séances ce mois', sub: `${data.seances.length} total`, color: 'bleu' },
    { icon: '✍️', val: contenuMois, label: 'Contenus publiés', sub: `${data.contenus.length} total`, color: 'bleu' },
    { icon: '🎓', val: data.formations.length, label: 'Formations générées', sub: 'tous piliers', color: 'lavande' },
    { icon: '⚠️', val: veillesCritiques, label: 'Alertes CRITIQUE', sub: `${data.veilles.length} veilles`, color: veillesCritiques > 0 ? 'rouge' : 'vert' },
  ];

  const avgScores = avgScoresDiags(data.diagnostics);
  const avgSeances = avgScoresSeances(data.seances);

  // Alertes veille récentes
  const alertesCritiques = [];
  data.veilles.slice(0, 5).forEach(v => {
    try {
      const alertes = JSON.parse(v.alertes || '[]');
      alertes.filter(a => a.type === 'CRITIQUE' || a.type === 'IMPORTANT').forEach(a => {
        alertesCritiques.push({ ...a, secteur: v.secteur, date: formatDate(v.created_at) });
      });
    } catch {}
  });

  return (
    <div>
      <div className="kpi-grid">
        {kpis.map((k, i) => (
          <div key={i} className={`kpi ${k.color}`}>
            <div className="kpi-icon">{k.icon}</div>
            <div className="kpi-val">{k.val}</div>
            <div className="kpi-label">{k.label}</div>
            <div className="kpi-sub">{k.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
        {data.diagnostics.length > 0 && (
          <div className="card">
            <div className="card-header"><div className="card-title">📊 Scores piliers — Diagnostics</div></div>
            <PilierBars scores={avgScores} />
          </div>
        )}
        {data.seances.length > 0 && (
          <div className="card">
            <div className="card-header"><div className="card-title">📈 Scores piliers — Séances suivi</div></div>
            <PilierBars scores={avgSeances} />
          </div>
        )}
      </div>

      {alertesCritiques.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <div className="sec-title">🚨 Alertes veille marché récentes</div>
          {alertesCritiques.slice(0, 4).map((a, i) => (
            <div key={i} className={`alerte ${a.type}`}>
              <div className="alerte-dot" />
              <div>
                <div className="alerte-titre">{a.titre} <span style={{ fontWeight: 400, fontSize: '0.72rem', color: 'var(--gris)' }}>· {a.secteur} · {a.date}</span></div>
                <div className="alerte-desc">{a.description}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
        <button className="btn-primary" onClick={onBilan} disabled={bilanLoading}>
          {bilanLoading ? '⏳ Analyse IA...' : '🤖 Générer le bilan IA du mois'}
        </button>
      </div>

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
            <div style={{ marginTop: 12, background: 'rgba(239,68,68,0.15)', borderRadius: 8, padding: '10px 14px', fontSize: '0.83rem' }}>
              ⚠️ <strong>Alerte :</strong> {bilanResult.alerte}
            </div>
          )}
          {bilanResult.action_prioritaire && (
            <div style={{ marginTop: 8, background: 'rgba(245,166,35,0.2)', borderRadius: 8, padding: '10px 14px', fontSize: '0.83rem' }}>
              🎯 <strong>Action prioritaire :</strong> {bilanResult.action_prioritaire}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── TAB: CLIENTS ─────────────────────────────────────────────────────────────
function TabClients({ data }) {
  const statutColor = s => ({ actif: 'vert', prospect: 'bleu', pause: 'orange', 'terminé': 'gris', converti: 'lavande' }[s] || 'gris');

  if (!data.clients.length) return (
    <div className="empty"><div className="empty-icon">👥</div><p>Aucun client enregistré.<br />Les données arriveront automatiquement depuis l'Agent Onboarding.</p></div>
  );

  return (
    <div>
      <div className="sec-title">👥 Clients & Prospects ({data.clients.length})</div>
      <div style={{ overflowX: 'auto' }}>
        <table className="tbl">
          <thead><tr><th>Nom</th><th>Secteur</th><th>Statut</th><th>Offre</th><th>Tarif/mois</th><th>Depuis</th></tr></thead>
          <tbody>
            {data.clients.map(c => (
              <tr key={c.id}>
                <td><strong>{c.prenom || c.client_nom || '—'}</strong>{c.entreprise ? <span style={{ fontSize: '0.75rem', color: 'var(--gris)', display: 'block' }}>{c.entreprise}</span> : null}</td>
                <td>{c.secteur || '—'}</td>
                <td><span className={`bdg ${statutColor(c.statut)}`}>{c.statut || '—'}</span></td>
                <td>{c.offre || '—'}</td>
                <td>{c.tarif_mensuel ? `${c.tarif_mensuel} €` : '—'}</td>
                <td>{formatDate(c.date_debut || c.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.onboardings.length > 0 && (
        <>
          <div className="sec-title" style={{ marginTop: 24 }}>🤝 Onboardings ({data.onboardings.length})</div>
          <div style={{ overflowX: 'auto' }}>
            <table className="tbl">
              <thead><tr><th>Client</th><th>Offre</th><th>Email</th><th>Contrat</th><th>Roadmap</th><th>Checklist</th><th>Date</th></tr></thead>
              <tbody>
                {data.onboardings.map(o => (
                  <tr key={o.id}>
                    <td><strong>{o.client_nom}</strong></td>
                    <td>{o.offre || '—'}</td>
                    <td>{o.email_genere ? <span className="bdg vert">✓</span> : <span className="bdg gris">—</span>}</td>
                    <td>{o.contrat_genere ? <span className="bdg vert">✓</span> : <span className="bdg gris">—</span>}</td>
                    <td>{o.roadmap_generee ? <span className="bdg vert">✓</span> : <span className="bdg gris">—</span>}</td>
                    <td>{o.checklist_generee ? <span className="bdg vert">✓</span> : <span className="bdg gris">—</span>}</td>
                    <td>{formatDate(o.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

// ─── TAB: DIAGNOSTICS ────────────────────────────────────────────────────────
function TabDiagnostics({ data }) {
  const avgScores = avgScoresDiags(data.diagnostics);

  if (!data.diagnostics.length) return (
    <div className="empty"><div className="empty-icon">🔍</div><p>Aucun diagnostic enregistré.<br />Les rapports L1.1 générés depuis l'Agent Diagnostic apparaîtront ici automatiquement.</p></div>
  );

  return (
    <div>
      {data.diagnostics.length > 1 && (
        <div className="card" style={{ marginBottom: 20 }}>
          <div className="card-header"><div className="card-title">📊 Scores moyens — {data.diagnostics.length} diagnostics</div></div>
          <PilierBars scores={avgScores} />
        </div>
      )}
      <div className="sec-title">🔍 Diagnostics réalisés ({data.diagnostics.length})</div>
      <div style={{ overflowX: 'auto' }}>
        <table className="tbl">
          <thead><tr><th>Client</th><th>Secteur</th><th>Date</th><th>Statut</th><th>Score moy.</th><th>Pilier le + faible</th></tr></thead>
          <tbody>
            {data.diagnostics.map(d => {
              const scores = PILIER_KEYS.map(k => parseFloat(d[k]) || 0);
              const avg = scores.length ? Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 10) / 10 : 0;
              const minIdx = scores.indexOf(Math.min(...scores));
              const minPilier = PILIERS[minIdx];
              return (
                <tr key={d.id}>
                  <td><strong>{d.client_nom}</strong></td>
                  <td>{d.secteur || '—'}</td>
                  <td>{formatDate(d.date_diag)}</td>
                  <td><span className={`bdg ${d.statut === 'converti' ? 'lavande' : d.statut === 'rapport_envoyé' ? 'vert' : 'bleu'}`}>{d.statut || '—'}</span></td>
                  <td><strong style={{ color: avg >= 7 ? 'var(--vert)' : avg >= 4 ? 'var(--orange)' : 'var(--rouge)' }}>{avg}/10</strong></td>
                  <td><span className="bdg rouge">{minPilier}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {data.seances.length > 0 && (
        <>
          <div className="sec-title" style={{ marginTop: 24 }}>📅 Séances de suivi ({data.seances.length})</div>
          <div style={{ overflowX: 'auto' }}>
            <table className="tbl">
              <thead><tr><th>Client</th><th>Séance</th><th>Date</th><th>Cash</th><th>Stratégie</th><th>Clients</th><th>Équipe</th><th>Risques</th><th>Croissance</th><th>Résilience</th></tr></thead>
              <tbody>
                {data.seances.slice(0, 20).map(s => (
                  <tr key={s.id}>
                    <td><strong>{s.client_nom}</strong></td>
                    <td>#{s.numero_seance || '—'}</td>
                    <td>{formatDate(s.date_seance)}</td>
                    {PILIER_KEYS.map(k => (
                      <td key={k} style={{ color: pilierColor(parseFloat(s[k]) || 0), fontWeight: 600 }}>{s[k] || '—'}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

// ─── TAB: ACQUISITION ────────────────────────────────────────────────────────
function TabAcquisition({ data }) {
  const statutColor = s => ({ contacté: 'bleu', répondu: 'lavande', rdv: 'orange', converti: 'vert', perdu: 'rouge' }[s] || 'gris');
  const total = data.prospects.length;
  const convertis = data.prospects.filter(p => p.statut === 'converti').length;
  const taux = total > 0 ? Math.round((convertis / total) * 100) : 0;

  if (!data.prospects.length) return (
    <div className="empty"><div className="empty-icon">🎯</div><p>Aucun prospect enregistré.<br />Les contacts générés depuis l'Agent Acquisition apparaîtront ici automatiquement.</p></div>
  );

  return (
    <div>
      <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <div className="kpi or"><div className="kpi-icon">📩</div><div className="kpi-val">{total}</div><div className="kpi-label">Prospects contactés</div></div>
        <div className="kpi vert"><div className="kpi-icon">✅</div><div className="kpi-val">{convertis}</div><div className="kpi-label">Convertis</div></div>
        <div className="kpi lavande"><div className="kpi-icon">🎯</div><div className="kpi-val">{taux}%</div><div className="kpi-label">Taux conversion</div></div>
        <div className="kpi bleu"><div className="kpi-icon">⏳</div><div className="kpi-val">{data.prospects.filter(p => p.statut === 'contacté').length}</div><div className="kpi-label">En attente</div></div>
      </div>

      <div className="sec-title">🎯 Prospects ({data.prospects.length})</div>
      <div style={{ overflowX: 'auto' }}>
        <table className="tbl">
          <thead><tr><th>Entreprise / Prénom</th><th>Secteur</th><th>Situation</th><th>Action</th><th>Canal</th><th>Statut</th><th>Date</th></tr></thead>
          <tbody>
            {data.prospects.map(p => (
              <tr key={p.id}>
                <td><strong>{p.entreprise || p.prenom || '—'}</strong></td>
                <td>{p.secteur || '—'}</td>
                <td>{p.situation || '—'}</td>
                <td>{p.type_action || '—'}</td>
                <td>{p.canal || '—'}</td>
                <td><span className={`bdg ${statutColor(p.statut)}`}>{p.statut || '—'}</span></td>
                <td>{formatDate(p.date_contact || p.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── TAB: CONTENU & FORMATION ─────────────────────────────────────────────────
function TabContenu({ data }) {
  const totalLikes = data.contenus.reduce((s, c) => s + (parseInt(c.likes) || 0), 0);
  const totalComm = data.contenus.reduce((s, c) => s + (parseInt(c.commentaires) || 0), 0);

  return (
    <div>
      {data.contenus.length > 0 && (
        <>
          <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 20 }}>
            <div className="kpi bleu"><div className="kpi-icon">📝</div><div className="kpi-val">{data.contenus.length}</div><div className="kpi-label">Contenus publiés</div></div>
            <div className="kpi vert"><div className="kpi-icon">❤️</div><div className="kpi-val">{totalLikes}</div><div className="kpi-label">Likes total</div></div>
            <div className="kpi lavande"><div className="kpi-icon">💬</div><div className="kpi-val">{totalComm}</div><div className="kpi-label">Commentaires</div></div>
            <div className="kpi or"><div className="kpi-icon">🎓</div><div className="kpi-val">{data.formations.length}</div><div className="kpi-label">Formations</div></div>
          </div>

          <div className="sec-title">✍️ Contenus ({data.contenus.length})</div>
          <div style={{ overflowX: 'auto', marginBottom: 24 }}>
            <table className="tbl">
              <thead><tr><th>Titre</th><th>Type</th><th>Canal</th><th>Pilier</th><th>❤️</th><th>💬</th><th>Date</th></tr></thead>
              <tbody>
                {data.contenus.map(c => (
                  <tr key={c.id}>
                    <td><strong>{c.titre}</strong></td>
                    <td>{c.type_contenu || '—'}</td>
                    <td>{c.canal || '—'}</td>
                    <td>{c.pilier ? <span className="bdg lavande">{c.pilier}</span> : '—'}</td>
                    <td>{c.likes || 0}</td>
                    <td>{c.commentaires || 0}</td>
                    <td>{formatDate(c.date_pub)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {data.formations.length > 0 && (
        <>
          <div className="sec-title">🎓 Formations générées ({data.formations.length})</div>
          <div style={{ overflowX: 'auto' }}>
            <table className="tbl">
              <thead><tr><th>Module</th><th>Pilier</th><th>Niveau</th><th>Séances</th><th>Profil</th><th>Date</th></tr></thead>
              <tbody>
                {data.formations.map(f => (
                  <tr key={f.id}>
                    <td><strong>{f.titre_module || f.theme || '—'}</strong></td>
                    <td>{f.pilier ? <span className="bdg lavande">{f.pilier}</span> : '—'}</td>
                    <td>{f.niveau || '—'}</td>
                    <td>{f.nb_seances || '—'}</td>
                    <td>{f.profil_apprenant || '—'}</td>
                    <td>{formatDate(f.date_creation || f.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {!data.contenus.length && !data.formations.length && (
        <div className="empty"><div className="empty-icon">✍️</div><p>Aucun contenu ni formation enregistré.<br />Les données arriveront depuis les Agents Éditorial et Formation.</p></div>
      )}
    </div>
  );
}

// ─── TAB: VEILLE ─────────────────────────────────────────────────────────────
function TabVeille({ data }) {
  if (!data.veilles.length) return (
    <div className="empty"><div className="empty-icon">🔭</div><p>Aucune veille enregistrée.<br />Les rapports de veille générés depuis l'Agent Veille apparaîtront ici automatiquement.</p></div>
  );

  return (
    <div>
      <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: 20 }}>
        <div className="kpi or"><div className="kpi-icon">🔭</div><div className="kpi-val">{data.veilles.length}</div><div className="kpi-label">Veilles réalisées</div></div>
        <div className="kpi rouge"><div className="kpi-icon">🚨</div><div className="kpi-val">{data.veilles.filter(v => v.niveau_alerte === 'CRITIQUE').length}</div><div className="kpi-label">Alertes CRITIQUE</div></div>
        <div className="kpi orange"><div className="kpi-icon">⚠️</div><div className="kpi-val">{data.veilles.filter(v => v.niveau_alerte === 'IMPORTANT').length}</div><div className="kpi-label">Alertes IMPORTANT</div></div>
      </div>

      {data.veilles.map(v => {
        let alertes = [];
        try { alertes = JSON.parse(v.alertes || '[]'); } catch {}
        return (
          <div key={v.id} className="card" style={{ marginBottom: 16 }}>
            <div className="card-header">
              <div>
                <div className="card-title">📊 {v.secteur} — {v.type_veille}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--gris)', marginTop: 3 }}>{v.periode} · {formatDate(v.created_at)}</div>
              </div>
              <span className={`bdg ${v.niveau_alerte === 'CRITIQUE' ? 'rouge' : v.niveau_alerte === 'IMPORTANT' ? 'orange' : 'vert'}`}>{v.niveau_alerte}</span>
            </div>
            {v.tendances && <p style={{ fontSize: '0.83rem', color: 'var(--texte)', lineHeight: 1.6, marginBottom: alertes.length ? 12 : 0 }}>{v.tendances.slice(0, 200)}{v.tendances.length > 200 ? '...' : ''}</p>}
            {alertes.slice(0, 3).map((a, i) => (
              <div key={i} className={`alerte ${a.type}`}>
                <div className="alerte-dot" />
                <div>
                  <div className="alerte-titre">{a.titre}</div>
                  <div className="alerte-desc">{a.description}</div>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────
const TABS = [
  { id: 'dashboard', icon: '📊', label: 'Vue 360°' },
  { id: 'clients', icon: '👥', label: 'Clients' },
  { id: 'diagnostics', icon: '🔍', label: 'Diagnostics' },
  { id: 'acquisition', icon: '🎯', label: 'Acquisition' },
  { id: 'contenu', icon: '✍️', label: 'Contenu' },
  { id: 'veille', icon: '🔭', label: 'Veille' },
];

export default function App() {
  injectStyles();
  const now = new Date();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [moisIdx, setMoisIdx] = useState(now.getMonth());
  const [annee, setAnnee] = useState(now.getFullYear());
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [lastRefresh, setLastRefresh] = useState(null);
  const [bilanLoading, setBilanLoading] = useState(false);
  const [bilanResult, setBilanResult] = useState(null);
  const [bilanError, setBilanError] = useState('');

  const load = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    else setRefreshing(true);
    setError('');
    try {
      const d = await fetchData();
      setData(d);
      setLastRefresh(new Date());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

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
    if (!data) return;
    setBilanLoading(true);
    setBilanError('');
    setBilanResult(null);
    const moisStr = `${annee}-${String(moisIdx + 1).padStart(2, '0')}`;
    try {
      const clientsActifs = data.clients.filter(c => c.statut === 'actif').length;
      const revenu = data.clients.filter(c => c.statut === 'actif').reduce((s, c) => s + (parseFloat(c.tarif_mensuel) || 0), 0);
      const diagMois = data.diagnostics.filter(d => d.date_diag?.startsWith(moisStr)).length;
      const diagConvertis = data.diagnostics.filter(d => d.statut === 'converti').length;
      const contenuMois = data.contenus.filter(c => c.date_pub?.startsWith(moisStr)).length;
      const seancesMois = data.seances.filter(s => s.date_seance?.startsWith(moisStr)).length;
      const prospects = data.prospects.length;
      const veillesCritiques = data.veilles.filter(v => v.niveau_alerte === 'CRITIQUE').length;
      const avgScores = avgScoresDiags(data.diagnostics);

      const sys = `Tu es le coach business d'Ogan, fondateur de CapZéniths (prévention défaillance TPE/PME, méthode 7 piliers). Réponds UNIQUEMENT en JSON valide sans backticks. Format: {"sections": [{"titre": "...", "contenu": "..."}, ...], "alerte": "...", "action_prioritaire": "..."}. Sections: "Performance commerciale", "Analyse diagnostics & suivi", "Acquisition & contenu", "Recommandations stratégiques". Style direct, anti-bullshit, données chiffrées. alerte peut être null.`;
      const prompt = `Mois: ${getMoisLabel(annee, moisIdx)} | Clients actifs: ${clientsActifs} | CA mensuel: ${revenu}€ | Diagnostics ce mois: ${diagMois} | Total convertis: ${diagConvertis} | Séances ce mois: ${seancesMois} | Contenus publiés ce mois: ${contenuMois} | Prospects en base: ${prospects} | Alertes veille CRITIQUE: ${veillesCritiques} | Scores piliers moyens: ${JSON.stringify(avgScores)} | Formations générées: ${data.formations.length}. Génère un bilan mensuel percutant.`;
      const result = await callAI(sys, prompt);
      setBilanResult(result);
    } catch (e) {
      setBilanError(e.message);
    } finally {
      setBilanLoading(false);
    }
  }

  const tabCounts = data ? {
    clients: data.clients.length,
    diagnostics: data.diagnostics.length,
    acquisition: data.prospects.length,
    contenu: data.contenus.length + data.formations.length,
    veille: data.veilles.length,
  } : {};

  if (loading) return (
    <div style={{ fontFamily: 'Outfit, sans-serif', background: 'var(--fond)', minHeight: '100vh' }}>
      <div className="loading">
        <div className="spinner"></div>
        <p>Chargement des données Supabase…</p>
      </div>
    </div>
  );

  return (
    <>
      {/* NAVBAR */}
      <nav className="nav">
        <div className="nav-logo">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="16" fill="#2D0A3E"/>
            <rect x="7" y="19" width="4" height="6" rx="0.8" fill="#F5A623"/>
            <rect x="13" y="15" width="4" height="10" rx="0.8" fill="#F5A623"/>
            <rect x="19" y="11" width="4.5" height="14" rx="0.8" fill="#F5A623"/>
            <polygon points="21.25,4 22.2,7 25.3,7 22.8,8.8 23.7,11.8 21.25,10 18.8,11.8 19.7,8.8 17.2,7 20.3,7" fill="#F5A623"/>
          </svg>
          <div>
            <div className="nav-title"><span style={{ color: '#F5A623' }}>Cap</span><span style={{ color: '#9B8ED4' }}>Zéniths</span></div>
            <div className="nav-sub">Pilotage 360°</div>
          </div>
        </div>
        <div className="nav-right">
          {lastRefresh && <span style={{ fontSize: '0.7rem', color: 'var(--gris)' }}>Mis à jour {lastRefresh.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>}
          <div className="badge-live">Live</div>
          <button className={`btn-refresh ${refreshing ? 'spinning' : ''}`} onClick={() => load(true)}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10 2A5 5 0 1 0 11 6"/><path d="M8 2h2V0"/></svg>
            Sync
          </button>
        </div>
      </nav>

      {/* MOIS SELECTOR */}
      <div className="mois-bar">
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--aubergine)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Période</span>
        <button className="mois-btn" onClick={prevMois}>‹</button>
        <span className="mois-current">{getMoisLabel(annee, moisIdx)}</span>
        <button className="mois-btn" onClick={nextMois}>›</button>
        {data && <span style={{ fontSize: '0.72rem', color: 'var(--gris)', marginLeft: 'auto' }}>
          {data.clients.length} clients · {data.diagnostics.length} diagnostics · {data.prospects.length} prospects · {data.veilles.length} veilles
        </span>}
      </div>

      {/* TABS */}
      <div className="tabs-wrapper">
        <div className="tabs">
          {TABS.map(tab => (
            <button key={tab.id} className={`tab ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
              {tab.icon} {tab.label}
              {tabCounts[tab.id] !== undefined && tabCounts[tab.id] > 0 && (
                <span className="tab-count">{tabCounts[tab.id]}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <main className="main">
        {error && <div className="error-box">❌ Erreur Supabase : {error} — <button onClick={() => load()} style={{ textDecoration: 'underline', cursor: 'pointer', background: 'none', border: 'none', color: 'var(--rouge)' }}>Réessayer</button></div>}

        {data && activeTab === 'dashboard' && (
          <TabDashboard data={data} moisIdx={moisIdx} annee={annee} onBilan={genererBilan} bilanLoading={bilanLoading} bilanResult={bilanResult} bilanError={bilanError} />
        )}
        {data && activeTab === 'clients' && <TabClients data={data} />}
        {data && activeTab === 'diagnostics' && <TabDiagnostics data={data} />}
        {data && activeTab === 'acquisition' && <TabAcquisition data={data} />}
        {data && activeTab === 'contenu' && <TabContenu data={data} />}
        {data && activeTab === 'veille' && <TabVeille data={data} />}
      </main>

      <div className="footer"><span>CapZéniths</span> · Pilotage 360° v2 · Méthode 7 Piliers · Données temps réel Supabase</div>
    </>
  );
}
