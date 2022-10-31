import {rest} from 'msw';
import {mockUsers} from '../mockUsers';

export const getMockQueryResult = (mockData: any[]) => ({
    count: mockData.length,
    pages: 0,
    pageSize: 1,
    currentPage: 1,
    dataList: mockData,
});

export const handlers = [
    rest.get('/users', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(getMockQueryResult(mockUsers)));
    }),

    //------------------------------------------------------------------------------
    // Login page
    //------------------------------------------------------------------------------
    // rest.post('/login', (req, res, ctx) => {
    //     // Persist user's authentication in the session
    //     sessionStorage.setItem('is-authenticated', 'true');
    //     return res(
    //         // Respond with a 200 status code
    //         ctx.status(200),
    //     );
    // }),
    //
    // rest.get('/user', (req, res, ctx) => {
    //     // Check if the user is authenticated in this session
    //     const isAuthenticated = sessionStorage.getItem('is-authenticated');
    //     if (!isAuthenticated) {
    //         // If not authenticated, respond with a 403 error
    //         return res(
    //             ctx.status(403),
    //             ctx.json({
    //                 errorMessage: 'Not authorized',
    //             }),
    //         );
    //     }
    //     // If authenticated, return a mocked user details
    //     return res(
    //         ctx.status(200),
    //         ctx.json({
    //             username: 'admin',
    //         }),
    //     );
    // }),
];
