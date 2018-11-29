[![Dependency Status](https://david-dm.org/HauntedThemes/ghost-search/status.svg)](https://david-dm.org/HauntedThemes/ghost-search)
[![devDependency Status](https://david-dm.org/HauntedThemes/ghost-search/dev-status.svg)](https://david-dm.org/HauntedThemes/ghost-search?type=dev)
[![npm version](https://badge.fury.io/js/ghost-search.svg)](https://www.npmjs.com/package/ghost-search)

# ghost-search

A simple but powerful search library for [Ghost Blogging Platform](https://ghost.org/).

## Setup

Open your theme directory and navigate to `assets` subdirectory. \
Create a directory called `js`, if there isn't already one in there, and add the minified version of `ghost-search` in it. \
Open `default.hbs` that is located at the root of your theme. \
At the bottom of this file you should see `{{ghost_foot}}`. \
Add the following code above it and save it:
```
<script type="text/javascript" src="{{asset "js/ghost-search.min.js"}}"></script>
```

Add the following code, in a `.hbs` file, where you want to show the search input:

```html
<input id="ghost-search-field">
```

Add the following code, in a `.hbs` file, where you want to show the search results:

```html
<div id="ghost-search-results"></div>
```

You will need to initialize `ghost-search` to make the search functional. \
Add the following js code after you included `ghost-search.min.js`:

```html
<script type="text/javascript">
    let ghostSearch = new GhostSearch()
</script>
```

## Use ghost-search from CDN

```html
<script src="https://cdn.jsdelivr.net/npm/ghost-search@0.1.1/dist/ghost-search.min.js"></script>
```

## npm

```
npm install ghost-search
```

## Live Examples

[Set a basic search](https://www.hauntedthemes.com/ghost-search-our-first-open-source-library-for-ghost/#set-a-basic-search) \
[Display a message if there are no posts found](https://www.hauntedthemes.com/ghost-search-our-first-open-source-library-for-ghost/#display-a-message-if-there-are-no-posts-found) \
[Search only through tags](https://www.hauntedthemes.com/ghost-search-our-first-open-source-library-for-ghost/#search-only-through-tags) \
[Search posts from a custom collection](https://www.hauntedthemes.com/ghost-search-our-first-open-source-library-for-ghost/#search-posts-from-a-custom-collection) \
[Search posts that are published after 01 Jan 2018](https://www.hauntedthemes.com/ghost-search-our-first-open-source-library-for-ghost/#search-posts-that-are-published-after-01-jan-2018) \
[Search through the title and content of posts](https://www.hauntedthemes.com/ghost-search-our-first-open-source-library-for-ghost/#search-through-the-title-and-content-of-posts) \
[Get the results when a button is clicked](https://www.hauntedthemes.com/ghost-search-our-first-open-source-library-for-ghost/#get-the-results-when-a-button-is-clicked) \
[Get proper results when your Ghost is on a sub-path](https://www.hauntedthemes.com/ghost-search-our-first-open-source-library-for-ghost/#get-proper-results-when-your-ghost-is-on-a-sub-path) \
[Set multiple instances of ghost-search on the same page](https://www.hauntedthemes.com/ghost-search-our-first-open-source-library-for-ghost/#set-multiple-instances-of-ghost-search-on-the-same-page) \
[Add a loading icon when you have a lot of posts](https://www.hauntedthemes.com/ghost-search-our-first-open-source-library-for-ghost/#add-a-loading-icon-when-you-have-a-lot-of-posts) \
[Limit the results displayed](https://www.hauntedthemes.com/ghost-search-our-first-open-source-library-for-ghost/#limit-the-results-displayed)

## Default Options

```
{
    input: '#ghost-search-field',
    results: '#ghost-search-results',
    button: '',
    development: false,
    defaultValue: '',
    template: function(result) {
        let url = [location.protocol, '//', location.host].join('');
        return '<a href="' + url + '/' + result.slug + '/">' + result.title + '</a>';  
    },
    trigger: 'focus',
    options: {
        keys: [
            'title'
        ],
        limit: 100,
        threshold: -3500,
        allowTypo: false
    },
    api: {
        resource: 'posts',
        parameters: { 
            limit: 'all',
            fields: ['title', 'slug'],
            filter: '',
            include: '',
            order: '',
            formats: '',
        },
    },
    on: {
        beforeDisplay: function(){},
        afterDisplay: function(results){},
        beforeFetch: function(){},
        afterFetch: function(){}
    }
}
```

## Options

### input

The ID of the input field that will be transformed into search filter. \
You can set your own id if you want like this:

```html
<input id="my-custom-input">
```

```html
<script type="text/javascript">
    let ghostSearch = new GhostSearch({
        input: '#my-custom-input'
    })
</script>
```

Default value: `'#ghost-search-field'`

### results

The ID of the element that will be transformed into search results. \
You can set your own id if you want like this:

```html
<div id="my-custom-results"></div>
```

```html
<script type="text/javascript">
    let ghostSearch = new GhostSearch({
        results: '#my-custom-results'
    })
</script>
```

Default value: `'#ghost-search-results'`

### button

The ID of the element that will trigger the search results after it's clicked. \
By default, the button parameter is empty because `ghost-search` displays the results when you write in the input. \
To make this work you need to add the input and the button in a `form` element:

```html
<form>
    <input id="my-custom-input">
    <input type="submit" id="my-custom-button">
</form>
<div id="my-custom-results"></div>
```

```html
<script type="text/javascript">
    let ghostSearch = new GhostSearch({
        input: '#my-custom-input',
        results: '#my-custom-results',
        button: '#my-custom-button'
    })
</script>
```

Default value: `''`

### development

A parameter that will do some validation to your current instance. Might be useful if you use the `api` parameter. \
By default it is set to `false` but you can set it like this to `true`:

```html
<script type="text/javascript">
    let ghostSearch = new GhostSearch({
        development: true
    })
</script>
```

Default value: `false`

### defaultValue

A parameter that will set a default value for the input and performs the search.

```html
<script type="text/javascript">
    let ghostSearch = new GhostSearch({
        defaultValue: 'ghost'
    })
</script>
```

Default value: `''`

### template

The template that will be used to render individual items in the search result. \
The method has a parameter `result` that stores all the data that you can use inside the method.

#### Examples:

Make the results a list and wrap each result with `<li>`:

```html
<div id="my-custom-input"></div>
<ul id="my-custom-results"></ul>
```

```html
<script type="text/javascript">
    let ghostSearch = new GhostSearch({
        input: '#my-custom-input',
        results: '#my-custom-results',
        template: function(result) {
            let url = [location.protocol, '//', location.host].join('');
            return '<li><a href="' + url + '/' + result.slug + '">' + result.title + '</a></li>';  
        }
    })
</script>
```

Set url with sub-path:

```html
<script type="text/javascript">
    let ghostSearch = new GhostSearch({
        input: '#my-custom-input',
        results: '#my-custom-results',
        template: function(result) {
            let url = [location.protocol, '//', location.host].join('') + '/sub-path/';
            return '<a href="' + url + '/' + result.slug + '">' + result.title + '</a>';  
        }
    })
</script>
```

Default value:

```html
function(result) {
    let url = [location.protocol, '//', location.host].join('');
    return '<a href="' + url + '/' + result.slug + '">' + result.title + '</a>';  
}
```

### trigger

Tells the script when to fetch the collection of data. The default value is `focus`, that means when a user clicks the input, all the data is fetched. \
You can also use `load`. This will fetch the data when the page loads.

`load` might **create a DDOS effect** because it loads all the data every time a page loads. Use carefully.

Default value: `'focus'`

### options

`ghost-search` is using `fuzzysort` as an algorithm for search. The `option` parameter supports all the options from [fuzzysort](https://github.com/farzher/fuzzysort#options).
By default, `ghost-search` is showing the first 10 results and searches only based on title.

Let's try another example that will show the first 3 results and searches both title and the content of a collection:

```html
<script type="text/javascript">
    let ghostSearch = new GhostSearch({
        options: {
            keys: [
                'title',
                'plaintext'
            ],
            limit: 3,
        },
        api: {
            resource: 'posts',
            parameters: { 
                fields: ['title', 'slug', 'plaintext'],
                formats: 'plaintext',
            },
        },
    })
</script>
```

Default value:
```
{
    keys: [
        'title'
    ],
    limit: 10,
    threshold: -3500,
    allowTypo: false
}
```

### api

The api parameter is an object that supports most of the [resources](https://api.ghost.org/docs/post) and [parameters](https://api.ghost.org/docs/limit) by [Ghost API](https://api.ghost.org).

Resources: [posts](https://api.ghost.org/docs/post), [tags](https://api.ghost.org/docs/tag), [users](https://api.ghost.org/docs/user) \
Parameters: [fields](https://api.ghost.org/docs/fields), [filter](https://api.ghost.org/docs/filter), [include](https://api.ghost.org/docs/include), [order](https://api.ghost.org/docs/order), [formats](https://api.ghost.org/docs/formats), [limit](https://api.ghost.org/docs/limit)

Examples:

Search through tags:

```html
<script type="text/javascript">
    let ghostSearch = new GhostSearch({
        options: {
            keys: [
                'name',
            ],
        },
        api: {
            resource: 'tags',
            parameters: { 
                fields: ['name', 'slug'],
            },
        },
        template: function(result) {
            let url = [location.protocol, '//', location.host].join('') + '/tag';
            return '<a href="' + url + '/' + result.slug + '/">' + result.name + '</a>';  
        },
    })
</script>
```

Search through a custom collection:

Let's say we have a `routes.yaml` like this:

```
routes:

collections:
  /themes/:
    permalink: /themes/{slug}/
    filter: tag:themes
    data: tag.themes
  /:
    permalink: /{slug}/
    filter: tag:-themes
    template:
      - index

taxonomies:
  tag: /tag/{slug}/
  author: /author/{slug}/
```

`/themes/` is a collection that will show posts with tag `themes`. A post like this will have the url `example.com/themes/post-slug`.

Our `ghost-search` will become:

```
let ghostSearch = new GhostSearch({
    options: {
        keys: [
            'title',
        ],
    },
    api: {
        resource: 'posts',
        parameters: { 
            fields: ['title', 'slug'],
            filter: 'tags:[themes]',
            include: 'tags'
        },
    },
    template: function(result) {
        let collection = 'themes';
        let url = [location.protocol, '//', location.host].join('') + '/' + collection;
        return '<a href="' + url + '/' + result.slug + '/">' + result.title + '</a>';  
    },
})
```

### on

This parameter has 4 methods in it: `beforeDisplay`, `afterDisplay`, `beforeFetch`, `afterFetch`. \
`afterDisplay` and `afterFetch` have a parameter `results` that contains the results fetched. \
They are useful to do things before results are visible to users.

Example:

```
let ghostSearch = new GhostSearch({
    on: {
        beforeFetch: function(){
            // Create a div that has a spinning icon
            console.log('Loading appers');
        },
        afterFetch: function(results){
            // Remove the spinning icon
            console.log('Loading disappears');
        }
    }
})
```

## Contributing

All changes should be committed to `src/` files only.

## Known Issues
* DDOS effect when `trigger` is set to `load`.
If you have a lot of posts and set `trigger` to `load` you might get a DDOS effect because you are loading all the post everything a page loads. It would be better to just set `trigger` to `focus`.
* [Avoid using `fields` if you are filtering on a relationship](https://github.com/TryGhost/Ghost/issues/8649).
If you include `tags` or `authors`, the library removes everything you have in `fields` parameter.

## Changelog

### 0.1.1 - 29 Nov 2018
* Added `defaultValue` parameter.

### 0.1.0 - 17 Sep 2018
* Initial release

## Thank You
ghost-search is using as a search algorithm [fuzzysort](https://github.com/farzher/fuzzysort). \
Thank you [farzher](https://github.com/farzher/) for creating fuzzysort, a simple and usable search library.

## Copyright & License

Copyright (c) 2018 Haunted Themes - Released under the [MIT license](LICENSE). \
[Ghost is a trademark of The Ghost Foundation](https://ghost.org/)
