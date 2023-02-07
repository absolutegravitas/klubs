import cn from 'clsx'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import { useRouter } from 'next/router'

export default function SignOutButton({ data }: any) {
  const router = useRouter()

  async function signOut(e: any) {
    await supabaseClient.auth.signOut()
    // console.log(data)
    router.push('/')
  }

  return (
    <button
      onClick={(e) => signOut(e)}
      type="submit"
      style={{
        backgroundColor: data.accentColor ? data.accentColor : '#1D4ED8',
      }}
      className={cn(
        'shadow-xs rounded-xs relative inline-flex items-center border border-transparent px-4 py-2 text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
      )}
    >
      <span className="w-5 h-auto mr-2 align-middle material-symbols-outlined">
        logout
      </span>

      <span className="align-middle">Sign out</span>
    </button>
  )
}
