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


### get_by

```
store.get_by('menus' {name: 'sidebar'})
```

This function allows for finding a resource by a particular attribute. You may wish to give some resource objects a unique, memorable key/value pair to query by for some single state objects.


### create

```
store.create('articles')
```

You may wish to dynamically create stores that were not present when you're store was instantiated. You can do so at anytime with this function.


### resources

```
store.resources()
```

This will return all resources in a single tree.


____

## Single Object State

Most of the examples above refer to tracking the state of resources. However, there is no reason why you can't create stores for single objects or singletons as well. In these cases using unique values to key identifiers are advisable for easy retrieval by the `get_by()` function. Likewise, you could always assign the resource id as an element/component id for easy tracking. You may wish to group single state object under a single resource name:

```
let store = new Store(['state']);

//example 1
store.add('state', {name: 'footer', visible: true})

//example 2
let topMenu = store.add('state', {name: 'top-menu', size: 'small'});
// lets update the menu size (maybe you have some class binding here?)
topMenu.size = 'large';
store.update('state', topMenu)

//example 3
store.add('state', {
  name: 'currentUser',
  userName: 'Shinji',
  user_id: '12',
  authenticated: true
})
// later you may need to query current user info:
let currentUser = store.get_by('state', {name: 'currentUser'})
//lets log him out just for fun...
currentUser.authenticated = false;
store.update('state', currentUser)
//or we could just purge the whole state object to be safe:
store.remove('state', currentUser)
```
