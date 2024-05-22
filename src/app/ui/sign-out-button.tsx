import { signOut } from '@/auth'

export default function SignOutForm() {
  return (
    <form
      action={async () => {
				'use server'
        await signOut()
      }}
    >
      <button type="submit">выйти</button>
    </form>
  )
}
