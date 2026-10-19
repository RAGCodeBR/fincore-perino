type SettlementEntry = { id: string; status: 'previsto' | 'realizado'; paidDate?: string };
export function confirmedSettlement<T extends SettlementEntry>(latest: T | undefined, requested: SettlementEntry, date: string, today: string): T {
  if (!latest || latest.status !== requested.status)
    throw new Error('Este lançamento foi alterado. Cancele e atualize os dados antes de tentar novamente.');
  const paying = latest.status !== 'realizado';
  if (paying && (!/^\d{4}-\d{2}-\d{2}$/.test(date) || date > today ||
    !Number.isFinite(Date.parse(`${date}T12:00:00Z`)) || new Date(`${date}T12:00:00Z`).toISOString().slice(0,10) !== date))
    throw new Error('Informe uma data válida, até hoje.');
  return { ...latest, status: paying ? 'realizado' : 'previsto', paidDate: paying ? date : '' };
}
