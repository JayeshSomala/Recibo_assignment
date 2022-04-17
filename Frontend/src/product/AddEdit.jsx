import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { alertService, productService } from '../_services';

function AddEdit({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;

    // form validation rules 
    const validationSchema = Yup.object().shape({
        Name: Yup.string()
            .required('Name is required'),
        Cost: Yup.number()
            .required('Cost is required'),
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, errors, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });

    function onSubmit(data) {
        return isAddMode
            ? createproduct(data)
            : updateproduct(id, data);
    }

    function createproduct(data) {
        return productService.create(data)
            .then(() => {
                alertService.success('Product added', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(alertService.error);
    }

    function updateproduct(id, data) {
        return productService.update(id, data)
            .then(() => {
                alertService.success('Product updated', { keepAfterRouteChange: true });
                history.push('..');
            })
            .catch(alertService.error);
    }

    useEffect(() => {
        if (!isAddMode) {
            // get product and set form fields
            productService.getById(id).then(product => {
                const fields = ['Name', 'Cost'];
                fields.forEach(field => setValue(field, product[field]));
            });
        }
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Add product' : 'Edit product'}</h1>
            <div className="form-row">
                <div className="form-group col-5">
                    <label>Product Name</label>
                    <input Name="Name" type="text" ref={register} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.Name?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Price</label>
                    <input Name="Cost" type="number" ref={register} className={`form-control ${errors.Cost ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.Cost?.message}</div>
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