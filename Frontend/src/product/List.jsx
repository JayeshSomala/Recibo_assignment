import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { productService } from '../_services';

function List({ match }) {
    const { path } = match;
    const [products, setproducts] = useState(null);

    useEffect(() => {
        productService.getAll().then(x => setproducts(x));
    }, []);

    function deleteProduct(id) {
        setproducts(products.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        productService.delete(id).then(() => {
            setproducts(products => products.filter(x => x.id !== id));
        });
    }

    return (
        <div>
            <h1>Products</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Product</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '50%' }}>Name</th>
                        <th style={{ width: '30%' }}>Cost</th>
                        <th style={{ width: '20%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.map(product =>
                        <tr key={product.id}>
                            <td>{product.Name}</td>
                            <td>{product.Cost}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${product.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteProduct(product.id)} className="btn btn-sm btn-danger btn-delete-user" disabled={product.isDeleting}>
                                    {product.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!products &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {products && !products.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Products To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { List };