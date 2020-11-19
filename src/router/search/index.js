const cinemaSearch = {
    path: '/cinemaSearch/:searchtype',
    name: 'cinemaSearch',
    component: () =>
        import ('@/components/Search')
}
export default cinemaSearch