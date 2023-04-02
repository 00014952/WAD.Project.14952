import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-edit-author',
  templateUrl: './edit-author.component.html',
  styleUrls: ['./edit-author.component.css'],
})
export class EditAuthorComponent implements OnInit {
  subscriptions: Subscription[] = [];
  constructor(
    private authorService: AuthorService,
    private router: Router,
    private r: ActivatedRoute
  ) {}

  author: any = {
    id: '',
    firstName: '',
    lastName: '',
    BirthDate: '',
    Biography: '',
  };

  ngOnInit(): void {
    const id = this.r.snapshot.params['id'];
    this.subscriptions.push(
      this.authorService.getAuthor(id).subscribe((author: any) => {
        this.author = author.data;
      })
    );
  }

  onSubmit(form: NgForm) {
    this.subscriptions.push(
      this.authorService
        .updateAuthor(this.author.id, this.author)
        .subscribe((author: any) => {
          this.router.navigate(['/authors']);
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
