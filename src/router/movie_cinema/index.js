const movie_cinema = {
    path: '/movies/cinema/:id',
    name: 'movies/cinema',
    component: () =>
        import ('@/components/Movies/movie_cinema')
}
export default movie_cinema