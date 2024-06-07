import { Button } from '@nextui-org/react'
import Link from 'next/link'

export default function AuthButtons({
  className,
  isAdmin,
  isAuth,
  onSignInOpen,
  onSignUpOpen
}: {
  className?: string
  isAdmin: boolean
  isAuth: boolean
  onSignInOpen: () => void
  onSignUpOpen: () => void
}) {
  return (
    <div className={className}>
      {!isAuth ? (
        <>
          <Button color="primary" className="sm:mr-2" onClick={onSignInOpen}>
            Войти
          </Button>
          <Button onClick={onSignUpOpen} variant="bordered">
            Зарегистрироваться
          </Button>
        </>
      ) : (
        <>
          <Button color="primary" as={Link} href="/profile">
            Личный кабинет
          </Button>
          {isAdmin && (
            <Button className='sm:ml-4' color="primary" as={Link} href="/admin">
              Панель администратора
            </Button>
          )}
        </>
      )}
    </div>
  )
}
