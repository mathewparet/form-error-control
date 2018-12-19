export default class Errors 
{
    constructor()
    {
        this.errors = [];
    }

    get(field) 
    {
        if(this.errors[field])
            return this.errors[field][0];
    }

    record(errors) 
    {
        this.errors = errors.errors;
    }

    clear(field)
    {
        if(field) 
            delete this.errors[field];
        else
            this.errors = [];
    }

    has(field)
    {
        return this.errors.hasOwnProperty(field);
    }

    any() {
        return Object.keys(this.errors).length > 0; 
    }
}