/* "Monte aqui": kit de churrasco e tábua de frios montados pelo cliente, reservados pelo WhatsApp. */
(() => {
  const raiz = document.querySelector("[data-montar]");
  if (!raiz) return;
  const S = window.SITE || {};

  /* ── Catálogo ─────────────────────────────────────────────────────────── */
  // porcao: quantidade por pessoa (g ou un). unidade: "g" | "un". Ícones desenhados em SVG abaixo.
  const CATALOGO = {
    churrasco: [
      { id: "picanha",   nome: "Picanha",                porcao: 300, unidade: "g",  icone: "picanha",  dica: "A rainha do espeto, com capa de gordura" },
      { id: "costela",   nome: "Costela",                porcao: 350, unidade: "g",  icone: "costela",  dica: "Para o fogo lento, osso e sabor" },
      { id: "fraldinha", nome: "Fraldinha",              porcao: 250, unidade: "g",  icone: "fraldinha", dica: "Macia, rápida na grelha" },
      { id: "ancho",     nome: "Bife ancho",             porcao: 300, unidade: "g",  icone: "ancho",    dica: "Marmorizado, para quem gosta de ponto" },
      { id: "linguica",  nome: "Linguiça Borrússia",     porcao: 150, unidade: "g",  icone: "linguica", dica: "A colonial da casa" },
      { id: "coracao",   nome: "Coração de frango",      porcao: 120, unidade: "g",  icone: "coracao",  dica: "Temperado, pronto para o espeto" },
      { id: "queijo",    nome: "Queijo coalho",          porcao: 100, unidade: "g",  icone: "coalho",   dica: "Dourado na brasa" },
      { id: "pao",       nome: "Pão de alho",            porcao: 1,   unidade: "un", icone: "pao",      dica: "Da padaria da loja" },
      { id: "farofa",    nome: "Farofa Borrússia",       porcao: 60,  unidade: "g",  icone: "farofa",   dica: "Crocante, com linguiça" },
      { id: "vinagrete", nome: "Vinagrete",              porcao: 60,  unidade: "g",  icone: "vinagrete", dica: "Feito na hora" },
      { id: "sal",       nome: "Sal grosso",             porcao: 1,   unidade: "pct", icone: "sal",     dica: "1 kg, parrilla" , fixo: 1 },
      { id: "carvao",    nome: "Carvão",                 porcao: 1,   unidade: "pct", icone: "carvao",  dica: "Saco de 5 kg", fixo: 1 },
    ],
    tabua: [
      { id: "salame",    nome: "Salame colonial",        porcao: 50,  unidade: "g",  icone: "salame",   dica: "Borrússia, fatiado fino" },
      { id: "copa",      nome: "Copa",                   porcao: 40,  unidade: "g",  icone: "copa",     dica: "Curada no tempo certo" },
      { id: "provolone", nome: "Provolone",              porcao: 50,  unidade: "g",  icone: "provolone", dica: "Della Vita" },
      { id: "gouda",     nome: "Gouda",                  porcao: 50,  unidade: "g",  icone: "gouda",    dica: "Della Vita, suave" },
      { id: "gruyere",   nome: "Gruyère",                porcao: 40,  unidade: "g",  icone: "gruyere",  dica: "Para quem gosta de queijo forte" },
      { id: "colonial",  nome: "Queijo colonial",        porcao: 50,  unidade: "g",  icone: "colonial", dica: "Da serra" },
      { id: "azeitona",  nome: "Azeitonas",              porcao: 30,  unidade: "g",  icone: "azeitona", dica: "Pretas e verdes" },
      { id: "geleia",    nome: "Geleia de pimenta",      porcao: 1,   unidade: "pt", icone: "geleia",   dica: "Pote da casa", fixo: 1 },
      { id: "torrada",   nome: "Torradas e grissini",    porcao: 40,  unidade: "g",  icone: "torrada",  dica: "Da padaria" },
      { id: "uva",       nome: "Uvas e figos",           porcao: 60,  unidade: "g",  icone: "uva",      dica: "Fruta da estação" },
      { id: "castanha",  nome: "Castanhas",              porcao: 25,  unidade: "g",  icone: "castanha", dica: "Mix torrado" },
      { id: "vinho",     nome: "Vinho tinto",            porcao: 1,   unidade: "gf", icone: "vinho",    dica: "Sugestão do sommelier", fixo: 1 },
    ],
  };

  /* ── Ícones (SVG) ─────────────────────────────────────────────────────── */
  const V = (corpo) => `<svg viewBox="0 0 100 100" aria-hidden="true">${corpo}</svg>`;
  const ICONES = {
    picanha: V(`<path d="M14 60c4-22 22-36 46-36 18 0 30 10 30 24 0 16-14 26-40 28C28 78 12 74 14 60z" fill="#a8302e"/><path d="M14 60c4-22 22-36 46-36 18 0 30 10 30 24 0 3-1 6-2 8C76 42 60 36 44 40 32 44 24 52 20 66c-4-1-6-3-6-6z" fill="#f1dcc7"/><path d="M34 54c8-6 20-8 32-4M30 64c10-6 24-8 36-6" stroke="#f3cfc0" stroke-width="2" fill="none" stroke-linecap="round" opacity=".7"/>`),
    costela: V(`<path d="M12 40c0-8 6-14 14-14h48c8 0 14 6 14 14v22c0 8-6 14-14 14H26c-8 0-14-6-14-14z" fill="#9a2c2b"/><g fill="#f1dcc7"><rect x="22" y="30" width="8" height="42" rx="4"/><rect x="40" y="30" width="8" height="42" rx="4"/><rect x="58" y="30" width="8" height="42" rx="4"/><rect x="76" y="30" width="6" height="42" rx="3"/></g>`),
    fraldinha: V(`<path d="M10 56c10-18 30-30 56-30 12 0 22 6 24 16 2 12-10 24-32 30C36 78 16 74 10 56z" fill="#b03532"/><path d="M22 52c12-12 30-18 48-16" stroke="#f3cfc0" stroke-width="2.5" fill="none" stroke-linecap="round" opacity=".6"/><path d="M26 64c12-10 30-14 46-12" stroke="#f3cfc0" stroke-width="2.5" fill="none" stroke-linecap="round" opacity=".6"/>`),
    ancho: V(`<path d="M18 50c0-16 14-28 32-28s32 12 32 28-14 28-32 28S18 66 18 50z" fill="#a8302e"/><path d="M26 44c6-10 16-14 24-12-10 2-18 8-20 16-2 6 0 12 4 16-6-4-10-12-8-20z" fill="#f1dcc7"/><path d="M40 56c8-4 18-4 26 0M44 64c6-3 12-3 18 0" stroke="#f3cfc0" stroke-width="2" fill="none" stroke-linecap="round" opacity=".7"/>`),
    linguica: V(`<path d="M14 62c0-14 12-24 26-20 6 2 10 6 12 12 2 6 6 10 12 12 14 4 26-6 26-20" stroke="#8f2a26" stroke-width="16" fill="none" stroke-linecap="round"/><path d="M14 62c0-14 12-24 26-20 6 2 10 6 12 12 2 6 6 10 12 12 14 4 26-6 26-20" stroke="#c94a44" stroke-width="8" fill="none" stroke-linecap="round" opacity=".6"/><circle cx="24" cy="54" r="2" fill="#f1dcc7"/><circle cx="36" cy="48" r="2" fill="#f1dcc7"/><circle cx="68" cy="58" r="2" fill="#f1dcc7"/><circle cx="80" cy="50" r="2" fill="#f1dcc7"/>`),
    coracao: V(`<path d="M50 80 22 52c-8-8-8-20 0-28 7-7 18-7 26 0l2 2 2-2c8-7 19-7 26 0 8 8 8 20 0 28z" fill="#9a2c2b"/><path d="M34 34c-4 0-8 4-8 9" stroke="#e38f86" stroke-width="3" fill="none" stroke-linecap="round" opacity=".7"/>`),
    coalho: V(`<path d="M30 20h40v60H30z" fill="#e7c37a"/><path d="M30 20h40l-6 8H36z" fill="#f3dca4"/><path d="M36 34h28M36 46h28M36 58h28M36 70h28" stroke="#b58a3a" stroke-width="3" stroke-linecap="round" opacity=".7"/><rect x="47" y="8" width="6" height="14" rx="2" fill="#6e4526"/>`),
    pao: V(`<path d="M10 56c0-14 18-26 40-26s40 12 40 26-18 22-40 22S10 70 10 56z" fill="#d29a5b"/><path d="M24 44c8-8 44-8 52 0" stroke="#f0c48a" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M30 54c6 2 10 2 16-2M52 52c6 2 10 2 16-2" stroke="#8a5a2a" stroke-width="2" fill="none" stroke-linecap="round" opacity=".6"/>`),
    farofa: V(`<path d="M16 50h68l-8 28H24z" fill="#5c3a1f"/><path d="M12 44h76v8H12z" fill="#7a4f2a"/><ellipse cx="50" cy="44" rx="34" ry="8" fill="#e2b56a"/><g fill="#b47a35"><circle cx="34" cy="42" r="2"/><circle cx="46" cy="40" r="2"/><circle cx="58" cy="43" r="2"/><circle cx="68" cy="41" r="2"/></g>`),
    vinagrete: V(`<path d="M16 50h68l-8 28H24z" fill="#5c3a1f"/><path d="M12 44h76v8H12z" fill="#7a4f2a"/><ellipse cx="50" cy="44" rx="34" ry="8" fill="#d9413a"/><g><circle cx="34" cy="43" r="4" fill="#f3ece4"/><circle cx="50" cy="40" r="4" fill="#6aa84f"/><circle cx="64" cy="44" r="4" fill="#f3ece4"/><circle cx="42" cy="47" r="3" fill="#6aa84f"/></g>`),
    sal: V(`<path d="M34 22h32v10H34z" fill="#8a8a8a"/><path d="M28 32h44v44a6 6 0 0 1-6 6H34a6 6 0 0 1-6-6z" fill="#e9e4dc"/><path d="M36 42h28M36 52h28M36 62h20" stroke="#b3292e" stroke-width="3" stroke-linecap="round"/>`),
    carvao: V(`<path d="M22 34h56l6 46H16z" fill="#2b2326"/><path d="M22 34h56l-4-10H26z" fill="#3b3135"/><g fill="#141012"><path d="M34 54l10-8 10 6-6 10-12 2z"/><path d="M56 48l12-4 6 10-8 8-10-4z"/></g><path d="M40 70h20" stroke="#b3292e" stroke-width="3" stroke-linecap="round"/>`),
    salame: V(`<circle cx="50" cy="50" r="32" fill="#8f2a26"/><circle cx="50" cy="50" r="27" fill="#b84440"/><g fill="#f1dcc7"><circle cx="40" cy="42" r="4"/><circle cx="58" cy="38" r="3"/><circle cx="62" cy="56" r="4"/><circle cx="44" cy="60" r="3"/><circle cx="52" cy="50" r="2.5"/><circle cx="34" cy="54" r="2.5"/></g>`),
    copa: V(`<circle cx="50" cy="50" r="32" fill="#7d2420"/><circle cx="50" cy="50" r="27" fill="#a3332f"/><path d="M30 44c10-6 30-6 40 0M28 56c12 6 32 6 44 0M44 30c4 12 4 28 0 40M58 30c-4 12-4 28 0 40" stroke="#f1dcc7" stroke-width="3" fill="none" stroke-linecap="round" opacity=".8"/>`),
    provolone: V(`<path d="M50 18 86 72H14z" fill="#f0d79a"/><path d="M50 18 86 72c-24 6-48 6-72 0z" fill="#e5c67e"/><path d="M26 66h48" stroke="#c9a65a" stroke-width="3" stroke-linecap="round" opacity=".6"/>`),
    gouda: V(`<path d="M14 54c0-14 16-24 36-24s36 10 36 24-16 24-36 24S14 68 14 54z" fill="#e7a13a"/><path d="M14 54c0-14 16-24 36-24s36 10 36 24c0 4-2 8-4 10-4-10-16-16-32-16S22 54 18 64c-2-2-4-6-4-10z" fill="#f4c360"/><circle cx="36" cy="60" r="3" fill="#c8842a" opacity=".6"/><circle cx="60" cy="64" r="3" fill="#c8842a" opacity=".6"/>`),
    gruyere: V(`<path d="M12 70 50 26l38 44z" fill="#f2dd9c"/><path d="M12 70 50 26c4 8 4 24 0 44z" fill="#e8cc82"/><g fill="#d7b964"><circle cx="40" cy="58" r="4"/><circle cx="58" cy="52" r="3"/><circle cx="66" cy="64" r="4"/><circle cx="48" cy="44" r="2.5"/></g>`),
    colonial: V(`<path d="M16 50h68v18a6 6 0 0 1-6 6H22a6 6 0 0 1-6-6z" fill="#efd9a0"/><ellipse cx="50" cy="50" rx="34" ry="12" fill="#f7e8bd"/><path d="M26 50c6 4 42 4 48 0" stroke="#d9bf7c" stroke-width="2" fill="none" opacity=".7"/>`),
    azeitona: V(`<path d="M20 54h60l-6 24H26z" fill="#3a2d31"/><ellipse cx="50" cy="54" rx="30" ry="8" fill="#4a3b40"/><g><ellipse cx="38" cy="50" rx="7" ry="5" fill="#1f2a1d"/><ellipse cx="54" cy="47" rx="7" ry="5" fill="#5f8a3b"/><ellipse cx="66" cy="52" rx="7" ry="5" fill="#1f2a1d"/><ellipse cx="46" cy="55" rx="6" ry="4.5" fill="#5f8a3b"/></g>`),
    geleia: V(`<path d="M34 24h32v8H34z" fill="#6e4526"/><path d="M28 32h44v38a8 8 0 0 1-8 8H36a8 8 0 0 1-8-8z" fill="#b3292e"/><path d="M32 40h36v14H32z" fill="#f3ece4" opacity=".9"/><path d="M38 47h24" stroke="#b3292e" stroke-width="3" stroke-linecap="round"/>`),
    torrada: V(`<rect x="14" y="30" width="52" height="40" rx="6" fill="#d29a5b" transform="rotate(-8 40 50)"/><rect x="36" y="40" width="52" height="40" rx="6" fill="#e2b273" transform="rotate(6 62 60)"/><path d="M46 54h30M46 64h22" stroke="#a66b32" stroke-width="2.5" stroke-linecap="round" opacity=".6" transform="rotate(6 62 60)"/>`),
    uva: V(`<g fill="#5a2a5e"><circle cx="40" cy="42" r="9"/><circle cx="58" cy="42" r="9"/><circle cx="32" cy="56" r="9"/><circle cx="50" cy="56" r="9"/><circle cx="66" cy="56" r="9"/><circle cx="42" cy="70" r="9"/><circle cx="58" cy="70" r="9"/></g><path d="M50 32c0-8 4-12 10-14" stroke="#6b8f3a" stroke-width="4" fill="none" stroke-linecap="round"/>`),
    castanha: V(`<g fill="#c08a4a"><ellipse cx="36" cy="52" rx="12" ry="9" transform="rotate(-20 36 52)"/><ellipse cx="62" cy="48" rx="12" ry="9" transform="rotate(25 62 48)"/><ellipse cx="50" cy="66" rx="12" ry="9"/></g><g fill="#8a5a2a" opacity=".6"><ellipse cx="36" cy="52" rx="6" ry="3" transform="rotate(-20 36 52)"/><ellipse cx="62" cy="48" rx="6" ry="3" transform="rotate(25 62 48)"/><ellipse cx="50" cy="66" rx="6" ry="3"/></g>`),
    vinho: V(`<path d="M44 12h12v18l10 10v44a6 6 0 0 1-6 6H40a6 6 0 0 1-6-6V40l10-10z" fill="#2a1b22"/><rect x="38" y="52" width="24" height="18" rx="2" fill="#f3ece4"/><path d="M42 61h16" stroke="#b3292e" stroke-width="3" stroke-linecap="round"/><rect x="44" y="12" width="12" height="6" fill="#b3292e"/>`),
  };

  /* ── Estado ───────────────────────────────────────────────────────────── */
  let tipo = "churrasco";
  let pessoas = 6;
  const escolhas = { churrasco: new Map(), tabua: new Map() }; // id -> multiplicador (1 = sugestão)

  const el = {
    abas: [...raiz.querySelectorAll(".montar-aba")],
    pessoasBtns: [...raiz.querySelectorAll("[data-pessoas]")],
    pessoasValor: raiz.querySelector("[data-pessoas-valor]"),
    itens: raiz.querySelector("[data-itens]"),
    pecas: raiz.querySelector("[data-pecas]"),
    vazio: raiz.querySelector("[data-vazio]"),
    bases: [...raiz.querySelectorAll("[data-base]")],
    resumoTitulo: raiz.querySelector("[data-resumo-titulo]"),
    lista: raiz.querySelector("[data-lista]"),
    total: raiz.querySelector("[data-total]"),
    reservar: raiz.querySelector("[data-reservar]"),
  };

  const fmt = (item, mult) => {
    if (item.fixo) return `${item.fixo * mult} ${item.unidade}`;
    if (item.unidade === "un") return `${Math.ceil(item.porcao * pessoas * mult)} un`;
    const g = Math.ceil((item.porcao * pessoas * mult) / 50) * 50;
    return g >= 1000 ? `${(g / 1000).toFixed(g % 1000 ? 1 : 0).replace(".", ",")} kg` : `${g} g`;
  };
  const gramas = (item, mult) => (item.unidade === "g" ? Math.ceil((item.porcao * pessoas * mult) / 50) * 50 : 0);
  const titulo = () => `${tipo === "churrasco" ? "Kit de churrasco" : "Tábua de frios"} para ${pessoas} ${pessoas === 1 ? "pessoa" : "pessoas"}`;

  /* ── Render ───────────────────────────────────────────────────────────── */
  function renderItens() {
    const sel = escolhas[tipo];
    el.itens.innerHTML = CATALOGO[tipo].map((it) => {
      const on = sel.has(it.id);
      const mult = sel.get(it.id) || 1;
      return `<li class="montar-item${on ? " ativo" : ""}" data-id="${it.id}">
        <button type="button" class="montar-item-btn" aria-pressed="${on}">
          <span class="montar-icone">${ICONES[it.icone]}</span>
          <span class="montar-texto"><strong>${it.nome}</strong><small>${it.dica}</small></span>
          <span class="montar-qtd">${on ? fmt(it, mult) : "+"}</span>
        </button>
        <span class="montar-ajuste"${on ? "" : " hidden"}>
          <button type="button" data-ajuste="-1" aria-label="Menos ${it.nome}">−</button>
          <button type="button" data-ajuste="1" aria-label="Mais ${it.nome}">+</button>
        </span>
      </li>`;
    }).join("");
  }

  // Posições das peças sobre a base (em % da cena), em ordem de escolha
  const SLOTS = {
    tabua: [[36, 44], [60, 40], [48, 62], [24, 62], [72, 60], [40, 28], [62, 24], [30, 40], [56, 76], [20, 50], [76, 42], [48, 44]],
    kit:   [[32, 50], [56, 46], [44, 66], [68, 64], [24, 68], [50, 32], [66, 30], [36, 36], [58, 78], [20, 48], [76, 48], [48, 56]],
  };
  function renderCena() {
    const base = tipo === "churrasco" ? "kit" : "tabua";
    el.bases.forEach((b) => (b.style.display = b.dataset.base === base ? "" : "none"));
    const sel = escolhas[tipo];
    const ids = [...sel.keys()];
    el.vazio.hidden = ids.length > 0;
    const slots = SLOTS[base];
    el.pecas.innerHTML = ids.map((id, i) => {
      const it = CATALOGO[tipo].find((x) => x.id === id);
      const [x, y] = slots[i % slots.length];
      const rot = ((i * 37) % 24) - 12;
      const esc = 1 + Math.min(sel.get(id) - 1, 2) * 0.12;
      return `<span class="montar-peca" style="left:${x}%;top:${y}%;--rot:${rot}deg;--esc:${esc};animation-delay:${i * 40}ms">${ICONES[it.icone]}</span>`;
    }).join("");
  }

  function renderResumo() {
    const sel = escolhas[tipo];
    el.resumoTitulo.textContent = titulo();
    const itens = CATALOGO[tipo].filter((it) => sel.has(it.id));
    el.lista.innerHTML = itens.map((it) => `<li><span>${it.nome}</span><strong>${fmt(it, sel.get(it.id))}</strong></li>`).join("");
    const totalG = itens.reduce((s, it) => s + gramas(it, sel.get(it.id)), 0);
    if (!itens.length) {
      el.total.textContent = "Nada escolhido ainda";
      el.reservar.hidden = true;
      return;
    }
    el.total.textContent = `${itens.length} ${itens.length === 1 ? "item" : "itens"}` + (totalG ? ` · ${(totalG / 1000).toFixed(1).replace(".", ",")} kg no total` : "");
    const linhas = itens.map((it) => `• ${it.nome}: ${fmt(it, sel.get(it.id))}`).join("\n");
    const msg = `Olá! Quero reservar para retirada:\n${titulo()}\n${linhas}\n\nQual loja fica melhor e que horário posso buscar?`;
    const num = String((S.whatsapp && S.whatsapp.numero) || "").replace(/\D/g, "");
    el.reservar.href = `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;
    el.reservar.hidden = false;
  }

  function render() { renderItens(); renderCena(); renderResumo(); }

  /* ── Eventos ──────────────────────────────────────────────────────────── */
  el.abas.forEach((b) => b.addEventListener("click", () => {
    tipo = b.dataset.tipo;
    el.abas.forEach((x) => { x.classList.toggle("ativa", x === b); x.setAttribute("aria-selected", x === b); });
    render();
  }));
  el.pessoasBtns.forEach((b) => b.addEventListener("click", () => {
    pessoas = Math.min(30, Math.max(1, pessoas + Number(b.dataset.pessoas)));
    el.pessoasValor.textContent = pessoas;
    render();
  }));
  el.itens.addEventListener("click", (ev) => {
    const li = ev.target.closest(".montar-item");
    if (!li) return;
    const id = li.dataset.id;
    const sel = escolhas[tipo];
    const aj = ev.target.closest("[data-ajuste]");
    if (aj) {
      const m = (sel.get(id) || 1) + Number(aj.dataset.ajuste) * 0.5;
      if (m <= 0.4) sel.delete(id); else sel.set(id, Math.min(3, m));
    } else if (ev.target.closest(".montar-item-btn")) {
      sel.has(id) ? sel.delete(id) : sel.set(id, 1);
    }
    render();
  });

  // Sugestão inicial para o visitante ver a cena montada
  escolhas.churrasco.set("picanha", 1); escolhas.churrasco.set("linguica", 1); escolhas.churrasco.set("pao", 1);
  escolhas.tabua.set("salame", 1); escolhas.tabua.set("provolone", 1); escolhas.tabua.set("uva", 1);
  render();
})();
