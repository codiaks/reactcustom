import "./App.css";

export default function App() {
  return (
    <div className="container">
    <div className="grid grid-cols-4 gap-4">
  <div>011</div>
  <div>012</div>
  <div>013</div>
  <div>014</div>
  <div>015</div>
  <div>016</div>
  <div>017</div>
  <div>018</div>
  <div>019</div>
  <div>020</div>
  <div>021</div>
  <div>022</div>
  <div>023</div>
  <div>024</div>
</div>

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
      <div className="card">Hi</div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </div>
  );
}
