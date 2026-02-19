import { useState, useCallback, useMemo, createContext, useContext } from "react";

// ============================================================
// i18n — ПЕРЕВОДЫ
// ============================================================

const TRANSLATIONS = {
  ru: {
    nav_dashboard: "Главная", nav_income: "Доходы", nav_debts: "Долги", nav_forecast: "Прогноз", nav_settings: "Настройки",
    onboard_title1: "Привет!", onboard_sub1: "FinanceOS — персональный финансовый менеджер. Строгие алгоритмы, никакого AI-мусора.", onboard_btn1: "Начать",
    onboard_title2: "Как вас зовут?", onboard_placeholder_name: "Имя", onboard_btn2: "Далее",
    onboard_title3: "Финансовая модель", onboard_btn3: "Готово",
    onboard_preset_basic: "Базовый", onboard_preset_balanced: "Сбалансированный", onboard_preset_saving: "Накопительный",
    onboard_debt_method: "Метод погашения долгов:", onboard_avalanche: "⛰ Лавина", onboard_snowball: "☃ Снежный ком",
    free_money: "Свободные деньги", from_income: "из", income_label: "дохода", add_income: "Добавить доход",
    income: "Доход", rating: "Рейтинг", debts: "Долги", no_debts: "✓ Чисто", savings: "Накопления",
    budget_distribution: "Распределение бюджета",
    mandatory: "Обязательные", variable_limit: "Переменные (лимит)", debts_min: "Долги (мин.)", savings_label: "Накопления", free_label: "Свободные",
    cushion: "Финансовая подушка", cushion_coverage: "Покрытие расходов", cushion_goal: "Цель: 6 месяцев", months_short: "мес.",
    auto_rules: "Автоправила",
    alert_mandatory_high: "Обязательные расходы >70% дохода — критическая нагрузка",
    alert_debt_high: "Долговая нагрузка >40% дохода — высокий риск",
    alert_cushion_low: "Подушка {n} мес. — нестабильность (нужно 3+)",
    alert_free_high: "Свободных денег >20% — рекомендуем увеличить накопления",
    chip_mandatory_high: "Нагрузка >70%", chip_debt_high: "Долг >40%", chip_cushion_low: "Подушка <3м", chip_free_high: "Свободные >20%",
    current_month: "Текущий месяц", total_income: "Общий доход", income_sources: "Источники дохода",
    active_income: "Активный доход (зарплата, фриланс)", passive_income: "Пассивный доход (аренда, дивиденды)", other_income: "Прочее (подарки, бонусы)",
    save_income: "Сохранить доход", saved: "Сохранено", expenses: "Расходы", add_expense: "Добавить расход", new_expense: "Новый расход",
    expense_name: "Название", expense_name_ph: "Аренда квартиры...", expense_category: "Категория", expense_amount: "Сумма", expense_frequency: "Периодичность",
    freq_monthly: "Ежемесячно", freq_quarterly: "Ежеквартально", freq_yearly: "Ежегодно",
    freq_short_monthly: "/мес", freq_short_quarterly: "квартал", freq_short_yearly: "год",
    mandatory_expense: "Обязательный расход", mandatory_chip: "Обязательный", flexible_chip: "Гибкий", cancel: "Отмена", add: "Добавить",
    categories: ["Жильё", "Транспорт", "Питание", "Связь", "Здоровье", "Образование", "Развлечения", "Другое"],
    total_debt: "Общий долг", no_debts_msg: "Долгов нет! 🎉", closes_in: "Закроется за", overpay: "Переплата",
    extra_payment_month: "Доп. платёж в месяц", extra_payment: "Доп. платёж", my_debts: "Мои долги",
    annual_rate: "% год.", min_payment: "мин.", paid_from: "из", months_to_close: "мес. до закрытия",
    schedule: "График", close_debt: "Закрыть", closed_debts: "Закрытые долги", closed_chip: "✓ Закрыт",
    add_debt: "Добавить долг", new_debt: "Новый долг", debt_name: "Название долга", debt_name_ph: "Ипотека, кредит...",
    debt_total: "Первоначальная сумма", debt_balance: "Текущий остаток *", debt_rate: "Годовая ставка %", debt_min: "Минимальный платёж/мес",
    debt_plan_title: "График:", plan_term: "Срок", plan_overpay: "Переплата",
    month_short: "М", payment: "Платёж:", interest_short: "%:", balance_short: "Ост:",
    forecast_unavailable: "Прогноз недоступен", forecast_add_income: "Введите доход для генерации прогноза",
    scenario_base: "Базовый", scenario_plus10: "+10% доход", scenario_minus10: "-10% расходы", scenario_extra: "+Платёж",
    milestones: "Ключевые события", debts_close: "🎯 Все долги закроются", debts_long: "💳 Долги >12 мес.", debts_term: "Долгосрочно",
    no_debts_now: "✅ Долгов нет", now: "Сейчас", million_savings: "💰 Накопления 1 млн ₽", to_million: "💰 До 1 млн ₽",
    no_savings_plan: "Нет накоплений", savings_growth: "Рост накоплений", now_label: "Сейчас:", after_12: "Через 12 мес:",
    debt_reduction: "Снижение долга", monthly_table: "По месяцам", col_month: "Мес.", col_savings: "Накопления", col_debt: "Долг", col_free: "Свободные",
    finance_model: "Финансовая модель", ready_models: "Готовые модели", manual_setup: "Настройка вручную",
    variable_expenses: "Переменные расходы", extra_debt_payments: "Доп. платежи по долгам",
    auto_note: "* Остальное (обязательные) = {n}% — покрывается автоматически",
    debt_method_title: "Метод погашения долгов", avalanche_label: "⛰ Лавина (выгодно)", snowball_label: "☃ Снежный ком (мотивация)",
    avalanche_desc: "Первым закрываем долг с наибольшей ставкой — минимальная переплата",
    snowball_desc: "Первым закрываем наименьший долг — максимальная мотивация",
    add_savings_title: "Пополнить накопления", current_savings: "Текущие накопления", add_amount: "Добавить сумму",
    save_settings: "Сохранить настройки",
    app_info: "Все расчёты выполняются по финансовым алгоритмам: амортизация долгов со сложными процентами, нормализация периодических расходов, алгоритмический рейтинг. Данные сохраняются локально.",
    language: "Язык",
    months_arr: ["Янв","Фев","Мар","Апр","Май","Июн","Июл","Авг","Сен","Окт","Ноя","Дек"],
  },
  en: {
    nav_dashboard: "Dashboard", nav_income: "Income", nav_debts: "Debts", nav_forecast: "Forecast", nav_settings: "Settings",
    onboard_title1: "Hello!", onboard_sub1: "FinanceOS — your personal finance manager. Strict algorithms, no AI fluff.", onboard_btn1: "Get Started",
    onboard_title2: "What's your name?", onboard_placeholder_name: "Name", onboard_btn2: "Next",
    onboard_title3: "Financial Model", onboard_btn3: "Done",
    onboard_preset_basic: "Basic", onboard_preset_balanced: "Balanced", onboard_preset_saving: "Saving-first",
    onboard_debt_method: "Debt repayment method:", onboard_avalanche: "⛰ Avalanche", onboard_snowball: "☃ Snowball",
    free_money: "Free Money", from_income: "of", income_label: "income", add_income: "Add Income",
    income: "Income", rating: "Rating", debts: "Debts", no_debts: "✓ Clear", savings: "Savings",
    budget_distribution: "Budget Distribution",
    mandatory: "Mandatory", variable_limit: "Variable (limit)", debts_min: "Debts (min.)", savings_label: "Savings", free_label: "Free",
    cushion: "Financial Cushion", cushion_coverage: "Expense coverage", cushion_goal: "Goal: 6 months", months_short: "mo.",
    auto_rules: "Auto Rules",
    alert_mandatory_high: "Mandatory expenses >70% of income — critical load",
    alert_debt_high: "Debt load >40% of income — high risk",
    alert_cushion_low: "Cushion {n} mo. — unstable (need 3+)",
    alert_free_high: "Free money >20% — consider increasing savings",
    chip_mandatory_high: "Load >70%", chip_debt_high: "Debt >40%", chip_cushion_low: "Cushion <3m", chip_free_high: "Free >20%",
    current_month: "Current Month", total_income: "Total Income", income_sources: "Income Sources",
    active_income: "Active income (salary, freelance)", passive_income: "Passive income (rent, dividends)", other_income: "Other (gifts, bonuses)",
    save_income: "Save Income", saved: "Saved", expenses: "Expenses", add_expense: "Add Expense", new_expense: "New Expense",
    expense_name: "Name", expense_name_ph: "Rent, utilities...", expense_category: "Category", expense_amount: "Amount", expense_frequency: "Frequency",
    freq_monthly: "Monthly", freq_quarterly: "Quarterly", freq_yearly: "Yearly",
    freq_short_monthly: "/mo", freq_short_quarterly: "quarter", freq_short_yearly: "year",
    mandatory_expense: "Mandatory expense", mandatory_chip: "Mandatory", flexible_chip: "Flexible", cancel: "Cancel", add: "Add",
    categories: ["Housing", "Transport", "Food", "Utilities", "Health", "Education", "Entertainment", "Other"],
    total_debt: "Total Debt", no_debts_msg: "No debts! 🎉", closes_in: "Closes in", overpay: "Overpayment",
    extra_payment_month: "Extra payment / month", extra_payment: "Extra payment", my_debts: "My Debts",
    annual_rate: "% p.a.", min_payment: "min.", paid_from: "of", months_to_close: "mo. to close",
    schedule: "Schedule", close_debt: "Close", closed_debts: "Closed Debts", closed_chip: "✓ Closed",
    add_debt: "Add Debt", new_debt: "New Debt", debt_name: "Debt name", debt_name_ph: "Mortgage, loan...",
    debt_total: "Original amount", debt_balance: "Current balance *", debt_rate: "Annual rate %", debt_min: "Minimum payment/mo",
    debt_plan_title: "Schedule:", plan_term: "Term", plan_overpay: "Overpayment",
    month_short: "M", payment: "Payment:", interest_short: "Int:", balance_short: "Bal:",
    forecast_unavailable: "Forecast unavailable", forecast_add_income: "Enter income to generate forecast",
    scenario_base: "Base", scenario_plus10: "+10% income", scenario_minus10: "-10% expenses", scenario_extra: "+Payment",
    milestones: "Key Milestones", debts_close: "🎯 All debts closed", debts_long: "💳 Debts >12 mo.", debts_term: "Long-term",
    no_debts_now: "✅ No debts", now: "Now", million_savings: "💰 Savings reach 1M", to_million: "💰 To 1M",
    no_savings_plan: "No savings plan", savings_growth: "Savings Growth", now_label: "Now:", after_12: "In 12 months:",
    debt_reduction: "Debt Reduction", monthly_table: "Monthly Breakdown", col_month: "Mo.", col_savings: "Savings", col_debt: "Debt", col_free: "Free",
    finance_model: "Financial Model", ready_models: "Preset Models", manual_setup: "Manual Setup",
    variable_expenses: "Variable expenses", extra_debt_payments: "Extra debt payments",
    auto_note: "* Remainder (mandatory) = {n}% — covered automatically",
    debt_method_title: "Debt Repayment Method", avalanche_label: "⛰ Avalanche (optimal)", snowball_label: "☃ Snowball (motivation)",
    avalanche_desc: "Pay off highest-rate debt first — minimum overpayment",
    snowball_desc: "Pay off smallest debt first — maximum motivation",
    add_savings_title: "Add to Savings", current_savings: "Current savings", add_amount: "Add amount",
    save_settings: "Save Settings",
    app_info: "All calculations use financial algorithms: compound interest amortization, periodic expense normalization, algorithmic rating. Data saved locally.",
    language: "Language",
    months_arr: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
  },
};

// ============================================================
// i18n CONTEXT
// ============================================================

const LangContext = createContext({ lang: "ru", t: (k) => k, setLang: () => {} });
const useLang = () => useContext(LangContext);

function LangProvider({ children }) {
  const [lang, setLangRaw] = useState(() => { try { return localStorage.getItem("fo_lang") || "ru"; } catch { return "ru"; } });
  const setLang = useCallback((l) => { setLangRaw(l); try { localStorage.setItem("fo_lang", l); } catch {} }, []);
  const t = useCallback((key, vars = {}) => {
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.ru;
    let str = dict[key] ?? TRANSLATIONS.ru[key] ?? key;
    if (typeof str !== "string") return str;
    Object.entries(vars).forEach(([k, v]) => { str = str.replace(`{${k}}`, v); });
    return str;
  }, [lang]);
  return <LangContext.Provider value={{ lang, t, setLang }}>{children}</LangContext.Provider>;
}

// ============================================================
// АЛГОРИТМЫ
// ============================================================

const PRESETS = {
  "75/15/10": { mandatory: 75, variable: 15, savings: 10, debts: 0 },
  "50/30/20": { mandatory: 50, variable: 30, savings: 20, debts: 0 },
  "30/20/50": { mandatory: 30, variable: 20, savings: 50, debts: 0 },
};

const calcMonthly = (amount, freq) => freq === "quarterly" ? amount / 3 : freq === "yearly" ? amount / 12 : amount;

function distributeBudget(income, expenses, debts, settings) {
  const mandatory = expenses.filter(e => e.is_mandatory).reduce((s, e) => s + calcMonthly(e.amount, e.frequency), 0);
  const variable_fixed = expenses.filter(e => !e.is_mandatory).reduce((s, e) => s + calcMonthly(e.amount, e.frequency), 0);
  const min_debt = debts.filter(d => !d.is_closed).reduce((s, d) => s + d.min_payment, 0);
  const after = income - mandatory - min_debt;
  const pct = settings.pct;
  const variable_budget = after > 0 ? after * pct.variable / 100 : 0;
  const extra_debt = after > 0 ? after * pct.debts / 100 : 0;
  const sav = after > 0 ? after * pct.savings / 100 : 0;
  const free = after > 0 ? after - variable_budget - extra_debt - sav : after;
  return { mandatory, variable_fixed, min_debt, variable_budget, extra_debt, savings: sav, free, after, critical: after < 0 };
}

function calcDebtPlan(debts, extra_monthly, method) {
  const active = debts.filter(d => !d.is_closed).map(d => ({ ...d }));
  if (!active.length) return { months: 0, total_interest: 0, plan: [] };
  let balances = {}; active.forEach(d => balances[d.id] = d.current_balance);
  let total_interest = 0, month = 0; const plan = [];
  while (Object.values(balances).some(b => b > 0.01) && month < 360) {
    month++;
    const open = active.filter(d => balances[d.id] > 0.01); if (!open.length) break;
    const priority = method === "snowball"
      ? open.reduce((a, b) => balances[a.id] < balances[b.id] ? a : b)
      : open.reduce((a, b) => a.interest_rate > b.interest_rate ? a : b);
    let month_detail = {};
    open.forEach(d => {
      const rate = d.interest_rate / 100 / 12, bal = balances[d.id], interest = bal * rate;
      total_interest += interest;
      let payment = Math.min(d.min_payment + (d.id === priority.id ? extra_monthly : 0), bal + interest);
      balances[d.id] = Math.max(0, bal - (payment - interest));
      month_detail[d.id] = { payment, interest, principal: payment - interest, balance: balances[d.id] };
    });
    plan.push({ month, details: month_detail });
  }
  return { months: month, total_interest, plan };
}

function calcRating(budget, income, savings_total, monthly_mandatory) {
  if (!income) return 5; let score = 10;
  const dr = budget.min_debt / income;
  if (dr > 0.5) score -= 3; else if (dr > 0.4) score -= 2; else if (dr > 0.3) score -= 1; else if (dr < 0.1) score += 0.5;
  const cushion = monthly_mandatory > 0 ? savings_total / monthly_mandatory : 0;
  if (cushion < 1) score -= 2.5; else if (cushion < 3) score -= 1.5; else if (cushion < 6) score -= 0.5; else score += 0.5;
  const sr = budget.savings / income;
  if (sr < 0.05) score -= 2; else if (sr < 0.1) score -= 1; else if (sr > 0.2) score += 0.5;
  const er = (budget.mandatory + budget.variable_fixed) / income;
  if (er > 0.9) score -= 2; else if (er > 0.8) score -= 1; else if (er < 0.6) score += 0.5;
  return Math.max(1, Math.min(10, Math.round(score * 10) / 10));
}

function checkRules(budget, income, savings_total, monthly_mandatory, t) {
  const alerts = []; if (!income) return alerts;
  if (budget.mandatory / income > 0.7) alerts.push({ id: "mandatory_high", sev: "critical", msg: t("alert_mandatory_high") });
  if (budget.min_debt / income > 0.4) alerts.push({ id: "debt_high", sev: "warning", msg: t("alert_debt_high") });
  const cushion = monthly_mandatory > 0 ? savings_total / monthly_mandatory : 99;
  if (cushion < 3) alerts.push({ id: "cushion_low", sev: "warning", msg: t("alert_cushion_low", { n: cushion.toFixed(1) }) });
  if (budget.free / income > 0.2) alerts.push({ id: "free_high", sev: "info", msg: t("alert_free_high") });
  return alerts;
}

function generate12MonthForecast(income, budget, debts, savings_total, settings, scenario) {
  const mi = scenario === "plus10" ? 1.1 : 1.0, me = scenario === "minus10" ? 0.9 : 1.0;
  const ep = scenario === "extra_payment" ? budget.free * 0.5 : 0;
  let cur_sav = savings_total, cur_debts = {};
  debts.filter(d => !d.is_closed).forEach(d => cur_debts[d.id] = d.current_balance);
  const pct = settings.pct, months = [];
  for (let m = 1; m <= 12; m++) {
    const inc = income * mi, mand = budget.mandatory * me;
    const min_d = Object.keys(cur_debts).filter(id => cur_debts[id] > 0.01).reduce((s, id) => { const d = debts.find(x => x.id === id); return s + (d ? d.min_payment : 0); }, 0);
    const after = inc - mand - min_d;
    const sav = after > 0 ? after * pct.savings / 100 : 0;
    const extra_d = (after > 0 ? after * pct.debts / 100 : 0) + ep;
    const free = after > 0 ? after - after * pct.variable / 100 - extra_d - sav : after;
    const open = Object.keys(cur_debts).filter(id => cur_debts[id] > 0.01);
    if (open.length && extra_d > 0) {
      const pid = settings.debt_method === "snowball" ? open.reduce((a, b) => cur_debts[a] < cur_debts[b] ? a : b) : open.reduce((a, b) => { const da = debts.find(x => x.id === a), db = debts.find(x => x.id === b); return (da?.interest_rate || 0) > (db?.interest_rate || 0) ? a : b; });
      cur_debts[pid] = Math.max(0, cur_debts[pid] - extra_d);
    }
    open.forEach(id => { const d = debts.find(x => x.id === id); if (d && cur_debts[id] > 0.01) cur_debts[id] *= (1 + d.interest_rate / 100 / 12); });
    cur_sav += sav;
    months.push({ m, income: inc, mandatory: mand, free: Math.max(0, free), savings: cur_sav, total_debt: Object.values(cur_debts).reduce((s, v) => s + v, 0) });
  }
  return months;
}

// ============================================================
// STORAGE
// ============================================================

const STORAGE_KEY = "finance_os_v1";
const loadState = () => { try { const r = localStorage.getItem(STORAGE_KEY); return r ? JSON.parse(r) : null; } catch { return null; } };
const saveState = (s) => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch {} };
const DEFAULT_STATE = { user: { name: "User" }, income: { active: 0, passive: 0, other: 0 }, expenses: [], debts: [], savings_total: 0, savings_history: [], settings: { model: "50/30/20", pct: { mandatory: 50, variable: 30, savings: 20, debts: 0 }, debt_method: "avalanche" }, onboarded: false };

// ============================================================
// ICONS
// ============================================================

const Icon = ({ name, size = 20, color = "currentColor" }) => {
  const icons = {
    home: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    wallet: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>,
    credit: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
    settings: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
    plus: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    trash: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>,
    alert: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>,
    forecast: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    star: <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  };
  return icons[name] || null;
};

const fmt = (n, compact = false, lang = "ru") => {
  if (n === undefined || n === null || isNaN(n)) return "—";
  const locale = lang === "en" ? "en-US" : "ru-RU", currency = lang === "en" ? "USD" : "RUB";
  if (compact && Math.abs(n) >= 1000000) return (n / 1000000).toFixed(1) + (lang === "en" ? "M" : "M ₽");
  if (compact && Math.abs(n) >= 1000) return (n / 1000).toFixed(0) + (lang === "en" ? "K" : "K ₽");
  return new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 0 }).format(n);
};

// ============================================================
// CSS
// ============================================================

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #0a0a0f; --bg2: #111118; --bg3: #1a1a24; --bg4: #22222e;
    --border: rgba(255,255,255,0.07); --border2: rgba(255,255,255,0.12);
    --text: #f0f0f5; --text2: #9090a8; --text3: #5a5a70;
    --accent: #7c3aed; --accent2: #a855f7; --accent-glow: rgba(124,58,237,0.3);
    --green: #10b981; --green-dim: rgba(16,185,129,0.15);
    --red: #ef4444; --red-dim: rgba(239,68,68,0.15);
    --yellow: #f59e0b; --yellow-dim: rgba(245,158,11,0.15);
    --blue: #3b82f6; --blue-dim: rgba(59,130,246,0.15);
    --radius: 16px; --radius-sm: 10px;
  }
  body { background: var(--bg); color: var(--text); font-family: 'DM Sans', sans-serif; min-height: 100vh; overflow-x: hidden; }
  .app { max-width: 420px; margin: 0 auto; min-height: 100vh; display: flex; flex-direction: column; }
  .header { padding: 14px 18px 12px; background: linear-gradient(180deg, var(--bg) 0%, transparent 100%); position: sticky; top: 0; z-index: 100; backdrop-filter: blur(20px); border-bottom: 1px solid var(--border); }
  .header-row { display: flex; align-items: center; justify-content: space-between; }
  .logo { font-family: 'Unbounded', sans-serif; font-size: 13px; font-weight: 700; background: linear-gradient(135deg, var(--accent2), #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .header-right { display: flex; align-items: center; gap: 8px; }
  .lang-toggle { display: flex; background: var(--bg3); border: 1px solid var(--border2); border-radius: 20px; overflow: hidden; }
  .lang-btn { padding: 5px 10px; font-family: 'Unbounded', sans-serif; font-size: 10px; font-weight: 700; border: none; background: none; cursor: pointer; color: var(--text3); transition: all 0.2s; letter-spacing: 0.04em; }
  .lang-btn.active { background: linear-gradient(135deg, var(--accent), var(--accent2)); color: white; border-radius: 20px; }
  .rating-badge { display: flex; align-items: center; gap: 5px; background: var(--bg3); border: 1px solid var(--border2); border-radius: 20px; padding: 5px 10px; font-family: 'Unbounded', sans-serif; font-size: 11px; font-weight: 600; }
  .content { flex: 1; padding: 16px 16px 100px; overflow-y: auto; }
  .nav { position: fixed; bottom: 0; left: 50%; transform: translateX(-50%); width: 100%; max-width: 420px; background: rgba(10,10,15,0.96); backdrop-filter: blur(24px); border-top: 1px solid var(--border); display: flex; padding: 8px 0 env(safe-area-inset-bottom, 8px); z-index: 200; }
  .nav-item { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; padding: 6px 4px; cursor: pointer; border: none; background: none; color: var(--text3); font-family: 'DM Sans', sans-serif; font-size: 9px; font-weight: 500; transition: color 0.2s; }
  .nav-item.active { color: var(--accent2); }
  .nav-item.active svg { filter: drop-shadow(0 0 6px var(--accent)); }
  .card { background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius); padding: 18px; margin-bottom: 12px; }
  .card-accent { background: linear-gradient(135deg, rgba(124,58,237,0.15), rgba(168,85,247,0.08)); border-color: rgba(124,58,237,0.3); }
  .card-green { background: var(--green-dim); border-color: rgba(16,185,129,0.25); }
  .card-red { background: var(--red-dim); border-color: rgba(239,68,68,0.25); }
  .card-yellow { background: var(--yellow-dim); border-color: rgba(245,158,11,0.25); }
  .label { font-size: 11px; color: var(--text3); font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 4px; }
  .amount-xl { font-family: 'Unbounded', sans-serif; font-size: 28px; font-weight: 700; line-height: 1.1; letter-spacing: -0.02em; }
  .amount-lg { font-family: 'Unbounded', sans-serif; font-size: 18px; font-weight: 600; }
  .amount-md { font-family: 'Unbounded', sans-serif; font-size: 14px; font-weight: 600; }
  .amount-sm { font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600; }
  .row { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
  .section-title { font-family: 'Unbounded', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text3); margin: 20px 0 10px; }
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px; }
  .stat-card { background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 14px; }
  .progress-bar { height: 4px; background: var(--bg3); border-radius: 2px; overflow: hidden; margin-top: 8px; }
  .progress-fill { height: 100%; border-radius: 2px; transition: width 0.6s ease; }
  .btn { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 14px 20px; border-radius: var(--radius-sm); border: none; cursor: pointer; font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 14px; transition: all 0.2s; width: 100%; }
  .btn-primary { background: linear-gradient(135deg, var(--accent), var(--accent2)); color: white; box-shadow: 0 4px 20px var(--accent-glow); }
  .btn-primary:active { transform: scale(0.98); }
  .btn-ghost { background: var(--bg3); color: var(--text2); border: 1px solid var(--border); }
  .btn-danger { background: var(--red-dim); color: var(--red); border: 1px solid rgba(239,68,68,0.2); }
  .btn-sm { padding: 8px 14px; font-size: 12px; width: auto; border-radius: 8px; }
  .input { width: 100%; background: var(--bg3); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 12px 14px; color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 14px; outline: none; transition: border-color 0.2s; }
  .input:focus { border-color: var(--accent); }
  .input::placeholder { color: var(--text3); }
  .input-label { font-size: 12px; color: var(--text2); font-weight: 500; margin-bottom: 6px; }
  .input-group { margin-bottom: 14px; }
  .select { width: 100%; background: var(--bg3); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 12px 14px; color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 14px; outline: none; -webkit-appearance: none; cursor: pointer; }
  .chip { display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; white-space: nowrap; }
  .chip-green { background: var(--green-dim); color: var(--green); }
  .chip-red { background: var(--red-dim); color: var(--red); }
  .chip-yellow { background: var(--yellow-dim); color: var(--yellow); }
  .chip-purple { background: var(--accent-glow); color: var(--accent2); }
  .chip-blue { background: var(--blue-dim); color: var(--blue); }
  .alert-item { display: flex; gap: 10px; padding: 12px; border-radius: var(--radius-sm); margin-bottom: 8px; font-size: 13px; font-weight: 500; line-height: 1.4; }
  .alert-critical { background: var(--red-dim); color: var(--red); border: 1px solid rgba(239,68,68,0.2); }
  .alert-warning { background: var(--yellow-dim); color: var(--yellow); border: 1px solid rgba(245,158,11,0.2); }
  .alert-info { background: var(--blue-dim); color: var(--blue); border: 1px solid rgba(59,130,246,0.2); }
  .debt-item, .expense-item { background: var(--bg3); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 14px; margin-bottom: 8px; }
  .tag { font-size: 10px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; color: var(--text3); }
  .forecast-bar { display: flex; align-items: flex-end; gap: 4px; height: 80px; }
  .bar-col { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; height: 100%; }
  .bar-fill { width: 100%; border-radius: 3px 3px 0 0; min-height: 2px; }
  .bar-label { font-size: 9px; color: var(--text3); font-weight: 600; }
  .tab-row { display: flex; gap: 6px; margin-bottom: 14px; flex-wrap: wrap; }
  .tab { flex: 1; padding: 8px 6px; border-radius: 8px; border: 1px solid var(--border); background: var(--bg3); color: var(--text2); font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 600; cursor: pointer; transition: all 0.2s; text-align: center; min-width: 60px; }
  .tab.active { background: linear-gradient(135deg, var(--accent), var(--accent2)); color: white; border-color: transparent; }
  .onboard { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 32px 24px; background: radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.15) 0%, transparent 60%); gap: 24px; position: relative; }
  .onboard-logo { font-family: 'Unbounded', sans-serif; font-size: 32px; font-weight: 900; background: linear-gradient(135deg, var(--accent2), #ec4899, #f59e0b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-align: center; }
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.75); z-index: 300; display: flex; align-items: flex-end; backdrop-filter: blur(4px); }
  .modal { background: var(--bg2); border: 1px solid var(--border2); border-radius: 24px 24px 0 0; padding: 24px; width: 100%; max-height: 88vh; overflow-y: auto; animation: slideUp 0.3s ease; }
  @keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  .modal-title { font-family: 'Unbounded', sans-serif; font-size: 15px; font-weight: 700; margin-bottom: 20px; }
  .toggle-row { display: flex; align-items: center; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid var(--border); }
  .toggle-label { font-size: 14px; color: var(--text2); }
  .toggle { width: 44px; height: 24px; border-radius: 12px; border: none; cursor: pointer; position: relative; transition: background 0.2s; }
  .toggle::after { content: ''; position: absolute; top: 3px; width: 18px; height: 18px; background: white; border-radius: 9px; transition: left 0.2s; }
  .toggle.on { background: var(--accent); }
  .toggle.on::after { left: 23px; }
  .toggle.off { background: var(--bg4); }
  .toggle.off::after { left: 3px; }
  .glow-text { text-shadow: 0 0 20px var(--accent-glow); }
  input[type=range] { -webkit-appearance: none; width: 100%; height: 4px; border-radius: 2px; background: var(--bg4); outline: none; }
  input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%; background: var(--accent2); cursor: pointer; }
  .fade-in { animation: fadeIn 0.3s ease; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  ::-webkit-scrollbar { width: 0; }
`;

// ============================================================
// LANG SWITCHER
// ============================================================

function LangSwitcher() {
  const { lang, setLang } = useLang();
  return (
    <div className="lang-toggle">
      <button className={`lang-btn ${lang === "ru" ? "active" : ""}`} onClick={() => setLang("ru")}>RU</button>
      <button className={`lang-btn ${lang === "en" ? "active" : ""}`} onClick={() => setLang("en")}>EN</button>
    </div>
  );
}

// ============================================================
// ONBOARDING
// ============================================================

function Onboarding({ onComplete }) {
  const { t } = useLang();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ name: "", model: "50/30/20", debt_method: "avalanche" });
  const steps = [
    { title: t("onboard_title1"), sub: t("onboard_sub1"), action: t("onboard_btn1") },
    { title: t("onboard_title2"), field: "name", ph: t("onboard_placeholder_name"), action: t("onboard_btn2") },
    { title: t("onboard_title3"), preset: true, action: t("onboard_btn3") },
  ];
  const cur = steps[step];
  const next = () => {
    if (step < steps.length - 1) { setStep(s => s + 1); return; }
    const p = PRESETS[data.model] || PRESETS["50/30/20"];
    onComplete({ name: data.name || "User", model: data.model, debt_method: data.debt_method, pct: { mandatory: 0, variable: p.variable, savings: p.savings, debts: p.debts } });
  };
  const presetLabels = { "75/15/10": t("onboard_preset_basic"), "50/30/20": t("onboard_preset_balanced"), "30/20/50": t("onboard_preset_saving") };
  return (
    <div className="onboard fade-in">
      <div style={{ position: "absolute", top: 20, right: 20 }}><LangSwitcher /></div>
      <div className="onboard-logo">Finance<br />OS</div>
      <div style={{ textAlign: "center", width: "100%" }}>
        <div style={{ fontFamily: "Unbounded", fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{cur.title}</div>
        {cur.sub && <div style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.6 }}>{cur.sub}</div>}
        {cur.field && <input className="input" placeholder={cur.ph} value={data[cur.field]} onChange={e => setData(d => ({ ...d, [cur.field]: e.target.value }))} style={{ textAlign: "center", marginTop: 16 }} />}
        {cur.preset && (
          <div style={{ marginTop: 16 }}>
            {Object.keys(PRESETS).map(key => (
              <div key={key} onClick={() => setData(d => ({ ...d, model: key }))}
                style={{ background: data.model === key ? "linear-gradient(135deg,rgba(124,58,237,0.3),rgba(168,85,247,0.2))" : "var(--bg3)", border: `1px solid ${data.model === key ? "rgba(124,58,237,0.5)" : "var(--border)"}`, borderRadius: 10, padding: "14px 16px", marginBottom: 8, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontFamily: "Unbounded", fontSize: 14, fontWeight: 700 }}>{key}</div>
                <div style={{ fontSize: 12, color: "var(--text2)" }}>{presetLabels[key]}</div>
                {data.model === key && <Icon name="check" size={16} color="var(--accent2)" />}
              </div>
            ))}
            <div style={{ marginTop: 14, color: "var(--text2)", fontSize: 13, marginBottom: 8 }}>{t("onboard_debt_method")}</div>
            <div className="tab-row">
              {[["avalanche", t("onboard_avalanche")], ["snowball", t("onboard_snowball")]].map(([k, l]) => (
                <button key={k} className={`tab ${data.debt_method === k ? "active" : ""}`} onClick={() => setData(d => ({ ...d, debt_method: k }))}>{l}</button>
              ))}
            </div>
          </div>
        )}
      </div>
      <button className="btn btn-primary" onClick={next}>{cur.action}</button>
      <div style={{ display: "flex", gap: 6 }}>
        {steps.map((_, i) => <div key={i} style={{ width: i === step ? 20 : 6, height: 6, borderRadius: 3, background: i === step ? "var(--accent2)" : "var(--bg4)", transition: "all 0.3s" }} />)}
      </div>
    </div>
  );
}

// ============================================================
// DASHBOARD
// ============================================================

function Dashboard({ state, budget, alerts, rating, onAddIncome }) {
  const { t, lang } = useLang();
  const totalIncome = state.income.active + state.income.passive + state.income.other;
  const totalDebt = state.debts.filter(d => !d.is_closed).reduce((s, d) => s + d.current_balance, 0);
  const mandatory_monthly = state.expenses.filter(e => e.is_mandatory).reduce((s, e) => s + calcMonthly(e.amount, e.frequency), 0);
  const cushion = mandatory_monthly > 0 ? state.savings_total / mandatory_monthly : 0;
  const rc = rating >= 8 ? "var(--green)" : rating >= 6 ? "var(--yellow)" : "var(--red)";
  return (
    <div className="fade-in">
      <div className="card card-accent" style={{ marginBottom: 12, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -40, right: -40, width: 150, height: 150, background: "radial-gradient(circle,rgba(124,58,237,0.2),transparent)", borderRadius: "50%", pointerEvents: "none" }} />
        <div className="label">{t("free_money")}</div>
        <div className="amount-xl glow-text" style={{ color: budget.free >= 0 ? "var(--green)" : "var(--red)", marginBottom: 4 }}>{fmt(budget.free, false, lang)}</div>
        <div style={{ fontSize: 12, color: "var(--text3)" }}>{t("from_income")} {fmt(totalIncome, false, lang)} {t("income_label")}</div>
        {!totalIncome && <button className="btn btn-primary" style={{ marginTop: 14, padding: "10px 20px" }} onClick={onAddIncome}><Icon name="plus" size={16} /> {t("add_income")}</button>}
      </div>
      <div className="grid-2">
        <div className="stat-card"><div className="label">{t("income")}</div><div className="amount-md" style={{ color: "var(--green)" }}>{fmt(totalIncome, true, lang)}</div></div>
        <div className="stat-card"><div className="label">{t("rating")}</div><div style={{ display: "flex", alignItems: "center", gap: 6 }}><Icon name="star" size={14} color={rc} /><div className="amount-md" style={{ color: rc }}>{rating}/10</div></div></div>
        <div className="stat-card"><div className="label">{t("debts")}</div><div className="amount-md" style={{ color: totalDebt > 0 ? "var(--red)" : "var(--green)" }}>{totalDebt > 0 ? fmt(totalDebt, true, lang) : t("no_debts")}</div></div>
        <div className="stat-card"><div className="label">{t("savings")}</div><div className="amount-md" style={{ color: "var(--accent2)" }}>{fmt(state.savings_total, true, lang)}</div></div>
      </div>
      {totalIncome > 0 && (<>
        <div className="section-title">{t("budget_distribution")}</div>
        <div className="card">
          {[
            { label: t("mandatory"), val: budget.mandatory, color: "var(--red)" },
            { label: t("variable_limit"), val: budget.variable_budget, color: "var(--yellow)" },
            { label: t("debts_min"), val: budget.min_debt, color: "var(--accent)" },
            { label: t("savings_label"), val: budget.savings, color: "var(--green)" },
            { label: t("free_label"), val: Math.max(0, budget.free), color: "var(--blue)" },
          ].map(item => {
            const pct = totalIncome ? (item.val / totalIncome * 100) : 0;
            return (
              <div key={item.label} style={{ marginBottom: 10 }}>
                <div className="row" style={{ marginBottom: 3 }}>
                  <span style={{ fontSize: 13, color: "var(--text2)" }}>{item.label}</span>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ fontSize: 11, color: "var(--text3)" }}>{pct.toFixed(0)}%</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: item.color }}>{fmt(item.val, true, lang)}</span>
                  </div>
                </div>
                <div className="progress-bar"><div className="progress-fill" style={{ width: `${Math.min(100, pct)}%`, background: item.color }} /></div>
              </div>
            );
          })}
        </div>
      </>)}
      <div className="section-title">{t("cushion")}</div>
      <div className={`card ${cushion >= 6 ? "card-green" : cushion >= 3 ? "card-yellow" : "card-red"}`}>
        <div className="row">
          <div><div className="label">{t("cushion_coverage")}</div><div className="amount-lg" style={{ color: cushion >= 6 ? "var(--green)" : cushion >= 3 ? "var(--yellow)" : "var(--red)" }}>{cushion.toFixed(1)} {t("months_short")}</div></div>
          <div style={{ textAlign: "right" }}><div style={{ fontSize: 11, color: "var(--text3)", marginBottom: 4 }}>{t("cushion_goal")}</div><div className="progress-bar" style={{ width: 80 }}><div className="progress-fill" style={{ width: `${Math.min(100, cushion / 6 * 100)}%`, background: cushion >= 6 ? "var(--green)" : cushion >= 3 ? "var(--yellow)" : "var(--red)" }} /></div></div>
        </div>
      </div>
      {alerts.length > 0 && (<><div className="section-title">{t("auto_rules")}</div>{alerts.map(a => <div key={a.id} className={`alert-item alert-${a.sev}`}><Icon name="alert" size={16} />{a.msg}</div>)}</>)}
    </div>
  );
}

// ============================================================
// INCOME PAGE
// ============================================================

function IncomePage({ state, dispatch }) {
  const { t, lang } = useLang();
  const [form, setForm] = useState({ active: state.income.active || "", passive: state.income.passive || "", other: state.income.other || "" });
  const [saved, setSaved] = useState(false);
  const [modal, setModal] = useState(false);
  const [ef, setEf] = useState({ name: "", category: "", amount: "", frequency: "monthly", is_mandatory: true });
  const cats = t("categories");
  const total = (+form.active || 0) + (+form.passive || 0) + (+form.other || 0);
  const saveIncome = () => { dispatch({ type: "SET_INCOME", payload: { active: +form.active || 0, passive: +form.passive || 0, other: +form.other || 0 } }); setSaved(true); setTimeout(() => setSaved(false), 2000); };
  const addExp = () => { if (!ef.name || !ef.amount) return; dispatch({ type: "ADD_EXPENSE", payload: { ...ef, amount: +ef.amount, id: Date.now().toString(), category: ef.category || cats[0] } }); setModal(false); setEf({ name: "", category: "", amount: "", frequency: "monthly", is_mandatory: true }); };
  const freqShort = f => f === "monthly" ? t("freq_short_monthly") : f === "quarterly" ? t("freq_short_quarterly") : t("freq_short_yearly");
  return (
    <div className="fade-in">
      <div className="section-title">{t("current_month")}</div>
      <div className="card card-accent" style={{ marginBottom: 16, textAlign: "center" }}>
        <div className="label">{t("total_income")}</div>
        <div className="amount-xl" style={{ color: "var(--green)" }}>{fmt(total, false, lang)}</div>
      </div>
      <div className="card">
        <div style={{ fontFamily: "Unbounded", fontSize: 13, fontWeight: 700, marginBottom: 16 }}>{t("income_sources")}</div>
        {[["active", t("active_income")], ["passive", t("passive_income")], ["other", t("other_income")]].map(([k, l]) => (
          <div className="input-group" key={k}>
            <div className="input-label">{l}</div>
            <input className="input" type="number" placeholder="0" value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} />
          </div>
        ))}
        <button className="btn btn-primary" onClick={saveIncome}>{saved ? <><Icon name="check" size={16} /> {t("saved")}</> : t("save_income")}</button>
      </div>
      <div className="section-title">{t("expenses")}</div>
      {state.expenses.map(e => (
        <div key={e.id} className="expense-item">
          <div className="row">
            <div><div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{e.name}</div><div style={{ display: "flex", gap: 6 }}><span className="tag">{e.category}</span><span className={`chip ${e.is_mandatory ? "chip-red" : "chip-yellow"}`} style={{ fontSize: 9, padding: "2px 6px" }}>{e.is_mandatory ? t("mandatory_chip") : t("flexible_chip")}</span></div></div>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <div style={{ textAlign: "right" }}><div className="amount-sm">{fmt(calcMonthly(e.amount, e.frequency), true, lang)}</div><div style={{ fontSize: 10, color: "var(--text3)" }}>{freqShort(e.frequency)}</div></div>
              <button className="btn btn-danger btn-sm" style={{ width: "auto", padding: "6px 8px" }} onClick={() => dispatch({ type: "DEL_EXPENSE", id: e.id })}><Icon name="trash" size={13} /></button>
            </div>
          </div>
        </div>
      ))}
      <button className="btn btn-ghost" onClick={() => setModal(true)}><Icon name="plus" size={16} /> {t("add_expense")}</button>
      {modal && (
        <div className="modal-overlay" onClick={() => setModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-title">{t("new_expense")}</div>
            <div className="input-group"><div className="input-label">{t("expense_name")}</div><input className="input" placeholder={t("expense_name_ph")} value={ef.name} onChange={e => setEf(f => ({ ...f, name: e.target.value }))} /></div>
            <div className="input-group"><div className="input-label">{t("expense_category")}</div><select className="select" value={ef.category || cats[0]} onChange={e => setEf(f => ({ ...f, category: e.target.value }))}>{cats.map(c => <option key={c}>{c}</option>)}</select></div>
            <div className="input-group"><div className="input-label">{t("expense_amount")}</div><input className="input" type="number" placeholder="0" value={ef.amount} onChange={e => setEf(f => ({ ...f, amount: e.target.value }))} /></div>
            <div className="input-group"><div className="input-label">{t("expense_frequency")}</div><select className="select" value={ef.frequency} onChange={e => setEf(f => ({ ...f, frequency: e.target.value }))}><option value="monthly">{t("freq_monthly")}</option><option value="quarterly">{t("freq_quarterly")}</option><option value="yearly">{t("freq_yearly")}</option></select></div>
            <div className="toggle-row"><span className="toggle-label">{t("mandatory_expense")}</span><button className={`toggle ${ef.is_mandatory ? "on" : "off"}`} onClick={() => setEf(f => ({ ...f, is_mandatory: !f.is_mandatory }))} /></div>
            <div style={{ display: "flex", gap: 8, marginTop: 16 }}><button className="btn btn-ghost" onClick={() => setModal(false)}>{t("cancel")}</button><button className="btn btn-primary" onClick={addExp}>{t("add")}</button></div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// DEBTS PAGE
// ============================================================

function DebtsPage({ state, dispatch }) {
  const { t, lang } = useLang();
  const [modal, setModal] = useState(false);
  const [planDebt, setPlanDebt] = useState(null);
  const [form, setForm] = useState({ name: "", total_amount: "", current_balance: "", interest_rate: "", min_payment: "" });
  const [extra, setExtra] = useState(0);
  const add = () => { if (!form.name || !form.current_balance) return; dispatch({ type: "ADD_DEBT", payload: { ...form, id: Date.now().toString(), total_amount: +form.total_amount || +form.current_balance, current_balance: +form.current_balance, interest_rate: +form.interest_rate || 0, min_payment: +form.min_payment || 0, is_closed: false } }); setModal(false); setForm({ name: "", total_amount: "", current_balance: "", interest_rate: "", min_payment: "" }); };
  const active = state.debts.filter(d => !d.is_closed), closed = state.debts.filter(d => d.is_closed);
  const totalDebt = active.reduce((s, d) => s + d.current_balance, 0);
  const fullPlan = active.length ? calcDebtPlan(active, extra, state.settings.debt_method) : null;
  const plan = planDebt ? calcDebtPlan([planDebt], extra, state.settings.debt_method) : null;
  const fields = [{ k: "name", l: t("debt_name"), ph: t("debt_name_ph"), type: "text" }, { k: "total_amount", l: t("debt_total"), ph: "0", type: "number" }, { k: "current_balance", l: t("debt_balance"), ph: "0", type: "number" }, { k: "interest_rate", l: t("debt_rate"), ph: "0", type: "number" }, { k: "min_payment", l: t("debt_min"), ph: "0", type: "number" }];
  return (
    <div className="fade-in">
      <div className="card card-accent" style={{ marginBottom: 16 }}>
        <div className="label">{t("total_debt")}</div>
        <div className="amount-xl" style={{ color: active.length ? "var(--red)" : "var(--green)" }}>{active.length ? fmt(totalDebt, false, lang) : t("no_debts_msg")}</div>
        {fullPlan && active.length > 0 && <div style={{ marginTop: 8, fontSize: 12, color: "var(--text2)" }}>{t("closes_in")} {fullPlan.months} {t("months_short")} · {t("overpay")} {fmt(fullPlan.total_interest, true, lang)}</div>}
      </div>
      {active.length > 0 && (<>
        <div className="section-title">{t("extra_payment_month")}</div>
        <div className="card" style={{ marginBottom: 12 }}>
          <div className="row"><span style={{ fontSize: 13, color: "var(--text2)" }}>{t("extra_payment")}</span><span className="amount-sm" style={{ color: "var(--green)" }}>{fmt(extra, true, lang)}</span></div>
          <input type="range" min={0} max={50000} step={500} value={extra} onChange={e => setExtra(+e.target.value)} style={{ marginTop: 10 }} />
        </div>
      </>)}
      <div className="section-title">{t("my_debts")}</div>
      {active.map(d => {
        const pp = d.total_amount > 0 ? (d.total_amount - d.current_balance) / d.total_amount * 100 : 0;
        const sp = calcDebtPlan([d], 0, state.settings.debt_method);
        return (
          <div key={d.id} className="debt-item">
            <div className="row" style={{ marginBottom: 8 }}>
              <div><div style={{ fontWeight: 600, fontSize: 15, marginBottom: 2 }}>{d.name}</div><div style={{ display: "flex", gap: 6 }}><span className="chip chip-red">{d.interest_rate}% {t("annual_rate")}</span><span className="chip chip-purple">{t("min_payment")} {fmt(d.min_payment, true, lang)}</span></div></div>
              <div style={{ textAlign: "right" }}><div className="amount-sm" style={{ color: "var(--red)" }}>{fmt(d.current_balance, true, lang)}</div><div style={{ fontSize: 10, color: "var(--text3)" }}>{t("paid_from")} {fmt(d.total_amount, true, lang)}</div></div>
            </div>
            <div className="progress-bar"><div className="progress-fill" style={{ width: `${pp}%`, background: "var(--green)" }} /></div>
            <div className="row" style={{ marginTop: 8 }}>
              <span style={{ fontSize: 11, color: "var(--text3)" }}>{sp.months} {t("months_to_close")}</span>
              <div style={{ display: "flex", gap: 6 }}>
                <button className="btn btn-ghost btn-sm" onClick={() => setPlanDebt(d)}>{t("schedule")}</button>
                <button className="btn btn-danger btn-sm" onClick={() => dispatch({ type: "CLOSE_DEBT", id: d.id })}>{t("close_debt")}</button>
              </div>
            </div>
          </div>
        );
      })}
      <button className="btn btn-ghost" onClick={() => setModal(true)}><Icon name="plus" size={16} /> {t("add_debt")}</button>
      {closed.length > 0 && (<><div className="section-title">{t("closed_debts")}</div>{closed.map(d => <div key={d.id} className="debt-item" style={{ opacity: 0.5 }}><div className="row"><span style={{ fontSize: 14, textDecoration: "line-through" }}>{d.name}</span><span className="chip chip-green">{t("closed_chip")}</span></div></div>)}</>)}
      {planDebt && plan && (
        <div className="modal-overlay" onClick={() => setPlanDebt(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-title">{t("debt_plan_title")} {planDebt.name}</div>
            <div className="grid-2" style={{ marginBottom: 14 }}><div className="stat-card"><div className="label">{t("plan_term")}</div><div className="amount-md">{plan.months} {t("months_short")}</div></div><div className="stat-card"><div className="label">{t("plan_overpay")}</div><div className="amount-md" style={{ color: "var(--red)" }}>{fmt(plan.total_interest, true, lang)}</div></div></div>
            <div style={{ maxHeight: 220, overflowY: "auto" }}>
              {plan.plan.slice(0, 24).map(mp => { const d = mp.details[planDebt.id]; if (!d) return null; return <div key={mp.month} className="row" style={{ padding: "6px 0", borderBottom: "1px solid var(--border)", fontSize: 12 }}><span style={{ color: "var(--text3)", width: 40 }}>{t("month_short")}{mp.month}</span><span>{t("payment")} {fmt(d.payment, true, lang)}</span><span style={{ color: "var(--red)" }}>{t("interest_short")} {fmt(d.interest, true, lang)}</span><span style={{ color: "var(--text2)" }}>{t("balance_short")} {fmt(d.balance, true, lang)}</span></div>; })}
            </div>
            <button className="btn btn-ghost" style={{ marginTop: 16 }} onClick={() => setPlanDebt(null)}>{t("cancel")}</button>
          </div>
        </div>
      )}
      {modal && (
        <div className="modal-overlay" onClick={() => setModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-title">{t("new_debt")}</div>
            {fields.map(f => <div className="input-group" key={f.k}><div className="input-label">{f.l}</div><input className="input" type={f.type} placeholder={f.ph} value={form[f.k]} onChange={e => setForm(fi => ({ ...fi, [f.k]: e.target.value }))} /></div>)}
            <div style={{ display: "flex", gap: 8 }}><button className="btn btn-ghost" onClick={() => setModal(false)}>{t("cancel")}</button><button className="btn btn-primary" onClick={add}>{t("add")}</button></div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// FORECAST PAGE
// ============================================================

function ForecastPage({ state, budget }) {
  const { t, lang } = useLang();
  const [scenario, setScenario] = useState("base");
  const income = state.income.active + state.income.passive + state.income.other;
  const months_arr = t("months_arr");
  const forecast = useMemo(() => income ? generate12MonthForecast(income, budget, state.debts, state.savings_total, state.settings, scenario) : null, [income, budget, state.debts, state.savings_total, state.settings, scenario]);
  const now = new Date();
  if (!income) return <div className="fade-in"><div className="card" style={{ textAlign: "center", padding: 40 }}><div style={{ fontSize: 40, marginBottom: 12 }}>📊</div><div style={{ fontFamily: "Unbounded", fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{t("forecast_unavailable")}</div><div style={{ fontSize: 14, color: "var(--text2)" }}>{t("forecast_add_income")}</div></div></div>;
  const debtFree = forecast ? forecast.findIndex(m => m.total_debt <= 0.01) : -1;
  const hasDebts = state.debts.filter(d => !d.is_closed).length > 0;
  return (
    <div className="fade-in">
      <div className="tab-row">
        {[["base", t("scenario_base")], ["plus10", t("scenario_plus10")], ["minus10", t("scenario_minus10")], ["extra_payment", t("scenario_extra")]].map(([k, l]) => <button key={k} className={`tab ${scenario === k ? "active" : ""}`} onClick={() => setScenario(k)}>{l}</button>)}
      </div>
      <div className="section-title">{t("milestones")}</div>
      <div className="card" style={{ marginBottom: 12 }}>
        {debtFree >= 0 ? <div className="row" style={{ padding: "8px 0" }}><span style={{ fontSize: 13 }}>{t("debts_close")}</span><span className="chip chip-green">{t("month_short")}{debtFree + 1}</span></div>
          : hasDebts ? <div className="row" style={{ padding: "8px 0" }}><span style={{ fontSize: 13 }}>{t("debts_long")}</span><span className="chip chip-red">{t("debts_term")}</span></div>
          : <div className="row" style={{ padding: "8px 0" }}><span style={{ fontSize: 13 }}>{t("no_debts_now")}</span><span className="chip chip-green">{t("now")}</span></div>}
        {forecast && (() => { const mm = forecast.findIndex(m => m.savings >= 1000000); return mm >= 0 ? <div className="row" style={{ padding: "8px 0", borderTop: "1px solid var(--border)" }}><span style={{ fontSize: 13 }}>{t("million_savings")}</span><span className="chip chip-purple">{t("month_short")}{mm + 1}</span></div> : <div className="row" style={{ padding: "8px 0", borderTop: "1px solid var(--border)" }}><span style={{ fontSize: 13 }}>{t("to_million")}</span><span className="chip chip-yellow">{state.settings.pct.savings > 0 ? `~${Math.ceil((1000000 - state.savings_total) / (income * state.settings.pct.savings / 100))} ${t("months_short")}` : t("no_savings_plan")}</span></div>; })()}
      </div>
      <div className="section-title">{t("savings_growth")}</div>
      <div className="card" style={{ marginBottom: 12 }}>
        <div className="forecast-bar">
          {forecast?.map((m, i) => { const max = Math.max(...forecast.map(x => x.savings)) || 1, h = m.savings / max * 70; return <div key={i} className="bar-col"><div style={{ flex: 1, display: "flex", alignItems: "flex-end", width: "100%" }}><div className="bar-fill" style={{ height: `${h}px`, background: "linear-gradient(180deg,var(--accent2),var(--accent))" }} /></div><div className="bar-label">{months_arr[(now.getMonth() + i) % 12]}</div></div>; })}
        </div>
        <div className="row" style={{ marginTop: 10 }}><span style={{ fontSize: 12, color: "var(--text3)" }}>{t("now_label")} {fmt(state.savings_total, true, lang)}</span><span style={{ fontSize: 12, color: "var(--accent2)" }}>{t("after_12")} {fmt(forecast?.[11]?.savings, true, lang)}</span></div>
      </div>
      {hasDebts && (<><div className="section-title">{t("debt_reduction")}</div><div className="card" style={{ marginBottom: 12 }}><div className="forecast-bar">{forecast?.map((m, i) => { const max = forecast[0]?.total_debt || 1, h = max > 0 ? m.total_debt / max * 70 : 0; return <div key={i} className="bar-col"><div style={{ flex: 1, display: "flex", alignItems: "flex-end", width: "100%" }}><div className="bar-fill" style={{ height: `${Math.max(2, h)}px`, background: m.total_debt < 0.01 ? "var(--green)" : "var(--red)" }} /></div><div className="bar-label">{months_arr[(now.getMonth() + i) % 12]}</div></div>; })}</div></div></>)}
      <div className="section-title">{t("monthly_table")}</div>
      <div className="card" style={{ padding: 0 }}>
        <div className="row" style={{ padding: "10px 14px", borderBottom: "1px solid var(--border)", opacity: 0.5 }}>
          <span style={{ fontSize: 11, flex: 1 }}>{t("col_month")}</span><span style={{ fontSize: 11, flex: 2, textAlign: "right" }}>{t("col_savings")}</span><span style={{ fontSize: 11, flex: 2, textAlign: "right" }}>{t("col_debt")}</span><span style={{ fontSize: 11, flex: 2, textAlign: "right" }}>{t("col_free")}</span>
        </div>
        {forecast?.map((m, i) => <div key={i} className="row" style={{ padding: "10px 14px", borderBottom: "1px solid var(--border)" }}><span style={{ fontSize: 12, flex: 1, color: "var(--text3)" }}>{t("month_short")}{i + 1}</span><span style={{ fontSize: 12, flex: 2, textAlign: "right", color: "var(--accent2)" }}>{fmt(m.savings, true, lang)}</span><span style={{ fontSize: 12, flex: 2, textAlign: "right", color: m.total_debt < 0.01 ? "var(--green)" : "var(--red)" }}>{m.total_debt < 0.01 ? "✓" : fmt(m.total_debt, true, lang)}</span><span style={{ fontSize: 12, flex: 2, textAlign: "right", color: "var(--text2)" }}>{fmt(m.free, true, lang)}</span></div>)}
      </div>
    </div>
  );
}

// ============================================================
// SETTINGS PAGE
// ============================================================

function SettingsPage({ state, dispatch }) {
  const { t, lang, setLang } = useLang();
  const [pct, setPct] = useState({ ...state.settings.pct });
  const [model, setModel] = useState(state.settings.model);
  const [saved, setSaved] = useState(false);
  const [savings, setSavings] = useState("");
  const total = pct.variable + pct.savings + pct.debts;
  const applyPreset = k => { const p = PRESETS[k]; setModel(k); setPct({ mandatory: 0, variable: p.variable, savings: p.savings, debts: p.debts }); };
  const save = () => { dispatch({ type: "SET_SETTINGS", payload: { model, pct, debt_method: state.settings.debt_method } }); if (savings) { dispatch({ type: "ADD_SAVINGS", amount: +savings }); setSavings(""); } setSaved(true); setTimeout(() => setSaved(false), 2000); };
  const presetLabels = { "75/15/10": t("onboard_preset_basic"), "50/30/20": t("onboard_preset_balanced"), "30/20/50": t("onboard_preset_saving") };
  return (
    <div className="fade-in">
      <div className="section-title">{t("language")}</div>
      <div className="card" style={{ marginBottom: 12 }}>
        <div className="tab-row" style={{ marginBottom: 0 }}>
          {[["ru", "🇷🇺 Русский"], ["en", "🇬🇧 English"]].map(([code, label]) => <button key={code} className={`tab ${lang === code ? "active" : ""}`} onClick={() => setLang(code)}>{label}</button>)}
        </div>
      </div>
      <div className="section-title">{t("finance_model")}</div>
      <div className="card" style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 13, color: "var(--text2)", marginBottom: 12 }}>{t("ready_models")}</div>
        {Object.keys(PRESETS).map(k => <div key={k} onClick={() => applyPreset(k)} style={{ background: model === k ? "linear-gradient(135deg,rgba(124,58,237,0.2),rgba(168,85,247,0.1))" : "var(--bg3)", border: `1px solid ${model === k ? "rgba(124,58,237,0.4)" : "var(--border)"}`, borderRadius: 10, padding: "12px 14px", marginBottom: 6, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}><div style={{ fontFamily: "Unbounded", fontSize: 13, fontWeight: 700 }}>{k}</div><div style={{ fontSize: 11, color: "var(--text2)" }}>{presetLabels[k]}</div>{model === k && <Icon name="check" size={16} color="var(--accent2)" />}</div>)}
      </div>
      <div className="card" style={{ marginBottom: 12 }}>
        <div className="row" style={{ marginBottom: 12 }}><span style={{ fontSize: 13 }}>{t("manual_setup")}</span><span className={`chip ${Math.abs(total - 100) < 1 ? "chip-green" : "chip-red"}`}>{total.toFixed(0)}% / 100%</span></div>
        {[{ k: "variable", l: t("variable_expenses"), c: "var(--yellow)" }, { k: "savings", l: t("savings_label"), c: "var(--green)" }, { k: "debts", l: t("extra_debt_payments"), c: "var(--accent2)" }].map(item => (
          <div key={item.k} style={{ marginBottom: 16 }}>
            <div className="row" style={{ marginBottom: 6 }}><span style={{ fontSize: 13, color: "var(--text2)" }}>{item.l}</span><span style={{ fontFamily: "Unbounded", fontSize: 12, color: item.c }}>{pct[item.k]}%</span></div>
            <input type="range" min={0} max={100} step={5} value={pct[item.k]} onChange={e => { setModel("custom"); setPct(p => ({ ...p, [item.k]: +e.target.value })); }} />
          </div>
        ))}
        <div style={{ fontSize: 12, color: "var(--text3)" }}>{t("auto_note", { n: Math.max(0, 100 - total).toFixed(0) })}</div>
      </div>
      <div className="section-title">{t("debt_method_title")}</div>
      <div className="card" style={{ marginBottom: 12 }}>
        <div className="tab-row">
          {[["avalanche", t("avalanche_label")], ["snowball", t("snowball_label")]].map(([k, l]) => <button key={k} className={`tab ${state.settings.debt_method === k ? "active" : ""}`} onClick={() => dispatch({ type: "SET_SETTINGS", payload: { ...state.settings, debt_method: k } })}>{l}</button>)}
        </div>
        <div style={{ fontSize: 12, color: "var(--text3)", lineHeight: 1.5 }}>{state.settings.debt_method === "avalanche" ? t("avalanche_desc") : t("snowball_desc")}</div>
      </div>
      <div className="section-title">{t("add_savings_title")}</div>
      <div className="card" style={{ marginBottom: 12 }}>
        <div className="row" style={{ marginBottom: 10 }}><span style={{ fontSize: 13, color: "var(--text2)" }}>{t("current_savings")}</span><span className="amount-sm" style={{ color: "var(--accent2)" }}>{fmt(state.savings_total, false, lang)}</span></div>
        <div className="input-group"><div className="input-label">{t("add_amount")}</div><input className="input" type="number" placeholder="0" value={savings} onChange={e => setSavings(e.target.value)} /></div>
      </div>
      <button className="btn btn-primary" onClick={save}>{saved ? <><Icon name="check" size={16} /> {t("saved")}</> : t("save_settings")}</button>
      <div className="card" style={{ marginTop: 12, opacity: 0.7 }}>
        <div style={{ fontSize: 12, color: "var(--text3)", lineHeight: 1.6 }}><strong style={{ color: "var(--text2)" }}>FinanceOS MVP</strong><br />{t("app_info")}</div>
      </div>
    </div>
  );
}

// ============================================================
// REDUCER
// ============================================================

function reducer(state, action) {
  switch (action.type) {
    case "COMPLETE_ONBOARD": return { ...state, onboarded: true, user: { ...state.user, name: action.payload.name }, settings: { model: action.payload.model, pct: action.payload.pct, debt_method: action.payload.debt_method } };
    case "SET_INCOME": return { ...state, income: action.payload };
    case "ADD_EXPENSE": return { ...state, expenses: [...state.expenses, action.payload] };
    case "DEL_EXPENSE": return { ...state, expenses: state.expenses.filter(e => e.id !== action.id) };
    case "ADD_DEBT": return { ...state, debts: [...state.debts, action.payload] };
    case "CLOSE_DEBT": return { ...state, debts: state.debts.map(d => d.id === action.id ? { ...d, is_closed: true } : d) };
    case "SET_SETTINGS": return { ...state, settings: action.payload };
    case "ADD_SAVINGS": return { ...state, savings_total: state.savings_total + action.amount, savings_history: [...state.savings_history, { date: new Date().toISOString(), amount: action.amount }] };
    default: return state;
  }
}

// ============================================================
// APP
// ============================================================

function AppInner() {
  const { t, lang } = useLang();
  const [state, dispatchRaw] = useState(() => loadState() || DEFAULT_STATE);
  const [tab, setTab] = useState("dashboard");
  const dispatch = useCallback((action) => { dispatchRaw(prev => { const next = reducer(prev, action); saveState(next); return next; }); }, []);
  const income = state.income.active + state.income.passive + state.income.other;
  const budget = useMemo(() => distributeBudget(income, state.expenses, state.debts, state.settings), [income, state.expenses, state.debts, state.settings]);
  const rating = useMemo(() => calcRating(budget, income, state.savings_total, budget.mandatory), [budget, income, state.savings_total]);
  const alerts = useMemo(() => checkRules(budget, income, state.savings_total, budget.mandatory, t), [budget, income, state.savings_total, t]);
  const rc = rating >= 8 ? "var(--green)" : rating >= 6 ? "var(--yellow)" : "var(--red)";
  const TABS = [
    { id: "dashboard", label: t("nav_dashboard"), icon: "home" },
    { id: "income", label: t("nav_income"), icon: "wallet" },
    { id: "debts", label: t("nav_debts"), icon: "credit" },
    { id: "forecast", label: t("nav_forecast"), icon: "forecast" },
    { id: "settings", label: t("nav_settings"), icon: "settings" },
  ];
  const chipMap = { mandatory_high: t("chip_mandatory_high"), debt_high: t("chip_debt_high"), cushion_low: t("chip_cushion_low"), free_high: t("chip_free_high") };
  if (!state.onboarded) return <div className="app"><Onboarding onComplete={p => dispatch({ type: "COMPLETE_ONBOARD", payload: p })} /></div>;
  return (
    <div className="app">
      <div className="header">
        <div className="header-row">
          <div className="logo">FinanceOS</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <LangSwitcher />
            <div className="rating-badge"><Icon name="star" size={12} color={rc} /><span style={{ color: rc }}>{rating}</span><span style={{ color: "var(--text3)" }}>/10</span></div>
          </div>
        </div>
        {alerts.length > 0 && (
          <div style={{ display: "flex", gap: 6, marginTop: 8, overflowX: "auto", paddingBottom: 2 }}>
            {alerts.map(a => <span key={a.id} className={`chip chip-${a.sev === "critical" ? "red" : a.sev === "warning" ? "yellow" : "blue"}`} style={{ fontSize: 10 }}>{a.sev === "critical" ? "🔴" : a.sev === "warning" ? "🟡" : "💡"} {chipMap[a.id]}</span>)}
          </div>
        )}
      </div>
      <div className="content">
        {tab === "dashboard" && <Dashboard state={state} budget={budget} alerts={alerts} rating={rating} onAddIncome={() => setTab("income")} />}
        {tab === "income" && <IncomePage state={state} dispatch={dispatch} />}
        {tab === "debts" && <DebtsPage state={state} dispatch={dispatch} />}
        {tab === "forecast" && <ForecastPage state={state} budget={budget} />}
        {tab === "settings" && <SettingsPage state={state} dispatch={dispatch} />}
      </div>
      <nav className="nav">
        {TABS.map(tb => <button key={tb.id} className={`nav-item ${tab === tb.id ? "active" : ""}`} onClick={() => setTab(tb.id)}><Icon name={tb.icon} size={20} color={tab === tb.id ? "var(--accent2)" : "var(--text3)"} />{tb.label}</button>)}
      </nav>
    </div>
  );
}

export default function App() {
  return (
    <>
      <style>{CSS}</style>
      <LangProvider>
        <AppInner />
      </LangProvider>
    </>
  );
}
