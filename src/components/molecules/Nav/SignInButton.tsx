import cn from 'clsx'
import { Button } from '@/components/atoms'

export default function SignInButton({ data }: any) {
  return (
    <Button
      style={{
        backgroundColor: data.accentColor ? data.accentColor : '#1D4ED8',
      }}
      className={cn(
        'shadow-xs rounded-xs relative inline-flex items-center border border-transparent px-4 py-2 text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
      )}
      href="/signin"
      Component="a"
    >
      <span className="w-5 h-auto mr-2 align-middle material-symbols-outlined">
add
</span>

     
      <span className="align-middle">Sign In</span>
    </Button>
  )
}
