import * as Yup from 'yup';
import { Type } from './Type';

export const Validator = Yup.object<Type>().shape({
    adminEmail: Yup.string()
        .required('Email is required.')
        .email('Email must be a valid email address.'),
    adminPassword: Yup.string()
        .required('Password is required.')
        .min(8, 'Password must be at least 8 characters long.'),
});
