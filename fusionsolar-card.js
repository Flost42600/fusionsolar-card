/*!
 * FusionSolar Card — carte Lovelace animée pour installation Huawei FusionSolar
 * (intégrations Huawei Solar, Huawei FusionCharge et Solcast)
 * Version 1.0.0
 *
 * Installation :
 *   1. Copier ce fichier dans /config/www/fusionsolar-card.js
 *   2. Paramètres > Tableaux de bord > ⋮ > Ressources > Ajouter : /local/fusionsolar-card.js (Module JavaScript)
 *   3. Cartes :  type: custom:fusionsolar-card  ·  custom:fusionsolar-mini-card  ·  custom:fusionsolar-phone-card
 *
 * Toutes les entités ont une valeur par défaut (ton installation) et peuvent être remplacées via `entities:`.
 */

const FS_VERSION = "1.2.0";

/* ------------------------------------------------------------------------------------------ */
/*  Entités par défaut                                                                        */
/* ------------------------------------------------------------------------------------------ */
const FS_DEFAULTS = {
  // Strings PV
  pv1_power: "sensor.puissance_pv1",
  pv2_power: "sensor.puissance_pv2",
  pv1_voltage: "sensor.inverter_tension_pv_1",
  pv1_current: "sensor.inverter_courant_pv_1",
  pv2_voltage: "sensor.inverter_tension_pv_2",
  pv2_current: "sensor.inverter_courant_pv_2",
  // Onduleur
  pv_power: "sensor.inverter_puissance_d_entree",
  inverter_power: "sensor.inverter_puissance_active",
  inverter_state: "sensor.inverter_etat_de_l_onduleur_2",
  inverter_alarm: "sensor.inverter_alarmes_2",
  pv_daily: "sensor.inverter_production_quotidienne",
  pv_peak: "sensor.inverter_pic_de_puissance_active_journaliere",
  // Batterie (puissance + = charge)
  battery_soc: "sensor.batteries_etat_de_la_capacite",
  battery_power: "sensor.batteries_puissance_de_charge_decharge",
  battery_mode: "select.batteries_mode_de_fonctionnement_2",
  battery_status: "sensor.batteries_etat_de_fonctionnement_2",
  battery_charge_today: "sensor.batteries_charge_journaliere",
  battery_discharge_today: "sensor.batteries_decharge_journaliere_2",
  battery_grid_charge: "switch.batteries_charge_depuis_le_reseau_2",
  battery_end_soc: "number.batteries_soc_de_fin_de_decharge_2",
  battery_max_soc: "number.inverter_soc_de_fin_de_charge",
  battery_grid_cutoff_soc: "number.inverter_soc_de_coupure_de_charge_reseau",
  battery_grid_charge_power: "number.inverter_puissance_de_charge_maximale_depuis_le_reseau",
  battery_forced_charge: "sensor.batteries_charge_forcee",
  // Compteur (puissance + = injection)
  grid_power: "sensor.power_meter_puissance_active",
  grid_voltage: "sensor.power_meter_tension",
  // Borne FusionCharge
  ev_power: "sensor.garage_ns2661082995_puissance_de_charge",
  ev_state: "sensor.garage_ns2661082995_etat",
  ev_plugged: "binary_sensor.garage_ns2661082995_vehicule_branche",
  ev_mode: "select.garage_ns2661082995_mode_de_travail",
  ev_session_energy: "sensor.garage_ns2661082995_energie_de_la_session",
  ev_session_duration: "sensor.garage_ns2661082995_duree_de_la_session",
  ev_online: "binary_sensor.garage_ns2661082995_borne_en_ligne",
  // Divers
  heatpump_power: "sensor.e3_vitocal_16_inverter_power",
  price: "sensor.garage_mesure_du_courant_prix_electricite",
  fossil: "sensor.electricity_maps_pourcentage_d_energies_fossiles_du_reseau",
  sun: "sun.sun",
  hc_toggle: "input_boolean.recharge_batterie_heures_creuses",
  // Pilotage automatique (helpers et automatisation créés dans HA, voir README)
  auto_mode: "input_boolean.fusionsolar_pilotage_auto",
  pilot_state: "sensor.fusionsolar_pilotage_etat",
  pilot_target: "sensor.fusionsolar_pilotage_cible",
  pilot_need: "sensor.fusionsolar_pilotage_besoin",
  pilot_in_hc: "binary_sensor.fusionsolar_pilotage_en_hc",
  pilot_block: "binary_sensor.fusionsolar_pilotage_bloquer_decharge",
  pilot_limit: "sensor.fusionsolar_pilotage_limite_decharge",
  pilot_automation: "automation.fusionsolar_pilotage_auto_heures_creuses",
  hc1_start: "input_datetime.fusionsolar_hc1_debut",
  hc1_end: "input_datetime.fusionsolar_hc1_fin",
  hc2_start: "input_datetime.fusionsolar_hc2_debut",
  hc2_end: "input_datetime.fusionsolar_hc2_fin",
  hc2_enabled: "input_boolean.fusionsolar_hc2_active",
  opt_charge: "input_boolean.fusionsolar_charge_batterie_hc",
  opt_preserve: "input_boolean.fusionsolar_preserver_batterie_hc",
  opt_protect_ev: "input_boolean.fusionsolar_proteger_batterie_ve",
  opt_ev_hc: "input_boolean.fusionsolar_recharge_ve_hc",
  target_mode: "input_select.fusionsolar_cible_mode",
  target_fixed: "input_number.fusionsolar_cible_fixe",
  target_max: "input_number.fusionsolar_cible_max",
  margin: "input_number.fusionsolar_marge",
  charge_power: "input_number.fusionsolar_puissance_charge_reseau",
  discharge_normal: "input_number.fusionsolar_puissance_decharge_normale",
  conso_source: "input_select.fusionsolar_conso_source",
  conso_day: "input_number.fusionsolar_conso_jour",
  pv_factor: "input_number.fusionsolar_facteur_pv",
  capacity: "input_number.fusionsolar_capacite_batterie",
  // Prévisions Solcast
  forecast_today: "sensor.solcast_pv_forecast_previsions_pour_aujourd_hui",
  forecast_tomorrow: "sensor.solcast_pv_forecast_previsions_pour_demain",
  forecast_remaining: "sensor.solcast_pv_forecast_previsions_de_production_restantes_aujourd_hui",
  forecast_now: "sensor.solcast_pv_forecast_puissance_maintenant",
  // Énergies cumulées (statistiques long terme)
  pv_energy: "sensor.production_solaire_reelle",
  grid_import_energy: "sensor.power_meter_consommation",
  grid_export_energy: "sensor.power_meter_exporte",
  battery_charge_energy: "sensor.batteries_charge_cumulee",
  battery_discharge_energy: "sensor.batteries_decharge_cumulee",
  ev_energy: "sensor.garage_ns2661082995_energie_totale",
  heatpump_energy: ["sensor.e3_vitocal_heating_energy_consumption_this_year", "sensor.e3_vitocal_dhw_energy_consumption_this_year"],
};

// Repli si l'entité par défaut n'existe pas : plateforme + translation_key
const FS_DISCOVERY = {
  pv_power: ["huawei_solar", ["input_power"]],
  inverter_power: ["huawei_solar", ["active_power"]],
  pv1_voltage: ["huawei_solar", ["pv_01_voltage"]],
  pv1_current: ["huawei_solar", ["pv_01_current"]],
  pv2_voltage: ["huawei_solar", ["pv_02_voltage"]],
  pv2_current: ["huawei_solar", ["pv_02_current"]],
  pv_daily: ["huawei_solar", ["daily_yield_energy"]],
  battery_soc: ["huawei_solar", ["storage_state_of_capacity"]],
  battery_power: ["huawei_solar", ["storage_charge_discharge_power"]],
  battery_mode: ["huawei_solar", ["storage_working_mode_settings"]],
  grid_power: ["huawei_solar", ["power_meter_active_power"]],
  grid_import_energy: ["huawei_solar", ["grid_accumulated_energy"]],
  grid_export_energy: ["huawei_solar", ["grid_exported_energy"]],
  battery_charge_energy: ["huawei_solar", ["storage_total_charge"]],
  battery_discharge_energy: ["huawei_solar", ["storage_total_discharge"]],
};

const FS_E = { pv: "pv_energy", imp: "grid_import_energy", exp: "grid_export_energy", chg: "battery_charge_energy", dis: "battery_discharge_energy", ev: "ev_energy", hp: "heatpump_energy" };

const FS_COL = { pv: "#ffc531", bat: "#3ddc84", imp: "#ff6b5b", exp: "#b28dff", home: "#5ac8fa", ev: "#4f9dff", hp: "#ff8a3d", idle: "#7d8794" };
const FS_SER = { pv: "#f2b33d", bat: "#3dbb78", exp: "#9085e9", imp: "#e5534b", home: "#4fb6e8", ev: "#3987e5", soc: "#3ddc84", neutral: "#c3c2b7", hp: "#d95926" };

/* ------------------------------------------------------------------------------------------ */
/*  Outils                                                                                    */
/* ------------------------------------------------------------------------------------------ */
const fsClamp = (v, a, b) => Math.min(b, Math.max(a, v));
const fsMean = (a) => (a.length ? a.reduce((s, v) => s + v, 0) / a.length : null);
const fsSum = (a) => a.reduce((s, v) => s + (v || 0), 0);
const fsTs = (v) => (typeof v === "number" ? (v < 1e11 ? v * 1000 : v) : new Date(v).getTime());
const fsEsc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const fsPath = (pts) => pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join("");
const fsDay0 = (t) => { const d = new Date(t); d.setHours(0, 0, 0, 0); return d.getTime(); };
const fsSpd = (p) => `${fsClamp(3 - 0.62 * Math.log2(Math.abs(p || 0) / 120 + 1), 0.45, 3).toFixed(2)}s`;

function fsLang(hass, cfg) {
  const l = String((cfg && cfg.language) || (hass && hass.locale && hass.locale.language) || (hass && hass.language) || "fr").toLowerCase();
  return l.startsWith("fr") ? "fr" : "en";
}

/* Répartition d'un intervalle : d'où vient l'énergie consommée, où va la production */
function fsAlloc(r) {
  const pv = Math.max(0, r.pv || 0), imp = Math.max(0, r.imp || 0), exp = Math.max(0, r.exp || 0);
  const chg = Math.max(0, r.chg || 0), dis = Math.max(0, r.dis || 0);
  const pvAvail = Math.max(0, pv - exp);
  const pvToBat = Math.min(chg, pvAvail);
  const gridToBat = chg - pvToBat;
  const pvDirect = Math.max(0, pvAvail - pvToBat);
  const fromGrid = Math.max(0, imp - gridToBat);
  const load = pvDirect + dis + fromGrid;
  return { t: r.t, pv, imp, exp, chg, dis, pvToBat, gridToBat, pvDirect, fromBat: dis, fromGrid, load, ev: Math.max(0, r.ev || 0), hp: Math.max(0, r.hp || 0) };
}
/* Autosuffisance : l'énergie de batterie chargée depuis le réseau compte comme du réseau */
const fsAuto = (o) => (o.load > 0.01 ? fsClamp(1 - (o.fromGrid + (o.chg > 0.01 ? o.dis * fsClamp(o.gridToBat / o.chg, 0, 1) : 0)) / o.load, 0, 1) : null);
function fsAdd(list) {
  const k = ["pv", "imp", "exp", "chg", "dis", "pvToBat", "gridToBat", "pvDirect", "fromBat", "fromGrid", "load", "ev", "hp", "evSolar"];
  const o = {};
  for (const key of k) o[key] = fsSum(list.map((r) => r[key]));
  return o;
}

/* Heures creuses : ["00:00-06:00", "12:00-14:00"] */
function fsParseOffpeak(list) {
  return (Array.isArray(list) ? list : list ? [list] : []).map((s) => {
    const m = String(s).match(/^\s*(\d{1,2})(?:[:h](\d{2}))?\s*-\s*(\d{1,2})(?:[:h](\d{2}))?\s*$/);
    return m ? [+m[1] * 60 + (+m[2] || 0), +m[3] * 60 + (+m[4] || 0)] : null;
  }).filter(Boolean);
}
function fsInOff(win, date) {
  const m = date.getHours() * 60 + date.getMinutes();
  return win.some(([a, b]) => (a <= b ? m >= a && m < b : m >= a || m < b));
}

function fsTicks(min, max, n = 5) {
  if (min == null || max == null || !isFinite(min) || !isFinite(max)) { min = 0; max = 1; }
  if (min === max) { min -= 1; max += 1; }
  const step0 = (max - min) / n, mag = Math.pow(10, Math.floor(Math.log10(step0))), err = step0 / mag;
  const step = (err >= 7.5 ? 10 : err >= 3.5 ? 5 : err >= 1.5 ? 2 : 1) * mag;
  const lo = Math.floor(min / step) * step, hi = Math.ceil(max / step) * step;
  const ticks = [];
  for (let v = lo; v <= hi + step / 2; v += step) ticks.push(+v.toFixed(10));
  return { lo, hi, ticks, step };
}

/* Graphique SVG générique */
function fsPlot(o) {
  const W = o.w || 520, H = o.h || 240, m = { l: 46, r: o.y2 ? 38 : 12, t: 12, b: 30 };
  const pw = W - m.l - m.r, ph = H - m.t - m.b;
  const cats = o.x.cats;
  const yt = fsTicks(o.y.min, o.y.max, o.y.n || 4);
  const sx = (i) => m.l + ((i + 0.5) * pw) / cats.length;
  const sy = (v) => m.t + ph - ((v - yt.lo) / (yt.hi - yt.lo)) * ph;
  const fy = o.y.fmt || ((v) => String(v));
  let g = "";
  for (const t of yt.ticks) g += `<line class="gl${t === 0 ? " z" : ""}" x1="${m.l}" x2="${m.l + pw}" y1="${sy(t)}" y2="${sy(t)}"/><text class="tk" x="${m.l - 7}" y="${sy(t) + 4}" text-anchor="end">${fy(t)}</text>`;
  const every = Math.max(1, Math.ceil(cats.length / Math.max(2, Math.min(o.x.maxLabels || 12, Math.floor(pw / (o.x.labelW || 42))))));
  cats.forEach((c, i) => { if (i % every === 0 && c !== "") g += `<text class="tk" x="${sx(i)}" y="${m.t + ph + 18}" text-anchor="middle">${c}</text>`; });
  if (o.y.label) g += `<text class="al" x="${m.l}" y="${m.t - 2}" text-anchor="start">${o.y.label}</text>`;
  if (o.y2) {
    for (const v of o.y2.ticks) g += `<text class="tk" x="${m.l + pw + 6}" y="${sy(o.y2.map(v)) + 4}" text-anchor="start">${o.y2.fmt(v)}</text>`;
  }
  const ctx = { sx, sy, m, pw, ph, bw: pw / cats.length, y0: sy(fsClamp(0, yt.lo, yt.hi)), yt };
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img"${o.aria ? ` aria-label="${fsEsc(o.aria)}"` : ""}><g>${g}</g>${o.layers(ctx)}</svg>`;
}

function fsRect(x, y1, y2, w, color, tip, round) {
  const top = Math.min(y1, y2), h = Math.abs(y2 - y1);
  if (h < 0.4) return "";
  const r = round ? Math.min(3.5, w / 2, h) : 0;
  let d;
  if (round === "top") d = `M${x} ${top + h} V${top + r} Q${x} ${top} ${x + r} ${top} H${x + w - r} Q${x + w} ${top} ${x + w} ${top + r} V${top + h} Z`;
  else if (round === "bottom") d = `M${x} ${top} V${top + h - r} Q${x} ${top + h} ${x + r} ${top + h} H${x + w - r} Q${x + w} ${top + h} ${x + w} ${top + h - r} V${top} Z`;
  else d = `M${x} ${top} H${x + w} V${top + h} H${x} Z`;
  return `<path d="${d}" fill="${color}"${tip ? ` data-tip="${fsEsc(tip)}"` : ""}/>`;
}

/* ------------------------------------------------------------------------------------------ */
/*  Dessins                                                                                   */
/* ------------------------------------------------------------------------------------------ */
const fsWire = (id, d, cls = "") =>
  `<g class="w ${cls}" id="${id}"><path class="wb" d="${d}"/><path class="wg" d="${d}"/><path class="wc" d="${d}"/><path class="wf" d="${d}"/></g>`;

function fsPanel(id, x, y, w, h, key) {
  let cells = "";
  for (let i = 1; i < 6; i++) cells += `<line x1="${x + (w * i) / 6}" y1="${y}" x2="${x + (w * i) / 6}" y2="${y + h}"/>`;
  for (let i = 1; i < 3; i++) cells += `<line x1="${x}" y1="${y + (h * i) / 3}" x2="${x + w}" y2="${y + (h * i) / 3}"/>`;
  const cx = x + w / 2, cy = y + h / 2;
  return `<g id="${id}" class="panel clickable" data-e="${key}"><g transform="translate(${cx} ${cy}) skewX(-12) translate(${-cx} ${-cy})">
    <rect class="pglow" x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="url(#fsPan)" stroke="#8fa3bf" stroke-width="2"/>
    <g class="cells">${cells}</g>
    <rect x="${x + 4}" y="${y + 3}" width="${w * 0.45}" height="${h * 0.18}" rx="3" fill="#fff" opacity=".08"/>
  </g></g>`;
}

function fsSun(cx, cy, r) {
  let rays = "";
  for (let i = 0; i < 8; i++) rays += `<line transform="rotate(${i * 45})" x1="0" y1="${-r - 4}" x2="0" y2="${-r - 10}"/>`;
  return `<g id="sky" class="clickable" data-e="forecast_today" transform="translate(${cx} ${cy})">
    <g id="sun"><g class="rays">${rays}</g><circle r="${r}" class="sunc"/></g>
    <path id="moon" d="M${r * 0.35} ${-r * 0.94} A${r} ${r} 0 1 0 ${r * 0.35} ${r * 0.94} A${r * 1.2} ${r * 1.2} 0 0 1 ${r * 0.35} ${-r * 0.94} Z"/>
  </g>`;
}

function fsPylon(x, y, w, h) {
  const p = (a, b) => `${(x + a * w).toFixed(1)} ${(y + b * h).toFixed(1)}`;
  return `<g class="pylon"><path d="M${p(0.22, 1)} L${p(0.44, 0.05)} L${p(0.56, 0.05)} L${p(0.78, 1)}
    M${p(0.05, 0.22)} H${x + 0.95 * w} M${p(0.14, 0.42)} H${x + 0.86 * w}
    M${p(0.36, 0.42)} L${p(0.6, 0.7)} M${p(0.64, 0.42)} L${p(0.4, 0.7)} M${p(0.3, 0.7)} L${p(0.7, 1)} M${p(0.7, 0.7)} L${p(0.3, 1)}
    M${p(0.42, 0.22)} L${p(0.56, 0.42)} M${p(0.58, 0.22)} L${p(0.44, 0.42)}"/>
    <circle cx="${x + 0.05 * w}" cy="${y + 0.22 * h + 5}" r="2.6"/><circle cx="${x + 0.95 * w}" cy="${y + 0.22 * h + 5}" r="2.6"/>
    <circle cx="${x + 0.14 * w}" cy="${y + 0.42 * h + 5}" r="2.6"/><circle cx="${x + 0.86 * w}" cy="${y + 0.42 * h + 5}" r="2.6"/></g>`;
}

function fsCar(x, y, w) {
  const h = w * 0.4, P = (a, b) => `${(x + a * w).toFixed(1)} ${(y + b * h).toFixed(1)}`;
  const body = `M${P(0, 0.62)} Q${P(0, 0.42)} ${P(0.1, 0.4)} L${P(0.27, 0.36)} L${P(0.39, 0.08)} Q${P(0.42, 0)} ${P(0.5, 0)} L${P(0.72, 0)} Q${P(0.78, 0)} ${P(0.82, 0.1)} L${P(0.92, 0.36)} Q${P(1, 0.4)} ${P(1, 0.56)} L${P(1, 0.76)} Q${P(1, 0.84)} ${P(0.95, 0.84)} L${P(0.05, 0.84)} Q${P(0, 0.84)} ${P(0, 0.76)} Z`;
  const win = `M${P(0.3, 0.36)} L${P(0.41, 0.1)} L${P(0.6, 0.1)} L${P(0.6, 0.36)} Z M${P(0.64, 0.36)} L${P(0.64, 0.1)} L${P(0.76, 0.1)} L${P(0.86, 0.36)} Z`;
  const r = h * 0.17;
  return `<path class="cbody" d="${body}"/><path class="cwin" d="${win}"/>
    <circle class="cwh" cx="${x + 0.22 * w}" cy="${y + 0.84 * h}" r="${r}"/><circle class="cwh" cx="${x + 0.78 * w}" cy="${y + 0.84 * h}" r="${r}"/>
    <path class="bolt" d="M${P(0.52, 0.13)} L${P(0.45, 0.47)} L${P(0.51, 0.47)} L${P(0.47, 0.75)} L${P(0.57, 0.38)} L${P(0.51, 0.38)} Z"/>`;
}

function fsDefs() {
  return `<defs>
    <linearGradient id="fsPan" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2f5a9e"/><stop offset="1" stop-color="#142b52"/></linearGradient>
    <linearGradient id="fsBox" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f1f3f6"/><stop offset="1" stop-color="#c2c9d2"/></linearGradient>
    <linearGradient id="fsGloss" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".2" stop-color="#fff" stop-opacity=".28"/><stop offset=".35" stop-color="#fff" stop-opacity="0"/></linearGradient>
  </defs>`;
}

/* Schéma : layout "wide" (paysage) ou "tall" (portrait / smartphone) — mêmes identifiants */
function fsBuildSVG(layout, t) {
  if (layout === "tall") return fsBuildTall(t);
  const bat = { x: 405, y: 410, w: 100, mh: 52, gap: 6 };
  const gx = 437, gy = 420, gw = 36, gh = 90;
  return `
<svg viewBox="0 0 1100 560" class="L-wide" id="svg" role="img" aria-label="${t("aria")}">${fsDefs()}
  <clipPath id="cGauge"><rect x="${gx}" y="${gy}" width="${gw}" height="${gh}" rx="7"/></clipPath>
  ${fsSun(66, 54, 20)}
  <text id="t_sun" class="sub" x="100" y="60">—</text>

  ${fsWire("f_pv1", "M200 150 H300 V250 H390")}
  ${fsWire("f_pv2", "M200 340 H300 V290 H390")}
  ${fsWire("f_bat", "M455 340 V410")}
  ${fsWire("f_ac", "M520 270 H634")}
  ${fsWire("f_meter", "M646 90 H700")}
  ${fsWire("f_grid", "M770 90 H864")}
  ${fsWire("f_home", "M646 270 H830")}
  ${fsWire("f_ev", "M646 460 H720")}
  <rect class="bus" x="634" y="78" width="12" height="394" rx="6"/>

  <text id="n_pv1" class="nm" x="36" y="100">PV 1</text>
  ${fsPanel("p_pv1", 40, 110, 160, 80, "pv1_power")}
  <text id="t_pv1" class="lbl" x="120" y="216" text-anchor="middle">—</text>
  <text id="t_pv1v" class="sub" x="120" y="238" text-anchor="middle"></text>
  <text id="n_pv2" class="nm" x="36" y="290">PV 2</text>
  ${fsPanel("p_pv2", 40, 300, 160, 80, "pv2_power")}
  <text id="t_pv2" class="lbl" x="120" y="406" text-anchor="middle">—</text>
  <text id="t_pv2v" class="sub" x="120" y="428" text-anchor="middle"></text>
  <text id="t_pvsum" class="pvs" x="300" y="276" text-anchor="middle"></text>

  <g id="inv" class="clickable" data-e="inverter_power">
    <rect x="390" y="200" width="130" height="140" rx="16" fill="url(#fsBox)" stroke="#8994a3" stroke-width="2"/>
    <rect x="390" y="200" width="130" height="140" rx="16" fill="url(#fsGloss)"/>
    <text class="dk sm" x="455" y="230" text-anchor="middle">SUN2000</text>
    <text id="t_inv" class="dk lbl" x="455" y="276" text-anchor="middle">—</text>
    <circle id="led" cx="455" cy="314" r="6"/>
  </g>
  <text id="t_invs" class="sub" x="455" y="188" text-anchor="middle"></text>

  <g id="bat" class="clickable" data-e="battery_soc">
    <rect x="${bat.x}" y="${bat.y}" width="${bat.w}" height="${bat.mh}" rx="10" fill="url(#fsBox)" stroke="#8994a3" stroke-width="2"/>
    <rect x="${bat.x}" y="${bat.y + bat.mh + bat.gap}" width="${bat.w}" height="${bat.mh}" rx="10" fill="url(#fsBox)" stroke="#8994a3" stroke-width="2"/>
    <rect x="${gx}" y="${gy}" width="${gw}" height="${gh}" rx="7" fill="#1a1f26" stroke="#5d6775" stroke-width="1.5"/>
    <g clip-path="url(#cGauge)"><rect id="bfill" x="${gx}" y="${gy + gh}" width="${gw}" height="0"/><rect class="bshine" x="${gx}" y="${gy}" width="${gw}" height="${gh}"/></g>
    <path id="barr" class="barr" d="M455 470 l-8 9 h5 v9 h6 v-9 h5 z"/>
  </g>
  <text id="t_soc" class="big" x="388" y="450" text-anchor="end">—</text>
  <text id="t_batp" class="sub" x="388" y="476" text-anchor="end"></text>
  <text id="t_bats" class="sub" x="388" y="500" text-anchor="end"></text>
  <text id="t_batn" class="nm nc" x="455" y="548" text-anchor="middle"></text>

  <g id="meter" class="clickable" data-e="grid_power">
    <rect x="700" y="62" width="70" height="56" rx="9" fill="#262b33" stroke="#6b7684" stroke-width="2"/>
    <rect x="710" y="72" width="50" height="20" rx="3" fill="#0f1a12" stroke="#2f4a35"/>
    <text class="lcd" x="735" y="87" text-anchor="middle">kWh</text>
    <circle id="mled" cx="735" cy="105" r="3.5"/>
  </g>
  <text id="t_meter" class="sub" x="735" y="140" text-anchor="middle"></text>
  <g id="grid" class="clickable" data-e="grid_power">${fsPylon(864, 30, 70, 116)}</g>
  <text id="t_grid" class="lbl" x="899" y="172" text-anchor="middle">—</text>
  <text id="t_grids" class="sub" x="899" y="194" text-anchor="middle"></text>

  <g id="home" class="clickable" data-e="__home">
    <path class="house" d="M830 262 L905 205 L980 262 V340 H830 Z"/>
    <path class="chim" d="M952 233 V214 H964 V242"/>
  </g>
  <text id="t_home" class="lbl" x="905" y="298" text-anchor="middle">—</text>
  <text id="t_homes" class="sub" x="905" y="322" text-anchor="middle"></text>
  <text id="t_hp" class="sub clickable" data-e="heatpump_power" x="905" y="364" text-anchor="middle"></text>

  <g id="evbox" class="clickable" data-e="ev_state">
    <rect x="720" y="420" width="50" height="82" rx="10" fill="url(#fsBox)" stroke="#8994a3" stroke-width="2"/>
    <circle id="evled" cx="745" cy="448" r="11"/>
    <circle cx="745" cy="448" r="5" fill="#1a1f26"/>
    <path class="cable" d="M770 486 C800 520 812 470 838 478"/>
    <g id="car" transform="translate(0 0)">${fsCar(830, 430, 180)}</g>
  </g>
  <text id="t_ev" class="lbl" x="920" y="418" text-anchor="middle"></text>
  <text id="t_evs" class="sub" x="920" y="526" text-anchor="middle"></text>
  <text id="t_evx" class="sub" x="920" y="548" text-anchor="middle"></text>
</svg>`;
}

function fsBuildTall(t) {
  const gx = 47, gy = 244, gw = 26, gh = 70;
  return `
<svg viewBox="0 0 400 640" class="L-tall" id="svg" role="img" aria-label="${t("aria")}">${fsDefs()}
  <clipPath id="cGauge"><rect x="${gx}" y="${gy}" width="${gw}" height="${gh}" rx="6"/></clipPath>
  ${fsSun(176, 28, 12)}
  <text id="t_sun" class="sub" x="198" y="33">—</text>

  ${fsWire("f_pv1", "M128 134 V206 H185 V240")}
  ${fsWire("f_pv2", "M272 134 V206 H215 V240")}
  ${fsWire("f_bat", "M145 284 H95")}
  ${fsWire("f_ac", "M200 330 V426")}
  ${fsWire("f_meter", "M318 426 V312")}
  ${fsWire("f_grid", "M318 260 V244 H336")}
  ${fsWire("f_home", "M95 434 V470")}
  ${fsWire("f_ev", "M252 434 V470")}
  <rect class="bus" x="60" y="426" width="280" height="8" rx="4"/>

  <text id="n_pv1" class="nm" x="18" y="56">PV 1</text>
  ${fsPanel("p_pv1", 22, 64, 146, 70, "pv1_power")}
  <text id="t_pv1" class="lbl" x="18" y="158">—</text>
  <text id="t_pv1v" class="sub" x="18" y="178"></text>
  <text id="n_pv2" class="nm" x="382" y="56" text-anchor="end">PV 2</text>
  ${fsPanel("p_pv2", 232, 64, 146, 70, "pv2_power")}
  <text id="t_pv2" class="lbl" x="382" y="158" text-anchor="end">—</text>
  <text id="t_pv2v" class="sub" x="382" y="178" text-anchor="end"></text>
  <text id="t_pvsum" class="pvs" x="200" y="194" text-anchor="middle"></text>

  <g id="inv" class="clickable" data-e="inverter_power">
    <rect x="145" y="240" width="110" height="90" rx="14" fill="url(#fsBox)" stroke="#8994a3" stroke-width="2"/>
    <rect x="145" y="240" width="110" height="90" rx="14" fill="url(#fsGloss)"/>
    <text class="dk sm" x="200" y="262" text-anchor="middle">SUN2000</text>
    <text id="t_inv" class="dk lbl" x="200" y="293" text-anchor="middle">—</text>
    <circle id="led" cx="200" cy="314" r="5"/>
  </g>

  <g id="bat" class="clickable" data-e="battery_soc">
    <rect x="25" y="236" width="70" height="40" rx="8" fill="url(#fsBox)" stroke="#8994a3" stroke-width="2"/>
    <rect x="25" y="282" width="70" height="40" rx="8" fill="url(#fsBox)" stroke="#8994a3" stroke-width="2"/>
    <rect x="${gx}" y="${gy}" width="${gw}" height="${gh}" rx="6" fill="#1a1f26" stroke="#5d6775" stroke-width="1.5"/>
    <g clip-path="url(#cGauge)"><rect id="bfill" x="${gx}" y="${gy + gh}" width="${gw}" height="0"/><rect class="bshine" x="${gx}" y="${gy}" width="${gw}" height="${gh}"/></g>
    <path id="barr" class="barr" d="M60 286 l-6 7 h4 v7 h4 v-7 h4 z"/>
  </g>
  <text id="t_soc" class="big" x="60" y="352" text-anchor="middle">—</text>
  <text id="t_batp" class="sub" x="60" y="372" text-anchor="middle"></text>
  <text id="t_bats" class="sub" x="60" y="391" text-anchor="middle"></text>

  <g id="meter" class="clickable" data-e="grid_power">
    <rect x="296" y="260" width="44" height="52" rx="7" fill="#262b33" stroke="#6b7684" stroke-width="2"/>
    <rect x="302" y="268" width="32" height="15" rx="2" fill="#0f1a12" stroke="#2f4a35"/>
    <text class="lcd" x="318" y="279" text-anchor="middle">kWh</text>
    <circle id="mled" cx="318" cy="298" r="3"/>
  </g>
  <g id="grid" class="clickable" data-e="grid_power">${fsPylon(336, 198, 54, 88)}</g>
  <text id="t_grid" class="lbl" x="364" y="352" text-anchor="middle">—</text>
  <text id="t_grids" class="sub" x="364" y="372" text-anchor="middle"></text>

  <g id="home" class="clickable" data-e="__home">
    <path class="house" d="M22 522 L95 470 L168 522 V600 H22 Z"/>
    <path class="chim" d="M140 492 V478 H150 V500"/>
  </g>
  <text id="t_home" class="lbl" x="95" y="555" text-anchor="middle">—</text>
  <text id="t_homes" class="sub" x="95" y="578" text-anchor="middle"></text>
  <text id="t_hp" class="sub clickable" data-e="heatpump_power" x="95" y="624" text-anchor="middle"></text>

  <g id="evbox" class="clickable" data-e="ev_state">
    <rect x="234" y="470" width="36" height="62" rx="8" fill="url(#fsBox)" stroke="#8994a3" stroke-width="2"/>
    <circle id="evled" cx="252" cy="490" r="8"/>
    <circle cx="252" cy="490" r="3.5" fill="#1a1f26"/>
    <path class="cable" d="M270 520 C286 545 292 540 300 540"/>
    <g id="car">${fsCar(292, 516, 100)}</g>
  </g>
  <text id="t_ev" class="lbl" x="342" y="500" text-anchor="middle"></text>
  <text id="t_evs" class="sub" x="318" y="582" text-anchor="middle"></text>
  <text id="t_evx" class="sub" x="318" y="602" text-anchor="middle"></text>
</svg>`;
}

/* ------------------------------------------------------------------------------------------ */
/*  Styles                                                                                    */
/* ------------------------------------------------------------------------------------------ */
const FS_CSS = `
:host{display:block}
ha-card{display:block;overflow:hidden;position:relative;background:var(--fs-bg,radial-gradient(120% 90% at 30% 0%,#1f232a 0%,#15181c 60%,#121417 100%));
  color:#e6e9ee;border-radius:var(--ha-card-border-radius,16px);border:1px solid rgba(255,255,255,.06);
  font-family:var(--ha-font-family-body,var(--paper-font-body1_-_font-family,Roboto,system-ui,sans-serif))}
.hdr{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:14px 16px 4px;flex-wrap:wrap}
.hname{display:flex;align-items:center;gap:12px;flex-wrap:wrap;min-width:0}
.name{font-size:17px;font-weight:600;letter-spacing:.2px}
.subt{font-size:12.5px;color:#9aa3ad;margin-top:2px}
.chips{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
.pill{display:inline-flex;align-items:center;gap:8px;padding:6px 12px 6px 10px;border-radius:999px;font-size:13px;font-weight:600;white-space:nowrap;
  background:color-mix(in srgb,var(--mc,#7d8794) 16%,transparent);color:var(--mc,#7d8794);border:1px solid color-mix(in srgb,var(--mc) 35%,transparent);transition:all .5s}
.pill .dot{width:8px;height:8px;border-radius:50%;background:var(--mc)}
.pill.live .dot{animation:ping 1.8s ease-out infinite}
@keyframes ping{0%{box-shadow:0 0 0 0 color-mix(in srgb,var(--mc) 70%,transparent)}100%{box-shadow:0 0 0 9px transparent}}
.badge{font-size:11.5px;font-weight:600;padding:4px 9px;border-radius:999px;display:none;white-space:nowrap}
.badge.show{display:inline-block}
.badge.warn{color:#ffcf70;border:1px solid rgba(255,207,112,.3);background:rgba(255,207,112,.08)}
.badge.bad{color:#ff8a7a;border:1px solid rgba(255,107,91,.35);background:rgba(255,107,91,.1)}
.badge.info{color:#9fd4ff;border:1px solid rgba(159,212,255,.3);background:rgba(159,212,255,.08)}
.tabs{display:inline-flex;gap:2px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:999px;padding:3px}
.tabs button{font:600 12.5px inherit;font-family:inherit;color:#9aa3ad;background:transparent;border:0;border-radius:999px;padding:5px 12px;cursor:pointer;white-space:nowrap}
.tabs button[aria-selected="true"]{background:rgba(255,255,255,.12);color:#e6e9ee}
.tabs button.hide{display:none}
.tabs button:focus-visible,.seg button:focus-visible,.obtn:focus-visible,.abtn:focus-visible{outline:2px solid #ffc531;outline-offset:2px}
.view{display:none}.view.on{display:block}
.wrap{padding:0 6px}
#svg{width:100%;height:auto;display:block}
.L-tall{max-width:520px;margin:0 auto}
text{paint-order:stroke;stroke:#16191d;stroke-width:4px;stroke-linejoin:round;font-variant-numeric:tabular-nums;fill:#e6e9ee}
.L-wide .lbl{font-size:20px;font-weight:600}.L-wide .big{font-size:26px;font-weight:700}.L-wide .sub{font-size:14.5px}.L-wide .nm{font-size:13.5px}.L-wide .pvs{font-size:15px}
.L-tall .lbl{font-size:16.5px;font-weight:600}.L-tall .big{font-size:20px;font-weight:700}.L-tall .sub{font-size:12.5px}.L-tall .nm{font-size:12px}.L-tall .pvs{font-size:13px}
.L-tall text{stroke-width:3px}
.sub{fill:#9aa3ad}.nm{fill:#c9d1da;font-weight:600;letter-spacing:.8px;text-transform:uppercase}.nm.nc{text-transform:none;letter-spacing:.4px}
.pvs{fill:#ffd66b;font-weight:600}
.dk{fill:#1d2430;stroke:none}.dk.sm{font-size:11px;letter-spacing:1.5px;font-weight:700;fill:#56606e}
.lcd{font-size:10px;fill:#58d68d;stroke:none;font-weight:600}
.L-tall .lcd{font-size:8px}
.clickable{cursor:pointer}.clickable:hover{filter:brightness(1.15)}

/* fils */
.w path{fill:none;stroke-linecap:round;stroke-linejoin:round}
.w .wb{stroke:#0f1215;stroke-width:10}
.w .wg{stroke:var(--c,transparent);stroke-width:14;opacity:0;transition:opacity .6s}
.w .wc{stroke:#39404a;stroke-width:4.5;transition:stroke .6s}
.w .wf{stroke:#fff;stroke-width:5;stroke-dasharray:.1 22;opacity:0}
.w.on .wc{stroke:var(--c)}
.w.on .wg{opacity:.2}
.w.on .wf{opacity:.95;animation:fl var(--spd,1.4s) linear infinite}
.w.rev .wf{animation-direction:reverse}
.L-tall .w .wb{stroke-width:8}.L-tall .w .wc{stroke-width:3.6}.L-tall .w .wf{stroke-width:4;stroke-dasharray:.1 18}.L-tall .w.on .wf{animation-name:flt}
@keyframes fl{to{stroke-dashoffset:-22.1}}
@keyframes flt{to{stroke-dashoffset:-18.1}}
.bus{fill:#2a3038;stroke:#4a525d;stroke-width:1.5}

/* ciel */
#sun .sunc{fill:#ffc531}#sun .rays line{stroke:#ffc531;stroke-width:3;stroke-linecap:round}
#sun{transition:opacity .6s}#sky.on #sun .rays{animation:spin 18s linear infinite}
#sky.night #sun{opacity:0}#moon{fill:#c9d6e3;opacity:0;transition:opacity .6s}#sky.night #moon{opacity:.85}
#sky:not(.on):not(.night) #sun{opacity:.45}
@keyframes spin{to{transform:rotate(360deg)}}

/* panneaux */
.panel .cells line{stroke:#7f9fd6;stroke-width:1;opacity:.45}
.panel .pglow{fill:none;stroke:#ffc531;stroke-width:8;opacity:0;transition:opacity .8s}
.panel.on .pglow{opacity:var(--gl,.4);filter:blur(4px)}

/* onduleur */
#led{fill:#7d8794;transition:fill .5s}
#inv.ok #led{fill:#3ddc84;filter:drop-shadow(0 0 4px #3ddc84)}
#inv.warn #led{fill:#ffb547}#inv.bad #led{fill:#ff6b5b;animation:blink 1s steps(2) infinite}
@keyframes blink{50%{opacity:.2}}

/* batterie */
#bfill{fill:var(--bc,#3ddc84);transition:y .8s,height .8s,fill .6s}
.bshine{fill:url(#fsGloss);opacity:.6}
.barr{fill:#fff;opacity:0}
#bat.chg .barr{opacity:.9;animation:up 1.4s ease-in-out infinite}
#bat.dis .barr{opacity:.9;transform-box:fill-box;transform-origin:center;transform:rotate(180deg);animation:down 1.4s ease-in-out infinite}
@keyframes up{0%{translate:0 6px;opacity:0}40%{opacity:.9}100%{translate:0 -6px;opacity:0}}
@keyframes down{0%{translate:0 -6px;opacity:0}40%{opacity:.9}100%{translate:0 6px;opacity:0}}

/* compteur / réseau */
#mled{fill:#4a525d}#meter.on #mled{fill:var(--gc);animation:blink 1.2s steps(2) infinite}
.pylon path{fill:none;stroke:var(--gc,#7d8794);stroke-width:2.6;stroke-linejoin:round;stroke-linecap:round;transition:stroke .6s}
.pylon circle{fill:var(--gc,#7d8794)}

/* maison */
.house{fill:rgba(255,255,255,.035);stroke:var(--hc,#9aa3ad);stroke-width:2.4;stroke-linejoin:round;transition:stroke .6s,filter .6s}
#home.on .house{filter:drop-shadow(0 0 6px color-mix(in srgb,var(--hc) 45%,transparent))}
.chim{fill:none;stroke:var(--hc,#9aa3ad);stroke-width:2.4;stroke-linejoin:round}

/* borne + voiture */
#evled{fill:#4a525d;transition:fill .5s}
#evbox.st-charge #evled{fill:${FS_COL.ev};animation:pulse 1.6s ease-in-out infinite}
#evbox.st-wait #evled{fill:#ffc531}#evbox.st-plug #evled{fill:#e6e9ee}#evbox.st-fault #evled{fill:#ff6b5b}#evbox.st-ok #evled{fill:#3ddc84}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.45}}
.cable{fill:none;stroke:#2a2f36;stroke-width:4;stroke-linecap:round;opacity:0;transition:opacity .5s}
#evbox.plug .cable{opacity:1}
.cbody{fill:#2a3038;stroke:#5d6775;stroke-width:2;transition:stroke .6s,filter .6s}
.cwin{fill:#141820;stroke:#5d6775;stroke-width:1.2}.cwh{fill:#14171c;stroke:#6b7684;stroke-width:2}
.bolt{fill:${FS_COL.ev};opacity:0}
#evbox.st-charge .cbody{stroke:${FS_COL.ev};filter:drop-shadow(0 0 6px rgba(79,157,255,.5))}
#evbox.st-charge .bolt{opacity:1;animation:pulse 1.4s ease-in-out infinite}
#evbox:not(.plug) #car{opacity:.35}

/* tuiles */
.tiles{display:grid;grid-template-columns:repeat(auto-fit,minmax(128px,1fr));gap:8px;padding:6px 14px 14px}
.tile{background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.06);border-radius:12px;padding:10px 12px;cursor:pointer;transition:background .2s;min-width:0}
.tile:hover{background:rgba(255,255,255,.07)}
.tl{font-size:11.5px;color:#9aa3ad;text-transform:uppercase;letter-spacing:.6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.tv{font-size:21px;font-weight:600;margin-top:3px;font-variant-numeric:tabular-nums;white-space:nowrap}
.tv small{font-size:12.5px;font-weight:500;color:#9aa3ad;margin-left:2px}
.ts{font-size:11.5px;color:#7f8994;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.bar{height:4px;border-radius:2px;background:rgba(255,255,255,.08);margin-top:6px;overflow:hidden}
.bar i{display:block;height:100%;width:0;border-radius:2px;transition:width .8s}
.tall .tiles{grid-template-columns:repeat(2,1fr);padding:4px 10px 12px}.tall .tv{font-size:19px}

/* onglets Optimisation / Récap */
.pane{padding:6px 14px 16px;position:relative;container-type:inline-size}
.obar{display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;margin:4px 2px 12px}
.seg{display:inline-flex;border:1px solid rgba(255,255,255,.1);border-radius:999px;overflow:hidden}
.seg button{font:500 12px inherit;font-family:inherit;color:#9aa3ad;background:transparent;border:0;padding:5px 11px;cursor:pointer}
.seg button[aria-pressed="true"]{background:rgba(255,255,255,.12);color:#e6e9ee}
.obtn{font:500 12px inherit;font-family:inherit;color:#c9d1da;background:transparent;border:1px solid rgba(255,255,255,.12);border-radius:999px;padding:5px 11px;cursor:pointer}
.obtn:disabled{opacity:.35;cursor:default}
.nav{display:inline-flex;align-items:center;gap:8px}.nav .lab{font-size:13px;font-weight:600;min-width:120px;text-align:center}
.omuted{font-size:12px;color:#7f8994}
.ogrid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.opanel{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:14px 14px 10px;min-width:0}
.opanel.wide{grid-column:1/-1}
.ot{font-size:14.5px;font-weight:600;margin:0}.os{font-size:12px;color:#9aa3ad;margin:2px 0 8px}
.ostat{font-size:12.5px;color:#c9d1da;margin:6px 0 2px;font-variant-numeric:tabular-nums}
.ostat.warn{color:#ffcf70}
.leg{display:flex;flex-wrap:wrap;gap:4px 14px;font-size:12px;color:#c9d1da;margin:0 0 6px}
.leg span{display:inline-flex;align-items:center;gap:6px}
.leg i{display:inline-block;width:12px;height:12px;border-radius:3px}
.leg i.ln{height:3px;border-radius:2px}.leg i.dash{height:0;border-top:3px dashed;width:14px;background:none!important}
.chart{width:100%;height:auto;display:block;overflow:visible}
.chart text{paint-order:normal;stroke:none}
.chart .gl{stroke:rgba(255,255,255,.07);stroke-width:1}.chart .gl.z{stroke:rgba(255,255,255,.28)}
.chart .tk{fill:#8b95a0;font-size:11.5px}.chart .al{fill:#9aa3ad;font-size:11px}
.chart .col:hover{fill:rgba(255,255,255,.05)}
.chart .now{stroke:#ffc531;stroke-width:1.4;stroke-dasharray:3 3}
.chart .hc{fill:rgba(159,212,255,.07)}
.kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:8px;margin-bottom:12px}
.kpi{background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.06);border-radius:12px;padding:10px 12px;min-width:0}
.kpi .tv{font-size:20px}
.recs{display:grid;gap:10px;margin-bottom:12px}
.rec{display:grid;grid-template-columns:34px 1fr;gap:12px;align-items:start;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-left:3px solid var(--rc,#7d8794);border-radius:12px;padding:12px 14px}
.rec .ic{width:34px;height:34px;border-radius:10px;display:grid;place-items:center;background:color-mix(in srgb,var(--rc) 16%,transparent)}
.rec .ic svg{width:20px;height:20px;fill:none;stroke:var(--rc);stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.rh{font-size:11.5px;letter-spacing:.7px;text-transform:uppercase;color:var(--rc);font-weight:600}
.rv{font-size:15.5px;font-weight:600;margin-top:2px;line-height:1.3}
.rt{font-size:12.5px;color:#aeb7c1;margin-top:4px;line-height:1.45}
.ra{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-top:10px}
.abtn{font:600 12.5px inherit;font-family:inherit;border-radius:9px;padding:7px 12px;cursor:pointer;border:1px solid color-mix(in srgb,var(--rc) 55%,transparent);background:color-mix(in srgb,var(--rc) 16%,transparent);color:#f2f4f7}
.abtn.sec{background:transparent;border-color:rgba(255,255,255,.18);color:#c9d1da}
.cfm{margin-top:10px;padding:10px 12px;border-radius:10px;background:rgba(255,207,112,.08);border:1px solid rgba(255,207,112,.3);font-size:13px}
.omsg{font-size:12.5px;margin-top:8px}.omsg.ok{color:#6fdc8c}.omsg.err{color:#ff7a6b}
.onote{font-size:12px;color:#7f8994;padding:18px 4px;text-align:center}
.split{margin:6px 0 12px}
.split .sl{display:flex;justify-content:space-between;font-size:12.5px;color:#c9d1da;margin-bottom:4px;gap:8px}
.split .sb{display:flex;height:14px;border-radius:7px;overflow:hidden;background:rgba(255,255,255,.06)}
.split .sb i{display:block;height:100%}
.split .sk{display:flex;flex-wrap:wrap;gap:4px 14px;font-size:11.5px;color:#9aa3ad;margin-top:5px}
.split .sk b{color:#e6e9ee;font-weight:600}
.vtip{position:absolute;pointer-events:none;background:#0d0f12;border:1px solid rgba(255,255,255,.14);color:#e6e9ee;font-size:12px;
  padding:6px 9px;border-radius:8px;white-space:pre;z-index:5;box-shadow:0 6px 20px rgba(0,0,0,.4);display:none;line-height:1.4}
@container (max-width:720px){.ogrid{grid-template-columns:1fr}.pgrid{grid-template-columns:1fr}}
.tabs{max-width:100%;overflow-x:auto;scrollbar-width:none}
.autob{display:none;align-items:center;gap:7px;font:600 12.5px inherit;font-family:inherit;padding:5px 12px 5px 10px;border-radius:999px;cursor:pointer;
  background:transparent;color:#9aa3ad;border:1px dashed rgba(255,255,255,.22);transition:all .3s}
.autob.show{display:inline-flex}.autob .dot{width:8px;height:8px;border-radius:50%;background:#5d6570}
.autob[aria-pressed="true"]{color:#6fdc8c;border:1px solid rgba(111,220,140,.45);background:rgba(111,220,140,.1)}
.autob[aria-pressed="true"] .dot{background:#6fdc8c;box-shadow:0 0 6px #6fdc8c}
.autob:focus-visible{outline:2px solid #6fdc8c;outline-offset:2px}
.pban{display:none;align-items:center;gap:10px;margin:2px 14px 6px;padding:9px 12px;border-radius:12px;cursor:pointer;font-size:13px;
  background:color-mix(in srgb,var(--pc,#7d8794) 10%,transparent);border:1px solid color-mix(in srgb,var(--pc,#7d8794) 30%,transparent);color:#e6e9ee}
.pban.show{display:flex}.pban .pdot{width:9px;height:9px;border-radius:50%;background:var(--pc);flex:none}
.pban.live .pdot{animation:ping 1.8s ease-out infinite;--mc:var(--pc)}
.pban #pban_t{flex:1;min-width:0}.pban .pgo{color:#9aa3ad;font-size:18px;line-height:1}
.phead{display:grid;grid-template-columns:auto 1fr;gap:14px;align-items:center;margin:4px 0 12px;padding:14px;border-radius:14px;
  background:color-mix(in srgb,var(--pc,#7d8794) 8%,transparent);border:1px solid color-mix(in srgb,var(--pc,#7d8794) 28%,transparent)}
.bigauto{display:flex;flex-direction:column;align-items:center;gap:6px;min-width:96px;padding:12px 14px;border-radius:14px;cursor:pointer;font:600 13px inherit;font-family:inherit;
  color:#c9d1da;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.12);transition:all .3s}
.bigauto svg{width:30px;height:30px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
.bigauto .bs{font-size:11.5px;font-weight:500;color:#9aa3ad}
.bigauto[aria-pressed="true"]{color:#6fdc8c;background:rgba(111,220,140,.12);border-color:rgba(111,220,140,.5)}
.bigauto[aria-pressed="true"] .bs{color:#6fdc8c}
.bigauto:focus-visible{outline:2px solid #6fdc8c;outline-offset:2px}
.pst .rh{color:var(--pc)}
.pgrid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.pset{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:12px 14px;min-width:0}
.pset h4{margin:0 0 8px;font-size:12px;letter-spacing:.7px;text-transform:uppercase;color:#9aa3ad;font-weight:600}
.prow{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:7px 0;border-top:1px solid rgba(255,255,255,.05);font-size:13px;color:#c9d1da;min-height:34px}
.prow:first-of-type{border-top:0}
.prow .pl{flex:1;min-width:0;line-height:1.3}
.prow.dis{opacity:.45}
.ptimes{display:flex;align-items:center;gap:6px;color:#7f8994}
.pin{font:500 13px inherit;font-family:inherit;color:#e6e9ee;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);border-radius:8px;padding:5px 8px;color-scheme:dark}
.pin[type=number]{width:72px;text-align:right}.pin:focus{outline:2px solid #ffc531;outline-offset:1px}
.punit{font-size:12px;color:#7f8994;min-width:22px}
.pnum{display:flex;align-items:center;gap:5px}
.sw{position:relative;width:40px;height:22px;border-radius:999px;border:0;cursor:pointer;background:rgba(255,255,255,.16);flex:none;transition:background .25s;padding:0}
.sw::after{content:"";position:absolute;top:3px;left:3px;width:16px;height:16px;border-radius:50%;background:#e6e9ee;transition:transform .25s}
.sw[aria-checked="true"]{background:#3dbb78}.sw[aria-checked="true"]::after{transform:translateX(18px)}
.sw:focus-visible{outline:2px solid #ffc531;outline-offset:2px}
.pnote{font-size:11.5px;color:#7f8994;margin-top:2px;line-height:1.4}
.phow{font-size:12.5px;color:#9aa3ad;line-height:1.5;margin-top:12px}
@container (max-width:720px){.pgrid{grid-template-columns:1fr}}
@container (max-width:420px){.phead{grid-template-columns:1fr}.bigauto{flex-direction:row;justify-content:center}.prow{flex-wrap:wrap}.prow:not(.psw) .pl{flex-basis:100%}.ptimes,.pnum,.prow select{margin-left:auto}}
@container (max-width:420px){.opanel{padding:12px 10px 8px}.kpis{grid-template-columns:repeat(2,1fr)}.rec{grid-template-columns:1fr}.rec .ic{display:none}.nav .lab{min-width:90px}}
.tall .hdr{padding:12px 12px 4px}.tall .tabs button{padding:6px 11px}
@media (prefers-reduced-motion: reduce){*{animation-duration:0s!important;animation-iteration-count:1!important}}
`;

/* ------------------------------------------------------------------------------------------ */
/*  Traductions                                                                               */
/* ------------------------------------------------------------------------------------------ */
const FS_I18N = {
  fr: {
    default_title: "FusionSolar", aria: "Flux d'énergie de l'installation solaire",
    tab_flow: "Flux", tab_opt: "Optimisation", tab_rec: "Récap", tab_pil: "Pilotage",
    r_bat_pilot: "Mode auto actif : il charge jusqu'à {c} % en heures creuses si besoin",
    pil_missing: "Les entités du pilotage automatique sont introuvables dans Home Assistant (voir README, section Pilotage).",
    pil_auto: "Mode auto", pil_on: "Activé", pil_off: "Désactivé",
    pil_st: { off: "Mode auto désactivé", attente: "En attente des heures creuses", charge: "Charge de la batterie depuis le réseau",
      ve: "VE en charge : la batterie alimente la maison seule", preserve: "Heures creuses : batterie gardée pour la suite", hc: "Heures creuses : la batterie suffit" },
    pil_d_off: "Active le mode auto pour gérer la batterie et la recharge en heures creuses. Tant qu'il est actif, les anciennes automatisations de charge HC sont désactivées.",
    pil_d_attente: "Prochaine plage {a}–{b} · cible prévue {c} % (batterie {soc} %)",
    pil_d_charge: "Jusqu'à {c} % à {p} · batterie {soc} % · fin de plage {b}",
    pil_d_ve: "Décharge limitée à {w}, soit la consommation de la maison : la voiture charge sur le réseau, la maison reste sur la batterie.",
    pil_d_preserve: "Batterie ({soc} %) au niveau nécessaire jusqu'à la prochaine plage ({c} %) : la maison passe sur le réseau au tarif creux jusqu'à {b}.",
    pil_d_hc: "Batterie à {soc} %, au-dessus du niveau nécessaire ({c} %) : elle alimente la maison, pas de réseau · fin de plage {b}",
    pil_auto_off_warn: "L'automatisation de pilotage est désactivée dans Home Assistant : le mode auto n'agit pas.",
    pk_target: "Cible", pk_target_s: "besoin {k} kWh jusqu'à la prochaine plage", pk_soc: "Batterie", pk_win: "Plage", pk_win_cur: "en cours, fin {b}", pk_win_next: "prochaine",
    pk_block: "Décharge", pk_block_on: "bloquée", pk_block_off: "normale", pk_block_lim: "limitée", pk_block_on_s: "batterie insuffisante", pk_block_lim_s: "maison seule (VE en charge)",
    ps_hc: "Heures creuses", ps_hc1: "Plage 1", ps_hc2: "Plage 2",
    ps_bat: "Charge de la batterie", ps_charge: "Charger la batterie en heures creuses si nécessaire",
    ps_mode: "Calcul de la cible", ps_modes: { "Prévision": "Selon prévision solaire", "Fixe": "Valeur fixe" },
    ps_fixed: "Cible fixe", ps_max: "Cible maximale", ps_margin: "Marge de sécurité", ps_power: "Puissance de charge réseau",
    ps_prot: "Protection de la batterie", ps_preserve: "En heures creuses, garder la batterie dès qu'elle descend au niveau nécessaire pour la suite",
    ps_protect_ev: "Quand le véhicule charge, la batterie alimente la maison mais pas la voiture", ps_dis: "Puissance de décharge normale",
    ps_ev: "Véhicule", ps_ev_hc: "Lancer la recharge du véhicule au début des heures creuses",
    ps_ev_note: "Laisse cette option coupée si d'autres automatisations gèrent déjà la recharge de nuit.",
    ps_est: "Estimation de la consommation", ps_src: "Consommation de la maison", ps_srcs: { "Moyenne du mois": "Moyenne du mois (hors VE)", "Valeur fixe": "Valeur fixe" },
    ps_day: "Consommation par jour", ps_pvf: "Part du solaire prévu prise en compte", ps_cap: "Capacité de la batterie",
    ps_how: "Comment ça marche : à chaque plage creuse, le pilotage estime l'énergie dont la maison aura besoin entre la fin de la plage et la plage suivante (consommation moyenne moins le solaire prévu par Solcast) et en déduit le niveau de batterie nécessaire. Si la batterie est au-dessus, elle alimente la maison normalement : aucun achat au réseau. Elle ne passe la main au réseau (tarif creux) qu'une fois descendue à ce niveau, et n'est chargée depuis le réseau que si elle est en dessous. Quand le véhicule charge, la décharge est limitée à la consommation de la maison : la voiture prend le réseau, la maison reste sur la batterie.",
    st_selfuse: "Autoconsommation", st_export: "Surplus injecté", st_mixed: "Solaire + réseau", st_battery: "Sur batterie",
    st_gridchg: "Charge batterie réseau", st_grid: "Réseau", st_idle: "Veille",
    inv_ok: "Raccordé", inv_standby: "Veille", inv_off: "Arrêt", inv_fault: "Défaut",
    b_alarm: "Alarme onduleur", b_evoff: "Borne hors ligne", b_forced: "Charge forcée", b_gridchg: "Charge réseau",
    pv: "PV", total_pv: "{w} solaire", fc_now: "Prévu {w}", fc_tomorrow: "Demain {k} kWh",
    charge: "charge", discharge: "décharge", rest: "au repos", empty_in: "≈ {d} d'autonomie", full_at: "pleine vers {h}",
    import: "Import", export: "Export", balance: "Équilibre", fossil: "{p} % fossile",
    home: "Maison", home_ev: "Maison · hors VE", hp_part: "dont PAC {w}",
    ev_session: "Session {k} kWh · {d}",
    ev_states: { standby: "En veille", plugged: "Branché", scheduled_waiting: "Programmée", charging: "En charge", charging_ended: "Charge terminée", fault: "Défaut",
      orderly_waiting: "En attente", upgrading: "Mise à jour", charging_starting: "Démarrage", alarm: "Alarme", green_waiting: "Attend le solaire", green_charging: "Charge solaire" },
    ev_modes: { pv_preferred: "Solaire prioritaire", normal: "Normal" },
    bat_modes: { adaptive: "Adaptatif", fixed_charge_discharge: "Charge/décharge fixe", maximise_self_consumption: "Autoconsommation max.",
      fully_fed_to_grid: "Injection totale", time_of_use_luna2000: "Heures creuses (TOU)", third_party_control: "Contrôle externe" },
    k_prod: "Production", k_prod_s: "pic {w} · prévu {k} kWh", k_self: "Autoconsommation", k_self_s: "autosuffisance {p} %",
    k_bat: "Batterie", k_bat_s: "+{c} / −{d} kWh", k_grid: "Réseau", k_grid_s: "import · export {e} kWh", k_cons: "Consommation", k_cons_s: "dont VE {e} kWh",
    k_fc: "Demain", k_fc_s: "reste aujourd'hui {k} kWh", k_cost: "≈ {e} €",
    loading: "Chargement de l'historique…", refresh: "Actualiser", updated: "Mis à jour à {t}", d: "{n} j",
    nodata: "Pas de statistiques pour : {e}", nodata_short: "Pas assez de données", hour: "{h} h",
    // optimisation
    kp_self: "Autoconsommation", kp_self_s: "{k} kWh solaire utilisés", kp_auto: "Autosuffisance", kp_auto_s: "{k} kWh du réseau",
    kp_save: "Économie estimée", kp_save_s: "au prix actuel", kp_cyc: "Cycles batterie", kp_cyc_s: "rendement ≈ {e} %",
    kp_ev: "VE au solaire", kp_ev_s: "{k} kWh chargés", kp_exp: "Injecté", kp_exp_s: "{p} % de la production",
    r_bat: "Batterie cette nuit", r_ev: "Recharge VE", r_hp: "Eau chaude PAC", r_waste: "Charge réseau", r_exp: "Injection", r_mode: "Mode batterie",
    r_bat_none: "Pas de charge réseau nécessaire cette nuit",
    r_bat_none_t: "Le solaire prévu ({pv} kWh) et la batterie ({soc} % au début des heures creuses) devraient couvrir la consommation estimée ({load} kWh) jusqu'aux prochaines heures creuses. Laisse la place au soleil.",
    r_bat_full: "Le soleil remplira la batterie demain vers {h} : une charge réseau serait en grande partie injectée ensuite.",
    r_bat_chg: "Charger jusqu'à {t} % pendant les heures creuses ({a}–{b})",
    r_bat_chg_t: "Sans charge, ≈ {imp} kWh seraient achetés en heures pleines avant que le solaire ne prenne le relais (prévu {pv} kWh). Charger ≈ {k} kWh la nuit évite ≈ {sav} kWh d'achat en heures pleines{exp}.",
    r_bat_chg_x: ", pour ≈ {e} kWh d'injection en plus",
    r_bat_noff: "Indique tes heures creuses (option offpeak) pour obtenir un conseil de charge nocturne.",
    r_bat_now: "Seuil de charge réseau actuel : {c} %", r_bat_auto: "Automatisation heures creuses : {s}",
    r_bat_act: "Régler le seuil de charge réseau à {t} %", r_bat_cfm: "Régler « SOC de coupure de charge réseau » de {f} % à {t} % ?",
    on: "activée", off: "désactivée",
    r_ev_win: "Meilleur créneau solaire : {day} {a}–{b}", r_ev_win_t: "≈ {k} kWh de surplus au-dessus de la consommation de la maison (≥ {p} kW). Mode actuel : {m}.",
    r_ev_none: "Peu de surplus solaire prévu", r_ev_none_t: "Aucune heure avec ≥ {p} kW de surplus d'ici demain soir : si le véhicule doit être chargé, fais-le en heures creuses. Mode actuel : {m}.",
    r_ev_act: "Passer en « {m} »", r_ev_cfm: "Passer la borne de « {f} » à « {t} » ?",
    today: "aujourd'hui", tomorrow: "demain",
    r_hp_t: "Programme la production d'eau chaude vers {a} ({day}) : le surplus prévu (≈ {k} kWh) couvre une chauffe ECS sans acheter au réseau.",
    r_hp_none: "Pas de fenêtre solaire suffisante : garde la chauffe ECS en heures creuses.",
    r_waste_bad: "{k} kWh achetés la nuit pour rien", r_waste_bad_t: "Sur {n} jours, la batterie a été chargée depuis le réseau puis ≈ {k} kWh ont été injectés le lendemain. Ces jours-là, le soleil aurait suffi : vérifie les conditions de ta charge heures creuses.",
    r_waste_ok: "Aucune charge réseau inutile", r_waste_ok_t: "Sur la période, les charges nocturnes ont été utilisées avant d'injecter du solaire.",
    r_exp_v: "{k} kWh injectés ({p} % de la production)", r_exp_t: "Le surplus arrive surtout entre {a} et {b}. Décale-y lave-linge, lave-vaisselle, recharge VE ou chauffe ECS{loss}.",
    r_exp_loss: " ; écart avec le prix d'achat ≈ {e} €", r_exp_ok: "Peu d'injection : le solaire est bien utilisé ({p} %).",
    r_mode_v: "Mode actuel : {m}", r_mode_t: "{c} cycle(s) par jour en moyenne, rendement aller-retour ≈ {e} % (charge {ci} kWh, décharge {di} kWh).",
    r_mode_warn: "Hors heures creuses, le mode « Autoconsommation max. » valorise mieux le solaire.",
    r_mode_act: "Revenir en autoconsommation max.", r_mode_cfm: "Passer la batterie de « {f} » à « Autoconsommation max. » ?",
    confirm: "Confirmer", cancel: "Annuler", applied: "Réglage envoyé.", apply_err: "Échec : {e}",
    fc_title: "Prévision et batterie simulée", fc_sub: "Solcast heure par heure, consommation type de la maison (hors VE) et état de charge simulé",
    fc_pv: "Solaire prévu", fc_load: "Conso type", fc_soc: "Batterie simulée", fc_hc: "Heures creuses", y_kwh_h: "kWh/h",
    fc_stats: "Prévu {pv} kWh · conso estimée {load} kWh · achat ≈ {imp} kWh · injection ≈ {exp} kWh",
    prof_title: "Profil horaire type", prof_sub: "Moyenne par heure sur la période : production et consommation (hors VE)",
    prof_stats: "Consommation hors soleil ≈ {n} kWh par nuit · batterie utile {u} kWh",
    str_title: "Strings PV", str_sub: "Puissance horaire des deux strings sur 3 jours",
    str_stats: "{a} : {ea} kWh · {b} : {eb} kWh · rapport {r}",
    day_title: "Taux par jour", day_sub: "Autoconsommation et autosuffisance quotidiennes",
    // récap
    p_day: "Jour", p_week: "Semaine", p_month: "Mois", p_year: "Année",
    rc_prod: "Production", rc_cons: "Consommation", rc_self: "Autoconsommation", rc_auto: "Autosuffisance",
    rc_imp: "Achat réseau", rc_exp: "Injection", rc_bat: "Batterie", rc_ev: "Recharge VE", rc_hp: "Pompe à chaleur", rc_save: "Économie",
    rc_bat_s: "chargée {c} · déchargée {d} kWh", rc_ev_s: "≈ {p} % solaire", rc_hp_s: "{p} % de la conso", rc_save_s: "solaire consommé × prix",
    rc_cost: "≈ {e} €", rc_exp_s: "≈ {e} € de rachat",
    sp_prod: "Où va la production", sp_cons: "D'où vient la consommation",
    s_direct: "Maison", s_tobat: "Batterie", s_exp: "Réseau", s_fpv: "Solaire", s_fbat: "Batterie", s_fgrid: "Réseau", s_gridbat: "dont {k} kWh réseau → batterie",
    mir_title: "Production et consommation", mir_sub: "Au-dessus : destination du solaire · en dessous : origine de la consommation",
    until: "jusqu'à {h}",
  },
  en: {
    default_title: "FusionSolar", aria: "Solar installation energy flow",
    tab_flow: "Flow", tab_opt: "Optimization", tab_rec: "Summary", tab_pil: "Control",
    r_bat_pilot: "Auto mode on: it charges up to {c}% off-peak when needed",
    pil_missing: "Auto control entities were not found in Home Assistant (see README, Control section).",
    pil_auto: "Auto mode", pil_on: "On", pil_off: "Off",
    pil_st: { off: "Auto mode off", attente: "Waiting for off-peak hours", charge: "Charging battery from the grid",
      ve: "EV charging: battery powers the home only", preserve: "Off-peak: battery kept for later", hc: "Off-peak: battery is enough" },
    pil_d_off: "Turn on auto mode to manage the battery and charging during off-peak hours. While it is on, the old off-peak charging automations are disabled.",
    pil_d_attente: "Next window {a}–{b} · planned target {c}% (battery {soc}%)",
    pil_d_charge: "Up to {c}% at {p} · battery {soc}% · window ends {b}",
    pil_d_ve: "Discharge limited to {w}, the home's consumption: the car charges from the grid, the home stays on the battery.",
    pil_d_preserve: "Battery ({soc}%) at the level needed until the next window ({c}%): the home runs on off-peak grid power until {b}.",
    pil_d_hc: "Battery at {soc}%, above the level needed ({c}%): it powers the home, no grid · window ends {b}",
    pil_auto_off_warn: "The control automation is disabled in Home Assistant: auto mode has no effect.",
    pk_target: "Target", pk_target_s: "{k} kWh needed until the next window", pk_soc: "Battery", pk_win: "Window", pk_win_cur: "active, ends {b}", pk_win_next: "next",
    pk_block: "Discharge", pk_block_on: "blocked", pk_block_off: "normal", pk_block_lim: "limited", pk_block_on_s: "battery insufficient", pk_block_lim_s: "home only (EV charging)",
    ps_hc: "Off-peak hours", ps_hc1: "Window 1", ps_hc2: "Window 2",
    ps_bat: "Battery charging", ps_charge: "Charge the battery off-peak when needed",
    ps_mode: "Target calculation", ps_modes: { "Prévision": "From solar forecast", "Fixe": "Fixed value" },
    ps_fixed: "Fixed target", ps_max: "Maximum target", ps_margin: "Safety margin", ps_power: "Grid charging power",
    ps_prot: "Battery protection", ps_preserve: "Off-peak, keep the battery once it drops to the level needed for later",
    ps_protect_ev: "While the car charges, the battery powers the home but not the car", ps_dis: "Normal discharge power",
    ps_ev: "Vehicle", ps_ev_hc: "Start car charging at the beginning of off-peak hours",
    ps_ev_note: "Leave this off if your own night charging automations stay active.",
    ps_est: "Consumption estimate", ps_src: "Home consumption", ps_srcs: { "Moyenne du mois": "Monthly average (excl. EV)", "Valeur fixe": "Fixed value" },
    ps_day: "Consumption per day", ps_pvf: "Share of forecast solar counted", ps_cap: "Battery capacity",
    ps_how: "How it works: for each off-peak window, the control estimates the energy the home will need between the end of the window and the next one (average consumption minus Solcast forecast solar) and derives the battery level needed. Above that level the battery powers the home as usual: nothing is bought from the grid. It hands over to the (off-peak) grid only once it drops to that level, and is charged from the grid only when below it. While the car charges, discharge is limited to the home's consumption: the car uses the grid, the home stays on the battery.",
    st_selfuse: "Self-consumption", st_export: "Exporting surplus", st_mixed: "Solar + grid", st_battery: "On battery",
    st_gridchg: "Grid charging battery", st_grid: "Grid", st_idle: "Idle",
    inv_ok: "On-grid", inv_standby: "Standby", inv_off: "Off", inv_fault: "Fault",
    b_alarm: "Inverter alarm", b_evoff: "Charger offline", b_forced: "Forced charge", b_gridchg: "Grid charge",
    pv: "PV", total_pv: "{w} solar", fc_now: "Forecast {w}", fc_tomorrow: "Tomorrow {k} kWh",
    charge: "charging", discharge: "discharging", rest: "idle", empty_in: "≈ {d} left", full_at: "full around {h}",
    import: "Import", export: "Export", balance: "Balanced", fossil: "{p}% fossil",
    home: "Home", home_ev: "Home · excl. EV", hp_part: "incl. heat pump {w}",
    ev_session: "Session {k} kWh · {d}",
    ev_states: { standby: "Standby", plugged: "Plugged in", scheduled_waiting: "Scheduled", charging: "Charging", charging_ended: "Charge complete", fault: "Fault",
      orderly_waiting: "Waiting", upgrading: "Updating", charging_starting: "Starting", alarm: "Alarm", green_waiting: "Waiting for solar", green_charging: "Solar charging" },
    ev_modes: { pv_preferred: "PV preferred", normal: "Normal" },
    bat_modes: { adaptive: "Adaptive", fixed_charge_discharge: "Fixed charge/discharge", maximise_self_consumption: "Max. self-consumption",
      fully_fed_to_grid: "Fully fed to grid", time_of_use_luna2000: "Time of use", third_party_control: "Third-party control" },
    k_prod: "Production", k_prod_s: "peak {w} · forecast {k} kWh", k_self: "Self-consumption", k_self_s: "self-sufficiency {p}%",
    k_bat: "Battery", k_bat_s: "+{c} / −{d} kWh", k_grid: "Grid", k_grid_s: "import · export {e} kWh", k_cons: "Consumption", k_cons_s: "incl. EV {e} kWh",
    k_fc: "Tomorrow", k_fc_s: "{k} kWh left today", k_cost: "≈ €{e}",
    loading: "Loading history…", refresh: "Refresh", updated: "Updated at {t}", d: "{n} d",
    nodata: "No statistics for: {e}", nodata_short: "Not enough data", hour: "{h}:00",
    kp_self: "Self-consumption", kp_self_s: "{k} kWh of solar used", kp_auto: "Self-sufficiency", kp_auto_s: "{k} kWh from grid",
    kp_save: "Estimated savings", kp_save_s: "at current price", kp_cyc: "Battery cycles", kp_cyc_s: "efficiency ≈ {e}%",
    kp_ev: "EV on solar", kp_ev_s: "{k} kWh charged", kp_exp: "Exported", kp_exp_s: "{p}% of production",
    r_bat: "Battery tonight", r_ev: "EV charging", r_hp: "Heat pump hot water", r_waste: "Grid charging", r_exp: "Export", r_mode: "Battery mode",
    r_bat_none: "No grid charge needed tonight",
    r_bat_none_t: "Forecast solar ({pv} kWh) and the battery ({soc}% at the start of off-peak) should cover the estimated consumption ({load} kWh) until the next off-peak window. Leave room for the sun.",
    r_bat_full: "The sun should fill the battery tomorrow around {h}: grid charge would mostly be exported later.",
    r_bat_chg: "Charge up to {t}% during off-peak ({a}–{b})",
    r_bat_chg_t: "Without charging, ≈ {imp} kWh would be bought at peak rate before solar takes over ({pv} kWh forecast). Charging ≈ {k} kWh overnight avoids ≈ {sav} kWh of peak purchases{exp}.",
    r_bat_chg_x: ", for ≈ {e} kWh more exported",
    r_bat_noff: "Set your off-peak hours (offpeak option) to get an overnight charging recommendation.",
    r_bat_now: "Current grid charge cut-off: {c}%", r_bat_auto: "Off-peak automation: {s}",
    r_bat_act: "Set grid charge cut-off to {t}%", r_bat_cfm: "Change “grid charge cut-off SOC” from {f}% to {t}%?",
    on: "on", off: "off",
    r_ev_win: "Best solar window: {day} {a}–{b}", r_ev_win_t: "≈ {k} kWh of surplus above home consumption (≥ {p} kW). Current mode: {m}.",
    r_ev_none: "Little solar surplus expected", r_ev_none_t: "No hour with ≥ {p} kW of surplus before tomorrow night: if the car needs charging, do it off-peak. Current mode: {m}.",
    r_ev_act: "Switch to “{m}”", r_ev_cfm: "Switch the charger from “{f}” to “{t}”?",
    today: "today", tomorrow: "tomorrow",
    r_hp_t: "Schedule hot water around {a} ({day}): the forecast surplus (≈ {k} kWh) covers a DHW cycle without buying from the grid.",
    r_hp_none: "No sufficient solar window: keep hot water heating off-peak.",
    r_waste_bad: "{k} kWh bought overnight for nothing", r_waste_bad_t: "Over {n} days, the battery was charged from the grid and ≈ {k} kWh were then exported the next day. The sun would have been enough on those days: check your off-peak charging conditions.",
    r_waste_ok: "No wasted grid charging", r_waste_ok_t: "Over the period, overnight charges were used before exporting solar.",
    r_exp_v: "{k} kWh exported ({p}% of production)", r_exp_t: "Surplus mostly comes between {a} and {b}. Shift washing machine, dishwasher, EV charging or hot water there{loss}.",
    r_exp_loss: "; gap with purchase price ≈ €{e}", r_exp_ok: "Little export: solar is well used ({p}%).",
    r_mode_v: "Current mode: {m}", r_mode_t: "{c} cycle(s) per day on average, round-trip efficiency ≈ {e}% (charged {ci} kWh, discharged {di} kWh).",
    r_mode_warn: "Outside off-peak hours, “Max. self-consumption” makes better use of solar.",
    r_mode_act: "Back to max. self-consumption", r_mode_cfm: "Switch the battery from “{f}” to “Max. self-consumption”?",
    confirm: "Confirm", cancel: "Cancel", applied: "Setting sent.", apply_err: "Failed: {e}",
    fc_title: "Forecast and simulated battery", fc_sub: "Hourly Solcast forecast, typical home consumption (excl. EV) and simulated state of charge",
    fc_pv: "Forecast solar", fc_load: "Typical load", fc_soc: "Simulated battery", fc_hc: "Off-peak", y_kwh_h: "kWh/h",
    fc_stats: "Forecast {pv} kWh · estimated load {load} kWh · purchase ≈ {imp} kWh · export ≈ {exp} kWh",
    prof_title: "Typical hourly profile", prof_sub: "Hourly average over the period: production and consumption (excl. EV)",
    prof_stats: "Consumption outside sun hours ≈ {n} kWh per night · usable battery {u} kWh",
    str_title: "PV strings", str_sub: "Hourly power of both strings over 3 days",
    str_stats: "{a}: {ea} kWh · {b}: {eb} kWh · ratio {r}",
    day_title: "Daily rates", day_sub: "Daily self-consumption and self-sufficiency",
    p_day: "Day", p_week: "Week", p_month: "Month", p_year: "Year",
    rc_prod: "Production", rc_cons: "Consumption", rc_self: "Self-consumption", rc_auto: "Self-sufficiency",
    rc_imp: "Grid purchase", rc_exp: "Export", rc_bat: "Battery", rc_ev: "EV charging", rc_hp: "Heat pump", rc_save: "Savings",
    rc_bat_s: "charged {c} · discharged {d} kWh", rc_ev_s: "≈ {p}% solar", rc_hp_s: "{p}% of consumption", rc_save_s: "solar used × price",
    rc_cost: "≈ €{e}", rc_exp_s: "≈ €{e} feed-in",
    sp_prod: "Where production goes", sp_cons: "Where consumption comes from",
    s_direct: "Home", s_tobat: "Battery", s_exp: "Grid", s_fpv: "Solar", s_fbat: "Battery", s_fgrid: "Grid", s_gridbat: "incl. {k} kWh grid → battery",
    mir_title: "Production and consumption", mir_sub: "Above: where solar goes · below: where consumption comes from",
    until: "until {h}",
  },
};

const FS_ICONS = {
  bat: `<svg viewBox="0 0 24 24"><rect x="6" y="4" width="12" height="17" rx="2"/><path d="M10 2h4M12 9l-2 4h4l-2 4"/></svg>`,
  ev: `<svg viewBox="0 0 24 24"><path d="M3 16v-4l2-5h10l3 5h2v4H3z"/><circle cx="7" cy="16.5" r="1.8"/><circle cx="17" cy="16.5" r="1.8"/><path d="M13 3l-2 3h3l-2 3"/></svg>`,
  hp: `<svg viewBox="0 0 24 24"><path d="M12 3c3 4 5 6.5 5 10a5 5 0 0 1-10 0c0-3.5 2-6 5-10z"/></svg>`,
  waste: `<svg viewBox="0 0 24 24"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></svg>`,
  exp: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2"/></svg>`,
  mode: `<svg viewBox="0 0 24 24"><path d="M4 12a8 8 0 0 1 14-5l2-2v6h-6l2.5-2.5A5.5 5.5 0 1 0 17.5 13"/></svg>`,
};

/* ------------------------------------------------------------------------------------------ */
/*  Carte principale                                                                          */
/* ------------------------------------------------------------------------------------------ */
class FusionSolarCard extends HTMLElement {
  static getStubConfig() { return {}; }

  setConfig(config) {
    this._config = Object.assign({
      battery_capacity: 10, pv1_name: null, pv2_name: null, pv1_peak: null, pv2_peak: null,
      ev_min_power: 1400, heatpump_min_power: 1000, offpeak: [], export_price: null,
      optimization_days: 14, layout: "auto", show_header: true, show_stats: true,
      show_optimization: true, show_recap: true, entities: {},
    }, config || {});
    this._map = null;
    this._offCfg = fsParseOffpeak(this._config.offpeak);
    if (this.shadowRoot) { this._applyLayout(true); this._update(); }
  }

  set hass(hass) {
    const first = !this._hass;
    this._hass = hass;
    if (!this.shadowRoot) this._build();
    if (first || hass.entities !== this._entsRef) { this._map = null; this._entsRef = hass.entities; }
    this._update();
    if (this._config.show_stats !== false && !this._dayLoading && (!this._day || Date.now() - this._day.at > 5 * 60000)) this._dayLoad();
  }

  getCardSize() { return 9; }
  getGridOptions() { return { columns: 12, min_columns: 6 }; }

  /* Heures creuses : plages du pilotage (helpers) si présentes, sinon option offpeak */
  get _off() {
    if (this._hass && this._eid("hc1_start")) {
      const m = (k) => { const v = this._s(k); if (!v) return null; const [h, mi] = v.split(":").map(Number); return isFinite(h) ? h * 60 + (mi || 0) : null; };
      const w = [];
      const a = m("hc1_start"), b = m("hc1_end");
      if (a != null && b != null && a !== b) w.push([a, b]);
      if (!this._eid("hc2_enabled") || this._on("hc2_enabled")) { const c = m("hc2_start"), d = m("hc2_end"); if (c != null && d != null && c !== d) w.push([c, d]); }
      if (w.length) return w;
    }
    return this._offCfg || [];
  }

  _forcedLayout() { return this._config.layout === "wide" || this._config.layout === "tall" ? this._config.layout : null; }

  _build() {
    const root = this.attachShadow({ mode: "open" });
    root.innerHTML = `
      <style>${FS_CSS}</style>
      <ha-card>
        <div class="hdr" id="hdr">
          <div class="hname"><div><div class="name" id="h_name"></div><div class="subt" id="h_sub"></div></div>
            <div class="tabs" id="tabs" role="tablist">
              <button role="tab" data-tab="flow" id="tab_f"></button><button role="tab" data-tab="pil" id="tab_p"></button><button role="tab" data-tab="opt" id="tab_o"></button><button role="tab" data-tab="rec" id="tab_r"></button>
            </div></div>
          <div class="chips">
            <span class="badge bad" id="b_alarm"></span><span class="badge warn" id="b_evoff"></span>
            <span class="badge info" id="b_grid"></span><span class="badge warn" id="b_forced"></span>
            <button class="autob" id="b_auto" aria-pressed="false"><span class="dot"></span><span id="b_auto_t">Auto</span></button>
            <span class="pill" id="h_state"><span class="dot"></span><span id="h_state_t">—</span></span>
          </div>
        </div>
        <div class="view" id="v_flow">
          <div class="wrap" id="svgwrap"></div>
          <div class="pban" id="pban" data-tab="pil"><span class="pdot"></span><span id="pban_t"></span><span class="pgo">›</span></div>
          <div class="tiles" id="tiles">
            <div class="tile" data-e="pv_daily"><div class="tl" id="l_prod"></div><div class="tv" id="k_prod">—</div><div class="ts" id="k_prod_s"></div></div>
            <div class="tile" data-tab="rec"><div class="tl" id="l_self"></div><div class="tv" id="k_self">—</div><div class="ts" id="k_self_s"></div><div class="bar"><i id="k_self_b" style="background:${FS_COL.pv}"></i></div></div>
            <div class="tile" data-e="battery_soc"><div class="tl" id="l_bat"></div><div class="tv" id="k_bat">—</div><div class="ts" id="k_bat_s"></div><div class="bar"><i id="k_bat_b"></i></div></div>
            <div class="tile" data-e="grid_import_energy"><div class="tl" id="l_grid"></div><div class="tv" id="k_grid">—</div><div class="ts" id="k_grid_s"></div></div>
            <div class="tile" data-tab="rec"><div class="tl" id="l_cons"></div><div class="tv" id="k_cons">—</div><div class="ts" id="k_cons_s"></div></div>
            <div class="tile" data-e="forecast_tomorrow"><div class="tl" id="l_fc"></div><div class="tv" id="k_fc">—</div><div class="ts" id="k_fc_s"></div></div>
          </div>
        </div>
        <div class="view pane" id="v_pil"><div id="p_body"></div></div>
        <div class="view pane" id="v_opt"><div class="obar" id="o_bar"></div><div id="o_body"></div></div>
        <div class="view pane" id="v_rec"><div class="obar" id="r_bar"></div><div id="r_body"></div></div>
        <div class="vtip" id="vtip"></div>
      </ha-card>`;
    const t = (k) => this._t(k);
    [["l_prod", "k_prod"], ["l_self", "k_self"], ["l_bat", "k_bat"], ["l_grid", "k_grid"], ["l_cons", "k_cons"], ["l_fc", "k_fc"]].forEach(([id, k]) => { root.getElementById(id).textContent = t(k); });
    root.getElementById("b_alarm").textContent = t("b_alarm");
    root.getElementById("b_evoff").textContent = t("b_evoff");
    root.getElementById("b_grid").textContent = t("b_gridchg");
    root.getElementById("b_forced").textContent = t("b_forced");

    root.addEventListener("click", (ev) => {
      const path = ev.composedPath();
      if (path.some((n) => n.id === "v_opt" || n.id === "v_rec" || n.id === "v_pil")) return;
      if (path.some((n) => n.id === "b_auto")) { this._pilToggle(); return; }
      if (path.some((n) => n.id === "pban")) { this._setTab("pil"); return; }
      const tabEl = path.find((n) => n.dataset && n.dataset.tab && n.classList && n.classList.contains("tile"));
      if (tabEl) { this._setTab(tabEl.dataset.tab); return; }
      const el = path.find((n) => n.dataset && n.dataset.e);
      if (!el) return;
      let key = el.dataset.e;
      if (key === "__home") key = this._eid("grid_power") ? "grid_power" : "inverter_power";
      const id = this._eid(key);
      if (id) this._moreInfo(id);
    });
    root.getElementById("tabs").addEventListener("click", (ev) => {
      const b = ev.target.closest("button[data-tab]");
      if (b) this._setTab(b.dataset.tab);
    });
    this._paneInit();
    this._pilInit();
    const card = root.querySelector("ha-card");
    if (window.ResizeObserver) {
      this._ro = new ResizeObserver((ent) => {
        const w = ent[0].contentRect.width;
        if (!w) return;
        this._w = w;
        this._applyLayout(false);
      });
      this._ro.observe(card);
    }
    this._applyLayout(true);
    let tab = "flow";
    try { tab = localStorage.getItem(this._tabKey()) || "flow"; } catch (e) { /* ignore */ }
    this._setTab(tab, true);
  }

  _tabKey() { return "fusionsolar-card-tab" + (this._phone ? "-phone" : ""); }

  _layout() { return this._forcedLayout() || (this._w && this._w < 620 ? "tall" : "wide"); }

  _applyLayout(force) {
    const r = this.shadowRoot;
    if (!r) return;
    const lay = this._layout();
    const card = r.querySelector("ha-card");
    card.classList.toggle("tall", lay === "tall");
    if (force || lay !== this._lay) {
      this._lay = lay;
      r.getElementById("svgwrap").innerHTML = fsBuildSVG(lay, (k) => this._t(k));
      this._update();
    }
    r.getElementById("hdr").style.display = this._config.show_header === false ? "none" : "";
    r.getElementById("tiles").style.display = this._config.show_stats === false ? "none" : "";
    r.getElementById("h_name").textContent = this._config.title != null ? this._config.title : this._t("default_title");
    r.getElementById("tab_f").textContent = this._t("tab_flow");
    r.getElementById("tab_o").textContent = this._t("tab_opt");
    r.getElementById("tab_r").textContent = this._t("tab_rec");
    r.getElementById("tab_p").textContent = this._t("tab_pil");
    r.getElementById("tab_p").classList.toggle("hide", this._config.show_pilot === false || !this._hasPilot());
    r.getElementById("tab_o").classList.toggle("hide", this._config.show_optimization === false);
    r.getElementById("tab_r").classList.toggle("hide", this._config.show_recap === false);
    const noTabs = this._config.show_optimization === false && this._config.show_recap === false && (this._config.show_pilot === false || !this._hasPilot());
    r.getElementById("tabs").style.display = noTabs ? "none" : "";
  }

  _setTab(tab, init) {
    if (tab === "opt" && this._config.show_optimization === false) tab = "flow";
    if (tab === "rec" && this._config.show_recap === false) tab = "flow";
    if (tab === "pil" && (this._config.show_pilot === false || !this._hasPilot())) tab = "flow";
    if (!["flow", "pil", "opt", "rec"].includes(tab)) tab = "flow";
    this._tab = tab;
    if (!init) { try { localStorage.setItem(this._tabKey(), tab); } catch (e) { /* ignore */ } }
    const r = this.shadowRoot;
    r.querySelectorAll("#tabs button").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.tab === tab)));
    r.getElementById("v_flow").classList.toggle("on", tab === "flow");
    r.getElementById("v_opt").classList.toggle("on", tab === "opt");
    r.getElementById("v_rec").classList.toggle("on", tab === "rec");
    r.getElementById("v_pil").classList.toggle("on", tab === "pil");
    if (!this._hass) return;
    if (tab === "pil") this._pilRender(true);
    if (tab === "opt") this._optShow();
    if (tab === "rec") this._recShow();
  }

  _moreInfo(id) { this.dispatchEvent(new CustomEvent("hass-more-info", { detail: { entityId: id }, bubbles: true, composed: true })); }

  /* ---------- i18n ---------- */
  _lang() { return fsLang(this._hass, this._config); }
  _t(k, vars) {
    const L = FS_I18N[this._lang()] || FS_I18N.fr;
    let s = L[k] != null ? L[k] : FS_I18N.fr[k] != null ? FS_I18N.fr[k] : k;
    if (vars && typeof s === "string") for (const [a, b] of Object.entries(vars)) s = s.split(`{${a}}`).join(b);
    return s;
  }
  _lbl(group, key) { if (key == null) return ""; const g = this._t(group); return (g && g[key]) || String(key).replace(/_/g, " "); }

  /* ---------- entités ---------- */
  _resolveAll() {
    const hass = this._hass, cfg = this._config.entities || {}, map = {};
    const exists = (id) => typeof id === "string" && hass.states[id] !== undefined;
    const disc = {};
    if (hass.entities) {
      for (const [eid, e] of Object.entries(hass.entities)) {
        if (!e.platform || !e.translation_key) continue;
        const k = e.platform + ":" + e.translation_key;
        (disc[k] = disc[k] || []).push(eid);
      }
    }
    const keys = new Set([...Object.keys(FS_DEFAULTS), ...Object.keys(cfg)]);
    for (const k of keys) {
      if (k in cfg) {
        const v = cfg[k];
        map[k] = Array.isArray(v) ? (v.filter(exists).length ? v.filter(exists) : null) : v || null;
        continue;
      }
      const d = FS_DEFAULTS[k];
      if (Array.isArray(d)) { const ok = d.filter(exists); map[k] = ok.length ? ok : null; continue; }
      if (exists(d)) { map[k] = d; continue; }
      const dd = FS_DISCOVERY[k];
      let found = null;
      if (dd) for (const tk of dd[1]) { found = (disc[dd[0] + ":" + tk] || []).find(exists); if (found) break; }
      map[k] = found || null;
    }
    this._map = map;
  }
  _eid(k) { if (!this._map) this._resolveAll(); const v = this._map[k]; return Array.isArray(v) ? v[0] : v || null; }
  _ids(k) { if (!this._map) this._resolveAll(); const v = this._map[k]; return v ? (Array.isArray(v) ? v : [v]) : []; }
  _st(k) { const id = this._eid(k); return id ? this._hass.states[id] : undefined; }
  _s(k) { const s = this._st(k); return s && s.state !== "unavailable" && s.state !== "unknown" ? s.state : null; }
  _n(k) { const v = parseFloat(this._s(k)); return isNaN(v) ? null : v; }
  _on(k) { return this._s(k) === "on"; }
  _unit(k) { const s = this._st(k); return (s && s.attributes.unit_of_measurement) || ""; }
  _pw(k) { const v = this._n(k); if (v == null) return null; const u = this._unit(k).toLowerCase(); return u === "kw" ? v * 1000 : u === "mw" ? v * 1e6 : v; }
  _kwh(k) { const v = this._n(k); if (v == null) return null; const u = this._unit(k).toLowerCase(); return u === "wh" ? v / 1000 : u === "mwh" ? v * 1000 : v; }

  _f(v, d = 1) {
    if (v == null || isNaN(v)) return "—";
    const lang = (this._hass && this._hass.locale && this._hass.locale.language) || this._lang();
    this._fmts = this._fmts || {};
    const key = lang + d;
    if (!this._fmts[key]) { try { this._fmts[key] = new Intl.NumberFormat(lang, { minimumFractionDigits: d, maximumFractionDigits: d }); } catch (e) { this._fmts[key] = new Intl.NumberFormat("fr", { minimumFractionDigits: d, maximumFractionDigits: d }); } }
    return this._fmts[key].format(v);
  }
  _W(w, sign) {
    if (w == null) return "—";
    const a = Math.abs(w), s = sign && w < 0 ? "−" : sign && w > 0 ? "+" : "";
    return a >= 1000 ? `${s}${this._f(a / 1000, a >= 10000 ? 1 : 2)} kW` : `${s}${this._f(a, 0)} W`;
  }
  _dur(min) {
    if (min == null || !isFinite(min)) return "—";
    const h = Math.floor(min / 60), m = Math.round(min % 60);
    return h ? `${h} h ${String(m).padStart(2, "0")}` : `${m} min`;
  }
  _hm(t) { const d = new Date(t); return this._lang() === "fr" ? `${d.getHours()} h ${String(d.getMinutes()).padStart(2, "0")}` : d.toLocaleTimeString("en", { hour: "numeric", minute: "2-digit" }); }
  _hh(h) { return this._t("hour", { h: ((h % 24) + 24) % 24 }); }

  /* ---------- flux instantanés ---------- */
  _string(i) {
    let p = this._pw(`pv${i}_power`);
    const v = this._n(`pv${i}_voltage`), a = this._n(`pv${i}_current`);
    if (p == null && v != null && a != null) p = v * a;
    return { p: p != null ? Math.max(0, p) : null, v, a };
  }
  _flows() {
    const c = this._config;
    const s1 = this._string(1), s2 = this._string(2);
    let pv = this._pw("pv_power");
    if (pv == null && (s1.p != null || s2.p != null)) pv = (s1.p || 0) + (s2.p || 0);
    if (pv != null) pv = Math.max(0, pv);
    const inv = this._pw("inverter_power");
    let bat = this._pw("battery_power"); if (bat != null && c.battery_invert) bat = -bat;
    let grid = this._pw("grid_power"); if (grid != null && c.grid_invert) grid = -grid;
    const evRaw = this._pw("ev_power");
    let load = null;
    if (inv != null && grid != null) load = inv - grid;
    else if (pv != null && grid != null) load = pv - (bat || 0) - grid;
    if (load != null) load = Math.max(0, load);
    const ev = evRaw != null ? Math.max(0, evRaw) : 0;
    const home = load != null ? Math.max(0, load - ev) : null;
    return { s1, s2, pv, inv, bat, grid, ev, evRaw, load, home, hp: this._pw("heatpump_power"), soc: this._n("battery_soc") };
  }

  _status(F) {
    const DB = 40;
    const pv = F.pv || 0, g = F.grid || 0, b = F.bat || 0;
    if (pv > DB) {
      if (g > 100) return ["st_export", FS_COL.exp, true];
      if (g < -100) return ["st_mixed", FS_COL.imp, true];
      return ["st_selfuse", FS_COL.pv, true];
    }
    if (b < -DB) return ["st_battery", FS_COL.bat, true];
    if (b > DB) return ["st_gridchg", FS_COL.imp, true];
    if (g < -DB) return ["st_grid", FS_COL.imp, true];
    return ["st_idle", FS_COL.idle, false];
  }

  /* ---------- helpers DOM ---------- */
  _$(id) { return this.shadowRoot.getElementById(id); }
  _txt(id, t) { const el = this._$(id); if (!el) return; if (t == null || t === "") { el.style.display = "none"; } else { el.style.display = ""; if (el.textContent !== t) el.textContent = t; } }
  _html(id, h) { const el = this._$(id); if (el && el.innerHTML !== h) el.innerHTML = h; }
  _cls(id, cls, on) { const el = this._$(id); if (el) el.classList.toggle(cls, !!on); }
  _var(id, name, val) { const el = this._$(id); if (el) el.style.setProperty(name, val); }
  _wire(id, on, color, rev, spd) {
    const el = this._$(id); if (!el) return;
    el.classList.toggle("on", !!on); el.classList.toggle("rev", !!rev);
    if (color) el.style.setProperty("--c", color);
    if (spd) el.style.setProperty("--spd", spd);
  }

  /* ---------- mise à jour ---------- */
  _update() {
    if (!this._hass || !this.shadowRoot || !this._$("svg")) return;
    if (!this._map) this._resolveAll();
    const F = this._flows();
    this._updHeader(F);
    this._pilUpdate();
    this._updSvg(F);
    if (this._config.show_stats !== false) this._updTiles(F);
  }

  _updHeader(F) {
    const [st, col, live] = this._status(F);
    const pill = this._$("h_state");
    pill.style.setProperty("--mc", col);
    pill.classList.toggle("live", live);
    this._txt("h_state_t", this._t(st));
    const parts = [];
    const mode = this._s("battery_mode");
    if (mode) parts.push(this._lbl("bat_modes", mode));
    const invS = this._invState();
    if (invS) parts.push(this._t(invS[0]));
    this._txt("h_sub", parts.join(" · "));
    const alarm = (this._s("inverter_alarm") || "none").toLowerCase();
    this._cls("b_alarm", "show", alarm && !["none", "aucune", "no alarm", "0", ""].includes(alarm));
    this._cls("b_evoff", "show", this._eid("ev_online") && this._s("ev_online") === "off");
    const forced = (this._s("battery_forced_charge") || "").toLowerCase();
    this._cls("b_forced", "show", forced && !["stopped", "arrêtée", "off"].includes(forced));
    this._cls("b_grid", "show", (F.bat || 0) > 100 && (F.pv || 0) < F.bat * 0.5);
  }

  _invState() {
    const s = (this._s("inverter_state") || "").toLowerCase();
    if (!s) return null;
    if (s.includes("fault") || s.includes("défaut")) return ["inv_fault", "bad"];
    if (s.includes("grid-connected") || s.includes("on-grid") || s.includes("raccord")) return ["inv_ok", "ok"];
    if (s.includes("standby") || s.includes("veille")) return ["inv_standby", "warn"];
    if (s.includes("shutdown") || s.includes("arrêt")) return ["inv_off", ""];
    return ["inv_ok", "ok"];
  }

  _updSvg(F) {
    const c = this._config, DB = 15;
    const { s1, s2, pv, inv, bat, grid, ev, load, home, hp, soc } = F;

    // ciel
    const sun = this._s("sun");
    const night = sun ? sun === "below_horizon" : (pv || 0) < 5;
    this._cls("sky", "night", night);
    this._cls("sky", "on", (pv || 0) > DB);
    const fcNow = this._pw("forecast_now"), fcTom = this._kwh("forecast_tomorrow");
    const fcNowW = fcNow != null && this._unit("forecast_now").toLowerCase() === "w" ? fcNow : fcNow;
    this._txt("t_sun", night ? (fcTom != null ? this._t("fc_tomorrow", { k: this._f(fcTom, 1) }) : null) : fcNowW != null ? this._t("fc_now", { w: this._W(fcNowW) }) : null);

    // strings
    for (const [i, s] of [[1, s1], [2, s2]]) {
      const nm = c[`pv${i}_name`];
      this._txt(`n_pv${i}`, nm ? `PV ${i} · ${nm}` : `PV ${i}`);
      const on = (s.p || 0) > DB;
      this._wire(`f_pv${i}`, on, FS_COL.pv, false, fsSpd(s.p));
      const peak = Number(c[`pv${i}_peak`]) || 3000;
      this._cls(`p_pv${i}`, "on", on);
      this._var(`p_pv${i}`, "--gl", fsClamp((s.p || 0) / peak, 0.12, 1).toFixed(2));
      this._txt(`t_pv${i}`, this._W(s.p));
      this._txt(`t_pv${i}v`, s.v != null && s.a != null && (s.v > 1) ? `${this._f(s.v, 0)} V · ${this._f(s.a, 2)} A` : null);
    }
    this._txt("t_pvsum", (pv || 0) > DB ? this._t("total_pv", { w: this._W(pv) }) : null);

    // onduleur
    const invS = this._invState();
    const invEl = this._$("inv");
    if (invEl) { invEl.classList.remove("ok", "warn", "bad"); if (invS && invS[1]) invEl.classList.add(invS[1]); }
    this._txt("t_inv", this._W(inv));
    this._txt("t_invs", invS ? this._t(invS[0]) : null);
    this._wire("f_ac", Math.abs(inv || 0) > DB, (inv || 0) >= 0 ? FS_COL.pv : FS_COL.imp, (inv || 0) < 0, fsSpd(inv));

    // batterie
    const bp = bat || 0;
    this._wire("f_bat", Math.abs(bp) > DB, FS_COL.bat, bp < 0, fsSpd(bp));
    const fill = this._$("bfill");
    if (fill && soc != null) {
      const gy = +this._$("bfill").getAttribute("y") || 0;
      const gauge = fill.parentNode.querySelector(".bshine");
      const top = +gauge.getAttribute("y"), h = +gauge.getAttribute("height");
      const fh = (fsClamp(soc, 0, 100) / 100) * h;
      fill.setAttribute("y", (top + h - fh).toFixed(1));
      fill.setAttribute("height", fh.toFixed(1));
      void gy;
    }
    this._var("bat", "--bc", soc == null ? "#7d8794" : soc < 15 ? FS_COL.imp : soc < 35 ? "#ffb547" : FS_COL.bat);
    this._cls("bat", "chg", bp > DB);
    this._cls("bat", "dis", bp < -DB);
    this._txt("t_soc", soc != null ? `${this._f(soc, 0)} %` : "—");
    this._txt("t_batp", Math.abs(bp) > DB ? `${this._W(bp, true)} · ${this._t(bp > 0 ? "charge" : "discharge")}` : this._t("rest"));
    const cap = Number(c.battery_capacity) || 10;
    const endSoc = this._n("battery_end_soc") ?? 5, maxSoc = this._n("battery_max_soc") ?? 100;
    let bs = null;
    if (soc != null && bp < -DB) bs = this._t("empty_in", { d: this._dur((Math.max(0, soc - endSoc) / 100) * cap * 60000 / -bp) });
    else if (soc != null && bp > DB && soc < maxSoc) bs = this._t("full_at", { h: this._hm(Date.now() + ((maxSoc - soc) / 100) * cap * 1000 / bp * 3600000) });
    this._txt("t_bats", bs);
    this._txt("t_batn", `LUNA2000 · ${this._f(cap, 0)} kWh`);

    // réseau (+ = injection)
    const g = grid || 0;
    const gOn = Math.abs(g) > DB;
    const gc = g > DB ? FS_COL.exp : g < -DB ? FS_COL.imp : FS_COL.idle;
    this._wire("f_meter", gOn, gc, g < 0, fsSpd(g));
    this._wire("f_grid", gOn, gc, g < 0, fsSpd(g));
    this._var("grid", "--gc", gc);
    this._var("meter", "--gc", gc);
    this._cls("meter", "on", gOn);
    this._txt("t_grid", this._W(Math.abs(g)));
    const fos = this._n("fossil");
    this._txt("t_grids", [this._t(g > DB ? "export" : g < -DB ? "import" : "balance"), g < -DB && fos != null && this._lay !== "tall" ? this._t("fossil", { p: this._f(fos, 0) }) : null].filter(Boolean).join(" · "));
    const v = this._n("grid_voltage");
    this._txt("t_meter", v != null ? `${this._f(v, 0)} V` : null);

    // maison
    const hOn = (home || 0) > DB;
    this._wire("f_home", hOn, FS_COL.home, false, fsSpd(home));
    this._var("home", "--hc", hOn ? FS_COL.home : "#9aa3ad");
    this._cls("home", "on", hOn);
    this._txt("t_home", this._W(home));
    this._txt("t_homes", this._t(ev > DB ? "home_ev" : "home"));
    this._txt("t_hp", hp != null && hp > 30 ? this._t("hp_part", { w: this._W(hp) }) : null);

    // borne
    const evOn = ev > DB;
    this._wire("f_ev", evOn, FS_COL.ev, false, fsSpd(ev));
    const est = this._s("ev_state");
    const plugged = this._eid("ev_plugged") ? this._on("ev_plugged") : !!(est && !["standby", "charging_ended"].includes(est));
    const box = this._$("evbox");
    if (box) {
      box.classList.remove("st-charge", "st-wait", "st-plug", "st-fault", "st-ok");
      const online = !this._eid("ev_online") || this._s("ev_online") !== "off";
      let sc = "";
      if (evOn || est === "charging" || est === "green_charging" || est === "charging_starting") sc = "st-charge";
      else if (est === "fault" || est === "alarm" || !online) sc = "st-fault";
      else if (est === "green_waiting" || est === "scheduled_waiting" || est === "orderly_waiting") sc = "st-wait";
      else if (est === "charging_ended") sc = "st-ok";
      else if (plugged) sc = "st-plug";
      if (sc) box.classList.add(sc);
      box.classList.toggle("plug", plugged || evOn);
    }
    this._txt("t_ev", evOn ? this._W(ev) : null);
    const mode = this._s("ev_mode");
    this._txt("t_evs", [est ? this._lbl("ev_states", est) : null, mode ? this._lbl("ev_modes", mode) : null].filter(Boolean).join(" · "));
    const se = this._kwh("ev_session_energy"), sd = this._n("ev_session_duration");
    let sdMin = sd;
    if (sd != null) { const u = this._unit("ev_session_duration").toLowerCase(); sdMin = u === "h" ? sd * 60 : u === "s" ? sd / 60 : sd; }
    this._txt("t_evx", se != null && se > 0.05 ? this._t("ev_session", { k: this._f(se, 1), d: this._dur(sdMin) }) : null);
    void load;
  }

  _updTiles(F) {
    const D = this._day;
    const pvDay = D ? D.pv : this._kwh("pv_daily");
    const peak = this._pw("pv_peak"), fcT = this._kwh("forecast_today");
    this._html("k_prod", pvDay != null ? `${this._f(pvDay, 1)}<small>kWh</small>` : "—");
    this._txt("k_prod_s", this._t("k_prod_s", { w: this._W(peak), k: this._f(fcT, 1) }));
    if (D && D.pv > 0.05) {
      const self = ((D.pv - D.exp) / D.pv) * 100;
      this._html("k_self", `${this._f(fsClamp(self, 0, 100), 0)}<small>%</small>`);
      this._$("k_self_b").style.width = `${fsClamp(self, 0, 100)}%`;
    } else { this._html("k_self", "—"); this._$("k_self_b").style.width = "0%"; }
    this._txt("k_self_s", D && D.load > 0.05 ? this._t("k_self_s", { p: this._f(fsAuto(D) * 100, 0) }) : "");
    const soc = F.soc;
    this._html("k_bat", soc != null ? `${this._f(soc, 0)}<small>%</small>` : "—");
    const bb = this._$("k_bat_b");
    bb.style.width = `${fsClamp(soc || 0, 0, 100)}%`;
    bb.style.background = soc == null ? "#7d8794" : soc < 15 ? FS_COL.imp : soc < 35 ? "#ffb547" : FS_COL.bat;
    const bc = D ? D.chg : this._kwh("battery_charge_today"), bd = D ? D.dis : this._kwh("battery_discharge_today");
    this._txt("k_bat_s", this._t("k_bat_s", { c: this._f(bc, 1), d: this._f(bd, 1) }));
    const price = this._n("price");
    this._html("k_grid", D ? `${this._f(D.imp, 1)}<small>kWh</small>` : "—");
    this._txt("k_grid_s", D ? `${this._t("k_grid_s", { e: this._f(D.exp, 1) })}${price != null ? ` · ${this._t("k_cost", { e: this._f(D.imp * price, 2) })}` : ""}` : "");
    this._html("k_cons", D ? `${this._f(D.load, 1)}<small>kWh</small>` : "—");
    this._txt("k_cons_s", D && D.ev > 0.05 ? this._t("k_cons_s", { e: this._f(D.ev, 1) }) : "");
    const tom = this._kwh("forecast_tomorrow"), rem = this._kwh("forecast_remaining");
    this._html("k_fc", tom != null ? `${this._f(tom, 1)}<small>kWh</small>` : "—");
    this._txt("k_fc_s", rem != null ? this._t("k_fc_s", { k: this._f(rem, 1) }) : "");
  }

  /* ---------- statistiques ---------- */
  async _fetchStats(keys, start, end, period, type = "change") {
    const idsOf = {}, all = new Set();
    for (const [k, ck] of Object.entries(keys)) { const ids = this._ids(ck); idsOf[k] = ids; ids.forEach((i) => all.add(i)); }
    const out = {};
    if (!all.size) { for (const k of Object.keys(keys)) out[k] = new Map(); return out; }
    const res = await this._hass.callWS({
      type: "recorder/statistics_during_period", start_time: new Date(start).toISOString(), end_time: new Date(end).toISOString(),
      statistic_ids: [...all], period, types: [type], units: { energy: "kWh" },
    });
    for (const [k, ids] of Object.entries(idsOf)) {
      const m = new Map();
      for (const id of ids) for (const row of res[id] || []) {
        const v = row[type];
        if (v == null || !isFinite(v)) continue;
        const t = fsTs(row.start);
        m.set(t, (m.get(t) || 0) + v);
      }
      out[k] = m;
    }
    const optional = new Set([...this._ids("heatpump_energy"), ...this._ids("ev_energy")]);
    out._missing = [...all].filter((id) => !optional.has(id) && (!res[id] || !res[id].length));
    return out;
  }
  _rows(S) {
    const ts = new Set();
    for (const k of Object.keys(FS_E)) if (S[k]) for (const t of S[k].keys()) ts.add(t);
    return [...ts].sort((a, b) => a - b).map((t) => {
      const r = { t };
      for (const k of Object.keys(FS_E)) r[k] = S[k] ? S[k].get(t) || 0 : 0;
      const a = fsAlloc(r);
      a.evSolar = a.load > 0 ? a.ev * fsClamp(1 - a.fromGrid / a.load, 0, 1) : 0;
      return a;
    });
  }

  async _dayLoad() {
    if (!this._hass || this._dayLoading) return;
    this._dayLoading = true;
    try {
      const now = Date.now();
      const S = await this._fetchStats(FS_E, fsDay0(now), now, "5minute");
      const rows = this._rows(S);
      const tot = fsAdd(rows);
      this._day = Object.assign(tot, { at: Date.now() });
    } catch (e) {
      if (!this._day) this._day = null;
      this._dayErrAt = Date.now();
    }
    this._dayLoading = false;
    this._update();
  }
}

/* ------------------------------------------------------------------------------------------ */
/*  Onglets Optimisation et Récap : infrastructure commune                                    */
/* ------------------------------------------------------------------------------------------ */
const FsPaneMixin = {
  _paneInit() {
    const r = this.shadowRoot;
    this._optDays = Number(this._config.optimization_days) || 14;
    this._recP = "day"; this._recOff = 0; this._recCache = {};
    const opt = r.getElementById("v_opt"), rec = r.getElementById("v_rec");
    opt.addEventListener("click", (ev) => {
      const p = ev.target.closest("[data-days]");
      if (p) { this._optDays = Number(p.dataset.days); this._optLoad(); return; }
      if (ev.target.closest("[data-refresh]")) { this._optLoad(); return; }
      const a = ev.target.closest("[data-act]");
      if (a) { this._optConfirm = a.dataset.act; this._optMsg = null; this._optRender(); return; }
      if (ev.target.closest("[data-cancel]")) { this._optConfirm = null; this._optRender(); return; }
      const ok = ev.target.closest("[data-ok]");
      if (ok) { this._optApply(ok.dataset.ok); return; }
    });
    rec.addEventListener("click", (ev) => {
      const p = ev.target.closest("[data-period]");
      if (p) { this._recP = p.dataset.period; this._recOff = 0; this._recLoad(); return; }
      const n = ev.target.closest("[data-nav]");
      if (n) { this._recOff = Math.max(0, this._recOff + Number(n.dataset.nav)); this._recLoad(); return; }
      if (ev.target.closest("[data-refresh]")) { this._recCache = {}; this._recLoad(); }
    });
    const tip = r.getElementById("vtip"), card = r.querySelector("ha-card");
    const move = (ev) => {
      const el = ev.target.closest && ev.target.closest("[data-tip]");
      if (!el) { tip.style.display = "none"; return; }
      tip.textContent = el.getAttribute("data-tip");
      tip.style.display = "block";
      const box = card.getBoundingClientRect();
      let x = ev.clientX - box.left + 14, y = ev.clientY - box.top + 14;
      const tw = tip.offsetWidth, th = tip.offsetHeight;
      if (x + tw > box.width - 4) x = ev.clientX - box.left - tw - 12;
      if (y + th > box.height - 4) y = ev.clientY - box.top - th - 12;
      tip.style.left = `${Math.max(4, x)}px`; tip.style.top = `${Math.max(4, y)}px`;
    };
    [opt, rec].forEach((el) => { el.addEventListener("pointermove", move); el.addEventListener("pointerleave", () => { tip.style.display = "none"; }); });
    if (window.ResizeObserver) {
      new ResizeObserver(() => {
        const w = (this._tab === "opt" ? r.getElementById("o_body") : r.getElementById("r_body")).clientWidth;
        if (!w || Math.abs(w - (this._paneW || 0)) < 40) return;
        this._paneW = w;
        if (this._tab === "opt" && this._optData) this._optRender();
        if (this._tab === "rec" && this._recData) this._recRender();
      }).observe(card);
    }
  },
  _widths(el) {
    const cw = Math.max(280, el.clientWidth || 900);
    this._paneW = cw;
    const two = cw > 720;
    return { wide: Math.round(cw - 30), half: Math.round(two ? (cw - 12) / 2 - 30 : cw - 22), two };
  },
  _bar(id, html) { const el = this.shadowRoot.getElementById(id); if (el) el.innerHTML = html; },
  _timeStr(at) { return at ? new Date(at).toLocaleTimeString(this._lang(), { hour: "2-digit", minute: "2-digit" }) : ""; },
};

/* ------------------------------------------------------------------------------------------ */
/*  Optimisation (inspirée d'EMMA)                                                            */
/* ------------------------------------------------------------------------------------------ */
const FsOptMixin = {
  _optShow() {
    const stale = !this._optData || Date.now() - this._optData.at > 20 * 60000;
    if (stale && !this._optLoading) this._optLoad(); else this._optRender();
  },

  async _optLoad() {
    if (this._optLoading) return;
    this._optLoading = true; this._optMsg = null; this._optConfirm = null;
    this._optRender();
    try {
      const D = await this._optFetch();
      D.A = this._optAnalyze(D);
      this._optData = D;
    } catch (e) {
      this._optData = { at: Date.now(), error: String((e && e.message) || e) };
    }
    this._optLoading = false;
    this._optRender();
  },

  async _optFetch() {
    const days = this._optDays, now = Date.now();
    const start = fsDay0(now) - days * 86400000;
    const strIds = [this._eid("pv1_power"), this._eid("pv2_power")].filter(Boolean);
    const [S, hist] = await Promise.all([
      this._fetchStats(FS_E, start, now, "hour"),
      strIds.length === 2
        ? this._hass.callWS({ type: "history/history_during_period", start_time: new Date(fsDay0(now) - 2 * 86400000).toISOString(), end_time: new Date(now).toISOString(),
          entity_ids: strIds, minimal_response: true, no_attributes: true, significant_changes_only: false }).catch(() => ({}))
        : {},
    ]);
    return { at: Date.now(), days, start, S, hist, strIds };
  },

  _forecastHourly(profilePv) {
    const out = new Map();
    const field = this._config.forecast_field || "pv_estimate";
    for (const k of ["forecast_today", "forecast_tomorrow"]) {
      const st = this._st(k);
      const dh = st && (st.attributes.detailedHourly || st.attributes.detailed_hourly);
      if (Array.isArray(dh) && dh.length) {
        for (const r of dh) { const t = fsTs(r.period_start); const v = Number(r[field] ?? r.pv_estimate); if (isFinite(t) && isFinite(v)) out.set(t, v); }
      } else {
        // repli : total du jour réparti selon le profil horaire PV moyen
        const tot = this._kwh(k), sumP = fsSum(profilePv);
        if (tot != null && sumP > 0) {
          const d0 = fsDay0(Date.now()) + (k === "forecast_tomorrow" ? 86400000 : 0);
          for (let h = 0; h < 24; h++) out.set(d0 + h * 3600000, (tot * profilePv[h]) / sumP);
        }
      }
    }
    return out;
  },

  _optAnalyze(D) {
    const c = this._config, A = {};
    const now = Date.now(), today0 = fsDay0(now);
    const cap = Number(c.battery_capacity) || 10;
    const rows = this._rows(D.S);
    A.missing = (D.S._missing || []);
    const full = rows.filter((r) => r.t < today0);
    const dayKeys = [...new Set(full.map((r) => fsDay0(r.t)))];
    A.nDays = dayKeys.length;
    const T = fsAdd(full);
    A.T = T;
    A.price = this._n("price");
    // profil horaire type (hors VE)
    const prof = Array.from({ length: 24 }, () => ({ load: [], pv: [] }));
    const byDay = new Map();
    for (const r of full) {
      const h = new Date(r.t).getHours();
      prof[h].load.push(Math.max(0, r.load - r.ev));
      prof[h].pv.push(r.pv);
      const d = fsDay0(r.t);
      if (!byDay.has(d)) byDay.set(d, []);
      byDay.get(d).push(r);
    }
    // heures manquantes comptées comme absentes : moyenne sur les heures présentes
    A.prof = prof.map((p) => ({ load: fsMean(p.load) ?? 0, pv: fsMean(p.pv) ?? 0 }));
    A.daily = [...byDay.entries()].sort((a, b) => a[0] - b[0]).map(([d, rs]) => {
      const s = fsAdd(rs);
      return { t: d, ...s, self: s.pv > 0.1 ? (s.pv - s.exp) / s.pv : null, auto: s.load > 0.1 ? fsAuto(s) : null };
    });
    // charge réseau nocturne suivie d'injection
    let waste = 0, wasteDays = 0;
    for (const [d, rs] of byDay) {
      const night = fsSum(rs.filter((r) => new Date(r.t).getHours() < 8).map((r) => r.gridToBat));
      const dayExp = fsSum(rs.filter((r) => { const h = new Date(r.t).getHours(); return h >= 8 && h < 21; }).map((r) => r.exp));
      const w = Math.min(night, dayExp);
      if (w > 0.3) { waste += w; wasteDays++; }
      void d;
    }
    A.waste = waste; A.wasteDays = wasteDays;
    // heures d'injection
    const expH = Array.from({ length: 24 }, () => 0);
    for (const r of full) expH[new Date(r.t).getHours()] += r.exp;
    const expMax = Math.max(...expH);
    if (expMax > 0) {
      const hs = expH.map((v, h) => [h, v]).filter(([, v]) => v >= expMax * 0.35).map(([h]) => h);
      A.expWin = [Math.min(...hs), Math.max(...hs) + 1];
    }
    // prévision + simulation
    A.fc = this._forecastHourly(A.prof.map((p) => p.pv));
    A.sim = this._simulate(A);
    // strings
    A.str = this._strings(D);
    return A;
  },

  _timeline() {
    const now = Date.now(), h0 = Math.floor(now / 3600000) * 3600000;
    const end = fsDay0(now) + 2 * 86400000;
    const out = [];
    for (let t = h0; t < end; t += 3600000) out.push(t);
    return out;
  },

  /* Simulation horaire de la batterie (logique « autoconsommation max. ») */
  _simRun(A, hours, opt = {}) {
    const c = this._config, cap = Number(c.battery_capacity) || 10;
    const endSoc = this._n("battery_end_soc") ?? 10, maxSoc = this._n("battery_max_soc") ?? 100;
    const gridKw = (this._pw("battery_grid_charge_power") ?? 3000) / 1000;
    let soc = opt.soc0 ?? this._n("battery_soc") ?? 50;
    const now = Date.now();
    const res = { pts: [], imp: 0, exp: 0, hpImp: 0, hcImp: 0, fullAt: null, pv: 0, load: 0, gridChg: 0 };
    hours.forEach((t, i) => {
      const frac = i === 0 ? fsClamp((t + 3600000 - now) / 3600000, 0, 1) : 1;
      const h = new Date(t).getHours();
      const pv = (A.fc.get(t) ?? 0) * frac, load = (A.prof[h] ? A.prof[h].load : 0) * frac;
      res.pv += pv; res.load += load;
      const off = this._off.length && fsInOff(this._off, new Date(t + 1800000));
      let imp = 0, exp = 0;
      if (opt.chg && i >= opt.chg.a && i < opt.chg.b && soc < opt.chg.target) {
        // charge réseau : la maison est alimentée par le réseau, la batterie ne se décharge pas
        const e = Math.min(gridKw * frac, ((opt.chg.target - soc) / 100) * cap);
        soc += (e / cap) * 100; res.gridChg += e;
        const net = pv - load;
        if (net >= 0) exp += net; else imp += -net;
        imp += e;
      } else {
        const net = pv - load;
        if (net >= 0) {
          const ch = Math.min(net, Math.max(0, ((maxSoc - soc) / 100) * cap));
          soc += (ch / cap) * 100; exp += net - ch;
        } else {
          const di = Math.min(-net, Math.max(0, ((soc - endSoc) / 100) * cap));
          soc -= (di / cap) * 100; imp += -net - di;
        }
      }
      if (res.fullAt == null && soc >= maxSoc - 0.5 && pv > 0.05) res.fullAt = t;
      res.imp += imp; res.exp += exp;
      if (off) res.hcImp += imp; else res.hpImp += imp;
      res.pts.push({ t, pv, load, soc, imp, exp, off });
    });
    return res;
  },

  _simulate(A) {
    const hours = this._timeline();
    const base = this._simRun(A, hours);
    const S = { hours, base };
    if (!this._off.length) return S;
    // première plage d'heures creuses nocturne à venir (prévision PV quasi nulle)
    let a = -1, b = -1;
    for (let i = 0; i < hours.length; i++) {
      const off = fsInOff(this._off, new Date(hours[i] + 1800000));
      const dark = (A.fc.get(hours[i]) ?? 0) < 0.05;
      if (a < 0 && off && dark) a = i;
      else if (a >= 0 && !(off && dark)) { b = i; break; }
    }
    if (a < 0) return S;
    if (b < 0) b = hours.length;
    // fenêtre d'évaluation : jusqu'à la prochaine heure creuse après la fin de la plage
    let e = hours.length;
    for (let i = b; i < hours.length; i++) if (fsInOff(this._off, new Date(hours[i] + 1800000))) { e = i; break; }
    const win = hours.slice(0, e);
    const pre = this._simRun(A, hours.slice(0, a));
    const socA = pre.pts.length ? pre.pts[pre.pts.length - 1].soc : this._n("battery_soc") ?? 50;
    const maxSoc = Math.min(this._n("battery_max_soc") ?? 100, 100);
    const runs = [];
    const baseW = this._simRun(A, win);
    for (let tgt = Math.ceil(socA / 5) * 5; tgt <= maxSoc + 0.01; tgt += 5) {
      const r = this._simRun(A, win, { chg: { a, b, target: Math.min(tgt, maxSoc) } });
      runs.push({ target: Math.min(tgt, maxSoc), r });
    }
    if (!runs.length) return S;
    const minHp = Math.min(...runs.map((x) => x.r.hpImp));
    const best = runs.find((x) => x.r.hpImp <= minHp + 0.3) || runs[0];
    const afterB = baseW.pts.slice(b);
    S.plan = {
      a, b, e, tA: hours[a], tB: hours[b - 1] + 3600000, socA, target: best.target,
      charge: best.r.gridChg, hpBase: baseW.hpImp, hpBest: best.r.hpImp, expBase: baseW.exp, expBest: best.r.exp,
      pvAfter: fsSum(afterB.map((p) => p.pv)), loadAfter: fsSum(afterB.map((p) => p.load)), fullAt: baseW.fullAt,
    };
    S.best = this._simRun(A, hours, { chg: { a, b, target: best.target } });
    return S;
  },

  _strings(D) {
    if (!D.strIds || D.strIds.length !== 2 || !D.hist) return null;
    const now = Date.now(), t0 = fsDay0(now) - 2 * 86400000;
    const res = D.strIds.map((id) => {
      const rows = (D.hist[id] || []).map((r) => [fsTs(r.lu ?? r.last_updated ?? r.lc ?? r.last_changed), parseFloat(r.s ?? r.state)]).filter(([t, v]) => isFinite(t) && isFinite(v));
      const acc = new Map();
      for (let i = 0; i < rows.length; i++) {
        let a = Math.max(rows[i][0], t0);
        const b = Math.min(i + 1 < rows.length ? rows[i + 1][0] : now, now), v = Math.max(0, rows[i][1]);
        while (a < b) {
          const h = Math.floor(a / 3600000) * 3600000, e = Math.min(b, h + 3600000);
          acc.set(h, (acc.get(h) || 0) + (v * (e - a)) / 3600000);
          a = e;
        }
      }
      return acc;
    });
    const hours = [];
    for (let t = t0; t < now; t += 3600000) hours.push(t);
    const unit = (k) => (this._unit(k).toLowerCase() === "kw" ? 1000 : 1);
    const u1 = unit("pv1_power"), u2 = unit("pv2_power");
    const pts = hours.map((t) => ({ t, a: (res[0].get(t) || 0) * u1, b: (res[1].get(t) || 0) * u2 }));
    const ea = fsSum(pts.map((p) => p.a)) / 1000, eb = fsSum(pts.map((p) => p.b)) / 1000;
    if (ea + eb < 0.05) return null;
    return { pts, ea, eb };
  },

  /* ---------- recommandations ---------- */
  _optRecs(A) {
    const c = this._config, recs = [], f = (v, d = 1) => this._f(v, d), t = (k, v) => this._t(k, v);
    const S = A.sim;
    // 1. Batterie cette nuit
    {
      const R = { key: "bat", icon: "bat", col: FS_COL.bat, head: t("r_bat") };
      const cut = this._n("battery_grid_cutoff_soc");
      const extra = [];
      if (cut != null) extra.push(t("r_bat_now", { c: f(cut, 0) }));
      if (this._eid("hc_toggle")) extra.push(t("r_bat_auto", { s: t(this._on("hc_toggle") ? "on" : "off") }));
      if (!this._off.length) { R.val = t("r_bat_noff"); R.col = FS_COL.idle; }
      else if (!S.plan) { R.val = t("nodata_short"); R.col = FS_COL.idle; }
      else {
        const P = S.plan;
        const span = { a: this._hm(P.tA), b: this._hm(P.tB) };
        if (P.target <= P.socA + 2 || P.hpBase - P.hpBest < 0.3) {
          R.val = t("r_bat_none");
          R.txt = t("r_bat_none_t", { pv: f(P.pvAfter, 1), soc: f(P.socA, 0), load: f(P.loadAfter, 1) });
          if (P.fullAt) R.txt += " " + t("r_bat_full", { h: this._hm(P.fullAt) });
          const tgt = Math.max(5, Math.round(P.socA / 5) * 5);
          if (cut != null && this._eid("battery_grid_cutoff_soc") && cut > tgt + 4) R.act = { id: "cut", label: t("r_bat_act", { t: tgt }), cfm: t("r_bat_cfm", { f: f(cut, 0), t: tgt }), svc: ["number", "set_value", { entity_id: this._eid("battery_grid_cutoff_soc"), value: tgt }] };
        } else {
          R.col = "#ffb547";
          R.val = t("r_bat_chg", { t: f(P.target, 0), ...span });
          const dExp = P.expBest - P.expBase;
          R.txt = t("r_bat_chg_t", { imp: f(P.hpBase, 1), pv: f(P.pvAfter, 1), k: f(P.charge, 1), sav: f(P.hpBase - P.hpBest, 1), exp: dExp > 0.3 ? t("r_bat_chg_x", { e: f(dExp, 1) }) : "" });
          if (cut != null && this._eid("battery_grid_cutoff_soc") && Math.abs(cut - P.target) > 2) R.act = { id: "cut", label: t("r_bat_act", { t: f(P.target, 0) }), cfm: t("r_bat_cfm", { f: f(cut, 0), t: f(P.target, 0) }), svc: ["number", "set_value", { entity_id: this._eid("battery_grid_cutoff_soc"), value: P.target }] };
        }
      }
      if (this._hasPilot() && this._on("auto_mode")) {
        delete R.act;
        extra.unshift(t("r_bat_pilot", { c: f(this._n("pilot_target"), 0) }));
      }
      R.foot = extra.join(" · ");
      recs.push(R);
    }
    // fenêtres de surplus
    const win = (minKw) => {
      const pts = S.base.pts;
      let best = null, cur = null;
      pts.forEach((p, i) => {
        const s = p.pv - p.load;
        if (s >= minKw * (i === 0 ? 0 : 1) && s >= minKw) { if (!cur) cur = { a: i, b: i + 1, k: 0 }; cur.b = i + 1; cur.k += s; }
        else if (cur) { if (!best || cur.k > best.k) best = cur; cur = null; }
      });
      if (cur && (!best || cur.k > best.k)) best = cur;
      if (!best) return null;
      const ta = pts[best.a].t;
      return { ta, tb: pts[best.b - 1].t + 3600000, k: best.k, day: fsDay0(ta) === fsDay0(Date.now()) ? t("today") : t("tomorrow") };
    };
    // 2. Recharge VE
    if (this._eid("ev_mode") || this._eid("ev_power")) {
      const minKw = (Number(c.ev_min_power) || 1400) / 1000;
      const W = win(minKw);
      const mode = this._s("ev_mode");
      const ml = mode ? this._lbl("ev_modes", mode) : "—";
      const R = { key: "ev", icon: "ev", col: FS_COL.ev, head: t("r_ev") };
      if (W && (W.tb - W.ta) >= 2 * 3600000) {
        R.val = t("r_ev_win", { day: W.day, a: this._hh(new Date(W.ta).getHours()), b: this._hh(new Date(W.tb).getHours()) });
        R.txt = t("r_ev_win_t", { k: f(W.k, 1), p: f(minKw, 1), m: ml });
        if (mode && mode !== "pv_preferred" && this._eid("ev_mode")) R.act = { id: "ev", label: t("r_ev_act", { m: this._lbl("ev_modes", "pv_preferred") }), cfm: t("r_ev_cfm", { f: ml, t: this._lbl("ev_modes", "pv_preferred") }), svc: ["select", "select_option", { entity_id: this._eid("ev_mode"), option: "pv_preferred" }] };
      } else {
        R.col = FS_COL.idle;
        R.val = t("r_ev_none");
        R.txt = t("r_ev_none_t", { p: f(minKw, 1), m: ml });
      }
      recs.push(R);
    }
    // 3. Eau chaude PAC
    if (this._eid("heatpump_power")) {
      const W = win((Number(c.heatpump_min_power) || 1000) / 1000);
      const R = { key: "hp", icon: "hp", col: FS_COL.hp, head: t("r_hp") };
      if (W) { R.val = `${W.day[0].toUpperCase() + W.day.slice(1)} · ${this._hh(new Date(W.ta).getHours())}–${this._hh(new Date(W.tb).getHours())}`; R.txt = t("r_hp_t", { a: this._hh(new Date(W.ta).getHours()), day: W.day, k: f(W.k, 1) }); }
      else { R.col = FS_COL.idle; R.val = t("r_hp_none"); }
      recs.push(R);
    }
    // 4. Charge réseau inutile
    if (A.nDays) {
      const R = { key: "waste", icon: "waste", head: t("r_waste") };
      if (A.waste > 1) { R.col = FS_COL.imp; R.val = t("r_waste_bad", { k: f(A.waste, 1) }); R.txt = t("r_waste_bad_t", { n: A.nDays, k: f(A.waste, 1) }); }
      else { R.col = FS_COL.bat; R.val = t("r_waste_ok"); R.txt = t("r_waste_ok_t"); }
      recs.push(R);
    }
    // 5. Injection
    if (A.T.pv > 0.5) {
      const p = (A.T.exp / A.T.pv) * 100;
      const R = { key: "exp", icon: "exp", head: t("r_exp") };
      if (p > 12 && A.expWin) {
        R.col = FS_COL.exp; R.val = t("r_exp_v", { k: f(A.T.exp, 1), p: f(p, 0) });
        const ep = c.export_price != null ? Number(c.export_price) : null;
        const loss = A.price != null && ep != null ? t("r_exp_loss", { e: f(A.T.exp * (A.price - ep), 2) }) : "";
        R.txt = t("r_exp_t", { a: this._hh(A.expWin[0]), b: this._hh(A.expWin[1]), loss });
      } else { R.col = FS_COL.bat; R.val = t("r_exp_ok", { p: f(100 - p, 0) }); }
      recs.push(R);
    }
    // 6. Mode batterie
    {
      const mode = this._s("battery_mode");
      const cap = Number(c.battery_capacity) || 10;
      const R = { key: "mode", icon: "mode", col: FS_COL.idle, head: t("r_mode") };
      R.val = t("r_mode_v", { m: mode ? this._lbl("bat_modes", mode) : "—" });
      if (A.nDays && A.T.chg > 0.1) R.txt = t("r_mode_t", { c: f(A.T.dis / cap / A.nDays, 2), e: f(fsClamp((A.T.dis / A.T.chg) * 100, 0, 100), 0), ci: f(A.T.chg, 0), di: f(A.T.dis, 0) });
      const inOff = this._off.length && fsInOff(this._off, new Date());
      if (mode && mode !== "maximise_self_consumption" && !inOff && this._eid("battery_mode")) {
        R.col = "#ffb547";
        R.txt = (R.txt ? R.txt + " " : "") + t("r_mode_warn");
        R.act = { id: "mode", label: t("r_mode_act"), cfm: t("r_mode_cfm", { f: this._lbl("bat_modes", mode) }), svc: ["select", "select_option", { entity_id: this._eid("battery_mode"), option: "maximise_self_consumption" }] };
      }
      recs.push(R);
    }
    return recs;
  },

  async _optApply(id) {
    const rec = (this._optRecsCache || []).find((r) => r.act && r.act.id === id);
    this._optConfirm = null;
    if (!rec) { this._optRender(); return; }
    try {
      const [d, s, data] = rec.act.svc;
      await this._hass.callService(d, s, data);
      this._optMsg = { id, ok: true, text: this._t("applied") };
    } catch (e) {
      this._optMsg = { id, ok: false, text: this._t("apply_err", { e: (e && e.message) || e }) };
    }
    this._optRender();
  },

  /* ---------- rendu ---------- */
  _optRender() {
    const r = this.shadowRoot, el = r.getElementById("o_body");
    if (!el) return;
    const t = (k, v) => this._t(k, v), D = this._optData;
    this._bar("o_bar", `
      <div class="seg" role="group">${[7, 14, 30].map((n) => `<button data-days="${n}" aria-pressed="${this._optDays === n}">${t("d", { n })}</button>`).join("")}</div>
      <div style="display:flex;gap:10px;align-items:center"><span class="omuted">${this._optLoading ? t("loading") : D && D.at ? t("updated", { t: this._timeStr(D.at) }) : ""}</span>
      <button class="obtn" data-refresh>${t("refresh")}</button></div>`);
    if (!D) { el.innerHTML = this._optLoading ? `<div class="onote">${t("loading")}</div>` : ""; return; }
    if (D.error) { el.innerHTML = `<div class="onote">${fsEsc(D.error)}</div>`; return; }
    const A = D.A, W = this._widths(el), f = (v, d = 1) => this._f(v, d);
    const T = A.T;
    const kp = (l, v, s) => `<div class="kpi"><div class="tl">${l}</div><div class="tv">${v}</div><div class="ts">${s || ""}</div></div>`;
    const self = T.pv > 0.1 ? ((T.pv - T.exp) / T.pv) * 100 : null, auto = T.load > 0.1 ? fsAuto(T) * 100 : null;
    const cap = Number(this._config.battery_capacity) || 10;
    const kpis = [
      kp(t("kp_self"), self != null ? `${f(self, 0)}<small>%</small>` : "—", t("kp_self_s", { k: f(T.pv - T.exp, 0) })),
      kp(t("kp_auto"), auto != null ? `${f(auto, 0)}<small>%</small>` : "—", t("kp_auto_s", { k: f(T.fromGrid + T.gridToBat, 0) })),
      A.price != null ? kp(t("kp_save"), `${f(Math.max(0, T.pv - T.exp) * A.price, 0)}<small>€</small>`, t("kp_save_s")) : "",
      A.nDays ? kp(t("kp_cyc"), `${f(T.dis / cap / A.nDays, 2)}<small>/j</small>`, T.chg > 0.1 ? t("kp_cyc_s", { e: f(fsClamp((T.dis / T.chg) * 100, 0, 100), 0) }) : "") : "",
      T.ev > 0.2 ? kp(t("kp_ev"), `${f((T.evSolar / T.ev) * 100, 0)}<small>%</small>`, t("kp_ev_s", { k: f(T.ev, 0) })) : "",
      T.pv > 0.1 ? kp(t("kp_exp"), `${f(T.exp, 0)}<small>kWh</small>`, t("kp_exp_s", { p: f((T.exp / T.pv) * 100, 0) })) : "",
    ].join("");
    const recs = this._optRecs(A);
    this._optRecsCache = recs;
    const recHtml = recs.map((R) => {
      const act = R.act ? (this._optConfirm === R.act.id
        ? `<div class="cfm">${fsEsc(R.act.cfm)}<div class="ra"><button class="abtn" data-ok="${R.act.id}">${t("confirm")}</button><button class="abtn sec" data-cancel>${t("cancel")}</button></div></div>`
        : `<div class="ra"><button class="abtn" data-act="${R.act.id}">${fsEsc(R.act.label)}</button></div>`) : "";
      const msg = this._optMsg && R.act && this._optMsg.id === R.act.id ? `<div class="omsg ${this._optMsg.ok ? "ok" : "err"}">${fsEsc(this._optMsg.text)}</div>` : "";
      return `<div class="rec" style="--rc:${R.col || FS_COL.idle}"><div class="ic">${FS_ICONS[R.icon] || ""}</div><div>
        <div class="rh">${fsEsc(R.head)}</div><div class="rv">${fsEsc(R.val || "")}</div>${R.txt ? `<div class="rt">${fsEsc(R.txt)}</div>` : ""}
        ${R.foot ? `<div class="rt omuted">${fsEsc(R.foot)}</div>` : ""}${act}${msg}</div></div>`;
    }).join("");
    el.innerHTML = `
      ${A.missing.length ? `<div class="onote" style="padding:0 2px 10px;text-align:left">${t("nodata", { e: A.missing.join(", ") })}</div>` : ""}
      <div class="kpis">${kpis}</div>
      <div class="recs">${recHtml}</div>
      <div class="ogrid">
        <div class="opanel wide">${this._optFcPanel(A, W.wide)}</div>
        <div class="opanel">${this._optProfPanel(A, W.half)}</div>
        <div class="opanel">${A.str ? this._optStrPanel(A, W.half) : this._optDayPanel(A, W.half)}</div>
        ${A.str ? `<div class="opanel wide">${this._optDayPanel(A, W.wide)}</div>` : ""}
      </div>`;
  },

  _optFcPanel(A, w) {
    const t = (k, v) => this._t(k, v), f = (v, d = 1) => this._f(v, d);
    const S = A.sim, sim = S.best || S.base, pts = sim.pts;
    if (!pts.length || !A.fc.size) return `<div class="ot">${t("fc_title")}</div><div class="onote">${t("nodata_short")}</div>`;
    const cats = pts.map((p) => { const h = new Date(p.t).getHours(); return h % 3 === 0 ? this._hh(h) : ""; });
    const ymax = Math.max(0.5, ...pts.map((p) => Math.max(p.pv, p.load))) * 1.15;
    const chart = fsPlot({
      w, h: 250, aria: t("fc_title"), x: { cats, maxLabels: 24, labelW: 30 },
      y: { min: 0, max: ymax, label: t("y_kwh_h"), fmt: (v) => f(v, ymax < 3 ? 1 : 0) },
      y2: { ticks: [0, 50, 100], fmt: (v) => `${v}%`, map: (v) => (v / 100) * ymax / 1.15 },
      layers: ({ sx, sy, bw, y0, m, ph }) => {
        let s = "";
        let i0 = -1;
        pts.forEach((p, i) => {
          if (p.off && i0 < 0) i0 = i;
          if ((!p.off || i === pts.length - 1) && i0 >= 0) { const i1 = p.off ? i + 1 : i; s += `<rect class="hc" x="${sx(i0) - bw / 2}" y="${m.t}" width="${(i1 - i0) * bw}" height="${ph}"/>`; i0 = -1; }
        });
        const d0 = fsDay0(Date.now()) + 86400000;
        const im = pts.findIndex((p) => p.t >= d0);
        if (im > 0) s += `<line class="gl z" x1="${sx(im) - bw / 2}" x2="${sx(im) - bw / 2}" y1="${m.t}" y2="${m.t + ph}"/>`;
        pts.forEach((p, i) => {
          const bwid = Math.max(2, bw - 2);
          const tip = `${new Date(p.t).toLocaleDateString(this._lang(), { weekday: "short" })} ${this._hh(new Date(p.t).getHours())}\n${t("fc_pv")}: ${f(p.pv, 2)} kWh\n${t("fc_load")}: ${f(p.load, 2)} kWh\n${t("fc_soc")}: ${f(p.soc, 0)} %`;
          s += `<rect class="col" x="${sx(i) - bw / 2}" y="${m.t}" width="${bw}" height="${ph}" fill="transparent" data-tip="${fsEsc(tip)}"/>`;
          s += fsRect(sx(i) - bwid / 2, sy(p.pv), y0, bwid, FS_SER.pv, tip, "top");
        });
        s += `<path d="${fsPath(pts.map((p, i) => [sx(i), sy(p.load)]))}" fill="none" stroke="${FS_SER.home}" stroke-width="2.2" pointer-events="none"/>`;
        s += `<path d="${fsPath(pts.map((p, i) => [sx(i), sy((p.soc / 100) * ymax / 1.15)]))}" fill="none" stroke="${FS_SER.soc}" stroke-width="2.2" stroke-dasharray="6 4" pointer-events="none"/>`;
        s += `<line class="now" x1="${sx(0) - bw / 2}" x2="${sx(0) - bw / 2}" y1="${m.t}" y2="${m.t + ph}"/>`;
        return s;
      },
    });
    const legend = `<div class="leg"><span><i style="background:${FS_SER.pv}"></i>${t("fc_pv")}</span><span><i class="ln" style="background:${FS_SER.home}"></i>${t("fc_load")}</span>
      <span><i class="dash" style="border-color:${FS_SER.soc}"></i>${t("fc_soc")}</span>${this._off.length ? `<span><i style="background:rgba(159,212,255,.25)"></i>${t("fc_hc")}</span>` : ""}</div>`;
    return `<div class="ot">${t("fc_title")}</div><div class="os">${t("fc_sub")}</div>${legend}${chart}
      <div class="ostat">${t("fc_stats", { pv: f(sim.pv, 1), load: f(sim.load, 1), imp: f(sim.imp, 1), exp: f(sim.exp, 1) })}</div>`;
  },

  _optProfPanel(A, w) {
    const t = (k, v) => this._t(k, v), f = (v, d = 1) => this._f(v, d);
    const P = A.prof;
    if (!A.nDays) return `<div class="ot">${t("prof_title")}</div><div class="onote">${t("nodata_short")}</div>`;
    const ymax = Math.max(0.3, ...P.map((p) => Math.max(p.pv, p.load))) * 1.12;
    const chart = fsPlot({
      w, h: 220, aria: t("prof_title"), x: { cats: P.map((_, h) => (h % 3 === 0 ? this._hh(h) : "")), maxLabels: 24, labelW: 30 },
      y: { min: 0, max: ymax, label: t("y_kwh_h"), fmt: (v) => f(v, 1) },
      layers: ({ sx, sy, bw, y0, m, ph }) => {
        let s = "";
        P.forEach((p, h) => {
          const tip = `${this._hh(h)}–${this._hh(h + 1)}\n${t("fc_pv")}: ${f(p.pv, 2)} kWh\n${t("fc_load")}: ${f(p.load, 2)} kWh`;
          s += `<rect class="col" x="${sx(h) - bw / 2}" y="${m.t}" width="${bw}" height="${ph}" fill="transparent" data-tip="${fsEsc(tip)}"/>`;
          s += fsRect(sx(h) - (bw - 3) / 2, sy(p.pv), y0, bw - 3, FS_SER.pv, tip, "top");
        });
        s += `<path d="${fsPath(P.map((p, h) => [sx(h), sy(p.load)]))}" fill="none" stroke="${FS_SER.home}" stroke-width="2.2" pointer-events="none"/>`;
        return s;
      },
    });
    const night = fsSum(P.filter((p) => p.pv < p.load * 0.5).map((p) => Math.max(0, p.load - p.pv)));
    const cap = Number(this._config.battery_capacity) || 10;
    const endSoc = this._n("battery_end_soc") ?? 10, maxSoc = this._n("battery_max_soc") ?? 100;
    const legend = `<div class="leg"><span><i style="background:${FS_SER.pv}"></i>${t("fc_pv")}</span><span><i class="ln" style="background:${FS_SER.home}"></i>${t("fc_load")}</span></div>`;
    return `<div class="ot">${t("prof_title")}</div><div class="os">${t("prof_sub")}</div>${legend}${chart}
      <div class="ostat">${t("prof_stats", { n: f(night, 1), u: f(((maxSoc - endSoc) / 100) * cap, 1) })}</div>`;
  },

  _optStrPanel(A, w) {
    const t = (k, v) => this._t(k, v), f = (v, d = 1) => this._f(v, d), S = A.str;
    const c = this._config;
    const na = c.pv1_name ? `PV 1 · ${c.pv1_name}` : "PV 1", nb = c.pv2_name ? `PV 2 · ${c.pv2_name}` : "PV 2";
    const pts = S.pts;
    const ymax = Math.max(100, ...pts.map((p) => Math.max(p.a, p.b))) * 1.1;
    const cats = pts.map((p) => { const h = new Date(p.t).getHours(); return h === 12 ? new Date(p.t).toLocaleDateString(this._lang(), { weekday: "short", day: "numeric" }) : ""; });
    const chart = fsPlot({
      w, h: 220, aria: t("str_title"), x: { cats, maxLabels: 72, labelW: 10 },
      y: { min: 0, max: ymax, label: "W", fmt: (v) => (v >= 1000 ? `${f(v / 1000, 1)}k` : `${v}`) },
      layers: ({ sx, sy, bw, m, ph }) => {
        let s = `<path d="${fsPath(pts.map((p, i) => [sx(i), sy(p.a)]))}" fill="none" stroke="${FS_SER.pv}" stroke-width="2"/>`;
        s += `<path d="${fsPath(pts.map((p, i) => [sx(i), sy(p.b)]))}" fill="none" stroke="${FS_SER.exp}" stroke-width="2"/>`;
        pts.forEach((p, i) => {
          if (p.a + p.b < 5) return;
          const tip = `${new Date(p.t).toLocaleDateString(this._lang(), { weekday: "short" })} ${this._hh(new Date(p.t).getHours())}\n${na}: ${f(p.a, 0)} W\n${nb}: ${f(p.b, 0)} W`;
          s += `<rect class="col" x="${sx(i) - bw / 2}" y="${m.t}" width="${bw}" height="${ph}" fill="transparent" data-tip="${fsEsc(tip)}"/>`;
        });
        return s;
      },
    });
    const legend = `<div class="leg"><span><i class="ln" style="background:${FS_SER.pv}"></i>${fsEsc(na)}</span><span><i class="ln" style="background:${FS_SER.exp}"></i>${fsEsc(nb)}</span></div>`;
    return `<div class="ot">${t("str_title")}</div><div class="os">${t("str_sub")}</div>${legend}${chart}
      <div class="ostat">${t("str_stats", { a: fsEsc(na), ea: f(S.ea, 1), b: fsEsc(nb), eb: f(S.eb, 1), r: S.eb > 0.01 ? f(S.ea / S.eb, 2) : "—" })}</div>`;
  },

  _optDayPanel(A, w) {
    const t = (k, v) => this._t(k, v), f = (v, d = 0) => this._f(v, d);
    const Dl = A.daily.filter((d) => d.self != null || d.auto != null);
    if (Dl.length < 2) return `<div class="ot">${t("day_title")}</div><div class="onote">${t("nodata_short")}</div>`;
    const cats = Dl.map((d) => new Date(d.t).toLocaleDateString(this._lang(), { day: "numeric", month: "numeric" }));
    const chart = fsPlot({
      w, h: 200, aria: t("day_title"), x: { cats, maxLabels: 10 },
      y: { min: 0, max: 100, n: 4, fmt: (v) => `${v}%` },
      layers: ({ sx, sy, bw, m, ph }) => {
        let s = "";
        const line = (k, col) => {
          const p = Dl.map((d, i) => (d[k] == null ? null : [sx(i), sy(d[k] * 100)])).filter(Boolean);
          s += `<path d="${fsPath(p)}" fill="none" stroke="${col}" stroke-width="2.2"/>`;
          p.forEach(([x, y]) => { s += `<circle cx="${x}" cy="${y}" r="3.2" fill="${col}" stroke="#17191d" stroke-width="1.5" pointer-events="none"/>`; });
        };
        line("self", FS_SER.pv); line("auto", FS_SER.bat);
        Dl.forEach((d, i) => {
          const tip = `${cats[i]}\n${t("kp_self")}: ${d.self != null ? f(d.self * 100) : "—"} %\n${t("kp_auto")}: ${d.auto != null ? f(d.auto * 100) : "—"} %\n${t("rc_prod")}: ${this._f(d.pv, 1)} kWh · ${t("rc_cons")}: ${this._f(d.load, 1)} kWh`;
          s += `<rect class="col" x="${sx(i) - bw / 2}" y="${m.t}" width="${bw}" height="${ph}" fill="transparent" data-tip="${fsEsc(tip)}"/>`;
        });
        return s;
      },
    });
    const legend = `<div class="leg"><span><i class="ln" style="background:${FS_SER.pv}"></i>${t("kp_self")}</span><span><i class="ln" style="background:${FS_SER.bat}"></i>${t("kp_auto")}</span></div>`;
    return `<div class="ot">${t("day_title")}</div><div class="os">${t("day_sub")}</div>${legend}${chart}`;
  },
};

/* ------------------------------------------------------------------------------------------ */
/*  Récap des consommations                                                                   */
/* ------------------------------------------------------------------------------------------ */
const FsRecMixin = {
  _recShow() {
    const key = `${this._recP}:${this._recOff}`;
    const c = this._recCache[key];
    if (!c || (this._recOff === 0 && Date.now() - c.at > 10 * 60000)) this._recLoad(); else { this._recData = c; this._recRender(); }
  },

  _recRange() {
    const now = new Date(), P = this._recP, o = this._recOff;
    let s, e, period, bucket;
    if (P === "day") { s = new Date(now); s.setHours(0, 0, 0, 0); s.setDate(s.getDate() - o); e = new Date(s); e.setDate(e.getDate() + 1); period = "hour"; bucket = "hour"; }
    else if (P === "week") { s = new Date(now); s.setHours(0, 0, 0, 0); s.setDate(s.getDate() - ((s.getDay() + 6) % 7) - 7 * o); e = new Date(s); e.setDate(e.getDate() + 7); period = "hour"; bucket = "day"; }
    else if (P === "month") { s = new Date(now.getFullYear(), now.getMonth() - o, 1); e = new Date(s.getFullYear(), s.getMonth() + 1, 1); period = "hour"; bucket = "day"; }
    else { s = new Date(now.getFullYear() - o, 0, 1); e = new Date(s.getFullYear() + 1, 0, 1); period = "hour"; bucket = "month"; }
    return { s: s.getTime(), e: Math.min(e.getTime(), Date.now()), eFull: e.getTime(), period, bucket };
  },

  async _recLoad() {
    const key = `${this._recP}:${this._recOff}`;
    this._recLoading = key;
    this._recRender();
    const R = this._recRange();
    let data;
    try {
      // statistiques horaires (répartition fiable), découpées par mois pour l'année
      const chunks = [];
      if (R.bucket === "month") {
        for (let m = 0; m < 12; m++) {
          const a = new Date(new Date(R.s).getFullYear(), m, 1).getTime(), b = new Date(new Date(R.s).getFullYear(), m + 1, 1).getTime();
          if (a < R.e) chunks.push([a, Math.min(b, R.e)]);
        }
      } else chunks.push([R.s, R.e]);
      const parts = await Promise.all(chunks.map(([a, b]) => this._fetchStats(FS_E, a, b, R.period)));
      const S = { _missing: [] };
      for (const k of Object.keys(FS_E)) S[k] = new Map(parts.flatMap((p) => [...(p[k] || new Map())]));
      S._missing = parts.length ? parts.map((p) => p._missing || []).reduce((x, y) => x.filter((i) => y.includes(i))) : [];
      const rows = this._rows(S);
      const buckets = new Map();
      const bkey = (t) => {
        const d = new Date(t);
        if (R.bucket === "hour") return t;
        if (R.bucket === "day") return fsDay0(t);
        return new Date(d.getFullYear(), d.getMonth(), 1).getTime();
      };
      for (const r of rows) { const k = bkey(r.t); if (!buckets.has(k)) buckets.set(k, []); buckets.get(k).push(r); }
      // toutes les cases de la période, même vides
      const slots = [];
      if (R.bucket === "hour") for (let t = R.s; t < R.eFull; t += 3600000) slots.push(t);
      else if (R.bucket === "day") for (let d = new Date(R.s); d.getTime() < R.eFull; d.setDate(d.getDate() + 1)) slots.push(d.getTime());
      else for (let mth = 0; mth < 12; mth++) slots.push(new Date(new Date(R.s).getFullYear(), mth, 1).getTime());
      const B = slots.map((t) => ({ t, ...fsAdd(buckets.get(t) || []), empty: !buckets.has(t) }));
      data = { at: Date.now(), R, B, T: fsAdd(rows), missing: S._missing || [], lastT: rows.length ? rows[rows.length - 1].t : null };
    } catch (e) {
      data = { at: Date.now(), R, error: String((e && e.message) || e) };
    }
    this._recCache[key] = data;
    if (this._recLoading === key) { this._recLoading = null; this._recData = data; }
    this._recRender();
  },

  _recLabel(R) {
    const L = this._lang(), s = new Date(R.s);
    if (this._recP === "day") return s.toLocaleDateString(L, { weekday: "long", day: "numeric", month: "long" });
    if (this._recP === "week") { const e = new Date(R.eFull - 86400000); return `${s.toLocaleDateString(L, { day: "numeric", month: "short" })} – ${e.toLocaleDateString(L, { day: "numeric", month: "short" })}`; }
    if (this._recP === "month") return s.toLocaleDateString(L, { month: "long", year: "numeric" });
    return String(s.getFullYear());
  },

  _recRender() {
    const r = this.shadowRoot, el = r.getElementById("r_body");
    if (!el) return;
    const t = (k, v) => this._t(k, v), f = (v, d = 1) => this._f(v, d);
    const R = this._recRange();
    this._bar("r_bar", `
      <div class="seg" role="group">${["day", "week", "month", "year"].map((p) => `<button data-period="${p}" aria-pressed="${this._recP === p}">${t("p_" + p)}</button>`).join("")}</div>
      <div class="nav"><button class="obtn" data-nav="1" aria-label="◀">◀</button><span class="lab">${fsEsc(this._recLabel(R))}</span>
      <button class="obtn" data-nav="-1" aria-label="▶"${this._recOff === 0 ? " disabled" : ""}>▶</button></div>`);
    const D = this._recData;
    const key = `${this._recP}:${this._recOff}`;
    if (this._recLoading && (!D || this._recCache[key] !== D)) { el.innerHTML = `<div class="onote">${t("loading")}</div>`; return; }
    if (!D) { el.innerHTML = ""; return; }
    if (D.error) { el.innerHTML = `<div class="onote">${fsEsc(D.error)}</div>`; return; }
    const W = this._widths(el), T = D.T, price = this._n("price");
    const ep = this._config.export_price != null ? Number(this._config.export_price) : null;
    const pct = (a, b) => (b > 0.01 ? (a / b) * 100 : null);
    const self = pct(T.pv - T.exp, T.pv), auto = T.load > 0.01 ? fsAuto(T) * 100 : null;
    const kp = (l, v, s, col) => `<div class="kpi"${col ? ` style="border-top:2px solid ${col}"` : ""}><div class="tl">${l}</div><div class="tv">${v}</div><div class="ts">${s || ""}</div></div>`;
    const kwh = (v, d = 1) => `${f(v, v >= 100 ? 0 : d)}<small>kWh</small>`;
    const kpis = [
      kp(t("rc_prod"), kwh(T.pv), "", FS_SER.pv),
      kp(t("rc_cons"), kwh(T.load), D.lastT && this._recOff === 0 && this._recP === "day" ? t("until", { h: this._hh(new Date(D.lastT).getHours() + 1) }) : "", FS_SER.home),
      kp(t("rc_self"), self != null ? `${f(self, 0)}<small>%</small>` : "—", "", FS_SER.pv),
      kp(t("rc_auto"), auto != null ? `${f(auto, 0)}<small>%</small>` : "—", "", FS_SER.bat),
      kp(t("rc_imp"), kwh(T.imp), price != null ? t("rc_cost", { e: f(T.imp * price, 2) }) : "", FS_SER.imp),
      kp(t("rc_exp"), kwh(T.exp), ep != null ? t("rc_exp_s", { e: f(T.exp * ep, 2) }) : "", FS_SER.exp),
      kp(t("rc_bat"), kwh(T.dis), t("rc_bat_s", { c: f(T.chg, 1), d: f(T.dis, 1) }), FS_SER.bat),
      T.ev > 0.05 ? kp(t("rc_ev"), kwh(T.ev), t("rc_ev_s", { p: f(pct(T.evSolar, T.ev), 0) }), FS_SER.ev) : "",
      T.hp > 0.05 ? kp(t("rc_hp"), kwh(T.hp), t("rc_hp_s", { p: f(pct(T.hp, T.load), 0) }), FS_SER.hp) : "",
      price != null ? kp(t("rc_save"), `${f(Math.max(0, T.pv - T.exp) * price + (ep != null ? T.exp * ep : 0), 2)}<small>€</small>`, t("rc_save_s"), FS_SER.bat) : "",
    ].join("");
    const split = (title, total, parts, foot) => {
      const sum = fsSum(parts.map((p) => p[1]));
      return `<div class="split"><div class="sl"><span>${title}</span><span>${f(total, 1)} kWh</span></div>
        <div class="sb">${parts.map(([, v, col, n]) => (sum > 0 && v > 0 ? `<i style="width:${(v / sum) * 100}%;background:${col}" data-tip="${fsEsc(`${n}: ${f(v, 1)} kWh (${f((v / sum) * 100, 0)} %)`)}"></i>` : "")).join("")}</div>
        <div class="sk">${parts.map(([, v, col, n]) => `<span><i style="display:inline-block;width:9px;height:9px;border-radius:2px;background:${col};margin-right:5px"></i>${n} <b>${sum > 0 ? f((v / sum) * 100, 0) : "—"} %</b> · ${f(v, 1)} kWh</span>`).join("")}${foot ? `<span>${foot}</span>` : ""}</div></div>`;
    };
    const splits = split(t("sp_prod"), T.pv, [["d", T.pvDirect, FS_SER.pv, t("s_direct")], ["b", T.pvToBat, FS_SER.bat, t("s_tobat")], ["e", T.exp, FS_SER.exp, t("s_exp")]])
      + split(t("sp_cons"), T.load, [["p", T.pvDirect, FS_SER.pv, t("s_fpv")], ["b", T.fromBat, FS_SER.bat, t("s_fbat")], ["g", T.fromGrid, FS_SER.imp, t("s_fgrid")]], T.gridToBat > 0.1 ? t("s_gridbat", { k: f(T.gridToBat, 1) }) : "");
    el.innerHTML = `
      ${D.missing.length ? `<div class="onote" style="padding:0 2px 10px;text-align:left">${t("nodata", { e: D.missing.join(", ") })}</div>` : ""}
      <div class="kpis">${kpis}</div>
      <div class="opanel wide">${splits}</div>
      <div class="opanel wide" style="margin-top:12px">${this._recMirror(D, W.wide)}</div>`;
  },

  _recMirror(D, w) {
    const t = (k, v) => this._t(k, v), f = (v, d = 1) => this._f(v, d), B = D.B, L = this._lang();
    const cats = B.map((b) => {
      const d = new Date(b.t);
      if (D.R.bucket === "hour") return d.getHours() % 3 === 0 ? this._hh(d.getHours()) : "";
      if (D.R.bucket === "day") return this._recP === "week" ? d.toLocaleDateString(L, { weekday: "short", day: "numeric" }) : String(d.getDate());
      return d.toLocaleDateString(L, { month: "short" });
    });
    const up = [["pvDirect", FS_SER.pv, t("s_direct")], ["pvToBat", FS_SER.bat, t("s_tobat")], ["exp", FS_SER.exp, t("s_exp")]];
    const dn = [["pvDirect", FS_SER.pv, t("s_fpv")], ["fromBat", FS_SER.bat, t("s_fbat")], ["fromGrid", FS_SER.imp, t("s_fgrid")]];
    const umax = Math.max(0.1, ...B.map((b) => fsSum(up.map(([k]) => b[k])))), dmax = Math.max(0.1, ...B.map((b) => fsSum(dn.map(([k]) => b[k]))));
    const chart = fsPlot({
      w, h: 300, aria: t("mir_title"), x: { cats, maxLabels: 31, labelW: D.R.bucket === "day" && this._recP === "week" ? 60 : 26 },
      y: { min: -dmax * 1.08, max: umax * 1.08, n: 6, label: "kWh", fmt: (v) => f(Math.abs(v), Math.max(umax, dmax) < 3 ? 1 : 0) },
      layers: ({ sx, sy, bw, y0, m, ph }) => B.map((b, i) => {
        const wB = Math.max(2, Math.min(34, bw * 0.7)), x = sx(i) - wB / 2;
        const tip = `${cats[i] || new Date(b.t).toLocaleDateString(L)}\n${t("rc_prod")}: ${f(b.pv)} kWh\n  ${up.map(([k, , n]) => `${n} ${f(b[k])}`).join(" · ")}\n${t("rc_cons")}: ${f(b.load)} kWh\n  ${dn.map(([k, , n]) => `${n} ${f(b[k])}`).join(" · ")}${b.ev > 0.05 ? `\n${t("rc_ev")}: ${f(b.ev)} kWh` : ""}`;
        let s = `<rect class="col" x="${sx(i) - bw / 2}" y="${m.t}" width="${bw}" height="${ph}" fill="transparent" data-tip="${fsEsc(tip)}"/>`;
        let acc = 0;
        up.forEach(([k, col], j) => { const v = b[k]; if (v <= 0) return; const last = up.slice(j + 1).every(([k2]) => b[k2] <= 0); s += fsRect(x, sy(acc + v), sy(acc), wB, col, tip, last ? "top" : null); acc += v; });
        acc = 0;
        dn.forEach(([k, col], j) => { const v = b[k]; if (v <= 0) return; const last = dn.slice(j + 1).every(([k2]) => b[k2] <= 0); s += fsRect(x, sy(-acc), sy(-acc - v), wB, col, tip, last ? "bottom" : null); acc += v; });
        void y0;
        return s;
      }).join(""),
    });
    const legend = `<div class="leg"><span><i style="background:${FS_SER.pv}"></i>${t("s_fpv")}</span><span><i style="background:${FS_SER.bat}"></i>${t("s_tobat")}</span>
      <span><i style="background:${FS_SER.exp}"></i>${t("rc_exp")}</span><span><i style="background:${FS_SER.imp}"></i>${t("rc_imp")}</span></div>`;
    return `<div class="ot">${t("mir_title")}</div><div class="os">${t("mir_sub")}</div>${legend}${chart}`;
  },
};

/* ------------------------------------------------------------------------------------------ */
/*  Pilotage automatique (mode auto des heures creuses)                                       */
/* ------------------------------------------------------------------------------------------ */
const FS_PIL_COL = { off: "#7d8794", attente: "#9fd4ff", charge: "#ffb547", ve: "#4f9dff", preserve: "#3ddc84", hc: "#9fd4ff" };
const FS_ROBOT = `<svg viewBox="0 0 24 24"><rect x="4" y="8" width="16" height="11" rx="3"/><path d="M12 8V5M9 13h.01M15 13h.01M9 16h6M2 12v3M22 12v3"/><circle cx="12" cy="4" r="1"/></svg>`;

const FsPilotMixin = {
  _hasPilot() { return !!(this._hass && this._eid("auto_mode")); },

  _pilInit() {
    const v = this.shadowRoot.getElementById("v_pil");
    v.addEventListener("click", (ev) => {
      const sw = ev.target.closest("[data-sw]");
      if (sw) { this._pilCall("input_boolean", "toggle", sw.dataset.sw); return; }
      if (ev.target.closest("[data-auto]")) { this._pilToggle(); return; }
      const mi = ev.target.closest("[data-mi]");
      if (mi) { const id = this._eid(mi.dataset.mi); if (id) this._moreInfo(id); }
    });
    v.addEventListener("change", (ev) => {
      const el = ev.target;
      const k = el.dataset && el.dataset.k;
      if (!k) return;
      if (el.type === "time") this._pilCall("input_datetime", "set_datetime", k, { time: `${el.value}:00` });
      else if (el.tagName === "SELECT") this._pilCall("input_select", "select_option", k, { option: el.value });
      else if (el.type === "number") {
        const st = this._st(k), a = st ? st.attributes : {};
        let val = parseFloat(el.value);
        if (!isFinite(val)) return;
        val = fsClamp(val, a.min ?? -Infinity, a.max ?? Infinity);
        this._pilCall("input_number", "set_value", k, { value: val });
      }
    });
  },

  _pilCall(domain, service, key, data = {}) {
    const id = this._eid(key);
    if (!id || !this._hass) return;
    this._hass.callService(domain, service, Object.assign({ entity_id: id }, data)).catch((e) => {
      this._pilErr = String((e && e.message) || e);
      this._pilRender(true);
    });
  },

  _pilToggle() { this._pilCall("input_boolean", "toggle", "auto_mode"); },

  _pilWin() {
    const W = this._off;
    if (!W.length) return {};
    const now = Date.now(), d0 = fsDay0(now), inst = [];
    for (let d = -1; d <= 2; d++) for (const [a, b] of W) {
      const s = new Date(d0); s.setDate(s.getDate() + d); s.setMinutes(a);
      const e = new Date(d0); e.setDate(e.getDate() + d + (b > a ? 0 : 1)); e.setMinutes(b);
      inst.push([s.getTime(), e.getTime()]);
    }
    inst.sort((x, y) => x[0] - y[0]);
    return { cur: inst.find(([s, e]) => s <= now && now < e), nxt: inst.find(([s]) => s > now) };
  },

  _pilStatus() {
    const t = (k, v) => this._t(k, v), f = (v, d = 0) => this._f(v, d);
    let st = this._s("pilot_state");
    const auto = this._on("auto_mode");
    if (!st) st = auto ? "attente" : "off";
    const L = this._t("pil_st");
    const { cur, nxt } = this._pilWin();
    const soc = f(this._n("battery_soc")), c = f(this._n("pilot_target"));
    const pw = this._n("charge_power");
    let d = "";
    if (st === "off") d = t("pil_d_off");
    else if (st === "attente") d = nxt ? t("pil_d_attente", { a: this._hm(nxt[0]), b: this._hm(nxt[1]), c, soc }) : "";
    else if (st === "charge") d = t("pil_d_charge", { c, p: this._W(pw), soc, b: cur ? this._hm(cur[1]) : "—" });
    else if (st === "ve") d = t("pil_d_ve", { w: this._W(this._n("pilot_limit")) });
    else if (st === "preserve") d = t("pil_d_preserve", { soc, b: cur ? this._hm(cur[1]) : "—" });
    else if (st === "hc") d = t("pil_d_hc", { soc, c, b: cur ? this._hm(cur[1]) : "—" });
    return { st, auto, label: (L && L[st]) || st, detail: d, col: FS_PIL_COL[st] || FS_COL.idle, live: ["charge", "ve", "preserve"].includes(st) };
  },

  /* bouton d'en-tête, bandeau du schéma, contenu de l'onglet */
  _pilUpdate() {
    const r = this.shadowRoot;
    if (!r) return;
    const has = this._hasPilot() && this._config.show_pilot !== false;
    const btn = r.getElementById("b_auto"), ban = r.getElementById("pban");
    if (btn) btn.classList.toggle("show", has);
    if (ban) ban.classList.toggle("show", has);
    const tp = r.getElementById("tab_p");
    if (tp) tp.classList.toggle("hide", !has);
    if (!has) return;
    const S = this._pilStatus();
    btn.setAttribute("aria-pressed", String(S.auto));
    btn.title = `${this._t("pil_auto")} : ${this._t(S.auto ? "pil_on" : "pil_off")}`;
    ban.style.setProperty("--pc", S.col);
    ban.classList.toggle("live", S.live);
    const txt = S.st === "off" ? `${this._t("pil_auto")} : ${this._t("pil_off")}` : `${S.label}${S.detail ? ` · ${S.detail}` : ""}`;
    const bt = r.getElementById("pban_t");
    if (bt.textContent !== txt) bt.textContent = txt;
    if (this._tab === "pil") this._pilRender(false);
  },

  _pilRender(full) {
    const el = this.shadowRoot && this.shadowRoot.getElementById("p_body");
    if (!el || !this._hass) return;
    const t = (k, v) => this._t(k, v);
    if (!this._hasPilot()) { el.innerHTML = `<div class="onote">${t("pil_missing")}</div>`; this._pilBuilt = false; return; }
    if (full || !this._pilBuilt) { el.innerHTML = this._pilHtml(); this._pilBuilt = true; }
    this._pilValues(el);
  },

  _pilHtml() {
    const t = (k, v) => this._t(k, v);
    const has = (k) => !!this._eid(k);
    const sw = (k, label, note) => has(k) ? `<div class="prow psw" data-row="${k}"><div class="pl">${label}${note ? `<div class="pnote">${note}</div>` : ""}</div><button class="sw" role="switch" data-sw="${k}" aria-label="${fsEsc(label)}"></button></div>` : "";
    const num = (k, label) => {
      if (!has(k)) return "";
      const a = this._st(k).attributes;
      return `<div class="prow" data-row="${k}"><div class="pl">${label}</div><div class="pnum"><input class="pin" type="number" data-k="${k}" min="${a.min}" max="${a.max}" step="${a.step || 1}" aria-label="${fsEsc(label)}"><span class="punit">${fsEsc(a.unit_of_measurement || "")}</span></div></div>`;
    };
    const sel = (k, label, names) => {
      if (!has(k)) return "";
      const opts = this._st(k).attributes.options || [];
      return `<div class="prow" data-row="${k}"><div class="pl">${label}</div><select class="pin" data-k="${k}" aria-label="${fsEsc(label)}">${opts.map((o) => `<option value="${fsEsc(o)}">${fsEsc((names && names[o]) || o)}</option>`).join("")}</select></div>`;
    };
    const win = (a, b, label, swk) => (has(a) && has(b) ? `<div class="prow" data-row="${a}"><div class="pl">${label}</div><div class="ptimes">${swk && has(swk) ? `<button class="sw" role="switch" data-sw="${swk}" aria-label="${fsEsc(label)}"></button>` : ""}<input class="pin" type="time" data-k="${a}" aria-label="${fsEsc(label)}"><span>→</span><input class="pin" type="time" data-k="${b}" aria-label="${fsEsc(label)}"></div></div>` : "");
    const kp = (id, l) => `<div class="kpi"><div class="tl">${l}</div><div class="tv" id="${id}">—</div><div class="ts" id="${id}_s"></div></div>`;
    return `
      <div class="phead" id="p_head">
        <button class="bigauto" data-auto aria-pressed="false">${FS_ROBOT}<span>${t("pil_auto")}</span><span class="bs" id="p_auto_s"></span></button>
        <div class="pst"><div class="rh" id="p_label"></div><div class="rt" id="p_detail" style="margin-top:4px"></div><div class="omsg err" id="p_err"></div></div>
      </div>
      <div class="kpis">${kp("p_k_target", t("pk_target"))}${kp("p_k_soc", t("pk_soc"))}${kp("p_k_win", t("pk_win"))}${kp("p_k_block", t("pk_block"))}</div>
      <div class="pgrid">
        <div class="pset"><h4>${t("ps_hc")}</h4>${win("hc1_start", "hc1_end", t("ps_hc1"))}${win("hc2_start", "hc2_end", t("ps_hc2"), "hc2_enabled")}</div>
        <div class="pset"><h4>${t("ps_prot")}</h4>${sw("opt_preserve", t("ps_preserve"))}${sw("opt_protect_ev", t("ps_protect_ev"))}${num("discharge_normal", t("ps_dis"))}</div>
        <div class="pset"><h4>${t("ps_bat")}</h4>${sw("opt_charge", t("ps_charge"))}${sel("target_mode", t("ps_mode"), t("ps_modes"))}${num("target_fixed", t("ps_fixed"))}${num("target_max", t("ps_max"))}${num("margin", t("ps_margin"))}${num("charge_power", t("ps_power"))}</div>
        <div class="pset"><h4>${t("ps_est")}</h4>${sel("conso_source", t("ps_src"), t("ps_srcs"))}${num("conso_day", t("ps_day"))}${num("pv_factor", t("ps_pvf"))}${num("capacity", t("ps_cap"))}</div>
        <div class="pset"><h4>${t("ps_ev")}</h4>${sw("opt_ev_hc", t("ps_ev_hc"), t("ps_ev_note"))}</div>
      </div>
      <div class="phow">${t("ps_how")}</div>`;
  },

  _pilValues(el) {
    const t = (k, v) => this._t(k, v), f = (v, d = 0) => this._f(v, d);
    const active = this.shadowRoot.activeElement;
    const S = this._pilStatus();
    const head = el.querySelector("#p_head");
    if (head) head.style.setProperty("--pc", S.col);
    const set = (id, v) => { const n = el.querySelector("#" + id); if (n && n.textContent !== v) n.textContent = v; };
    const setH = (id, v) => { const n = el.querySelector("#" + id); if (n && n.innerHTML !== v) n.innerHTML = v; };
    const big = el.querySelector("[data-auto]");
    if (big) big.setAttribute("aria-pressed", String(S.auto));
    set("p_auto_s", t(S.auto ? "pil_on" : "pil_off"));
    set("p_label", S.label);
    let det = S.detail;
    const au = this._st("pilot_automation");
    if (S.auto && au && au.state === "off") det = `${t("pil_auto_off_warn")} ${det}`;
    set("p_detail", det);
    set("p_err", this._pilErr || "");
    const tgt = this._n("pilot_target"), need = this._n("pilot_need"), soc = this._n("battery_soc");
    setH("p_k_target", tgt != null ? `${f(tgt)}<small>%</small>` : "—");
    set("p_k_target_s", need != null ? t("pk_target_s", { k: f(need, 1) }) : "");
    setH("p_k_soc", soc != null ? `${f(soc)}<small>%</small>` : "—");
    const bp = this._pw("battery_power");
    set("p_k_soc_s", bp != null && Math.abs(bp) > 15 ? `${this._W(bp, true)} · ${t(bp > 0 ? "charge" : "discharge")}` : t("rest"));
    const { cur, nxt } = this._pilWin();
    const w = cur || nxt;
    setH("p_k_win", w ? `${this._hm(w[0])}–${this._hm(w[1])}` : "—");
    set("p_k_win_s", cur ? t("pk_win_cur", { b: this._hm(cur[1]) }) : nxt ? t("pk_win_next") : "");
    const lim = this._n("pilot_limit"), norm = this._n("discharge_normal") ?? 5000;
    if (lim != null && S.auto && lim <= 0) { setH("p_k_block", t("pk_block_on")); set("p_k_block_s", t("pk_block_on_s")); }
    else if (lim != null && S.auto && lim < norm) { setH("p_k_block", `${t("pk_block_lim")} <small>${this._W(lim)}</small>`); set("p_k_block_s", t("pk_block_lim_s")); }
    else { setH("p_k_block", t("pk_block_off")); set("p_k_block_s", this._W(norm)); }
    // interrupteurs
    el.querySelectorAll("[data-sw]").forEach((b) => b.setAttribute("aria-checked", String(this._on(b.dataset.sw))));
    // champs
    el.querySelectorAll("[data-k]").forEach((inp) => {
      if (inp === active) return;
      const v = this._s(inp.dataset.k);
      if (v == null) return;
      let val = v;
      if (inp.type === "time") val = v.slice(0, 5);
      else if (inp.type === "number") val = String(parseFloat(v));
      if (inp.value !== val) inp.value = val;
    });
    // lignes inutiles grisées
    const fixed = this._s("target_mode") === "Fixe";
    const dim = (k, on) => { const row = el.querySelector(`[data-row="${k}"]`); if (row) row.classList.toggle("dis", on); };
    dim("target_fixed", !fixed); dim("margin", fixed);
    dim("conso_day", this._s("conso_source") !== "Valeur fixe");
    const hc2 = el.querySelector('[data-row="hc2_start"]');
    if (hc2) hc2.querySelectorAll("input").forEach((i) => { i.disabled = this._eid("hc2_enabled") ? !this._on("hc2_enabled") : false; });
  },
};

Object.assign(FusionSolarCard.prototype, FsPaneMixin, FsOptMixin, FsRecMixin, FsPilotMixin);

/* ------------------------------------------------------------------------------------------ */
/*  Version smartphone : schéma portrait, onglets et graphiques sur une colonne               */
/* ------------------------------------------------------------------------------------------ */
class FusionSolarPhoneCard extends FusionSolarCard {
  setConfig(config) { super.setConfig(Object.assign({}, config || {}, { layout: "tall" })); }
  get _phone() { return true; }
  getCardSize() { return 10; }
  getGridOptions() { return { columns: 12, min_columns: 4 }; }
}

/* ------------------------------------------------------------------------------------------ */
/*  Mini carte                                                                                */
/* ------------------------------------------------------------------------------------------ */
const FS_MINI_CSS = `
.mwrap{container-type:inline-size}
.mini{display:grid;grid-template-columns:minmax(120px,170px) 1fr;gap:6px 14px;align-items:center;padding:12px 14px 12px 10px}
.mini svg{width:100%;height:auto;display:block}
.mini .w .wb{stroke-width:6}.mini .w .wg{stroke-width:9}.mini .w .wc{stroke-width:2.6}
.mini .w .wf{stroke-width:3;stroke-dasharray:.1 11}.mini .w.on .wf{animation-name:flm}
@keyframes flm{to{stroke-dashoffset:-11.1}}
.mtop{display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;min-width:0}
.mname{font-size:14px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.mini .pill{padding:4px 10px 4px 8px;font-size:12px}
.mstats{display:grid;grid-template-columns:repeat(auto-fit,minmax(58px,1fr));gap:4px 8px;margin-top:8px}
.ms{cursor:pointer;min-width:0}
.ms .l{font-size:10.5px;color:#9aa3ad;text-transform:uppercase;letter-spacing:.5px;white-space:nowrap}
.ms .v{font-size:16px;font-weight:600;font-variant-numeric:tabular-nums;white-space:nowrap}
.ms .v small{font-size:11px;color:#9aa3ad;font-weight:500;margin-left:1px}
.ms.hide{display:none}
.mi{fill:#9aa3ad;transition:fill .5s}.mi.on{fill:var(--mc)}
.mstroke{fill:none;stroke:#9aa3ad;stroke-width:2;stroke-linejoin:round;transition:stroke .5s}.mstroke.on{stroke:var(--mc)}
#mb_fill{fill:var(--bc,#3ddc84);transition:y .8s,height .8s}
@container (max-width:400px){.mini{grid-template-columns:104px 1fr;gap:4px 10px;padding:10px 12px 10px 8px}.mname{display:none}.mtop{justify-content:flex-start}
  .ms .v{font-size:15px}.mstats{grid-template-columns:repeat(auto-fit,minmax(50px,1fr));gap:3px 6px}}
@container (max-width:260px){.mini{grid-template-columns:1fr}.mini svg{max-width:170px;margin:0 auto}}
`;

function fsMiniSVG() {
  let rays = "";
  for (let i = 0; i < 8; i++) rays += `<line transform="rotate(${i * 45})" x1="0" y1="-11" x2="0" y2="-15"/>`;
  return `<svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg">
  ${fsWire("mw_pv", "M44 40 H100 V52")}
  ${fsWire("mw_bat", "M86 66 H44 V86")}
  ${fsWire("mw_grid", "M114 66 H156 V86")}
  ${fsWire("mw_home", "M114 60 H138 V40 H150")}
  ${fsWire("mw_ev", "M100 80 V112 H134")}
  <g class="mclick" data-e="pv_power">
    <g transform="translate(22 18)"><g class="mstroke" id="ms_sun" style="--mc:${FS_COL.pv}">${rays}</g><circle r="8" class="mi" id="mi_sun" style="--mc:${FS_COL.pv}"/></g>
    <g transform="translate(26 40) skewX(-12) translate(-26 -40)"><rect x="8" y="30" width="36" height="20" rx="3" fill="#1e3a6a" stroke="#8fa3bf" stroke-width="1.5"/>
      <path d="M20 30 V50 M32 30 V50 M8 40 H44" stroke="#7f9fd6" stroke-width=".8" opacity=".5"/></g>
  </g>
  <g class="mclick" data-e="inverter_power"><rect x="86" y="52" width="28" height="28" rx="6" fill="#d9dee5" stroke="#8994a3" stroke-width="1.5"/><circle id="mi_led" cx="100" cy="72" r="2.6" fill="#3ddc84"/></g>
  <g class="mclick" data-e="battery_soc">
    <rect x="30" y="86" width="28" height="40" rx="5" fill="#1a1f26" stroke="#8994a3" stroke-width="1.5"/><rect x="39" y="82" width="10" height="5" rx="1.5" fill="#8994a3"/>
    <clipPath id="mcB"><rect x="33" y="89" width="22" height="34" rx="3"/></clipPath><rect id="mb_fill" x="33" y="123" width="22" height="0" clip-path="url(#mcB)"/>
  </g>
  <g class="mclick" data-e="grid_power" id="mg" style="--gc:#7d8794">${fsPylon(140, 86, 32, 40)}</g>
  <g class="mclick" data-e="__home"><path class="mstroke" id="mh" style="--mc:${FS_COL.home}" d="M150 40 L170 22 L190 40 V62 H150 Z"/></g>
  <g class="mclick" data-e="ev_state" id="mev" style="opacity:.35"><rect x="134" y="102" width="14" height="22" rx="3" fill="#d9dee5" stroke="#8994a3"/><circle id="mi_ev" cx="141" cy="110" r="3" fill="#4a525d"/></g>
</svg>`;
}

class FusionSolarMiniCard extends FusionSolarCard {
  getCardSize() { return 2; }
  getGridOptions() { return { columns: 6, min_columns: 4, rows: 2 }; }

  set hass(hass) {
    const first = !this._hass;
    this._hass = hass;
    if (!this.shadowRoot) this._build();
    if (first || hass.entities !== this._entsRef) { this._map = null; this._entsRef = hass.entities; }
    this._update();
  }

  _build() {
    const root = this.attachShadow({ mode: "open" });
    root.innerHTML = `
      <style>${FS_CSS}${FS_MINI_CSS}</style>
      <ha-card class="mwrap">
        <div class="mini">
          <div class="mclick" id="msvg">${fsMiniSVG()}</div>
          <div style="min-width:0">
            <div class="mtop"><div class="mname" id="m_name"></div>
              <span class="pill" id="m_state"><span class="dot"></span><span id="m_state_t">—</span></span></div>
            <div class="mstats">
              <div class="ms" data-e="pv_power"><div class="l">${this._t("pv")}</div><div class="v" id="m_pv">—</div></div>
              <div class="ms" data-e="__home"><div class="l">${this._t("home")}</div><div class="v" id="m_home">—</div></div>
              <div class="ms" data-e="battery_soc"><div class="l" id="m_bat_l">${this._t("k_bat")}</div><div class="v" id="m_bat">—</div></div>
              <div class="ms" data-e="grid_power"><div class="l" id="m_grid_l">${this._t("k_grid")}</div><div class="v" id="m_grid">—</div></div>
              <div class="ms hide" data-e="ev_power" id="m_ev_w"><div class="l">VE</div><div class="v" id="m_ev">—</div></div>
            </div>
          </div>
        </div>
      </ha-card>`;
    root.addEventListener("click", (ev) => {
      const path = ev.composedPath(), nav = this._config.navigation_path;
      if (nav && path.some((n) => n.id === "msvg")) {
        history.pushState(null, "", nav);
        window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: false } }));
        return;
      }
      const el = path.find((n) => n.dataset && n.dataset.e);
      let k = el ? el.dataset.e : "pv_power";
      if (k === "__home") k = "grid_power";
      const id = this._eid(k);
      if (id) this._moreInfo(id);
    });
    const n = root.getElementById("m_name");
    n.textContent = this._config.title != null ? this._config.title : this._t("default_title");
  }

  _applyLayout() {
    const n = this.shadowRoot && this.shadowRoot.getElementById("m_name");
    if (n) n.textContent = this._config.title != null ? this._config.title : this._t("default_title");
  }

  _update() {
    if (!this._hass || !this.shadowRoot) return;
    if (!this._map) this._resolveAll();
    const F = this._flows(), DB = 15;
    const [st, col, live] = this._status(F);
    const pill = this._$("m_state");
    pill.style.setProperty("--mc", col); pill.classList.toggle("live", live);
    this._txt("m_state_t", this._t(st));
    const pv = F.pv || 0, b = F.bat || 0, g = F.grid || 0, h = F.home || 0, ev = F.ev || 0;
    this._wire("mw_pv", pv > DB, FS_COL.pv, false, fsSpd(pv));
    this._wire("mw_bat", Math.abs(b) > DB, FS_COL.bat, b < 0, fsSpd(b));
    const gc = g > DB ? FS_COL.exp : g < -DB ? FS_COL.imp : FS_COL.idle;
    this._wire("mw_grid", Math.abs(g) > DB, gc, g < 0, fsSpd(g));
    this._wire("mw_home", h > DB, FS_COL.home, false, fsSpd(h));
    this._wire("mw_ev", ev > DB, FS_COL.ev, false, fsSpd(ev));
    this._cls("mi_sun", "on", pv > DB); this._cls("ms_sun", "on", pv > DB); this._cls("mh", "on", h > DB);
    this._var("mg", "--gc", gc);
    const mev = this._$("mev"); if (mev) mev.style.opacity = ev > DB || this._on("ev_plugged") ? "1" : ".35";
    const evl = this._$("mi_ev"); if (evl) evl.setAttribute("fill", ev > DB ? FS_COL.ev : this._on("ev_plugged") ? "#e6e9ee" : "#4a525d");
    const soc = F.soc;
    const fill = this._$("mb_fill");
    if (fill && soc != null) { const fh = (fsClamp(soc, 0, 100) / 100) * 34; fill.setAttribute("y", (123 - fh).toFixed(1)); fill.setAttribute("height", fh.toFixed(1)); }
    this._var("mb_fill", "--bc", soc == null ? "#7d8794" : soc < 15 ? FS_COL.imp : soc < 35 ? "#ffb547" : FS_COL.bat);
    const W = (w) => (w == null ? "—" : Math.abs(w) >= 1000 ? `${this._f(Math.abs(w) / 1000, 1)}<small>kW</small>` : `${this._f(Math.abs(w), 0)}<small>W</small>`);
    this._html("m_pv", W(F.pv));
    this._html("m_home", W(F.home));
    this._html("m_bat", soc != null ? `${this._f(soc, 0)}<small>%</small>` : "—");
    this._txt("m_bat_l", Math.abs(b) > DB ? `${this._t("k_bat")} ${b > 0 ? "↑" : "↓"}` : this._t("k_bat"));
    this._html("m_grid", W(F.grid));
    this._txt("m_grid_l", g > DB ? this._t("export") : g < -DB ? this._t("import") : this._t("k_grid"));
    this._cls("m_ev_w", "hide", !(ev > DB));
    this._html("m_ev", W(ev));
  }
}

if (!customElements.get("fusionsolar-card")) customElements.define("fusionsolar-card", FusionSolarCard);
if (!customElements.get("fusionsolar-phone-card")) customElements.define("fusionsolar-phone-card", FusionSolarPhoneCard);
if (!customElements.get("fusionsolar-mini-card")) customElements.define("fusionsolar-mini-card", FusionSolarMiniCard);
window.customCards = window.customCards || [];
[
  ["fusionsolar-card", "FusionSolar — flux d'énergie animé", "Strings PV, onduleur, batterie, compteur, maison et borne FusionCharge, avec onglets Optimisation et Récap."],
  ["fusionsolar-phone-card", "FusionSolar — smartphone", "Même carte en schéma portrait, pensée pour le téléphone."],
  ["fusionsolar-mini-card", "FusionSolar — mini", "Version compacte animée : solaire, maison, batterie, réseau et VE."],
].forEach(([type, name, description]) => {
  if (!window.customCards.find((c) => c.type === type)) window.customCards.push({ type, name, description, preview: true });
});
console.info(`%c FUSIONSOLAR-CARD %c v${FS_VERSION} `, "background:#ffc531;color:#1d2430;font-weight:700;border-radius:4px 0 0 4px", "background:#22262c;color:#fff;border-radius:0 4px 4px 0");
