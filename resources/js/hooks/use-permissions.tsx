import { useCallback, useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';

/*
I want the usePermissions to work like this:

The backend gives us a list of permissions:
['admin.dashboard.overview', '*', ...].
This is a list of permissions that the user has.

My idea is to use this list of permissions to check if the user has a specific permission.

const {permissions, hasPermission} = usePermissions();

If I use hasPermission it should check for the given permission to check or the wildcard, but
I also need to check if the user has a specific permission inside the rendered component.

like this:


const { permissions, hasPermission } = usePermissions();

<div>
    {hasPermission('admin.dashboard.overview') && <div>Admin Dashboard Overview</div>}
    {hasPermission('admin.dashboard.*') && <div>Admin Dashboard</div>}
    {hasPermission('*') && <div>All Permissions</div>}
</div>

 */

export const usePermissions = () => {
    const { auth } = usePage<SharedData>().props;
    const [permissions, setPermissions] = useState<string[]>([]);

    const updatePermissions = useCallback(() => setPermissions(auth?.permissions || []), [auth?.permissions]);

    useEffect(() => updatePermissions(), [updatePermissions]);

    const hasPermission = useCallback(
        (permission: string) => {
            if (permissions.includes('*')) return true;

            const permissionParts = permission.split('.');
            const wildcardPermission = permissionParts.slice(0, -1).concat('*').join('.');

            return permissions.includes(permission) || permissions.includes(wildcardPermission);
        },
        [permissions]
    );

    return { permissions, hasPermission };
}
