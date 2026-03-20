const { useState, useMemo } = React;

const productos = window.LYL_PRODUCTOS;

const MATERIALES = ["Todos", "Barro", "Barro Artesanal", "Fibrocemento", "Rotomoldeado", "Fibra de Vidrio", "Cerámica", "Plástico", "Combo", "Insumos"];

const formatPrecio = (n) => "$\u00a0" + n.toLocaleString("es-AR", { minimumFractionDigits: 0 });
const WA_NUMBER = "5491157554899";
const STORAGE_KEY = "lyl_presup_v2";

const getNextNumero = () => {
  try {
    const n = parseInt(localStorage.getItem("lyl_num") || "0", 10) + 1;
    localStorage.setItem("lyl_num", String(n));
    return "P-" + String(n).padStart(3, "0");
  } catch { return "P-" + String(Date.now()).slice(-3); }
};

const loadBorrador = () => {
  try { const r = localStorage.getItem(STORAGE_KEY); return r ? JSON.parse(r) : null; }
  catch { return null; }
};
const saveBorrador = (s) => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch {} };
const clearBorrador = () => { try { localStorage.removeItem(STORAGE_KEY); } catch {} };

export default function App() {
  const b0 = loadBorrador();

  const [busqueda, setBusqueda] = useState("");
  const [material, setMaterial] = useState("Todos");
  const [pintada, setPintada] = useState("Todos");
  const [textoVisible, setTextoVisible] = useState(null);
  const [vista, setVista] = useState("buscar");

  const [presupuesto, setPresupuesto] = useState(b0?.presupuesto || []);
  const [cliente, setCliente] = useState(b0?.cliente || "");
  const [proyecto, setProyecto] = useState(b0?.proyecto || "");
  const [envio, setEnvio] = useState(b0?.envio || "");
  const [descuento, setDescuento] = useState(b0?.descuento || "");
  const [numPresup, setNumPresup] = useState(b0?.numPresup || "");
  const [mostrarAnticipo, setMostrarAnticipo] = useState(b0?.mostrarAnticipo ?? true);

  const [modalAbierto, setModalAbierto] = useState(false);
  const [editandoKey, setEditandoKey] = useState(null);
  const [formManual, setFormManual] = useState({ articulo: "", medidas: "", precio: "", nota: "" });
  const [notaAbierta, setNotaAbierta] = useState(null);
  const [notaTemp, setNotaTemp] = useState("");
  const [confirmarVaciar, setConfirmarVaciar] = useState(false);

  const save = (patch) => saveBorrador({ presupuesto, cliente, proyecto, envio, descuento, numPresup, mostrarAnticipo, ...patch });

  const filtrados = useMemo(() => {
    const b = busqueda.toLowerCase().trim();
    return productos.filter((p) => {
      const mB = !b || p.articulo.toLowerCase().includes(b) || p.medidas.toLowerCase().includes(b);
      const mM = material === "Todos" || p.material === material;
      const mP = pintada === "Todos" || (pintada === "Pintada" && p.pintada) || (pintada === "Sin pintar" && !p.pintada);
      return mB && mM && mP;
    });
  }, [busqueda, material, pintada]);

  const grupos = useMemo(() => {
    const map = {};
    filtrados.forEach((p) => {
      const k = `${p.articulo}||${p.material}||${p.pintada}`;
      if (!map[k]) map[k] = { ...p, variantes: [] };
      map[k].variantes.push({ medidas: p.medidas, precio: p.precio, litros: p.litros, peso_kg: p.peso_kg });
    });
    return Object.values(map);
  }, [filtrados]);

  const subtotal = presupuesto.reduce((s, i) => s + i.precio * i.cantidad, 0);
  const subtotalConDesc = presupuesto.reduce((s, i) => s + (!i.sinDescuento ? i.precio * i.cantidad : 0), 0);
  const envioNum = parseFloat(String(envio).replace(/[^\d.]/g, "")) || 0;
  const descPct = Math.min(100, Math.max(0, parseFloat(descuento) || 0));
  const montoDesc = Math.round(subtotalConDesc * descPct / 100);
  const totalFinal = subtotal - montoDesc + envioNum;
  const anticipo80 = Math.round(totalFinal * 0.8);
  const saldo20 = totalFinal - anticipo80;

  const setP = (fn) => setPresupuesto((prev) => { const next = typeof fn === "function" ? fn(prev) : fn; save({ presupuesto: next }); return next; });
  const setC = (v) => { setCliente(v); save({ cliente: v }); };
  const setPr = (v) => { setProyecto(v); save({ proyecto: v }); };
  const setEn = (v) => { setEnvio(v); save({ envio: v }); };
  const setDe = (v) => { setDescuento(v); save({ descuento: v }); };
  const setMA = (v) => { setMostrarAnticipo(v); save({ mostrarAnticipo: v }); };

  const agregar = (prod) => {
    const key = `${prod.articulo}||${prod.medidas}||${prod.material}`;
    setP((prev) => {
      const ex = prev.find((i) => i.key === key);
      if (ex) return prev.map((i) => i.key === key ? { ...i, cantidad: i.cantidad + 1 } : i);
      return [...prev, { ...prod, key, cantidad: 1, nota: "" }];
    });
    setVista("presupuesto");
  };

  const cambiarCantidad = (key, delta) => setP((prev) => prev.map((i) => i.key === key ? { ...i, cantidad: Math.max(1, i.cantidad + delta) } : i));
  const quitar = (key) => setP((prev) => prev.filter((i) => i.key !== key));
  const toggleSinDescuento = (key) => setP((prev) => prev.map((i) => i.key === key ? { ...i, sinDescuento: !i.sinDescuento } : i));
  const guardarNota = (key) => { setP((prev) => prev.map((i) => i.key === key ? { ...i, nota: notaTemp } : i)); setNotaAbierta(null); };

  const MATERIALES_MANUAL = ["Fibrocemento", "Rotomoldeado", "Fibra de Vidrio", "Barro", "Barro Artesanal", "Cerámica", "Plástico", "Botánica", "Sustrato", "Insumos", "Combo", "Otros"];

  const abrirModalNuevo = () => { setFormManual({ articulo: "", medidas: "", precio: "", nota: "", material: "Otros" }); setEditandoKey(null); setModalAbierto(true); };
  const abrirModalEditar = (item) => { setFormManual({ articulo: item.articulo, medidas: item.medidas || "", precio: String(item.precio), nota: item.nota || "", material: item.material || "Otros" }); setEditandoKey(item.key); setModalAbierto(true); };

  const guardarManual = () => {
    const pr = parseFloat(String(formManual.precio).replace(/[^\d.]/g, "")) || 0;
    if (!formManual.articulo.trim() || !pr) return;
    const key = editandoKey || `manual||${Date.now()}`;
    const item = { articulo: formManual.articulo.trim(), medidas: formManual.medidas.trim(), material: formManual.material || "Otros", pintada: false, precio: pr, key, cantidad: 1, nota: formManual.nota.trim() };
    if (editandoKey) setP((prev) => prev.map((i) => i.key === editandoKey ? { ...i, ...item, cantidad: i.cantidad } : i));
    else setP((prev) => [...prev, item]);
    setModalAbierto(false);
  };

  const vaciar = () => { setPresupuesto([]); setCliente(""); setProyecto(""); setEnvio(""); setDescuento(""); setNumPresup(""); setTextoVisible(null); setConfirmarVaciar(false); clearBorrador(); };

  const asignarNum = () => { if (numPresup) return; const n = getNextNumero(); setNumPresup(n); save({ numPresup: n }); };

  // ── Exportar borrador como .json ──
  const exportarBorrador = () => {
    const estado = { presupuesto, cliente, proyecto, envio, descuento, numPresup, mostrarAnticipo };
    const nombre = [numPresup, cliente].filter(Boolean).join("_").replace(/\s+/g, "_") || "borrador";
    const blob = new Blob([JSON.stringify(estado, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `LyL_${nombre}.json`; a.click();
    URL.revokeObjectURL(url);
  };

  // ── Importar borrador desde .json ──
  const importarBorrador = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const d = JSON.parse(ev.target.result);
        if (!d.presupuesto) { alert("El archivo no es un borrador válido de LyL Macetas."); return; }
        setPresupuesto(d.presupuesto || []);
        setCliente(d.cliente || "");
        setProyecto(d.proyecto || "");
        setEnvio(d.envio || "");
        setDescuento(d.descuento || "");
        setNumPresup(d.numPresup || "");
        setMostrarAnticipo(d.mostrarAnticipo ?? true);
        saveBorrador(d);
        setVista("presupuesto");
      } catch { alert("Error al leer el archivo."); }
    };
    reader.readAsText(file);
    e.target.value = "";
  };
];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const d = JSON.parse(ev.target.result);
        if (!d.presupuesto) { alert("El archivo no es un borrador válido de LyL Macetas."); return; }
        setPresupuesto(d.presupuesto || []);
        setCliente(d.cliente || "");
        setProyecto(d.proyecto || "");
        setEnvio(d.envio || "");
        setDescuento(d.descuento || "");
        setNumPresup(d.numPresup || "");
        setMostrarAnticipo(d.mostrarAnticipo ?? true);
        saveBorrador(d);
        setVista("presupuesto");
      } catch { alert("Error al leer el archivo."); }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const datosExport = () => ({ numero: numPresup || "—", cliente, proyecto, items: presupuesto, subtotal, descPct, montoDesc, envioNum, totalFinal, anticipo80, saldo20, mostrarAnticipo, fecha: new Date().toLocaleDateString("es-AR") });

  const generarTexto = () => {
    const d = datosExport();
    const cab = [d.numero !== "—" && `Nº ${d.numero}`, d.cliente && `Cliente: ${d.cliente}`, d.proyecto && `Proyecto: ${d.proyecto}`].filter(Boolean).join("  |  ");
    const lineas = d.items.map((i) => `  • ${i.articulo}${i.medidas ? " " + i.medidas : ""} — ${i.cantidad} u. × ${formatPrecio(i.precio)} = ${formatPrecio(i.precio * i.cantidad)}${i.nota ? "\n    _" + i.nota + "_" : ""}`);
    let t = `🌿 *Presupuesto LyL Macetas*\n${cab}\n\n${lineas.join("\n")}`;
    t += `\n\n*Subtotal: ${formatPrecio(d.subtotal)}*`;
    if (d.descPct > 0) t += `\n🏷 Descuento ${d.descPct}%: -${formatPrecio(d.montoDesc)}`;
    if (d.envioNum > 0) t += `\n🚚 Envío: ${formatPrecio(d.envioNum)}`;
    t += `\n\n*TOTAL: ${formatPrecio(d.totalFinal)}*`;
    if (d.mostrarAnticipo) t += `\n\n_Anticipo 80%: ${formatPrecio(d.anticipo80)}_\n_Saldo: ${formatPrecio(d.saldo20)}_`;
    t += `\n\n_Pagos en efectivo o transferencia. No incluye IVA (Factura C)._`;
    return t;
  };

  const generarJson = () => {
    const d = datosExport();
    return JSON.stringify({ numero: d.numero, cliente: d.cliente, proyecto: d.proyecto, fecha: d.fecha, items: d.items.map((i) => ({ articulo: i.articulo, medidas: i.medidas || "", material: i.material, cantidad: i.cantidad, precio: i.precio, total: i.precio * i.cantidad, nota: i.nota || "", sin_descuento: i.sinDescuento || false })), subtotal: d.subtotal, subtotal_con_descuento: subtotalConDesc, descuento_pct: d.descPct, descuento_monto: d.montoDesc, envio: d.envioNum, total: d.totalFinal, anticipo_80: d.mostrarAnticipo ? d.anticipo80 : null, saldo: d.mostrarAnticipo ? d.saldo20 : null }, null, 2);
  };

  const generarTextoGrupo = (g) => `🌿 *${g.articulo}* — ${g.material}${g.material === "Barro" ? "" : g.pintada ? " (pintada)" : " (sin pintar)"}\n${g.variantes.map((v) => `  • ${v.medidas} → ${formatPrecio(v.precio)}`).join("\n")}`;

  const matColors = { Barro: "#b5651d", "Barro Artesanal": "#8B4513", Fibrocemento: "#607d8b", Rotomoldeado: "#2e7d32", "Fibra de Vidrio": "#1565c0", Cerámica: "#ad1457", Plástico: "#6a1f8a", Botánica: "#388e3c", Sustrato: "#795548", Combo: "#c8860a", Insumos: "#0d7377", Otros: "#7c5c20", Manual: "#7c5c20" };

  const GRN = "#40916c"; const GRN_OSC = "#1b4332"; const GRN_MED = "#2d6a4f"; const GRN_LT = "#95d5b2"; const GRN_XL = "#d8f3dc"; const GRN_MNT = "#74c69d";

  const S = {
    input: { background: "#111", border: "1px solid #333", borderRadius: 7, color: "#f0ede8", padding: "9px 12px", fontSize: 13, outline: "none", width: "100%", boxSizing: "border-box" },
    btn: (a) => ({ padding: "5px 11px", borderRadius: 20, border: a ? `2px solid ${GRN}` : "1px solid #333", background: a ? GRN_OSC : "#1c1c1c", color: a ? GRN_LT : "#666", cursor: "pointer", fontSize: 11, fontWeight: a ? "bold" : "normal" }),
    card: { background: "#1e1e1e", border: "1px solid #2a2a2a", borderRadius: 10, marginBottom: 8, overflow: "hidden" },
    pill: (c) => ({ display: "inline-block", padding: "1px 7px", borderRadius: 10, background: c + "22", color: c, fontSize: 10, border: `1px solid ${c}44` }),
  };

  const hasBorrador = presupuesto.length > 0 || cliente || proyecto;

  return (
    <div style={{ minHeight: "100vh", background: "#181818", fontFamily: "'Georgia', serif", color: "#f0ede8" }}>

      {/* HEADER */}
      <div style={{ background: `linear-gradient(90deg, ${GRN_OSC}, ${GRN_MED})`, padding: "18px 16px 12px", borderBottom: `2px solid ${GRN}`, textAlign: "center" }}>
        <div style={{ fontSize: 10, letterSpacing: 4, color: GRN_LT, textTransform: "uppercase" }}>LyL Macetas</div>
        <div style={{ fontSize: 20, fontWeight: "bold", color: GRN_XL, marginTop: 2 }}>Consulta de Precios</div>
        <div style={{ fontSize: 10, color: GRN_MNT, marginTop: 1 }}>Lista minorista · 19-mar-2026</div>
      </div>

      {/* TABS */}
      <div style={{ display: "flex", borderBottom: "1px solid #222", background: "#141414", position: "relative" }}>
        {[["🔍 Buscar", "buscar"], [`🧾 Presupuesto${presupuesto.length ? ` (${presupuesto.length})` : ""}`, "presupuesto"]].map(([label, k]) => (
          <button key={k} onClick={() => setVista(k)} style={{ flex: 1, padding: "11px 6px", border: "none", background: "none", borderBottom: vista === k ? `2px solid ${GRN}` : "2px solid transparent", color: vista === k ? GRN_LT : "#555", cursor: "pointer", fontSize: 13, fontWeight: vista === k ? "bold" : "normal" }}>{label}</button>
        ))}
        {hasBorrador && <div style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", fontSize: 9, color: GRN_MNT, background: GRN_OSC, padding: "2px 7px", borderRadius: 8, border: `1px solid ${GRN}` }}>💾 guardado</div>}
      </div>

      {/* ══ BÚSQUEDA ══ */}
      {vista === "buscar" && (
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "14px 12px 40px" }}>
          <input placeholder="Buscar modelo..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)}
            style={{ ...S.input, border: `1px solid ${GRN}`, marginBottom: 10, fontSize: 14, padding: "11px 14px" }} />
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
            {MATERIALES.map((m) => <button key={m} onClick={() => setMaterial(m)} style={S.btn(material === m)}>{m}</button>)}
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
            {["Todos","Pintada","Sin pintar"].map((p) => <button key={p} onClick={() => setPintada(p)} style={S.btn(pintada === p)}>{p}</button>)}
          </div>
          <div style={{ fontSize: 11, color: "#444", marginBottom: 10 }}>{filtrados.length} variantes · {grupos.length} modelos</div>

          {textoVisible && !["presup","json"].includes(textoVisible.idx) && (
            <div style={{ background: "#111", border: `1px solid ${GRN}`, borderRadius: 8, padding: "10px 12px", marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontSize: 11, color: GRN_MNT }}>Tocá → Seleccionar todo → Copiar</span>
                <button onClick={() => setTextoVisible(null)} style={{ background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 18 }}>×</button>
              </div>
              <textarea readOnly value={textoVisible.texto} onFocus={(e) => e.target.select()}
                rows={Math.min(textoVisible.texto.split("\n").length + 1, 10)}
                style={{ ...S.input, fontFamily: "monospace", fontSize: 12, lineHeight: 1.5, resize: "vertical" }} />
            </div>
          )}

          {grupos.length === 0 ? <div style={{ textAlign: "center", color: "#555", marginTop: 40 }}>Sin resultados.</div>
            : grupos.map((grupo, idx) => {
              const dc = matColors[grupo.material] || "#888";
              const ps = grupo.material === "Barro" ? "" : grupo.pintada ? "Pintada" : "Sin pintar";
              return (
                <div key={idx} style={S.card}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 12px 7px", borderBottom: "1px solid #252525" }}>
                    <div>
                      <span style={{ fontWeight: "bold", fontSize: 14, color: "#e8e3dc" }}>{grupo.articulo}</span>
                      <div style={{ marginTop: 2, display: "flex", gap: 5, alignItems: "center" }}>
                        <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: dc }} />
                        <span style={{ fontSize: 10, color: "#666" }}>{grupo.material}{ps ? ` · ${ps}` : ""}</span>
                      </div>
                    </div>
                    <button onClick={() => setTextoVisible(textoVisible?.idx === idx ? null : { idx, texto: generarTextoGrupo(grupo) })}
                      style={{ padding: "3px 9px", borderRadius: 6, border: "1px solid #2a2a2a", background: "transparent", color: "#555", cursor: "pointer", fontSize: 10 }}>
                      {textoVisible?.idx === idx ? "✓ ↑" : "texto"}
                    </button>
                  </div>
                  {grupo.variantes.map((v, vi) => (
                    <div key={vi} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 12px", borderBottom: vi < grupo.variantes.length - 1 ? "1px solid #222" : "none" }}>
                      <div>
                        <span style={{ fontSize: 12, color: "#888" }}>{v.medidas}</span>
                        {(v.litros || v.peso_kg) && (
                          <div style={{ display: "flex", gap: 8, marginTop: 2 }}>
                            {v.litros && <span style={{ fontSize: 10, color: "#555", background: "#1a2a1a", padding: "1px 6px", borderRadius: 8 }}>🪣 {v.litros}L</span>}
                            {v.peso_kg && <span style={{ fontSize: 10, color: "#555", background: "#1a2a1a", padding: "1px 6px", borderRadius: 8 }}>⚖ {v.peso_kg}kg</span>}
                          </div>
                        )}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 13, color: GRN_XL, fontWeight: "bold" }}>{formatPrecio(v.precio)}</span>
                        <button onClick={() => agregar({ articulo: grupo.articulo, medidas: v.medidas, material: grupo.material, pintada: grupo.pintada, precio: v.precio })}
                          style={{ width: 26, height: 26, borderRadius: "50%", border: `1px solid ${GRN}`, background: GRN_OSC, color: GRN_LT, cursor: "pointer", fontSize: 17, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>+</button>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
        </div>
      )}

      {/* ══ PRESUPUESTO ══ */}
      {vista === "presupuesto" && (
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "14px 12px 60px" }}>

          {/* Datos del pedido */}
          <div style={{ ...S.card, padding: "12px 14px", marginBottom: 10 }}>
            <div style={{ fontSize: 10, color: GRN_MNT, marginBottom: 8, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase" }}>Datos del pedido</div>

            {/* Número de presupuesto */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <div style={{ flex: 1, background: "#111", border: `1px solid ${numPresup ? GRN : "#252525"}`, borderRadius: 7, padding: "8px 12px", fontSize: 13, color: numPresup ? GRN_LT : "#3a3a3a", fontWeight: numPresup ? "bold" : "normal", letterSpacing: numPresup ? 2 : 0 }}>
                {numPresup || "Sin número asignado"}
              </div>
              {!numPresup && (
                <button onClick={asignarNum} style={{ padding: "8px 14px", borderRadius: 7, border: `1px solid ${GRN}`, background: GRN_OSC, color: GRN_LT, cursor: "pointer", fontSize: 12, fontWeight: "bold", whiteSpace: "nowrap" }}>
                  Asignar Nº
                </button>
              )}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <input placeholder="Cliente" value={cliente} onChange={(e) => setC(e.target.value)} style={S.input} />
              <input placeholder="Proyecto / dirección" value={proyecto} onChange={(e) => setPr(e.target.value)} style={S.input} />
            </div>
          </div>

          {/* Items */}
          {presupuesto.length === 0 ? (
            <div style={{ textAlign: "center", color: "#555", marginTop: 40, marginBottom: 30 }}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>🌿</div>
              <div>El presupuesto está vacío.</div>
              <div style={{ fontSize: 11, marginTop: 5, color: "#444" }}>Buscá productos y tocá <strong style={{ color: GRN_MNT }}>+</strong>, o agregá uno manual abajo.</div>
            </div>
          ) : presupuesto.map((item) => (
            <div key={item.key} style={S.card}>
              <div style={{ padding: "10px 12px 8px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: "bold", fontSize: 13, color: "#e8e3dc" }}>{item.articulo}</div>
                    {item.medidas && <div style={{ fontSize: 11, color: "#555", marginTop: 1 }}>{item.medidas}</div>}
                    <div style={{ marginTop: 4, display: "flex", gap: 6, alignItems: "center" }}>
                      <span style={S.pill(matColors[item.material] || "#888")}>{item.material}</span>
                      <span style={{ fontSize: 11, color: GRN_MNT }}>{formatPrecio(item.precio)} c/u</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={() => abrirModalEditar(item)} style={{ background: "none", border: "1px solid #333", borderRadius: 5, color: "#666", cursor: "pointer", fontSize: 12, padding: "2px 8px" }}>✏️</button>
                    <button onClick={() => quitar(item.key)} style={{ background: "none", border: "none", color: "#444", cursor: "pointer", fontSize: 20, lineHeight: 1 }}>×</button>
                  </div>
                </div>

                {/* Nota inline */}
                {notaAbierta === item.key ? (
                  <div style={{ marginTop: 8, display: "flex", gap: 6 }}>
                    <input autoFocus value={notaTemp} onChange={(e) => setNotaTemp(e.target.value)}
                      placeholder="Ej: negro mate, sin agujero..."
                      style={{ ...S.input, fontSize: 12, padding: "6px 10px", flex: 1 }}
                      onKeyDown={(e) => { if (e.key === "Enter") guardarNota(item.key); if (e.key === "Escape") setNotaAbierta(null); }} />
                    <button onClick={() => guardarNota(item.key)} style={{ padding: "6px 12px", borderRadius: 7, border: "none", background: GRN, color: "#fff", cursor: "pointer", fontSize: 12 }}>OK</button>
                    <button onClick={() => setNotaAbierta(null)} style={{ padding: "6px 10px", borderRadius: 7, border: "1px solid #333", background: "transparent", color: "#555", cursor: "pointer", fontSize: 12 }}>✕</button>
                  </div>
                ) : (
                  <div style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 8 }}>
                    {item.nota ? (
                      <div onClick={() => { setNotaAbierta(item.key); setNotaTemp(item.nota); }}
                        style={{ fontSize: 11, color: "#a0856c", fontStyle: "italic", cursor: "pointer", flex: 1, background: "#1a1510", borderRadius: 5, padding: "3px 8px", border: "1px solid #2a2016" }}>
                        📝 {item.nota}
                      </div>
                    ) : (
                      <button onClick={() => { setNotaAbierta(item.key); setNotaTemp(""); }}
                        style={{ fontSize: 10, color: "#3a3a3a", background: "transparent", border: "none", cursor: "pointer", padding: 0 }}>
                        + agregar nota
                      </button>
                    )}
                  </div>
                )}

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <button onClick={() => cambiarCantidad(item.key, -1)} style={{ width: 28, height: 28, borderRadius: 6, border: "1px solid #333", background: "#252525", color: "#ccc", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                    <span style={{ fontSize: 15, color: "#e8e3dc", minWidth: 22, textAlign: "center" }}>{item.cantidad}</span>
                    <button onClick={() => cambiarCantidad(item.key, 1)} style={{ width: 28, height: 28, borderRadius: 6, border: `1px solid ${GRN}`, background: GRN_OSC, color: GRN_LT, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    {descPct > 0 && (
                      <div onClick={() => toggleSinDescuento(item.key)}
                        title={item.sinDescuento ? "Sin descuento (tocá para activar)" : "Con descuento (tocá para excluir)"}
                        style={{ display: "flex", alignItems: "center", gap: 5, cursor: "pointer", opacity: item.sinDescuento ? 0.45 : 1 }}>
                        <span style={{ fontSize: 10, color: item.sinDescuento ? "#555" : "#e07b39", textDecoration: item.sinDescuento ? "line-through" : "none" }}>
                          {item.sinDescuento ? "sin desc." : `−${descPct}%`}
                        </span>
                        <div style={{ width: 28, height: 16, borderRadius: 8, background: item.sinDescuento ? "#2a2a2a" : "#c0392b33", border: `1px solid ${item.sinDescuento ? "#333" : "#c0392b55"}`, position: "relative", transition: "background 0.2s" }}>
                          <div style={{ position: "absolute", top: 2, left: item.sinDescuento ? 2 : 12, width: 10, height: 10, borderRadius: "50%", background: item.sinDescuento ? "#444" : "#e07b39", transition: "left 0.2s" }} />
                        </div>
                      </div>
                    )}
                    <span style={{ fontSize: 14, fontWeight: "bold", color: GRN_XL }}>{formatPrecio(item.precio * item.cantidad)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button onClick={abrirModalNuevo} style={{ width: "100%", padding: "10px", borderRadius: 10, border: `1px dashed ${GRN}`, background: "transparent", color: GRN_MNT, cursor: "pointer", fontSize: 13, marginBottom: 14 }}>
            + Agregar producto manual
          </button>

          {/* Ajustes */}
          <div style={{ ...S.card, padding: "12px 14px", marginBottom: 10 }}>
            <div style={{ fontSize: 10, color: GRN_MNT, marginBottom: 8, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase" }}>Ajustes</div>
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: "#666", marginBottom: 4 }}>🚚 Envío ($)</div>
                <input type="number" placeholder="0" value={envio} onChange={(e) => setEn(e.target.value)} style={{ ...S.input, textAlign: "right" }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: "#666", marginBottom: 4 }}>🏷 Descuento (%)</div>
                <input type="number" placeholder="0" min="0" max="100" value={descuento} onChange={(e) => setDe(e.target.value)} style={{ ...S.input, textAlign: "right" }} />
              </div>
            </div>
          </div>

          {/* Resumen */}
          {presupuesto.length > 0 && (
            <div style={{ ...S.card, padding: "12px 14px", background: "#1a2a1e", border: "1px solid #2d5a3a", marginBottom: 14 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#888" }}><span>Subtotal</span><span>{formatPrecio(subtotal)}</span></div>
                {descPct > 0 && presupuesto.some(i => i.sinDescuento) && (
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#555" }}>
                    <span>Base con descuento</span><span>{formatPrecio(subtotalConDesc)}</span>
                  </div>
                )}
                {descPct > 0 && <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#e07b39" }}><span>Descuento {descPct}%{presupuesto.some(i => i.sinDescuento) ? " (parcial)" : ""}</span><span>- {formatPrecio(montoDesc)}</span></div>}
                {envioNum > 0 && <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#888" }}><span>Envío</span><span>{formatPrecio(envioNum)}</span></div>}
                <div style={{ height: 1, background: "#2d5a3a", margin: "2px 0" }} />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 17, fontWeight: "bold", color: GRN_XL }}><span>TOTAL</span><span>{formatPrecio(totalFinal)}</span></div>
                {mostrarAnticipo && (<>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: GRN_MNT, marginTop: 2 }}><span>Anticipo 80%</span><span>{formatPrecio(anticipo80)}</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#555" }}><span>Saldo</span><span>{formatPrecio(saldo20)}</span></div>
                </>)}
              </div>
            </div>
          )}

          {/* Opciones de exportación */}
          {presupuesto.length > 0 && (
            <div style={{ ...S.card, padding: "12px 14px", marginBottom: 14 }}>
              <div style={{ fontSize: 10, color: GRN_MNT, marginBottom: 10, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase" }}>Opciones de envío</div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <div>
                  <div style={{ fontSize: 13, color: "#e8e3dc" }}>Mostrar anticipo y saldo</div>
                  <div style={{ fontSize: 11, color: "#555", marginTop: 1 }}>Incluye anticipo 80% y saldo restante</div>
                </div>
                <div onClick={() => setMA(!mostrarAnticipo)} style={{ width: 44, height: 24, borderRadius: 12, background: mostrarAnticipo ? GRN : "#333", cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
                  <div style={{ position: "absolute", top: 3, left: mostrarAnticipo ? 23 : 3, width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "left 0.2s" }} />
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <button onClick={() => window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(generarTexto())}`, "_blank")}
                  style={{ width: "100%", padding: "13px", borderRadius: 10, border: "none", background: "#25D366", color: "#fff", cursor: "pointer", fontSize: 14, fontWeight: "bold" }}>
                  📲 Enviar por WhatsApp
                </button>
                <button onClick={() => setTextoVisible(textoVisible?.idx === "presup" ? null : { idx: "presup", texto: generarTexto() })}
                  style={{ width: "100%", padding: "10px", borderRadius: 10, border: "1px solid #444", background: "transparent", color: "#888", cursor: "pointer", fontSize: 12 }}>
                  📋 Ver texto para copiar manualmente
                </button>
                {textoVisible?.idx === "presup" && (
                  <div style={{ background: "#111", border: `1px solid ${GRN}`, borderRadius: 8, padding: "10px 12px" }}>
                    <div style={{ fontSize: 11, color: GRN_MNT, marginBottom: 5 }}>Tocá → Seleccionar todo → Copiar</div>
                    <textarea readOnly value={textoVisible.texto} onFocus={(e) => e.target.select()}
                      rows={Math.min(textoVisible.texto.split("\n").length + 1, 16)}
                      style={{ ...S.input, fontFamily: "monospace", fontSize: 12, lineHeight: 1.5, resize: "vertical" }} />
                  </div>
                )}
                <button onClick={() => setTextoVisible(textoVisible?.idx === "json" ? null : { idx: "json", texto: generarJson() })}
                  style={{ width: "100%", padding: "11px", borderRadius: 10, border: `1px solid ${GRN}`, background: "transparent", color: GRN_MNT, cursor: "pointer", fontSize: 13, fontWeight: "bold" }}>
                  📄 Generar PDF / Excel / Remito → Pegar a Claude
                </button>
                {textoVisible?.idx === "json" && (
                  <div style={{ background: "#0d1f14", border: `1px solid ${GRN}`, borderRadius: 8, padding: "12px 14px" }}>
                    <div style={{ fontSize: 12, color: GRN_MNT, marginBottom: 6, fontWeight: "bold" }}>📋 Copiá esto y pegalo en el chat:</div>
                    <div style={{ fontSize: 11, color: "#555", marginBottom: 8, lineHeight: 1.5 }}>
                      Escribí: <span style={{ color: GRN_LT, fontStyle: "italic" }}>"PDF"</span>, <span style={{ color: GRN_LT, fontStyle: "italic" }}>"Excel"</span> o <span style={{ color: GRN_LT, fontStyle: "italic" }}>"Remito"</span> y pegá el JSON abajo.
                    </div>
                    <textarea readOnly value={textoVisible.texto} onFocus={(e) => e.target.select()}
                      rows={6} style={{ ...S.input, fontFamily: "monospace", fontSize: 11, lineHeight: 1.4, resize: "vertical" }} />
                  </div>
                )}
                <button onClick={() => setConfirmarVaciar(true)} style={{ width: "100%", padding: "9px", borderRadius: 10, border: "1px solid #2a2a2a", background: "transparent", color: "#3a3a3a", cursor: "pointer", fontSize: 11 }}>
                  🗑 Vaciar presupuesto
                </button>

                {/* Exportar / Importar borrador */}
                <div style={{ borderTop: "1px solid #222", paddingTop: 10, marginTop: 2, display: "flex", gap: 8 }}>
                  <button onClick={exportarBorrador}
                    style={{ flex: 1, padding: "9px", borderRadius: 8, border: `1px solid ${GRN}`, background: "transparent", color: GRN_MNT, cursor: "pointer", fontSize: 12, fontWeight: "bold" }}>
                    💾 Guardar borrador
                  </button>
                  <label style={{ flex: 1, padding: "9px", borderRadius: 8, border: "1px solid #444", background: "transparent", color: "#888", cursor: "pointer", fontSize: 12, textAlign: "center", display: "block" }}>
                    📂 Cargar borrador
                    <input type="file" accept=".json" onChange={importarBorrador} style={{ display: "none" }} />
                  </label>
                </div>
                <div style={{ fontSize: 10, color: "#333", textAlign: "center", marginTop: 2 }}>
                  Guardá el presupuesto como archivo · Cargalo desde cualquier dispositivo
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ══ MODAL ══ */}
      {modalAbierto && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 16 }}>
          <div style={{ background: "#1e1e1e", border: `1px solid ${GRN}`, borderRadius: 14, padding: "20px 18px", width: "100%", maxWidth: 400 }}>
            <div style={{ fontWeight: "bold", fontSize: 15, color: GRN_XL, marginBottom: 14 }}>
              {editandoKey ? "✏️ Editar producto" : "➕ Producto manual"}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div>
                <div style={{ fontSize: 11, color: "#666", marginBottom: 4 }}>Descripción *</div>
                <input placeholder="Ej: Misionera 90 negra fibrocemento" value={formManual.articulo}
                  onChange={(e) => setFormManual((f) => ({ ...f, articulo: e.target.value }))} style={S.input} />
              </div>
              <div>
                <div style={{ fontSize: 11, color: "#666", marginBottom: 6 }}>Material *</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {MATERIALES_MANUAL.map((m) => (
                    <button key={m} onClick={() => setFormManual((f) => ({ ...f, material: m }))}
                      style={{ padding: "5px 11px", borderRadius: 20, border: formManual.material === m ? `2px solid ${GRN}` : "1px solid #333", background: formManual.material === m ? GRN_OSC : "#161616", color: formManual.material === m ? GRN_LT : "#666", cursor: "pointer", fontSize: 11, fontWeight: formManual.material === m ? "bold" : "normal" }}>
                      {m}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "#666", marginBottom: 4 }}>Medidas (opcional)</div>
                <input placeholder="Ej: 90h x 43Ø x 35b" value={formManual.medidas}
                  onChange={(e) => setFormManual((f) => ({ ...f, medidas: e.target.value }))} style={S.input} />
              </div>
              <div>
                <div style={{ fontSize: 11, color: "#666", marginBottom: 4 }}>Precio unitario *</div>
                <input type="number" placeholder="0" value={formManual.precio}
                  onChange={(e) => setFormManual((f) => ({ ...f, precio: e.target.value }))} style={{ ...S.input, textAlign: "right" }} />
              </div>
              <div>
                <div style={{ fontSize: 11, color: "#666", marginBottom: 4 }}>Nota / detalle (opcional)</div>
                <input placeholder="Ej: color negro mate, con agujero drenaje" value={formManual.nota}
                  onChange={(e) => setFormManual((f) => ({ ...f, nota: e.target.value }))} style={S.input} />
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <button onClick={() => setModalAbierto(false)}
                style={{ flex: 1, padding: "10px", borderRadius: 8, border: "1px solid #333", background: "transparent", color: "#666", cursor: "pointer", fontSize: 13 }}>Cancelar</button>
              <button onClick={guardarManual}
                style={{ flex: 2, padding: "10px", borderRadius: 8, border: "none", background: GRN, color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: "bold" }}>
                {editandoKey ? "Guardar cambios" : "Agregar al presupuesto"}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* ══ MODAL CONFIRMAR VACIAR ══ */}
      {confirmarVaciar && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 16 }}>
          <div style={{ background: "#1e1e1e", border: "1px solid #c0392b", borderRadius: 14, padding: "24px 20px", width: "100%", maxWidth: 340, textAlign: "center" }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>🗑</div>
            <div style={{ fontWeight: "bold", fontSize: 16, color: "#f0ede8", marginBottom: 8 }}>¿Vaciar el presupuesto?</div>
            <div style={{ fontSize: 13, color: "#666", marginBottom: 20, lineHeight: 1.5 }}>Se van a borrar todos los productos, cliente y datos. Esta acción no se puede deshacer.</div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setConfirmarVaciar(false)}
                style={{ flex: 1, padding: "11px", borderRadius: 8, border: "1px solid #333", background: "transparent", color: "#888", cursor: "pointer", fontSize: 13 }}>
                Cancelar
              </button>
              <button onClick={vaciar}
                style={{ flex: 1, padding: "11px", borderRadius: 8, border: "none", background: "#c0392b", color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: "bold" }}>
                Sí, vaciar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
