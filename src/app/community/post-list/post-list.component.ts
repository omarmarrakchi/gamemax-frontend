import { Component ,OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts: any[] = [];  // Tableau pour stocker les posts

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    // Appel du service pour obtenir les posts lors du chargement du composant
    this.getPosts();
  }

  // Méthode pour récupérer les posts depuis l'API
  getPosts(): void {
    this.postService.getPosts().subscribe(
      (data) => {
        this.posts = data;  // Affectation des données à la variable posts
      },
      (error) => {
        console.error('Erreur lors de la récupération des posts', error);
      }
    );
  }

  // Méthode pour liker un post
  likePost(postId: number): void {
    // Implémentation de la logique pour liker un post (fonction à compléter selon les besoins)
    console.log('Post liked with id:', postId);

  }

}
