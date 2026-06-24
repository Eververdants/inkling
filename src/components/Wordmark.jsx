export function Wordmark({ className = '' }) {
  return (
    <span className={`inline-flex items-baseline gap-[2px] font-display italic font-light ${className}`}>
      <span className="text-amber-400">i</span>
      <span>nkling</span>
      <span className="ml-1 inline-block h-1 w-1 rounded-full bg-amber-400 align-middle" />
    </span>
  )
}
