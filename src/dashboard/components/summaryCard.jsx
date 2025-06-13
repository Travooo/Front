export function SummaryCard({ title, value, icon }) {
    return (
      <div className="bg-white rounded-lg shadow p-6 flex items-center min-h-[120px]">
        <div className="mr-6">{icon}</div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">{title}</h3>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
      </div>
    )
  }
  