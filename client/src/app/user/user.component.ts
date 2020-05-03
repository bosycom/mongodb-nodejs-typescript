import { Component, OnInit } from '@angular/core';
import { IUser } from '../interfaces/IUser';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users: IUser[];

  constructor(private userService: UserService) {

  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: users => this.users = users,
      error: err => console.log(err)
    });
  }

}

