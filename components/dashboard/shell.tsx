interface DashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardShell({
  children,
  className,
  ...props
}: DashboardShellProps) {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex flex-col space-y-8">
        {children}
      </div>
    </div>
  )
}

