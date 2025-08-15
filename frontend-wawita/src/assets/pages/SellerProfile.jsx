import { useContext } from "react"
import { useParams } from "react-router-dom"
import { ProductContext } from "../context/ProductContext"
import { FontAwesomeIcon, faEnvelope, faWhatsapp } from '../icons/icons'
import CardProductRepo from "../components/CardProductRepo"
import toldo from "../images/toldo.svg"

const SellerProfile = () => {
    const { products } = useContext(ProductContext)
    const { email } = useParams()

    // Filtramos productos del vendedor
    const myProducts = products.filter(p => p.userEmail === email)

    // Extraemos el nombre del vendedor desde el primer producto
    const sellerName = myProducts.length > 0 ? myProducts[0].userName : "Vendedor"

    return (
        <section id="section-pages" className="container-fluid">
            <div className="container">
                <h1 className="mb-3">La Tiendita de {sellerName}</h1>
                <div>
                    <div className="text-center mb-4">
                        <h6>Puedes contactarme aquí: <a href={`mailto:${email}`} className="text-decoration-none"> <FontAwesomeIcon icon={faEnvelope} className="icon-product mx-1" /> {email}</a></h6>
                    </div>
                    <img src={toldo} alt="Tiendita" className="toldo" />
                    {myProducts.length === 0 ? (
                        <p className="text-center">El vendedor {sellerName} aún no tiene productos publicados</p>
                    ) : (
                        <div className="row justify-content-center">
                            <CardProductRepo products={myProducts} />
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default SellerProfile
