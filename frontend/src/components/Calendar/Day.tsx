import { GridItem, Text } from '@chakra-ui/react';
import { ComponentProps } from 'react';
import { noop } from 'lodash';

type Props = Pick<ComponentProps<typeof GridItem>, 'onClick' | 'onMouseOver' | 'onMouseOut'> & {
    day: number;
    color: { base: string; hover: string };
    disabled?: boolean;
    highlighted?: boolean;
};

export function Day({
    color: chosenColor,
    day,
    disabled = false,
    highlighted = false,
    onClick,
    ...props
}: Props) {
    const color = disabled ? { base: 'grey.200', hover: 'grey.200' } : chosenColor;

    return (
        <GridItem
            key={day}
            backgroundColor={highlighted ? color.hover : color.base}
            width={8}
            height={7}
            textAlign='center'
            alignItems='center'
            _hover={{ backgroundColor: color.hover, cursor: disabled ? 'not-allowed' : 'pointer' }}
            onClick={disabled ? noop : onClick}
            {...props}
        >
            <Text as='span' fontSize='xs' textAlign='center'>
                {day}
            </Text>
        </GridItem>
    );
}
