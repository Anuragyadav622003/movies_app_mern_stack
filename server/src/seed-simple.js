import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import Movie from "./models/Movies.js";
import User from "./models/User.js";
dotenv.config();

// Sample 30 movies data
const moviesData = [
  {
    title: "The Shawshank Redemption",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    releaseDate: new Date("1994-09-23"),
    duration: 142,
    rating: 9.3,
    genres: ["Drama"],
    director: "Frank Darabont",
    cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg",
    imdbId: "tt0111161"
  },
  {
    title: "The Godfather",
    description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    releaseDate: new Date("1972-03-24"),
    duration: 175,
    rating: 9.2,
    genres: ["Crime", "Drama"],
    director: "Francis Ford Coppola",
    cast: ["Marlon Brando", "Al Pacino", "James Caan"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    imdbId: "tt0068646"
  },
  {
    title: "The Dark Knight",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    releaseDate: new Date("2008-07-18"),
    duration: 152,
    rating: 9.0,
    genres: ["Action", "Crime", "Drama"],
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
    imdbId: "tt0468569"
  },
  {
    title: "Pulp Fiction",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
    releaseDate: new Date("1994-10-14"),
    duration: 154,
    rating: 8.9,
    genres: ["Crime", "Drama"],
    director: "Quentin Tarantino",
    cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    imdbId: "tt0110912"
  },
  {
    title: "Inception",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    releaseDate: new Date("2010-07-16"),
    duration: 148,
    rating: 8.8,
    genres: ["Action", "Sci-Fi", "Thriller"],
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
    imdbId: "tt1375666"
  },
  {
    title: "Fight Club",
    description: "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
    releaseDate: new Date("1999-10-15"),
    duration: 139,
    rating: 8.8,
    genres: ["Drama"],
    director: "David Fincher",
    cast: ["Brad Pitt", "Edward Norton", "Helena Bonham Carter"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BNDIzNDU0YzEtYzE5Ni00ZjlkLTk5ZjgtNjM3NWE4YzA3Nzk3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    imdbId: "tt0137523"
  },
  {
    title: "Forrest Gump",
    description: "The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other historical events unfold from the perspective of an Alabama man with an IQ of 75.",
    releaseDate: new Date("1994-07-06"),
    duration: 142,
    rating: 8.8,
    genres: ["Drama", "Romance"],
    director: "Robert Zemeckis",
    cast: ["Tom Hanks", "Robin Wright", "Gary Sinise"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
    imdbId: "tt0109830"
  },
  {
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    releaseDate: new Date("2014-11-07"),
    duration: 169,
    rating: 8.6,
    genres: ["Adventure", "Drama", "Sci-Fi"],
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
    imdbId: "tt0816692"
  },
  {
    title: "The Matrix",
    description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    releaseDate: new Date("1999-03-31"),
    duration: 136,
    rating: 8.7,
    genres: ["Action", "Sci-Fi"],
    director: "Lana & Lilly Wachowski",
    cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
    imdbId: "tt0133093"
  },
  {
    title: "Parasite",
    description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    releaseDate: new Date("2019-05-30"),
    duration: 132,
    rating: 8.6,
    genres: ["Comedy", "Drama", "Thriller"],
    director: "Bong Joon Ho",
    cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg",
    imdbId: "tt6751668"
  },
  // ... add 20 more movies here with unique imdbId: "tt0000001" → "tt0000020"
];

// Generate remaining 20 dummy movies with unique imdbId
for (let i = 11; i <= 30; i++) {
  moviesData.push({
    title: `Sample Movie ${i}`,
    description: `Description for Sample Movie ${i}`,
    releaseDate: new Date(`200${i % 10}-01-01`),
    duration: 100 + i,
    rating: 7.0 + (i % 4) * 0.3,
    genres: ["Drama"],
    director: `Director ${i}`,
    cast: [`Actor ${i}A`, `Actor ${i}B`],
    posterUrl: `https://via.placeholder.com/300x450?text=Sample+Movie+${i}`,
    imdbId: `tt00000${i}`
  });
}

// Seed function
const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/movieapp", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    await Movie.deleteMany({});
    await User.deleteMany({});
    console.log("🗑️  Cleared existing data");

    const adminPassword = await bcrypt.hash("admin123", 10);
    const adminUser = await User.create({
      name: "admin",
      email: "admin@movieapp.com",
      password: adminPassword,
      role: "admin",
    });
    console.log("👑 Admin user created:", adminUser.email);

    const userPassword = await bcrypt.hash("user123", 10);
    const regularUser = await User.create({
      name: "user",
      email: "user@movieapp.com",
      password: userPassword,
      role: "user",
    });
    console.log("👤 Regular user created:", regularUser.email);

    const moviesWithCreator = moviesData.map((movie) => ({
      ...movie,
      addedBy: adminUser._id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    const movies = await Movie.insertMany(moviesWithCreator);
    console.log(`🎬 Added ${movies.length} movies to the database`);

    await mongoose.connection.close();
    console.log("🔌 MongoDB connection closed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
};

seedDatabase();
