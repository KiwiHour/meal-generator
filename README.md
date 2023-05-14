<h1>Kiwi's meal generator</h1>

<h2>Table of contents</h2>
<ul style="list-style: none">
	<li><a href="#user-management">User managment</a></li>
	<li><a href="#database-management">Database management</a></li>
	<li><a href="#rls">RLS</a></li>
	<li><a href="#email-system">Email system</a></li>
</ul>

<h2 id="user-management">User management</h2>
<p>User management is handled using Supabase. Any new user that registers is automatically given a row on the <b>profile</b> table using a <b>trigger function</b>. And if a user is deleted their profile, and any related data, is deleted automatically</p>
<p>Users are able to login and a session is created automatically via the supabase client. This session can be obtained using the getSession() function defined in the event.locals object. (see <i>src/hooks.server.ts</i>)</p>

<h2 id="database-management">Database management</h2>
<p>At the lowest level, accessing the database is done by using the supabase client. This works differently depending on if you are on server side (actions, *.server, etc) or on the client side (*.svelte)</p>
<p>The server side client is initialized using the service role key. This allows the client to have access to admin functions, like generating links for <a href="#email-system">emails</a>. It alos allows them to bypass <a href="#rls">RLS</a>
<p>At a higher level, database management is done using some of the <i>src/lib/classes</i>. For example, Profile which allows you to retrieve information about the currently logged in user. You may notice that in the Profile class, there is no requirement to give a user id or session. This is because the supabase client can only access the rows relating to the currently logged in user due to <a href="#rls">RLS</a> policies. I did say before that the server side client bypasses RLS, but I haven't come across any issues where a user has information about others</p>

<h2 id="rls">RLS (Row-level security)</h2>
<p>Supabase has RLS, this basically means you can limit certain users to only be able to use certain database operators. For example, in the logs table, users can only add or read logs, never updating or deleting them as this would remove the purpose of having a logging system. However RLS can be avoided when manually editing the tables in the supabase website or by using a service role and explictly stating that you don't want RLS</p>

<h2 id="email-system">Email System</h2>
<p>I had a lot of problems using supabase's inbuilt email system for email confirmation and password resets. So I decided to circumvent it by generating the links sent by the emails on the server instead (see <i>src/routes/(account)/reset-password/+page.server.ts</i>), and then using nodemailer to send the emails myself</p>
