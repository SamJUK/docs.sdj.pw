# Aero Commerce Tinker

## Admin Management

```sh
# List all Admin Users
\Aero\Admin\Models\Admin::all()->pluck('email');

# Set an Admin password
$user = \Aero\Admin\Models\Admin::where('email', 'accounts@bigeyedeers.co.uk')->firstOrFail();
$user->setPasswordAttribute('Password123!');
$user->save();
```


