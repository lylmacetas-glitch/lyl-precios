const { useState, useMemo } = React;

const productos = window.LYL_PRODUCTOS;

const MATERIALES = ["Todos", "Barro", "Barro Artesanal", "Fibrocemento", "Rotomoldeado", "Fibra de Vidrio", "Cerámica", "Plástico", "Combo", "Insumos"];
const MATERIALES_MANUAL = ["Fibrocemento", "Rotomoldeado", "Fibra de Vidrio", "Barro", "Barro Artesanal", "Cerámica", "Plástico", "Botánica", "Sustrato", "Insumos", "Combo", "Otros"];

const formatPrecio = (n) => "$\u00a0" + n.toLocaleString("es-AR", { minimumFractionDigits: 0 });
const WA_NUMBER = "5491157554899";
const STORAGE_KEY = "lyl_presup_v2";
const FECHA_LISTA = "06-abr-2026";

const matColors = {
  Barro: "#b5651d", "Barro Artesanal": "#8B4513",
  Fibrocemento: "#607d8b", Rotomoldeado: "#2e7d32",
  "Fibra de Vidrio": "#1565c0", Cerámica: "#ad1457",
  Plástico: "#6a1f8a", Botánica: "#388e3c",
  Sustrato: "#795548", Combo: "#c8860a",
  Insumos: "#0d7377", Otros: "#7c5c20", Manual: "#7c5c20"
};

const GRN = "#2d6a4f"; const GRN_XL = "#74c69d"; const GRN_LT = "#b7e4c7";
const GRN_MNT = "#52b788"; const GRN_OSC = "#1b4332"; const GRN_MED = "#2d6a4f";

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
const saveBorrador = (data) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
};
const clearBorrador = () => {
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
};

const e = React.createElement;

const S = {
  input: { width: "100%", padding: "8px 10px", borderRadius: 8, border: "1px solid #2a2a2a", background: "#111", color: "#ccc", fontSize: 13, outline: "none" },
  pill: (c) => ({ display: "inline-block", padding: "1px 7px", borderRadius: 10, background: c + "22", color: c, fontSize: 10, border: `1px solid ${c}44` }),
};

function App() {
  const b = loadBorrador();
  const [vista, setVista] = useState("buscar");
  const [buscar, setBuscar] = useState("");
  const [material, setMaterial] = useState("Todos");
  const [pintada, setPintada] = useState("Todos");
  const [presupuesto, setPresupuesto] = useState(b?.presupuesto || []);
  const [cliente, setCliente] = useState(b?.cliente || "");
  const [proyecto, setProyecto] = useState(b?.proyecto || "");
  const [envio, setEnvio] = useState(b?.envio || "");
  const [descuento, setDescuento] = useState(b?.descuento || "");
  const [numPresup, setNumPresup] = useState(b?.numPresup || "");
  const [mostrarAnticipo, setMostrarAnticipo] = useState(b?.mostrarAnticipo ?? true);
  const [textoVisible, setTextoVisible] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [formManual, setFormManual] = useState({ articulo: "", medidas: "", precio: "", nota: "", material: "Otros" });
  const [editandoKey, setEditandoKey] = useState(null);
  const [notaAbierta, setNotaAbierta] = useState(null);
  const [notaTemp, setNotaTemp] = useState("");
  const [confirmarVaciar, setConfirmarVaciar] = useState(false);

  const setP = setPresupuesto;

  const save = (extra = {}) => {
    saveBorrador({ presupuesto, cliente, proyecto, envio, descuento, numPresup, mostrarAnticipo, ...extra });
  };

  const agregar = (prod) => {
    asignarNum();
    const key = `${prod.articulo}||${prod.medidas}||${prod.material}||${prod.pintada}||${Date.now()}`;
    setP(prev => {
      const existe = prev.find(i => i.articulo === prod.articulo && i.medidas === prod.medidas && i.material === prod.material && i.pintada === prod.pintada);
      if (existe) {
        const nuevo = prev.map(i => i.key === existe.key ? { ...i, cantidad: i.cantidad + 1 } : i);
        saveBorrador({ presupuesto: nuevo, cliente, proyecto, envio, descuento, numPresup, mostrarAnticipo });
        return nuevo;
      }
      const nuevo = [...prev, { ...prod, key, cantidad: 1, nota: "", sinDescuento: false }];
      saveBorrador({ presupuesto: nuevo, cliente, proyecto, envio, descuento, numPresup, mostrarAnticipo });
      return nuevo;
    });
    setVista("presupuesto");
  };

  const quitar = (key) => setP(prev => prev.filter(i => i.key !== key));
  const toggleSinDescuento = (key) => setP(prev => prev.map(i => i.key === key ? { ...i, sinDescuento: !i.sinDescuento } : i));
  const guardarNota = (key) => { setP(prev => prev.map(i => i.key === key ? { ...i, nota: notaTemp } : i)); setNotaAbierta(null); };

  const abrirModalNuevo = () => { setFormManual({ articulo: "", medidas: "", precio: "", nota: "", material: "Otros" }); setEditandoKey(null); setModalAbierto(true); };

  const guardarManual = () => {
    const pr = parseFloat(String(formManual.precio).replace(/[^\d.]/g, "")) || 0;
    if (!formManual.articulo.trim() || !pr) return;
    const key = editandoKey || `manual||${Date.now()}`;
    const item = { articulo: formManual.articulo.trim(), medidas: formManual.medidas.trim(), material: formManual.material || "Manual", pintada: false, precio: pr, key, cantidad: 1, nota: formManual.nota.trim() };
    if (editandoKey) setP(prev => prev.map(i => i.key === editandoKey ? { ...i, ...item, cantidad: i.cantidad } : i));
    else setP(prev => [...prev, item]);
    setModalAbierto(false);
  };

  const vaciar = () => { setPresupuesto([]); setCliente(""); setProyecto(""); setEnvio(""); setDescuento(""); setNumPresup(""); setTextoVisible(null); clearBorrador(); setConfirmarVaciar(false); };

  const asignarNum = () => { if (numPresup) return; const n = getNextNumero(); setNumPresup(n); save({ numPresup: n }); };

  const exportarBorrador = () => {
    const estado = { presupuesto, cliente, proyecto, envio, descuento, numPresup, mostrarAnticipo };
    const nombre = [numPresup, cliente].filter(Boolean).join("_").replace(/\s+/g, "_") || "borrador";
    const blob = new Blob([JSON.stringify(estado, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `LyL_${nombre}.json`; a.click();
    URL.revokeObjectURL(url);
  };

  const importarBorrador = (ev) => {
    const file = ev.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e2) => {
      try {
        const d = JSON.parse(e2.target.result);
        if (!d.presupuesto) { alert("El archivo no es un borrador válido."); return; }
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
    ev.target.value = "";
  };

  // Cálculos
  const envioNum = parseFloat(String(envio).replace(/[^\d.]/g, "")) || 0;
  const descPct = parseFloat(String(descuento).replace(/[^\d.]/g, "")) || 0;
  const subtotal = presupuesto.reduce((s, i) => s + i.precio * i.cantidad, 0);
  const baseParaDesc = presupuesto.filter(i => !i.sinDescuento).reduce((s, i) => s + i.precio * i.cantidad, 0);
  const montoDesc = Math.round(baseParaDesc * descPct / 100);
  const subtotalConDesc = subtotal - montoDesc;
  const totalFinal = subtotalConDesc + envioNum;
  const anticipo80 = Math.round(totalFinal * 0.8);
  const saldo20 = totalFinal - anticipo80;
  const hasBorrador = presupuesto.length > 0;

  const gruposBuscar = useMemo(() => {
    const b2 = buscar.toLowerCase();
    const filtrados = productos.filter(p => {
      const mB = !b2 || p.articulo.toLowerCase().includes(b2) || p.medidas.toLowerCase().includes(b2);
      const mM = material === "Todos" || p.material === material;
      const mP = pintada === "Todos" || (pintada === "Pintada" && p.pintada) || (pintada === "Sin pintar" && !p.pintada);
      return mB && mM && mP;
    });
    const map = {};
    filtrados.forEach(p => {
      const k = `${p.articulo}||${p.material}||${p.pintada}`;
      if (!map[k]) map[k] = { ...p, variantes: [] };
      map[k].variantes.push({ medidas: p.medidas, precio: p.precio, litros: p.litros, peso_kg: p.peso_kg });
    });
    return Object.values(map);
  }, [buscar, material, pintada]);

  const generarTexto = () => {
    let t = `🌿 *LyL Macetas* — Presupuesto ${numPresup || ""}\n`;
    if (cliente) t += `Cliente: ${cliente}\n`;
    if (proyecto) t += `Proyecto: ${proyecto}\n`;
    t += `Fecha: ${new Date().toLocaleDateString("es-AR")}\n\n`;
    const lineas2 = presupuesto.map(i => `  • ${i.articulo}${i.medidas ? " " + i.medidas : ""} — ${i.cantidad} u. × ${formatPrecio(i.precio)} = ${formatPrecio(i.precio * i.cantidad)}${i.nota ? "\n    _" + i.nota + "_" : ""}`);
    t += lineas2.join("\n");
    t += `\n\n*Subtotal: ${formatPrecio(subtotal)}*`;
    if (descPct > 0) t += `\n🏷 Descuento ${descPct}%: -${formatPrecio(montoDesc)}`;
    if (envioNum > 0) t += `\n🚚 Envío: ${formatPrecio(envioNum)}`;
    t += `\n\n*TOTAL: ${formatPrecio(totalFinal)}*`;
    if (mostrarAnticipo) t += `\n\n_Anticipo 80%: ${formatPrecio(anticipo80)}_\n_Saldo: ${formatPrecio(saldo20)}_`;
    return t;
  };

  const generarJson = () => {
    const data = {
      numero: numPresup, cliente, proyecto,
      fecha: new Date().toLocaleDateString("es-AR"),
      items: presupuesto.map(i => ({ articulo: i.articulo, medidas: i.medidas, material: i.material, cantidad: i.cantidad, precio: i.precio, total: i.precio * i.cantidad, nota: i.nota, sin_descuento: i.sinDescuento || false })),
      subtotal, subtotal_con_descuento: subtotalConDesc,
      descuento_pct: descPct, descuento_monto: montoDesc,
      envio: envioNum, total: totalFinal,
      anticipo_80: mostrarAnticipo ? anticipo80 : null,
      saldo: mostrarAnticipo ? saldo20 : null
    };
    return JSON.stringify(data, null, 2);
  };

  const generarTextoGrupo = (g) => `🌿 *${g.articulo}* — ${g.material}${g.pintada ? " (pintada)" : " (sin pintar)"}\n${g.variantes.map(v => `  • ${v.medidas} → ${formatPrecio(v.precio)}`).join("\n")}`;

  // RENDER
  const headerEl = e('div', { style: { background: `linear-gradient(90deg, ${GRN_OSC}, ${GRN_MED})`, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" } },
    e('div', null,
      e('div', { style: { fontSize: 10, letterSpacing: 4, color: GRN_LT, textTransform: "uppercase" } }, "LyL Macetas"),
      e('div', { style: { fontSize: 20, fontWeight: "bold", color: GRN_XL, marginTop: 2 } }, "Consulta de Precios"),
      e('div', { style: { fontSize: 10, color: GRN_MNT, marginTop: 1 } }, `Lista minorista · ${FECHA_LISTA}`)
    ),
    presupuesto.length > 0 && e('div', { style: { background: GRN, borderRadius: 20, padding: "4px 12px", fontSize: 12, color: GRN_LT, fontWeight: "bold" } }, `${presupuesto.length} items`)
  );

  const tabsEl = e('div', { style: { display: "flex", borderBottom: "1px solid #222", background: "#141414" } },
    [["buscar", "🔍 Buscar"], ["presupuesto", "🧾 Presupuesto"]].map(([k, label]) =>
      e('button', {
        key: k,
        onClick: () => setVista(k),
        style: { flex: 1, padding: "11px 6px", border: "none", background: "transparent", color: vista === k ? GRN_XL : "#555", borderBottom: vista === k ? `2px solid ${GRN_XL}` : "2px solid transparent", fontSize: 13, cursor: "pointer", fontWeight: vista === k ? "bold" : "normal", position: "relative" }
      },
        label,
        k === "presupuesto" && hasBorrador && e('div', { style: { position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", width: 7, height: 7, borderRadius: "50%", background: GRN_XL } })
      )
    )
  );

  // Vista Buscar
  const vistaBuscar = e('div', { style: { padding: "12px 14px" } },
    // Buscador
    e('input', {
      type: "text", placeholder: "Buscar por nombre o medida...",
      value: buscar, onChange: ev => setBuscar(ev.target.value),
      style: { ...S.input, marginBottom: 10 }
    }),
    // Pills material
    e('div', { style: { display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 } },
      MATERIALES.map(m =>
        e('button', {
          key: m,
          onClick: () => setMaterial(m),
          style: { padding: "3px 10px", borderRadius: 12, border: `1px solid ${material === m ? GRN_XL : "#333"}`, background: material === m ? GRN + "44" : "transparent", color: material === m ? GRN_XL : "#555", fontSize: 11, cursor: "pointer" }
        }, m)
      )
    ),
    // Pills pintada
    e('div', { style: { display: "flex", gap: 6, marginBottom: 12 } },
      ["Todos", "Pintada", "Sin pintar"].map(p =>
        e('button', {
          key: p,
          onClick: () => setPintada(p),
          style: { padding: "3px 10px", borderRadius: 12, border: `1px solid ${pintada === p ? GRN_XL : "#333"}`, background: pintada === p ? GRN + "44" : "transparent", color: pintada === p ? GRN_XL : "#555", fontSize: 11, cursor: "pointer" }
        }, p)
      )
    ),
    // Resultados
    gruposBuscar.length === 0
      ? e('div', { style: { textAlign: "center", color: "#444", padding: 30 } }, "Sin resultados")
      : gruposBuscar.map((grupo, idx) => {
          const dc = matColors[grupo.material] || "#888";
          const ps = grupo.material === "Barro" ? "" : (grupo.pintada ? "pintada" : "sin pintar");
          return e('div', {
            key: idx,
            style: { background: "#1a1a1a", borderRadius: 10, marginBottom: 8, border: "1px solid #222", overflow: "hidden" }
          },
            e('div', { style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 12px 7px", borderBottom: "1px solid #252525" } },
              e('div', null,
                e('span', { style: { fontWeight: "bold", fontSize: 14, color: "#e8e3dc" } }, grupo.articulo),
                e('div', { style: { marginTop: 2, display: "flex", gap: 5, alignItems: "center" } },
                  e('div', { style: { width: 6, height: 6, borderRadius: "50%", background: dc } }),
                  e('span', { style: { fontSize: 10, color: "#666" } }, grupo.material + (ps ? ` · ${ps}` : ""))
                )
              ),
              e('button', {
                onClick: () => setTextoVisible(textoVisible?.idx === idx ? null : { idx, texto: generarTextoGrupo(grupo) }),
                style: { padding: "3px 9px", borderRadius: 6, border: "1px solid #2a2a2a", background: "transparent", color: "#555", cursor: "pointer", fontSize: 10 }
              }, textoVisible?.idx === idx ? "✓ ↑" : "texto")
            ),
            textoVisible?.idx === idx && e('div', { style: { padding: "8px 12px", background: "#111", borderBottom: "1px solid #222" } },
              e('textarea', { readOnly: true, value: textoVisible.texto, onFocus: ev => ev.target.select(), rows: textoVisible.texto.split("\n").length + 1, style: { ...S.input, fontFamily: "monospace", fontSize: 11, resize: "none" } })
            ),
            grupo.variantes.map((v, vi) =>
              e('div', {
                key: vi,
                style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 12px", borderBottom: vi < grupo.variantes.length - 1 ? "1px solid #222" : "none" }
              },
                e('div', null,
                  e('span', { style: { fontSize: 12, color: "#888" } }, v.medidas || "—"),
                  (v.litros || v.peso_kg) && e('div', { style: { display: "flex", gap: 8, marginTop: 2 } },
                    v.litros && e('span', { style: { fontSize: 10, color: "#555", background: "#1a2a1a", padding: "1px 6px", borderRadius: 8 } }, `🪣 ${v.litros}L`),
                    v.peso_kg && e('span', { style: { fontSize: 10, color: "#555", background: "#1a2a1a", padding: "1px 6px", borderRadius: 8 } }, `⚖ ${v.peso_kg}kg`)
                  )
                ),
                e('div', { style: { display: "flex", alignItems: "center", gap: 10 } },
                  e('span', { style: { fontSize: 13, color: GRN_XL, fontWeight: "bold" } }, formatPrecio(v.precio)),
                  e('button', {
                    onClick: () => agregar({ articulo: grupo.articulo, medidas: v.medidas, material: grupo.material, pintada: grupo.pintada, precio: v.precio }),
                    style: { width: 26, height: 26, borderRadius: "50%", border: `1px solid ${GRN}`, background: GRN_OSC, color: GRN_LT, cursor: "pointer", fontSize: 17, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }
                  }, "+")
                )
              )
            )
          );
        })
  );

  // Vista Presupuesto
  const vistaPresupuesto = e('div', { style: { padding: "12px 14px" } },
    // Número y datos
    e('div', { style: { background: "#1a1a1a", borderRadius: 10, padding: "12px", marginBottom: 10, border: "1px solid #222" } },
      e('div', { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 } },
        e('span', { style: { fontSize: 12, color: GRN_MNT, fontWeight: "bold" } }, numPresup || "N° pendiente"),
        e('button', {
          onClick: abrirModalNuevo,
          style: { padding: "5px 12px", borderRadius: 8, border: `1px solid ${GRN}`, background: "transparent", color: GRN_MNT, cursor: "pointer", fontSize: 11 }
        }, "+ Artículo manual")
      ),
      e('input', { type: "text", placeholder: "Cliente", value: cliente, onChange: ev => { setCliente(ev.target.value); save({ cliente: ev.target.value }); }, style: { ...S.input, marginBottom: 6 } }),
      e('input', { type: "text", placeholder: "Proyecto / Dirección", value: proyecto, onChange: ev => { setProyecto(ev.target.value); save({ proyecto: ev.target.value }); }, style: S.input })
    ),

    // Items
    presupuesto.length === 0
      ? e('div', { style: { textAlign: "center", color: "#333", padding: 30, fontSize: 13 } }, "El presupuesto está vacío.\nBuscá productos en la pestaña 🔍")
      : presupuesto.map(item =>
          e('div', { key: item.key, style: { background: "#1a1a1a", borderRadius: 10, padding: "10px 12px", marginBottom: 6, border: "1px solid #222" } },
            e('div', { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 } },
              e('div', { style: { flex: 1 } },
                e('div', { style: { fontSize: 13, fontWeight: "bold", color: "#e8e3dc" } }, item.articulo + (item.medidas ? " " + item.medidas : "")),
                e('div', { style: { display: "flex", gap: 6, marginTop: 3, flexWrap: "wrap", alignItems: "center" } },
                  e('span', { style: S.pill(matColors[item.material] || "#888") }, item.material),
                  e('span', { style: { fontSize: 11, color: GRN_MNT } }, formatPrecio(item.precio) + " c/u"),
                  e('label', { style: { display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: item.sinDescuento ? "#e07b39" : "#444", cursor: "pointer" } },
                    e('input', { type: "checkbox", checked: item.sinDescuento || false, onChange: () => toggleSinDescuento(item.key), style: { accentColor: "#e07b39" } }),
                    "sin desc."
                  )
                )
              ),
              e('button', { onClick: () => quitar(item.key), style: { background: "transparent", border: "none", color: "#333", cursor: "pointer", fontSize: 16, padding: "0 4px" } }, "×")
            ),
            e('div', { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 } },
              e('div', { style: { display: "flex", alignItems: "center", gap: 8 } },
                e('button', { onClick: () => setP(prev => prev.map(i => i.key === item.key ? { ...i, cantidad: Math.max(1, i.cantidad - 1) } : i)), style: { width: 24, height: 24, borderRadius: "50%", border: `1px solid ${GRN}`, background: "transparent", color: GRN_MNT, cursor: "pointer", fontSize: 16 } }, "−"),
                e('span', { style: { fontSize: 14, color: "#ccc", minWidth: 20, textAlign: "center" } }, item.cantidad),
                e('button', { onClick: () => setP(prev => prev.map(i => i.key === item.key ? { ...i, cantidad: i.cantidad + 1 } : i)), style: { width: 24, height: 24, borderRadius: "50%", border: `1px solid ${GRN}`, background: "transparent", color: GRN_MNT, cursor: "pointer", fontSize: 16 } }, "+")
              ),
              e('span', { style: { fontSize: 14, fontWeight: "bold", color: GRN_XL } }, formatPrecio(item.precio * item.cantidad))
            ),
            notaAbierta === item.key
              ? e('div', { style: { marginTop: 8 } },
                  e('input', { type: "text", placeholder: "Nota...", value: notaTemp, onChange: ev => setNotaTemp(ev.target.value), onKeyDown: ev => ev.key === "Enter" && guardarNota(item.key), autoFocus: true, style: { ...S.input, fontSize: 12 } }),
                  e('div', { style: { display: "flex", gap: 6, marginTop: 4 } },
                    e('button', { onClick: () => guardarNota(item.key), style: { flex: 1, padding: "5px", borderRadius: 6, border: "none", background: GRN, color: "#fff", cursor: "pointer", fontSize: 11 } }, "✓ Guardar"),
                    e('button', { onClick: () => setNotaAbierta(null), style: { padding: "5px 10px", borderRadius: 6, border: "1px solid #333", background: "transparent", color: "#555", cursor: "pointer", fontSize: 11 } }, "×")
                  )
                )
              : e('button', { onClick: () => { setNotaAbierta(item.key); setNotaTemp(item.nota || ""); }, style: { marginTop: 6, background: "transparent", border: "none", color: item.nota ? GRN_MNT : "#333", cursor: "pointer", fontSize: 10, padding: 0 } },
                  item.nota ? `📝 ${item.nota}` : "+ agregar nota"
                )
          )
        ),

    // Ajustes y totales
    presupuesto.length > 0 && e('div', { style: { background: "#1a1a1a", borderRadius: 10, padding: "12px", marginTop: 4, border: "1px solid #222" } },
      e('div', { style: { display: "flex", gap: 8, marginBottom: 10 } },
        e('input', { type: "number", placeholder: "Envío $", value: envio, onChange: ev => { setEnvio(ev.target.value); save({ envio: ev.target.value }); }, style: { ...S.input, flex: 1 } }),
        e('input', { type: "number", placeholder: "Descuento %", value: descuento, onChange: ev => { setDescuento(ev.target.value); save({ descuento: ev.target.value }); }, style: { ...S.input, flex: 1 } })
      ),
      e('div', { style: { display: "flex", justifyContent: "space-between", fontSize: 13, color: "#888", marginBottom: 4 } }, e('span', null, "Subtotal"), e('span', null, formatPrecio(subtotal))),
      presupuesto.some(i => i.sinDescuento) && e('div', { style: { fontSize: 10, color: "#555", marginBottom: 4, textAlign: "right" } }, `Base con descuento: ${formatPrecio(baseParaDesc)}`),
      descPct > 0 && e('div', { style: { display: "flex", justifyContent: "space-between", fontSize: 13, color: "#e07b39", marginBottom: 4 } }, e('span', null, `Descuento ${descPct}%`), e('span', null, `- ${formatPrecio(montoDesc)}`)),
      envioNum > 0 && e('div', { style: { display: "flex", justifyContent: "space-between", fontSize: 13, color: "#888", marginBottom: 4 } }, e('span', null, "Envío"), e('span', null, formatPrecio(envioNum))),
      e('div', { style: { display: "flex", justifyContent: "space-between", fontSize: 17, fontWeight: "bold", color: GRN_XL, borderTop: "1px solid #333", paddingTop: 8, marginTop: 4 } }, e('span', null, "TOTAL"), e('span', null, formatPrecio(totalFinal))),
      e('label', { style: { display: "flex", alignItems: "center", gap: 6, marginTop: 8, fontSize: 11, color: "#555", cursor: "pointer" } },
        e('input', { type: "checkbox", checked: mostrarAnticipo, onChange: () => setMostrarAnticipo(v => !v) }),
        "Mostrar anticipo y saldo"
      ),
      mostrarAnticipo && e('div', { style: { marginTop: 4 } },
        e('div', { style: { display: "flex", justifyContent: "space-between", fontSize: 11, color: GRN_MNT, marginTop: 2 } }, e('span', null, "Anticipo 80%"), e('span', null, formatPrecio(anticipo80))),
        e('div', { style: { display: "flex", justifyContent: "space-between", fontSize: 11, color: "#555" } }, e('span', null, "Saldo"), e('span', null, formatPrecio(saldo20)))
      )
    ),

    // Acciones
    presupuesto.length > 0 && e('div', { style: { display: "flex", flexDirection: "column", gap: 8, marginTop: 10 } },
      e('button', {
        onClick: () => window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(generarTexto())}`, "_blank"),
        style: { width: "100%", padding: "13px", borderRadius: 10, border: "none", background: "#25D366", color: "#fff", cursor: "pointer", fontSize: 14, fontWeight: "bold" }
      }, "📲 Enviar por WhatsApp"),
      e('button', {
        onClick: () => setTextoVisible(textoVisible?.idx === "presup" ? null : { idx: "presup", texto: generarTexto() }),
        style: { width: "100%", padding: "10px", borderRadius: 10, border: "1px solid #444", background: "transparent", color: "#888", cursor: "pointer", fontSize: 12 }
      }, "📋 Ver texto para copiar"),
      textoVisible?.idx === "presup" && e('div', { style: { background: "#111", border: `1px solid ${GRN}`, borderRadius: 8, padding: "10px 12px" } },
        e('textarea', { readOnly: true, value: textoVisible.texto, onFocus: ev => ev.target.select(), rows: Math.min(textoVisible.texto.split("\n").length + 1, 16), style: { ...S.input, fontFamily: "monospace", fontSize: 12, lineHeight: 1.5, resize: "vertical" } })
      ),
      e('button', {
        onClick: () => setTextoVisible(textoVisible?.idx === "json" ? null : { idx: "json", texto: generarJson() }),
        style: { width: "100%", padding: "11px", borderRadius: 10, border: `1px solid ${GRN}`, background: "transparent", color: GRN_MNT, cursor: "pointer", fontSize: 13, fontWeight: "bold" }
      }, "📄 Generar PDF / Excel / Remito → Pegar a Claude"),
      textoVisible?.idx === "json" && e('div', { style: { background: "#0d1f14", border: `1px solid ${GRN}`, borderRadius: 8, padding: "12px 14px" } },
        e('div', { style: { fontSize: 12, color: GRN_MNT, marginBottom: 6, fontWeight: "bold" } }, "📋 Copiá esto y pegalo en el chat:"),
        e('textarea', { readOnly: true, value: textoVisible.texto, onFocus: ev => ev.target.select(), rows: 6, style: { ...S.input, fontFamily: "monospace", fontSize: 11, lineHeight: 1.4, resize: "vertical" } })
      ),
      e('button', {
        onClick: () => setConfirmarVaciar(true),
        style: { width: "100%", padding: "9px", borderRadius: 10, border: "1px solid #2a2a2a", background: "transparent", color: "#3a3a3a", cursor: "pointer", fontSize: 11 }
      }, "🗑 Vaciar presupuesto"),
      e('div', { style: { borderTop: "1px solid #222", paddingTop: 10, marginTop: 2, display: "flex", gap: 8 } },
        e('button', { onClick: exportarBorrador, style: { flex: 1, padding: "9px", borderRadius: 8, border: `1px solid ${GRN}`, background: "transparent", color: GRN_MNT, cursor: "pointer", fontSize: 12, fontWeight: "bold" } }, "💾 Guardar borrador"),
        e('label', { style: { flex: 1, padding: "9px", borderRadius: 8, border: "1px solid #444", background: "transparent", color: "#888", cursor: "pointer", fontSize: 12, textAlign: "center", display: "block" } },
          "📂 Cargar borrador",
          e('input', { type: "file", accept: ".json", onChange: importarBorrador, style: { display: "none" } })
        )
      )
    )
  );

  // Modal manual
  const modalEl = modalAbierto && e('div', { style: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 16 } },
    e('div', { style: { background: "#1a1a1a", borderRadius: 14, padding: 20, width: "100%", maxWidth: 360, border: "1px solid #333" } },
      e('h3', { style: { color: GRN_XL, fontSize: 15, marginBottom: 14 } }, "Artículo manual"),
      e('input', { type: "text", placeholder: "Artículo *", value: formManual.articulo, onChange: ev => setFormManual(f => ({ ...f, articulo: ev.target.value })), style: { ...S.input, marginBottom: 8 } }),
      e('input', { type: "text", placeholder: "Medidas", value: formManual.medidas, onChange: ev => setFormManual(f => ({ ...f, medidas: ev.target.value })), style: { ...S.input, marginBottom: 8 } }),
      e('input', { type: "number", placeholder: "Precio *", value: formManual.precio, onChange: ev => setFormManual(f => ({ ...f, precio: ev.target.value })), style: { ...S.input, marginBottom: 8 } }),
      e('input', { type: "text", placeholder: "Nota", value: formManual.nota, onChange: ev => setFormManual(f => ({ ...f, nota: ev.target.value })), style: { ...S.input, marginBottom: 10 } }),
      e('div', { style: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 } },
        MATERIALES_MANUAL.map(m => e('button', {
          key: m,
          onClick: () => setFormManual(f => ({ ...f, material: m })),
          style: { padding: "3px 8px", borderRadius: 10, border: `1px solid ${formManual.material === m ? GRN_XL : "#333"}`, background: formManual.material === m ? GRN + "44" : "transparent", color: formManual.material === m ? GRN_XL : "#555", fontSize: 10, cursor: "pointer" }
        }, m))
      ),
      e('div', { style: { display: "flex", gap: 8 } },
        e('button', { onClick: () => setModalAbierto(false), style: { flex: 1, padding: "11px", borderRadius: 8, border: "1px solid #2a2a2a", background: "transparent", color: "#555", cursor: "pointer", fontSize: 13 } }, "Cancelar"),
        e('button', { onClick: guardarManual, style: { flex: 1, padding: "11px", borderRadius: 8, border: "none", background: GRN, color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: "bold" } }, "Agregar")
      )
    )
  );

  // Modal confirmar vaciar
  const confirmarEl = confirmarVaciar && e('div', { style: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 16 } },
    e('div', { style: { background: "#1a1a1a", borderRadius: 14, padding: 20, width: "100%", maxWidth: 320, border: "1px solid #333", textAlign: "center" } },
      e('div', { style: { fontSize: 32, marginBottom: 10 } }, "🗑"),
      e('div', { style: { fontSize: 15, color: "#ccc", marginBottom: 6 } }, "¿Vaciar el presupuesto?"),
      e('div', { style: { fontSize: 12, color: "#555", marginBottom: 16 } }, "Se van a borrar todos los items"),
      e('div', { style: { display: "flex", gap: 8 } },
        e('button', { onClick: () => setConfirmarVaciar(false), style: { flex: 1, padding: "11px", borderRadius: 8, border: "1px solid #2a2a2a", background: "transparent", color: "#555", cursor: "pointer", fontSize: 13 } }, "Cancelar"),
        e('button', { onClick: vaciar, style: { flex: 1, padding: "11px", borderRadius: 8, border: "none", background: "#c0392b", color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: "bold" } }, "Sí, vaciar")
      )
    )
  );

  return e('div', { style: { minHeight: "100vh", background: "#181818", fontFamily: "'Georgia', serif", maxWidth: 480, margin: "0 auto" } },
    headerEl,
    tabsEl,
    e('div', { style: { overflowY: "auto" } },
      vista === "buscar" ? vistaBuscar : vistaPresupuesto
    ),
    modalEl,
    confirmarEl
  );
}
