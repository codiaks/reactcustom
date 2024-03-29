import Footer from "./components/Footer";
import Header from "./components/Header";

export default function App() {
  return (<>
  <>
  {/*Nav*/}
  {/*Container*/}
  <main className="allButFooter">
  <Header />

  <div className="container shadow-lg mx-auto bg-white mt-24 md:mt-16 h-screen">
   <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
   {[1,2,3,4,5,6,7].map(item => (
    <div className="max-w-xs mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
    <div className="px-4 py-2">
      <h1 className="text-3xl font-bold text-gray-800 uppercase dark:text-white">
        NIKE AIR
      </h1>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi quos quidem
        sequi illum facere recusandae voluptatibus
      </p>
    </div>
    <img
      className="object-cover w-full h-48 mt-2"
      src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=320&q=80"
      alt="NIKE AIR"
    />
    <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
      <h1 className="text-lg font-bold text-white">$129</h1>
      <button className="px-2 py-1 text-xs font-semibold text-gray-900 uppercase transition-colors duration-200 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none">
        Add to cart
      </button>
    </div>
  </div>
  ))}
</div>
  </div>
  <Footer />

  </main>

</>

  </>)}