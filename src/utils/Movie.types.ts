export interface Movie {
    _id:string
    movieImage: string;
    title: string;
    overView: string;
}

export interface MovieCardProps {
    movie: Movie;
}