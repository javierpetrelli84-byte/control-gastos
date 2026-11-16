/**
 * App Integral de Control de Gastos e Ingresos
 * Incluye las 6 mejoras clave:
 *  1. Sin doble descuento de Tarjeta de Crédito: las compras con TC acumulan en el resumen del mes,
 *     y la liquidez real (Banco o Efectivo) solo baja cuando se paga el Resumen de Tarjeta.
 *  2. Generación automática de cuotas futuras en meses consecutivos al comprar con tarjeta.
 *  3. Pasaje / Transferencia interna entre cuentas (Cajero Banco <-> Efectivo <-> Ahorros).
 *  4. Ranking visual de gastos por Rubro + Topes de presupuesto mensual con alertas de color.
 *  5. Plantillas de Gastos Fijos / Frecuentes para cargar con 1 clic.
 *  6. Agenda de Vencimientos y Pendientes de Pago con botón de "Marcar pagado".
 */

const STORAGE_KEY = 'control_gastos_ingresos_v1';
const RUBROS_KEY = 'control_gastos_rubros_v1';
const BUDGETS_KEY = 'control_gastos_budgets_v1';
const TEMPLATES_KEY = 'control_gastos_templates_v1';
const BILLS_KEY = 'control_gastos_bills_v1';
const THEME_KEY = 'control_gastos_theme';

const DEFAULT_RUBROS = [
  'General',
  'Resumen de Tarjeta',
  'Supermercado',
  'Servicios (Luz, Gas, Internet)',
  'Alquiler / Expensas',
  'Transporte / Combustible',
  'Ocio / Salidas',
  'Ocio / Comidas',
  'Transporte',
  'Salud / Farmacia',
  'Indumentaria / Compras',
  'compra dolares',
  'Amor'
];

const INITIAL_USER_TRANSACTIONS = [
  {
    "id": "tx_1794602592506",
    "type": "income",
    "method": "sueldo_efectivo",
    "amount": 280000,
    "date": "2026-11-13",
    "description": "Transferencia a sofi para equilibrar numeros",
    "category": "General",
    "installment": null,
    "paidWith": null,
    "createdAt": 1794602592506
  },
  {
    "id": "tx_1794602417448",
    "type": "expense",
    "method": "efectivo",
    "amount": 1565000,
    "date": "2026-11-13",
    "description": "Ultimas 2 cuotas beta",
    "category": "Transporte / Combustible",
    "installment": null,
    "paidWith": null,
    "createdAt": 1794602417448
  },
  {
    "id": "tx_1794601728774",
    "type": "expense",
    "method": "efectivo",
    "amount": 15000,
    "date": "2026-11-13",
    "description": "Flores chanchin",
    "category": "Amor",
    "installment": null,
    "paidWith": null,
    "createdAt": 1794601728774
  },
  {
    "id": "tx_1794601007604",
    "type": "expense",
    "method": "efectivo",
    "amount": 7800,
    "date": "2026-11-12",
    "description": "Didi taller",
    "category": "Transporte / Combustible",
    "installment": null,
    "paidWith": null,
    "createdAt": 1794601007604
  },
  {
    "id": "tx_1794600637243",
    "type": "expense",
    "method": "efectivo",
    "amount": 145000,
    "date": "2026-11-12",
    "description": "mecanico beta",
    "category": "Transporte / Combustible",
    "installment": null,
    "paidWith": null,
    "createdAt": 1794600637243
  },
  {
    "id": "tx_1794600555539",
    "type": "expense",
    "method": "efectivo",
    "amount": 19500,
    "date": "2026-11-11",
    "description": "frutas y verduras",
    "category": "Supermercado",
    "installment": null,
    "paidWith": null,
    "createdAt": 1794600555539
  },
  {
    "id": "tx_1794600518345",
    "type": "expense",
    "method": "transferencia_qr_debito",
    "amount": 24000,
    "date": "2026-11-09",
    "description": "padel summit",
    "category": "Ocio / Salidas",
    "installment": null,
    "paidWith": null,
    "createdAt": 1794600518345
  },
  {
    "id": "tx_1794600430698",
    "type": "expense",
    "method": "transferencia_qr_debito",
    "amount": 52600,
    "date": "2026-11-13",
    "description": "aceite mezcla",
    "category": "Transporte / Combustible",
    "installment": null,
    "paidWith": null,
    "createdAt": 1794600430698
  },
  {
    "id": "tx_1794600406806",
    "type": "expense",
    "method": "transferencia_qr_debito",
    "amount": 8000,
    "date": "2026-11-13",
    "description": "empanadas oficina",
    "category": "Ocio / Comidas",
    "installment": null,
    "paidWith": null,
    "createdAt": 1794600406806
  },
  {
    "id": "tx_1794600384572",
    "type": "expense",
    "method": "transferencia_qr_debito",
    "amount": 5000,
    "date": "2026-11-12",
    "description": "vianda",
    "category": "Ocio / Comidas",
    "installment": null,
    "paidWith": null,
    "createdAt": 1794600384572
  },
  {
    "id": "tx_1794600345361",
    "type": "expense",
    "method": "transferencia_qr_debito",
    "amount": 22590,
    "date": "2026-11-10",
    "description": "nafta moto",
    "category": "Transporte / Combustible",
    "installment": null,
    "paidWith": null,
    "createdAt": 1794600345361
  },
  {
    "id": "tx_1794600291512",
    "type": "expense",
    "method": "transferencia_qr_debito",
    "amount": 100000,
    "date": "2026-11-10",
    "description": "comision huguito venta ktm",
    "category": "Transporte / Combustible",
    "installment": null,
    "paidWith": null,
    "createdAt": 1794600291512
  },
  {
    "id": "tx_1794600248808",
    "type": "income",
    "method": "sueldo_efectivo",
    "amount": 4000000,
    "date": "2026-11-10",
    "description": "Venta KTM",
    "category": "General",
    "installment": null,
    "paidWith": null,
    "createdAt": 1794600248808
  },
  {
    "id": "tx_1794236332161",
    "type": "expense",
    "method": "transferencia_qr_debito",
    "amount": 53100,
    "date": "2026-11-09",
    "description": "Servicios depto",
    "category": "Servicios (Luz, Gas, Internet)",
    "installment": null,
    "paidWith": null,
    "createdAt": 1794236332161
  },
  {
    "id": "tx_1794236308129",
    "type": "expense",
    "method": "efectivo",
    "amount": 330500,
    "date": "2026-11-10",
    "description": "alquiler y expensas",
    "category": "Alquiler / Expensas",
    "installment": null,
    "paidWith": null,
    "createdAt": 1794236308129
  },
  {
    "id": "tx_1794234788404",
    "type": "expense",
    "method": "resumen_tarjeta",
    "amount": 529606,
    "date": "2026-11-05",
    "description": "Pago Resumen Tarjeta de Crédito",
    "category": "Resumen de Tarjeta",
    "installment": null,
    "paidWith": "banco",
    "createdAt": 1794234788404
  },
  {
    "id": "tx_1794232172696",
    "type": "income",
    "method": "ahorros_efectivo",
    "amount": 60000,
    "date": "2026-11-09",
    "description": "Recuento de cajon",
    "category": "General",
    "installment": null,
    "createdAt": 1794232172696
  },
  {
    "id": "tx_1794232157372",
    "type": "income",
    "method": "sueldo_efectivo",
    "amount": 885000,
    "date": "2026-11-06",
    "description": "Depto nico",
    "category": "General",
    "installment": null,
    "createdAt": 1794232157372
  },
  {
    "id": "tx_1794232048160",
    "type": "expense",
    "method": "efectivo",
    "amount": 25500,
    "date": "2026-11-08",
    "description": "viaje a catamarca",
    "category": "Ocio / Comidas",
    "installment": null,
    "createdAt": 1794232048160
  },
  {
    "id": "tx_1794231929001",
    "type": "expense",
    "method": "efectivo",
    "amount": 19500,
    "date": "2026-11-08",
    "description": "uber cumple santi",
    "category": "Transporte",
    "installment": null,
    "createdAt": 1794231929001
  },
  {
    "id": "tx_1794231766537",
    "type": "expense",
    "method": "efectivo",
    "amount": 7000,
    "date": "2026-11-09",
    "description": "snack cumple santi",
    "category": "Ocio / Comidas",
    "installment": null,
    "createdAt": 1794231766537
  },
  {
    "id": "tx_1794231752289",
    "type": "income",
    "method": "sueldo_efectivo",
    "amount": 40000,
    "date": "2026-11-08",
    "description": "asado",
    "category": "General",
    "installment": null,
    "createdAt": 1794231752289
  },
  {
    "id": "tx_1794231722697",
    "type": "expense",
    "method": "transferencia_qr_debito",
    "amount": 50000,
    "date": "2026-11-08",
    "description": "torta santi",
    "category": "Ocio / Comidas",
    "installment": null,
    "createdAt": 1794231722697
  },
  {
    "id": "tx_1794231697145",
    "type": "income",
    "method": "sueldo_efectivo",
    "amount": 80000,
    "date": "2026-11-07",
    "description": "de transferencia para pagar sueldos",
    "category": "General",
    "installment": null,
    "createdAt": 1794231697145
  },
  {
    "id": "tx_1794231681401",
    "type": "expense",
    "method": "transferencia_qr_debito",
    "amount": 80000,
    "date": "2026-11-07",
    "description": "para pagar sueldo",
    "category": "General",
    "installment": null,
    "createdAt": 1794231681401
  },
  {
    "id": "tx_1794231652469",
    "type": "expense",
    "method": "transferencia_qr_debito",
    "amount": 14000,
    "date": "2026-11-07",
    "description": "pastas",
    "category": "Ocio / Comidas",
    "installment": null,
    "createdAt": 1794231652469
  },
  {
    "id": "tx_1794231639921",
    "type": "expense",
    "method": "transferencia_qr_debito",
    "amount": 29800,
    "date": "2026-11-07",
    "description": "polleria",
    "category": "Ocio / Comidas",
    "installment": null,
    "createdAt": 1794231639921
  },
  {
    "id": "tx_1794231525538",
    "type": "expense",
    "method": "transferencia_qr_debito",
    "amount": 11900,
    "date": "2026-11-06",
    "description": "chocolates y coca",
    "category": "Ocio / Comidas",
    "installment": null,
    "createdAt": 1794231525538
  },
  {
    "id": "tx_1794231497386",
    "type": "expense",
    "method": "transferencia_qr_debito",
    "amount": 24684,
    "date": "2026-11-09",
    "description": "pizza depto",
    "category": "Ocio / Comidas",
    "installment": null,
    "createdAt": 1794231497386
  },
  {
    "id": "tx_1794231473705",
    "type": "expense",
    "method": "transferencia_qr_debito",
    "amount": 7000,
    "date": "2026-11-06",
    "description": "uber",
    "category": "Transporte",
    "installment": null,
    "createdAt": 1794231473705
  },
  {
    "id": "tx_1794231447049",
    "type": "expense",
    "method": "transferencia_qr_debito",
    "amount": 7460,
    "date": "2026-11-06",
    "description": "comida oficina",
    "category": "Ocio / Comidas",
    "installment": null,
    "createdAt": 1794231447049
  },
  {
    "id": "tx_1794231302583",
    "type": "income",
    "method": "sueldo_banco",
    "amount": 1982520,
    "date": "2026-11-05",
    "description": "sueldo leg",
    "category": "General",
    "installment": null,
    "createdAt": 1794231302583
  }
];

const DEFAULT_TEMPLATES = [
  { id: 'tpl_1', name: 'Alquiler / Expensas', amount: 380000, method: 'transferencia_qr_debito', category: 'Alquiler / Expensas' },
  { id: 'tpl_2', name: 'Internet / Fibra', amount: 32000, method: 'transferencia_qr_debito', category: 'Servicios (Luz, Gas, Internet)' },
  { id: 'tpl_3', name: 'Compra Semanal Verdulería', amount: 25000, method: 'efectivo', category: 'Supermercado' }
];

const CATALOG = {
  income: {
    sueldo_banco: {
      label: 'Sueldo en Banco',
      icon: '🏦',
      badge: 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800'
    },
    sueldo_efectivo: {
      label: 'Sueldo en Efectivo',
      icon: '💵',
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
    },
    ahorros_efectivo: {
      label: 'Ahorros en Efectivo',
      icon: '🐷',
      badge: 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800'
    }
  },
  expense: {
    tarjeta_credito: {
      label: 'Gastos Tarjeta de Crédito',
      shortLabel: 'Consumos Tarjeta (Mes)',
      icon: '💳',
      color: '#f59e0b',
      badge: 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
    },
    resumen_tarjeta: {
      label: 'Resumen de Tarjeta de Crédito',
      shortLabel: 'Resumen Tarjeta Pagado',
      icon: '🧾',
      color: '#9333ea',
      badge: 'bg-purple-50 text-purple-800 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
    },
    efectivo: {
      label: 'Gastos en Efectivo',
      shortLabel: 'Gastos en Efectivo',
      icon: '💵',
      color: '#f43f5e',
      badge: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
    },
    transferencia_qr_debito: {
      label: 'Gastos con Transferencia / QR / Débito',
      shortLabel: 'Transf. / QR / Débito',
      icon: '📱',
      color: '#0ea5e9',
      badge: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800'
    }
  },
  transfer: {
    banco_a_efectivo: {
      label: 'Retiro Banco → Efectivo en mano',
      icon: '🏧',
      badge: 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800'
    },
    banco_a_ahorros: {
      label: 'Pase Banco → Ahorros en Efectivo',
      icon: '🐷',
      badge: 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800'
    },
    efectivo_a_ahorros: {
      label: 'Separado Efectivo → Ahorros en Efectivo',
      icon: '🐷',
      badge: 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800'
    },
    efectivo_a_banco: {
      label: 'Depósito Efectivo → Banco',
      icon: '🏦',
      badge: 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800'
    }
  }
};

function getCurrentYearMonth() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

const state = {
  transactions: [],
  rubros: [],
  budgets: {}, // { 'Supermercado': 250000 }
  templates: [],
  bills: [],
  filters: {
    periodMode: 'selected_month', // 'selected_month' | 'all' | 'custom'
    selectedYm: getCurrentYearMonth(),
    dateFrom: '',
    dateTo: '',
    type: 'all',
    method: 'all',
    rubro: 'all',
    search: ''
  },
  modal: {
    mode: 'create',
    txType: 'expense',
    editingId: null
  }
};

const moneyFormat = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
});

function formatCurrency(val) {
  return moneyFormat.format(Number(val) || 0);
}

function getTodayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function addMonthsToISODate(isoDate, monthsToAdd) {
  const [y, m, d] = isoDate.split('-').map(Number);
  const target = new Date(y, m - 1 + monthsToAdd, Math.min(d, 28));
  return `${target.getFullYear()}-${String(target.getMonth() + 1).padStart(2, '0')}-${String(target.getDate()).padStart(2, '0')}`;
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ==========================================
// PERSISTENCIA EN LOCALSTORAGE
// ==========================================

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function saveAllState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.transactions));
  localStorage.setItem(RUBROS_KEY, JSON.stringify(state.rubros));
  localStorage.setItem(BUDGETS_KEY, JSON.stringify(state.budgets));
  localStorage.setItem(TEMPLATES_KEY, JSON.stringify(state.templates));
  localStorage.setItem(BILLS_KEY, JSON.stringify(state.bills));
}

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = saved ? saved === 'dark' : prefersDark;
  document.documentElement.classList.toggle('dark', isDark);
}

function toggleTheme() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
}

// ==========================================
// PERÍODO ACTIVO Y LÓGICA FINANCIERA SIN DOBLE DESCUENTO
// ==========================================

function isDateInActivePeriod(dateStr) {
  if (!dateStr) return false;
  const { periodMode, selectedYm, dateFrom, dateTo } = state.filters;
  if (periodMode === 'all') return true;
  if (periodMode === 'selected_month') {
    return dateStr.slice(0, 7) === selectedYm;
  }
  if (periodMode === 'custom') {
    if (dateFrom && dateStr < dateFrom) return false;
    if (dateTo && dateStr > dateTo) return false;
    return true;
  }
  return true;
}

function formatYearMonthHuman(ym) {
  const [y, m] = ym.split('-').map(Number);
  const d = new Date(y, m - 1, 1);
  const txt = d.toLocaleDateString('es-AR', { month: 'long', year: 'numeric' });
  return txt.charAt(0).toUpperCase() + txt.slice(1);
}

/**
 * MEJORA 1 + MEJORA 3:
 * - Las compras con Tarjeta de Crédito (`tarjeta_credito`) se acumulan en `tarjeta_credito` (resumen a pagar),
 *   pero NO restan de tu plata líquida hoy.
 * - La plata líquida real baja únicamente con gastos en Efectivo, Transferencia/QR/Débito y cuando pagas el Resumen de Tarjeta.
 * - Los pases entre cuentas (`type === 'transfer'`) mueven saldo entre Banco, Efectivo en mano y Ahorros en Efectivo sin alterar el ingreso/gasto total.
 */
function computeTotals() {
  const t = {
    sueldo_banco: 0,
    sueldo_efectivo: 0,
    ahorros_efectivo: 0,
    tarjeta_credito: 0,
    resumen_tarjeta: 0,
    resumen_pagado_banco: 0,
    resumen_pagado_efectivo: 0,
    efectivo: 0,
    transferencia_qr_debito: 0,
    // Ajustes por transferencias internas
    netTransferBanco: 0,
    netTransferEfectivoMano: 0,
    netTransferAhorros: 0
  };

  for (const tx of state.transactions) {
    if (!isDateInActivePeriod(tx.date)) continue;
    const amt = Number(tx.amount) || 0;

    if (tx.type === 'income' || tx.type === 'expense') {
      if (t[tx.method] !== undefined) {
        t[tx.method] += amt;
      }
      if (tx.type === 'expense' && tx.method === 'resumen_tarjeta') {
        if (tx.paidWith === 'efectivo') t.resumen_pagado_efectivo += amt;
        else t.resumen_pagado_banco += amt;
      }
    } else if (tx.type === 'transfer') {
      if (tx.method === 'banco_a_efectivo') {
        t.netTransferBanco -= amt;
        t.netTransferEfectivoMano += amt;
      } else if (tx.method === 'banco_a_ahorros') {
        t.netTransferBanco -= amt;
        t.netTransferAhorros += amt;
      } else if (tx.method === 'efectivo_a_ahorros') {
        t.netTransferEfectivoMano -= amt;
        t.netTransferAhorros += amt;
      } else if (tx.method === 'efectivo_a_banco') {
        t.netTransferEfectivoMano -= amt;
        t.netTransferBanco += amt;
      }
    }
  }

  const totalIngresos = t.sueldo_banco + t.sueldo_efectivo + t.ahorros_efectivo;

  // Salidas reales de dinero líquido (sin contar compras con tarjeta que aún no se pagaron en resumen)
  const salidasRealesLiquidas =
    t.transferencia_qr_debito + t.efectivo + t.resumen_tarjeta;

  // Banco disponible
  const salidasBanco = t.transferencia_qr_debito + t.resumen_pagado_banco;
  const liquidoBanco = t.sueldo_banco - salidasBanco + t.netTransferBanco;

  // Efectivo disponible (Mano + Ahorros)
  const salidasEfectivo = t.efectivo + t.resumen_pagado_efectivo;
  const disponibleEfectivoMano = t.sueldo_efectivo - salidasEfectivo + t.netTransferEfectivoMano;
  const disponibleAhorrosEfectivo = t.ahorros_efectivo + t.netTransferAhorros;
  const liquidoEfectivoTotal = disponibleEfectivoMano + disponibleAhorrosEfectivo;

  // Plata líquida total disponible hoy
  const plataLiquidaTotal = liquidoBanco + liquidoEfectivoTotal;

  return {
    ...t,
    totalIngresos,
    salidasRealesLiquidas,
    salidasBanco,
    liquidoBanco,
    salidasEfectivo,
    disponibleEfectivoMano,
    disponibleAhorrosEfectivo,
    liquidoEfectivoTotal,
    plataLiquidaTotal
  };
}

// ==========================================
// RENDERIZADO GENERAL DEL DASHBOARD
// ==========================================

function renderDashboard() {
  const t = computeTotals();

  // Texto del período en header
  const periodLabelEl = document.getElementById('headerPeriodText');
  if (state.filters.periodMode === 'selected_month') {
    periodLabelEl.textContent = `Viendo mes: ${formatYearMonthHuman(state.filters.selectedYm)}`;
  } else if (state.filters.periodMode === 'all') {
    periodLabelEl.textContent = 'Viendo todo el historial acumulado';
  } else {
    periodLabelEl.textContent = 'Viendo rango de fechas personalizado';
  }

  // 4 Tarjetas Superiores
  document.getElementById('kpiTotalDisponible').textContent = formatCurrency(t.plataLiquidaTotal);
  document.getElementById('kpiResumenIngresos').textContent = `+${formatCurrency(t.totalIngresos)}`;
  document.getElementById('kpiResumenEgresos').textContent = `-${formatCurrency(t.salidasRealesLiquidas)}`;

  document.getElementById('kpiLiquidoBanco').textContent = formatCurrency(t.liquidoBanco);
  document.getElementById('kpiBancoIn').textContent = formatCurrency(t.sueldo_banco + Math.max(0, t.netTransferBanco));
  document.getElementById('kpiBancoOut').textContent = formatCurrency(t.salidasBanco + Math.max(0, -t.netTransferBanco));

  document.getElementById('kpiLiquidoEfectivo').textContent = formatCurrency(t.liquidoEfectivoTotal);
  document.getElementById('kpiDesgloseEfectivoSub').textContent =
    `En mano: ${formatCurrency(t.disponibleEfectivoMano)} | Ahorros: ${formatCurrency(t.disponibleAhorrosEfectivo)}`;
  document.getElementById('kpiEfectivoIn').textContent = formatCurrency(t.sueldo_efectivo + t.ahorros_efectivo);
  document.getElementById('kpiEfectivoOut').textContent = formatCurrency(t.salidasEfectivo);

  document.getElementById('kpiDeudaTarjeta').textContent = formatCurrency(t.tarjeta_credito);
  document.getElementById('kpiResumenPagado').textContent = formatCurrency(t.resumen_tarjeta);

  // Paneles de 3 Ingresos y 4 Egresos
  document.getElementById('totalIngresosPanel').textContent = formatCurrency(t.totalIngresos);
  document.getElementById('boxSueldoBanco').textContent = formatCurrency(t.sueldo_banco);
  document.getElementById('boxSueldoEfectivo').textContent = formatCurrency(t.sueldo_efectivo);
  document.getElementById('boxAhorrosEfectivo').textContent = formatCurrency(t.ahorros_efectivo);

  document.getElementById('totalEgresosPanel').textContent = formatCurrency(t.salidasRealesLiquidas);
  document.getElementById('boxGastosTarjeta').textContent = formatCurrency(t.tarjeta_credito);
  document.getElementById('boxResumenTarjeta').textContent = formatCurrency(t.resumen_tarjeta);
  document.getElementById('boxGastosEfectivo').textContent = formatCurrency(t.efectivo);
  document.getElementById('boxGastosTransferencia').textContent = formatCurrency(t.transferencia_qr_debito);

  document.getElementById('netPeriodBadge').textContent = formatCurrency(t.plataLiquidaTotal);

  renderTemplatesSection();
  renderBillsSection();
  renderRubroRanking();
  renderDonut(t);
  renderBars();
  renderFeed();
}

// ==========================================
// MEJORA 5: PLANTILLAS DE GASTOS FIJOS (1 CLIC)
// ==========================================

function renderTemplatesSection() {
  const container = document.getElementById('templatesList');
  if (state.templates.length === 0) {
    container.innerHTML = `<p class="text-xs text-slate-400 col-span-2 py-3">No tienes gastos fijos guardados. Toca "+ Crear fijo" para agregar Alquiler, Luz, Internet, etc.</p>`;
    return;
  }

  container.innerHTML = state.templates
    .map((tpl) => {
      const meta = CATALOG.expense[tpl.method] || { icon: '💸', shortLabel: tpl.method };
      return `
        <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-2">
          <div class="min-w-0">
            <p class="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">${escapeHtml(tpl.name)}</p>
            <p class="text-[11px] text-slate-500 dark:text-slate-400 font-mono">${meta.icon} ${formatCurrency(tpl.amount)}</p>
          </div>
          <div class="flex items-center gap-1 shrink-0">
            <button type="button" data-use-template="${tpl.id}" title="Registrar este gasto ahora con 1 clic"
              class="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition active:scale-95">
              Cargar
            </button>
            <button type="button" data-del-template="${tpl.id}" title="Borrar plantilla"
              class="p-1 text-xs text-slate-400 hover:text-rose-500">✕</button>
          </div>
        </div>
      `;
    })
    .join('');
}

// ==========================================
// MEJORA 6: CALENDARIO DE VENCIMIENTOS / PENDIENTES
// ==========================================

function renderBillsSection() {
  const container = document.getElementById('billsList');
  const today = getTodayISO();

  if (state.bills.length === 0) {
    container.innerHTML = `<p class="text-xs text-slate-400 py-3">No tienes vencimientos pendientes anotados. Usa "+ Agendar vencimiento" para recordar pagos del mes.</p>`;
    return;
  }

  const sorted = [...state.bills].sort((a, b) => {
    if (a.paid !== b.paid) return a.paid ? 1 : -1;
    return (a.dueDate || '').localeCompare(b.dueDate || '');
  });

  container.innerHTML = sorted
    .map((b) => {
      const isOverdue = !b.paid && b.dueDate < today;
      const statusBadge = b.paid
        ? `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">Pagado ✓</span>`
        : isOverdue
        ? `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/15 text-rose-600 dark:text-rose-400">Vencido ⚠️</span>`
        : `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300">Pendiente</span>`;

      return `
        <div class="p-3 rounded-xl border ${
          b.paid
            ? 'bg-slate-50/50 dark:bg-slate-800/20 border-slate-200/50 dark:border-slate-800 opacity-65'
            : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
        } flex items-center justify-between gap-2">
          <div class="min-w-0">
            <div class="flex items-center gap-2">
              <p class="text-xs font-bold text-slate-800 dark:text-slate-100 truncate ${b.paid ? 'line-through' : ''}">${escapeHtml(b.title)}</p>
              ${statusBadge}
            </div>
            <p class="text-[11px] text-slate-500 mt-0.5">
              Vence: <strong>${b.dueDate}</strong> • <span class="font-mono font-semibold">${formatCurrency(b.amount)}</span>
            </p>
          </div>
          <div class="flex items-center gap-1 shrink-0">
            ${
              !b.paid
                ? `<button type="button" data-pay-bill="${b.id}" class="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-amber-600 hover:bg-amber-500 text-white transition">
                     Pagar ahora
                   </button>`
                : ''
            }
            <button type="button" data-del-bill="${b.id}" class="p-1 text-xs text-slate-400 hover:text-rose-500">✕</button>
          </div>
        </div>
      `;
    })
    .join('');
}

// ==========================================
// MEJORA 4: RANKING POR RUBRO Y TOPES MENSUALES
// ==========================================

function renderRubroRanking() {
  const container = document.getElementById('rubroRankingContainer');
  const sumsByRubro = {};
  let totalSpent = 0;

  for (const tx of state.transactions) {
    if (tx.type !== 'expense' || !isDateInActivePeriod(tx.date)) continue;
    // Si ya se registra compra por tarjeta con su rubro, evitamos duplicar el "Resumen de Tarjeta" en el ranking de rubros de consumo
    const cat = tx.category || 'General';
    const amt = Number(tx.amount) || 0;
    sumsByRubro[cat] = (sumsByRubro[cat] || 0) + amt;
    totalSpent += amt;
  }

  // Asegurar que rubros con tope configurado también aparezcan aunque tengan $0 gastado
  for (const r of Object.keys(state.budgets)) {
    if (state.budgets[r] > 0 && sumsByRubro[r] === undefined) {
      sumsByRubro[r] = 0;
    }
  }

  const entries = Object.entries(sumsByRubro).sort((a, b) => b[1] - a[1]);

  if (entries.length === 0) {
    container.innerHTML = `<p class="text-xs text-slate-400 py-6 text-center">Aún no hay gastos por rubro en este período.</p>`;
    return;
  }

  const maxRubroVal = Math.max(1, ...entries.map((e) => e[1]));

  container.innerHTML = entries
    .map(([rubro, spent]) => {
      const budget = Number(state.budgets[rubro]) || 0;
      const pctOfBudget = budget > 0 ? Math.round((spent / budget) * 100) : null;
      const barWidth = budget > 0 ? Math.min(100, Math.round((spent / budget) * 100)) : Math.round((spent / maxRubroVal) * 100);

      let barColor = 'bg-emerald-500';
      let alertBadge = '';
      if (budget > 0) {
        if (spent > budget) {
          barColor = 'bg-rose-600';
          alertBadge = `<span class="px-1.5 py-0.5 text-[10px] font-bold rounded bg-rose-500/15 text-rose-600 dark:text-rose-400">¡Tope superado! (${pctOfBudget}%)</span>`;
        } else if (pctOfBudget >= 80) {
          barColor = 'bg-amber-500';
          alertBadge = `<span class="px-1.5 py-0.5 text-[10px] font-bold rounded bg-amber-500/15 text-amber-700 dark:text-amber-300">Cerca del tope (${pctOfBudget}%)</span>`;
        } else {
          alertBadge = `<span class="text-[10px] text-slate-400">${pctOfBudget}% de ${formatCurrency(budget)}</span>`;
        }
      } else {
        const share = totalSpent > 0 ? Math.round((spent / totalSpent) * 100) : 0;
        alertBadge = `<span class="text-[10px] text-slate-400">${share}% del total</span>`;
      }

      return `
        <div class="space-y-1">
          <div class="flex items-center justify-between text-xs">
            <span class="font-semibold text-slate-800 dark:text-slate-200 truncate">🏷️ ${escapeHtml(rubro)}</span>
            <div class="flex items-center gap-2 shrink-0">
              ${alertBadge}
              <span class="font-mono font-bold text-slate-900 dark:text-white">${formatCurrency(spent)}</span>
            </div>
          </div>
          <div class="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div class="h-full rounded-full ${barColor} transition-all duration-300" style="width: ${barWidth}%"></div>
          </div>
        </div>
      `;
    })
    .join('');
}

// ==========================================
// GRÁFICOS (DONA Y BARRAS)
// ==========================================

function renderDonut(t) {
  const container = document.getElementById('donutContainer');
  const legend = document.getElementById('donutLegend');

  const items = [
    { key: 'tarjeta_credito', val: t.tarjeta_credito, ...CATALOG.expense.tarjeta_credito },
    { key: 'resumen_tarjeta', val: t.resumen_tarjeta, ...CATALOG.expense.resumen_tarjeta },
    { key: 'efectivo', val: t.efectivo, ...CATALOG.expense.efectivo },
    { key: 'transferencia_qr_debito', val: t.transferencia_qr_debito, ...CATALOG.expense.transferencia_qr_debito }
  ];

  const total = items.reduce((acc, i) => acc + i.val, 0);

  if (total <= 0) {
    container.innerHTML = `
      <div class="py-4 text-center">
        <div class="w-24 h-24 rounded-full border-8 border-slate-100 dark:border-slate-800 mx-auto flex items-center justify-center font-mono text-xs text-slate-400">$0</div>
        <p class="text-[11px] text-slate-400 mt-2">Sin movimientos en este mes</p>
      </div>
    `;
    legend.innerHTML = '';
    return;
  }

  const r = 56;
  const c = 2 * Math.PI * r;
  let offsetPct = 0;

  const circles = items
    .map((item) => {
      if (item.val <= 0) return '';
      const pct = item.val / total;
      const dash = `${pct * c} ${c}`;
      const offset = -offsetPct * c;
      offsetPct += pct;
      return `<circle class="donut-segment" cx="75" cy="75" r="${r}" fill="transparent" stroke="${item.color}" stroke-width="18" stroke-dasharray="${dash}" stroke-dashoffset="${offset}"></circle>`;
    })
    .join('');

  container.innerHTML = `
    <div class="relative w-36 h-36 flex items-center justify-center">
      <svg class="w-full h-full -rotate-90" viewBox="0 0 150 150">
        <circle cx="75" cy="75" r="${r}" fill="transparent" class="stroke-slate-100 dark:stroke-slate-800" stroke-width="18"></circle>
        ${circles}
      </svg>
      <div class="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-2">
        <span class="text-[9px] uppercase text-slate-400 font-semibold">Salidas</span>
        <span class="font-mono text-[11px] font-bold">${formatCurrency(t.salidasRealesLiquidas)}</span>
      </div>
    </div>
  `;

  legend.innerHTML = items
    .map((item) => {
      const pct = total > 0 ? Math.round((item.val / total) * 100) : 0;
      return `
        <div class="flex items-center justify-between text-[11px]">
          <span class="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 truncate">
            <span class="w-2 h-2 rounded-xs shrink-0" style="background:${item.color}"></span>
            ${item.icon} ${item.shortLabel}
          </span>
          <span class="font-mono font-semibold shrink-0">${formatCurrency(item.val)} <span class="text-slate-400">(${pct}%)</span></span>
        </div>
      `;
    })
    .join('');
}

function renderBars() {
  const container = document.getElementById('barsContainer');
  const [baseY, baseM] = state.filters.selectedYm.split('-').map(Number);
  const months = [];

  for (let i = 5; i >= 0; i--) {
    const d = new Date(baseY, baseM - 1 - i, 1);
    const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const label = d.toLocaleDateString('es-AR', { month: 'short' }).replace('.', '');
    months.push({ ym, label: label.charAt(0).toUpperCase() + label.slice(1), income: 0, expense: 0 });
  }

  const byYm = Object.fromEntries(months.map((m) => [m.ym, m]));
  for (const tx of state.transactions) {
    const ym = (tx.date || '').slice(0, 7);
    if (!byYm[ym]) continue;
    if (tx.type === 'income') {
      byYm[ym].income += Number(tx.amount) || 0;
    } else if (tx.type === 'expense' && tx.method !== 'tarjeta_credito') {
      // Contabilizamos egresos líquidos reales para no duplicar con resumen
      byYm[ym].expense += Number(tx.amount) || 0;
    }
  }

  const maxVal = Math.max(1, ...months.flatMap((m) => [m.income, m.expense]));

  container.innerHTML = months
    .map((m) => {
      const hInc = Math.max(m.income > 0 ? 6 : 2, Math.round((m.income / maxVal) * 125));
      const hExp = Math.max(m.expense > 0 ? 6 : 2, Math.round((m.expense / maxVal) * 125));
      return `
        <div class="flex-1 flex flex-col items-center">
          <div class="w-full h-[130px] flex items-end justify-center gap-1">
            <div class="w-2.5 sm:w-4 rounded-t bg-emerald-500 transition-all" style="height:${hInc}px" title="Ingresos: ${formatCurrency(m.income)}"></div>
            <div class="w-2.5 sm:w-4 rounded-t bg-rose-500 transition-all" style="height:${hExp}px" title="Egresos líquidos: ${formatCurrency(m.expense)}"></div>
          </div>
          <span class="text-[10px] font-semibold text-slate-600 dark:text-slate-300 mt-1.5">${m.label}</span>
        </div>
      `;
    })
    .join('');
}

// ==========================================
// HISTORIAL DE MOVIMIENTOS
// ==========================================

function renderFeed() {
  const listEl = document.getElementById('txListContainer');
  const emptyEl = document.getElementById('emptyFeedState');

  const filtered = state.transactions
    .filter((tx) => {
      if (!isDateInActivePeriod(tx.date)) return false;
      if (state.filters.type !== 'all' && tx.type !== state.filters.type) return false;
      if (state.filters.method !== 'all' && tx.method !== state.filters.method) return false;
      if (state.filters.rubro !== 'all' && tx.category !== state.filters.rubro) return false;
      if (state.filters.search.trim() !== '') {
        const q = state.filters.search.toLowerCase();
        const inDesc = (tx.description || '').toLowerCase().includes(q);
        const inCat = (tx.category || '').toLowerCase().includes(q);
        if (!inDesc && !inCat) return false;
      }
      return true;
    })
    .sort((a, b) => (b.date !== a.date ? b.date.localeCompare(a.date) : (b.createdAt || 0) - (a.createdAt || 0)));

  document.getElementById('feedCount').textContent = String(filtered.length);

  if (filtered.length === 0) {
    listEl.innerHTML = '';
    emptyEl.classList.remove('hidden');
    return;
  }

  emptyEl.classList.add('hidden');

  listEl.innerHTML = filtered
    .map((tx) => {
      const isInc = tx.type === 'income';
      const isTransfer = tx.type === 'transfer';

      let meta;
      if (isInc) meta = CATALOG.income[tx.method] || { label: tx.method, icon: '💰', badge: '' };
      else if (isTransfer) meta = CATALOG.transfer[tx.method] || { label: 'Pase entre cuentas', icon: '⇄', badge: '' };
      else meta = CATALOG.expense[tx.method] || { label: tx.method, icon: '💸', badge: '' };

      const cuotaBadge =
        tx.type === 'expense' && tx.method === 'tarjeta_credito' && tx.installment
          ? `<span class="px-2 py-0.5 text-[11px] font-mono font-bold rounded bg-amber-500/15 text-amber-800 dark:text-amber-300">Cuota ${escapeHtml(tx.installment)}</span>`
          : '';

      const paidWithLabels = {
        banco: 'Pagado con Banco',
        efectivo: 'Pagado con Efectivo'
      };
      const resumenSourceBadge =
        tx.type === 'expense' && tx.method === 'resumen_tarjeta' && tx.paidWith
          ? `<span class="px-2 py-0.5 text-[11px] font-medium rounded bg-purple-500/15 text-purple-800 dark:text-purple-300">${paidWithLabels[tx.paidWith] || ''}</span>`
          : '';

      const catBadge =
        tx.type === 'expense' && tx.category
          ? `<span class="px-2 py-0.5 text-[11px] font-medium rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">🏷️ ${escapeHtml(tx.category)}</span>`
          : '';

      const amountColor = isInc
        ? 'text-emerald-600 dark:text-emerald-400'
        : isTransfer
        ? 'text-sky-600 dark:text-sky-400'
        : tx.method === 'tarjeta_credito'
        ? 'text-amber-600 dark:text-amber-400'
        : 'text-rose-600 dark:text-rose-400';

      const sign = isInc ? '+' : isTransfer ? '⇄ ' : '−';

      return `
        <div class="tx-row-enter p-4 sm:px-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
          <div class="flex items-start sm:items-center gap-3">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 ${
              isInc
                ? 'bg-emerald-500/10 text-emerald-600'
                : isTransfer
                ? 'bg-sky-500/10 text-sky-600'
                : 'bg-rose-500/10 text-rose-600'
            }">
              ${meta.icon}
            </div>
            <div>
              <div class="flex flex-wrap items-center gap-2">
                <span class="text-sm font-bold text-slate-900 dark:text-white">${escapeHtml(tx.description)}</span>
                <span class="px-2.5 py-0.5 text-[11px] font-semibold rounded-full border ${meta.badge}">
                  ${meta.icon} ${meta.label}
                </span>
                ${cuotaBadge}
                ${resumenSourceBadge}
                ${catBadge}
              </div>
              <p class="text-xs text-slate-400 mt-1">📅 ${tx.date}</p>
            </div>
          </div>

          <div class="flex items-center justify-between sm:justify-end gap-4">
            <span class="font-mono text-base sm:text-lg font-bold ${amountColor}">
              ${sign}${formatCurrency(tx.amount)}
            </span>
            <div class="flex items-center gap-1">
              ${
                !isTransfer
                  ? `<button type="button" data-edit="${tx.id}" class="px-2.5 py-1 text-xs font-medium rounded-lg text-slate-500 hover:bg-slate-200/60 dark:hover:bg-slate-800">Editar</button>`
                  : ''
              }
              <button type="button" data-delete="${tx.id}" class="px-2.5 py-1 text-xs font-medium rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40">Borrar</button>
            </div>
          </div>
        </div>
      `;
    })
    .join('');
}

// ==========================================
// GESTIÓN DE RUBROS Y TOPES MENSUALES
// ==========================================

function renderRubrosSelects(selectedValue = null) {
  const inputCat = document.getElementById('inputCategory');
  const filterCat = document.getElementById('rubroFilterSelect');
  const tplCat = document.getElementById('tplRubro');

  const currentModalVal = selectedValue || inputCat.value || 'General';
  const currentFilterVal = filterCat.value || 'all';

  const optionsHtml = state.rubros
    .map((r) => `<option value="${escapeHtml(r)}">🏷️ ${escapeHtml(r)}</option>`)
    .join('');

  inputCat.innerHTML = optionsHtml;
  if (tplCat) tplCat.innerHTML = optionsHtml;

  if (state.rubros.includes(currentModalVal)) {
    inputCat.value = currentModalVal;
  }

  filterCat.innerHTML = `<option value="all">Todos los rubros</option>` + optionsHtml;
  if (currentFilterVal === 'all' || state.rubros.includes(currentFilterVal)) {
    filterCat.value = currentFilterVal;
  }

  const chipsContainer = document.getElementById('customRubrosChips');
  if (chipsContainer) {
    chipsContainer.innerHTML = state.rubros
      .map((r) => {
        const isProtected = r === 'General' || r === 'Resumen de Tarjeta';
        const budget = state.budgets[r] ? ` (Tope: ${formatCurrency(state.budgets[r])})` : '';
        return `
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200">
            <span>${escapeHtml(r)}<strong class="text-emerald-600 dark:text-emerald-400 font-mono">${budget}</strong></span>
            ${
              !isProtected
                ? `<button type="button" data-remove-rubro="${escapeHtml(r)}" title="Eliminar rubro" class="text-slate-400 hover:text-rose-500 font-bold">✕</button>`
                : ''
            }
          </span>
        `;
      })
      .join('');
  }
}

function saveOrUpdateRubroAndBudget(name, budgetVal) {
  const clean = String(name || '').trim();
  if (!clean) {
    showToast('Escribe el nombre del rubro');
    return false;
  }
  const existing = state.rubros.find((r) => r.toLowerCase() === clean.toLowerCase());
  const finalName = existing || clean;

  if (!existing) {
    state.rubros.push(finalName);
  }

  const numBudget = parseFloat(budgetVal);
  if (!isNaN(numBudget) && numBudget > 0) {
    state.budgets[finalName] = numBudget;
  } else if (budgetVal === '0') {
    delete state.budgets[finalName];
  }

  saveAllState();
  renderRubrosSelects(finalName);
  renderRubroRanking();
  showToast(existing ? `Rubro "${finalName}" actualizado` : `Rubro "${finalName}" creado`);
  return true;
}

// ==========================================
// MODAL PRINCIPAL DE INGRESOS / EGRESOS
// ==========================================

function setModalType(type) {
  state.modal.txType = type;
  const isInc = type === 'income';

  document.getElementById('tabIncome').className = isInc
    ? 'py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 text-white shadow-xs transition'
    : 'py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-400 transition';

  document.getElementById('tabExpense').className = !isInc
    ? 'py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-rose-600 text-white shadow-xs transition'
    : 'py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-400 transition';

  document.getElementById('incomeOptionsBox').classList.toggle('hidden', !isInc);
  document.getElementById('expenseOptionsBox').classList.toggle('hidden', isInc);
  document.getElementById('categoryBox').classList.toggle('opacity-40', isInc);
  document.getElementById('categoryBox').classList.toggle('pointer-events-none', isInc);

  const btnSubmit = document.getElementById('btnSubmitForm');
  btnSubmit.className = isInc
    ? 'px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md transition'
    : 'px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-rose-600 hover:bg-rose-500 shadow-md transition';

  syncExpenseExtraBoxes();
}

function syncExpenseExtraBoxes() {
  const method = document.querySelector('input[name="expenseMethod"]:checked')?.value;
  const isExpense = state.modal.txType === 'expense';

  const showInstallments = isExpense && method === 'tarjeta_credito';
  document.getElementById('installmentsBox').classList.toggle('hidden', !showInstallments);
  document.getElementById('autoGenerateInstallmentsRow').classList.toggle('hidden', state.modal.mode === 'edit');

  const showResumenSource = isExpense && method === 'resumen_tarjeta';
  document.getElementById('resumenPaymentSourceBox').classList.toggle('hidden', !showResumenSource);

  if (showResumenSource && state.modal.mode === 'create') {
    const catSelect = document.getElementById('inputCategory');
    if (state.rubros.includes('Resumen de Tarjeta')) catSelect.value = 'Resumen de Tarjeta';
    const descInput = document.getElementById('inputDescription');
    if (!descInput.value.trim()) descInput.value = 'Pago Resumen Tarjeta de Crédito';
  }
}

function openModal(type = 'expense', preselectedMethod = null, txToEdit = null, openRubroCreator = false) {
  const form = document.getElementById('txForm');
  form.reset();
  renderRubrosSelects();

  if (txToEdit) {
    state.modal.mode = 'edit';
    state.modal.editingId = txToEdit.id;
    document.getElementById('modalTitle').textContent = 'Editar Movimiento';
    setModalType(txToEdit.type);
    document.getElementById('inputAmount').value = txToEdit.amount;
    document.getElementById('inputDate').value = txToEdit.date;
    document.getElementById('inputDescription').value = txToEdit.description;
    document.getElementById('inputCategory').value = txToEdit.category || 'General';

    const radioName = txToEdit.type === 'income' ? 'incomeMethod' : 'expenseMethod';
    const r = document.querySelector(`input[name="${radioName}"][value="${txToEdit.method}"]`);
    if (r) r.checked = true;

    if (txToEdit.installment && txToEdit.installment.includes('/')) {
      const [c, tot] = txToEdit.installment.split('/');
      document.getElementById('inputCuotaActual').value = c || 1;
      document.getElementById('inputCuotaTotal').value = tot || 1;
    }

    if (txToEdit.paidWith) {
      const rp = document.querySelector(`input[name="resumenPaidWith"][value="${txToEdit.paidWith}"]`);
      if (rp) rp.checked = true;
    }
  } else {
    state.modal.mode = 'create';
    state.modal.editingId = null;
    document.getElementById('modalTitle').textContent = type === 'income' ? 'Registrar Ingreso' : 'Registrar Gasto';
    document.getElementById('inputDate').value = getTodayISO();
    document.getElementById('inputCuotaActual').value = 1;
    document.getElementById('inputCuotaTotal').value = 1;
    document.getElementById('chkAutoGenerateInstallments').checked = true;
    setModalType(type);

    if (preselectedMethod) {
      const radioName = type === 'income' ? 'incomeMethod' : 'expenseMethod';
      const r = document.querySelector(`input[name="${radioName}"][value="${preselectedMethod}"]`);
      if (r) r.checked = true;
    }
  }

  syncExpenseExtraBoxes();
  document.getElementById('newRubroCreatorBox').classList.toggle('hidden', !openRubroCreator);
  document.getElementById('modalBackdrop').classList.remove('hidden');

  setTimeout(() => {
    if (openRubroCreator) document.getElementById('inputNewRubroName').focus();
    else document.getElementById('inputAmount').focus();
  }, 50);
}

function closeModal() {
  document.getElementById('modalBackdrop').classList.add('hidden');
}

function showToast(msg) {
  const container = document.getElementById('toastContainer');
  const el = document.createElement('div');
  el.className = 'px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-emerald-500 text-white dark:text-slate-950 text-xs font-bold shadow-lg';
  el.textContent = msg;
  container.appendChild(el);
  setTimeout(() => el.remove(), 2600);
}

// ==========================================
// DATOS DE PRUEBA COMPLETOS
// ==========================================

function loadDemoData() {
  const today = getTodayISO();
  state.transactions = [
    {
      id: 'demo_1',
      type: 'income',
      method: 'sueldo_banco',
      amount: 1450000,
      date: today,
      description: 'Acreditación Sueldo en Banco',
      category: 'General',
      installment: null,
      paidWith: null,
      createdAt: Date.now() - 900000
    },
    {
      id: 'demo_2',
      type: 'income',
      method: 'sueldo_efectivo',
      amount: 320000,
      date: today,
      description: 'Trabajos cobrados en efectivo',
      category: 'General',
      installment: null,
      paidWith: null,
      createdAt: Date.now() - 800000
    },
    {
      id: 'demo_3',
      type: 'income',
      method: 'ahorros_efectivo',
      amount: 250000,
      date: today,
      description: 'Ahorros guardados en efectivo',
      category: 'General',
      installment: null,
      paidWith: null,
      createdAt: Date.now() - 700000
    },
    {
      id: 'demo_4',
      type: 'expense',
      method: 'transferencia_qr_debito',
      amount: 380000,
      date: today,
      description: 'Alquiler y expensas departamento',
      category: 'Alquiler / Expensas',
      installment: null,
      paidWith: null,
      createdAt: Date.now() - 600000
    },
    {
      id: 'demo_5',
      type: 'expense',
      method: 'resumen_tarjeta',
      amount: 195000,
      date: today,
      description: 'Pago Resumen Tarjeta Visa',
      category: 'Resumen de Tarjeta',
      installment: null,
      paidWith: 'banco',
      createdAt: Date.now() - 500000
    },
    {
      id: 'demo_6',
      type: 'expense',
      method: 'tarjeta_credito',
      amount: 85000,
      date: today,
      description: 'Supermercado compra grande',
      category: 'Supermercado',
      installment: '1/1',
      paidWith: null,
      createdAt: Date.now() - 400000
    },
    {
      id: 'demo_7',
      type: 'expense',
      method: 'efectivo',
      amount: 42000,
      date: today,
      description: 'Verdulería y carnicería',
      category: 'Supermercado',
      installment: null,
      paidWith: null,
      createdAt: Date.now() - 300000
    }
  ];

  state.budgets = {
    'Supermercado': 250000,
    'Ocio / Salidas': 120000
  };

  state.bills = [
    {
      id: 'bill_demo_1',
      title: 'Factura Luz e Internet',
      amount: 48500,
      dueDate: today,
      method: 'transferencia_qr_debito',
      paid: false
    }
  ];

  saveAllState();
  renderRubrosSelects();
  renderDashboard();
}

// ==========================================
// EVENTOS E INTERACCIONES
// ==========================================

function bindEvents() {
  document.getElementById('btnTheme').addEventListener('click', toggleTheme);

  // Selector de Mes (Anterior / Siguiente / Input Month)
  const monthInput = document.getElementById('monthPickerInput');
  monthInput.value = state.filters.selectedYm;

  const changeMonthByOffset = (offset) => {
    const [y, m] = state.filters.selectedYm.split('-').map(Number);
    const d = new Date(y, m - 1 + offset, 1);
    state.filters.selectedYm = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    state.filters.periodMode = 'selected_month';
    document.getElementById('globalPeriodSelect').value = 'selected_month';
    monthInput.value = state.filters.selectedYm;
    renderDashboard();
  };

  document.getElementById('btnPrevMonth').addEventListener('click', () => changeMonthByOffset(-1));
  document.getElementById('btnNextMonth').addEventListener('click', () => changeMonthByOffset(1));
  monthInput.addEventListener('change', (e) => {
    if (e.target.value) {
      state.filters.selectedYm = e.target.value;
      state.filters.periodMode = 'selected_month';
      document.getElementById('globalPeriodSelect').value = 'selected_month';
      renderDashboard();
    }
  });

  document.getElementById('globalPeriodSelect').addEventListener('change', (e) => {
    state.filters.periodMode = e.target.value;
    document.getElementById('customRangeBar').classList.toggle('hidden', state.filters.periodMode !== 'custom');
    renderDashboard();
  });

  // Abrir modales principales
  document.getElementById('btnNewIncome').addEventListener('click', () => openModal('income'));
  document.getElementById('btnNewExpense').addEventListener('click', () => openModal('expense'));
  document.getElementById('btnFabAdd').addEventListener('click', () => openModal('expense'));
  document.getElementById('btnManageRubrosHeader').addEventListener('click', () => openModal('expense', null, null, true));
  document.getElementById('btnConfigTopes').addEventListener('click', () => openModal('expense', null, null, true));

  document.querySelectorAll('[data-quick-add]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const [type, method] = btn.dataset.quickAdd.split(':');
      openModal(type, method);
    });
  });

  document.getElementById('btnCloseModal').addEventListener('click', closeModal);
  document.getElementById('btnCancelModal').addEventListener('click', closeModal);
  document.getElementById('modalBackdrop').addEventListener('click', (e) => {
    if (e.target.id === 'modalBackdrop') closeModal();
  });

  document.getElementById('tabIncome').addEventListener('click', () => setModalType('income'));
  document.getElementById('tabExpense').addEventListener('click', () => setModalType('expense'));

  document.querySelectorAll('input[name="expenseMethod"]').forEach((r) => {
    r.addEventListener('change', syncExpenseExtraBoxes);
  });

  // Modal de Transferencias entre Cuentas (Mejora 3)
  const transferBackdrop = document.getElementById('transferModalBackdrop');
  const openTransferModal = () => {
    document.getElementById('transferForm').reset();
    document.getElementById('transferDate').value = getTodayISO();
    transferBackdrop.classList.remove('hidden');
  };
  const closeTransferModal = () => transferBackdrop.classList.add('hidden');

  document.getElementById('btnOpenTransfer').addEventListener('click', openTransferModal);
  document.getElementById('btnCloseTransferModal').addEventListener('click', closeTransferModal);
  document.getElementById('btnCancelTransfer').addEventListener('click', closeTransferModal);

  document.getElementById('transferForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const direction = document.querySelector('input[name="transferDirection"]:checked')?.value || 'banco_a_efectivo';
    const amount = parseFloat(document.getElementById('transferAmount').value);
    const date = document.getElementById('transferDate').value;
    const note = document.getElementById('transferNote').value.trim();

    if (!amount || amount <= 0) return;

    const defaultTitle = CATALOG.transfer[direction]?.label || 'Pase entre cuentas';
    state.transactions.unshift({
      id: `tr_${Date.now()}`,
      type: 'transfer',
      method: direction,
      amount,
      date,
      description: note || defaultTitle,
      category: 'Pase Interno',
      installment: null,
      paidWith: null,
      createdAt: Date.now()
    });

    saveAllState();
    closeTransferModal();
    renderDashboard();
    showToast('Pase entre cuentas registrado');
  });

  // Creador de Rubros y Topes
  document.getElementById('btnToggleNewRubro').addEventListener('click', () => {
    document.getElementById('newRubroCreatorBox').classList.toggle('hidden');
  });
  document.getElementById('btnCloseRubroCreator').addEventListener('click', () => {
    document.getElementById('newRubroCreatorBox').classList.add('hidden');
  });

  document.getElementById('btnAddRubroConfirm').addEventListener('click', () => {
    const nameInput = document.getElementById('inputNewRubroName');
    const budgetInput = document.getElementById('inputNewRubroBudget');
    if (saveOrUpdateRubroAndBudget(nameInput.value, budgetInput.value)) {
      nameInput.value = '';
      budgetInput.value = '';
    }
  });

  document.getElementById('customRubrosChips').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-remove-rubro]');
    if (!btn) return;
    const name = btn.dataset.removeRubro;
    state.rubros = state.rubros.filter((r) => r !== name);
    delete state.budgets[name];
    saveAllState();
    renderRubrosSelects();
    renderRubroRanking();
    showToast(`Rubro "${name}" eliminado`);
  });

  // Guardar Movimiento Principal (con Mejora 2: Proyección Automática de Cuotas Futuras)
  document.getElementById('txForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const type = state.modal.txType;
    const amount = parseFloat(document.getElementById('inputAmount').value);
    const date = document.getElementById('inputDate').value;
    const description = document.getElementById('inputDescription').value.trim();
    const category = type === 'income' ? 'General' : document.getElementById('inputCategory').value;

    const method =
      type === 'income'
        ? document.querySelector('input[name="incomeMethod"]:checked')?.value
        : document.querySelector('input[name="expenseMethod"]:checked')?.value;

    let paidWith = null;
    if (type === 'expense' && method === 'resumen_tarjeta') {
      paidWith = document.querySelector('input[name="resumenPaidWith"]:checked')?.value || 'banco';
    }

    if (state.modal.mode === 'edit' && state.modal.editingId) {
      let installment = null;
      if (type === 'expense' && method === 'tarjeta_credito') {
        const c = Math.max(1, parseInt(document.getElementById('inputCuotaActual').value, 10) || 1);
        const tot = Math.max(c, parseInt(document.getElementById('inputCuotaTotal').value, 10) || 1);
        installment = `${c}/${tot}`;
      }

      state.transactions = state.transactions.map((tx) =>
        tx.id === state.modal.editingId
          ? { ...tx, type, method, amount, date, description, category, installment, paidWith }
          : tx
      );
      showToast('Movimiento actualizado');
    } else {
      // Alta nueva
      if (type === 'expense' && method === 'tarjeta_credito') {
        const cStart = Math.max(1, parseInt(document.getElementById('inputCuotaActual').value, 10) || 1);
        const cTotal = Math.max(cStart, parseInt(document.getElementById('inputCuotaTotal').value, 10) || 1);
        const autoProject = document.getElementById('chkAutoGenerateInstallments').checked;

        if (autoProject && cTotal > cStart) {
          let createdCount = 0;
          for (let q = cStart; q <= cTotal; q++) {
            const monthOffset = q - cStart;
            const installmentDate = addMonthsToISODate(date, monthOffset);
            state.transactions.unshift({
              id: `tx_${Date.now()}_${q}`,
              type: 'expense',
              method: 'tarjeta_credito',
              amount,
              date: installmentDate,
              description,
              category,
              installment: `${q}/${cTotal}`,
              paidWith: null,
              createdAt: Date.now() + q
            });
            createdCount++;
          }
          showToast(`Se generaron ${createdCount} cuotas en meses consecutivos`);
        } else {
          state.transactions.unshift({
            id: `tx_${Date.now()}`,
            type: 'expense',
            method: 'tarjeta_credito',
            amount,
            date,
            description,
            category,
            installment: `${cStart}/${cTotal}`,
            paidWith: null,
            createdAt: Date.now()
          });
          showToast('Compra con tarjeta registrada');
        }
      } else {
        state.transactions.unshift({
          id: `tx_${Date.now()}`,
          type,
          method,
          amount,
          date,
          description,
          category,
          installment: null,
          paidWith,
          createdAt: Date.now()
        });
        showToast(type === 'income' ? 'Ingreso guardado' : 'Gasto guardado');
      }
    }

    saveAllState();
    closeModal();
    renderDashboard();
  });

  // Plantillas de Gastos Fijos (Mejora 5)
  const tplForm = document.getElementById('templateForm');
  document.getElementById('btnToggleNewTemplate').addEventListener('click', () => {
    tplForm.classList.toggle('hidden');
  });
  document.getElementById('btnCancelTemplate').addEventListener('click', () => {
    tplForm.classList.add('hidden');
  });

  tplForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('tplName').value.trim();
    const amount = parseFloat(document.getElementById('tplAmount').value);
    const method = document.getElementById('tplMethod').value;
    const category = document.getElementById('tplRubro').value || 'General';
    if (!name || !amount) return;

    state.templates.push({
      id: `tpl_${Date.now()}`,
      name,
      amount,
      method,
      category
    });
    saveAllState();
    tplForm.reset();
    tplForm.classList.add('hidden');
    renderTemplatesSection();
    showToast(`Gasto fijo "${name}" guardado`);
  });

  document.getElementById('templatesList').addEventListener('click', (e) => {
    const useBtn = e.target.closest('[data-use-template]');
    const delBtn = e.target.closest('[data-del-template]');
    if (useBtn) {
      const tpl = state.templates.find((t) => t.id === useBtn.dataset.useTemplate);
      if (!tpl) return;
      state.transactions.unshift({
        id: `tx_${Date.now()}`,
        type: 'expense',
        method: tpl.method,
        amount: tpl.amount,
        date: getTodayISO(),
        description: tpl.name,
        category: tpl.category,
        installment: tpl.method === 'tarjeta_credito' ? '1/1' : null,
        paidWith: tpl.method === 'resumen_tarjeta' ? 'banco' : null,
        createdAt: Date.now()
      });
      saveAllState();
      renderDashboard();
      showToast(`"${tpl.name}" registrado en tus movimientos`);
    } else if (delBtn) {
      state.templates = state.templates.filter((t) => t.id !== delBtn.dataset.delTemplate);
      saveAllState();
      renderTemplatesSection();
    }
  });

  // Agenda de Vencimientos (Mejora 6)
  const billForm = document.getElementById('billForm');
  document.getElementById('btnToggleNewBill').addEventListener('click', () => {
    document.getElementById('billDueDate').value = getTodayISO();
    billForm.classList.toggle('hidden');
  });
  document.getElementById('btnCancelBill').addEventListener('click', () => {
    billForm.classList.add('hidden');
  });

  billForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('billTitle').value.trim();
    const amount = parseFloat(document.getElementById('billAmount').value);
    const dueDate = document.getElementById('billDueDate').value;
    const method = document.getElementById('billMethod').value;
    if (!title || !amount || !dueDate) return;

    state.bills.push({
      id: `bill_${Date.now()}`,
      title,
      amount,
      dueDate,
      method,
      paid: false
    });
    saveAllState();
    billForm.reset();
    billForm.classList.add('hidden');
    renderBillsSection();
    showToast('Vencimiento agendado');
  });

  document.getElementById('billsList').addEventListener('click', (e) => {
    const payBtn = e.target.closest('[data-pay-bill]');
    const delBtn = e.target.closest('[data-del-bill]');
    if (payBtn) {
      const bill = state.bills.find((b) => b.id === payBtn.dataset.payBill);
      if (!bill) return;
      bill.paid = true;
      state.transactions.unshift({
        id: `tx_${Date.now()}`,
        type: 'expense',
        method: bill.method,
        amount: bill.amount,
        date: getTodayISO(),
        description: bill.title,
        category: bill.method === 'resumen_tarjeta' ? 'Resumen de Tarjeta' : 'Servicios (Luz, Gas, Internet)',
        installment: bill.method === 'tarjeta_credito' ? '1/1' : null,
        paidWith: bill.method === 'resumen_tarjeta' ? 'banco' : null,
        createdAt: Date.now()
      });
      saveAllState();
      renderDashboard();
      showToast(`"${bill.title}" marcado como pagado y descontado`);
    } else if (delBtn) {
      state.bills = state.bills.filter((b) => b.id !== delBtn.dataset.delBill);
      saveAllState();
      renderBillsSection();
    }
  });

  // Editar / Borrar en Historial
  document.getElementById('txListContainer').addEventListener('click', (e) => {
    const editBtn = e.target.closest('[data-edit]');
    const delBtn = e.target.closest('[data-delete]');
    if (editBtn) {
      const tx = state.transactions.find((t) => t.id === editBtn.dataset.edit);
      if (tx) openModal(tx.type, tx.method, tx);
    } else if (delBtn) {
      state.transactions = state.transactions.filter((t) => t.id !== delBtn.dataset.delete);
      saveAllState();
      renderDashboard();
      showToast('Registro eliminado');
    }
  });

  // Filtros del Historial
  document.getElementById('dateFromInput').addEventListener('change', (e) => {
    state.filters.dateFrom = e.target.value;
    renderDashboard();
  });
  document.getElementById('dateToInput').addEventListener('change', (e) => {
    state.filters.dateTo = e.target.value;
    renderDashboard();
  });

  document.querySelectorAll('.type-filter-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.filters.type = btn.dataset.typeFilter;
      document.querySelectorAll('.type-filter-btn').forEach((b) => {
        const active = b.dataset.typeFilter === state.filters.type;
        b.className = active
          ? 'type-filter-btn py-1.5 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs'
          : 'type-filter-btn py-1.5 rounded-lg text-slate-600 dark:text-slate-400';
      });
      renderFeed();
    });
  });

  document.getElementById('methodFilterSelect').addEventListener('change', (e) => {
    state.filters.method = e.target.value;
    renderFeed();
  });
  document.getElementById('rubroFilterSelect').addEventListener('change', (e) => {
    state.filters.rubro = e.target.value;
    renderFeed();
  });
  document.getElementById('searchInput').addEventListener('input', (e) => {
    state.filters.search = e.target.value;
    renderFeed();
  });

  document.getElementById('btnResetFilters').addEventListener('click', () => {
    state.filters.type = 'all';
    state.filters.method = 'all';
    state.filters.rubro = 'all';
    state.filters.search = '';
    document.getElementById('methodFilterSelect').value = 'all';
    document.getElementById('rubroFilterSelect').value = 'all';
    document.getElementById('searchInput').value = '';
    document.querySelectorAll('.type-filter-btn').forEach((b) => {
      const active = b.dataset.typeFilter === 'all';
      b.className = active
        ? 'type-filter-btn py-1.5 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs'
        : 'type-filter-btn py-1.5 rounded-lg text-slate-600 dark:text-slate-400';
    });
    renderFeed();
  });

  // Menú de Datos / Exportación
  const menuBtn = document.getElementById('btnDataMenu');
  const dropdown = document.getElementById('dataMenuDropdown');
  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('hidden');
  });
  window.addEventListener('click', () => dropdown.classList.add('hidden'));

  document.getElementById('btnLoadDemo').addEventListener('click', () => {
    loadDemoData();
    showToast('Ejemplos de prueba cargados');
  });

  document.getElementById('btnClearAll').addEventListener('click', () => {
    if (confirm('¿Seguro que quieres borrar todos los movimientos y vencimientos?')) {
      state.transactions = [];
      state.bills = [];
      saveAllState();
      renderDashboard();
      showToast('Todos los registros fueron borrados');
    }
  });

  document.getElementById('btnExportCSV').addEventListener('click', () => {
    if (state.transactions.length === 0) return showToast('No hay datos para exportar');
    const headers = ['Fecha', 'Tipo', 'Cuenta_o_Medio', 'Monto', 'Cuota', 'Rubro', 'Descripcion'];
    const rows = state.transactions.map((tx) => {
      const label =
        tx.type === 'income'
          ? CATALOG.income[tx.method]?.label || tx.method
          : tx.type === 'transfer'
          ? CATALOG.transfer[tx.method]?.label || tx.method
          : CATALOG.expense[tx.method]?.label || tx.method;
      return [
        tx.date,
        tx.type === 'income' ? 'Ingreso' : tx.type === 'transfer' ? 'Pase Interno' : 'Egreso',
        `"${label}"`,
        tx.amount,
        tx.installment || '',
        `"${tx.category || ''}"`,
        `"${String(tx.description || '').replace(/"/g, '""')}"`
      ].join(',');
    });
    const csv = '\uFEFF' + [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `control_gastos_${getTodayISO()}.csv`;
    a.click();
  });

  document.getElementById('btnExportJSON').addEventListener('click', () => {
    const payload = {
      transactions: state.transactions,
      rubros: state.rubros,
      budgets: state.budgets,
      templates: state.templates,
      bills: state.bills
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `backup_gastos_${getTodayISO()}.json`;
    a.click();
  });

  document.getElementById('inputImportJSON').addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        if (Array.isArray(data)) {
          state.transactions = data;
        } else if (data && Array.isArray(data.transactions)) {
          state.transactions = data.transactions;
          if (Array.isArray(data.rubros)) state.rubros = data.rubros;
          if (data.budgets) state.budgets = data.budgets;
          if (Array.isArray(data.templates)) state.templates = data.templates;
          if (Array.isArray(data.bills)) state.bills = data.bills;
        }
        saveAllState();
        renderRubrosSelects();
        renderDashboard();
        showToast('Copia restaurada con éxito');
      } catch {
        showToast('Archivo inválido');
      }
    };
    reader.readAsText(file);
  });
}

function init() {
  initTheme();
  const loadedRubros = loadJSON(RUBROS_KEY, [...DEFAULT_RUBROS]);
  for (const r of DEFAULT_RUBROS) {
    if (!loadedRubros.includes(r)) loadedRubros.push(r);
  }
  state.rubros = loadedRubros;
  state.budgets = loadJSON(BUDGETS_KEY, {});
  state.templates = loadJSON(TEMPLATES_KEY, [...DEFAULT_TEMPLATES]);
  state.bills = loadJSON(BILLS_KEY, []);

  const savedTxs = loadJSON(STORAGE_KEY, null);
  if (!savedTxs || savedTxs.length === 0) {
    state.transactions = [...INITIAL_USER_TRANSACTIONS];
    saveAllState();
  } else {
    const existingIds = new Set(savedTxs.map((t) => t.id));
    let added = false;
    for (const initTx of INITIAL_USER_TRANSACTIONS) {
      if (!existingIds.has(initTx.id)) {
        savedTxs.push(initTx);
        added = true;
      }
    }
    state.transactions = savedTxs;
    if (added) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.transactions));
    }
  }

  renderRubrosSelects();
  bindEvents();
  renderDashboard();

  // Registrar Service Worker si se abre desde https:// o localhost (para instalar en iPhone)
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }
}

init();
