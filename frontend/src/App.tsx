import data from "./products.json"
import "./App.css"
import { useState } from "react"
import { BrowserRouter, Route, Routes, useNavigate } from "react-router"
import { SuccessPage } from "./Success"
import { ErrorPage } from "./Error"
type Product = (typeof data)[0]
function App() {
  const [cart, setCart] = useState<Product[]>([])
  const [total, setTotal] = useState<number>(0)
  const navigate = useNavigate()
  const addToCart = (prod: Product) => {
    setCart((prev) => [...prev, prod])
    setTotal((prev) => prev + prod.price)
  }

  const checkout = async () => {
    try {
      const res = await fetch(
        "http://localhost:8080/payment/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            price: total,
          }),
        }
      )
      const json = await res.json()
      console.log(json)
      window.location.href = json.url
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  return (
    <>
      <Routes>
        <Route element={<SuccessPage />} path="/success" />
        <Route element={<ErrorPage />} path="/error" />
      </Routes>
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
          <h3>Totale: {total} EURO</h3>
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
            <button className="btn btn-primary" onClick={() => checkout()}>
              Paga
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
