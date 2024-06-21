# Betty

Betty is a Discord bot to unify all the needs of Belux vACC.

Betty is vaguely based on Elizabeth and replicates functionality of Babs,
two previous bots.
Elizabeth was built by Jeroen, Babs by Stef (not the author of this bot).

## What does Betty do?

Betty makes **gorgeous announcements**,
whether it's publishing your local events or informing ATC of new LoA's,
Betty keeps everyone on the same page.

Betty **lets you talk**, automatically creating and deleting voice channels as needed,
no longer is unrelated ATC talking over each other!

Do you have people asking for backup in a channel? Betty will **clean your messes**,
removing old messages as needed.

With live updating statistics and an overview of online stations,
Betty **keeps everyone on the same page**.
Pilots and controllers alike can now quickly check if there's traffic or ATC,
without opening yet another app.

Have trouble scheduling ATC for your events?
Betty **does scheduling bookkeeping**,
automatically creating Threads for booking,
posting rosters and switching to a debrief channel when the event is over.

And of course, Betty is **flexible**.
You can configure, tweak, or disable any of her features as you need them.
Let her help you today!

## How to use Betty?
### Configuration

Most configuration is done via a config.json file.
You will find an example in this repo, as well as stricter typings in `config.ts`.

A very limited subset of sensitive configuration options are set via environment variable or `.env` file.
You will find these documented in `.env.example`.

### Deployment

Betty is available as a Docker image under `stefpletinck/betty`.
There are immutable version tags that follow the Releases on GitHub,
as well as a `latest` tag.

One thing to keep in mind is that Betty does not automatically manage command registration.
If you update Betty and the update adds or changes commands,
you will need to run the `deploy-commands.ts` script.

You can use the compiled `.js` version in the Docker container for that,
or even a local checkout of the same version of code.
The guild id is the only important field to match here.

### Licensing

See the LICENSE file for more info.

Copyright (C) 2024 Stef Pletinck

This program is free software:
you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation,
either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with this program.
If not, see <http://www.gnu.org/licenses/>.
