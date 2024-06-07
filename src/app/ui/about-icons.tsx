import train from '/public/icons/train.svg'
import hotel from '/public/icons/hotel.svg'
import globe from '/public/icons/globe.svg'
import Image from 'next/image'

export default function AboutIcons() {
  return (
    <ul className="flex sm:flex-row flex-col gap-[4rem] sm:gap-0 items-center text-center py-8 justify-evenly">
      <li className="flex flex-col items-center w-1/4">
        <Image src={train} alt="Иконка поезд" />
        <h3 className="h3 !mb-2 mt-6">Комфортный транспорт</h3>
        <p className="p">Идейные соображения высшего порядка, а также рамки.</p>
      </li>
      <li className="flex flex-col items-center w-1/4">
        <Image src={hotel} alt="Иконка отель" />
        <h3 className="h3 !mb-2 mt-6">Лучшие отели</h3>
        <p className="p">Идейные соображения высшего порядка, а также рамки.</p>
      </li>
      <li className="flex flex-col items-center w-1/4">
        <Image src={globe} alt="Иконка глобус" />
        <h3 className="h3 !mb-2 mt-6">Направления по всему миру</h3>
        <p className="p">Идейные соображения высшего порядка, а также рамки.</p>
      </li>
    </ul>
  )
}
