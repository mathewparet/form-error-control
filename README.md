# @mathewparet/form-error-control

> A js form and error class to easily handle errors returned by Laravel. Attach input controls to the form object to see magic!

## Installation
``` bash
npm i @mathewparet/form-error-control
```

## Usage

``` js
import Form from "@mathewparet/form-error-control";
registrationForm = new Form({
    name: null,
    email: null,
    password: null,
    password_confirmation: null,
});
// use this form varible as model holder for form controls
```

## Submitting form

To submit form using this form module, just call ```<form-object>.<method>(<url>)```. This returs a promise. Before the promise ```then``` or ```catch``` is called the ```form.errors``` object will be populated with any errors returned by Laravel.

### Example:

``` js
function submitForm(e)
{
    e.preventDefault();
    this.registrationForm.post('/api/register')
        .then(response => console.log(response))
        .catch(error => console.log(error));
}
```

## Automatically clear errors when fields are updated

To automatically clear form error variables when fields are updated, assign a callback to the ```keyDown``` event of the form:

``` js
function formKeyDownEvent($event)
{
    registrationForm.errors.clear($event.target.name);
}
```

## Get error message for a form item

``` js
registrationForm.errors.get('name');
```

## Check whether a form item has any error

``` js
registrationForm.errors.has('name');
```

## Additional properties

```<form-object>.busy``` will be set to true when the form has been submitted, but no response (success or error) has been returned yet.
