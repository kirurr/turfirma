import { Button } from '@nextui-org/react'
import Link from 'next/link'

function sleep(duration: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}

export default function AuthButtons({
  className,
  isAdmin,
  isAuth,
  onSignInOpen,
  onSignUpOpen,
  setIsMenuOpen
}: {
  className?: string
  isAdmin: boolean
  isAuth: boolean
  onSignInOpen: () => void
  onSignUpOpen: () => void
  setIsMenuOpen: (isOpen: boolean) => void
}) {
  return (
    <div className={className}>
      {!isAuth ? (
        <>
          <Button
            color="primary"
            className="sm:mr-2"
            onClick={async () => {
              setIsMenuOpen(false)
              await sleep(400)
              onSignInOpen()
            }}
          >
            Войти
          </Button>
          <Button
            variant="bordered"
            onClick={async () => {
              setIsMenuOpen(false)
              await sleep(400)
              onSignUpOpen()
            }}
          >
            Зарегистрироваться
          </Button>
        </>
      ) : (
        <>
          <Button color="primary" as={Link} href="/profile">
            Личный кабинет
          </Button>
          {isAdmin && (
            <Button className="sm:ml-4" color="primary" as={Link} href="/admin">
              Панель администратора
            </Button>
          )}
        </>
      )}
    </div>
  )
}
