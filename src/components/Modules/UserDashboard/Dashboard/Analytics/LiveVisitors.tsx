interface LiveVisitorsProps {
  count: string;
}

export function LiveVisitors({ count }: LiveVisitorsProps) {
  return (
    <div className="bg-[#0B1739] rounded-xl p-4 border border-[#343B4F]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-green-400 text-sm font-medium">Live</span>
          </div>
          <span className="text-white text-lg font-semibold">{count}</span>
        </div>

        <button className="text-[#CB3CFF] hover:text-[#CB3CFF]/80 transition-colors text-sm">
          View report
        </button>
      </div>
    </div>
  );
}
