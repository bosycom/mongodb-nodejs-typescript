import { Component, OnInit } from '@angular/core';
import { IUserSettings } from '../data/user-settings';
import { DataService } from '../data/data.service';
import { NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.scss']
})
export class UserSettingsFormComponent implements OnInit {

  originalUserSettings: IUserSettings = {
    name: "Mathias",
    emailOffers: true,
    interfaceStyle: "light",
    subscriptionType: "Annual",
    notes: "Some notes"
  };

  userSettings: IUserSettings = { ...this.originalUserSettings };
  postError = false;
  postErrorMessage = "";

  constructor(private dataService: DataService) { }

  ngOnInit(): void {

  }

  onSubmit(form: NgForm) {
    if(form.valid) {
      this.dataService.postUserSettingsForm(this.userSettings).subscribe(
        result => console.log("Success: ", result),
        error => this.onHttpError(error)
      );
    } else {
      this.postError = true;
      this.postErrorMessage = "Form is not valid";
    }
    
  }

  onBlur(nameField: NgModel) {
      console.log("in onBlur: ", nameField.valid);
  }

  onHttpError(error: any) {
    this.postError = true;
    this.postErrorMessage = error.message;
  }

}
