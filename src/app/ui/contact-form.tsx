import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Input,
  Button
} from '@nextui-org/react'
export default function ContactForm() {
  return (
    <div className="flex gap-4 sm:flex-row flex-col items-center">
      <h2 className="h2 sm:m-0 text-text-secondary sm:w-2/4">
        Подпишитесь на нашу рассылку
      </h2>
      <div className="sm:w-2/4 flex sm:flex-row flex-col items-center gap-4">
        <Input label="Ваша почта" type="email" />
        <Popover>
          <PopoverTrigger>
            <Button size='lg' className='text-md' color="primary">Подписаться</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="p-2">
              <span className="font-semibold">Успешно!</span>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
