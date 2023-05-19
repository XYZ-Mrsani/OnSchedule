export const environment = {
    production: true,
    BASE_URL: 'http://localhost:3000/',
    Bookings_BASE_URL: 'http://localhost:3000/bookings/',
    BOOKINGS: {
        GET_ALL_BOOKINGS: 'list',
        GET_ALL_CANCEL_BOOKINGS: 'listcancel',
        VIEW_BOOKINGS: 'viewbookings?id=',
        DELETE: 'delete?id=',
        DELETE_BOOKINGS: 'deletebookings',
        UPDATE: 'update?id=',
        V_BOOKING: 'vbooking?nicnum=',
        V_C_BOOKING: 'vcancel?nicnum='

    },
    BUSES_BASE_URL: 'http://localhost:3000/bus/',
    BUSES: {
        GET_ALL_BUSES: 'list',
        ADD_BUS: 'addbus',
        VIEW_BUS: 'viewbus?id=',
        UPDATE: 'update?id=',
        DELETE: 'delete?id=',
        VBUS: 'vbus?busnum=',
        UPDATE_SEAT: 'updateseat'
    },

    TRANSACTION_BASE_URL: 'http://localhost:3000/transaction/',
    TRANSACTION: {
        GET_ALL_TRANSACTION: 'list',
        VIEW_TRANSACTION: 'viewt?nicnum='
    },
    ADMIN_BASE_URL: 'http://localhost:3000/admin/',
    ADMIN: {
        LOGIN: 'login'
    },
    PASSENGER_BASE_URL: 'http://localhost:3000/passenger/',
    PASSENGER: {
        GET_ALL_FEEDBACK: 'list',
        VIEW_FEEDBACK: 'viewfeedback?id=',
        UPDATE: 'update?id=',
        DELETE: 'delete?id=',
        V_FEEDBACK: 'vfeedback?busnum='
    }
};