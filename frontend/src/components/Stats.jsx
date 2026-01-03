export default function Stats({ jobs }) {
  const count = status => jobs.filter(j => j.status === status).length;

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {["Applied","Interview","Offer","Rejected"].map(s => (
        <div key={s} className="bg-white p-4 rounded shadow text-center">
          <h2 className="font-semibold">{s}</h2>
          <p className="text-2xl font-bold">{count(s)}</p>
        </div>
      ))}
    </div>
  );
}
