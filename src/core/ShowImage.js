import React from 'react'
import { API } from '../config'
import defaultImg from '../img/california.jpg'

function ShowImage({ item, url }) {
    return (
        <div className="product-img">
            <img
                src={`${API}/${url}/photo/${item._id}?${new Date().getTime()}`}
                alt={item.name}
                style={{ maxHeight: '150px', maxWidth: '100%' }}
                className="mb-3 card-img-top"
                onError={img => (img.target.src = `${defaultImg}`)}
            />
        </div>
    )
}

export default ShowImage
