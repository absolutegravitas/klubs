import Link from 'next/link'

export default function NavLink({ href, children }:any) {
  return (
    <Link
      href={href}
      className="inline-block px-2 py-1 text-xl rounded-xs text-slate-700 hover:bg-slate-100 hover:text-slate-900"
    >
      {children}
    </Link>
  )
}
