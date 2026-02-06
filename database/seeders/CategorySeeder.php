<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        Category::create([
            "name" => "Conocimiento General",
            "description" => "Preguntas variadas sobre datos curiosos, historia básica, cultura y hechos del día a día."
        ]);
        Category::create([
            "name" => "Cine y Series",
            "description" => "Trivia sobre películas clásicas, estrenos, personajes, actores, citas famosas y universos cinematográficos."
        ]);
        Category::create([
            "name" => "Videojuegos",
            "description" => "Preguntas sobre sagas, mecánicas, personajes, historia del gaming y momentos icónicos."
        ]);
        Category::create([
            "name" => "Geografía",
            "description" => "Capitales, mapas, banderas, países, montañas, ríos y ubicaciones famosas."
        ]);
        Category::create([
            "name" => "Literatura",
            "description" => "Autores, libros populares, géneros, personajes y citas célebres."
        ]);
        Category::create([
            "name" => "Música",
            "description" => "Artistas, géneros, letras, historia musical y trivia de álbumes."
        ]);
        Category::create([
            "name" => "Ciencia y Naturaleza",
            "description" => "Biología, física, química, animales, ecosistemas y descubrimientos importantes."
        ]);
        Category::create([
            "name" => "Deportes",
            "description" => "Reglas, equipos, jugadores, récords y competencias internacionales."
        ]);
        Category::create([
            "name" => "Lógica y Adivinanzas",
            "description" => "Preguntas tipo rompecabezas, acertijos, patrones y pequeños desafíos mentales."
        ]);
        Category::create([
            "name" => "Tecnología",
            "description" => "Innovaciones, historia tech, dispositivos, programación y conceptos esenciales."
        ]);
        Category::create([
            "name" => "Comida y Gastronomía",
            "description" => "Platos típicos, ingredientes, cocina internacional, sabores y curiosidades culinarias."
        ]);
        Category::create([
            "name" => "Anime y Manga",
            "description" => "Preguntas sobre anime o manga"
        ]);
        Category::create([
            "name" => "Historia",
            "description" => "Preguntas sobre hechos historicos."
        ]);
        Category::create([
            "name" => "Arte y Cultura",
            "description" => "Preguntas sobre obras de arte, autores y cultura."
        ]);
        Category::create([
            "name" => "Misterio y curiosidades",
            "description" => "Preguntas sobre misterios y curiosidades."
        ]);
        Category::create([
            "name" => "Filosofía y Pensamiento",
            "description" => "Preguntas sobre filosofía y pensamiento."
        ]);
        Category::create([
            "name" => "Verdadero o Falso",
            "description" => "Tipicas preguntas sobre si un hecho es verdadero o falso."
        ]);
        Category::create([
            "name" => "Otros / Miscelánea",
            "description" => "Preguntas que no encajan del todo en una categoría específica."
        ]);
    }
}
