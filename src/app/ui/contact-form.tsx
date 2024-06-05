import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Input,
  Button
} from '@nextui-org/react'
export default function ContactForm() {
  return (
    <div className="flex gap-4 items-center">
      <h2 className="h2 !m-0 text-text-secondary w-2/4">
        Подпишитесь на нашу рассылку
      </h2>
      <div className="w-2/4 flex items-center gap-4">
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
