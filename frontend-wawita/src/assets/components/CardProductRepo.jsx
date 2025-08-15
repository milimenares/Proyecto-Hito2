import { Link } from 'react-router-dom'
import { FontAwesomeIcon, faBagShopping, faHeartSolid, faHeartRegular, faPlus } from '../icons/icons'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { ProductContext } from '../context/ProductContext'
import formatPrice from '../utils/formatPrice'

const CardProductRepo = ({ products }) => {

    const { addProduct } = useContext(CartContext)
    const { likeProduct } = useContext(ProductContext)

    if (!products || products.length === 0) return <p>No hay productos para mostrar.</p>

    return (
        <>
            {products.map((p) => (
                <div key={p.id} id="products-repo" className="col-xl-3 col-lg-4 col-sm-6 mb-4 d-flex">
                    <div className="product-card flex-grow-1">
                        <div className="product-condition">{p.condition}</div>
                        <Link to={`/product/${p.id}`}><img src={p.imageUrl} alt={p.title} className="product-img" /></Link>
                        <Link to={`/product/${p.id}`} className='text-decoration-none'>
                            <div className="product-info">
                                <h5>{p.title}</h5>
                                <span>{formatPrice(p.price)}</span>
                            </div>
                        </Link>
                        <div className="product-appear-2">
                            <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-login">ver más</Tooltip>}>
                                <Link to={`/product/${p.id}`}>
                                    <div className="box-appear-2">
                                        <FontAwesomeIcon icon={faPlus} className="fs-4" />
                                    </div>
                                </Link>
                            </OverlayTrigger>
                            <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-login">añadir a favs</Tooltip>}>
                                <a href="#" onClick={(e) => {
                                    e.preventDefault()
                                    likeProduct(p.id)
                                }}>
                                    <div className="box-appear-2">
                                        <FontAwesomeIcon
                                            icon={p.liked ? faHeartSolid : faHeartRegular}
                                            className="fs-4"
                                        />
                                    </div>
                                </a>
                            </OverlayTrigger>
                            <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-login">añadir al carrito</Tooltip>}>
                                <div className="box-appear-2">
                                    <button onClick={() => addProduct(p)}><FontAwesomeIcon icon={faBagShopping} className="fs-4" /></button>
                                </div>
                            </OverlayTrigger>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default CardProductRepo