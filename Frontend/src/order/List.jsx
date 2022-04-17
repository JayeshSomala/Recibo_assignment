import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { outletService } from '../_services';

function List({ match }) {
    const { path } = match;
    const [outlets, setoutlets] = useState(null);

    useEffect(() => {
        outletService.getAll().then(x => setoutlets(x));
    }, []);

    function deleteOutlet(id) {
        setoutlets(outlets.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        outletService.delete(id).then(() => {
            setoutlets(outlets => outlets.filter(x => x.id !== id));
        });
    }

    return (
        <div>
            <h1>Outlets</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Outlet</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Name</th>
                        <th style={{ width: '20%' }}>Phone Number</th>
                        <th style={{ width: '40%' }}>Address</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                {/* <tbody>
                    {outlets && outlets.map(outlet =>
                        <tr key={outlet.id}>
                            <td>{outlet.Name}</td>
                            <td>{outlet.Phone}</td>
                            <td>{outlet.Address}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${outlet.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteOutlet(outlet.id)} className="btn btn-sm btn-danger btn-delete-user" disabled={outlet.isDeleting}>
                                    {outlet.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!outlets &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {outlets && !outlets.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Outlets To Display</div>
                            </td>
                        </tr>
                    }
                </tbody> */}
            </table>
        </div>
    );
}

export { List };