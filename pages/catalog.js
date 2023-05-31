const SERVER_URI = process.env.SERVER_URI || 'http://localhost:5000'

// наличие функции `getServerSideProps` указывает на
// серверный рендеринг данной страницы
//
// мы хотим получать от сервера список/массив категорий
export async function getServerSideProps(context) {
  let categories = []
  try {
    const res = await fetch(`${SERVER_URI}/current-categories`)
    categories = await res.json()
  } catch (err) {
    console.error(err)
  }

  return {
    props: {
       categories
    }
  }
}

export default function Catalog({ categories }) {
  console.log('categories', categories)
  return (
    <>
      <h2>This is Catalog Page</h2>
      {/* рендерим категории, полученные от сервера */}
      <ul>
        {categories.map((category) => (
          <li key={category.id}>{category.title}</li>
        ))}
      </ul>
    </>
  )
}