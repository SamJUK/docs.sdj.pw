# Aero Commerce Tinker

## Admin Management

```php
# List all Admin Users
\Aero\Admin\Models\Admin::all()->pluck('email');

# Set an Admin password
$user = \Aero\Admin\Models\Admin::where('email', 'user@example.com')->firstOrFail();
$user->setPasswordAttribute('Password123!');
$user->save();
```

## Test Mail
```php
Mail::send([], [], function($msg) { $msg->to('admin@example.com')->subject('Test Mail')->setBody('test mail'); });
```
