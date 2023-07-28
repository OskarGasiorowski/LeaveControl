import { GridItem, Text } from '@chakra-ui/react';

interface Props {
    day: number;
    onClick: () => void;
    color: { base: string; hover: string };
}

export function Day({ color, day, onClick }: Props) {
    return (
        <GridItem
            key={day}
            backgroundColor={color.base}
            width={8}
            height={7}
            textAlign='center'
            alignItems='center'
            _hover={{ backgroundColor: color.hover, cursor: 'pointer' }}
            onClick={onClick}
        >
            <Text as='span' fontSize='xs' textAlign='center'>
                {day}
            </Text>
        </GridItem>
    );
}
