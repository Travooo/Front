import { useMemo, useState } from 'react';
import { BRAZIL_REFERENCE_KM, combustionCars, electricCars, ENERGY_PRICES, FUEL_PRICES, ipvaRulesByState } from './data';
import { calcularCustoTotalAnual, calcularEconomiaAnual, calcularEnergiaAnual, calcularGasolinaAnual, calcularIPVA, calcularManutencaoAnual, calcularPayback, calcularSeguroAnual } from './calculations';

const fmt = (v) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(v || 0));
const n = (v) => Number(v || 0);

const maintenanceBase = [
  ['Troca de óleo do motor', 0, 500, 'Elétrico não utiliza óleo de motor.'],
  ['Pastilhas e freios', 200, 500, 'Elétrico tende a desgastar menos por frenagem regenerativa.'],
  ['Pneus', 1200, 1000, 'Elétrico pode ter desgaste maior por peso/torque.'],
  ['Revisões periódicas', 600, 1200, 'Revisão do elétrico tende a ser mais simples.'],
];

export default function ViabilidadeEletricoPage() {
  const [selectedEvId, setSelectedEvId] = useState('dolphin-mini');
  const ev = electricCars.find((c) => c.id === selectedEvId);
  const defaultIce = combustionCars[ev.equivalentCombustionId];
  const [form, setForm] = useState({ kmMensal: 1500, chargingMode: 'home', kwhManual: ENERGY_PRICES.home, state: 'CE', gasolinaModo: 'media', gasolinaManual: FUEL_PRICES.gasolina, evPrice: ev.price, icePrice: defaultIce.price, evCons: ev.kwhPer100km, iceCons: defaultIce.kmPerLiter, evSeguro: ev.insuranceAnnual, iceSeguro: defaultIce.insuranceAnnual, evManut: ev.maintenanceAnnual, iceManut: defaultIce.maintenanceAnnual });

  const rule = ipvaRulesByState[form.state];
  const valorKwh = form.chargingMode === 'manual' ? n(form.kwhManual) : form.chargingMode === 'home' ? ENERGY_PRICES.home : ENERGY_PRICES.chargingStation;
  const precoGasolina = form.gasolinaModo === 'manual' ? n(form.gasolinaManual) : FUEL_PRICES.gasolina;

  const resultado = useMemo(() => {
    const energia = calcularEnergiaAnual(n(form.kmMensal), n(form.evCons), valorKwh);
    const gasolina = calcularGasolinaAnual(n(form.kmMensal), n(form.iceCons), precoGasolina);
    const ipvaEv = calcularIPVA(n(form.evPrice), rule.electricRate);
    const ipvaIce = calcularIPVA(n(form.icePrice), rule.combustionRate);
    const manutEv = calcularManutencaoAnual([form.evManut]);
    const manutIce = calcularManutencaoAnual([form.iceManut]);
    const totalEv = calcularCustoTotalAnual({ energiaOuGasolina: energia, ipva: ipvaEv, seguro: calcularSeguroAnual(form.evSeguro), manutencao: manutEv });
    const totalIce = calcularCustoTotalAnual({ energiaOuGasolina: gasolina, ipva: ipvaIce, seguro: calcularSeguroAnual(form.iceSeguro), manutencao: manutIce });
    const economia = calcularEconomiaAnual(totalIce, totalEv);
    const diff = n(form.evPrice) - n(form.icePrice);
    const payback = calcularPayback(diff, economia);
    return { energia, gasolina, ipvaEv, ipvaIce, manutEv, manutIce, totalEv, totalIce, economia, diff, payback };
  }, [form, valorKwh, precoGasolina, rule]);

  const reset = () => window.location.reload();

  return <div className="min-h-screen bg-slate-50 p-4 md:p-8"><div className="max-w-6xl mx-auto space-y-6">
    <h1 className="text-2xl font-bold">Simulador de viabilidade: carro elétrico vs combustão</h1>
    <div className="grid md:grid-cols-2 gap-4 bg-white p-4 rounded-xl shadow">
      <label>KM mensal<input className="w-full border p-2 rounded" type="number" value={form.kmMensal} onChange={(e)=>setForm({...form, kmMensal:e.target.value})}/><small>Referência: uso comum ~ {BRAZIL_REFERENCE_KM.regular} km/mês; app/Uber ~ {BRAZIL_REFERENCE_KM.rideshare} km/mês.</small></label>
      <label>Estado<select className="w-full border p-2 rounded" value={form.state} onChange={(e)=>setForm({...form, state:e.target.value})}>{Object.entries(ipvaRulesByState).map(([k,v])=><option key={k} value={k}>{k} - {v.state}</option>)}</select><small>{rule.message}</small></label>
      <label>Carro elétrico<select className="w-full border p-2 rounded" value={selectedEvId} onChange={(e)=>{ const sel = electricCars.find(c=>c.id===e.target.value); const ice = combustionCars[sel.equivalentCombustionId]; setSelectedEvId(sel.id); setForm((f)=>({...f, evPrice:sel.price, evCons:sel.kwhPer100km, evSeguro:sel.insuranceAnnual, evManut:sel.maintenanceAnnual, icePrice:ice.price, iceCons:ice.kmPerLiter, iceSeguro:ice.insuranceAnnual, iceManut:ice.maintenanceAnnual })); }}>{electricCars.map((c)=><option key={c.id} value={c.id}>{c.model}</option>)}</select></label>
      <label>Combustão equivalente<input className="w-full border p-2 rounded bg-slate-100" disabled value={defaultIce.model} /></label>
      <label>Forma de carregamento<select className="w-full border p-2 rounded" value={form.chargingMode} onChange={(e)=>setForm({...form, chargingMode:e.target.value})}><option value="home">Em casa</option><option value="chargingStation">Em eletroposto</option><option value="manual">Valor manual</option></select></label>
      {form.chargingMode==='manual' && <label>kWh manual<input className="w-full border p-2 rounded" type="number" step="0.01" value={form.kwhManual} onChange={(e)=>setForm({...form, kwhManual:e.target.value})}/></label>}
      <p className="md:col-span-2">Valor considerado do kWh: <b>{fmt(valorKwh)}</b></p>
      <label>Gasolina<select className="w-full border p-2 rounded" value={form.gasolinaModo} onChange={(e)=>setForm({...form, gasolinaModo:e.target.value})}><option value="media">Média nacional</option><option value="manual">Valor manual</option></select></label>
      {form.gasolinaModo==='manual' && <label>Preço manual gasolina<input className="w-full border p-2 rounded" type="number" step="0.01" value={form.gasolinaManual} onChange={(e)=>setForm({...form, gasolinaManual:e.target.value})}/></label>}
      <p className="md:col-span-2">Preço da gasolina considerado: <b>{fmt(precoGasolina)}</b>/litro</p>
    </div>

    <div className="grid md:grid-cols-4 gap-3">{[['Total anual elétrico',resultado.totalEv],['Total anual combustão',resultado.totalIce],['Economia anual',resultado.economia],['Economia mensal',resultado.economia/12]].map(([t,v])=><div key={t} className="bg-white rounded-xl p-4 shadow"><p className="text-sm">{t}</p><p className="font-bold text-lg">{fmt(v)}</p></div>)}</div>

    <div className="bg-white rounded-xl p-4 shadow overflow-auto"><table className="w-full text-sm"><thead><tr><th>Item</th><th>Elétrico</th><th>Combustão</th><th>Obs</th></tr></thead><tbody>{maintenanceBase.map(([item, evCost, iceCost, obs])=><tr key={item} className="border-t"><td>{item}</td><td>{fmt(evCost)}</td><td>{fmt(iceCost)}</td><td>{obs}</td></tr>)}</tbody></table></div>

    <div className="bg-white rounded-xl p-4 shadow"><h2 className="font-semibold mb-2">Custos anuais consolidados</h2><ul className="grid md:grid-cols-2 gap-2 text-sm">
      <li>Energia anual: {fmt(resultado.energia)}</li><li>Gasolina anual: {fmt(resultado.gasolina)}</li><li>IPVA elétrico ({(rule.electricRate*100).toFixed(2)}%): {fmt(resultado.ipvaEv)}</li><li>IPVA combustão ({(rule.combustionRate*100).toFixed(2)}%): {fmt(resultado.ipvaIce)}</li><li>Seguro elétrico: {fmt(form.evSeguro)}</li><li>Seguro combustão: {fmt(form.iceSeguro)}</li><li>Manutenção elétrica: {fmt(form.evManut)}</li><li>Manutenção combustão: {fmt(form.iceManut)}</li></ul>
      <p className="mt-2 text-sm">Benefício IPVA elétrico: {rule.electricBenefit}</p>
    </div>

    <div className="bg-white rounded-xl p-4 shadow">
      <div className="h-4 bg-slate-200 rounded overflow-hidden"><div className="h-full bg-emerald-500" style={{width:`${Math.min((resultado.totalEv/Math.max(resultado.totalIce,1))*100,100)}%`}}/></div>
      <p className="text-xs mt-1">Barra comparativa do custo anual elétrico em relação ao combustão.</p>
      <p className="mt-3">Diferença de investimento: <b>{fmt(resultado.diff)}</b></p>
      <p>Payback: <b>{Number.isFinite(resultado.payback)? `${resultado.payback.toFixed(1)} anos` : 'Sem payback neste cenário'}</b></p>
      <p className="mt-2">{resultado.diff<=0 ? 'O carro elétrico já parte com vantagem no investimento inicial.' : resultado.economia<=0 ? 'Neste cenário, o carro elétrico não gera economia anual em relação ao carro a combustão.' : `A economia estimada é de ${fmt(resultado.economia)} por ano, e o investimento adicional se paga em aproximadamente ${resultado.payback.toFixed(1)} anos.`}</p>
      <p className="text-sm mt-2">{!Number.isFinite(resultado.payback) ? 'Neste cenário, o carro elétrico não apresenta vantagem econômica direta.' : resultado.payback < 5 ? 'Para o seu perfil de uso, o carro elétrico tende a ser economicamente vantajoso.' : resultado.payback <= 8 ? 'O carro elétrico pode valer a pena, mas o retorno é de médio prazo.' : 'O carro elétrico pode não se pagar rapidamente apenas pela economia operacional.'}</p>
      <p className="text-xs mt-3">A desvalorização não foi considerada porque esse dado ainda é incerto e pode variar muito nos próximos anos, principalmente no mercado de veículos elétricos.</p>
      <p className="text-xs">Os valores são estimativas e devem ser conferidos antes da decisão de compra.</p>
    </div>

    <div className="flex flex-wrap gap-2"><button onClick={reset} className="px-4 py-2 rounded bg-slate-700 text-white">Refazer simulação</button><button onClick={()=>window.print()} className="px-4 py-2 rounded bg-emerald-700 text-white">Exportar resultado em PDF</button><button onClick={()=>navigator.share ? navigator.share({title:'Simulação EV', text:'Confira a simulação', url:window.location.href}) : navigator.clipboard.writeText(window.location.href)} className="px-4 py-2 rounded bg-blue-700 text-white">Compartilhar simulação</button></div>
  </div></div>;
}
