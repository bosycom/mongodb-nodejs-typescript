import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../user.service';
import { IUser } from '../interfaces/IUser';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  user: IUser;

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    // const id = +this.route.snapshot.paramMap.get('id');
    this.route.paramMap.subscribe(
      (newParams: Params) => {
        const id = newParams.params.id;

        this.userService.getUsers().subscribe({
          next: users => {
            this.user = users.find(item => {
              console.log(item.id, id);
              return item['_id'] === id;
            });
          },
          error: err => console.log(`User with id ${id} could not be fetched`)
        })
      }
    )
  }

}
