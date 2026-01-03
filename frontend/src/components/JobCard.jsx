export default function JobCard({ job }) {
  return (
    <tr className="border-b">
      <td className="p-2">{job.company}</td>
      <td className="p-2">{job.role}</td>
      <td className="p-2">{job.location}</td>
      <td className="p-2 font-semibold">{job.status}</td>
    </tr>
  );
}
