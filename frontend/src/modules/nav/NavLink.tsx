import { LinkBox, HStack, LinkOverlay, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { TimeIcon } from '@chakra-ui/icons';
import { useLocation } from 'react-router';

interface Props {
    label: string;
    href: string;
    icon: typeof TimeIcon;
}

export function NavLink({ label, href, icon: Icon }: Props) {
    const location = useLocation();
    const isActive = location.pathname === href;

    return (
        <LinkBox
            as={HStack}
            gap={4}
            paddingX={5}
            paddingY={4}
            backgroundColor={isActive ? 'primary.500' : 'transparent'}
            color={isActive ? 'white' : 'grey.300'}
            borderRadius='xl'
            width='full'
        >
            <Icon />
            <LinkOverlay as={Link} to={href} marginInlineStart='0 !important'>
                <Text fontSize='sm' fontWeight='semibold'>
                    {label}
                </Text>
            </LinkOverlay>
        </LinkBox>
    );
}
