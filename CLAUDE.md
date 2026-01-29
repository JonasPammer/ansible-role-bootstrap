# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Ansible role (`jonaspammer.bootstrap`) that prepares Linux systems to be managed by Ansible. It installs the minimum required packages (Python and sudo) using raw commands before Ansible can fully manage the system. The role is a fork of robertdebock/ansible-role-bootstrap with significant enhancements.

## Development Commands

### Testing

```bash
# Run all tests (pre-commit + molecule tests across all ansible versions)
tox

# Run tests with specific distribution (default: debian12)
MOLECULE_DISTRO=ubuntu2204 tox

# Run tests with specific Ansible version
tox -e py3-ansible-9

# Run molecule tests without destroying container (for debugging)
MOLECULE_DESTROY=never MOLECULE_DISTRO=ubuntu2204 tox -e py3-ansible-9

# Show installed package versions in tox
CI=true tox
```

Available `MOLECULE_DISTRO` values: `ubuntu2004`, `ubuntu2204`, `debian11`, `debian12`, `rockylinux8`, `rockylinux9`, `fedora39`

### Linting

```bash
# Run all pre-commit hooks
pre-commit run --all-files

# Install pre-commit hooks for automatic checking
pre-commit install

# Run yamllint
yamllint . -f standard

# Run ansible-lint (included in molecule test)
ansible-lint
```

### Debugging Molecule Containers

```bash
# 1. Run with MOLECULE_DESTROY=never to keep container
MOLECULE_DESTROY=never MOLECULE_DISTRO=ubuntu2204 tox -e py3-ansible-9

# 2. Find container name
docker ps

# 3. Access container
docker exec -it <container_id> /bin/bash

# 4. Check debug files inside container
cat /var/tmp/vars.yml         # host variables
cat /var/tmp/environment.yml  # environment variables

# 5. Cleanup when done
docker stop <container_id> && docker container rm <container_id>
```

## Architecture

### Core Bootstrap Flow

1. **Assert Variables** (`tasks/assert.yml`): Validates configuration
2. **Wait for Host** (optional): Waits for SSH availability
3. **Test Connection**: Attempts standard Ansible connection
4. **Gather Facts** (`tasks/gather_facts.yml`): Uses raw commands to read `/etc/os-release` and determine OS family
5. **Install Packages** (raw): Executes distribution-specific package manager commands via `ansible.builtin.raw`
6. **Verify Installation** (module): Re-runs package installation using proper Ansible modules to ensure consistency
7. **Gather Facts**: Runs `ansible.builtin.setup` to collect standard facts

### Custom OS Detection System

The role implements a sophisticated OS detection system that works without gathered facts:

- **`tasks/gather_facts.yml`**: Parses `/etc/os-release` using raw commands
- **`vars/main.yml`**: Contains `bootstrap__os_family_map` mapping distributions to OS families (Alpine, Archlinux, Debian, Gentoo, RedHat, Suse)
- **Package Mapping**: Uses `_bootstrap__packages` dict with fallback logic:
  1. Try `{distribution}_{major_version}` (e.g., `CentOS_7`)
  2. Try `{distribution}` (e.g., `Ubuntu`)
  3. Fall back to `{os_family}` (e.g., `Debian`)
- **Install Command Mapping**: Similar fallback for `_bootstrap_install` commands

### Key Variables

**User-configurable** (defaults/main.yml:5-11):
- `bootstrap_user`: User for initial raw connection (default: `root`)
- `bootstrap_become`: Whether to use privilege escalation (default: `false` - assumes sudo not yet available)
- `bootstrap_become_user`: Target user for privilege escalation (default: `root`)
- `bootstrap_wait_for_host`: Whether to wait for SSH (default: `false`)
- `bootstrap_timeout`: Connection timeout in seconds (default: `3`)

**Internal** (vars/main.yml):
- `bootstrap_distribution`: Detected distribution name
- `bootstrap_distribution_major_version`: Detected major version
- `bootstrap_os_family`: Mapped OS family
- `bootstrap__packages`: Resolved package list
- `bootstrap_install`: Resolved install command with stdout regex

## Important Conventions

### CookieCutter Template Synchronization

This project is generated from `JonasPammer/cookiecutter-ansible-role` and should stay in sync using `cruft`:

```bash
cruft update
```

Before making changes, check if the edit should be made to the cookiecutter template instead.

### Commit Messages

Must follow Conventional Commits for automatic versioning and changelog generation:
- `feat:` for new features
- `fix:` for bug fixes
- `chore:` for maintenance tasks
- `docs:` for documentation changes

### Versioning

- Tags must NOT start with `v` (use `1.0.0`, not `v1.0.0`)
- Tags trigger automatic import to Ansible Galaxy

### Pre-commit and CI

- Pre-commit runs automatically via pre-commit.ci on PRs
- ansible-lint skips the `name` rule (tasks don't require names by convention)
- Conventional commits are enforced via commitlint hook

## Testing Strategy

### Molecule Configuration

- **Driver**: Docker with privileged containers
- **Images**: Uses geerlingguy's service-enabled Ansible images
- **Platforms**: Defined dynamically via `MOLECULE_DISTRO` env var
- **Provisioner**: Ansible with auto_silent Python interpreter detection
- **Lint**: ansible-lint runs before converge

### CI Matrix

Tests run across:
- **Distributions**: 7 different Linux distributions (see MOLECULE_DISTRO values)
- **Ansible Versions**: 6 (core 2.13), 7 (core 2.14), 8 (core 2.15), 9 (core 2.16)
- **Max Parallel**: 4 jobs to balance speed and resource usage

### GitHub Artifacts

CI uploads debug files (`/var/tmp/vars.yml`, `/var/tmp/environment.yml`) as artifacts for troubleshooting test failures.

## Role Usage Constraints

When using this role in playbooks:

1. **Must disable fact gathering**: `gather_facts: false` (role gathers facts itself after bootstrap)
2. **Must be first role**: No tasks can run before this role
3. **Become should be false**: Unless you know sudo is already available
4. **Connection types**: Skips wait_for_host when connection is `container`, `docker`, or `community.docker.docker`

## File Structure

```
tasks/
  main.yml          # Main orchestration logic
  assert.yml        # Variable validation
  gather_facts.yml  # Custom OS detection using raw commands
vars/main.yml       # OS family mappings and package definitions
defaults/main.yml   # User-configurable variables
molecule/
  default/
    molecule.yml    # Molecule configuration
    converge.yml    # Test playbook
    verify.yml      # Verification tests
```
