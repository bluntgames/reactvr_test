var context = require.context('./app', true, /.spec\.jsx?$/);
context.keys().forEach(context);
