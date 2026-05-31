export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY;
  if (!supabaseUrl || !supabaseKey) return res.status(500).json({ error: 'Supabase non configuré' });

  const headers = {
    'Content-Type': 'application/json',
    'apikey': supabaseKey,
    'Authorization': `Bearer ${supabaseKey}`,
    'Prefer': 'return=representation',
  };

  const q = async (table, params = '') => {
    const r = await fetch(`${supabaseUrl}/rest/v1/${table}?${params}`, { headers });
    if (!r.ok) return [];
    return r.json();
  };

  try {
    const [clients, diagnostics, seances, prospects, contenus, formations, veilles, onboardings, evenements] = await Promise.all([
      q('clients', 'order=created_at.desc&limit=100'),
      q('diagnostics', 'order=date_diag.desc&limit=100'),
      q('seances', 'order=date_seance.desc&limit=200'),
      q('prospects', 'order=created_at.desc&limit=100'),
      q('contenus', 'order=date_pub.desc&limit=100'),
      q('formations', 'order=date_creation.desc&limit=100'),
      q('veilles', 'order=created_at.desc&limit=50'),
      q('onboardings', 'order=created_at.desc&limit=100'),
      q('evenements', 'order=created_at.desc&limit=50'),
    ]);

    return res.status(200).json({ clients, diagnostics, seances, prospects, contenus, formations, veilles, onboardings, evenements });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
