import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProd } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

export function TextField({
    name,
    helperText,
    type,
    ...other
}: MuiTextFieldProd & {
    name: string;
}) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <MuiTextField
                    {...field}
                    fullWidth
                    type={type}
                    value={type === 'number' && field.value === 0 ? '' : field.value}
                    onChange={(event) => {
                        if (type === 'number') {
                            field.onChange(Number(event.target.value));
                        } else {
                            field.onChange(event.target.value);
                        }
                    }}
                    error={!!error}
                    helperText={error ? error?.message : helperText}
                    {...other}
                />
            )}
        />
    );
}
