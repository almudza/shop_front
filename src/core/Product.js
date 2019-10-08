import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import { listRelated, read } from './apiCore'
import Card from './Card'

function Product(props) {
    const [product, setProduct] = useState({})
    const [setError] = useState(false)
    const [relatedProduct, setRelatedProduct] = useState([])

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setProduct(data)
                // fetch related products
                listRelated(data._id).then(data => {
                    if (data.error) {
                        setError(data.error)
                    } else {
                        setRelatedProduct(data)
                    }
                })
            }
        })
    }

    useEffect(() => {
        const productId = props.match.params.productId
        loadSingleProduct(productId)
    }, [props])

    return (
        <Layout title={product && product.name}>
            <div className="row">
                <div className="col-md-8 col-lg-8 my-3">
                    {product && product.description && (
                        <Card
                            product={product}
                            description={product.description}
                            showViewDetail={false}
                            quantity={product.quantity}
                        />
                    )}
                </div>

                <div className="col-md-4 col-lg-4 my-3">
                    <h4>Related Products</h4>
                    {relatedProduct.map((p, i) => (
                        <div className="mb-3">
                            <Card key={i} product={p} />
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default Product
