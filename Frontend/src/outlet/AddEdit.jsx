import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { alertService, outletService } from '../_services';

function AddEdit({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;

    // form validation rules 
    const validationSchema = Yup.object().shape({
        Name: Yup.string()
            .required('Name is required'),
        Phone: Yup.number()
            .required('Phone number is required'),
        Address: Yup.string()
            .required('Address is required'),
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, errors, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });

    function onSubmit(data) {
        return isAddMode
            ? createoutlet(data)
            : updateoutlet(id, data);
    }

    function createoutlet(data) {
        return outletService.create(data)
            .then(() => {
                alertService.success('Outlet added', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(alertService.error);
    }

    function updateoutlet(id, data) {
        return outletService.update(id, data)
            .then(() => {
                alertService.success('Outlet updated', { keepAfterRouteChange: true });
                history.push('..');
            })
            .catch(alertService.error);
    }

    useEffect(() => {
        if (!isAddMode) {
            // get outlet and set form fields
            outletService.getById(id).then(outlet => {
                const fields = ['Name', 'Phone', 'address'];
                fields.forEach(field => setValue(field, outlet[field]));
            });
        }
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Add outlet' : 'Edit outlet'}</h1>
            <div className="form-row">
                <div className="form-group col-5">
                    <label>Outlet Name</label>
                    <input Name="Name" type="text" ref={register} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.Name?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Phone</label>
                    <input Name="Phone" type="Phone" ref={register} className={`form-control ${errors.Phone ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.Phone?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Address</label>
                    <input Name="Address" type="text" ref={register} className={`form-control ${errors.Address ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.Address?.message}</div>
                </div>
            </div>
            <div className="form-group">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Save
                </button>
                <Link to={isAddMode ? '.' : '..'} className="btn btn-link">Cancel</Link>
            </div>
        </form>
    );
}

export { AddEdit };