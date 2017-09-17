# A Light Store.js

A lightweight foundation to create and work with data stores on the client side. I wrote this as a lightweight alternative to more heavily engineered projects such as redux. It does not attempt to provide bindings out of the box but works well with libraries like Vue.js or any others that can reactively observe on native structures provided to them.


## how to use

Initialize your stores like so:

```
const store = new Store([
  'posts',
  'comments',
  'authors'
])
```

You can then use the following functions to work with them:


### add

```
let post = {title: 'Sushi', body: "What are you're fav rolls?"};
store.add('posts', post)
```

This will return the object added including a generated resource id(rid).
Note you must encapsulate your resource data in an object.


### update

```
store.update('posts', {title: 'Sashimi', 'rid: '8wf9z57ribw'})
```

If you are not updating all of the attributes, you can simply include the attributes that are being updated. In the example above, only the title is being updated. Note that the resource id is required as an identifier. This should already be included in your stored objects as it's generated when adding new items. By the way, you may ask yourself, is the `rid` updatable as an attribute? For maximum flexibility, it is for the moment but we may change that readonly if it proves too troublesome in the future.


### remove

```
store.remove('posts', postObj)
```

You can either pass the whole resource object in or simply and object containing just the id in this case. For example: `store.remove('posts', {rid: '8wf9z57ribw'})`


### list

```
store.list('posts')
// or
store.posts //useful for observing directly with reactive libraries
```

You should not attempt to write to or mutate `store.posts` directly. Always use the add(), update(), and remove() functions for crud operations on your stores.  If you by chance overwrite as such: `store.posts = newArray`, not only will you risk breaking your potential binding to reactive frameworks like Vue.js, but you'll also risk breaking your data structure and corrupting your store in unexpected ways.


### get

```
store.get('posts', postObj)
```

At the very least the `postObj` referenced here must contain the resource id: `store.get(posts, {rid: '8wf9z57ribw'})`
Note: you may not need this function too often. If you already have access to the resource id, it's likely you already have the whole resource object anyway.


### resources

```
store.resources()
```

This will return all resources in a single tree.
