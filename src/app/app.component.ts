import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];

  constructor() {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(
          null,
          [Validators.required, this.forbiddenNames.bind(this)]
        ),
        'email': new FormControl(
          null,
          [Validators.required, Validators.email],
          this.forbiddenEmails
        )
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
    this.signupForm.valueChanges.subscribe(value => console.log('valueChanges', value));
    this.signupForm.statusChanges.subscribe(value => console.log('statusChanges', value));
    this.signupForm.setValue({
      'userData': {
        'username': 'Paweł',
        'email': 'programmer@it-opes.com'
      },
      'gender': 'male',
      'hobbies': []
    });
    this.signupForm.patchValue({
      'userData': {
        'username': 'Anna',
      }
    });
  }

  onSubmit(): void {
    console.log(this.signupForm);
    this.signupForm.reset();
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  forbiddenNames(control: AbstractControl): ValidationErrors | null {
    if (this.forbiddenUsernames.indexOf(control.value) > -1) {
      return {'nameIsForbidden': true};
    }
    return null;
  }

  forbiddenEmails(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return new Promise<ValidationErrors | null>((resolve, reject) => {
      setTimeout(() => {
        console.log('control', control);
        if (control.value === 'test@test.com') {
          console.log('control.value 1', control.value);
          resolve({'emailIsForbidden': true});
        } else {
          console.log('control.value 2', control.value);
          resolve(null);
        }
      }, 2500);
    });
  }
}
