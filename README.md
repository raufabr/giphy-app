In order to run this project, run the following commands
<code>npm ci</code>
<code>npm start</code>

<h4>GIPHY Functionalities</h4>

<ul>
<li>App interacts with Giphy API for trending and Search gif endpoints</li>
<li>When the search result is empty, the app displays trending endpoints, otherwise the app only displays search gifs</li>
<li>Functionality to reach the end of a list (trending/search) has not yet been implemented, although this can easily be calculated from <code>Giphy's Pagniation</code> response for the API calls</li>
</ul>

--------------------
<h4>3rd Party libraries</h4>

<ul>
<li>TypeScript</li>
<li>MUI: For components </li>
<li>@mierak/react-virtualized-grid: For virtualising the grid</li>
<li>react-infinite-scroll-component: For infinite scroll</li>
</ul>

----------

<h4>Code improvement suggestions</h4>

<ul>
<li>Use a reducer to manage all the state changes, as currently it's hard to add new functionalities/modify existing ones without touching the entire codebase</li>
<li>Regression testing: Ensure the correct endpoints are getting called/correct data is being rendered, however, it would not have been possible in 90 minutes</li>
</ul>
