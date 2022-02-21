[![]()](https://github.com/JonasPammer/ansible-role-bootstrap/actions/workflows/ci.yml)
[![]()](https://results.pre-commit.ci/latest/github/JonasPammer/ansible-role-bootstrap/master)
[![]()](https://app.fossa.com/projects/git%2Bgithub.com%2FJonasPammer%2Fansible-role-bootstrap?ref=badge_shield)

[![]()](https://conventionalcommits.org)

An Ansible role for preparing a linux system to be managed by ansible.

This role uses the raw module (in combination with its own
os-determination-system) to install the minimum required set of packages
(python and sudo) to allow Ansible to manage a system.

In most cases, you want to use this role in combination with the
`ansible-core_dependencies`-role.

🔎 Metadata
==========

Below you can find information on…

-   the role’s required Ansible version

-   the role’s supported platforms

-   the role’s [role
    dependencies](https://docs.ansible.com/ansible/latest/user_guide/playbooks_reuse_roles.html#role-dependencies)

**[meta/main.yml](meta/main.yml).**

    ---
    galaxy_info:
      role_name: bootstrap
      description: An ansible role for prepare a linux system to be managed by ansible. Based on robertdebock's role.

      author: jonaspammer
      license: MIT

      min_ansible_version: 2.9
      platforms:
        - name: EL # (Enterprise Linux)
          versions:
            - 7 # actively tested: centos7
            - 8 # actively tested: rockylinux8
        - name: Fedora
          versions:
            - all
        - name: Debian
          versions:
            - stretch # debian9
            - buster # debian10 (actively tested)
            - bullseye # debian11 (actively tested)
        - name: Ubuntu
          versions:
            - bionic # ubuntu1804 (actively tested)
            - focal # ubuntu2004 (actively tested)

      galaxy_tags:
        - bootstrap
        - python
        - sudo

    dependencies: []

📌 Requirements
==============

User needs to be able to `become`

📜 Role Variables
================

    bootstrap_user: root

Username used to connect to the machine.

    bootstrap_wait_for_host: false

Whether to wait for the host to be available on `ansible_port` (22).

    bootstrap_timeout: 3

Maximum number of seconds to wait for the remote system to be
reachable/usable before failing.

👫 Dependencies
==============

📚 Example Playbook Usages
=========================

> **Note**
>
> You must disable the `gather_facts`-property of the play this role is
> used in. If this role finished successfully it’ll call [ansible’s
> setup
> module](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/setup_module.html)
> itself (equivalent effect that `gather_facts: true` would give).
>
> No tasks must come before this role.

    ---
    - hosts: servers:&provisioned
      name: Bootstrap linux machines to be managed by Ansible.
      gather_facts: false

      roles:
        - role: jonaspammer.bootstrap

    ---
    - hosts: servers:&provisioned
      name: Bootstrap linux machines to be managed by Ansible.
      gather_facts: false

      roles:
        - role: jonaspammer.bootstrap
        - role: jonaspammer.core_dependencies

💪 Development
=============

📦 Versioning
------------

Versions are defined using
[Tags](https://git-scm.com/book/en/v2/Git-Basics-Tagging), which in turn
are [recognized and
used](https://galaxy.ansible.com/docs/contributing/version.html) by
Ansible Galaxy.

When a new tag is pushed, [a GitHub CI
workflow](https://github.com/JonasPammer/ansible-role-bootstrap/actions/workflows/release.yml)
takes care of importing the role to my Ansible Galaxy Account. ![Release
CI](https://github.com/JonasPammer/ansible-role-bootstrap/actions/workflows/release.yml/badge.svg)

🧃 Recommended Development Environment [![]()](https://open.vscode.dev/jonaspammer/ansible-role-bootstrap)
---------------------------------------------------------------------------------------------------------

The *Visual Studio Code Remote - Containers* extension lets one use a
Docker container as a full-featured development environment.

This Project offers such a devcontainer definition. By looking at its
docker-compose and dockerfile definition, one can inform himself about
everything there is to know about how to setup the required /
recommended development environment, **even if you do not use this
editor in combination with this feature**.

To use it:

1.  Install and configure [Docker](https://www.docker.com/get-started)
    for your operating system.

2.  Install [Visual Studio Code](https://code.visualstudio.com/)

3.  Install the [Remote Development extension
    pack.](https://aka.ms/vscode-remote/download/extension)

4.  Issue the VS Code command `Remote-Containers: Reopen in Container`
    (e.g. by pressing F1, **or** clicking on the icon found on the most
    left in the lower status bar) to activate the environment.

    ![remote containers
    reopen](https://code.visualstudio.com/assets/docs/remote/containers/remote-containers-reopen.png)

5.  You may need to configure your host system to enable the container
    to use your SSH Keys. The procedure is described [in the official
    devcontainer docs under "Sharing Git credentials with your
    container"](https://code.visualstudio.com/docs/remote/containers#_sharing-git-credentials-with-your-container).

Once you’ve opened a folder in a container, any terminal window you open
in VS Code (Terminal &gt; New Terminal) will automatically run in the
container rather than locally.

💁 Tips
------

Take a look at my general ansible role development guidelines at .

🍪 CookieCutter
--------------

This Project shall be kept in sync with [the CookieCutter it was
originally templated
from](https://github.com/JonasPammer/cookiecutter-ansible-role) using
[cruft](https://github.com/cruft/cruft) (if possible) or manual
alteration (if needed) to the best extend possible.

> ![Official Example Usage of \`cruft
> update\`](https://raw.githubusercontent.com/cruft/cruft/master/art/example_update.gif)

💪 Contributing
==============

Preamble
--------

First off, thank you for considering contributing to this Project.

Following these guidelines helps to communicate that you respect the
time of the developers managing and developing this open source project.
In return, they should reciprocate that respect in addressing your
issue, assessing changes, and helping you finalize your pull requests.

💬 Conventional Commits
----------------------

A casual contributor does not have to worry about following [*the
spec*](https://gist.github.com/JonasPammer/4ea577854ae10afe644bff366d7b2a8a)
[*by definition*](https://www.conventionalcommits.org/en/v1.0.0/), as
pull requests are being squash merged into one commit in the project.
Only core contributors, i.e. those with rights to push to this project’s
branches, must follow it (e.g. to allow for automatic version
determination and changelog generation to work).

🚨 **However, you still need to make sure that you create small,
self-contained commits and pull requests.** *More on this general
concept may be found in in the following sections and the blogs linked
in it.*

🚀 Getting Started
-----------------

Contributions are made to this repo via Issues and Pull Requests (PRs).
A few general guidelines that cover both:

-   Search for existing Issues and PRs before creating your own.

-   If you’ve never contributed before, see [the first timer’s guide on
    Auth0’s
    blog](https://auth0.com/blog/a-first-timers-guide-to-an-open-source-project/)
    for resources and tips on how to get started.

### Issues

Issues should be used to report problems, request a new feature, or to
discuss potential changes **before** a PR is created. When you [create a
new
Issue](https://github.com/JonasPammer/ansible-role-bootstrap/issues/new),
a template will be loaded that will guide you through collecting and
providing the information we need to investigate.

If you find an Issue that addresses the problem you’re having, please
add your own reproduction information to the existing issue **rather
than creating a new one**. Adding a
[reaction](https://github.blog/2016-03-10-add-reactions-to-pull-requests-issues-and-comments/)
can also help be indicating to our maintainers that a particular problem
is affecting more than just the reporter.

### Pull Requests

PRs to this Project are always welcome and can be a quick way to get
your fix or improvement slated for the next release. [In
general](https://blog.ploeh.dk/2015/01/15/10-tips-for-better-pull-requests/),
PRs should:

-   Only fix/add the functionality in question **OR** address
    wide-spread whitespace/style issues, not both.

-   Add unit or integration tests for fixed or changed functionality (if
    a test suite already exists).

-   **Address a single concern**

-   **Include documentation** in the repo

-   Be accompanied by a complete Pull Request template (loaded
    automatically when a PR is created).

For changes that address core functionality or would require breaking
changes (e.g. a major release), it’s best to open an Issue to discuss
your proposal first.

In general, we follow the "fork-and-pull" Git workflow

1.  Fork the repository to your own Github account

2.  Clone the project to your machine

3.  Create a branch locally with a succinct but descriptive name

4.  Commit changes to the branch

5.  Following any formatting and testing guidelines specific to this
    repo

6.  Push changes to your fork

7.  Open a PR in our repository and follow the PR template so that we
    can efficiently review the changes.

📝 Changelog
===========

    The following Changelog format was inspired by Keep a Changelog.

    === [major.minor.patch] - year-month-day
    Optional Description

    ==== Added
    ==== Changed
    ==== Deprecated
    ==== Removed
    ==== Fixed
    ==== Security

\[1.0\] - 2022-02-02
--------------------

Initial version.

All credits for the science behind this role go to
[robertdebock/ansible-role-bootstrap v5.2.12 on GitHub (27 January,
2022)](https://github.com/robertdebock/ansible-role-bootstrap/releases/tag/5.2.12).

⚖️ License
==========

**[LICENSE](LICENSE).**

    MIT License

    Copyright (c) 2022 Jonas Pammer

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.

[![]()](https://app.fossa.com/projects/git%2Bgithub.com%2FJonasPammer%2Fansible-role-bootstrap?ref=badge_large)

todo edited using vscode.dev

= ansible-role-bootstrap Jonas Pammer

; :toc: :toclevels: 3 :toc-placement!: ifdef::env-github\[\] //
https://gist.github.com/dcode/0cfbf2699a1fe9b46ff04c41721dda74\#admonitions
:tip-caption: :bulb: :note-caption: :information\_source:
:important-caption: :heavy\_exclamation\_mark: :caution-caption: :fire:
:warning-caption: :warning: endif::\[\]
https://github.com/JonasPammer/ansible-role-bootstrap/actions/workflows/ci.yml\[image:https://github.com/JonasPammer/ansible-role-bootstrap/actions/workflows/ci.yml/badge.svg\[Testing
CI\]\]
https://results.pre-commit.ci/latest/github/JonasPammer/ansible-role-bootstrap/master\[image:https://results.pre-commit.ci/badge/github/JonasPammer/ansible-role-bootstrap/master.svg\[pre-commit.ci
status\]\]
https://app.fossa.com/projects/git%2Bgithub.com%2FJonasPammer%2Fansible-role-bootstrap?ref=badge\_shield\[image:https://app.fossa.com/api/projects/git%2Bgithub.com%2FJonasPammer%2Fansible-role-bootstrap.svg?type=shield\[FOSSA
Status\]\]
https://conventionalcommits.org\[image:https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg\[Conventional
Commits\]\] //
image:https://img.shields.io/badge/pre--commit-enabled-brightgreen?logo=pre-commit&logoColor=white\[pre-commit,
link=https://github.com/pre-commit/pre-commit\] An Ansible role for
preparing a linux system to be managed by ansible. This role uses the
raw module (in combination with its own os-determination-system) to
install the minimum required set of packages (python and sudo) to allow
Ansible to manage a system. In most cases, you want to use this role in
combination with the \`ansible-core\_dependencies\`-role. toc::\[\]
\[\[meta\]\] == 🔎 Metadata Below you can find information on… \* the
role's required Ansible version \* the role's supported platforms \* the
role's
https://docs.ansible.com/ansible/latest/user\_guide/playbooks\_reuse\_roles.html\#role-dependencies\[role
dependencies\] .link:meta/main.yml\[\] \[source,yaml\] ----
include::meta/main.yml\[\] ---- \[\[requirements\]\] == 📌 Requirements
// Any prerequisites that may not be covered by this role or Ansible
itself should be mentioned here. User needs to be able to \`become\`
\[\[variables\]\] == 📜 Role Variables // A description of the settable
variables for this role should go here // and any variables that
can/should be set via parameters to the role. // Any variables that are
read from other roles and/or the global scope (ie. hostvars, group vars,
etc.) // should be mentioned here as well. \[source,yaml\] ----
bootstrap\_user: root ---- Username used to connect to the machine.
\[source,yaml\] ---- bootstrap\_wait\_for\_host: false ---- Whether to
wait for the host to be available on \`ansible\_port\` (22).
\[source,yaml\] ---- bootstrap\_timeout: 3 ---- Maximum number of
seconds to wait for the remote system to be reachable/usable before
failing. \[\[dependencies\]\] == 👫 Dependencies // A list of other roles
should go here, // plus any details in regard to parameters that may
need to be set for other roles, // or variables that are used from other
roles. \[\[example\_playbooks\]\] == 📚 Example Playbook Usages //
Including examples of how to use this role in a playbook for common
scenarios is always nice for users too: \[NOTE\] ==== You must disable
the \`gather\_facts\`-property of the play this role is used in. If this
role finished successfully it'll call
https://docs.ansible.com/ansible/latest/collections/ansible/builtin/setup\_module.html\[
ansible's setup module\] itself (equivalent effect that \`gather\_facts:
true\` would give). No tasks must come before this role. ==== .Minimum
Viable Play ==== \[source,yaml\] ----- --- - hosts: servers:&provisioned
name: Bootstrap linux machines to be managed by Ansible. gather\_facts:
false roles: - role: jonaspammer.bootstrap ----- ==== .Preferred Play
==== \[source,yaml\] ----- --- - hosts: servers:&provisioned name:
Bootstrap linux machines to be managed by Ansible. gather\_facts: false
roles: - role: jonaspammer.bootstrap - role:
jonaspammer.core\_dependencies ----- ==== \[\[development\]\] == 💪
Development \[\[development--versioning\]\] === 📦 Versioning Versions
are defined using
https://git-scm.com/book/en/v2/Git-Basics-Tagging\[Tags\], which in turn
are
https://galaxy.ansible.com/docs/contributing/version.html\[recognized
and used\] by Ansible Galaxy. When a new tag is pushed,
https://github.com/JonasPammer/ansible-role-bootstrap/actions/workflows/release.yml\[
a GitHub CI workflow\] takes care of importing the role to my Ansible
Galaxy Account.
image:https://github.com/JonasPammer/ansible-role-bootstrap/actions/workflows/release.yml/badge.svg\[Release
CI\] \[\[development--environment\]\] === 🧃 Recommended Development
Environment
https://open.vscode.dev/jonaspammer/ansible-role-bootstrap\[image:https://open.vscode.dev/badges/open-in-vscode.svg\[Open
in Visual Studio Code\]\] The \_Visual Studio Code Remote - Containers\_
extension lets one use a Docker container as a full-featured development
environment. This Project offers such a devcontainer definition. By
looking at its docker-compose and dockerfile definition, one can inform
himself about everything there is to know about how to setup the
required / recommended development environment, \*even if you do not use
this editor in combination with this feature\*. To use it: 1. Install
and configure https://www.docker.com/get-started\[Docker\] for your
operating system. 2. Install https://code.visualstudio.com/\[Visual
Studio Code\] 3. Install the
https://aka.ms/vscode-remote/download/extension\[Remote Development
extension pack.\] 4. Issue the VS Code command \`Remote-Containers:
Reopen in Container\` (e.g. by pressing F1, \*or\* clicking on the icon
found on the most left in the lower status bar) to activate the
environment. +
image:https://code.visualstudio.com/assets/docs/remote/containers/remote-containers-reopen.png\[\]
5. You may need to configure your host system to enable the container to
use your SSH Keys. The procedure is described
https://code.visualstudio.com/docs/remote/containers\#\_sharing-git-credentials-with-your-container\[in
the official devcontainer docs under "Sharing Git credentials with your
container"\]. Once you've opened a folder in a container, any terminal
window you open in VS Code (Terminal &gt; New Terminal) will
automatically run in the container rather than locally. === 💁 Tips //
TODO Add Link to my general ansible role development guideline docs once
they're finished // assignees: jonaspammer Take a look at my general
ansible role development guidelines at . \[\[cookiecutter\]\] === 🍪
CookieCutter This Project shall be kept in sync with
https://github.com/JonasPammer/cookiecutter-ansible-role\[the
CookieCutter it was originally templated from\] using
https://github.com/cruft/cruft\[cruft\] (if possible) or manual
alteration (if needed) to the best extend possible. .Official Example
Usage of \`cruft update\` \_\_\_\_
image::https://raw.githubusercontent.com/cruft/cruft/master/art/example\_update.gif\[Official
Example Usage of \`cruft update\`\] \_\_\_\_ == 💪 Contributing
include::CONTRIBUTING.adoc\[\] \[\[changelog\]\] == 📝 Changelog
include::CHANGELOG.adoc\[\] == ⚖️ License .link:LICENSE\[\] ----
include::LICENSE\[\] ----
https://app.fossa.com/projects/git%2Bgithub.com%2FJonasPammer%2Fansible-role-bootstrap?ref=badge\_large\[image:https://app.fossa.com/api/projects/git%2Bgithub.com%2FJonasPammer%2Fansible-role-bootstrap.svg?type=large\[FOSSA
Status\]\] todo edited using vscode.dev
