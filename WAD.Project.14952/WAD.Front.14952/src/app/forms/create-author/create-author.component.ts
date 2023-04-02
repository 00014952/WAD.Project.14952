import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-create-author',
  templateUrl: './create-author.component.html',
  styleUrls: ['./create-author.component.css'],
})
export class CreateAuthorComponent implements OnInit {
  subscriptions: Subscription[] = [];
  constructor(private authorService: AuthorService, private router: Router) {}

  author: any = {
    firstName: '',
    lastName: '',
    BirthDate: '',
    Biography: '',
  };

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.subscriptions.push(
      this.authorService.addAuthor(this.author).subscribe((author: any) => {
        this.router.navigate(['/authors']);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
