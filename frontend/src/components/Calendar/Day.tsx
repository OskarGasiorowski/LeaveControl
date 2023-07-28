import { GridItem, Text } from '@chakra-ui/react';

interface Props {
    day: number;
    onClick: () => void;
    color: { base: string; hover: string };
    disabled?: boolean;
}

export function Day({ color: chosenColor, day, onClick, disabled = false }: Props) {
    const color = disabled ? { base: 'grey.200', hover: 'grey.200' } : chosenColor;

    return (
        <GridItem
            key={day}
            backgroundColor={color.base}
            width={8}
            height={7}
            textAlign='center'
            alignItems='center'
            _hover={{ backgroundColor: color.hover, cursor: disabled ? 'not-allowed' : 'pointer' }}
            onClick={onClick}
        >
            <Text as='span' fontSize='xs' textAlign='center'>
                {day}
            </Text>
        </GridItem>
    );
}
