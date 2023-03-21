export const environment = {
    production: true,
    BASE_URL: 'http://localhost:3000/',
    Bookings_BASE_URL: 'http://localhost:3000/bookings/',
    BOOKINGS: {
        GET_ALL_BOOKINGS: 'list',
        GET_ALL_CANCEL_BOOKINGS: 'listcancel',
        VIEW_BOOKINGS: 'viewbookings?id='

    },
    BUSES_BASE_URL: 'http://localhost:3000/bus/',
    BUSES: {
        GET_ALL_BUSES: 'list'
    },

    TRANSACTION_BASE_URL: 'http://localhost:3000/transaction/',
    TRANSACTION: {
        GET_ALL_TRANSACTION: 'list'
    },
    ADMIN_BASE_URL: 'http://localhost:3000/admin/',
    ADMIN: {
        LOGIN: 'login'
    },
    PASSENGER_BASE_URL: 'http://localhost:3000/passenger/',
    PASSENGER: {
        GET_ALL_FEEDBACK: 'list'
    }
};