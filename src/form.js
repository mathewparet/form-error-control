import Errors from './errors.js'

export default class Form 
{
    constructor(fields) 
    {
        this.originalFields = fields;

        for(let field in fields) {
            this[field] = fields[field];
        }

        this.errors = new Errors();
        this.busy = false;
    }

    reset()
    {
        for(let field in this.originalFields) {
            this[field] = '';
        }
    }

    submit(requestType, url)
    {
        this.busy = true;

        return new Promise((resolve, reject) => {
            axios[requestType](url, this.data())
                .then(response => {
                    this.onSuccess(response.data);
                    resolve(response.data);
                })
                .catch(error => {
                    this.onError(error.response.data);
                    reject(error.response.data);
                });
        });
    }

    post(url) 
    {
        return this.submit('post', url);
    }

    get(url)
    {
        return this.submit('get', url);
    }

    put(url)
    {
        return this.submit('put', url);
    }

    patch(url)
    {
        return this.submit('patch', url);
    }

    delete(url)
    {
        return this.submit('delete', url);
    }

    data()
    {
        let field = Object.assign({}, this);

        delete field.originalFields;
        delete field.errors;
        delete field.busy;

        return field;
    }

    onSuccess(data)
    {
        console.debug(data);
        this.reset();
        this.errors.clear();
        this.busy = false;
    }

    onError(errors)
    {
        this.busy = false;
        this.errors.record(errors);
    }
}