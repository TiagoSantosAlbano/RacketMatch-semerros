import { Payment } from '../../models/payment';

interface Props {
  payments: Payment[];
}

export default function SummaryCards({ payments }: Props) {
  const totalRevenue = payments.reduce((acc, p) => acc + (p.amount ?? 0), 0);
  const totalCommission = payments.reduce((acc, p) => acc + (p.commission ?? 0), 0);
  const totalPayments = payments.length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <div className="bg-green-100 p-4 rounded shadow">
        <h2 className="font-bold text-lg mb-2 text-black">Total Revenue 💰</h2>
        <p className="text-2xl font-semibold text-black">{totalRevenue.toFixed(2)} €</p>
      </div>
      <div className="bg-blue-100 p-4 rounded shadow">
        <h2 className="font-bold text-lg mb-2 text-black">Total Commission 💼</h2>
        <p className="text-2xl font-semibold text-black">{totalCommission.toFixed(2)} €</p>
      </div>
      <div className="bg-yellow-100 p-4 rounded shadow">
        <h2 className="font-bold text-lg mb-2 text-black">Total Payments 📄</h2>
        <p className="text-2xl font-semibold text-black">{totalPayments}</p>
      </div>
    </div>
  );
}
