import data from "./products.json"
import "./App.css"
import { useState } from "react"
type Product = (typeof data)[0]
function App() {
  const [cart, setCart] = useState<Product[]>([])
  const addToCart = (prod: Product) => {
    setCart((prev) => [...prev, prod])
  }
  return (
    <>
      <h1>Stripe test</h1>
      <div className="row">
        <div className="col-8 row">
          {data.map((p) => (
            <div className="col-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => addToCart(p)}
                  >
                    {p.price}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="col-4">
          <h2>Carrello</h2>
          <h3>
            Totale:{" "}
            {cart.map((p) => p.price).reduce((prev, curr) => prev + curr, 0)}{" "}
            EURO
          </h3>
          <div className="cart">
            {cart.map((p) => {
              return (
                <div className="card mb-3">
                  <div className="row g-0">
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
            <button className="btn btn-primary">Paga</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
