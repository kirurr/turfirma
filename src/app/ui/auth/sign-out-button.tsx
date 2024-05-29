import { signOut } from '@/auth'
import { FormButton } from '@/app/ui/auth/auth-forms'

export default function SignOutForm() {
  return (
    <form
      action={async () => {
        'use server'
        await signOut({ redirect: true, redirectTo: '/' })
      }}
    >
      <FormButton title='Выйти из аккаунта' variant='bordered' color='danger' />
    </form>
  )
}
