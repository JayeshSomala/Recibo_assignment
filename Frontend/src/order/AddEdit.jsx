// import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useForm } from "react-hook-form";
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as Yup from 'yup';

// import { alertService, orderService } from '../_services';

// function AddEdit({ history, match }) {
//     const { id } = match.params;
//     const isAddMode = !id;

//     // form validation rules 
//     const validationSchema = Yup.object().shape({
//         user: Yup.string()
//             .required('User is required'),
//         Product: Yup.number()
//             .required('Product is required'),
//         outlet: Yup.string()
//             .required('Order is required'),
//     });

//     // functions to build form returned by useForm() hook
//     const { register, handleSubmit, reset, setValue, errors, formState } = useForm({
//         resolver: yupResolver(validationSchema)
//     });

//     function onSubmit(data) {
//         return isAddMode
//             ? createorder(data)
//             : updateorder(id, data);
//     }

//     function createorder(data) {
//         return orderService.create(data)
//             .then(() => {
//                 alertService.success('Order added', { keepAfterRouteChange: true });
//                 history.push('.');
//             })
//             .catch(alertService.error);
//     }

//     function updateorder(id, data) {
//         return orderService.update(id, data)
//             .then(() => {
//                 alertService.success('Order updated', { keepAfterRouteChange: true });
//                 history.push('..');
//             })
//             .catch(alertService.error);
//     }

//     useEffect(() => {
//         if (!isAddMode) {
//             // get order and set form fields
//             orderService.getById(id).then(order => {
//                 const fields = ['Name', 'Phone', 'address'];
//                 fields.forEach(field => setValue(field, order[field]));
//             });
//         }
//     }, []);

//     return (
//         <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
//             <h1>{isAddMode ? 'Add order' : 'Edit order'}</h1>
//             <div className="form-row">
//                 <div className="form-group col-5">
//                     <label>User</label>
//                     <input Name="Name" type="text" ref={register} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} />
//                     <div className="invalid-feedback">{errors.Name?.message}</div>
//                 </div>
//                 <div className="form-group col-5">
//                     <label>Phone Phone</label>
//                     <input Name="Phone" type="Phone" ref={register} className={`form-control ${errors.Phone ? 'is-invalid' : ''}`} />
//                     <div className="invalid-feedback">{errors.Phone?.message}</div>
//                 </div>
//                 <div className="form-group col-5">
//                     <label>Address</label>
//                     <input Name="Address" type="text" ref={register} className={`form-control ${errors.Address ? 'is-invalid' : ''}`} />
//                     <div className="invalid-feedback">{errors.Address?.message}</div>
//                 </div>
//             </div>
//             <div className="form-group">
//                 <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
//                     {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
//                     Save
//                 </button>
//                 <Link to={isAddMode ? '.' : '..'} className="btn btn-link">Cancel</Link>
//             </div>
//         </form>
//     );
// }
import React from 'react';
class AddEdit extends React.Component{

    state={
    
        products:[]
    }
    
    componentDidMount()
    {
         fetch('http://localhost:3000/products')
         .then(response=>response.json())
         .then(products=>this.setState({products:products}))
        
        }
    
    render()
    {
        return<div>
          <p1> Select User:</p1>
            <select>
            <option>-select user-</option>
                {
                   
                    this.state.users.map(users=><option value="products.name">{users.state_name}</option>)
                   
                }
            </select><br></br>
        </div>
        }
        }
export { AddEdit };