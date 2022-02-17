lost-ark-server-status
=================

># A CLI tool to check server status for Lost Ark game

requires [nodejs](https://nodejs.org/) to install and run the tool 

## install 
```
 npm install -g lost-ark-server-status
```


<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage
<!-- usage -->
```sh-session
$ npm install -g lost-ark-server-status
$ lass COMMAND
running command...
$ lass (--version)
lost-ark-server-status/0.0.1 win32-x64 node-v16.14.0
$ lass --help [COMMAND]
USAGE
$ lass COMMAND

```
<!-- usagestop -->

# Commands
<!-- commands -->
* [`lass check`](#lass-check)
* [`lass help [COMMAND]`](#lass-help-command)
* [`lass plugins`](#lass-plugins)
* [`lass plugins:inspect PLUGIN...`](#lass-pluginsinspect-plugin)
* [`lass plugins:install PLUGIN...`](#lass-pluginsinstall-plugin)
* [`lass plugins:link PLUGIN`](#lass-pluginslink-plugin)
* [`lass plugins:uninstall PLUGIN...`](#lass-pluginsuninstall-plugin)
* [`lass plugins update`](#lass-plugins-update)

## `lass check`

describe the command here

```
USAGE
  $ lass check [-a] [-r]

FLAGS
  -a, --all          Display status for all regions
  -r, --autorefresh  Auto refresh the table after fixed interval

DESCRIPTION
  describe the command here

EXAMPLES
  $ lass check
```

_See code: [dist/commands/check.ts](https://github.com/riazXrazor/lost-ark-server-status/blob/v0.0.1/dist/commands/check.ts)_

## `lass help [COMMAND]`

Display help for lass.

```
USAGE
  $ lass help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for lass.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.11/src/commands/help.ts)_

## `lass plugins`

List installed plugins.

```
USAGE
  $ lass plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ lass plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/index.ts)_

## `lass plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ lass plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ lass plugins:inspect myplugin
```

## `lass plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ lass plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ lass plugins add

EXAMPLES
  $ lass plugins:install myplugin 

  $ lass plugins:install https://github.com/someuser/someplugin

  $ lass plugins:install someuser/someplugin
```

## `lass plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ lass plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLES
  $ lass plugins:link myplugin
```

## `lass plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ lass plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ lass plugins unlink
  $ lass plugins remove
```

## `lass plugins update`

Update installed plugins.

```
USAGE
  $ lass plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->

