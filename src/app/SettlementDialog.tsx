import { useRef, useState, type FormEvent } from 'react';
import { fmt } from './shared';
import { localDateKey, entryValue } from '../lib/finance';

type Entry = { id: string; description: string; kind: 'despesa' | 'receita'; status: 'previsto' | 'realizado'; amount: number; date: string; paidDate?: string; juros?: number; discount?: number };
export default function SettlementDialog({ entry, bankName, close, confirm }: {
  entry: Entry; bankName?: string; close: () => void; confirm: (date: string) => Promise<void>;
}) {
  const today = localDateKey(new Date());
  const [date, setDate] = useState(today);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const saving = useRef(false);
  const undo = entry.status === 'realizado';
  const expense = entry.kind === 'despesa';
  const title = undo ? 'Confirmar reversão da baixa' : expense ? 'Confirmar pagamento' : 'Confirmar recebimento';
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (saving.current) return;
    if (!undo && (!/^\d{4}-\d{2}-\d{2}$/.test(date) || date > today)) {
      setError('Informe uma data válida, até hoje.'); return;
    }
    saving.current = true; setBusy(true); setError('');
    try { await confirm(date); }
    catch (err) { setError(err instanceof Error ? err.message : 'Não foi possível confirmar a baixa. Tente novamente.'); }
    finally { saving.current = false; setBusy(false); }
  };
  return <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/60 p-4">
    <form role="dialog" aria-modal="true" aria-labelledby="settlement-title" onSubmit={submit} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
      <h2 id="settlement-title" className="text-xl font-bold text-slate-900">{title}</h2>
      <p className="mt-3 text-sm text-slate-600">{entry.description}</p>
      <p className="mt-2 text-2xl font-extrabold text-brand-700">{fmt(entryValue(entry))}</p>
      <p className="mt-3 text-sm text-slate-600">Vencimento: <strong>{new Date(`${entry.date}T12:00:00`).toLocaleDateString('pt-BR')}</strong></p>
      <p className="mt-2 text-sm text-slate-600">Conta bancária: <strong>{bankName || 'Não informada'}</strong></p>
      {undo ? <p className="mt-4 text-sm text-slate-600">O lançamento voltará para previsto e a data da baixa será removida.</p> : <>
        <p className="mt-4 text-sm text-slate-600">Confira os dados antes de registrar {expense ? 'o pagamento' : 'o recebimento'}.</p>
        <label htmlFor="settlement-date" className="mt-5 block text-sm font-semibold text-slate-800">{expense ? 'Data do pagamento' : 'Data recebida'}</label>
        <input id="settlement-date" type="date" required max={today} value={date} disabled={busy} onChange={event => { setDate(event.target.value); setError(''); }} className="mt-2 w-full rounded-xl border bg-gray-50 p-3 text-sm" />
      </>}
      {error && <p role="alert" className="mt-3 text-sm text-red-600">{error}</p>}
      <div className="mt-6 flex justify-end gap-3">
        <button type="button" disabled={busy} onClick={close} className="rounded-xl border px-4 py-2.5 text-sm font-bold disabled:opacity-50">Cancelar</button>
        <button type="submit" disabled={busy} className="rounded-xl bg-brand-700 px-4 py-2.5 text-sm font-bold text-white disabled:opacity-50">{busy ? 'Salvando...' : undo ? 'Confirmar reversão' : 'Confirmar baixa'}</button>
      </div>
    </form>
  </div>;
}
