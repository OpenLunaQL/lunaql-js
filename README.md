# LunaQL JS Client

This is a JS client for the [LunaQL](https://lunaql.com) NoSQL database.

## Example

```ts
import { Database } from './src'

const db = new Database({
    endpoint: '<endpoint>',
    token: '<token>'
});

type User = {
    _id: number;
    _fk: string;
    first_name: string;
    last_name: string;
    email_address: string;
    tasks: Task[];
    created_at: string;
    updated_at: string;
}

type Task = {
    _id: number;
    _fk: string;
    user_id: number;
    title: string;
    created_at: string;
    updated_at: string;
}

const main = async () => {
    const objectIDs = await db.query()
        .from('users')
        .limit(1)
        .select(['_fk'])
        .list('_fk');

    const results = await db.query()
        .from('users')
        .where('_fk', 'in', objectIDs)
        .hasMany('tasks', (q) => {
            q.where('user_id', '=', '$._id').orderBy('created_at', 'asc');
        })
        .fetch<User[]>();

    console.log(results)
}

main();
```

## Todo
- [ ] Add tests
- [ ] Implement error handling
- [ ] Implement more query methods

Security
-------

If you discover any security related issues, please email donaldpakkies@gmail.com instead of using the issue tracker.

License
-------

The MIT License (MIT). Please see [License File](LICENSE) for more information.

