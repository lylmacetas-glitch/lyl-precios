const { useState, useMemo } = React;

const productos = [
  // BARRO — BLUM
  { articulo: "FRUTILLERA 60", medidas: "", material: "Barro", pintada: false, precio: 174920, litros: null, peso_kg: null },
  { articulo: "MAC. COMUN Nº 16 PINTADA", medidas: "", material: "Barro", pintada: true, precio: 6400, litros: null, peso_kg: null },
  { articulo: "MAC. COMUN Nº 18 PINTADA", medidas: "", material: "Barro", pintada: true, precio: 8750, litros: null, peso_kg: null },
  { articulo: "PORTEÑA Nº20", medidas: "", material: "Barro", pintada: false, precio: 4750, litros: null, peso_kg: null },
  { articulo: "PORTEÑA Nº45", medidas: "", material: "Barro", pintada: false, precio: 49510, litros: null, peso_kg: null },
  { articulo: "CILINDRO N26 GRAFITO", medidas: "", material: "Barro", pintada: true, precio: 19030, litros: null, peso_kg: null },
  { articulo: "CILINDRO N22 GRAFITO", medidas: "", material: "Barro", pintada: true, precio: 12970, litros: null, peso_kg: null },
  { articulo: "CILINDRO N18 GRAFITO", medidas: "", material: "Barro", pintada: true, precio: 8380, litros: null, peso_kg: null },
  { articulo: "CILINDRO N14 GRAFITO", medidas: "", material: "Barro", pintada: true, precio: 4640, litros: null, peso_kg: null },
  { articulo: "CILINDRO N12 GRAFITO", medidas: "", material: "Barro", pintada: true, precio: 1960, litros: null, peso_kg: null },
  { articulo: "BOMBA N23 GRAFITO", medidas: "", material: "Barro", pintada: true, precio: 14390, litros: null, peso_kg: null },
  { articulo: "MAC PREMIUM N22 GRAFITO", medidas: "", material: "Barro", pintada: true, precio: 6900, litros: null, peso_kg: null },
  { articulo: "CILINDRO N18 ESMALTADO", medidas: "", material: "Barro", pintada: true, precio: 12980, litros: null, peso_kg: null },
  { articulo: "MAC. COMUN N14 PINTADA", medidas: "", material: "Barro", pintada: true, precio: 5400, litros: null, peso_kg: null },
  { articulo: "CILINDRO ESMALTADO N12", medidas: "", material: "Barro", pintada: true, precio: 4540, litros: null, peso_kg: null },
  { articulo: "CILINDRO ESMALTADO N14", medidas: "", material: "Barro", pintada: true, precio: 8770, litros: null, peso_kg: null },
  { articulo: "MAC PREMIUM ESMALTADA N22", medidas: "", material: "Barro", pintada: true, precio: 13920, litros: null, peso_kg: null },
  { articulo: "ICONO N12", medidas: "", material: "Barro", pintada: false, precio: 1770, litros: null, peso_kg: null },
  { articulo: "ICONO N14", medidas: "", material: "Barro", pintada: false, precio: 1860, litros: null, peso_kg: null },
  { articulo: "ICONO N16", medidas: "", material: "Barro", pintada: false, precio: 2780, litros: null, peso_kg: null },
  { articulo: "ICONO N18", medidas: "", material: "Barro", pintada: false, precio: 3370, litros: null, peso_kg: null },
  { articulo: "ICONO N20", medidas: "", material: "Barro", pintada: false, precio: 4130, litros: null, peso_kg: null },
  { articulo: "CILINDRO ESMALTADO N22", medidas: "", material: "Barro", pintada: true, precio: 25850, litros: null, peso_kg: null },
  { articulo: "AMERICANA Nº23", medidas: "", material: "Barro", pintada: false, precio: 8380, litros: null, peso_kg: null },
  { articulo: "AMERICANA Nº29", medidas: "", material: "Barro", pintada: false, precio: 15550, litros: null, peso_kg: null },
  { articulo: "AMERICANA Nº36", medidas: "", material: "Barro", pintada: false, precio: 25140, litros: null, peso_kg: null },
  { articulo: "BALCONERA Nº45", medidas: "", material: "Barro", pintada: false, precio: 17000, litros: null, peso_kg: null },
  { articulo: "BOLS COLGANTE N24", medidas: "", material: "Barro", pintada: false, precio: 7010, litros: null, peso_kg: null },
  { articulo: "BOLS Nº13", medidas: "", material: "Barro", pintada: false, precio: 2940, litros: null, peso_kg: null },
  { articulo: "BOLS Nº17", medidas: "", material: "Barro", pintada: false, precio: 4560, litros: null, peso_kg: null },
  { articulo: "BOLS Nº21", medidas: "", material: "Barro", pintada: false, precio: 7210, litros: null, peso_kg: null },
  { articulo: "BOLS Nº25", medidas: "", material: "Barro", pintada: false, precio: 9850, litros: null, peso_kg: null },
  { articulo: "BOMBA Nº08", medidas: "", material: "Barro", pintada: false, precio: 3420, litros: null, peso_kg: null },
  { articulo: "BOMBA Nº14", medidas: "", material: "Barro", pintada: false, precio: 6790, litros: null, peso_kg: null },
  { articulo: "BOMBA Nº16", medidas: "", material: "Barro", pintada: false, precio: 8450, litros: null, peso_kg: null },
  { articulo: "BOMBA Nº19", medidas: "", material: "Barro", pintada: false, precio: 10790, litros: null, peso_kg: null },
  { articulo: "BOMBA Nº23", medidas: "", material: "Barro", pintada: false, precio: 16620, litros: null, peso_kg: null },
  { articulo: "BOMBA Nº35", medidas: "", material: "Barro", pintada: false, precio: 40580, litros: null, peso_kg: null },
  { articulo: "BOMBA Nº40", medidas: "", material: "Barro", pintada: false, precio: 60250, litros: null, peso_kg: null },
  { articulo: "BOMBA Nº50", medidas: "", material: "Barro", pintada: false, precio: 91290, litros: null, peso_kg: null },
  { articulo: "CILINDRO C/BORDE Nº15", medidas: "", material: "Barro", pintada: false, precio: 3860, litros: null, peso_kg: null },
  { articulo: "CILINDRO C/BORDE Nº19", medidas: "", material: "Barro", pintada: false, precio: 5740, litros: null, peso_kg: null },
  { articulo: "CILINDRO C/BORDE Nº24", medidas: "", material: "Barro", pintada: false, precio: 9240, litros: null, peso_kg: null },
  { articulo: "CILINDRO C/BORDE Nº30", medidas: "", material: "Barro", pintada: false, precio: 19490, litros: null, peso_kg: null },
  { articulo: "CILINDRO C/BORDE Nº38", medidas: "", material: "Barro", pintada: false, precio: 34820, litros: null, peso_kg: null },
  { articulo: "CILINDRO C/BORDE Nº48", medidas: "", material: "Barro", pintada: false, precio: 79250, litros: null, peso_kg: null },
  { articulo: "CILINDRO Nº12", medidas: "", material: "Barro", pintada: false, precio: 2260, litros: null, peso_kg: null },
  { articulo: "CILINDRO Nº14", medidas: "", material: "Barro", pintada: false, precio: 5360, litros: null, peso_kg: null },
  { articulo: "CILINDRO Nº18", medidas: "", material: "Barro", pintada: false, precio: 9680, litros: null, peso_kg: null },
  { articulo: "CILINDRO Nº22", medidas: "", material: "Barro", pintada: false, precio: 14970, litros: null, peso_kg: null },
  { articulo: "CILINDRO Nº26", medidas: "", material: "Barro", pintada: false, precio: 21960, litros: null, peso_kg: null },
  { articulo: "CILINDRO Nº30", medidas: "", material: "Barro", pintada: false, precio: 32320, litros: null, peso_kg: null },
  { articulo: "COLGADERA Nº25", medidas: "", material: "Barro", pintada: false, precio: 10390, litros: null, peso_kg: null },
  { articulo: "COLGADERA Nº30", medidas: "", material: "Barro", pintada: false, precio: 18120, litros: null, peso_kg: null },
  { articulo: "CONO 31", medidas: "", material: "Barro", pintada: false, precio: 10280, litros: null, peso_kg: null },
  { articulo: "CONO 40", medidas: "", material: "Barro", pintada: false, precio: 20390, litros: null, peso_kg: null },
  { articulo: "CONO 48", medidas: "", material: "Barro", pintada: false, precio: 31210, litros: null, peso_kg: null },
  { articulo: "CONO 55 CM", medidas: "", material: "Barro", pintada: false, precio: 52730, litros: null, peso_kg: null },
  { articulo: "FESTONEADA Nº08", medidas: "", material: "Barro", pintada: false, precio: 3360, litros: null, peso_kg: null },
  { articulo: "FESTONEADA Nº10", medidas: "", material: "Barro", pintada: false, precio: 4420, litros: null, peso_kg: null },
  { articulo: "FESTONEADA Nº16", medidas: "", material: "Barro", pintada: false, precio: 8210, litros: null, peso_kg: null },
  { articulo: "FESTONEADA Nº19", medidas: "", material: "Barro", pintada: false, precio: 11330, litros: null, peso_kg: null },
  { articulo: "FESTONEADA Nº24", medidas: "", material: "Barro", pintada: false, precio: 13020, litros: null, peso_kg: null },
  { articulo: "FESTONEADA Nº30", medidas: "", material: "Barro", pintada: false, precio: 31420, litros: null, peso_kg: null },
  { articulo: "FESTONEADA Nº45", medidas: "", material: "Barro", pintada: false, precio: 92230, litros: null, peso_kg: null },
  { articulo: "FESTONEADA Nº58", medidas: "", material: "Barro", pintada: false, precio: 138360, litros: null, peso_kg: null },
  { articulo: "FRUTILLERA 40", medidas: "", material: "Barro", pintada: false, precio: 87460, litros: null, peso_kg: null },
  { articulo: "ITALIANA Nº14", medidas: "", material: "Barro", pintada: false, precio: 2630, litros: null, peso_kg: null },
  { articulo: "ITALIANA Nº16", medidas: "", material: "Barro", pintada: false, precio: 3110, litros: null, peso_kg: null },
  { articulo: "ITALIANA Nº18", medidas: "", material: "Barro", pintada: false, precio: 4240, litros: null, peso_kg: null },
  { articulo: "ITALIANA Nº20", medidas: "", material: "Barro", pintada: false, precio: 5610, litros: null, peso_kg: null },
  { articulo: "ITALIANA Nº22", medidas: "", material: "Barro", pintada: false, precio: 7870, litros: null, peso_kg: null },
  { articulo: "ITALIANA Nº24", medidas: "", material: "Barro", pintada: false, precio: 10210, litros: null, peso_kg: null },
  { articulo: "ITALIANA Nº26", medidas: "", material: "Barro", pintada: false, precio: 13510, litros: null, peso_kg: null },
  { articulo: "ITALIANA Nº30", medidas: "", material: "Barro", pintada: false, precio: 17030, litros: null, peso_kg: null },
  { articulo: "ITALIANA Nº35", medidas: "", material: "Barro", pintada: false, precio: 24760, litros: null, peso_kg: null },
  { articulo: "ITALIANA Nº40", medidas: "", material: "Barro", pintada: false, precio: 32140, litros: null, peso_kg: null },
  { articulo: "ITALIANA Nº48", medidas: "", material: "Barro", pintada: false, precio: 53540, litros: null, peso_kg: null },
  { articulo: "ITALIANA Nº52", medidas: "", material: "Barro", pintada: false, precio: 77780, litros: null, peso_kg: null },
  { articulo: "JARD. C.ROMA Nº31", medidas: "", material: "Barro", pintada: false, precio: 14630, litros: null, peso_kg: null },
  { articulo: "JARD. C.ROMA Nº52", medidas: "", material: "Barro", pintada: false, precio: 37680, litros: null, peso_kg: null },
  { articulo: "JARDINERA Nº30", medidas: "", material: "Barro", pintada: false, precio: 13330, litros: null, peso_kg: null },
  { articulo: "JARDINERA Nº40", medidas: "", material: "Barro", pintada: false, precio: 24380, litros: null, peso_kg: null },
  { articulo: "JARDINERA Nº50", medidas: "", material: "Barro", pintada: false, precio: 35170, litros: null, peso_kg: null },
  { articulo: "LEBRILLO Nº22", medidas: "", material: "Barro", pintada: false, precio: 6920, litros: null, peso_kg: null },
  { articulo: "LEBRILLO Nº26", medidas: "", material: "Barro", pintada: false, precio: 9740, litros: null, peso_kg: null },
  { articulo: "LEBRILLO Nº30", medidas: "", material: "Barro", pintada: false, precio: 13380, litros: null, peso_kg: null },
  { articulo: "LEBRILLO Nº34", medidas: "", material: "Barro", pintada: false, precio: 16710, litros: null, peso_kg: null },
  { articulo: "LEBRILLO Nº38", medidas: "", material: "Barro", pintada: false, precio: 20550, litros: null, peso_kg: null },
  { articulo: "LEBRILLO Nº45", medidas: "", material: "Barro", pintada: false, precio: 33530, litros: null, peso_kg: null },
  { articulo: "LEBRILLO Nº52", medidas: "", material: "Barro", pintada: false, precio: 49910, litros: null, peso_kg: null },
  { articulo: "MAC. COMUN Nº 04", medidas: "", material: "Barro", pintada: false, precio: 1080, litros: null, peso_kg: null },
  { articulo: "MAC. COMUN Nº 05", medidas: "", material: "Barro", pintada: false, precio: 1100, litros: null, peso_kg: null },
  { articulo: "MAC. COMUN Nº 07", medidas: "", material: "Barro", pintada: false, precio: 1390, litros: null, peso_kg: null },
  { articulo: "MAC. COMUN Nº 08", medidas: "", material: "Barro", pintada: false, precio: 1600, litros: null, peso_kg: null },
  { articulo: "MAC. COMUN Nº 10", medidas: "", material: "Barro", pintada: false, precio: 1650, litros: null, peso_kg: null },
  { articulo: "MAC. COMUN Nº 12", medidas: "", material: "Barro", pintada: false, precio: 1850, litros: null, peso_kg: null },
  { articulo: "MAC. COMUN Nº 14", medidas: "", material: "Barro", pintada: false, precio: 2200, litros: null, peso_kg: null },
  { articulo: "MAC. COMUN Nº 16", medidas: "", material: "Barro", pintada: false, precio: 2890, litros: null, peso_kg: null },
  { articulo: "MAC. COMUN Nº 18", medidas: "", material: "Barro", pintada: false, precio: 4020, litros: null, peso_kg: null },
  { articulo: "MAC. COMUN Nº 20", medidas: "", material: "Barro", pintada: false, precio: 4960, litros: null, peso_kg: null },
  { articulo: "MAC. COMUN Nº 22", medidas: "", material: "Barro", pintada: false, precio: 7970, litros: null, peso_kg: null },
  { articulo: "MAC. COMUN Nº 24", medidas: "", material: "Barro", pintada: false, precio: 9260, litros: null, peso_kg: null },
  { articulo: "MAC. COMUN Nº 26", medidas: "", material: "Barro", pintada: false, precio: 11460, litros: null, peso_kg: null },
  { articulo: "MAC. COMUN Nº 28", medidas: "", material: "Barro", pintada: false, precio: 13120, litros: null, peso_kg: null },
  { articulo: "MAC. COMUN Nº 30", medidas: "", material: "Barro", pintada: false, precio: 15530, litros: null, peso_kg: null },
  { articulo: "MAC. COMUN Nº 35", medidas: "", material: "Barro", pintada: false, precio: 20390, litros: null, peso_kg: null },
  { articulo: "MAC. COMUN Nº 40", medidas: "", material: "Barro", pintada: false, precio: 32010, litros: null, peso_kg: null },
  { articulo: "MAC. COMUN Nº 48", medidas: "", material: "Barro", pintada: false, precio: 48850, litros: null, peso_kg: null },
  { articulo: "MAC. COMUN Nº 52", medidas: "", material: "Barro", pintada: false, precio: 76350, litros: null, peso_kg: null },
  { articulo: "AGUSTINIANA Nº20", medidas: "", material: "Barro", pintada: false, precio: 10260, litros: null, peso_kg: null },
  { articulo: "AGUSTINIANA Nº27", medidas: "", material: "Barro", pintada: false, precio: 23050, litros: null, peso_kg: null },
  { articulo: "AGUSTINIANA Nº34", medidas: "", material: "Barro", pintada: false, precio: 44870, litros: null, peso_kg: null },
  { articulo: "AGUSTINIANA Nº40", medidas: "", material: "Barro", pintada: false, precio: 71350, litros: null, peso_kg: null },
  { articulo: "AGUSTINIANA Nº60", medidas: "", material: "Barro", pintada: false, precio: 136680, litros: null, peso_kg: null },
  { articulo: "NIDO DE PALOMA Nº24", medidas: "", material: "Barro", pintada: false, precio: 9150, litros: null, peso_kg: null },
  { articulo: "PAILA Nº35", medidas: "", material: "Barro", pintada: false, precio: 15670, litros: null, peso_kg: null },
  { articulo: "PAILA Nº48", medidas: "", material: "Barro", pintada: false, precio: 33680, litros: null, peso_kg: null },
  { articulo: "PAILA Nº62", medidas: "", material: "Barro", pintada: false, precio: 60130, litros: null, peso_kg: null },
  { articulo: "PIE DE MACETA Nº45", medidas: "", material: "Barro", pintada: false, precio: 1780, litros: null, peso_kg: null },
  { articulo: "PIE DE MACETA Nº90", medidas: "", material: "Barro", pintada: false, precio: 2340, litros: null, peso_kg: null },
  { articulo: "PLATO Nº 08", medidas: "", material: "Barro", pintada: false, precio: 1480, litros: null, peso_kg: null },
  { articulo: "PLATO Nº 10", medidas: "", material: "Barro", pintada: false, precio: 1600, litros: null, peso_kg: null },
  { articulo: "PLATO Nº 12", medidas: "", material: "Barro", pintada: false, precio: 1680, litros: null, peso_kg: null },
  { articulo: "PLATO Nº 14", medidas: "", material: "Barro", pintada: false, precio: 2070, litros: null, peso_kg: null },
  { articulo: "PLATO Nº 16", medidas: "", material: "Barro", pintada: false, precio: 2690, litros: null, peso_kg: null },
  { articulo: "PLATO Nº 18", medidas: "", material: "Barro", pintada: false, precio: 3300, litros: null, peso_kg: null },
  { articulo: "PLATO Nº 20", medidas: "", material: "Barro", pintada: false, precio: 4070, litros: null, peso_kg: null },
  { articulo: "PLATO Nº 22", medidas: "", material: "Barro", pintada: false, precio: 6300, litros: null, peso_kg: null },
  { articulo: "PLATO Nº 24", medidas: "", material: "Barro", pintada: false, precio: 8290, litros: null, peso_kg: null },
  { articulo: "PLATO Nº 26", medidas: "", material: "Barro", pintada: false, precio: 10270, litros: null, peso_kg: null },
  { articulo: "PLATO Nº 28", medidas: "", material: "Barro", pintada: false, precio: 12410, litros: null, peso_kg: null },
  { articulo: "PLATO Nº 30", medidas: "", material: "Barro", pintada: false, precio: 15010, litros: null, peso_kg: null },
  { articulo: "PLATO Nº 35", medidas: "", material: "Barro", pintada: false, precio: 17570, litros: null, peso_kg: null },
  { articulo: "PLATO Nº 40", medidas: "", material: "Barro", pintada: false, precio: 21270, litros: null, peso_kg: null },
  { articulo: "PLATO Nº 45", medidas: "", material: "Barro", pintada: false, precio: 29640, litros: null, peso_kg: null },
  { articulo: "PLATO Nº 52", medidas: "", material: "Barro", pintada: false, precio: 36760, litros: null, peso_kg: null },
  { articulo: "TERRINA Nº10", medidas: "", material: "Barro", pintada: false, precio: 2560, litros: null, peso_kg: null },
  { articulo: "TERRINA Nº12", medidas: "", material: "Barro", pintada: false, precio: 2870, litros: null, peso_kg: null },
  { articulo: "TERRINA Nº14", medidas: "", material: "Barro", pintada: false, precio: 3090, litros: null, peso_kg: null },
  { articulo: "TERRINA Nº22", medidas: "", material: "Barro", pintada: false, precio: 7650, litros: null, peso_kg: null },
  { articulo: "TERRINA Nº24", medidas: "", material: "Barro", pintada: false, precio: 10040, litros: null, peso_kg: null },
  { articulo: "TERRINA Nº27", medidas: "", material: "Barro", pintada: false, precio: 14800, litros: null, peso_kg: null },
  { articulo: "MAC. COMUN N*6", medidas: "", material: "Barro", pintada: false, precio: 1240, litros: null, peso_kg: null },
  { articulo: "MAC. PREMIUM N22", medidas: "", material: "Barro", pintada: false, precio: 7970, litros: null, peso_kg: null },
  { articulo: "BOMBA Nº30", medidas: "", material: "Barro", pintada: false, precio: 29990, litros: null, peso_kg: null },
  { articulo: "MAC. COMUN Nº 10 PINTADA", medidas: "", material: "Barro", pintada: true, precio: 3560, litros: null, peso_kg: null },
  { articulo: "MAC. COMUN Nº 12 PINTADA", medidas: "", material: "Barro", pintada: true, precio: 4150, litros: null, peso_kg: null },
  { articulo: "MAC. COMUN Nº 22 PINTADA", medidas: "", material: "Barro", pintada: true, precio: 14050, litros: null, peso_kg: null },
  { articulo: "MAC. COMUN Nº 08 PINTADA", medidas: "", material: "Barro", pintada: true, precio: 2990, litros: null, peso_kg: null },
  { articulo: "ICONO Nº 8", medidas: "", material: "Barro", pintada: false, precio: 1600, litros: null, peso_kg: null },
  { articulo: "ICONO Nº 10", medidas: "", material: "Barro", pintada: false, precio: 1650, litros: null, peso_kg: null },
  { articulo: "ICONO Nº 8  PINTADA", medidas: "", material: "Barro", pintada: true, precio: 2850, litros: null, peso_kg: null },
  { articulo: "ICONO Nº 10  PINTADA", medidas: "", material: "Barro", pintada: true, precio: 3390, litros: null, peso_kg: null },

  // BARRO ARTESANAL — CACHARROS
  { articulo: "Nº3 (*) 20CM", medidas: "", material: "Barro Artesanal", pintada: false, precio: 14950, litros: null, peso_kg: null },
  { articulo: "MATERON GIGANTE 10CM", medidas: "", material: "Barro Artesanal", pintada: false, precio: 4370, litros: null, peso_kg: null },
  { articulo: "Nº1  (*) 16CM BOCA", medidas: "", material: "Barro Artesanal", pintada: false, precio: 7240, litros: null, peso_kg: null },
  { articulo: "TIRAS *1 DOC. DEDAL 2CM", medidas: "", material: "Barro Artesanal", pintada: false, precio: 13800, litros: null, peso_kg: null },
  { articulo: "PREMIUM N22", medidas: "", material: "Barro Artesanal", pintada: false, precio: 12190, litros: null, peso_kg: null },
  { articulo: "PREMIUM N18", medidas: "", material: "Barro Artesanal", pintada: false, precio: 9090, litros: null, peso_kg: null },
  { articulo: "1/2 PARED", medidas: "", material: "Barro Artesanal", pintada: false, precio: 13800, litros: null, peso_kg: null },
  { articulo: "BANDEJA OVAL GRANDE 30CM", medidas: "", material: "Barro Artesanal", pintada: false, precio: 22730, litros: null, peso_kg: null },
  { articulo: "TIRAS *1 DOC. SARTA 5CM", medidas: "", material: "Barro Artesanal", pintada: false, precio: 18400, litros: null, peso_kg: null },
  { articulo: "OLLA CHICA CUADRADA Y REDONDA OFERTA", medidas: "", material: "Barro Artesanal", pintada: false, precio: 22730, litros: null, peso_kg: null },
  { articulo: "OLLA MEDIANA REDONDA OFERTA", medidas: "", material: "Barro Artesanal", pintada: false, precio: 30300, litros: null, peso_kg: null },
  { articulo: "OLLA EXTRA GRANDE OFERTA", medidas: "", material: "Barro Artesanal", pintada: false, precio: 41400, litros: null, peso_kg: null },
  { articulo: "SARTEN C/TAPA OFERTA", medidas: "", material: "Barro Artesanal", pintada: false, precio: 30300, litros: null, peso_kg: null },
  { articulo: "PAVA OFERTA", medidas: "", material: "Barro Artesanal", pintada: false, precio: 20700, litros: null, peso_kg: null },
  { articulo: "CASUELA REDONDA 16CM X 7CM ALTO", medidas: "", material: "Barro Artesanal", pintada: false, precio: 9660, litros: null, peso_kg: null },
  { articulo: "CASUELA REDONDO 14CM X 5CM ALTO", medidas: "", material: "Barro Artesanal", pintada: false, precio: 9660, litros: null, peso_kg: null },
  { articulo: "VOLCADO 2  26CM BOCA", medidas: "", material: "Barro Artesanal", pintada: false, precio: 29320, litros: null, peso_kg: null },
  { articulo: "VOLCADO GIGANTE SUPER 40CM BOCA", medidas: "", material: "Barro Artesanal", pintada: false, precio: 75900, litros: null, peso_kg: null },
  { articulo: "MATERA EXTRA GRANDE NUEVA 13CM BOCA", medidas: "", material: "Barro Artesanal", pintada: false, precio: 6040, litros: null, peso_kg: null },
  { articulo: "CHANCHITOS CH.", medidas: "", material: "Barro Artesanal", pintada: false, precio: 10100, litros: null, peso_kg: null },
  { articulo: "CHANCHITOS GRANDE", medidas: "", material: "Barro Artesanal", pintada: false, precio: 14140, litros: null, peso_kg: null },
  { articulo: "TIRAS *1 DOC. OJAL 3CM", medidas: "", material: "Barro Artesanal", pintada: false, precio: 20700, litros: null, peso_kg: null },
  { articulo: "MATERA SARTA 8CM BOCA 6CM ALTO", medidas: "", material: "Barro Artesanal", pintada: false, precio: 2420, litros: null, peso_kg: null },
  { articulo: "N4 30CM BOCA C/MANIJA", medidas: "", material: "Barro Artesanal", pintada: false, precio: 37260, litros: null, peso_kg: null },
  { articulo: "JARRAS GRANDE 24CM", medidas: "", material: "Barro Artesanal", pintada: false, precio: 11110, litros: null, peso_kg: null },
  { articulo: "BANDEJA OVAL CHICA 18CM X 6CM ALTO", medidas: "", material: "Barro Artesanal", pintada: false, precio: 12070, litros: null, peso_kg: null },
  { articulo: "MATERA MEDIANA 6CM", medidas: "", material: "Barro Artesanal", pintada: false, precio: 1440, litros: null, peso_kg: null },
  { articulo: "JARRA CHICA", medidas: "", material: "Barro Artesanal", pintada: false, precio: 7580, litros: null, peso_kg: null },
  { articulo: "GIGANTE SUPER", medidas: "", material: "Barro Artesanal", pintada: false, precio: 29320, litros: null, peso_kg: null },
  { articulo: "VOLCADO 1 30CM BOCA", medidas: "", material: "Barro Artesanal", pintada: false, precio: 29320, litros: null, peso_kg: null },
  // FIBROCEMENTO PINTADO
  // Misionera
  { articulo: "Misionera", medidas: "20altx18bocx16bas", material: "Fibrocemento", pintada: true, precio: 9020, litros: null, peso_kg: null },
  { articulo: "Misionera", medidas: "28altx18bocx15bas", material: "Fibrocemento", pintada: true, precio: 19830, litros: null, peso_kg: null },
  { articulo: "Misionera", medidas: "38altx28bocx20bas", material: "Fibrocemento", pintada: true, precio: 31560, litros: null, peso_kg: null },
  { articulo: "Misionera", medidas: "50altx37bocx32bas", material: "Fibrocemento", pintada: true, precio: 38760, litros: null, peso_kg: null },
  { articulo: "Misionera", medidas: "63altx40bocx32bas", material: "Fibrocemento", pintada: true, precio: 58600, litros: null, peso_kg: null },
  { articulo: "Misionera", medidas: "67altx37bocx32bas", material: "Fibrocemento", pintada: true, precio: 56740, litros: null, peso_kg: null },
  { articulo: "Misionera", medidas: "90altx40bocx35bas", material: "Fibrocemento", pintada: true, precio: 95790, litros: null, peso_kg: null },
  { articulo: "Misionera", medidas: "80altx50bocx40bas", material: "Fibrocemento", pintada: true, precio: 101430, litros: null, peso_kg: null },
  // Misionera con Borde
  { articulo: "Misionera con Borde", medidas: "35CM", material: "Fibrocemento", pintada: true, precio: 31780, litros: null, peso_kg: null },
  { articulo: "Misionera con Borde", medidas: "45CM", material: "Fibrocemento", pintada: true, precio: 41660, litros: null, peso_kg: null },
  { articulo: "Misionera con Borde", medidas: "55CM", material: "Fibrocemento", pintada: true, precio: 75600, litros: null, peso_kg: null },
  // Salteña
  { articulo: "Salteña", medidas: "77altx65bocx32bas", material: "Fibrocemento", pintada: true, precio: 116060, litros: null, peso_kg: null },
  { articulo: "Salteña", medidas: "50altx65bocx32bas", material: "Fibrocemento", pintada: true, precio: 96840, litros: null, peso_kg: null },
  { articulo: "Salteña", medidas: "65altx50 bocx25 bas", material: "Fibrocemento", pintada: true, precio: 63240, litros: null, peso_kg: null },
  { articulo: "Salteña", medidas: "45altx40bocx20bas", material: "Fibrocemento", pintada: true, precio: 30990, litros: null, peso_kg: null },
  // Copa
  { articulo: "Copa", medidas: "70altx50bocx28bas", material: "Fibrocemento", pintada: true, precio: 98060, litros: null, peso_kg: null },
  { articulo: "Copa", medidas: "55altx45bocx28bas", material: "Fibrocemento", pintada: true, precio: 45080, litros: null, peso_kg: null },
  { articulo: "Copa", medidas: "40altx33bocx16bas", material: "Fibrocemento", pintada: true, precio: 22540, litros: null, peso_kg: null },
  // Bols
  { articulo: "Bols", medidas: "28altx55bocx27bas", material: "Fibrocemento", pintada: true, precio: 28840, litros: null, peso_kg: null },
  { articulo: "Bols", medidas: "30altx80bocx33bas", material: "Fibrocemento", pintada: true, precio: 46220, litros: null, peso_kg: null },
  // Cónica / Tradicional
  { articulo: "Cónica / Tradicional", medidas: "30altx30bocx18bas", material: "Fibrocemento", pintada: true, precio: 16900, litros: null, peso_kg: null },
  { articulo: "Cónica / Tradicional", medidas: "40altx40bocx25bas", material: "Fibrocemento", pintada: true, precio: 30990, litros: null, peso_kg: null },
  { articulo: "Cónica / Tradicional", medidas: "50altx50bocx29bas", material: "Fibrocemento", pintada: true, precio: 36630, litros: null, peso_kg: null },
  { articulo: "Cónica / Tradicional", medidas: "60altx60bocx36bas", material: "Fibrocemento", pintada: true, precio: 50720, litros: null, peso_kg: null },
  { articulo: "Cónica / Tradicional", medidas: "70altx70bocx44bas", material: "Fibrocemento", pintada: true, precio: 76500, litros: null, peso_kg: null },
  // Andina
  { articulo: "Andina", medidas: "35altx40bocx26bas", material: "Fibrocemento", pintada: true, precio: 32400, litros: null, peso_kg: null },
  { articulo: "Andina", medidas: "43altx50bocx33bas", material: "Fibrocemento", pintada: true, precio: 43200, litros: null, peso_kg: null },
  { articulo: "Andina", medidas: "55altx65bocx43bas", material: "Fibrocemento", pintada: true, precio: 77130, litros: null, peso_kg: null },
  { articulo: "Andina", medidas: "69altx80bocx53bas", material: "Fibrocemento", pintada: true, precio: 158610, litros: null, peso_kg: null },
  // Cilindro
  { articulo: "Cilindro", medidas: "30altx30bocx30bas", material: "Fibrocemento", pintada: true, precio: 14430, litros: null, peso_kg: null },
  { articulo: "Cilindro", medidas: "50altx30bocx30bas", material: "Fibrocemento", pintada: true, precio: 21680, litros: null, peso_kg: null },
  { articulo: "Cilindro", medidas: "45altx45bocx45bas", material: "Fibrocemento", pintada: true, precio: 29760, litros: null, peso_kg: null },
  { articulo: "Cilindro", medidas: "45altx40bocx45bas", material: "Fibrocemento", pintada: true, precio: 67620, litros: null, peso_kg: null },
  { articulo: "Cilindro", medidas: "52altx52bocx52bas", material: "Fibrocemento", pintada: true, precio: 36060, litros: null, peso_kg: null },
  { articulo: "Cilindro", medidas: "60altx60bocx60bas", material: "Fibrocemento", pintada: true, precio: 67620, litros: null, peso_kg: null },
  // Cono
  { articulo: "Cono", medidas: "100altx45bocx30bas", material: "Fibrocemento", pintada: true, precio: 63120, litros: null, peso_kg: null },
  { articulo: "Cono", medidas: "80altx40bocx30bas", material: "Fibrocemento", pintada: true, precio: 40580, litros: null, peso_kg: null },
  { articulo: "Cono", medidas: "60altx38bocx30bas", material: "Fibrocemento", pintada: true, precio: 31560, litros: null, peso_kg: null },
  // Cono Moderno
  { articulo: "Cono Moderno", medidas: "40altx31bocx22bas", material: "Fibrocemento", pintada: true, precio: 22540, litros: null, peso_kg: null },
  { articulo: "Cono Moderno", medidas: "55altx36bocx24bas", material: "Fibrocemento", pintada: true, precio: 29310, litros: null, peso_kg: null },
  { articulo: "Cono Moderno", medidas: "70altx46bocx24bas", material: "Fibrocemento", pintada: true, precio: 39450, litros: null, peso_kg: null },
  { articulo: "Cono Moderno", medidas: "80altx46bocx28bas", material: "Fibrocemento", pintada: true, precio: 51750, litros: null, peso_kg: null },
  // Cubo
  { articulo: "Cubo", medidas: "15altx15bocx15bas", material: "Fibrocemento", pintada: true, precio: 6760, litros: null, peso_kg: null },
  { articulo: "Cubo", medidas: "20altx20bocx20bas", material: "Fibrocemento", pintada: true, precio: 8460, litros: null, peso_kg: null },
  { articulo: "Cubo", medidas: "25altx25bocx25bas", material: "Fibrocemento", pintada: true, precio: 12390, litros: null, peso_kg: null },
  { articulo: "Cubo", medidas: "30altx30bocx30bas", material: "Fibrocemento", pintada: true, precio: 16900, litros: null, peso_kg: null },
  { articulo: "Cubo", medidas: "35altx35bocx35bas", material: "Fibrocemento", pintada: true, precio: 21420, litros: null, peso_kg: null },
  { articulo: "Cubo", medidas: "40altx40bocx40bas", material: "Fibrocemento", pintada: true, precio: 25360, litros: null, peso_kg: null },
  { articulo: "Cubo", medidas: "45altx45bocx45bas", material: "Fibrocemento", pintada: true, precio: 33810, litros: null, peso_kg: null },
  { articulo: "Cubo", medidas: "50altx50bocx50bas", material: "Fibrocemento", pintada: true, precio: 45080, litros: null, peso_kg: null },
  { articulo: "Cubo", medidas: "60altx60bocx60bas", material: "Fibrocemento", pintada: true, precio: 78880, litros: null, peso_kg: null },
  // Esfera
  { articulo: "Esfera", medidas: "20cm", material: "Fibrocemento", pintada: true, precio: 11260, litros: null, peso_kg: null },
  { articulo: "Esfera", medidas: "28cm", material: "Fibrocemento", pintada: true, precio: 15780, litros: null, peso_kg: null },
  { articulo: "Esfera", medidas: "40cm", material: "Fibrocemento", pintada: true, precio: 22540, litros: null, peso_kg: null },
  { articulo: "Esfera", medidas: "50cm", material: "Fibrocemento", pintada: true, precio: 45080, litros: null, peso_kg: null },
  // Jardinera
  { articulo: "Jardinera", medidas: "135lrgx50anchx45alt", material: "Fibrocemento", pintada: true, precio: 140880, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "125lrgx50anchx45alt", material: "Fibrocemento", pintada: true, precio: 123980, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "115lrgx50anchx45alt", material: "Fibrocemento", pintada: true, precio: 112700, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "100lrgx40anchx40alt", material: "Fibrocemento", pintada: true, precio: 67620, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "100lrgx35anchx40alt", material: "Fibrocemento", pintada: true, precio: 61980, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "100lrgx30anchx35alt", material: "Fibrocemento", pintada: true, precio: 50720, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "80lrgx35anchx40alt", material: "Fibrocemento", pintada: true, precio: 45080, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "80lrgx30anchx35alt", material: "Fibrocemento", pintada: true, precio: 39450, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "100lrgx20anchx40alt", material: "Fibrocemento", pintada: true, precio: 45080, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "100lrgx20anchx30alt", material: "Fibrocemento", pintada: true, precio: 36630, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "100lrgx30anchx30alt", material: "Fibrocemento", pintada: true, precio: 45080, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "100lrgx22anchx20alt", material: "Fibrocemento", pintada: true, precio: 33810, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "100lrgx13anchx15alt", material: "Fibrocemento", pintada: true, precio: 25360, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "80lrgx20anchx40alt", material: "Fibrocemento", pintada: true, precio: 39450, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "80lrgx20anchx30alt", material: "Fibrocemento", pintada: true, precio: 29860, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "80lrgx30anchx30alt", material: "Fibrocemento", pintada: true, precio: 39450, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "80lrgx22anchx20alt", material: "Fibrocemento", pintada: true, precio: 25920, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "80lrgx13anchx15alt", material: "Fibrocemento", pintada: true, precio: 18030, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "60lrgx20anchx40alt", material: "Fibrocemento", pintada: true, precio: 25920, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "60lrgx20anchx30alt", material: "Fibrocemento", pintada: true, precio: 24220, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "60lrgx30anchx30alt", material: "Fibrocemento", pintada: true, precio: 27620, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "60lrgx30anchx35alt", material: "Fibrocemento", pintada: true, precio: 29860, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "60lrgx22anchx20alt", material: "Fibrocemento", pintada: true, precio: 21420, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "60lrgx13anchx15alt", material: "Fibrocemento", pintada: true, precio: 14660, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "40lrgx13anchx15alt", material: "Fibrocemento", pintada: true, precio: 12390, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "60lrgx20anchx10alt", material: "Fibrocemento", pintada: true, precio: 12620, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "40lrgx20anchx10alt", material: "Fibrocemento", pintada: true, precio: 10710, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "40lrgx20anchx20alt", material: "Fibrocemento", pintada: true, precio: 12960, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "50lrgx20anchx20alt", material: "Fibrocemento", pintada: true, precio: 15210, litros: null, peso_kg: null },
  // Paila
  { articulo: "Paila", medidas: "33cm", material: "Fibrocemento", pintada: true, precio: 10820, litros: null, peso_kg: null },
  { articulo: "Paila", medidas: "48cm", material: "Fibrocemento", pintada: true, precio: 16230, litros: null, peso_kg: null },
  { articulo: "Paila", medidas: "60cm", material: "Fibrocemento", pintada: true, precio: 20730, litros: null, peso_kg: null },
  // Piramidal
  { articulo: "Piramidal", medidas: "120altx45bocx30bas", material: "Fibrocemento", pintada: true, precio: 112700, litros: null, peso_kg: null },
  { articulo: "Piramidal", medidas: "100altx40bocx30bas", material: "Fibrocemento", pintada: true, precio: 90160, litros: null, peso_kg: null },
  { articulo: "Piramidal", medidas: "80altx50bocx30bas", material: "Fibrocemento", pintada: true, precio: 67620, litros: null, peso_kg: null },
  { articulo: "Piramidal", medidas: "80altx40bocx30bas", material: "Fibrocemento", pintada: true, precio: 45080, litros: null, peso_kg: null },
  { articulo: "Piramidal", medidas: "80altx35bocx25bas", material: "Fibrocemento", pintada: true, precio: 39450, litros: null, peso_kg: null },
  { articulo: "Piramidal", medidas: "80altx30bocx20bas", material: "Fibrocemento", pintada: true, precio: 33810, litros: null, peso_kg: null },
  { articulo: "Piramidal", medidas: "70altx35bocx25bas", material: "Fibrocemento", pintada: true, precio: 33810, litros: null, peso_kg: null },
  { articulo: "Piramidal", medidas: "70altx30bocx20bas", material: "Fibrocemento", pintada: true, precio: 25220, litros: null, peso_kg: null },
  { articulo: "Piramidal", medidas: "60altx35bocx25bas", material: "Fibrocemento", pintada: true, precio: 25080, litros: null, peso_kg: null },
  { articulo: "Piramidal", medidas: "60altx30bocx22bas", material: "Fibrocemento", pintada: true, precio: 24220, litros: null, peso_kg: null },
  { articulo: "Piramidal", medidas: "50altx40bocx30bas", material: "Fibrocemento", pintada: true, precio: 23670, litros: null, peso_kg: null },
  { articulo: "Piramidal", medidas: "45altx45bocx30bas", material: "Fibrocemento", pintada: true, precio: 23670, litros: null, peso_kg: null },
  { articulo: "Piramidal", medidas: "45altx35bocx22bas", material: "Fibrocemento", pintada: true, precio: 20850, litros: null, peso_kg: null },
  { articulo: "Piramidal", medidas: "50altx25bocx18bas", material: "Fibrocemento", pintada: true, precio: 18600, litros: null, peso_kg: null },
  { articulo: "Piramidal", medidas: "50altx20bocx15bas", material: "Fibrocemento", pintada: true, precio: 14080, litros: null, peso_kg: null },
  { articulo: "Piramidal", medidas: "40altx25bocx18bas", material: "Fibrocemento", pintada: true, precio: 16900, litros: null, peso_kg: null },
  { articulo: "Piramidal", medidas: "40altx30bocx20bas", material: "Fibrocemento", pintada: true, precio: 18600, litros: null, peso_kg: null },
  { articulo: "Piramidal", medidas: "35altx35bocx16bas", material: "Fibrocemento", pintada: true, precio: 16900, litros: null, peso_kg: null },
  { articulo: "Piramidal", medidas: "30altx30bocx15bas", material: "Fibrocemento", pintada: true, precio: 10710, litros: null, peso_kg: null },
  { articulo: "Piramidal", medidas: "30altx25bocx15bas", material: "Fibrocemento", pintada: true, precio: 10140, litros: null, peso_kg: null },
  { articulo: "Piramidal", medidas: "25altx25bocx15bas", material: "Fibrocemento", pintada: true, precio: 9020, litros: null, peso_kg: null },
  { articulo: "Piramidal", medidas: "20altx20bocx15bas", material: "Fibrocemento", pintada: true, precio: 7890, litros: null, peso_kg: null },
  { articulo: "Piramidal", medidas: "15altx15bocx10bas", material: "Fibrocemento", pintada: true, precio: 4950, litros: null, peso_kg: null },
  { articulo: "Piramidal", medidas: "20altx15bocx10bas", material: "Fibrocemento", pintada: true, precio: 5420, litros: null, peso_kg: null },
  { articulo: "Piramidal", medidas: "30altx15bocx10bas", material: "Fibrocemento", pintada: true, precio: 6300, litros: null, peso_kg: null },
  { articulo: "Piramidal", medidas: "40altx15bocx10bas", material: "Fibrocemento", pintada: true, precio: 7650, litros: null, peso_kg: null },
  // Plato
  { articulo: "Plato", medidas: "20cm", material: "Fibrocemento", pintada: true, precio: 3940, litros: null, peso_kg: null },
  { articulo: "Plato", medidas: "30cm", material: "Fibrocemento", pintada: true, precio: 6760, litros: null, peso_kg: null },
  { articulo: "Plato", medidas: "40cm", material: "Fibrocemento", pintada: true, precio: 10710, litros: null, peso_kg: null },
  { articulo: "Plato", medidas: "45cm", material: "Fibrocemento", pintada: true, precio: 14660, litros: null, peso_kg: null },
  { articulo: "Plato", medidas: "50cm", material: "Fibrocemento", pintada: true, precio: 18030, litros: null, peso_kg: null },
  { articulo: "Plato", medidas: "20", material: "Fibrocemento", pintada: true, precio: 4110, litros: null, peso_kg: null },
  { articulo: "Plato", medidas: "25", material: "Fibrocemento", pintada: true, precio: 6160, litros: null, peso_kg: null },
  { articulo: "Plato", medidas: "30", material: "Fibrocemento", pintada: true, precio: 8220, litros: null, peso_kg: null },
  { articulo: "Plato", medidas: "35", material: "Fibrocemento", pintada: true, precio: 10260, litros: null, peso_kg: null },
  { articulo: "Plato", medidas: "40", material: "Fibrocemento", pintada: true, precio: 12320, litros: null, peso_kg: null },
  // Premium
  { articulo: "Premium", medidas: "20cmx22", material: "Fibrocemento", pintada: true, precio: 8620, litros: null, peso_kg: null },
  { articulo: "Premium", medidas: "24cmx27", material: "Fibrocemento", pintada: true, precio: 12930, litros: null, peso_kg: null },
  { articulo: "Premium", medidas: "30cmx35", material: "Fibrocemento", pintada: true, precio: 19830, litros: null, peso_kg: null },
  // Prisma
  { articulo: "Prisma", medidas: "80altx40bocx40bas", material: "Fibrocemento", pintada: true, precio: 62900, litros: null, peso_kg: null },
  { articulo: "Prisma", medidas: "60altx40bocx40bas", material: "Fibrocemento", pintada: true, precio: 34260, litros: null, peso_kg: null },
  { articulo: "Prisma", medidas: "50altx40bocx40bas", material: "Fibrocemento", pintada: true, precio: 31560, litros: null, peso_kg: null },
  { articulo: "Prisma", medidas: "80altx30bocx30bas", material: "Fibrocemento", pintada: true, precio: 32460, litros: null, peso_kg: null },
  { articulo: "Prisma", medidas: "60altx30bocx30bas", material: "Fibrocemento", pintada: true, precio: 28840, litros: null, peso_kg: null },
  { articulo: "Prisma", medidas: "50altx30bocx30bas", material: "Fibrocemento", pintada: true, precio: 25240, litros: null, peso_kg: null },
  { articulo: "Prisma", medidas: "40altx30bocx30bas", material: "Fibrocemento", pintada: true, precio: 16230, litros: null, peso_kg: null },
  { articulo: "Prisma", medidas: "80altx20bocx20bas", material: "Fibrocemento", pintada: true, precio: 21640, litros: null, peso_kg: null },
  { articulo: "Prisma", medidas: "60altx20bocx20bas", material: "Fibrocemento", pintada: true, precio: 15330, litros: null, peso_kg: null },
  { articulo: "Prisma", medidas: "50altx20bocx20bas", material: "Fibrocemento", pintada: true, precio: 14430, litros: null, peso_kg: null },
  { articulo: "Prisma", medidas: "40altx20bocx20bas", material: "Fibrocemento", pintada: true, precio: 10560, litros: null, peso_kg: null },
  { articulo: "Prisma", medidas: "30altx20bocx20bas", material: "Fibrocemento", pintada: true, precio: 8790, litros: null, peso_kg: null },
  { articulo: "Prisma", medidas: "60altx15bocx15bas", material: "Fibrocemento", pintada: true, precio: 14140, litros: null, peso_kg: null },
  { articulo: "Prisma", medidas: "40altx15bocx15bas", material: "Fibrocemento", pintada: true, precio: 9200, litros: null, peso_kg: null },
  { articulo: "Prisma", medidas: "30altx15bocx15bas", material: "Fibrocemento", pintada: true, precio: 5540, litros: null, peso_kg: null },
  { articulo: "Prisma", medidas: "20altx15bocx15bas", material: "Fibrocemento", pintada: true, precio: 4960, litros: null, peso_kg: null },
  { articulo: "Prisma", medidas: "80altx15bocx15bas", material: "Fibrocemento", pintada: true, precio: 16230, litros: null, peso_kg: null },
  // Sanjuanina
  { articulo: "Sanjuanina", medidas: "63altx39bocx33bas", material: "Fibrocemento", pintada: true, precio: 54090, litros: null, peso_kg: null },
  { articulo: "Sanjuanina", medidas: "53altx36bocx30bas", material: "Fibrocemento", pintada: true, precio: 45080, litros: null, peso_kg: null },
  // Tinaja
  { articulo: "Tinaja", medidas: "50cm", material: "Fibrocemento", pintada: true, precio: 36060, litros: null, peso_kg: null },
  { articulo: "Tinaja", medidas: "60cm", material: "Fibrocemento", pintada: true, precio: 40580, litros: null, peso_kg: null },
  { articulo: "Tinaja", medidas: "80cm", material: "Fibrocemento", pintada: true, precio: 126920, litros: null, peso_kg: null },
  // Vaso Antiguo
  { articulo: "Vaso Antiguo", medidas: "45altx40bocx35bas", material: "Fibrocemento", pintada: true, precio: 22540, litros: null, peso_kg: null },
  { articulo: "Vaso Antiguo", medidas: "55altx50bocx35bas", material: "Fibrocemento", pintada: true, precio: 39450, litros: null, peso_kg: null },
  // Ánfora
  { articulo: "Ánfora", medidas: "75cm de alto", material: "Fibrocemento", pintada: true, precio: 79050, litros: null, peso_kg: null },
  { articulo: "Ánfora", medidas: "90cm de alto", material: "Fibrocemento", pintada: true, precio: 112200, litros: null, peso_kg: null },
  // Grecia
  { articulo: "Grecia", medidas: "24 h x 32 Ø x 15 ba", material: "Fibrocemento", pintada: true, precio: 30600, litros: null, peso_kg: null },
  { articulo: "Grecia", medidas: "36 h x 44 Ø x 20 ba", material: "Fibrocemento", pintada: true, precio: 35700, litros: null, peso_kg: null },
  { articulo: "Grecia", medidas: "42 h x 55 Ø x 25 ba", material: "Fibrocemento", pintada: true, precio: 38760, litros: null, peso_kg: null },
  { articulo: "Jardinera Punta Triángulo", medidas: "115x50x45", material: "Fibrocemento", pintada: true, precio: 132600, litros: null, peso_kg: null },
  { articulo: "Maceta Esférica", medidas: "20Ø", material: "Fibrocemento", pintada: true, precio: 13260, litros: null, peso_kg: null },
  { articulo: "Maceta Esférica", medidas: "30Ø", material: "Fibrocemento", pintada: true, precio: 18570, litros: null, peso_kg: null },
  { articulo: "Maceta Esférica", medidas: "40Ø", material: "Fibrocemento", pintada: true, precio: 26520, litros: null, peso_kg: null },
  { articulo: "Maceta Esférica", medidas: "50Ø", material: "Fibrocemento", pintada: true, precio: 53040, litros: null, peso_kg: null },
  { articulo: "Misionera Recta", medidas: "40h x 35Ø x 40b", material: "Fibrocemento", pintada: true, precio: 39000, litros: null, peso_kg: null },
  { articulo: "Misionera Recta", medidas: "55h x 35Ø x 40b", material: "Fibrocemento", pintada: true, precio: 44000, litros: null, peso_kg: null },
  { articulo: "Misionera Recta", medidas: "70h x 35Ø x 40b", material: "Fibrocemento", pintada: true, precio: 59000, litros: null, peso_kg: null },
  // FIBROCEMENTO SIN PINTAR
  // Misionera
  { articulo: "Misionera", medidas: "20altx18bocx16bas", material: "Fibrocemento", pintada: false, precio: 6010, litros: null, peso_kg: null },
  { articulo: "Misionera", medidas: "28altx18bocx15bas", material: "Fibrocemento", pintada: false, precio: 13220, litros: null, peso_kg: null },
  { articulo: "Misionera", medidas: "38altx28bocx20bas", material: "Fibrocemento", pintada: false, precio: 21040, litros: null, peso_kg: null },
  { articulo: "Misionera", medidas: "50altx37bocx32bas", material: "Fibrocemento", pintada: false, precio: 25840, litros: null, peso_kg: null },
  { articulo: "Misionera", medidas: "63altx40bocx32bas", material: "Fibrocemento", pintada: false, precio: 39070, litros: null, peso_kg: null },
  { articulo: "Misionera", medidas: "67altx37bocx32bas", material: "Fibrocemento", pintada: false, precio: 37830, litros: null, peso_kg: null },
  { articulo: "Misionera", medidas: "90altx40bocx35bas", material: "Fibrocemento", pintada: false, precio: 63860, litros: null, peso_kg: null },
  { articulo: "Misionera", medidas: "80altx50bocx40bas", material: "Fibrocemento", pintada: false, precio: 67620, litros: null, peso_kg: null },
  // Misionera con Borde
  { articulo: "Misionera con Borde", medidas: "35CM", material: "Fibrocemento", pintada: false, precio: 21190, litros: null, peso_kg: null },
  { articulo: "Misionera con Borde", medidas: "45CM", material: "Fibrocemento", pintada: false, precio: 27770, litros: null, peso_kg: null },
  { articulo: "Misionera con Borde", medidas: "55CM", material: "Fibrocemento", pintada: false, precio: 50400, litros: null, peso_kg: null },
  // Salteña
  { articulo: "Salteña", medidas: "77altx65bocx32bas", material: "Fibrocemento", pintada: false, precio: 77370, litros: null, peso_kg: null },
  { articulo: "Salteña", medidas: "50altx65bocx32bas", material: "Fibrocemento", pintada: false, precio: 64560, litros: null, peso_kg: null },
  { articulo: "Salteña", medidas: "65altx50 bocx25 bas", material: "Fibrocemento", pintada: false, precio: 42160, litros: null, peso_kg: null },
  { articulo: "Salteña", medidas: "45altx40bocx20bas", material: "Fibrocemento", pintada: false, precio: 20660, litros: null, peso_kg: null },
  // Copa
  { articulo: "Copa", medidas: "70altx50bocx28bas", material: "Fibrocemento", pintada: false, precio: 65370, litros: null, peso_kg: null },
  { articulo: "Copa", medidas: "55altx45bocx28bas", material: "Fibrocemento", pintada: false, precio: 30050, litros: null, peso_kg: null },
  { articulo: "Copa", medidas: "40altx33bocx16bas", material: "Fibrocemento", pintada: false, precio: 15030, litros: null, peso_kg: null },
  // Bols
  { articulo: "Bols", medidas: "28altx55bocx27bas", material: "Fibrocemento", pintada: false, precio: 19230, litros: null, peso_kg: null },
  { articulo: "Bols", medidas: "30altx80bocx33bas", material: "Fibrocemento", pintada: false, precio: 30810, litros: null, peso_kg: null },
  // Cónica / Tradicional
  { articulo: "Cónica / Tradicional", medidas: "30altx30bocx18bas", material: "Fibrocemento", pintada: false, precio: 11270, litros: null, peso_kg: null },
  { articulo: "Cónica / Tradicional", medidas: "40altx40bocx25bas", material: "Fibrocemento", pintada: false, precio: 20660, litros: null, peso_kg: null },
  { articulo: "Cónica / Tradicional", medidas: "50altx50bocx29bas", material: "Fibrocemento", pintada: false, precio: 24420, litros: null, peso_kg: null },
  { articulo: "Cónica / Tradicional", medidas: "60altx60bocx36bas", material: "Fibrocemento", pintada: false, precio: 33810, litros: null, peso_kg: null },
  { articulo: "Cónica / Tradicional", medidas: "70altx70bocx44bas", material: "Fibrocemento", pintada: false, precio: 51000, litros: null, peso_kg: null },
  // Andina
  { articulo: "Andina", medidas: "35altx40bocx26bas", material: "Fibrocemento", pintada: false, precio: 21600, litros: null, peso_kg: null },
  { articulo: "Andina", medidas: "43altx50bocx33bas", material: "Fibrocemento", pintada: false, precio: 28800, litros: null, peso_kg: null },
  { articulo: "Andina", medidas: "55altx65bocx43bas", material: "Fibrocemento", pintada: false, precio: 51420, litros: null, peso_kg: null },
  { articulo: "Andina", medidas: "69altx80bocx53bas", material: "Fibrocemento", pintada: false, precio: 105740, litros: null, peso_kg: null },
  // Cilindro
  { articulo: "Cilindro", medidas: "30altx30bocx30bas", material: "Fibrocemento", pintada: false, precio: 9620, litros: null, peso_kg: null },
  { articulo: "Cilindro", medidas: "50altx30bocx30bas", material: "Fibrocemento", pintada: false, precio: 14450, litros: null, peso_kg: null },
  { articulo: "Cilindro", medidas: "45altx45bocx45bas", material: "Fibrocemento", pintada: false, precio: 19840, litros: null, peso_kg: null },
  { articulo: "Cilindro", medidas: "45altx40bocx45bas", material: "Fibrocemento", pintada: false, precio: 45080, litros: null, peso_kg: null },
  { articulo: "Cilindro", medidas: "52altx52bocx52bas", material: "Fibrocemento", pintada: false, precio: 24040, litros: null, peso_kg: null },
  { articulo: "Cilindro", medidas: "60altx60bocx60bas", material: "Fibrocemento", pintada: false, precio: 45080, litros: null, peso_kg: null },
  // Cono
  { articulo: "Cono", medidas: "100altx45bocx30bas", material: "Fibrocemento", pintada: false, precio: 42080, litros: null, peso_kg: null },
  { articulo: "Cono", medidas: "80altx40bocx30bas", material: "Fibrocemento", pintada: false, precio: 27050, litros: null, peso_kg: null },
  { articulo: "Cono", medidas: "60altx38bocx30bas", material: "Fibrocemento", pintada: false, precio: 21040, litros: null, peso_kg: null },
  // Cono Moderno
  { articulo: "Cono Moderno", medidas: "40altx31bocx22bas", material: "Fibrocemento", pintada: false, precio: 15030, litros: null, peso_kg: null },
  { articulo: "Cono Moderno", medidas: "55altx36bocx24bas", material: "Fibrocemento", pintada: false, precio: 19540, litros: null, peso_kg: null },
  { articulo: "Cono Moderno", medidas: "70altx46bocx24bas", material: "Fibrocemento", pintada: false, precio: 26300, litros: null, peso_kg: null },
  { articulo: "Cono Moderno", medidas: "80altx46bocx28bas", material: "Fibrocemento", pintada: false, precio: 34500, litros: null, peso_kg: null },
  // Cubo
  { articulo: "Cubo", medidas: "15altx15bocx15bas", material: "Fibrocemento", pintada: false, precio: 4510, litros: null, peso_kg: null },
  { articulo: "Cubo", medidas: "20altx20bocx20bas", material: "Fibrocemento", pintada: false, precio: 5640, litros: null, peso_kg: null },
  { articulo: "Cubo", medidas: "25altx25bocx25bas", material: "Fibrocemento", pintada: false, precio: 8260, litros: null, peso_kg: null },
  { articulo: "Cubo", medidas: "30altx30bocx30bas", material: "Fibrocemento", pintada: false, precio: 11270, litros: null, peso_kg: null },
  { articulo: "Cubo", medidas: "35altx35bocx35bas", material: "Fibrocemento", pintada: false, precio: 14280, litros: null, peso_kg: null },
  { articulo: "Cubo", medidas: "40altx40bocx40bas", material: "Fibrocemento", pintada: false, precio: 16910, litros: null, peso_kg: null },
  { articulo: "Cubo", medidas: "45altx45bocx45bas", material: "Fibrocemento", pintada: false, precio: 22540, litros: null, peso_kg: null },
  { articulo: "Cubo", medidas: "50altx50bocx50bas", material: "Fibrocemento", pintada: false, precio: 30050, litros: null, peso_kg: null },
  { articulo: "Cubo", medidas: "60altx60bocx60bas", material: "Fibrocemento", pintada: false, precio: 52590, litros: null, peso_kg: null },
  // Esfera
  { articulo: "Esfera", medidas: "20cm", material: "Fibrocemento", pintada: false, precio: 7510, litros: null, peso_kg: null },
  { articulo: "Esfera", medidas: "28cm", material: "Fibrocemento", pintada: false, precio: 10520, litros: null, peso_kg: null },
  { articulo: "Esfera", medidas: "40cm", material: "Fibrocemento", pintada: false, precio: 15030, litros: null, peso_kg: null },
  { articulo: "Esfera", medidas: "50cm", material: "Fibrocemento", pintada: false, precio: 30050, litros: null, peso_kg: null },
  // Jardinera
  { articulo: "Jardinera", medidas: "135lrgx50anchx45alt", material: "Fibrocemento", pintada: false, precio: 93920, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "125lrgx50anchx45alt", material: "Fibrocemento", pintada: false, precio: 82650, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "115lrgx50anchx45alt", material: "Fibrocemento", pintada: false, precio: 75130, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "100lrgx40anchx40alt", material: "Fibrocemento", pintada: false, precio: 45080, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "100lrgx35anchx40alt", material: "Fibrocemento", pintada: false, precio: 41320, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "100lrgx30anchx35alt", material: "Fibrocemento", pintada: false, precio: 33810, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "80lrgx35anchx40alt", material: "Fibrocemento", pintada: false, precio: 30050, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "80lrgx30anchx35alt", material: "Fibrocemento", pintada: false, precio: 26300, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "100lrgx20anchx40alt", material: "Fibrocemento", pintada: false, precio: 30050, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "100lrgx20anchx30alt", material: "Fibrocemento", pintada: false, precio: 24420, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "100lrgx30anchx30alt", material: "Fibrocemento", pintada: false, precio: 30050, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "100lrgx22anchx20alt", material: "Fibrocemento", pintada: false, precio: 22540, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "100lrgx13anchx15alt", material: "Fibrocemento", pintada: false, precio: 16910, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "80lrgx20anchx40alt", material: "Fibrocemento", pintada: false, precio: 26300, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "80lrgx20anchx30alt", material: "Fibrocemento", pintada: false, precio: 19910, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "80lrgx30anchx30alt", material: "Fibrocemento", pintada: false, precio: 26300, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "80lrgx22anchx20alt", material: "Fibrocemento", pintada: false, precio: 17280, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "80lrgx13anchx15alt", material: "Fibrocemento", pintada: false, precio: 12020, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "60lrgx20anchx40alt", material: "Fibrocemento", pintada: false, precio: 17280, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "60lrgx20anchx30alt", material: "Fibrocemento", pintada: false, precio: 16150, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "60lrgx30anchx30alt", material: "Fibrocemento", pintada: false, precio: 18410, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "60lrgx30anchx35alt", material: "Fibrocemento", pintada: false, precio: 19910, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "60lrgx22anchx20alt", material: "Fibrocemento", pintada: false, precio: 14280, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "60lrgx13anchx15alt", material: "Fibrocemento", pintada: false, precio: 9770, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "40lrgx13anchx15alt", material: "Fibrocemento", pintada: false, precio: 8260, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "60lrgx20anchx10alt", material: "Fibrocemento", pintada: false, precio: 8410, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "40lrgx20anchx10alt", material: "Fibrocemento", pintada: false, precio: 7140, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "40lrgx20anchx20alt", material: "Fibrocemento", pintada: false, precio: 8640, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "50lrgx20anchx20alt", material: "Fibrocemento", pintada: false, precio: 10140, litros: null, peso_kg: null },
  // Paila
  { articulo: "Paila", medidas: "33cm", material: "Fibrocemento", pintada: false, precio: 7210, litros: null, peso_kg: null },
  { articulo: "Paila", medidas: "48cm", material: "Fibrocemento", pintada: false, precio: 10820, litros: null, peso_kg: null },
  { articulo: "Paila", medidas: "60cm", material: "Fibrocemento", pintada: false, precio: 13820, litros: null, peso_kg: null },
  // Piramidal
  { articulo: "Piramidal", medidas: "120altx45bocx30bas", material: "Fibrocemento", pintada: false, precio: 75130, litros: null, peso_kg: null },
  { articulo: "Piramidal", medidas: "100altx40bocx30bas", material: "Fibrocemento", pintada: false, precio: 60110, litros: null, peso_kg: null },
  { articulo: "Piramidal", medidas: "80altx50bocx30bas", material: "Fibrocemento", pintada: false, precio: 45080, litros: null, peso_kg: null },
  { articulo: "Piramidal", medidas: "80altx40bocx30bas", material: "Fibrocemento", pintada: false, precio: 30050, litros: null, peso_kg: null },
  { articulo: "Piramidal", medidas: "80altx35bocx25bas", material: "Fibrocemento", pintada: false, precio: 26300, litros: null, peso_kg: null },
  { articulo: "Piramidal", medidas: "80altx30bocx20bas", material: "Fibrocemento", pintada: false, precio: 22540, litros: null, peso_kg: null },
  { articulo: "Piramidal", medidas: "70altx35bocx25bas", material: "Fibrocemento", pintada: false, precio: 22540, litros: null, peso_kg: null },
  { articulo: "Piramidal", medidas: "70altx30bocx20bas", material: "Fibrocemento", pintada: false, precio: 16810, litros: null, peso_kg: null },
  { articulo: "Piramidal", medidas: "60altx35bocx25bas", material: "Fibrocemento", pintada: false, precio: 16720, litros: null, peso_kg: null },
  { articulo: "Piramidal", medidas: "60altx30bocx22bas", material: "Fibrocemento", pintada: false, precio: 16150, litros: null, peso_kg: null },
  { articulo: "Piramidal", medidas: "50altx40bocx30bas", material: "Fibrocemento", pintada: false, precio: 15780, litros: null, peso_kg: null },
  { articulo: "Piramidal", medidas: "45altx45bocx30bas", material: "Fibrocemento", pintada: false, precio: 15780, litros: null, peso_kg: null },
  { articulo: "Piramidal", medidas: "45altx35bocx22bas", material: "Fibrocemento", pintada: false, precio: 13900, litros: null, peso_kg: null },
  { articulo: "Piramidal", medidas: "50altx25bocx18bas", material: "Fibrocemento", pintada: false, precio: 12400, litros: null, peso_kg: null },
  { articulo: "Piramidal", medidas: "50altx20bocx15bas", material: "Fibrocemento", pintada: false, precio: 9390, litros: null, peso_kg: null },
  { articulo: "Piramidal", medidas: "40altx25bocx18bas", material: "Fibrocemento", pintada: false, precio: 11270, litros: null, peso_kg: null },
  { articulo: "Piramidal", medidas: "40altx30bocx20bas", material: "Fibrocemento", pintada: false, precio: 12400, litros: null, peso_kg: null },
  { articulo: "Piramidal", medidas: "35altx35bocx16bas", material: "Fibrocemento", pintada: false, precio: 11270, litros: null, peso_kg: null },
  { articulo: "Piramidal", medidas: "30altx30bocx15bas", material: "Fibrocemento", pintada: false, precio: 7140, litros: null, peso_kg: null },
  { articulo: "Piramidal", medidas: "30altx25bocx15bas", material: "Fibrocemento", pintada: false, precio: 6760, litros: null, peso_kg: null },
  { articulo: "Piramidal", medidas: "25altx25bocx15bas", material: "Fibrocemento", pintada: false, precio: 6010, litros: null, peso_kg: null },
  { articulo: "Piramidal", medidas: "20altx20bocx15bas", material: "Fibrocemento", pintada: false, precio: 5260, litros: null, peso_kg: null },
  { articulo: "Piramidal", medidas: "15altx15bocx10bas", material: "Fibrocemento", pintada: false, precio: 3300, litros: null, peso_kg: null },
  { articulo: "Piramidal", medidas: "20altx15bocx10bas", material: "Fibrocemento", pintada: false, precio: 3610, litros: null, peso_kg: null },
  { articulo: "Piramidal", medidas: "30altx15bocx10bas", material: "Fibrocemento", pintada: false, precio: 4200, litros: null, peso_kg: null },
  { articulo: "Piramidal", medidas: "40altx15bocx10bas", material: "Fibrocemento", pintada: false, precio: 5100, litros: null, peso_kg: null },
  // Plato
  { articulo: "Plato", medidas: "20cm", material: "Fibrocemento", pintada: false, precio: 2630, litros: null, peso_kg: null },
  { articulo: "Plato", medidas: "30cm", material: "Fibrocemento", pintada: false, precio: 4510, litros: null, peso_kg: null },
  { articulo: "Plato", medidas: "40cm", material: "Fibrocemento", pintada: false, precio: 7140, litros: null, peso_kg: null },
  { articulo: "Plato", medidas: "45cm", material: "Fibrocemento", pintada: false, precio: 9770, litros: null, peso_kg: null },
  { articulo: "Plato", medidas: "50cm", material: "Fibrocemento", pintada: false, precio: 12020, litros: null, peso_kg: null },
  { articulo: "Plato", medidas: "20", material: "Fibrocemento", pintada: false, precio: 2740, litros: null, peso_kg: null },
  { articulo: "Plato", medidas: "25", material: "Fibrocemento", pintada: false, precio: 4110, litros: null, peso_kg: null },
  { articulo: "Plato", medidas: "30", material: "Fibrocemento", pintada: false, precio: 5480, litros: null, peso_kg: null },
  { articulo: "Plato", medidas: "35", material: "Fibrocemento", pintada: false, precio: 6840, litros: null, peso_kg: null },
  { articulo: "Plato", medidas: "40", material: "Fibrocemento", pintada: false, precio: 8210, litros: null, peso_kg: null },
  // Premium
  { articulo: "Premium", medidas: "20cmx22", material: "Fibrocemento", pintada: false, precio: 5750, litros: null, peso_kg: null },
  { articulo: "Premium", medidas: "24cmx27", material: "Fibrocemento", pintada: false, precio: 8620, litros: null, peso_kg: null },
  { articulo: "Premium", medidas: "30cmx35", material: "Fibrocemento", pintada: false, precio: 13220, litros: null, peso_kg: null },
  // Prisma
  { articulo: "Prisma", medidas: "80altx40bocx40bas", material: "Fibrocemento", pintada: false, precio: 41930, litros: null, peso_kg: null },
  { articulo: "Prisma", medidas: "60altx40bocx40bas", material: "Fibrocemento", pintada: false, precio: 22840, litros: null, peso_kg: null },
  { articulo: "Prisma", medidas: "50altx40bocx40bas", material: "Fibrocemento", pintada: false, precio: 21040, litros: null, peso_kg: null },
  { articulo: "Prisma", medidas: "80altx30bocx30bas", material: "Fibrocemento", pintada: false, precio: 21640, litros: null, peso_kg: null },
  { articulo: "Prisma", medidas: "60altx30bocx30bas", material: "Fibrocemento", pintada: false, precio: 19230, litros: null, peso_kg: null },
  { articulo: "Prisma", medidas: "50altx30bocx30bas", material: "Fibrocemento", pintada: false, precio: 16830, litros: null, peso_kg: null },
  { articulo: "Prisma", medidas: "40altx30bocx30bas", material: "Fibrocemento", pintada: false, precio: 10820, litros: null, peso_kg: null },
  { articulo: "Prisma", medidas: "80altx20bocx20bas", material: "Fibrocemento", pintada: false, precio: 14430, litros: null, peso_kg: null },
  { articulo: "Prisma", medidas: "60altx20bocx20bas", material: "Fibrocemento", pintada: false, precio: 10220, litros: null, peso_kg: null },
  { articulo: "Prisma", medidas: "50altx20bocx20bas", material: "Fibrocemento", pintada: false, precio: 9620, litros: null, peso_kg: null },
  { articulo: "Prisma", medidas: "40altx20bocx20bas", material: "Fibrocemento", pintada: false, precio: 7040, litros: null, peso_kg: null },
  { articulo: "Prisma", medidas: "30altx20bocx20bas", material: "Fibrocemento", pintada: false, precio: 5860, litros: null, peso_kg: null },
  { articulo: "Prisma", medidas: "60altx15bocx15bas", material: "Fibrocemento", pintada: false, precio: 9430, litros: null, peso_kg: null },
  { articulo: "Prisma", medidas: "40altx15bocx15bas", material: "Fibrocemento", pintada: false, precio: 6130, litros: null, peso_kg: null },
  { articulo: "Prisma", medidas: "30altx15bocx15bas", material: "Fibrocemento", pintada: false, precio: 3690, litros: null, peso_kg: null },
  { articulo: "Prisma", medidas: "20altx15bocx15bas", material: "Fibrocemento", pintada: false, precio: 3310, litros: null, peso_kg: null },
  { articulo: "Prisma", medidas: "80altx15bocx15bas", material: "Fibrocemento", pintada: false, precio: 10820, litros: null, peso_kg: null },
  // Sanjuanina
  { articulo: "Sanjuanina", medidas: "63altx39bocx33bas", material: "Fibrocemento", pintada: false, precio: 36060, litros: null, peso_kg: null },
  { articulo: "Sanjuanina", medidas: "53altx36bocx30bas", material: "Fibrocemento", pintada: false, precio: 30050, litros: null, peso_kg: null },
  // Tinaja
  { articulo: "Tinaja", medidas: "50cm", material: "Fibrocemento", pintada: false, precio: 24040, litros: null, peso_kg: null },
  { articulo: "Tinaja", medidas: "60cm", material: "Fibrocemento", pintada: false, precio: 27050, litros: null, peso_kg: null },
  { articulo: "Tinaja", medidas: "80cm", material: "Fibrocemento", pintada: false, precio: 84610, litros: null, peso_kg: null },
  // Vaso Antiguo
  { articulo: "Vaso Antiguo", medidas: "45altx40bocx35bas", material: "Fibrocemento", pintada: false, precio: 15030, litros: null, peso_kg: null },
  { articulo: "Vaso Antiguo", medidas: "55altx50bocx35bas", material: "Fibrocemento", pintada: false, precio: 26300, litros: null, peso_kg: null },
  // Ánfora
  { articulo: "Ánfora", medidas: "75cm de alto", material: "Fibrocemento", pintada: false, precio: 52700, litros: null, peso_kg: null },
  { articulo: "Ánfora", medidas: "90cm de alto", material: "Fibrocemento", pintada: false, precio: 74800, litros: null, peso_kg: null },
  // Grecia
  { articulo: "Grecia", medidas: "24 h x 32 Ø x 15 ba", material: "Fibrocemento", pintada: false, precio: 20400, litros: null, peso_kg: null },
  { articulo: "Grecia", medidas: "36 h x 44 Ø x 20 ba", material: "Fibrocemento", pintada: false, precio: 23800, litros: null, peso_kg: null },
  { articulo: "Grecia", medidas: "42 h x 55 Ø x 25 ba", material: "Fibrocemento", pintada: false, precio: 25840, litros: null, peso_kg: null },
  { articulo: "Jardinera Punta Triángulo", medidas: "115x50x45", material: "Fibrocemento", pintada: false, precio: 119340, litros: null, peso_kg: null },
  { articulo: "Maceta Esférica", medidas: "20Ø", material: "Fibrocemento", pintada: false, precio: 11940, litros: null, peso_kg: null },
  { articulo: "Maceta Esférica", medidas: "30Ø", material: "Fibrocemento", pintada: false, precio: 16710, litros: null, peso_kg: null },
  { articulo: "Maceta Esférica", medidas: "40Ø", material: "Fibrocemento", pintada: false, precio: 23870, litros: null, peso_kg: null },
  { articulo: "Maceta Esférica", medidas: "50Ø", material: "Fibrocemento", pintada: false, precio: 47740, litros: null, peso_kg: null },
  { articulo: "Misionera Recta", medidas: "40h x 35Ø x 40b", material: "Fibrocemento", pintada: false, precio: 35100, litros: null, peso_kg: null },
  { articulo: "Misionera Recta", medidas: "55h x 35Ø x 40b", material: "Fibrocemento", pintada: false, precio: 39600, litros: null, peso_kg: null },
  { articulo: "Misionera Recta", medidas: "70h x 35Ø x 40b", material: "Fibrocemento", pintada: false, precio: 53100, litros: null, peso_kg: null },
  // ROTOMOLDEADO
  { articulo: "Misionera", medidas: "20h x 15Ø x 20b", material: "Rotomoldeado", pintada: true, precio: 10550, litros: null, peso_kg: null },
  { articulo: "Misionera", medidas: "30h x 23Ø x 28b", material: "Rotomoldeado", pintada: true, precio: 24220, litros: null, peso_kg: null },
  { articulo: "Misionera Lisa", medidas: "38h x 28Ø x 20b", material: "Rotomoldeado", pintada: true, precio: 44040, litros: null, peso_kg: null },
  { articulo: "Misionera Lisa", medidas: "50h x 37Ø x 32b", material: "Rotomoldeado", pintada: true, precio: 73880, litros: null, peso_kg: null },
  { articulo: "Misionera Lisa", medidas: "60h x 40Ø x 32b", material: "Rotomoldeado", pintada: true, precio: 113720, litros: null, peso_kg: null },
  { articulo: "Misionera Texturada", medidas: "20h x 15Ø x 18b", material: "Rotomoldeado", pintada: true, precio: 8100, litros: null, peso_kg: null },
  { articulo: "Misionera Texturada", medidas: "30h x 22Ø x 18b", material: "Rotomoldeado", pintada: true, precio: 25110, litros: null, peso_kg: null },
  { articulo: "Misionera Texturada", medidas: "40cm (29h x 22Ø x 18b)", material: "Rotomoldeado", pintada: true, precio: 42590, litros: null, peso_kg: null },
  { articulo: "Salteña con Pie", medidas: "25h x 20Ø x 20b (patas 10cm)", material: "Rotomoldeado", pintada: true, precio: 26500, litros: null, peso_kg: null },
  { articulo: "Cuenco", medidas: "32h x 30Ø x 32b", material: "Rotomoldeado", pintada: true, precio: 56860, litros: null, peso_kg: null },
  { articulo: "Cuenco", medidas: "48h x 46Ø x 46b", material: "Rotomoldeado", pintada: true, precio: 113720, litros: null, peso_kg: null },
  { articulo: "Gota", medidas: "40h x 35Ø x 40b", material: "Rotomoldeado", pintada: true, precio: 45450, litros: null, peso_kg: null },
  { articulo: "Gota", medidas: "55h x 35Ø x 40b", material: "Rotomoldeado", pintada: true, precio: 62570, litros: null, peso_kg: null },
  { articulo: "Gota", medidas: "70h x 35Ø x 40b", material: "Rotomoldeado", pintada: true, precio: 76780, litros: null, peso_kg: null },
  { articulo: "Copa", medidas: "40h x 33Ø x 16b", material: "Rotomoldeado", pintada: true, precio: 35270, litros: null, peso_kg: null },
  { articulo: "Copa", medidas: "55h x 47Ø x 28b", material: "Rotomoldeado", pintada: true, precio: 67560, litros: null, peso_kg: null },
  { articulo: "Copa", medidas: "70h x 60Ø x 28b", material: "Rotomoldeado", pintada: true, precio: 117470, litros: null, peso_kg: null },
  { articulo: "Plato Texturado", medidas: "20Ø", material: "Rotomoldeado", pintada: true, precio: 7770, litros: null, peso_kg: null },
  { articulo: "Plato Texturado", medidas: "30Ø", material: "Rotomoldeado", pintada: true, precio: 13310, litros: null, peso_kg: null },
  { articulo: "Plato Texturado", medidas: "40Ø", material: "Rotomoldeado", pintada: true, precio: 18850, litros: null, peso_kg: null },
  { articulo: "Cono Paris Texturado", medidas: "30h x 32Ø x 25b", material: "Rotomoldeado", pintada: true, precio: 42810, litros: null, peso_kg: null },
  { articulo: "Cono Paris Texturado", medidas: "44h x 34Ø x 24b", material: "Rotomoldeado", pintada: true, precio: 52790, litros: null, peso_kg: null },
  { articulo: "Cubo", medidas: "20x20x20", material: "Rotomoldeado", pintada: true, precio: 14540, litros: null, peso_kg: null },
  { articulo: "Cubo", medidas: "25x25x25", material: "Rotomoldeado", pintada: true, precio: 20110, litros: null, peso_kg: null },
  { articulo: "Cubo", medidas: "30x30x30", material: "Rotomoldeado", pintada: true, precio: 25920, litros: null, peso_kg: null },
  { articulo: "Cubo", medidas: "35x35x35", material: "Rotomoldeado", pintada: true, precio: 38120, litros: null, peso_kg: null },
  { articulo: "Cubo", medidas: "40x40x40", material: "Rotomoldeado", pintada: true, precio: 56060, litros: null, peso_kg: null },
  { articulo: "Cubo", medidas: "50x50x50", material: "Rotomoldeado", pintada: true, precio: 96280, litros: null, peso_kg: null },
  { articulo: "Piramidal", medidas: "40h x 25bo x 22b", material: "Rotomoldeado", pintada: true, precio: 25000, litros: null, peso_kg: null },
  { articulo: "Piramidal", medidas: "50h x 25bo x 22b", material: "Rotomoldeado", pintada: true, precio: 30660, litros: null, peso_kg: null },
  { articulo: "Piramidal", medidas: "60h x 30bo x 25b", material: "Rotomoldeado", pintada: true, precio: 44360, litros: null, peso_kg: null },
  { articulo: "Piramidal", medidas: "70h x 35bo x 30b", material: "Rotomoldeado", pintada: true, precio: 58880, litros: null, peso_kg: null },
  { articulo: "Cono 50", medidas: "50cm alto", material: "Rotomoldeado", pintada: true, precio: 32870, litros: null, peso_kg: null },
  { articulo: "Cono 80", medidas: "80cm alto", material: "Rotomoldeado", pintada: true, precio: 61500, litros: null, peso_kg: null },
  { articulo: "Cilindro", medidas: "30x30", material: "Rotomoldeado", pintada: true, precio: 22640, litros: null, peso_kg: null },
  { articulo: "Cilindro", medidas: "40x30", material: "Rotomoldeado", pintada: true, precio: 32340, litros: null, peso_kg: null },
  { articulo: "Cilindro", medidas: "40x40", material: "Rotomoldeado", pintada: true, precio: 51620, litros: null, peso_kg: null },
  { articulo: "Cilindro", medidas: "50x30", material: "Rotomoldeado", pintada: true, precio: 35800, litros: null, peso_kg: null },
  { articulo: "Cilindro", medidas: "50x50", material: "Rotomoldeado", pintada: true, precio: 77030, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "60x20x20", material: "Rotomoldeado", pintada: true, precio: 33570, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "60x20x30", material: "Rotomoldeado", pintada: true, precio: 41610, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "60x27x30", material: "Rotomoldeado", pintada: true, precio: 53240, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "80x20x20", material: "Rotomoldeado", pintada: true, precio: 44240, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "80x20x30", material: "Rotomoldeado", pintada: true, precio: 60060, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "80x27x30", material: "Rotomoldeado", pintada: true, precio: 70380, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "100x20x20", material: "Rotomoldeado", pintada: true, precio: 53240, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "100x27x30", material: "Rotomoldeado", pintada: true, precio: 87310, litros: null, peso_kg: null },
  // FIBRA DE VIDRIO
  { articulo: "Misionera", medidas: "29h x 27Ø x 20b", material: "Fibra de Vidrio", pintada: true, precio: 142320, litros: null, peso_kg: null },
  { articulo: "Misionera", medidas: "39h x 37Ø x 20b", material: "Fibra de Vidrio", pintada: true, precio: 197880, litros: null, peso_kg: null },
  { articulo: "Misionera", medidas: "50h x 47Ø x 32b", material: "Fibra de Vidrio", pintada: true, precio: 248770, litros: null, peso_kg: null },
  { articulo: "Cuenco", medidas: "30h x 40Ø x 30b", material: "Fibra de Vidrio", pintada: true, precio: 136570, litros: null, peso_kg: null },
  { articulo: "Cuenco", medidas: "40h x 50Ø x 40b", material: "Fibra de Vidrio", pintada: true, precio: 180430, litros: null, peso_kg: null },
  { articulo: "Cuenco", medidas: "45h x 45Ø x 40b", material: "Fibra de Vidrio", pintada: true, precio: 180430, litros: null, peso_kg: null },
  { articulo: "Cuenco", medidas: "50h x 60Ø x 45b", material: "Fibra de Vidrio", pintada: true, precio: 265890, litros: null, peso_kg: null },
  // CERÁMICA
  { articulo: "Coco N°1", medidas: "10h x 11d x 8b", material: "Cerámica", pintada: false, precio: 26020, litros: null, peso_kg: null },
  { articulo: "Coco N°2", medidas: "14h x 14d x 11b", material: "Cerámica", pintada: false, precio: 39960, litros: null, peso_kg: null },
  { articulo: "Coco N°3", medidas: "18h x 17d x 14b", material: "Cerámica", pintada: false, precio: 71410, litros: null, peso_kg: null },
  { articulo: "Coco N°4", medidas: "24h x 22d x 18b", material: "Cerámica", pintada: false, precio: 131910, litros: null, peso_kg: null },
  { articulo: "Coco N°5", medidas: "32h x 28d x 28b", material: "Cerámica", pintada: false, precio: 208310, litros: null, peso_kg: null },
  { articulo: "Cono Curvo", medidas: "60h x 40d", material: "Cerámica", pintada: false, precio: 444000, litros: null, peso_kg: null },
  { articulo: "Maceta N°1", medidas: "9h x 11d x 6b", material: "Cerámica", pintada: false, precio: 14730, litros: null, peso_kg: null },
  { articulo: "Maceta N°2", medidas: "14h x 16d x 10b", material: "Cerámica", pintada: false, precio: 25990, litros: null, peso_kg: null },
  { articulo: "Maceta N°3", medidas: "18h x 20d x 12b", material: "Cerámica", pintada: false, precio: 37100, litros: null, peso_kg: null },
  { articulo: "Maceta N°4", medidas: "31h x 29d x 18b", material: "Cerámica", pintada: false, precio: 83760, litros: null, peso_kg: null },
  { articulo: "Maceta N°5", medidas: "—", material: "Cerámica", pintada: false, precio: 164840, litros: null, peso_kg: null },
  { articulo: "Plato N°1", medidas: "8cm diám.", material: "Cerámica", pintada: false, precio: 7000, litros: null, peso_kg: null },
  { articulo: "Plato N°2", medidas: "12cm diám.", material: "Cerámica", pintada: false, precio: 12990, litros: null, peso_kg: null },
  { articulo: "Plato N°3", medidas: "18cm diám.", material: "Cerámica", pintada: false, precio: 19430, litros: null, peso_kg: null },
  { articulo: "Plato N°4", medidas: "24cm diám.", material: "Cerámica", pintada: false, precio: 30900, litros: null, peso_kg: null },
  { articulo: "Plato N°5", medidas: "30cm diám.", material: "Cerámica", pintada: false, precio: 53280, litros: null, peso_kg: null },
  { articulo: "Plato N°6", medidas: "40cm diám.", material: "Cerámica", pintada: false, precio: 79550, litros: null, peso_kg: null },
  { articulo: "Griega Colgante", medidas: "27h x 21d x 4b", material: "Cerámica", pintada: false, precio: 55500, litros: null, peso_kg: null },
  { articulo: "Farol N°1", medidas: "12cm altura", material: "Cerámica", pintada: false, precio: 18710, litros: null, peso_kg: null },
  { articulo: "Farol N°2", medidas: "16cm altura", material: "Cerámica", pintada: false, precio: 29720, litros: null, peso_kg: null },
  { articulo: "Farol N°3", medidas: "22cm altura", material: "Cerámica", pintada: false, precio: 46350, litros: null, peso_kg: null },
  { articulo: "Kokedama Chica", medidas: "10h x 15d x 5b", material: "Cerámica", pintada: false, precio: 20760, litros: null, peso_kg: null },
  { articulo: "Kokedama Grande", medidas: "15h x 23d x 11b", material: "Cerámica", pintada: false, precio: 34880, litros: null, peso_kg: null },
  { articulo: "Yucatan Baja", medidas: "6h x 40l x 24a", material: "Cerámica", pintada: false, precio: 37740, litros: null, peso_kg: null },
  { articulo: "Yucatan Alta", medidas: "12h x 43l x 26a", material: "Cerámica", pintada: false, precio: 54580, litros: null, peso_kg: null },
  { articulo: "Fascetadas", medidas: "10h x 8d x 6b", material: "Cerámica", pintada: false, precio: 14730, litros: null, peso_kg: null },
  // PLÁSTICO
  { articulo: "Plato Nº10", medidas: "Nº10", material: "Plástico", pintada: false, precio: 890, litros: null, peso_kg: null },
  { articulo: "Plato Nº12", medidas: "Nº12", material: "Plástico", pintada: false, precio: 890, litros: null, peso_kg: null },
  { articulo: "Plato Nº14", medidas: "Nº14", material: "Plástico", pintada: false, precio: 890, litros: null, peso_kg: null },
  { articulo: "Plato Nº16", medidas: "Nº16", material: "Plástico", pintada: false, precio: 960, litros: null, peso_kg: null },
  { articulo: "Plato Nº18", medidas: "Nº18", material: "Plástico", pintada: false, precio: 980, litros: null, peso_kg: null },
  { articulo: "Plato Nº20", medidas: "Nº20", material: "Plástico", pintada: false, precio: 1240, litros: null, peso_kg: null },
  { articulo: "Plato Nº22", medidas: "Nº22", material: "Plástico", pintada: false, precio: 1250, litros: null, peso_kg: null },
  { articulo: "Plato Nº24", medidas: "Nº24", material: "Plástico", pintada: false, precio: 1640, litros: null, peso_kg: null },
  { articulo: "Plato Nº26", medidas: "Nº26", material: "Plástico", pintada: false, precio: 1720, litros: null, peso_kg: null },
  { articulo: "Plato Nº28", medidas: "Nº28", material: "Plástico", pintada: false, precio: 1960, litros: null, peso_kg: null },
  { articulo: "Plato Nº32", medidas: "Nº32", material: "Plástico", pintada: false, precio: 2410, litros: null, peso_kg: null },
  { articulo: "Plato Nº36", medidas: "Nº36", material: "Plástico", pintada: false, precio: 2860, litros: null, peso_kg: null },
  { articulo: "Plato Nº40", medidas: "Nº40", material: "Plástico", pintada: false, precio: 3770, litros: null, peso_kg: null },
  { articulo: "Plato Nº45", medidas: "Nº45", material: "Plástico", pintada: false, precio: 4800, litros: null, peso_kg: null },
  { articulo: "Plato Nº50", medidas: "Nº50", material: "Plástico", pintada: false, precio: 16260, litros: null, peso_kg: null },
  { articulo: "Plato Cuadrado Nº15", medidas: "Nº15", material: "Plástico", pintada: false, precio: 1810, litros: null, peso_kg: null },
  { articulo: "Plato Cuadrado Nº20", medidas: "Nº20", material: "Plástico", pintada: false, precio: 2510, litros: null, peso_kg: null },
  { articulo: "Plato Cuadrado Nº25", medidas: "Nº25", material: "Plástico", pintada: false, precio: 2840, litros: null, peso_kg: null },
  { articulo: "Plato Cuadrado Nº30", medidas: "Nº30", material: "Plástico", pintada: false, precio: 3420, litros: null, peso_kg: null },
  { articulo: "Plato Cuadrado Nº35", medidas: "Nº35", material: "Plástico", pintada: false, precio: 5130, litros: null, peso_kg: null },
  { articulo: "Plato Cuadrado Nº40", medidas: "Nº40", material: "Plástico", pintada: false, precio: 9880, litros: null, peso_kg: null },
  { articulo: "Maceta Diamante N19", medidas: "N°19", material: "Plástico", pintada: false, precio: 4220, litros: null, peso_kg: null },
  { articulo: "Premium Clásica *12", medidas: "*12", material: "Plástico", pintada: false, precio: 2400, litros: null, peso_kg: null },
  // ALEJANDRA — Rotomoldeado (minorista)
  { articulo: "Cubo", medidas: "30x30", material: "Rotomoldeado", pintada: true, precio: 25500, litros: null, peso_kg: null },
  { articulo: "Cubo", medidas: "35x35", material: "Rotomoldeado", pintada: true, precio: 38000, litros: null, peso_kg: null },
  { articulo: "Cubo", medidas: "40x40", material: "Rotomoldeado", pintada: true, precio: 55500, litros: null, peso_kg: null },
  { articulo: "Cubo", medidas: "50x50", material: "Rotomoldeado", pintada: true, precio: 95500, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "20x60", material: "Rotomoldeado", pintada: true, precio: 33500, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "20x80", material: "Rotomoldeado", pintada: true, precio: 44000, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "20x100", material: "Rotomoldeado", pintada: true, precio: 53000, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "27x30x60", material: "Rotomoldeado", pintada: true, precio: 53000, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "27x30x80", material: "Rotomoldeado", pintada: true, precio: 70000, litros: null, peso_kg: null },
  { articulo: "Jardinera", medidas: "27x30x100", material: "Rotomoldeado", pintada: true, precio: 86500, litros: null, peso_kg: null },
  { articulo: "Cilindro", medidas: "40cm", material: "Rotomoldeado", pintada: true, precio: 51000, litros: null, peso_kg: null },
  { articulo: "Cilindro", medidas: "50cm", material: "Rotomoldeado", pintada: true, precio: 76500, litros: null, peso_kg: null },
  { articulo: "Misionera Texturada", medidas: "30cm", material: "Rotomoldeado", pintada: true, precio: 25000, litros: null, peso_kg: null },
  { articulo: "Misionera Texturada", medidas: "40cm", material: "Rotomoldeado", pintada: true, precio: 42000, litros: null, peso_kg: null },
  { articulo: "Plato Misionera", medidas: "Chico", material: "Rotomoldeado", pintada: true, precio: 7500, litros: null, peso_kg: null },
  { articulo: "Plato Misionera", medidas: "Mediano", material: "Rotomoldeado", pintada: true, precio: 13000, litros: null, peso_kg: null },
  { articulo: "Plato Misionera", medidas: "Grande", material: "Rotomoldeado", pintada: true, precio: 18500, litros: null, peso_kg: null },
  { articulo: "Paris", medidas: "30cm", material: "Rotomoldeado", pintada: true, precio: 42500, litros: null, peso_kg: null },
  { articulo: "Paris", medidas: "44cm", material: "Rotomoldeado", pintada: true, precio: 52500, litros: null, peso_kg: null },
  { articulo: "🎁 Combo Misionera Texturada", medidas: "30cm + 40cm", material: "Combo", pintada: false, precio: 59000, litros: null, peso_kg: null },
  // SANTO BENITO — Rotomoldeado (lista 11/4/26)
  { articulo: "Copa SB", medidas: "20cm c/plato", material: "Rotomoldeado", pintada: true, precio: 9890, litros: null, peso_kg: null },
  { articulo: "Copa SB", medidas: "30cm c/plato", material: "Rotomoldeado", pintada: true, precio: 21560, litros: null, peso_kg: null },
  { articulo: "Copa SB", medidas: "40cm", material: "Rotomoldeado", pintada: true, precio: 55880, litros: null, peso_kg: null },
  { articulo: "Copa SB", medidas: "50cm", material: "Rotomoldeado", pintada: true, precio: 89560, litros: null, peso_kg: null },
  { articulo: "Copa SB", medidas: "60cm", material: "Rotomoldeado", pintada: true, precio: 131200, litros: null, peso_kg: null },
  { articulo: "Van Gogh SB", medidas: "", material: "Rotomoldeado", pintada: true, precio: 25100, litros: null, peso_kg: null },
  { articulo: "Jardinera Reforzada SB", medidas: "100x30x30cm", material: "Rotomoldeado", pintada: true, precio: 118080, litros: null, peso_kg: null },
  { articulo: "Misionera SB", medidas: "40cm c/plato", material: "Rotomoldeado", pintada: true, precio: 56440, litros: null, peso_kg: null },
  { articulo: "Misionera SB", medidas: "55cm c/plato", material: "Rotomoldeado", pintada: true, precio: 77620, litros: null, peso_kg: null },
  { articulo: "Misionera SB", medidas: "70cm c/plato", material: "Rotomoldeado", pintada: true, precio: 93030, litros: null, peso_kg: null },
  { articulo: "Cuenco SB", medidas: "32cm c/plato", material: "Rotomoldeado", pintada: true, precio: 62320, litros: null, peso_kg: null },
  { articulo: "Cuenco SB", medidas: "48cm c/plato", material: "Rotomoldeado", pintada: true, precio: 121360, litros: null, peso_kg: null },
  { articulo: "Salteña SB", medidas: "40cm c/plato", material: "Rotomoldeado", pintada: true, precio: 39400, litros: null, peso_kg: null },
  { articulo: "Salteña SB", medidas: "55cm c/plato", material: "Rotomoldeado", pintada: true, precio: 82000, litros: null, peso_kg: null },
  { articulo: "Salteña SB", medidas: "70cm c/plato", material: "Rotomoldeado", pintada: true, precio: 124640, litros: null, peso_kg: null },
  // COMBOS SANTO BENITO
  { articulo: "🎁 Combo Copa Trío", medidas: "Copa 40 + 50 + 60cm", material: "Combo", pintada: false, precio: 234000, litros: null, peso_kg: null },
  { articulo: "🎁 Combo Misionera Trío", medidas: "Misionera 40 + 55 + 70cm c/plato", material: "Combo", pintada: false, precio: 191500, litros: null, peso_kg: null },
  { articulo: "🎁 Combo Salteña Trío", medidas: "Salteña 40 + 55 + 70cm c/plato", material: "Combo", pintada: false, precio: 200000, litros: null, peso_kg: null },
  { articulo: "🎁 Combo Entrada", medidas: "2× Misionera 55cm + Copa 40cm", material: "Combo", pintada: false, precio: 179000, litros: null, peso_kg: null },
  { articulo: "🎁 Combo Terraza", medidas: "2× Copa 50cm + Cuenco 32cm", material: "Combo", pintada: false, precio: 205500, litros: null, peso_kg: null },
  { articulo: "🎁 Combo Living", medidas: "2× Misionera 70cm + Misionera 40cm", material: "Combo", pintada: false, precio: 204000, litros: null, peso_kg: null },
  // FIBROCEMENTO — San Jorge (nuevos modelos)
  { articulo: "MISIONERA N50 *35 *30 NUEVA", medidas: "", material: "Fibrocemento", pintada: false, precio: 26010, litros: null, peso_kg: null },
  { articulo: "PLATO TAZA X 1MTS", medidas: "", material: "Fibrocemento", pintada: false, precio: 34890, litros: null, peso_kg: null },
  { articulo: "CONO PANAL 60CM", medidas: "", material: "Fibrocemento", pintada: false, precio: 28310, litros: null, peso_kg: null },
  { articulo: "PANAL N60", medidas: "", material: "Fibrocemento", pintada: false, precio: 22390, litros: null, peso_kg: null },
  { articulo: "MISIONERA 35CM ALTURA 50CM BASE 40CM BOCA", medidas: "", material: "Fibrocemento", pintada: false, precio: 25240, litros: null, peso_kg: null },
  { articulo: "VASO COMUN N60 NUEVO", medidas: "", material: "Fibrocemento", pintada: false, precio: 49220, litros: null, peso_kg: null },
  { articulo: "PANAL N50", medidas: "", material: "Fibrocemento", pintada: false, precio: 17770, litros: null, peso_kg: null },
  { articulo: "PREMIUM N45", medidas: "", material: "Fibrocemento", pintada: false, precio: 18970, litros: null, peso_kg: null },
  { articulo: "CILINDRO 50*35", medidas: "", material: "Fibrocemento", pintada: false, precio: 18190, litros: null, peso_kg: null },
  { articulo: "PLATO N30", medidas: "", material: "Fibrocemento", pintada: false, precio: 8870, litros: null, peso_kg: null },
  { articulo: "CUBO RAYA 35*35", medidas: "", material: "Fibrocemento", pintada: false, precio: 21420, litros: null, peso_kg: null },
  { articulo: "ESFERICA N*20*20*15", medidas: "", material: "Fibrocemento", pintada: false, precio: 10890, litros: null, peso_kg: null },
  { articulo: "ESFERICA N30*30*20", medidas: "", material: "Fibrocemento", pintada: false, precio: 14310, litros: null, peso_kg: null },
  { articulo: "ESFERICA 40*40*30", medidas: "", material: "Fibrocemento", pintada: false, precio: 20220, litros: null, peso_kg: null },
  { articulo: "FLOREADITA CHICA", medidas: "", material: "Fibrocemento", pintada: false, precio: 11090, litros: null, peso_kg: null },
  { articulo: "FLOREADITA GRANDE", medidas: "", material: "Fibrocemento", pintada: false, precio: 16830, litros: null, peso_kg: null },
  { articulo: "FLOR D/ ALIZ N*60", medidas: "", material: "Fibrocemento", pintada: false, precio: 25040, litros: null, peso_kg: null },
  { articulo: "JARRON 30CM", medidas: "", material: "Fibrocemento", pintada: false, precio: 14310, litros: null, peso_kg: null },
  { articulo: "JARRON 40CM", medidas: "", material: "Fibrocemento", pintada: false, precio: 14080, litros: null, peso_kg: null },
  { articulo: "JARRON 50CM", medidas: "", material: "Fibrocemento", pintada: false, precio: 16520, litros: null, peso_kg: null },
  { articulo: "JARRON 65CM", medidas: "", material: "Fibrocemento", pintada: false, precio: 20810, litros: null, peso_kg: null },
  { articulo: "MISIONERA 27*24*20", medidas: "", material: "Fibrocemento", pintada: false, precio: 10560, litros: null, peso_kg: null },
  { articulo: "MISIONERA 32*22*28 NUEVA", medidas: "", material: "Fibrocemento", pintada: false, precio: 12570, litros: null, peso_kg: null },
  { articulo: "MISIONERA 40*28*20", medidas: "", material: "Fibrocemento", pintada: false, precio: 17720, litros: null, peso_kg: null },
  { articulo: "MISIONERA 50*37*38", medidas: "", material: "Fibrocemento", pintada: false, precio: 26010, litros: null, peso_kg: null },
  { articulo: "MISIONERA 65*48*46", medidas: "", material: "Fibrocemento", pintada: false, precio: 34270, litros: null, peso_kg: null },
  { articulo: "SALTEÑA 40*30", medidas: "", material: "Fibrocemento", pintada: false, precio: 26610, litros: null, peso_kg: null },
  { articulo: "SALTEÑA 45*35*22 NUEVA", medidas: "", material: "Fibrocemento", pintada: false, precio: 19890, litros: null, peso_kg: null },
  { articulo: "SALTEÑA 55*40*30", medidas: "", material: "Fibrocemento", pintada: false, precio: 39840, litros: null, peso_kg: null },
  { articulo: "SALTEÑA 65*50*35", medidas: "", material: "Fibrocemento", pintada: false, precio: 35170, litros: null, peso_kg: null },
  { articulo: "VASO ANTIGUO CHICO 35*30*25", medidas: "", material: "Fibrocemento", pintada: false, precio: 15240, litros: null, peso_kg: null },
  { articulo: "VASO ANTIGUO MEDIANO 43*35*30", medidas: "", material: "Fibrocemento", pintada: false, precio: 21930, litros: null, peso_kg: null },
  { articulo: "VASO ANTIGUO GRANDE 53*50*35", medidas: "", material: "Fibrocemento", pintada: false, precio: 29320, litros: null, peso_kg: null },
  { articulo: "VASO ROMANO CHICO 35*30*25", medidas: "", material: "Fibrocemento", pintada: false, precio: 14620, litros: null, peso_kg: null },
  { articulo: "VASO ROMANO MEDIANO 43*35*30", medidas: "", material: "Fibrocemento", pintada: false, precio: 20530, litros: null, peso_kg: null },
  { articulo: "VASO ROMANO GRANDE 53*50*35", medidas: "", material: "Fibrocemento", pintada: false, precio: 27690, litros: null, peso_kg: null },
  { articulo: "CILINDRO 30*23", medidas: "", material: "Fibrocemento", pintada: false, precio: 9490, litros: null, peso_kg: null },
  { articulo: "CILINDRO 40*23", medidas: "", material: "Fibrocemento", pintada: false, precio: 9870, litros: null, peso_kg: null },
  { articulo: "CILINDRO 40*40", medidas: "", material: "Fibrocemento", pintada: false, precio: 22030, litros: null, peso_kg: null },
  { articulo: "CILINDRO 80*40", medidas: "", material: "Fibrocemento", pintada: false, precio: 30340, litros: null, peso_kg: null },
  { articulo: "CONO 40*35", medidas: "", material: "Fibrocemento", pintada: false, precio: 17850, litros: null, peso_kg: null },
  { articulo: "CONO MODERNO 40*30", medidas: "", material: "Fibrocemento", pintada: false, precio: 15040, litros: null, peso_kg: null },
  { articulo: "CANASTA 20*20*20", medidas: "", material: "Fibrocemento", pintada: false, precio: 8720, litros: null, peso_kg: null },
  { articulo: "CANASTA 30*25*20", medidas: "", material: "Fibrocemento", pintada: false, precio: 13130, litros: null, peso_kg: null },
  { articulo: "CANASTA 35*30*25", medidas: "", material: "Fibrocemento", pintada: false, precio: 16580, litros: null, peso_kg: null },
  { articulo: "MISIONERA 90*45*38", medidas: "", material: "Fibrocemento", pintada: false, precio: 48450, litros: null, peso_kg: null },
  { articulo: "MISIONERA 20*18*20", medidas: "", material: "Fibrocemento", pintada: false, precio: 8420, litros: null, peso_kg: null },
  { articulo: "PLATO REDONDO *46", medidas: "", material: "Fibrocemento", pintada: false, precio: 9940, litros: null, peso_kg: null },
  { articulo: "PLATO REDONDO *38", medidas: "", material: "Fibrocemento", pintada: false, precio: 9200, litros: null, peso_kg: null },
  { articulo: "PIE P/CAMINO", medidas: "", material: "Fibrocemento", pintada: false, precio: 11930, litros: null, peso_kg: null },
  { articulo: "CONO MODERNO 55CM", medidas: "", material: "Fibrocemento", pintada: false, precio: 20200, litros: null, peso_kg: null },
  { articulo: "CONO MODERNO 70CM", medidas: "", material: "Fibrocemento", pintada: false, precio: 25120, litros: null, peso_kg: null },
  { articulo: "PREMIUM N20", medidas: "", material: "Fibrocemento", pintada: false, precio: 8290, litros: null, peso_kg: null },
  { articulo: "PREMIUM N24", medidas: "", material: "Fibrocemento", pintada: false, precio: 10710, litros: null, peso_kg: null },
  { articulo: "PREMIUM N34", medidas: "", material: "Fibrocemento", pintada: false, precio: 15040, litros: null, peso_kg: null },
  { articulo: "CONO 60*40", medidas: "", material: "Fibrocemento", pintada: false, precio: 24220, litros: null, peso_kg: null },
  { articulo: "CONO 80*45", medidas: "", material: "Fibrocemento", pintada: false, precio: 33150, litros: null, peso_kg: null },
  { articulo: "CUBO RAYA 20*20", medidas: "", material: "Fibrocemento", pintada: false, precio: 10200, litros: null, peso_kg: null },
  { articulo: "CUBO RAYA 25*25", medidas: "", material: "Fibrocemento", pintada: false, precio: 15300, litros: null, peso_kg: null },
  { articulo: "HOJA *20", medidas: "", material: "Fibrocemento", pintada: false, precio: 6130, litros: null, peso_kg: null },
  { articulo: "HOJA *30", medidas: "", material: "Fibrocemento", pintada: false, precio: 8320, litros: null, peso_kg: null },
  { articulo: "PIRAMIDAL C/DIBUJO *35", medidas: "", material: "Fibrocemento", pintada: false, precio: 17470, litros: null, peso_kg: null },
  { articulo: "CILINDRO 50*23", medidas: "", material: "Fibrocemento", pintada: false, precio: 12760, litros: null, peso_kg: null },
  { articulo: "CILINDRO 60*23", medidas: "", material: "Fibrocemento", pintada: false, precio: 14020, litros: null, peso_kg: null },
  { articulo: "JARDINERA 80*30*35", medidas: "", material: "Fibrocemento", pintada: false, precio: 19950, litros: null, peso_kg: null },
  { articulo: "PIRAMIDAL 80*35", medidas: "", material: "Fibrocemento", pintada: false, precio: 27030, litros: null, peso_kg: null },
  { articulo: "JARDINERA 60*20*30", medidas: "", material: "Fibrocemento", pintada: false, precio: 18070, litros: null, peso_kg: null },
  { articulo: "BARRIL GRANDE", medidas: "", material: "Fibrocemento", pintada: false, precio: 43320, litros: null, peso_kg: null },
  { articulo: "CUBO LISO 40*40", medidas: "", material: "Fibrocemento", pintada: false, precio: 28550, litros: null, peso_kg: null },
  { articulo: "CUBO LISO 30*30", medidas: "", material: "Fibrocemento", pintada: false, precio: 19160, litros: null, peso_kg: null },
  { articulo: "PIRAMIDAL 40*28", medidas: "", material: "Fibrocemento", pintada: false, precio: 16750, litros: null, peso_kg: null },
  { articulo: "VERONA CHICA  Y C/NUES", medidas: "", material: "Fibrocemento", pintada: false, precio: 30130, litros: null, peso_kg: null },
  { articulo: "VERONA GRAND", medidas: "", material: "Fibrocemento", pintada: false, precio: 36590, litros: null, peso_kg: null },
  { articulo: "JARRA C/MANIJA", medidas: "", material: "Fibrocemento", pintada: false, precio: 36380, litros: null, peso_kg: null },
  { articulo: "CONOS 40*30*22", medidas: "", material: "Fibrocemento", pintada: false, precio: 22440, litros: null, peso_kg: null },
  { articulo: "CILINDRO N*50", medidas: "", material: "Fibrocemento", pintada: false, precio: 31290, litros: null, peso_kg: null },
  { articulo: "JARRON *60CM", medidas: "", material: "Fibrocemento", pintada: false, precio: 29610, litros: null, peso_kg: null },
  { articulo: "JARRON *80 CM", medidas: "", material: "Fibrocemento", pintada: false, precio: 77220, litros: null, peso_kg: null },
  { articulo: "JARRON *1MTS", medidas: "", material: "Fibrocemento", pintada: false, precio: 114560, litros: null, peso_kg: null },
  { articulo: "COMUN GRAND N*50CM", medidas: "", material: "Fibrocemento", pintada: false, precio: 26480, litros: null, peso_kg: null },
  { articulo: "CONOS  80CM", medidas: "", material: "Fibrocemento", pintada: false, precio: 33700, litros: null, peso_kg: null },
  { articulo: "CONOS 60*35*30", medidas: "", material: "Fibrocemento", pintada: false, precio: 27140, litros: null, peso_kg: null },
  { articulo: "BOMBA CHICA", medidas: "", material: "Fibrocemento", pintada: false, precio: 18870, litros: null, peso_kg: null },
  { articulo: "COLONIAL GRAN", medidas: "", material: "Fibrocemento", pintada: false, precio: 32250, litros: null, peso_kg: null },
  { articulo: "COMUN CH N*30CM", medidas: "", material: "Fibrocemento", pintada: false, precio: 17270, litros: null, peso_kg: null },
  { articulo: "COMUN MD N*40", medidas: "", material: "Fibrocemento", pintada: false, precio: 20250, litros: null, peso_kg: null },
  { articulo: "CILINDRO N*40", medidas: "", material: "Fibrocemento", pintada: false, precio: 22320, litros: null, peso_kg: null },
  { articulo: "CILINDRO N*30", medidas: "", material: "Fibrocemento", pintada: false, precio: 15790, litros: null, peso_kg: null },
  { articulo: "JARDINERA 1*15*15", medidas: "", material: "Fibrocemento", pintada: false, precio: 13000, litros: null, peso_kg: null },
  { articulo: "COLONIAL MD", medidas: "", material: "Fibrocemento", pintada: false, precio: 27000, litros: null, peso_kg: null },
  { articulo: "COLONIAL CH", medidas: "", material: "Fibrocemento", pintada: false, precio: 23340, litros: null, peso_kg: null },
  { articulo: "BOMBA GRAND", medidas: "", material: "Fibrocemento", pintada: false, precio: 23340, litros: null, peso_kg: null },
  { articulo: "ACOSTADA GRAND", medidas: "", material: "Fibrocemento", pintada: false, precio: 26390, litros: null, peso_kg: null },
  { articulo: "ACOSTADA CHICA", medidas: "", material: "Fibrocemento", pintada: false, precio: 28010, litros: null, peso_kg: null },
  { articulo: "JARRON MINI", medidas: "", material: "Fibrocemento", pintada: false, precio: 20670, litros: null, peso_kg: null },
  { articulo: "JARRON PANSON", medidas: "", material: "Fibrocemento", pintada: false, precio: 77220, litros: null, peso_kg: null },
  { articulo: "OLLAS C/ASAS", medidas: "", material: "Fibrocemento", pintada: false, precio: 27920, litros: null, peso_kg: null },
  { articulo: "PIRAMIDAL 45*30*45", medidas: "", material: "Fibrocemento", pintada: false, precio: 21110, litros: null, peso_kg: null },
  { articulo: "PIRAMIDAL 50*40*30", medidas: "", material: "Fibrocemento", pintada: false, precio: 21110, litros: null, peso_kg: null },
  { articulo: "RECTANGULAR 50*30", medidas: "", material: "Fibrocemento", pintada: false, precio: 18310, litros: null, peso_kg: null },
  { articulo: "JARDINERA 50*20*20", medidas: "", material: "Fibrocemento", pintada: false, precio: 13000, litros: null, peso_kg: null },
  { articulo: "JARDINERA 1*30*35", medidas: "", material: "Fibrocemento", pintada: false, precio: 30690, litros: null, peso_kg: null },
  { articulo: "VASO UVA", medidas: "", material: "Fibrocemento", pintada: false, precio: 18460, litros: null, peso_kg: null },
  { articulo: "BARRIL CHICO", medidas: "", material: "Fibrocemento", pintada: false, precio: 16820, litros: null, peso_kg: null },
  { articulo: "JUJEÑA N1 N40 ALTURA", medidas: "", material: "Fibrocemento", pintada: false, precio: 20980, litros: null, peso_kg: null },
  { articulo: "JUJEÑA N2 N55ALTURA", medidas: "", material: "Fibrocemento", pintada: false, precio: 30100, litros: null, peso_kg: null },
  { articulo: "JUJEÑA N3 N65 ALTURA", medidas: "", material: "Fibrocemento", pintada: false, precio: 53010, litros: null, peso_kg: null },
  { articulo: "CALI N40 LU", medidas: "", material: "Fibrocemento", pintada: false, precio: 49310, litros: null, peso_kg: null },
  { articulo: "CALI LU N77", medidas: "", material: "Fibrocemento", pintada: false, precio: 70040, litros: null, peso_kg: null },
  { articulo: "CALI LU N56", medidas: "", material: "Fibrocemento", pintada: false, precio: 50670, litros: null, peso_kg: null },
  // PLÁSTICO — MATRI y T.A
  { articulo: "PLATO P/JARD.8020 CM.", medidas: "", material: "Plástico", pintada: false, precio: 11740, litros: null, peso_kg: null },
  { articulo: "PLATO P/JARD.IMPERIO Nº60", medidas: "", material: "Plástico", pintada: false, precio: 5130, litros: null, peso_kg: null },
  { articulo: "PLATO P/JARD.IMPERIO Nº80", medidas: "", material: "Plástico", pintada: false, precio: 14400, litros: null, peso_kg: null },
  { articulo: "PLATO P/JARDINERA MARISA 40 CM", medidas: "", material: "Plástico", pintada: false, precio: 1480, litros: null, peso_kg: null },
  { articulo: "PLATO Nº18", medidas: "", material: "Plástico", pintada: false, precio: 1130, litros: null, peso_kg: null },
  { articulo: "PLATO Nº20", medidas: "", material: "Plástico", pintada: false, precio: 1430, litros: null, peso_kg: null },
  { articulo: "PLATO Nº22", medidas: "", material: "Plástico", pintada: false, precio: 1450, litros: null, peso_kg: null },
  { articulo: "PLATO Nº24", medidas: "", material: "Plástico", pintada: false, precio: 1810, litros: null, peso_kg: null },
  { articulo: "PLATO Nº26", medidas: "", material: "Plástico", pintada: false, precio: 1980, litros: null, peso_kg: null },
  { articulo: "PLATO Nº28", medidas: "", material: "Plástico", pintada: false, precio: 2270, litros: null, peso_kg: null },
  { articulo: "PLATO Nº32", medidas: "", material: "Plástico", pintada: false, precio: 2780, litros: null, peso_kg: null },
  { articulo: "PLATO Nº36", medidas: "", material: "Plástico", pintada: false, precio: 3150, litros: null, peso_kg: null },
  { articulo: "PLATO Nº40", medidas: "", material: "Plástico", pintada: false, precio: 4360, litros: null, peso_kg: null },
  { articulo: "PLATO Nº45", medidas: "", material: "Plástico", pintada: false, precio: 5250, litros: null, peso_kg: null },
  { articulo: "PLATO Nº50", medidas: "", material: "Plástico", pintada: false, precio: 8980, litros: null, peso_kg: null },
  { articulo: "PLATO P/JARD DENISE  65 CM.", medidas: "", material: "Plástico", pintada: false, precio: 7530, litros: null, peso_kg: null },
  { articulo: "PLATO P/JARDINERA Nº45", medidas: "", material: "Plástico", pintada: false, precio: 2960, litros: null, peso_kg: null },
  { articulo: "PLATO P/JARDINERA Nº60", medidas: "", material: "Plástico", pintada: false, precio: 4430, litros: null, peso_kg: null },
  { articulo: "PLATO P/JARDINERA Nº80", medidas: "", material: "Plástico", pintada: false, precio: 7600, litros: null, peso_kg: null },
  { articulo: "PLATO P/JARD.6020 CM.", medidas: "", material: "Plástico", pintada: false, precio: 6870, litros: null, peso_kg: null },
  { articulo: "PLATO P/JARD.IMPERIO Nº50", medidas: "", material: "Plástico", pintada: false, precio: 4400, litros: null, peso_kg: null },
  { articulo: "PLATO CUADRADO Nº15", medidas: "", material: "Plástico", pintada: false, precio: 2400, litros: null, peso_kg: null },
  { articulo: "PLATO CUADRADO Nº20", medidas: "", material: "Plástico", pintada: false, precio: 3330, litros: null, peso_kg: null },
  { articulo: "PLATO CUADRADO Nº25", medidas: "", material: "Plástico", pintada: false, precio: 3420, litros: null, peso_kg: null },
  { articulo: "PLATO CUADRADO Nº30", medidas: "", material: "Plástico", pintada: false, precio: 4110, litros: null, peso_kg: null },
  { articulo: "PLATO CUADRADO Nº35", medidas: "", material: "Plástico", pintada: false, precio: 6220, litros: null, peso_kg: null },
  { articulo: "PLATO CUADRADO Nº40", medidas: "", material: "Plástico", pintada: false, precio: 11890, litros: null, peso_kg: null },
  { articulo: "REGADERA X 10 LTS", medidas: "", material: "Plástico", pintada: false, precio: 24770, litros: null, peso_kg: null },
  { articulo: "REGADERA X 2 LTS", medidas: "", material: "Plástico", pintada: false, precio: 7830, litros: null, peso_kg: null },
  { articulo: "REGADERA X 5 LTS", medidas: "", material: "Plástico", pintada: false, precio: 13730, litros: null, peso_kg: null },
  { articulo: "CONICA 18 CM", medidas: "", material: "Plástico", pintada: false, precio: 3260, litros: null, peso_kg: null },
  { articulo: "CONICA 24 CM", medidas: "", material: "Plástico", pintada: false, precio: 5930, litros: null, peso_kg: null },
  { articulo: "PLATO P/JARDINERA Nº40", medidas: "", material: "Plástico", pintada: false, precio: 2240, litros: null, peso_kg: null },
  { articulo: "PLATO Nº10", medidas: "", material: "Plástico", pintada: false, precio: 1030, litros: null, peso_kg: null },
  { articulo: "PLATO Nº12", medidas: "", material: "Plástico", pintada: false, precio: 1030, litros: null, peso_kg: null },
  { articulo: "PLATO Nº14", medidas: "", material: "Plástico", pintada: false, precio: 1030, litros: null, peso_kg: null },
  { articulo: "PLATO Nº16", medidas: "", material: "Plástico", pintada: false, precio: 1110, litros: null, peso_kg: null },
  { articulo: "MAC JARDINERA 35 CM. PROMO 8+2 DE REGALO", medidas: "", material: "Plástico", pintada: false, precio: 3540, litros: null, peso_kg: null },
  { articulo: "MAC JARDINERA 40 CM. PROMO 8+2 DE REGALO", medidas: "", material: "Plástico", pintada: false, precio: 3770, litros: null, peso_kg: null },
  { articulo: "MAC JARDINERA 45 CM. PROMO 8+2 DE REGALO", medidas: "", material: "Plástico", pintada: false, precio: 5220, litros: null, peso_kg: null },
  { articulo: "MAC JARDINERA 55 CM. PROMO 8+2 DE REGALO", medidas: "", material: "Plástico", pintada: false, precio: 7980, litros: null, peso_kg: null },
  { articulo: "MAC JARDINERA 35 CM.  SOFIA", medidas: "", material: "Plástico", pintada: false, precio: 3970, litros: null, peso_kg: null },
  { articulo: "MAC JARDINERA 60 CM. PROMO 8+2 DE REGALO", medidas: "", material: "Plástico", pintada: false, precio: 10600, litros: null, peso_kg: null },
  { articulo: "MAC JARDINERA 65 CM 'D'", medidas: "", material: "Plástico", pintada: false, precio: 13800, litros: null, peso_kg: null },
  { articulo: "MAC JARDINERA 80 CM.", medidas: "", material: "Plástico", pintada: false, precio: 19290, litros: null, peso_kg: null },
  { articulo: "MAC JARDINERA 90 CM.", medidas: "", material: "Plástico", pintada: false, precio: 25350, litros: null, peso_kg: null },
  { articulo: "MAC JARDINERA IMPERIO 50 CM.", medidas: "", material: "Plástico", pintada: false, precio: 15880, litros: null, peso_kg: null },
  { articulo: "MAC JARDINERA IMPERIO 60 CM.", medidas: "", material: "Plástico", pintada: false, precio: 17760, litros: null, peso_kg: null },
  { articulo: "MAC JARDINERA IMPERIO 80 CM.", medidas: "", material: "Plástico", pintada: false, precio: 35530, litros: null, peso_kg: null },
  { articulo: "PLATO P/JARDINERA Nº35", medidas: "", material: "Plástico", pintada: false, precio: 2210, litros: null, peso_kg: null },
  { articulo: "PLATO P/JARDINERA Nº55", medidas: "", material: "Plástico", pintada: false, precio: 3330, litros: null, peso_kg: null },
  { articulo: "MACETA DIAMANTE N15", medidas: "", material: "Plástico", pintada: false, precio: 1660, litros: null, peso_kg: null },
  { articulo: "MACETA DIAMANTE N19", medidas: "", material: "Plástico", pintada: false, precio: 2500, litros: null, peso_kg: null },
  { articulo: "MACETA FACETADA N20", medidas: "", material: "Plástico", pintada: false, precio: 3820, litros: null, peso_kg: null },
  { articulo: "MACETA FACETDA N16", medidas: "", material: "Plástico", pintada: false, precio: 2460, litros: null, peso_kg: null },
  { articulo: "MACETA MILAN N16", medidas: "", material: "Plástico", pintada: false, precio: 2500, litros: null, peso_kg: null },
  { articulo: "MACETA MILAN N20", medidas: "", material: "Plástico", pintada: false, precio: 4090, litros: null, peso_kg: null },
  { articulo: "MACETA FACETADA N24", medidas: "", material: "Plástico", pintada: false, precio: 6620, litros: null, peso_kg: null },
  { articulo: "MACETA MILAN NOVEDAD N25", medidas: "", material: "Plástico", pintada: false, precio: 8130, litros: null, peso_kg: null },
  { articulo: "MACETA DIAMANTE N25", medidas: "", material: "Plástico", pintada: false, precio: 5700, litros: null, peso_kg: null },
  { articulo: "MACETA FACETADA N29", medidas: "", material: "Plástico", pintada: false, precio: 10250, litros: null, peso_kg: null },
  { articulo: "PLATO REDONDO N16", medidas: "", material: "Plástico", pintada: false, precio: 420, litros: null, peso_kg: null },
  { articulo: "PLATO REDONDO N18", medidas: "", material: "Plástico", pintada: false, precio: 510, litros: null, peso_kg: null },
  { articulo: "PLATO REDONDO N20", medidas: "", material: "Plástico", pintada: false, precio: 730, litros: null, peso_kg: null },
  { articulo: "PLATO REDONDO N22", medidas: "", material: "Plástico", pintada: false, precio: 860, litros: null, peso_kg: null },
  { articulo: "PLATO REDONDO N24", medidas: "", material: "Plástico", pintada: false, precio: 1080, litros: null, peso_kg: null },
  { articulo: "PLATO REDONDO N26", medidas: "", material: "Plástico", pintada: false, precio: 1230, litros: null, peso_kg: null },
  { articulo: "PLATO REDONDO N28", medidas: "", material: "Plástico", pintada: false, precio: 1460, litros: null, peso_kg: null },
  { articulo: "PLATO REDONDO N32", medidas: "", material: "Plástico", pintada: false, precio: 2040, litros: null, peso_kg: null },
  { articulo: "PLATO REDONDO N36", medidas: "", material: "Plástico", pintada: false, precio: 2960, litros: null, peso_kg: null },
  { articulo: "PLATO REDONDO N40", medidas: "", material: "Plástico", pintada: false, precio: 4270, litros: null, peso_kg: null },
  { articulo: "PLATO REDONDO N45", medidas: "", material: "Plástico", pintada: false, precio: 5220, litros: null, peso_kg: null },
  { articulo: "MACETA PARIS C/RAYA N18", medidas: "", material: "Plástico", pintada: false, precio: 2290, litros: null, peso_kg: null },
  { articulo: "MACETA PARIS C/RAYA N22", medidas: "", material: "Plástico", pintada: false, precio: 4910, litros: null, peso_kg: null },
  { articulo: "MACETA PARIS C/RAYA N27", medidas: "", material: "Plástico", pintada: false, precio: 8020, litros: null, peso_kg: null },
  { articulo: "PLATO REDONDO N12", medidas: "", material: "Plástico", pintada: false, precio: 320, litros: null, peso_kg: null },
  { articulo: "PLATO REDONDO N14", medidas: "", material: "Plástico", pintada: false, precio: 330, litros: null, peso_kg: null },
  { articulo: "JARDINERA Nº1 N35 ROCIO", medidas: "", material: "Plástico", pintada: false, precio: 2480, litros: null, peso_kg: null },
  { articulo: "JARDINERA Nº2 N45 ROCIO", medidas: "", material: "Plástico", pintada: false, precio: 3470, litros: null, peso_kg: null },
  { articulo: "JARDINERA Nº3 N55 ROCIO", medidas: "", material: "Plástico", pintada: false, precio: 5780, litros: null, peso_kg: null },
  { articulo: "JARDINERA Nº4   N65 ROCIO", medidas: "", material: "Plástico", pintada: false, precio: 9780, litros: null, peso_kg: null },
  { articulo: "PLATO P/ JARDINERA N35 COLOR T.A", medidas: "", material: "Plástico", pintada: false, precio: 1550, litros: null, peso_kg: null },
  { articulo: "PLATO P/JARDINERA N45 COLOR T.A", medidas: "", material: "Plástico", pintada: false, precio: 2220, litros: null, peso_kg: null },
  { articulo: "PLATO P/JARDINERA N55 COLOR T.A", medidas: "", material: "Plástico", pintada: false, precio: 3000, litros: null, peso_kg: null },
  { articulo: "PLATO P/JARDINERA N60 COLOR T.A", medidas: "", material: "Plástico", pintada: false, precio: 4380, litros: null, peso_kg: null },
  { articulo: "PLATO P/JARDINERA N80 COLOR T.A", medidas: "", material: "Plástico", pintada: false, precio: 7240, litros: null, peso_kg: null },
  { articulo: "PREMIUM BALCONERA PROMO 2+1 DE REGALO", medidas: "", material: "Plástico", pintada: false, precio: 12800, litros: null, peso_kg: null },
  { articulo: "BONSAI OVAL Nº20", medidas: "", material: "Plástico", pintada: false, precio: 2850, litros: null, peso_kg: null },
  { articulo: "BONSAI OVAL Nº30", medidas: "", material: "Plástico", pintada: false, precio: 5300, litros: null, peso_kg: null },
  { articulo: "BONSAI RECTAN Nº15", medidas: "", material: "Plástico", pintada: false, precio: 2330, litros: null, peso_kg: null },
  { articulo: "BONSAI RECTANGULAR Nº25", medidas: "", material: "Plástico", pintada: false, precio: 4910, litros: null, peso_kg: null },
  { articulo: "BONSAI REDONDO NRO.10", medidas: "", material: "Plástico", pintada: false, precio: 850, litros: null, peso_kg: null },
  { articulo: "BONSAI REDONDO NRO.17", medidas: "", material: "Plástico", pintada: false, precio: 2250, litros: null, peso_kg: null },
  { articulo: "BONSAI REDONDO NRO.21", medidas: "", material: "Plástico", pintada: false, precio: 3470, litros: null, peso_kg: null },
  { articulo: "BONSAI REDONDO NRO.25", medidas: "", material: "Plástico", pintada: false, precio: 4440, litros: null, peso_kg: null },
  { articulo: "MAC.ROCIO  Nº11", medidas: "", material: "Plástico", pintada: false, precio: 350, litros: null, peso_kg: null },
  { articulo: "MAC.ROCIO Nº12", medidas: "", material: "Plástico", pintada: false, precio: 450, litros: null, peso_kg: null },
  { articulo: "MAC.ROCIO  Nº13", medidas: "", material: "Plástico", pintada: false, precio: 550, litros: null, peso_kg: null },
  { articulo: "MAC.ROCIO Nº14", medidas: "", material: "Plástico", pintada: false, precio: 570, litros: null, peso_kg: null },
  { articulo: "MAC.ROCIO Nº15", medidas: "", material: "Plástico", pintada: false, precio: 670, litros: null, peso_kg: null },
  { articulo: "MAC.ROCIO  Nº19", medidas: "", material: "Plástico", pintada: false, precio: 1300, litros: null, peso_kg: null },
  { articulo: "MAC.ROCIO Nº24", medidas: "", material: "Plástico", pintada: false, precio: 2050, litros: null, peso_kg: null },
  { articulo: "MAC.ROCIO Nº30", medidas: "", material: "Plástico", pintada: false, precio: 4660, litros: null, peso_kg: null },
  { articulo: "MAC.ROCIO Nº35", medidas: "", material: "Plástico", pintada: false, precio: 6790, litros: null, peso_kg: null },
  { articulo: "REGADERA X 2 LTS NOVEDAD", medidas: "", material: "Plástico", pintada: false, precio: 4790, litros: null, peso_kg: null },
  { articulo: "MAC.ROCIO Nº21", medidas: "", material: "Plástico", pintada: false, precio: 1550, litros: null, peso_kg: null },
  { articulo: "REDONDA PREMIUN 08", medidas: "", material: "Plástico", pintada: false, precio: 750, litros: null, peso_kg: null },
  { articulo: "REDONDA PREMIUN 12", medidas: "", material: "Plástico", pintada: false, precio: 1420, litros: null, peso_kg: null },
  { articulo: "REDONDA PREMIUN 16", medidas: "", material: "Plástico", pintada: false, precio: 2300, litros: null, peso_kg: null },
  { articulo: "REDONDA PREMIUN 18", medidas: "", material: "Plástico", pintada: false, precio: 2950, litros: null, peso_kg: null },
  { articulo: "REDONDA PREMIUN 22", medidas: "", material: "Plástico", pintada: false, precio: 5330, litros: null, peso_kg: null },
  { articulo: "REDONDA PREMIUN 27", medidas: "", material: "Plástico", pintada: false, precio: 10090, litros: null, peso_kg: null },
  { articulo: "REGADERA X 5 LTS  NOVEDAD", medidas: "", material: "Plástico", pintada: false, precio: 10150, litros: null, peso_kg: null },
  { articulo: "MAC.ROCIO N*6", medidas: "", material: "Plástico", pintada: false, precio: 130, litros: null, peso_kg: null },
  { articulo: "MAC.ROCIO N*8", medidas: "", material: "Plástico", pintada: false, precio: 210, litros: null, peso_kg: null },
  { articulo: "PREMIUM CLASICA *12", medidas: "", material: "Plástico", pintada: false, precio: 870, litros: null, peso_kg: null },
  { articulo: "PREMIUM CLASICA *16", medidas: "", material: "Plástico", pintada: false, precio: 1610, litros: null, peso_kg: null },
  { articulo: "PREMIUM CLASICA *20", medidas: "", material: "Plástico", pintada: false, precio: 3010, litros: null, peso_kg: null },
  { articulo: "PREMIUM CLASICA *24", medidas: "", material: "Plástico", pintada: false, precio: 5170, litros: null, peso_kg: null },
  { articulo: "PREMIUM CONICA *8", medidas: "", material: "Plástico", pintada: false, precio: 570, litros: null, peso_kg: null },
  { articulo: "PREMIUM CONICA *12", medidas: "", material: "Plástico", pintada: false, precio: 1060, litros: null, peso_kg: null },
  { articulo: "PREMIUM CONICA *16", medidas: "", material: "Plástico", pintada: false, precio: 2030, litros: null, peso_kg: null },
  { articulo: "PREMIUM CONICA *20", medidas: "", material: "Plástico", pintada: false, precio: 3230, litros: null, peso_kg: null },
  { articulo: "REDONDA PREMIUM 35", medidas: "", material: "Plástico", pintada: false, precio: 18750, litros: null, peso_kg: null },
  // ROTOMOLDEADO — RAYUM Andina
  { articulo: "ANDINA N27 RUSTICA", medidas: "", material: "Rotomoldeado", pintada: true, precio: 24960, litros: null, peso_kg: null },
  { articulo: "ANDINA N80 LISO", medidas: "", material: "Rotomoldeado", pintada: true, precio: 255540, litros: null, peso_kg: null },
  { articulo: "ANDINA N40 RUSTICA", medidas: "", material: "Rotomoldeado", pintada: true, precio: 54440, litros: null, peso_kg: null },
  { articulo: "ANDINA N50 RUSTICA", medidas: "", material: "Rotomoldeado", pintada: true, precio: 92920, litros: null, peso_kg: null },
  { articulo: "ANDINA N65 RUSTICA", medidas: "", material: "Rotomoldeado", pintada: true, precio: 184160, litros: null, peso_kg: null },
  { articulo: "ANDINA N80 RUSTICA", medidas: "", material: "Rotomoldeado", pintada: true, precio: 293870, litros: null, peso_kg: null },
  { articulo: "ANDINA N40 LISO", medidas: "", material: "Rotomoldeado", pintada: true, precio: 47340, litros: null, peso_kg: null },
  { articulo: "ANDINA N50 LISO", medidas: "", material: "Rotomoldeado", pintada: true, precio: 80800, litros: null, peso_kg: null },
  { articulo: "ANDINA N65 LISO", medidas: "", material: "Rotomoldeado", pintada: true, precio: 160140, litros: null, peso_kg: null },
  // INSUMOS
  { articulo: "GUANO MURCIELAGO X 250  GRS", medidas: "", material: "Insumos", pintada: false, precio: 13450, litros: null, peso_kg: null },
  { articulo: "PARAISO ORUGUICIDA X 100CC", medidas: "", material: "Insumos", pintada: false, precio: 10650, litros: null, peso_kg: null },
  { articulo: "BTI LARVICIDA INSECTICIDA BIOLOGICO * 30 cc", medidas: "", material: "Insumos", pintada: false, precio: 3720, litros: null, peso_kg: null },
  { articulo: "HUMUS DE LOMBRIS X 500CC", medidas: "", material: "Insumos", pintada: false, precio: 11450, litros: null, peso_kg: null },
  { articulo: "TURBAMAMBO X100CC", medidas: "", material: "Insumos", pintada: false, precio: 6680, litros: null, peso_kg: null },
  { articulo: "MICORRIZAS X 100CC", medidas: "", material: "Insumos", pintada: false, precio: 10480, litros: null, peso_kg: null },
  { articulo: "JABON POTASICO CANELA Y NEEM X 250CC", medidas: "", material: "Insumos", pintada: false, precio: 14510, litros: null, peso_kg: null },
  { articulo: "HUMUS DE LOMBRIS CALIFORNIANA X 250CC", medidas: "", material: "Insumos", pintada: false, precio: 7250, litros: null, peso_kg: null },
  { articulo: "MELAZA ENRIQUECIDA X 200GMS", medidas: "", material: "Insumos", pintada: false, precio: 4160, litros: null, peso_kg: null },
  { articulo: "ACIDO HUMICOS X 100CC", medidas: "", material: "Insumos", pintada: false, precio: 2490, litros: null, peso_kg: null },
  { articulo: "BIOALGAS VEGETATIVO/FLORA/ORQUI/AZALEASY HUERTAS X 100CC", medidas: "", material: "Insumos", pintada: false, precio: 3720, litros: null, peso_kg: null },
  { articulo: "JABON POTASICO NEUTRO X 500CC", medidas: "", material: "Insumos", pintada: false, precio: 24780, litros: null, peso_kg: null },
  { articulo: "JABON POTASICO CANELA Y NEEM X 100CC", medidas: "", material: "Insumos", pintada: false, precio: 7950, litros: null, peso_kg: null },
  { articulo: "JABON POTASICO CANELA Y NEEM X 500CC", medidas: "", material: "Insumos", pintada: false, precio: 25720, litros: null, peso_kg: null },
  { articulo: "TRICHODERMA ENRAIZANTE X 100CC", medidas: "", material: "Insumos", pintada: false, precio: 13470, litros: null, peso_kg: null },
  { articulo: "HORMIGAS CORTADORAS X 200GMS", medidas: "", material: "Insumos", pintada: false, precio: 3640, litros: null, peso_kg: null },
  { articulo: "CACTUS Y SUCULENTAS CONTROL DE PLAGAS X 100CC", medidas: "", material: "Insumos", pintada: false, precio: 2960, litros: null, peso_kg: null },
  { articulo: "BABOSA Y CARACOLES X 100CC", medidas: "", material: "Insumos", pintada: false, precio: 4440, litros: null, peso_kg: null },
  { articulo: "BEAUVERIA X 30CC", medidas: "", material: "Insumos", pintada: false, precio: 4440, litros: null, peso_kg: null },
  { articulo: "BEAUVERIA X 100CC", medidas: "", material: "Insumos", pintada: false, precio: 4720, litros: null, peso_kg: null },
  { articulo: "CONTROL DE PLAGA FOLIAR Y SUELO X 100CC", medidas: "", material: "Insumos", pintada: false, precio: 7850, litros: null, peso_kg: null },
  { articulo: "BOTIQUIN ORGANICO REPELEN/NEEM PURO/GUANO Y ARAÑUELAS X 20CC", medidas: "", material: "Insumos", pintada: false, precio: 6320, litros: null, peso_kg: null },
  { articulo: "BOTIQUIN CON PLAGAS/FERTILIZANTE/MICORRIZA Y TRICHODERMA X 20CC", medidas: "", material: "Insumos", pintada: false, precio: 6320, litros: null, peso_kg: null },
  { articulo: "COMPOSTERO X 30CC", medidas: "", material: "Insumos", pintada: false, precio: 2730, litros: null, peso_kg: null },
  { articulo: "NEEM PURO X 30CC", medidas: "", material: "Insumos", pintada: false, precio: 6380, litros: null, peso_kg: null },
  { articulo: "JABON POTASICO NEUTRO X 100CC", medidas: "", material: "Insumos", pintada: false, precio: 6330, litros: null, peso_kg: null },
  { articulo: "MICORRIZAS X 30CC", medidas: "", material: "Insumos", pintada: false, precio: 5980, litros: null, peso_kg: null },
  { articulo: "MOSCA BLANCA X 30CC", medidas: "", material: "Insumos", pintada: false, precio: 5290, litros: null, peso_kg: null },
  { articulo: "TRICHODERMAS (ENRAIZANTE) X 30CC", medidas: "", material: "Insumos", pintada: false, precio: 6180, litros: null, peso_kg: null },
  { articulo: "ARAÑUELA X 30CC (ACARICIDA)", medidas: "", material: "Insumos", pintada: false, precio: 2820, litros: null, peso_kg: null },
  { articulo: "REPELENTE DE INSECTOS * 30 cc", medidas: "", material: "Insumos", pintada: false, precio: 4990, litros: null, peso_kg: null },
  { articulo: "SAL HIDROPONIA FLORACION * 30 CC", medidas: "", material: "Insumos", pintada: false, precio: 5580, litros: null, peso_kg: null },
  { articulo: "SAL HIDROPONIA VEGETACION * 30 CC", medidas: "", material: "Insumos", pintada: false, precio: 5580, litros: null, peso_kg: null },
  { articulo: "FERTILIZANTE P/CACTUS Y SUCULENTAS * 30 CC", medidas: "", material: "Insumos", pintada: false, precio: 5030, litros: null, peso_kg: null },
  { articulo: "CESPED RECUPERADOR X 250CC", medidas: "", material: "Insumos", pintada: false, precio: 6840, litros: null, peso_kg: null },
  { articulo: "POLYAMINO FERTILIZANTE 100CC", medidas: "", material: "Insumos", pintada: false, precio: 10580, litros: null, peso_kg: null },
  { articulo: "ACRECIO FERTILIZANTE X 100CC", medidas: "", material: "Insumos", pintada: false, precio: 12380, litros: null, peso_kg: null },
  { articulo: "FIXA MZN FERTILIZANTE  100CC", medidas: "", material: "Insumos", pintada: false, precio: 8930, litros: null, peso_kg: null },
  { articulo: "MEGAGREEN FERTILIZANTE POLVO 50GMS", medidas: "", material: "Insumos", pintada: false, precio: 16600, litros: null, peso_kg: null },
  { articulo: "FERTILIZ TOTAL *250CC", medidas: "", material: "Insumos", pintada: false, precio: 8610, litros: null, peso_kg: null },
  { articulo: "FERTILIZ *1000CC FLORA/folla/peton.", medidas: "", material: "Insumos", pintada: false, precio: 22120, litros: null, peso_kg: null },
  { articulo: "FERTILIZ *200 CC FLORA/folla/poten.", medidas: "", material: "Insumos", pintada: false, precio: 7040, litros: null, peso_kg: null },
  { articulo: "FERTILIZ ANTISHOCK *100 CC", medidas: "", material: "Insumos", pintada: false, precio: 12710, litros: null, peso_kg: null },
  { articulo: "FERTILIZ ANTISHOCK *500 CC", medidas: "", material: "Insumos", pintada: false, precio: 47200, litros: null, peso_kg: null },
  { articulo: "FERTILIZ ANTISHOCK *5000 CC.", medidas: "", material: "Insumos", pintada: false, precio: 418950, litros: null, peso_kg: null },
  { articulo: "FERTILIZ BRILLO FOLIAR AEROSOL", medidas: "", material: "Insumos", pintada: false, precio: 17460, litros: null, peso_kg: null },
  { articulo: "FERTILIZ ESPECIAL ORQUIDEAS *200 CM.", medidas: "", material: "Insumos", pintada: false, precio: 11110, litros: null, peso_kg: null },
  { articulo: "FERTILIZ FLOR/POT/FOLLA * 5 LTS", medidas: "", material: "Insumos", pintada: false, precio: 106730, litros: null, peso_kg: null },
  { articulo: "FERTILIZ HIERRO LIQ. *140 CC.", medidas: "", material: "Insumos", pintada: false, precio: 12570, litros: null, peso_kg: null },
  { articulo: "FERTILIZ HIERRO LIQ. *500 CC", medidas: "", material: "Insumos", pintada: false, precio: 34910, litros: null, peso_kg: null },
  { articulo: "FERTILIZ HORMONA *075 CC", medidas: "", material: "Insumos", pintada: false, precio: 11620, litros: null, peso_kg: null },
  { articulo: "FERTILIZ HORMONA *500 CC", medidas: "", material: "Insumos", pintada: false, precio: 47200, litros: null, peso_kg: null },
  { articulo: "FERTILIZ HORMONA X 5 LTS", medidas: "", material: "Insumos", pintada: false, precio: 418950, litros: null, peso_kg: null },
  { articulo: "LJF-HIDROCOMPLEX * 500", medidas: "", material: "Insumos", pintada: false, precio: 5280, litros: null, peso_kg: null },
  { articulo: "LJF-TRIPLE 15 X 25KG", medidas: "", material: "Insumos", pintada: false, precio: 65550, litros: null, peso_kg: null },
  { articulo: "LJF-HIDROCOMPLEX * KG", medidas: "", material: "Insumos", pintada: false, precio: 9890, litros: null, peso_kg: null },
  { articulo: "LJF-H.HUESO *1000 GRS.", medidas: "", material: "Insumos", pintada: false, precio: 4220, litros: null, peso_kg: null },
  { articulo: "LJF-H.HUESO *500 GRS", medidas: "", material: "Insumos", pintada: false, precio: 2390, litros: null, peso_kg: null },
  { articulo: "LJF-HIDROCOMP.*25 KGS. OFERTA", medidas: "", material: "Insumos", pintada: false, precio: 156750, litros: null, peso_kg: null },
  { articulo: "LJF-S.HIERRO *1000GRS", medidas: "", material: "Insumos", pintada: false, precio: 8090, litros: null, peso_kg: null },
  { articulo: "LJF-S.HIERRO *25 KG.  OFERTA", medidas: "", material: "Insumos", pintada: false, precio: 101840, litros: null, peso_kg: null },
  { articulo: "LJF-S.HIERRO *500 GRS", medidas: "", material: "Insumos", pintada: false, precio: 4360, litros: null, peso_kg: null },
  { articulo: "LJF-TRIPLE 15 *1000GRS", medidas: "", material: "Insumos", pintada: false, precio: 6620, litros: null, peso_kg: null },
  { articulo: "LJF-TRIPLE 15 *500 GRS", medidas: "", material: "Insumos", pintada: false, precio: 3640, litros: null, peso_kg: null },
  { articulo: "LJF-UREA *1000GRS", medidas: "", material: "Insumos", pintada: false, precio: 6560, litros: null, peso_kg: null },
  { articulo: "LJF-UREA *500 GRS", medidas: "", material: "Insumos", pintada: false, precio: 3580, litros: null, peso_kg: null },
  { articulo: "LJF-UREA *25KG. OFERTA", medidas: "", material: "Insumos", pintada: false, precio: 74100, litros: null, peso_kg: null },
  { articulo: "GEL FUMIGENO", medidas: "", material: "Insumos", pintada: false, precio: 11600, litros: null, peso_kg: null },
  { articulo: "GEL MATA CUCARACHA  * 60 GRS", medidas: "", material: "Insumos", pintada: false, precio: 19470, litros: null, peso_kg: null },
  { articulo: "GEL AEROSOL INSECTICIDA * 440 ML", medidas: "", material: "Insumos", pintada: false, precio: 12400, litros: null, peso_kg: null },
  { articulo: "GEL CEBO CUCARACHAS BLISTER", medidas: "", material: "Insumos", pintada: false, precio: 3660, litros: null, peso_kg: null },
  { articulo: "GEL MATA CUCARACHA *06 GRS.(GEL)", medidas: "", material: "Insumos", pintada: false, precio: 4690, litros: null, peso_kg: null },
  { articulo: "GEL MATA CUCARACHA *12 GRS.(GEL)", medidas: "", material: "Insumos", pintada: false, precio: 7040, litros: null, peso_kg: null },
  { articulo: "GEL MATA CUCARACHAS X 35 GRS", medidas: "", material: "Insumos", pintada: false, precio: 12310, litros: null, peso_kg: null },
  { articulo: "GEL MATA HORMIGAS *06 GRS.(GEL)", medidas: "", material: "Insumos", pintada: false, precio: 4820, litros: null, peso_kg: null },
  { articulo: "GEL MATA HORMIGAS *12 GRS.(GEL)", medidas: "", material: "Insumos", pintada: false, precio: 7670, litros: null, peso_kg: null },
  { articulo: "GEL MATA HORMIGAS X 40 GRS", medidas: "", material: "Insumos", pintada: false, precio: 15680, litros: null, peso_kg: null },
  { articulo: "GEL RATICIDA BLOQUES *1 KG", medidas: "", material: "Insumos", pintada: false, precio: 39420, litros: null, peso_kg: null },
  { articulo: "GEL RATICIDA BLOQUES * 100  GRS.", medidas: "", material: "Insumos", pintada: false, precio: 5190, litros: null, peso_kg: null },
  { articulo: "GEL RATICIDA BLOQUES * 100  GRS. (ESTUCHE X 10)", medidas: "", material: "Insumos", pintada: false, precio: 51870, litros: null, peso_kg: null },
  { articulo: "X-TERMIXAN *1000 GRS.  POTE", medidas: "", material: "Insumos", pintada: false, precio: 17380, litros: null, peso_kg: null },
  { articulo: "X-TERMIXAN X 50GRS  CEBO 24+6 OFERTA", medidas: "", material: "Insumos", pintada: false, precio: 2610, litros: null, peso_kg: null },
  { articulo: "X-VELOXAN *060 CC. (BIO)", medidas: "", material: "Insumos", pintada: false, precio: 7670, litros: null, peso_kg: null },
  { articulo: "X-VELOXAN *250 CC", medidas: "", material: "Insumos", pintada: false, precio: 16260, litros: null, peso_kg: null },
  { articulo: "X-TERMIXAN BLOQUES *90 GRS.", medidas: "", material: "Insumos", pintada: false, precio: 11010, litros: null, peso_kg: null },
  { articulo: "X-VELOXAN *015 CC. (BIO-FLOABLE)", medidas: "", material: "Insumos", pintada: false, precio: 2430, litros: null, peso_kg: null },
  { articulo: "X-TERMIXAN BLOQUES  * KG 2+1 DE REGALO OFERTA", medidas: "", material: "Insumos", pintada: false, precio: 51920, litros: null, peso_kg: null },
  { articulo: "X-DELTA-PRO", medidas: "", material: "Insumos", pintada: false, precio: 72060, litros: null, peso_kg: null },
  { articulo: "X-FUMIXAN FOG * 120 cc", medidas: "", material: "Insumos", pintada: false, precio: 11430, litros: null, peso_kg: null },
  { articulo: "X-CURABICHERA PLATA MUSTA", medidas: "", material: "Insumos", pintada: false, precio: 14420, litros: null, peso_kg: null },
  { articulo: "X-ESCUDO AEROSOL MOSQUITO", medidas: "", material: "Insumos", pintada: false, precio: 6650, litros: null, peso_kg: null },
  { articulo: "X-PETS X 70CC", medidas: "", material: "Insumos", pintada: false, precio: 7740, litros: null, peso_kg: null },
  { articulo: "X-PETS 100GMS", medidas: "", material: "Insumos", pintada: false, precio: 7630, litros: null, peso_kg: null },
  { articulo: "X-PETS X 120CC", medidas: "", material: "Insumos", pintada: false, precio: 9010, litros: null, peso_kg: null },
  { articulo: "X-SHAMPOO DE BELLEZA X 250CC", medidas: "", material: "Insumos", pintada: false, precio: 7530, litros: null, peso_kg: null },
  { articulo: "X-SHAMPOO PULG-GARRAP X 250CC", medidas: "", material: "Insumos", pintada: false, precio: 8380, litros: null, peso_kg: null },
  { articulo: "X-AVAM X 30CC", medidas: "", material: "Insumos", pintada: false, precio: 9880, litros: null, peso_kg: null },
  { articulo: "X-ACEITE EMULS. *200 CC.", medidas: "", material: "Insumos", pintada: false, precio: 6150, litros: null, peso_kg: null },
  { articulo: "X-ACEITE EMULS. *500 CC.", medidas: "", material: "Insumos", pintada: false, precio: 10510, litros: null, peso_kg: null },
  { articulo: "X-BAB-CARAC. *100 CC.   'L'", medidas: "", material: "Insumos", pintada: false, precio: 7120, litros: null, peso_kg: null },
  { articulo: "X-JABON POTASICO *200CC", medidas: "", material: "Insumos", pintada: false, precio: 10830, litros: null, peso_kg: null },
  { articulo: "X-BAB-CARAC. *200 CC.   'L'", medidas: "", material: "Insumos", pintada: false, precio: 10140, litros: null, peso_kg: null },
  { articulo: "X-SAVIA ANTI-ESTRESS *60CC", medidas: "", material: "Insumos", pintada: false, precio: 5770, litros: null, peso_kg: null },
  { articulo: "X-BAB-CARAC. *200 GRS. (PELLET)", medidas: "", material: "Insumos", pintada: false, precio: 6140, litros: null, peso_kg: null },
  { articulo: "X-REPELENTE INSECTOS *165CC", medidas: "", material: "Insumos", pintada: false, precio: 5990, litros: null, peso_kg: null },
  { articulo: "X-BAB-CARAC. *200 GRS. (POLVO)", medidas: "", material: "Insumos", pintada: false, precio: 3730, litros: null, peso_kg: null },
  { articulo: "X-FIPROFENO CUCARACHICIDA *60CC", medidas: "", material: "Insumos", pintada: false, precio: 7940, litros: null, peso_kg: null },
  { articulo: "X-CAPSULAS *15 UND.     'F'", medidas: "", material: "Insumos", pintada: false, precio: 16380, litros: null, peso_kg: null },
  { articulo: "X-FIPROFENO CUCARACHICIDA *250CC", medidas: "", material: "Insumos", pintada: false, precio: 18900, litros: null, peso_kg: null },
  { articulo: "X-CAPSULAS *15 UND.     'I'", medidas: "", material: "Insumos", pintada: false, precio: 15570, litros: null, peso_kg: null },
  { articulo: "X-FRIPOFENO CUCARACHICIDA *1000CC", medidas: "", material: "Insumos", pintada: false, precio: 59270, litros: null, peso_kg: null },
  { articulo: "X-CIPER *30 CC.", medidas: "", material: "Insumos", pintada: false, precio: 8160, litros: null, peso_kg: null },
  { articulo: "X-BIO NEEM INSECT X20CC", medidas: "", material: "Insumos", pintada: false, precio: 15270, litros: null, peso_kg: null },
  { articulo: "X-DELTA T SINGERIZADO *1000 CC.", medidas: "", material: "Insumos", pintada: false, precio: 69840, litros: null, peso_kg: null },
  { articulo: "X-FORTE *1000 CC.", medidas: "", material: "Insumos", pintada: false, precio: 69430, litros: null, peso_kg: null },
  { articulo: "X-FUMIXAN HOGAR *  50 GRS", medidas: "", material: "Insumos", pintada: false, precio: 11980, litros: null, peso_kg: null },
  { articulo: "X-FUMIXAN PRO", medidas: "", material: "Insumos", pintada: false, precio: 14770, litros: null, peso_kg: null },
  { articulo: "X-FUNGUICIDA SIST. *30 CC.", medidas: "", material: "Insumos", pintada: false, precio: 7490, litros: null, peso_kg: null },
  { articulo: "X-FUNGUICIDA SIST. *60 CC.", medidas: "", material: "Insumos", pintada: false, precio: 9890, litros: null, peso_kg: null },
  { articulo: "X-HERBICIDA SELEC. *100 CC.", medidas: "", material: "Insumos", pintada: false, precio: 9960, litros: null, peso_kg: null },
  { articulo: "X-HERBICIDA SELEC. *200 CC.", medidas: "", material: "Insumos", pintada: false, precio: 15260, litros: null, peso_kg: null },
  { articulo: "X-HERBICIDA SELEC. *500 CC.", medidas: "", material: "Insumos", pintada: false, precio: 27820, litros: null, peso_kg: null },
  { articulo: "X-HERBICIDA T.*100 CC.", medidas: "", material: "Insumos", pintada: false, precio: 11240, litros: null, peso_kg: null },
  { articulo: "X-HERBICIDA T.*200 CC.", medidas: "", material: "Insumos", pintada: false, precio: 18680, litros: null, peso_kg: null },
  { articulo: "X-HERBICIDA T.*500 CC.", medidas: "", material: "Insumos", pintada: false, precio: 39760, litros: null, peso_kg: null },
  { articulo: "X-INSEC-SIST. *30 CC   IMIDA", medidas: "", material: "Insumos", pintada: false, precio: 10980, litros: null, peso_kg: null },
  { articulo: "X-MATA-HORMIGAS *060 CC.", medidas: "", material: "Insumos", pintada: false, precio: 3850, litros: null, peso_kg: null },
  { articulo: "X-MATA-HORMIGAS *120 CC.", medidas: "", material: "Insumos", pintada: false, precio: 5520, litros: null, peso_kg: null },
  { articulo: "X-MATA-HORMIGAS *250 CC.", medidas: "", material: "Insumos", pintada: false, precio: 8910, litros: null, peso_kg: null },
  { articulo: "X-MATA-HORMIGAS *250 GRS. TALQUERA.", medidas: "", material: "Insumos", pintada: false, precio: 4860, litros: null, peso_kg: null },
  { articulo: "X-MATA-HORMIGAS *500 CC.", medidas: "", material: "Insumos", pintada: false, precio: 15660, litros: null, peso_kg: null },
  { articulo: "X-MIREX *100 GRS  OFERTA", medidas: "", material: "Insumos", pintada: false, precio: 1930, litros: null, peso_kg: null },
  { articulo: "X-MIREX *250 GRS 10+5 SUPER OFERTA", medidas: "", material: "Insumos", pintada: false, precio: 3960, litros: null, peso_kg: null },
  { articulo: "X-MOSCAXAN *30 GRS.", medidas: "", material: "Insumos", pintada: false, precio: 5100, litros: null, peso_kg: null },
  { articulo: "X-SISTEMICO *30 CC.     D", medidas: "", material: "Insumos", pintada: false, precio: 7380, litros: null, peso_kg: null },
  { articulo: "X-SISTEMICO *60 CC.     'D'", medidas: "", material: "Insumos", pintada: false, precio: 9980, litros: null, peso_kg: null },
  { articulo: "X-VELOXAN DERRIBANTE X 1 LT SINGERIZADO", medidas: "", material: "Insumos", pintada: false, precio: 61900, litros: null, peso_kg: null },
  { articulo: "X-FUMIXAN FOG * 440cc (AEROSOL)", medidas: "", material: "Insumos", pintada: false, precio: 14250, litros: null, peso_kg: null },
  { articulo: "BABOSIL MP *250 GRS.", medidas: "", material: "Insumos", pintada: false, precio: 5280, litros: null, peso_kg: null },
  { articulo: "ACEITE *200 CC.", medidas: "", material: "Insumos", pintada: false, precio: 5650, litros: null, peso_kg: null },
  { articulo: "ACEITE *500 CC.", medidas: "", material: "Insumos", pintada: false, precio: 9850, litros: null, peso_kg: null },
  { articulo: "BABOSIL SUPER *100 CC.", medidas: "", material: "Insumos", pintada: false, precio: 7400, litros: null, peso_kg: null },
  { articulo: "BABOSIL CEBO *200 GRS.", medidas: "", material: "Insumos", pintada: false, precio: 2750, litros: null, peso_kg: null },
  { articulo: "BABOSIL *250 GRS. PELLET", medidas: "", material: "Insumos", pintada: false, precio: 4690, litros: null, peso_kg: null },
  { articulo: "BABOSIL MP *100 GRS.", medidas: "", material: "Insumos", pintada: false, precio: 2890, litros: null, peso_kg: null },
  { articulo: "BORDELES *100 GRS.", medidas: "", material: "Insumos", pintada: false, precio: 4120, litros: null, peso_kg: null },
  { articulo: "BORDELES *250 GRS.", medidas: "", material: "Insumos", pintada: false, precio: 7820, litros: null, peso_kg: null },
  { articulo: "FOSFATO DIAMONICO *1000 GRS.", medidas: "", material: "Insumos", pintada: false, precio: 8150, litros: null, peso_kg: null },
  { articulo: "FOSFATO DIAMONICO *500 GRS.", medidas: "", material: "Insumos", pintada: false, precio: 4910, litros: null, peso_kg: null },
  { articulo: "POLI *1000 CC.", medidas: "", material: "Insumos", pintada: false, precio: 10480, litros: null, peso_kg: null },
  { articulo: "ZINEB *030 GRS.", medidas: "", material: "Insumos", pintada: false, precio: 3590, litros: null, peso_kg: null },
  { articulo: "ZINEB * 100 GRS.", medidas: "", material: "Insumos", pintada: false, precio: 7180, litros: null, peso_kg: null },
  { articulo: "POLI * 550 CC", medidas: "", material: "Insumos", pintada: false, precio: 6710, litros: null, peso_kg: null },
  { articulo: "HORMIGUICIDA *060", medidas: "", material: "Insumos", pintada: false, precio: 4370, litros: null, peso_kg: null },
  { articulo: "HORMIGUICIDA *120 CC.", medidas: "", material: "Insumos", pintada: false, precio: 6270, litros: null, peso_kg: null },
  { articulo: "HORMIGUICIDA *250 CC.", medidas: "", material: "Insumos", pintada: false, precio: 10330, litros: null, peso_kg: null },
  { articulo: "HORMIGUICIDA *500 CC.", medidas: "", material: "Insumos", pintada: false, precio: 18120, litros: null, peso_kg: null },
  { articulo: "HORMIGUICIDA *1000CC.", medidas: "", material: "Insumos", pintada: false, precio: 31890, litros: null, peso_kg: null },
  { articulo: "HORM *100 GRS. CEBO", medidas: "", material: "Insumos", pintada: false, precio: 2220, litros: null, peso_kg: null },
  { articulo: "HORM *250 GRS. CEBO", medidas: "", material: "Insumos", pintada: false, precio: 4720, litros: null, peso_kg: null },
  { articulo: "HORM *500 GRS. CEBO", medidas: "", material: "Insumos", pintada: false, precio: 7170, litros: null, peso_kg: null },
  { articulo: "HORM *250 GRS. TALQ", medidas: "", material: "Insumos", pintada: false, precio: 5620, litros: null, peso_kg: null },
  { articulo: "HORM *1000GRS. CEBO", medidas: "", material: "Insumos", pintada: false, precio: 12710, litros: null, peso_kg: null },
  { articulo: "HORTAL CAJA CEBADERA RATICIDA", medidas: "", material: "Insumos", pintada: false, precio: 7120, litros: null, peso_kg: null },
  { articulo: "HORTAL FUNGUICIDA AEROSOL", medidas: "", material: "Insumos", pintada: false, precio: 7710, litros: null, peso_kg: null },
  { articulo: "CARABA PELLET X 100GMS", medidas: "", material: "Insumos", pintada: false, precio: 3900, litros: null, peso_kg: null },
  { articulo: "HORTAL BRILLO TOP AEROSOL", medidas: "", material: "Insumos", pintada: false, precio: 9050, litros: null, peso_kg: null },
  { articulo: "DERR-TAL INSECTICIDA X 1LTS NUEVO", medidas: "", material: "Insumos", pintada: false, precio: 27500, litros: null, peso_kg: null },
  { articulo: "PORTA MIREX OFERTA", medidas: "", material: "Insumos", pintada: false, precio: 2130, litros: null, peso_kg: null },
  { articulo: "HOMIGUICIDA POLVO 100GMS", medidas: "", material: "Insumos", pintada: false, precio: 1880, litros: null, peso_kg: null },
  { articulo: "CARABA CEBO X 200GMS 10+2 OFERTA", medidas: "", material: "Insumos", pintada: false, precio: 3010, litros: null, peso_kg: null },
  { articulo: "HORMIGUICIDA POLVO X 500GMS", medidas: "", material: "Insumos", pintada: false, precio: 6150, litros: null, peso_kg: null },
  { articulo: "CARABA PELLETS X 200GMS 10+2 OFERTA", medidas: "", material: "Insumos", pintada: false, precio: 3550, litros: null, peso_kg: null },
  { articulo: "H.RATICIDA * 60 GRS 10+1", medidas: "", material: "Insumos", pintada: false, precio: 1430, litros: null, peso_kg: null },
  { articulo: "H. FIPROMIREX *1KG", medidas: "", material: "Insumos", pintada: false, precio: 12770, litros: null, peso_kg: null },
  { articulo: "H.BOLITA PLUS *100GMS", medidas: "", material: "Insumos", pintada: false, precio: 3110, litros: null, peso_kg: null },
  { articulo: "H.MIREX *1KG", medidas: "", material: "Insumos", pintada: false, precio: 11940, litros: null, peso_kg: null },
  { articulo: "H.FIPROMIREX *250GMS 20+4", medidas: "", material: "Insumos", pintada: false, precio: 3900, litros: null, peso_kg: null },
  { articulo: "H.TRAMPA ADHESIVAS P/RATAS 2UND", medidas: "", material: "Insumos", pintada: false, precio: 11180, litros: null, peso_kg: null },
  { articulo: "H.TROYA X 100GMS 20+4 OFERTA", medidas: "", material: "Insumos", pintada: false, precio: 2630, litros: null, peso_kg: null },
  { articulo: "H.GREEN CHOICE", medidas: "", material: "Insumos", pintada: false, precio: 9570, litros: null, peso_kg: null },
  { articulo: "H.PEGAMENTO P/RATAS X 1LTS", medidas: "", material: "Insumos", pintada: false, precio: 36740, litros: null, peso_kg: null },
  { articulo: "H.PEGAMENTO P/RATAS X 4LTS", medidas: "", material: "Insumos", pintada: false, precio: 135310, litros: null, peso_kg: null },
  { articulo: "H.TROYA X 250GMS", medidas: "", material: "Insumos", pintada: false, precio: 5560, litros: null, peso_kg: null },
  { articulo: "H.HORMIXG.*100CC", medidas: "", material: "Insumos", pintada: false, precio: 5360, litros: null, peso_kg: null },
  { articulo: "H.FIPRO AL 20 PORCIENTO X100CC", medidas: "", material: "Insumos", pintada: false, precio: 41570, litros: null, peso_kg: null },
  { articulo: "H.MICRO PELLETS X 1KG 10+2 OFERTA", medidas: "", material: "Insumos", pintada: false, precio: 24740, litros: null, peso_kg: null },
  { articulo: "H.TROYA X 1KG", medidas: "", material: "Insumos", pintada: false, precio: 16420, litros: null, peso_kg: null },
  { articulo: "H.MICRO PELLETS * 100 GRS  BOLSITA  (AZUL)  20+4 OFERTA", medidas: "", material: "Insumos", pintada: false, precio: 3320, litros: null, peso_kg: null },
  { articulo: "H.HORMIG. *60 CC.", medidas: "", material: "Insumos", pintada: false, precio: 3840, litros: null, peso_kg: null },
  { articulo: "H.CIPER *1 L", medidas: "", material: "Insumos", pintada: false, precio: 47020, litros: null, peso_kg: null },
  { articulo: "H.HORMIG. *120 CC.", medidas: "", material: "Insumos", pintada: false, precio: 5780, litros: null, peso_kg: null },
  { articulo: "H.MICRO PELLETS * 100 GRS (AZUL) CAJITA", medidas: "", material: "Insumos", pintada: false, precio: 4270, litros: null, peso_kg: null },
  { articulo: "H.MICRO PELLETS *250 GRS (AZUL) 20+4 OFERTA", medidas: "", material: "Insumos", pintada: false, precio: 6360, litros: null, peso_kg: null },
  { articulo: "H.MIREX *250 GRS.SULFA *OFERTA*  20+4 REGALO", medidas: "", material: "Insumos", pintada: false, precio: 3900, litros: null, peso_kg: null },
  { articulo: "H.TALQ *250 GRS.", medidas: "", material: "Insumos", pintada: false, precio: 4400, litros: null, peso_kg: null },
  { articulo: "H.HORMIG. * 250 CC.", medidas: "", material: "Insumos", pintada: false, precio: 8850, litros: null, peso_kg: null },
  { articulo: "H.HORMIG. * 500CC", medidas: "", material: "Insumos", pintada: false, precio: 15570, litros: null, peso_kg: null },
  { articulo: "H.MIREX * 100 GRS SULFA  *OFERTA*  20+4 REGALO", medidas: "", material: "Insumos", pintada: false, precio: 1930, litros: null, peso_kg: null },
  { articulo: "H.MOSQUICIDA FREE AIR", medidas: "", material: "Insumos", pintada: false, precio: 2510, litros: null, peso_kg: null },
  { articulo: "JF ABONO ESPECIAL * 120CC", medidas: "", material: "Insumos", pintada: false, precio: 4810, litros: null, peso_kg: null },
  { articulo: "JF ABONO ESPECIAL * 260CC", medidas: "", material: "Insumos", pintada: false, precio: 6410, litros: null, peso_kg: null },
  { articulo: "JF BONSAI-CACTUS-HORQUIDEA  * 260 CC.", medidas: "", material: "Insumos", pintada: false, precio: 7480, litros: null, peso_kg: null },
  { articulo: "JF AZULADOR DE HORTENSIAS *300 GRS.", medidas: "", material: "Insumos", pintada: false, precio: 6950, litros: null, peso_kg: null },
  { articulo: "JF CITRICOS *260 CC, AZALEA 260CC, HELECHO 260CC, JAZMIN 260CC, ROSALES 260CC", medidas: "", material: "Insumos", pintada: false, precio: 6410, litros: null, peso_kg: null },
  { articulo: "JF FERTILIZ.CRECIMI.INTEGRAL *250 CC.", medidas: "", material: "Insumos", pintada: false, precio: 6410, litros: null, peso_kg: null },
  { articulo: "JF FERTILIZ.TIERRA Y RAICES 250CC.", medidas: "", material: "Insumos", pintada: false, precio: 6410, litros: null, peso_kg: null },
  { articulo: "JF HORMONA POLVO *025 GRS.", medidas: "", material: "Insumos", pintada: false, precio: 8550, litros: null, peso_kg: null },
  { articulo: "JF LUSTRE VEGETAL      (AEROSOL)", medidas: "", material: "Insumos", pintada: false, precio: 14960, litros: null, peso_kg: null },
  { articulo: "JF LUSTRE VEGETAL * 120CC", medidas: "", material: "Insumos", pintada: false, precio: 4810, litros: null, peso_kg: null },
  { articulo: "JF ABONO X 200CC FLORACION -FOLLAJE-HORMONA", medidas: "", material: "Insumos", pintada: false, precio: 5880, litros: null, peso_kg: null },
  { articulo: "JF ABONO X 1LTS FLORA-FOLLAJE-HORMONA", medidas: "", material: "Insumos", pintada: false, precio: 16030, litros: null, peso_kg: null },
  { articulo: "ACEITE X 100 CC OIL 85", medidas: "", material: "Insumos", pintada: false, precio: 7380, litros: null, peso_kg: null },
  { articulo: "GRILLO *500 GRS", medidas: "", material: "Insumos", pintada: false, precio: 47400, litros: null, peso_kg: null },
  { articulo: "GRILLO *980 GRS", medidas: "", material: "Insumos", pintada: false, precio: 74160, litros: null, peso_kg: null },
  { articulo: "KAOTRINA X 60 CC", medidas: "", material: "Insumos", pintada: false, precio: 7410, litros: null, peso_kg: null },
  { articulo: "B+R *100 GRS          (ESTUCHE)", medidas: "", material: "Insumos", pintada: false, precio: 6970, litros: null, peso_kg: null },
  { articulo: "BRILLO EN AEROSOL", medidas: "", material: "Insumos", pintada: false, precio: 13670, litros: null, peso_kg: null },
  { articulo: "BOLITA * 100 GRS.", medidas: "", material: "Insumos", pintada: false, precio: 9470, litros: null, peso_kg: null },
  { articulo: "KAOTRINA * 15 ML", medidas: "", material: "Insumos", pintada: false, precio: 1740, litros: null, peso_kg: null },
  { articulo: "KAOTRINA * 250 CC", medidas: "", material: "Insumos", pintada: false, precio: 14960, litros: null, peso_kg: null },
  { articulo: "HORMIGUICIDA X 60CC KAPUT", medidas: "", material: "Insumos", pintada: false, precio: 3600, litros: null, peso_kg: null },
  { articulo: "SISTEMICO *030 CC. ' D ' (pulgon/cochinilla) PROMO 16+4 DE REGALO", medidas: "", material: "Insumos", pintada: false, precio: 8120, litros: null, peso_kg: null },
  { articulo: "HERBICIDA SELECTIVO X 100 CC", medidas: "", material: "Insumos", pintada: false, precio: 9770, litros: null, peso_kg: null },
  { articulo: "CONFIDOR *30 CM", medidas: "", material: "Insumos", pintada: false, precio: 14420, litros: null, peso_kg: null },
  { articulo: "ACEITE X 200 CC OIL 85", medidas: "", material: "Insumos", pintada: false, precio: 12300, litros: null, peso_kg: null },
  { articulo: "VITAL  FITORREGULADOR *30 CC.", medidas: "", material: "Insumos", pintada: false, precio: 9950, litros: null, peso_kg: null },
  { articulo: "FUNGUICIDA *030 GRS. 'K'", medidas: "", material: "Insumos", pintada: false, precio: 17370, litros: null, peso_kg: null },
  { articulo: "FUNGUICIDA *20 CC  (FOLI)", medidas: "", material: "Insumos", pintada: false, precio: 18620, litros: null, peso_kg: null },
  { articulo: "GRILLO *200 GRS.      (ESTUCHE)", medidas: "", material: "Insumos", pintada: false, precio: 23930, litros: null, peso_kg: null },
  { articulo: "HERBICIDA TOTAL. SIST. G  *100 CC.", medidas: "", material: "Insumos", pintada: false, precio: 11430, litros: null, peso_kg: null },
  { articulo: "FUNGUICIDA SISTEMICO *30 CC  H PROMO 16+4 DE REGALO", medidas: "", material: "Insumos", pintada: false, precio: 7510, litros: null, peso_kg: null },
  { articulo: "INSEC-ACAR *020 CC. 'ABA'", medidas: "", material: "Insumos", pintada: false, precio: 13170, litros: null, peso_kg: null },
  { articulo: "INSECTICIDA *030 CC. 'Z'", medidas: "", material: "Insumos", pintada: false, precio: 9220, litros: null, peso_kg: null },
  { articulo: "SMARTER X 250CC", medidas: "", material: "Insumos", pintada: false, precio: 8890, litros: null, peso_kg: null },
  { articulo: "HORMIGUICIDA X 100CC KAPUT", medidas: "", material: "Insumos", pintada: false, precio: 5040, litros: null, peso_kg: null },
  { articulo: "LECITHIN X 60cc *NUEVO*", medidas: "", material: "Insumos", pintada: false, precio: 13430, litros: null, peso_kg: null },
  { articulo: "AMINO X 100cc *NUEVO*", medidas: "", material: "Insumos", pintada: false, precio: 12730, litros: null, peso_kg: null },
  { articulo: "TRICO TRAP X 30cc", medidas: "", material: "Insumos", pintada: false, precio: 12290, litros: null, peso_kg: null },
  { articulo: "BIO TRAP X 30cc", medidas: "", material: "Insumos", pintada: false, precio: 10560, litros: null, peso_kg: null },
  { articulo: "MIREX X 100GMS", medidas: "", material: "Insumos", pintada: false, precio: 2590, litros: null, peso_kg: null },
  { articulo: "MX 100CC", medidas: "", material: "Insumos", pintada: false, precio: 8820, litros: null, peso_kg: null },
  { articulo: "MYRMEC. X 100GMS 40+10 DE REGALO", medidas: "", material: "Insumos", pintada: false, precio: 2560, litros: null, peso_kg: null },
  { articulo: "MYRMEC. X 750GMS 20+5 DE REGALO", medidas: "", material: "Insumos", pintada: false, precio: 9420, litros: null, peso_kg: null },
  { articulo: "MYRMEC. X 200GMS 20+5 DE REGALO", medidas: "", material: "Insumos", pintada: false, precio: 4070, litros: null, peso_kg: null },
  { articulo: "MYRMEC. BABOSA Y CARACOL X 100GMS 40+10 DE REGALO", medidas: "", material: "Insumos", pintada: false, precio: 3230, litros: null, peso_kg: null },
  { articulo: "MYRMEC. BICHO BOLITA X 100GMS", medidas: "", material: "Insumos", pintada: false, precio: 2970, litros: null, peso_kg: null },
  { articulo: "MYRMEC. X 500GMS 40+10 DE REGALO", medidas: "", material: "Insumos", pintada: false, precio: 7580, litros: null, peso_kg: null },
  { articulo: "MYRMEC. X20KG", medidas: "", material: "Insumos", pintada: false, precio: 209980, litros: null, peso_kg: null },
  { articulo: "MYRMEC. X 4KGS 4+1 DE REGALO", medidas: "", material: "Insumos", pintada: false, precio: 47880, litros: null, peso_kg: null },
  { articulo: "J-PERLITA *3DM NUTRI VIDA", medidas: "", material: "Insumos", pintada: false, precio: 2140, litros: null, peso_kg: null },
  { articulo: "J-PERLITA PERLINO *25DM", medidas: "", material: "Insumos", pintada: false, precio: 14820, litros: null, peso_kg: null },
  { articulo: "J-PERLITA PERLINO *50DM", medidas: "", material: "Insumos", pintada: false, precio: 15200, litros: null, peso_kg: null },
  { articulo: "J-PERLITA PERLINO *125DM", medidas: "", material: "Insumos", pintada: false, precio: 30900, litros: null, peso_kg: null },
  { articulo: "J-POMEX NUTRI VIDA *3DM", medidas: "", material: "Insumos", pintada: false, precio: 2560, litros: null, peso_kg: null },
  { articulo: "J-POMEX *10DM", medidas: "", material: "Insumos", pintada: false, precio: 7600, litros: null, peso_kg: null },
  { articulo: "J-POMEX *50DM", medidas: "", material: "Insumos", pintada: false, precio: 23210, litros: null, peso_kg: null },
  { articulo: "J-POMEX *25DM", medidas: "", material: "Insumos", pintada: false, precio: 16150, litros: null, peso_kg: null },
  { articulo: "J-TIERRA * 50 DM3", medidas: "", material: "Insumos", pintada: false, precio: 10740, litros: null, peso_kg: null },
  { articulo: "J-PAN DE BARRO", medidas: "", material: "Insumos", pintada: false, precio: 5560, litros: null, peso_kg: null },
  { articulo: "J-HUMUS X 12DM", medidas: "", material: "Insumos", pintada: false, precio: 6840, litros: null, peso_kg: null },
  { articulo: "J-PINOCHA X 10DM", medidas: "", material: "Insumos", pintada: false, precio: 1850, litros: null, peso_kg: null },
  { articulo: "J-COMPUESTO ORGANICO *05 DM3", medidas: "", material: "Insumos", pintada: false, precio: 2560, litros: null, peso_kg: null },
  { articulo: "J-COMPUESTO ORGANICO *10 DM3", medidas: "", material: "Insumos", pintada: false, precio: 3420, litros: null, peso_kg: null },
  { articulo: "J-COMPUESTO ORGANICO *25 DM3", medidas: "", material: "Insumos", pintada: false, precio: 6410, litros: null, peso_kg: null },
  { articulo: "J-COMPUESTO ORGANICO *50 DM3", medidas: "", material: "Insumos", pintada: false, precio: 12740, litros: null, peso_kg: null },
  { articulo: "J-HUMUS *02 DM3 x 12", medidas: "", material: "Insumos", pintada: false, precio: 1310, litros: null, peso_kg: null },
  { articulo: "J-HUMUS *05 DM3", medidas: "", material: "Insumos", pintada: false, precio: 3140, litros: null, peso_kg: null },
  { articulo: "J-HUMUS *25 DM3", medidas: "", material: "Insumos", pintada: false, precio: 11680, litros: null, peso_kg: null },
  { articulo: "J-PINO *05 DM3", medidas: "", material: "Insumos", pintada: false, precio: 3560, litros: null, peso_kg: null },
  { articulo: "J-PINO *25 DM3", medidas: "", material: "Insumos", pintada: false, precio: 7550, litros: null, peso_kg: null },
  { articulo: "J-RESACA *05 DM3", medidas: "", material: "Insumos", pintada: false, precio: 2560, litros: null, peso_kg: null },
  { articulo: "J-RESACA *25 DM3", medidas: "", material: "Insumos", pintada: false, precio: 6410, litros: null, peso_kg: null },
  { articulo: "J-SUSTRATO ORQUIDEAS X *3 DM ECO", medidas: "", material: "Insumos", pintada: false, precio: 2710, litros: null, peso_kg: null },
  { articulo: "J-TIERRA *05 DM3", medidas: "", material: "Insumos", pintada: false, precio: 2220, litros: null, peso_kg: null },
  { articulo: "J-TIERRA *10 DM3", medidas: "", material: "Insumos", pintada: false, precio: 2990, litros: null, peso_kg: null },
  { articulo: "J-TIERRA *25 DM3", medidas: "", material: "Insumos", pintada: false, precio: 5420, litros: null, peso_kg: null },
  { articulo: "J-SUSTRATO HIDROPONIA *03 DM", medidas: "", material: "Insumos", pintada: false, precio: 2460, litros: null, peso_kg: null },
  { articulo: "J-TURBA JOR *25DM", medidas: "", material: "Insumos", pintada: false, precio: 13680, litros: null, peso_kg: null },
  { articulo: "J-TURBA JOR *5DM", medidas: "", material: "Insumos", pintada: false, precio: 5390, litros: null, peso_kg: null },
  { articulo: "J-TURBA JOR *10DM", medidas: "", material: "Insumos", pintada: false, precio: 9860, litros: null, peso_kg: null },
  { articulo: "J-TURBA JOR *120DM", medidas: "", material: "Insumos", pintada: false, precio: 31350, litros: null, peso_kg: null },
  { articulo: "J-TURBA NUTRI VIDA *3DM", medidas: "", material: "Insumos", pintada: false, precio: 2780, litros: null, peso_kg: null },
  { articulo: "J-TURBA *4DM", medidas: "", material: "Insumos", pintada: false, precio: 2280, litros: null, peso_kg: null },
  { articulo: "J-TURBA RULO JOR *100DM", medidas: "", material: "Insumos", pintada: false, precio: 61280, litros: null, peso_kg: null },
  { articulo: "J-TURBA SPAGNU RULO ECO *3DM", medidas: "", material: "Insumos", pintada: false, precio: 4230, litros: null, peso_kg: null },
  { articulo: "J-TURBA SPAGNU RULO JOR *80DM", medidas: "", material: "Insumos", pintada: false, precio: 48450, litros: null, peso_kg: null },
  { articulo: "J-TURBA JOR *2.5DM", medidas: "", material: "Insumos", pintada: false, precio: 2140, litros: null, peso_kg: null },
  { articulo: "TUTORES *160 CM", medidas: "", material: "Insumos", pintada: false, precio: 11400, litros: null, peso_kg: null },
  { articulo: "TUTORES *120CM", medidas: "", material: "Insumos", pintada: false, precio: 8260, litros: null, peso_kg: null },
  { articulo: "TUTORES *140CM", medidas: "", material: "Insumos", pintada: false, precio: 9980, litros: null, peso_kg: null },
  { articulo: "TUTORES *040 CM.", medidas: "", material: "Insumos", pintada: false, precio: 3280, litros: null, peso_kg: null },
  { articulo: "TUTORES *060 CM", medidas: "", material: "Insumos", pintada: false, precio: 4280, litros: null, peso_kg: null },
  { articulo: "TUTORES *080 CM", medidas: "", material: "Insumos", pintada: false, precio: 5700, litros: null, peso_kg: null },
  { articulo: "TUTORES *100 CM", medidas: "", material: "Insumos", pintada: false, precio: 6560, litros: null, peso_kg: null },
  { articulo: "J-VERMICULITA NUTRI VIDA *3DM", medidas: "", material: "Insumos", pintada: false, precio: 6610, litros: null, peso_kg: null },
  { articulo: "J-VERMICULITA *25DM", medidas: "", material: "Insumos", pintada: false, precio: 38000, litros: null, peso_kg: null },
  { articulo: "J-VERMICULITA 50DM", medidas: "", material: "Insumos", pintada: false, precio: 71310, litros: null, peso_kg: null },
  { articulo: "J-VERCULITA *125DM", medidas: "", material: "Insumos", pintada: false, precio: 178270, litros: null, peso_kg: null },
  { articulo: "D-INSECTICIDA BOLSA X 1KG", medidas: "", material: "Insumos", pintada: false, precio: 10290, litros: null, peso_kg: null },
  { articulo: "D-INSECTICIDA X BOLSA X 250GMS", medidas: "", material: "Insumos", pintada: false, precio: 5590, litros: null, peso_kg: null },
  { articulo: "D-INSECTICIDA TALQUERA X 200GMS", medidas: "", material: "Insumos", pintada: false, precio: 9460, litros: null, peso_kg: null },
  { articulo: "D-INSECTICIDA  FERTILIZANTE X 2KG", medidas: "", material: "Insumos", pintada: false, precio: 12660, litros: null, peso_kg: null },
  { articulo: "D-HUMUS BIOESTIMULANTE BOTELLA X 1LTS", medidas: "", material: "Insumos", pintada: false, precio: 12390, litros: null, peso_kg: null },
  { articulo: "D-HUMUS X 250CC LIQUIDO", medidas: "", material: "Insumos", pintada: false, precio: 5150, litros: null, peso_kg: null },
  { articulo: "J-CHIP *10DM", medidas: "", material: "Insumos", pintada: false, precio: 2990, litros: null, peso_kg: null },
  { articulo: "J-CHIP *100DM", medidas: "", material: "Insumos", pintada: false, precio: 21380, litros: null, peso_kg: null },
  { articulo: "J-CHIP *25DM", medidas: "", material: "Insumos", pintada: false, precio: 6470, litros: null, peso_kg: null },
  { articulo: "J-CHIP *03 DM NUTRI VIDA", medidas: "", material: "Insumos", pintada: false, precio: 2090, litros: null, peso_kg: null },
  { articulo: "J-CHIP *120 DM", medidas: "", material: "Insumos", pintada: false, precio: 25940, litros: null, peso_kg: null },
  { articulo: "J-CHIP *25 DM MULCHIN FINO", medidas: "", material: "Insumos", pintada: false, precio: 5980, litros: null, peso_kg: null },
  { articulo: "J-CHIP *60 DM", medidas: "", material: "Insumos", pintada: false, precio: 13400, litros: null, peso_kg: null },
  { articulo: "DROP RESIDUAL X 100CC", medidas: "", material: "Insumos", pintada: false, precio: 4060, litros: null, peso_kg: null },
  { articulo: "DROP DERRIBANTE X 100CC", medidas: "", material: "Insumos", pintada: false, precio: 5270, litros: null, peso_kg: null },
  { articulo: "DROP PASTA RATICIDA", medidas: "", material: "Insumos", pintada: false, precio: 6140, litros: null, peso_kg: null },
  { articulo: "MUSGO BOLSA 25DM", medidas: "", material: "Insumos", pintada: false, precio: 9980, litros: null, peso_kg: null },
];

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
