import { Nav } from '#modules/nav';
import { Outlet } from 'react-router';
import { SidebarLayout } from '#components';

export function Layout() {
    return (
        <SidebarLayout>
            <SidebarLayout.Sidebar>
                <Nav />
            </SidebarLayout.Sidebar>
            <SidebarLayout.Content>
                <Outlet />
            </SidebarLayout.Content>
        </SidebarLayout>
    );
}
