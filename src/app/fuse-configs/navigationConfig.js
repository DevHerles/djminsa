const navigationConfig = [
    {
        'id'   : 'profile',
        'title': 'Perfil',
        'type' : 'item',
        'icon' : 'whatshot',
        'url'  : '/apps/profiles'
    },
    {
        'id'      : 'dj',
        'title'   : 'DECLARACIONES JURADAS',
        'type'    : 'group',
        'icon'    : 'apps',
        'children': [
            {
                'id'   : 'health',
                'title': 'Salud',
                'type' : 'item',
                'icon' : 'sentiment_very_satisfied',
                'url'  : '/apps/affidavit/healths/all',
                'exact': true,
            },
            {
                'id'   : 'symptoms',
                'title': 'Sintomatología',
                'type' : 'item',
                'icon' : 'face',
                'url'  : '/apps/affidavit/symptoms/all',
                'exact': true,
            },
        ]
    },
    {
        'id'      : 'applications',
        'title'   : 'Socios',
        'type'    : 'group',
        'icon'    : 'apps',
        'children': [
            {
                'id'   : 'app-partners',
                'title': 'Socios',
                'type' : 'item',
                'icon' : 'supervisor_account',
                'url'  : '/apps/partners',
                'exact': true,
            },
            {
                'id'   : 'app-new-partner',
                'title': 'Nuevo socio',
                'type' : 'item',
                'icon' : 'account_box',
                'url'  : '/apps/partners/new',
                'exact': true,
            },
        ]
    },
    {
        'id'      : 'users',
        'title'   : 'Usuarios',
        'type'    : 'group',
        'icon'    : 'apps',
        'children': [
            {
                'id'   : 'app-users',
                'title': 'Usuarios',
                'type' : 'item',
                'icon' : 'verified_user',
                'url'  : '/apps/users',
                'exact': true,
            },
            {
                'id'   : 'app-new-users',
                'title': 'Nuevo usuario',
                'type' : 'item',
                'icon' : 'account_box',
                'url'  : '/apps/users/new',
                'exact': true,
            },
        ]
    }
];

export default navigationConfig;
