import { Controller, useFormContext } from 'react-hook-form';
import {
    Checkbox as MuiCheckbox,
    FormControlLabel,
    FormControlLabelProps,
    FormHelperText,
} from '@mui/material';
import { ReactNode } from 'react';

interface Props extends Omit<FormControlLabelProps, 'control'> {
    name: string;
    helperText?: ReactNode;
}

export function Checkbox({ name, helperText, ...other }: Props) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <div>
                    <FormControlLabel
                        control={<MuiCheckbox {...field} checked={field.value} />}
                        {...other}
                    />

                    {(!!error || helperText) && (
                        <FormHelperText error={!!error}>
                            {error ? error?.message : helperText}
                        </FormHelperText>
                    )}
                </div>
            )}
        />
    );
}
