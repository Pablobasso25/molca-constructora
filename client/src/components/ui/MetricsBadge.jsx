export const MetricsBadge = ({ label, value, color = 'text-molca-primary' }) => {
  return (
    <div className="text-center">
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
      <div className="text-xs text-gray-500 uppercase tracking-wider">{label}</div>
    </div>
  )
}

export default MetricsBadge
