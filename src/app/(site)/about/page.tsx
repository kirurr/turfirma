import Hero from '@/app/ui/hero'

export const metadata = {
  title: 'О нас',
}

export default function Page() {
  return (
    <>
      <Hero
        isParagraph={false}
        isButton={false}
        isFullHeight={false}
        title="О нас"
				imageUrl='/about.jpg'
      />
      <section className="section flex lg:flex-row flex-col flex-wrap">
        <div className="lg:w-1/2 flex flex-col gap-4">
          <h2 className="h2 w-full text-center lg:text-start">Контакты</h2>
          <p className="text-lg lg:text-xl">
            <strong>Наш телефон: </strong>
            <a href="tel:+79991234567" className="link">
              +7 (999) 123-45-67
            </a>
          </p>
          <p className="text-lg lg:text-xl">
            <strong>Наша почта: </strong>
            <a href="mailto:info@travel.com" className="text-xl link">
              info@travel.com
            </a>
          </p>
          <p className="p text-balance text-lg lg:text-xl">
            <strong>Адрес: </strong>Москва, ул. Солнца, д. 1, кв. 1
          </p>
          <p className="p text-lg lg:text-xl">
            Далеко-далеко за, словесными горами в стране гласных и согласных
            живут рыбные тексты. Рукопись переписали страну путь текстами вопрос
            ему рыбными имеет взгляд.
          </p>
        </div>
        <div className="lg:w-1/2 lg:m-0 my-8">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7439.121385491727!2d44.50204094184699!3d48.76037882622604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x411aca44eebb5507%3A0x86e160e79a3b5fd!2z0JzQsNC80LAg0J3QvtGA0LrQsCDQn9Cw0L_QsCDQkdC-0LHRkdGA!5e0!3m2!1sru!2sru!4v1717666806094!5m2!1sru!2sru"
            width="100%"
            className="aspect-square"
            loading="lazy"
          ></iframe>
        </div>
      </section>
      <section className="section full-width bg-triary-color">
        <h2 className="h2 text-center">Турфирма Travel</h2>
        <p className="p text-xl">
          Далеко-далеко за словесными горами в стране гласных и согласных живут
          рыбные тексты. Эта переписали ты себя, ipsum предупреждал образ толку
          дорогу всемогущая выйти от всех вопрос своего реторический
          подзаголовок возвращайся злых пор то! Решила ipsum последний текстами
          пор что щеке страну осталось рыбными родного имени большой текст даже,
          все на берегу домах великий безопасную.
        </p>
      </section>
    </>
  )
}
